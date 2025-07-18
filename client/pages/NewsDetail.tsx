import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Share, MessageCircle, Repeat, Twitter, Facebook } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(true); // Always show white header on detail page

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mock article data - in real app this would come from API
  const article = {
    id: id || "1",
    title: "资讯标题文字文字文案文字文字文案文字文字文案",
    category: "本所动态",
    publishDate: "2025-12-11",
    viewCount: "232442",
    content: [
      {
        type: "text",
        content:
          "5月14日下午，中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。",
      },
      {
        type: "text",
        content:
          "中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流公司，总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流，公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。。",
      },
      {
        type: "image",
        src: "https://api.builder.io/api/v1/image/assets/TEMP/acdcdb8863a3b14cb384b8669a61d9aed43c4284?width=1680",
        alt: "新闻配图",
      },
      {
        type: "text",
        content:
          "中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。",
      },
      {
        type: "image",
        src: "https://api.builder.io/api/v1/image/assets/TEMP/7ada8ed203b1d7682c454d72999f64dd1b6b2edc?width=1680",
        alt: "新闻配图",
      },
      {
        type: "text",
        content:
          "中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。中国信科集团武汉网锐检测科技有限公司总经理张世海等一行人到访湖北碳交中心进行调研，湖北碳交中心党委副书记、总经理何昌福参加座谈交流。",
      },
    ],
    source: "国家发改委",
  };

  // Mock recommended news
  const recommendedNews = [
    {
      id: "1",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-12-23",
    },
    {
      id: "2",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-10-23",
    },
    {
      id: "3",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-11-23",
    },
    {
      id: "4",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-11-23",
    },
    {
      id: "5",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-11-23",
    },
    {
      id: "6",
      title: "新闻标题文字文字文字文字文字",
      date: "2024-11-23",
    },
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article.title;

    let shareUrl = "";
    switch (platform) {
      case "wechat":
        // WeChat sharing would typically use their SDK
        console.log("Share to WeChat");
        break;
      case "weibo":
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "qq":
        shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "qzone":
        shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

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
            当前位置：首页-节能减排降碳-正文
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
          <div className="flex gap-12">
            {/* Main Content */}
            <div className="flex-1">
              <div className="space-y-6">
                {article.content.map((block, index) => (
                  <div key={index}>
                    {block.type === "text" && (
                      <p className="text-base leading-6 tracking-[-0.1px] text-[#666]">
                        {block.content}
                      </p>
                    )}
                    {block.type === "image" && (
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-[328px] object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Source */}
              <div className="mt-12 p-4 bg-[#F5F5F5] rounded-lg">
                <span className="text-sm tracking-[-0.14px] text-[#333]">
                  来源：
                  <span className="text-[#058A65]">{article.source}</span>
                </span>
              </div>

              {/* Share Section */}
              <div className="mt-8 flex justify-between items-center">
                {/* Share Poster Button */}
                <button className="flex items-center gap-2 px-5 py-2 bg-[#058A65] text-white text-sm rounded-full hover:bg-[#046B52] transition-colors">
                  <Share className="w-[18px] h-[18px]" />
                  分享海报
                </button>

                {/* Social Share */}
                <div className="flex items-center gap-5">
                  <span className="text-sm text-[#666]">分享：</span>
                  <div className="flex items-center gap-2">
                    {/* WeChat */}
                    <button
                      onClick={() => handleShare("wechat")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="w-[18px] h-[18px] text-[#333]" />
                    </button>

                    {/* Facebook */}
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Facebook className="w-[14px] h-[14px] text-[#333]" />
                    </button>

                    {/* Twitter */}
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Twitter className="w-[13px] h-[13px] text-[#333]" />
                    </button>

                    {/* Weibo */}
                    <button
                      onClick={() => handleShare("weibo")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Repeat className="w-[16px] h-[16px] text-[#333]" />
                    </button>

                    {/* QQ */}
                    <button
                      onClick={() => handleShare("qq")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[14px] font-bold text-[#333]">
                        Q
                      </span>
                    </button>

                    {/* QQ Zone */}
                    <button
                      onClick={() => handleShare("qzone")}
                      className="w-[30px] h-[30px] rounded-full border border-[#F4F4F4] bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-[14px] font-bold text-[#333]">
                        Z
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Previous/Next Navigation */}
              <div className="mt-12 pt-8 border-t border-[#E5E5E7] space-y-4">
                <div className="text-base text-[#333] tracking-[-0.1px]">
                  上一篇：资讯标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字
                </div>
                <div className="text-base text-[#333] tracking-[-0.1px]">
                  下一篇：资讯标题文字标题文字标题文字标题文字标题文字标题文字标题文字标题文字
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-[328px] flex-shrink-0">
              <div className="p-6 border border-[#EAEBF0] rounded-lg bg-white shadow-sm">
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-5 bg-[#058A65]"></div>
                  <h3 className="text-lg font-semibold tracking-[-0.1px] text-[#272D37]">
                    推荐新闻
                  </h3>
                </div>

                {/* Recommended News List */}
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
                          {news.date}
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
