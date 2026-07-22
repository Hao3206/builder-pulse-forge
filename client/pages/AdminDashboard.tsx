import { useEffect, useState } from "react";
import {
  BarChart3,
  Calendar,
  Eye,
  FileText,
  MessageSquare,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsArticle {
  id: number;
  title: string;
  category?: string;
  createdAt: string;
}

interface ContactMessage {
  id: number;
  name: string;
  contact: string;
  message?: string;
  createdAt: string;
  status?: string;
}

interface NewsStats {
  total: number;
  categories: Record<string, number>;
  publishedThisMonth: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [newsStats, setNewsStats] = useState<NewsStats | null>(null);
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [pendingMessages, setPendingMessages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const headers = { Authorization: `Bearer ${token}` };
        const [newsResponse, messagesResponse] = await Promise.all([
          fetch("/api/admin/news", { headers }),
          fetch("/api/contact", { headers }),
        ]);

        if (newsResponse.status === 401 || messagesResponse.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }
        if (!newsResponse.ok || !messagesResponse.ok) {
          throw new Error("后台数据加载失败");
        }

        const newsResult = await newsResponse.json();
        const messagesResult = await messagesResponse.json();
        const articles: NewsArticle[] = Array.isArray(newsResult)
          ? newsResult
          : [];
        const categories = articles.reduce<Record<string, number>>(
          (result, article) => {
            const category = article.category?.trim() || "未分类";
            result[category] = (result[category] || 0) + 1;
            return result;
          },
          {},
        );
        const now = new Date();
        const publishedThisMonth = articles.filter((article) => {
          const createdAt = new Date(article.createdAt);
          return (
            createdAt.getFullYear() === now.getFullYear() &&
            createdAt.getMonth() === now.getMonth()
          );
        }).length;

        setNewsStats({
          total: articles.length,
          categories,
          publishedThisMonth,
        });
        setRecentNews(articles.slice(0, 5));
        const contactMessages: ContactMessage[] =
          messagesResult.success && Array.isArray(messagesResult.data)
            ? messagesResult.data
            : [];
        setPendingMessages(
          contactMessages.filter(
            (message) => !message.status || message.status === "未处理",
          ).length,
        );
        setRecentMessages(contactMessages.slice(0, 5));
      } catch (err) {
        setError(err instanceof Error ? err.message : "后台数据加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-lg border bg-white p-6"
          >
            <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-8 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "总文章数",
      value: newsStats?.total || 0,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "文章分类",
      value: Object.keys(newsStats?.categories || {}).length,
      icon: BarChart3,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "本月发布",
      value: newsStats?.publishedThisMonth || 0,
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      title: "待处理留言",
      value: pendingMessages,
      icon: MessageSquare,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
          <p className="mt-1 text-gray-600">后台内容与客户咨询概览</p>
        </div>
        <div className="text-sm text-gray-500">
          最后更新：{new Date().toLocaleString()}
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}，请刷新页面重试。
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ title, value, icon: Icon, color, bg }) => (
          <div
            key={title}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm font-medium text-gray-600">
                  {title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
              <div className={`rounded-lg p-3 ${bg}`}>
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">文章分类统计</h2>
          <div className="space-y-3">
            {Object.entries(newsStats?.categories || {}).length === 0 ? (
              <p className="text-sm text-gray-400">暂无资讯</p>
            ) : (
              Object.entries(newsStats?.categories || {}).map(
                ([category, count]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="truncate text-sm font-medium text-gray-700">
                      {category}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-[#058A65]"
                          style={{
                            width: `${newsStats?.total ? (count / newsStats.total) * 100 : 0}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-sm font-semibold">{count}</span>
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">最近发布</h2>
          <div className="space-y-4">
            {recentNews.length === 0 ? (
              <p className="text-sm text-gray-400">暂无资讯</p>
            ) : (
              recentNews.map((article) => (
                <button
                  key={article.id}
                  onClick={() => navigate(`/admin/news/edit/${article.id}`)}
                  className="flex w-full items-start gap-3 text-left"
                >
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#058A65]" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-gray-900">
                      {article.title}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {new Date(article.createdAt).toLocaleString()}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">最新留言</h2>
          <button
            className="text-sm font-medium text-[#058A65]"
            onClick={() => navigate("/admin/contact-messages")}
          >
            查看全部
          </button>
        </div>
        {recentMessages.length === 0 ? (
          <p className="text-sm text-gray-400">暂无留言</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="p-2">姓名</th>
                  <th className="p-2">联系方式</th>
                  <th className="p-2">留言内容</th>
                  <th className="p-2">时间</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((message) => (
                  <tr key={message.id} className="border-b last:border-0">
                    <td className="p-2">{message.name}</td>
                    <td className="p-2">{message.contact}</td>
                    <td className="max-w-xs truncate p-2">
                      {message.message || "-"}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {new Date(message.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">快速操作</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            onClick={() => navigate("/admin/news/create")}
            className="flex items-center justify-center gap-2 rounded-md bg-[#058A65] px-4 py-3 text-white hover:bg-[#046B52]"
          >
            <FileText className="h-5 w-5" />
            新建文章
          </button>
          <button
            onClick={() => navigate("/admin/news")}
            className="flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-3 text-gray-700 hover:bg-gray-200"
          >
            <Eye className="h-5 w-5" />
            查看所有文章
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-3 text-gray-700 hover:bg-gray-200"
          >
            <Users className="h-5 w-5" />
            查看网站
          </button>
        </div>
      </section>
    </div>
  );
}
