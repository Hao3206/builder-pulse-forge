import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  FilePlus2,
  FileText,
  Loader2,
  Pencil,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsArticle {
  id: number;
  title: string;
  category: string | null;
  author: string | null;
  createdAt: string;
  wechat_media_id?: string | null;
}

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("全部");
  const [deleting, setDeleting] = useState<NewsArticle | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const navigate = useNavigate();

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const response = await fetch("/api/admin/news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const data = await response.json().catch(() => null);
      if (!response.ok || !Array.isArray(data)) throw new Error("资讯加载失败");
      setNews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "资讯加载失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void fetchNews();
  }, [fetchNews]);

  const categories = useMemo(
    () => [
      "全部",
      ...Array.from(
        new Set(news.map((item) => item.category?.trim() || "未分类")),
      ),
    ],
    [news],
  );

  const filteredNews = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    return news.filter((article) => {
      const itemCategory = article.category?.trim() || "未分类";
      return (
        (category === "全部" || itemCategory === category) &&
        (!query ||
          [article.title, article.author, itemCategory].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(query),
          ))
      );
    });
  }, [category, keyword, news]);

  const deleteArticle = async () => {
    if (!deleting) return;
    setDeletePending(true);
    setError("");
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/news/${deleting.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      if (!response.ok) throw new Error("删除失败，请稍后重试");
      setNews((current) => current.filter((item) => item.id !== deleting.id));
      setDeleting(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败，请稍后重试");
    } finally {
      setDeletePending(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">资讯管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            维护官网资讯内容及微信同步状态
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => void fetchNews()}
            disabled={loading}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            刷新
          </Button>
          <Button asChild className="bg-[#058A65] hover:bg-[#047558]">
            <Link to="/admin/news/create">
              <FilePlus2 className="mr-2 h-4 w-4" />
              新建资讯
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-md border bg-white p-4">
          <p className="text-sm text-gray-500">全部资讯</p>
          <p className="mt-1 text-2xl font-semibold">
            {loading ? "-" : news.length}
          </p>
        </div>
        <div className="rounded-md border bg-white p-4">
          <p className="text-sm text-gray-500">资讯分类</p>
          <p className="mt-1 text-2xl font-semibold">
            {loading ? "-" : Math.max(0, categories.length - 1)}
          </p>
        </div>
        <div className="col-span-2 rounded-md border bg-white p-4 sm:col-span-1">
          <p className="text-sm text-gray-500">已同步微信</p>
          <p className="mt-1 text-2xl font-semibold">
            {loading ? "-" : news.filter((item) => item.wechat_media_id).length}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </span>
          <Button size="sm" variant="outline" onClick={() => void fetchNews()}>
            重试
          </Button>
        </div>
      )}

      <section className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索标题、作者或分类"
              className="pl-9"
            />
          </div>
          <select
            aria-label="按分类筛选"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-[#058A65]/20"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 className="h-7 w-7 animate-spin text-[#058A65]" />
            正在加载资讯
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
              <FileText className="h-6 w-6 text-gray-500" />
            </div>
            <h2 className="mt-4 font-semibold">
              {news.length ? "没有匹配的资讯" : "还没有资讯"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {news.length
                ? "调整搜索条件后再试。"
                : "创建第一篇资讯后会显示在这里。"}
            </p>
            {!news.length && (
              <Button asChild size="sm" className="mt-4 bg-[#058A65]">
                <Link to="/admin/news/create">新建资讯</Link>
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr>
                    <th className="px-4 py-3">资讯标题</th>
                    <th className="px-4 py-3">分类</th>
                    <th className="px-4 py-3">作者</th>
                    <th className="px-4 py-3">发布日期</th>
                    <th className="px-4 py-3">微信状态</th>
                    <th className="px-4 py-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredNews.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50/70">
                      <td className="max-w-sm px-4 py-4">
                        <Link
                          to={`/admin/news/edit/${article.id}`}
                          className="line-clamp-2 font-medium text-gray-950 hover:text-[#047558]"
                        >
                          {article.title}
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <Badge variant="outline">
                          {article.category || "未分类"}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {article.author || "未填写"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "zh-CN",
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {article.wechat_media_id ? (
                          <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            已同步
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500">
                            未同步
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            title="编辑"
                          >
                            <Link to={`/admin/news/edit/${article.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="删除"
                            onClick={() => setDeleting(article)}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y md:hidden">
              {filteredNews.map((article) => (
                <article key={article.id} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      to={`/admin/news/edit/${article.id}`}
                      className="line-clamp-2 font-medium"
                    >
                      {article.title}
                    </Link>
                    <Badge variant="outline" className="shrink-0">
                      {article.category || "未分类"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span>{article.author || "未填写作者"}</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(article.createdAt).toLocaleDateString("zh-CN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    {article.wechat_media_id ? (
                      <Badge className="bg-emerald-50 text-emerald-700">
                        已同步微信
                      </Badge>
                    ) : (
                      <Badge variant="outline">未同步微信</Badge>
                    )}
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/news/edit/${article.id}`}>
                          <Pencil className="mr-1 h-4 w-4" />
                          编辑
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleting(article)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
        {!loading && filteredNews.length > 0 && (
          <div className="border-t bg-gray-50 px-4 py-3 text-xs text-gray-500">
            显示 {filteredNews.length} 篇，共 {news.length} 篇资讯
          </div>
        )}
      </section>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && !deletePending && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除这篇资讯？</AlertDialogTitle>
            <AlertDialogDescription>
              “{deleting?.title}”将被永久删除，此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePending}>取消</AlertDialogCancel>
            <AlertDialogAction
              disabled={deletePending}
              className="bg-red-600 hover:bg-red-700"
              onClick={(event) => {
                event.preventDefault();
                void deleteArticle();
              }}
            >
              {deletePending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
