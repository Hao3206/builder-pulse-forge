import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Star,
  Eye,
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  CheckSquare,
  Square,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  image?: string;
  tags: string[];
  readTime: number;
}

interface NewsResponse {
  articles: NewsArticle[];
  pagination: {
    current: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  statistics: {
    total: number;
    featured: number;
    categories: Record<string, number>;
  };
}

export default function AdminNewsList() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    featured: "all",
    page: 1,
    limit: 10,
  });

  const categories = [
    { value: "all", label: "全部分类" },
    { value: "政策解读", label: "政策解读" },
    { value: "新闻资讯", label: "新闻资讯" },
    { value: "本所动态", label: "本所动态" },
    { value: "通知公告", label: "通知公告" },
    { value: "知识专栏", label: "知识专栏" },
  ];

  const featuredOptions = [
    { value: "all", label: "全部" },
    { value: "true", label: "已精选" },
    { value: "false", label: "未精选" },
  ];

  useEffect(() => {
    fetchNews();
  }, [filters]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.category !== "all" && { category: filters.category }),
        ...(filters.featured !== "all" && { featured: filters.featured }),
      });

      const response = await fetch(`/api/admin/news?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setNewsData(result.data);
      }
    } catch (error) {
      console.error("获取新闻列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这篇文章吗？")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchNews();
      }
    } catch (error) {
      console.error("删除文章失败:", error);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedArticles.length === 0) return;
    if (!confirm(`确定要删除选中的 ${selectedArticles.length} 篇文章吗？`))
      return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/news/batch-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedArticles }),
      });

      if (response.ok) {
        setSelectedArticles([]);
        fetchNews();
      }
    } catch (error) {
      console.error("批量删除失败:", error);
    }
  };

  const handleBatchUpdateFeatured = async (featured: boolean) => {
    if (selectedArticles.length === 0) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/news/batch-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedArticles, featured }),
      });

      if (response.ok) {
        setSelectedArticles([]);
        fetchNews();
      }
    } catch (error) {
      console.error("批量更新失败:", error);
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedArticles.length === newsData?.articles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(
        newsData?.articles.map((article) => article.id) || [],
      );
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedArticles((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">资讯管理</h1>
          <p className="text-gray-600 mt-1">
            管理和发布网站资讯内容
            {newsData && (
              <span className="ml-2 text-sm">
                共 {newsData.statistics.total} 篇文章
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/news/create")}
          className="inline-flex items-center px-4 py-2 bg-[#058A65] text-white text-sm font-medium rounded-lg hover:bg-[#046B52] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          新建文章
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索标题、作者、标签..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }))
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
            />
          </div>

          {/* 分类筛选 */}
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value,
                page: 1,
              }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          {/* 精选筛选 */}
          <select
            value={filters.featured}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                featured: e.target.value,
                page: 1,
              }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
          >
            {featuredOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* 每页条数 */}
          <select
            value={filters.limit}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                limit: parseInt(e.target.value),
                page: 1,
              }))
            }
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent"
          >
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
            <option value={50}>50条/页</option>
          </select>
        </div>
      </div>

      {/* 批量操作 */}
      {selectedArticles.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700">
              已选择 {selectedArticles.length} 篇文章
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBatchUpdateFeatured(true)}
                className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition-colors"
              >
                设为精选
              </button>
              <button
                onClick={() => handleBatchUpdateFeatured(false)}
                className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
              >
                取消精选
              </button>
              <button
                onClick={handleBatchDelete}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              >
                批量删除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 文章列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#058A65] mx-auto"></div>
            <p className="text-gray-500 mt-2">加载中...</p>
          </div>
        ) : newsData?.articles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">暂无文章</p>
          </div>
        ) : (
          <>
            {/* 表头 */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <button onClick={handleToggleSelectAll} className="mr-4">
                  {selectedArticles.length === newsData?.articles.length ? (
                    <CheckSquare className="w-4 h-4 text-[#058A65]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <span className="text-sm font-medium text-gray-700">全选</span>
              </div>
            </div>

            {/* 文章列表 */}
            <div className="divide-y divide-gray-200">
              {newsData?.articles.map((article) => (
                <div
                  key={article.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* 选择框 */}
                    <button
                      onClick={() => handleToggleSelect(article.id)}
                      className="mt-1"
                    >
                      {selectedArticles.includes(article.id) ? (
                        <CheckSquare className="w-4 h-4 text-[#058A65]" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    {/* 文章图片 */}
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    )}

                    {/* 文章信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {article.title}
                        </h3>
                        {article.featured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span className="px-2 py-1 bg-[#058A65] text-white rounded">
                            {article.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.readTime} 分钟阅读
                        </div>
                      </div>

                      {/* 标签 */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/news/edit/${article.id}`)
                        }
                        className="p-2 text-gray-500 hover:text-[#058A65] hover:bg-gray-100 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          window.open(`/news/${article.id}`, "_blank")
                        }
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="预览"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 分页 */}
      {newsData && newsData.pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            显示第 {(newsData.pagination.current - 1) * filters.limit + 1} 到{" "}
            {Math.min(
              newsData.pagination.current * filters.limit,
              newsData.pagination.total,
            )}{" "}
            条，共 {newsData.pagination.total} 条记录
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={!newsData.pagination.hasPrev}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一页
            </button>
            <span className="px-3 py-2 text-sm">
              第 {newsData.pagination.current} 页，共{" "}
              {newsData.pagination.pages} 页
            </span>
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={!newsData.pagination.hasNext}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一页
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
