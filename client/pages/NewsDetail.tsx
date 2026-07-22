import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, Download, File, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NEWS_FALLBACK_IMAGE, publicNewsImage } from "@/lib/news";
import { applyDynamicMeta } from "@/lib/dynamic-meta";

// Define the structure for a content block
interface ContentBlock {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
}

// Define the structure for the article data fetched from the API
interface ApiArticle {
  id: string;
  title: string;
  content: string;
  rich_content?: string;
  category: string;
  author: string; // Assuming 'author' is the source
  createdAt: string;
  imageUrl: string; // The main image for the article
  attachments?: Array<{
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
  }>;
}

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null); // State to hold the final article data for rendering
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [recommendedNews, setRecommendedNews] = useState<ApiArticle[]>([]);
  const [loadError, setLoadError] = useState("");
  const [attachments, setAttachments] = useState<
    Array<{
      url: string;
      filename: string;
      originalName: string;
      size: number;
      mimetype: string;
    }>
  >([]);

  useEffect(() => {
    const fetchArticleAndRecommended = async () => {
      if (!id) return;
      try {
        // Fetch the main article
        const articleResponse = await fetch(`/api/news/${id}`);
        const articleResult = await articleResponse.json();

        if (articleResponse.ok && articleResult.success) {
          const apiData: ApiArticle = articleResult.data;
          const summary = String(apiData.content || apiData.rich_content || "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 160);
          applyDynamicMeta({
            title: `${apiData.title} - 浙东环境能源交易所`,
            description: summary || "查看浙东环境能源交易所最新双碳资讯。",
            image: publicNewsImage(apiData.imageUrl),
            type: "article",
          });
          setArticle({
            id: apiData.id,
            title: apiData.title,
            category: apiData.category,
            publishDate: new Date(apiData.createdAt).toLocaleDateString(),
            viewCount: "N/A", // View count is not available from API
            source: apiData.author,
          });

          // 设置附件列表
          if (apiData.attachments && Array.isArray(apiData.attachments)) {
            setAttachments(apiData.attachments);
          }

          // Create content blocks
          const blocks: ContentBlock[] = [];
          if (apiData.imageUrl) {
            blocks.push({
              type: "image",
              src: apiData.imageUrl,
              alt: "新闻配图",
            });
          }

          // 优先使用content字段，如果没有则使用rich_content
          const contentToUse = apiData.content || apiData.rich_content;
          if (contentToUse) {
            // 检查是否包含HTML标签
            if (contentToUse.includes("<") && contentToUse.includes(">")) {
              // 如果有HTML标签，直接使用富文本内容
              blocks.push({ type: "text", content: contentToUse });
            } else {
              // 普通文本，按段落分割
              contentToUse
                .split("\n")
                .filter((p) => p.trim() !== "")
                .forEach((paragraph) => {
                  blocks.push({ type: "text", content: paragraph });
                });
            }
          }
          setContentBlocks(blocks);
        } else {
          setLoadError(articleResult.error || "资讯不存在或已被删除");
          applyDynamicMeta({
            title: "资讯不存在 - 浙东环境能源交易所",
            description: "该资讯不存在或已被删除。",
            noIndex: true,
          });
        }

        // Fetch all news for the "recommended" section
        const allNewsResponse = await fetch("/api/news?view=summary");
        const allNewsResult = await allNewsResponse.json();
        if (allNewsResult.success && Array.isArray(allNewsResult.data)) {
          // Filter out the current article and take the latest 5
          const recommended = allNewsResult.data
            .filter((a: ApiArticle) => a.id !== id)
            .slice(0, 5);
          setRecommendedNews(recommended);
        }
      } catch (error) {
        setLoadError("资讯加载失败，请稍后重试");
      }
    };

    fetchArticleAndRecommended();
  }, [id]);

  const handleDownloadAttachment = (attachment: {
    url: string;
    filename: string;
    originalName: string;
  }) => {
    // 使用下载接口下载文件
    const downloadUrl = `/api/upload/attachment/${attachment.filename}`;
    window.open(downloadUrl, "_blank");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        {loadError ? (
          <>
            <AlertCircle className="h-9 w-9 text-red-500" />
            <h1 className="text-xl font-semibold text-gray-900">
              资讯无法打开
            </h1>
            <p className="text-sm text-gray-500">{loadError}</p>
            <button
              onClick={() => navigate("/news-center")}
              className="rounded-md bg-[#058A65] px-4 py-2 text-sm font-medium text-white"
            >
              返回资讯中心
            </button>
          </>
        ) : (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-[#058A65]" />
            <span className="text-sm text-gray-500">正在加载资讯</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <Header isScrolled={true} />
      </div>

      {/* Main Content */}
      <div className="pt-[88px]">
        {/* Article Header */}
        <div className="max-w-screen-xl mx-auto px-8 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-[#666] mb-4">
            当前位置：首页-新闻中心-正文
          </div>

          {/* Article Title and Meta */}
          <div className="mb-6">
            <h1 className="text-[30px] font-bold leading-[30px] tracking-[-0.3px] text-[#333] mb-4">
              {article.title}
            </h1>

            {/* Category Tag */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-2 py-1 bg-[#058A65]/10 text-[#058A65] text-sm font-medium rounded">
                {article.category}
              </span>
            </div>

            {/* Meta Info */}
            <div className="text-sm text-[#999] tracking-[-0.1px]">
              发布时间：{article.publishDate}{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 浏览量：
              {article.viewCount}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-screen-xl mx-auto px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <div className="space-y-6">
                {contentBlocks.map((block, index) => (
                  <div key={index}>
                    {block.type === "text" && (
                      <div
                        className="text-base leading-6 tracking-[-0.1px] text-[#666]"
                        dangerouslySetInnerHTML={{
                          __html: block.content || "",
                        }}
                      />
                    )}
                    {block.type === "image" && (
                      <img
                        src={publicNewsImage(block.src)}
                        alt={block.alt}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = NEWS_FALLBACK_IMAGE;
                        }}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Attachments Section */}
              {attachments.length > 0 && (
                <div className="mt-12 p-6 bg-[#F5F5F5] rounded-lg">
                  <h3 className="text-lg font-semibold text-[#333] mb-4 flex items-center gap-2">
                    <File className="w-5 h-5" />
                    相关附件
                  </h3>
                  <div className="space-y-2">
                    {attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-[#058A65] transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <File className="w-5 h-5 text-[#058A65] flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#333] truncate">
                              {attachment.originalName}
                            </p>
                            <p className="text-xs text-[#666]">
                              {formatFileSize(attachment.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadAttachment(attachment)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#058A65] text-white rounded-lg hover:bg-[#046B52] transition-colors text-sm"
                        >
                          <Download className="w-4 h-4" />
                          下载
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source */}
              <div className="mt-12 p-4 bg-[#F5F5F5] rounded-lg">
                <span className="text-sm tracking-[-0.14px] text-[#333]">
                  来源：
                  <span className="text-[#058A65]">{article.source}</span>
                </span>
              </div>

              {/* Share Section and Navigation would go here */}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[328px] flex-shrink-0">
              <div className="p-6 border border-[#EAEBF0] rounded-lg bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 bg-[#058A65]"></div>
                  <h3 className="text-lg font-semibold tracking-[-0.1px] text-[#272D37]">
                    推荐新闻
                  </h3>
                </div>
                <div className="space-y-0">
                  {recommendedNews.map((news, index) => (
                    <div
                      key={news.id}
                      className={`py-4 ${
                        index < recommendedNews.length - 1
                          ? "border-b border-[#D7D7D7]"
                          : ""
                      }`}
                    >
                      <button
                        onClick={() => navigate(`/news-detail/${news.id}`)}
                        className="w-full text-left space-y-1.5 hover:opacity-80 transition-opacity"
                      >
                        <h4 className="text-[15px] font-medium leading-[22px] text-[#333]">
                          {news.title}
                        </h4>
                        <p className="text-[13px] leading-[22px] text-[#666]">
                          {new Date(news.createdAt).toLocaleDateString()}
                        </p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
