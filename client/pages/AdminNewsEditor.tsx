import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Save,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  Star,
  Tag as TagIcon,
  AlertCircle,
} from "lucide-react";

interface NewsForm {
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  tags: string[];
  featured: boolean;
}

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  image?: string;
  tags: string[];
  readTime: number;
}

export default function AdminNewsEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<NewsForm>({
    title: "",
    summary: "",
    content: "",
    category: "新闻资讯",
    image: "",
    tags: [],
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newTag, setNewTag] = useState("");

  const categories = [
    "政策解读",
    "新闻资讯",
    "本所动态",
    "通知公告",
    "知识专栏",
  ];

  useEffect(() => {
    if (isEditMode && id) {
      fetchArticle(id);
    }
  }, [id, isEditMode]);

  const fetchArticle = async (articleId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/news/${articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const article: NewsArticle = result.data;
        setFormData({
          title: article.title,
          summary: article.summary,
          content: article.content,
          category: article.category,
          image: article.image || "",
          tags: article.tags,
          featured: article.featured,
        });
      } else {
        setError("文章不存在或无权访问");
      }
    } catch (err) {
      setError("获取文章失败");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("标题和内容不能为空");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("admin_token");
      const url = isEditMode ? `/api/admin/news/${id}` : "/api/admin/news";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          summary:
            formData.summary || formData.content.substring(0, 200) + "...",
        }),
      });

      if (response.ok) {
        navigate("/admin/news");
      } else {
        const result = await response.json();
        setError(result.error || "保存失败");
      }
    } catch (err) {
      setError("网络错误，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
    if (error) setError("");
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handlePreview = () => {
    // 简单的预览功能，可以在新窗口显示
    const previewContent = `
      <html>
        <head>
          <title>${formData.title}</title>
          <meta charset="utf-8">
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 1px solid #e5e5e5; padding-bottom: 20px; margin-bottom: 20px; }
            .title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .meta { color: #666; font-size: 14px; }
            .content { line-height: 1.6; }
            .tags { margin-top: 20px; }
            .tag { display: inline-block; background: #f0f0f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 8px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">${formData.title}</h1>
            <div class="meta">分类: ${formData.category} | 预览时间: ${new Date().toLocaleString()}</div>
          </div>
          ${formData.image ? `<img src="${formData.image}" style="width: 100%; max-width: 600px; height: auto; margin-bottom: 20px;" />` : ""}
          <div class="content">${formData.content.replace(/\n/g, "<br>")}</div>
          ${
            formData.tags.length > 0
              ? `
            <div class="tags">
              ${formData.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
          `
              : ""
          }
        </body>
      </html>
    `;

    const previewWindow = window.open("", "_blank");
    if (previewWindow) {
      previewWindow.document.write(previewContent);
      previewWindow.document.close();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#058A65]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/news")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditMode ? "编辑文章" : "新建文章"}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditMode ? "修改现有文章内容" : "创建新的资讯文章"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            预览
          </button>
          <button
            form="news-form"
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 bg-[#058A65] text-white text-sm font-medium rounded-lg hover:bg-[#046B52] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* 表单 */}
      <form id="news-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 标题 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                文章标题 *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                placeholder="请输入文章标题"
                required
              />
            </div>

            {/* 摘要 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                文章摘要
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                placeholder="请输入文章摘要（留空将自动生成）"
              />
            </div>

            {/* 内容 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                文章内容 *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={20}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent font-mono text-sm"
                placeholder="请输入文章内容，支持 Markdown 格式"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                支持 Markdown 语法，如 **粗体**、*斜体*、### 标题等
              </p>
            </div>
          </div>

          {/* 侧边栏设置 */}
          <div className="space-y-6">
            {/* 发布设置 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                发布设置
              </h3>

              <div className="space-y-4">
                {/* 分类 */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    文章分类 *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 精选 */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#058A65] focus:ring-[#058A65] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 flex items-center text-sm text-gray-700"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    设为精选文章
                  </label>
                </div>
              </div>
            </div>

            {/* 特色图片 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                特色图片
              </h3>

              <div className="space-y-4">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
                  placeholder="请输入图片URL"
                />

                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="预览"
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 标签 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <TagIcon className="w-5 h-5 mr-2" />
                文章标签
              </h3>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent text-sm"
                    placeholder="输入标签"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-[#058A65] text-white text-sm rounded-lg hover:bg-[#046B52] transition-colors"
                  >
                    添加
                  </button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
