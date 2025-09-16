import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Share2 } from "lucide-react";

type NewsArticle = {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  wechat_media_id?: string;
  wechat_synced_at?: string;
};

export default function AdminNewsList() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const navigate = useNavigate();

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        navigate("/admin/login");
        return;
      }
      const response = await fetch("/api/admin/news", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // The admin API now returns a direct array.
        if (Array.isArray(data)) {
          setNews(data);
        }
      } else {
        console.error("Failed to fetch news:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      try {
        const token = localStorage.getItem("admin_token");
        await fetch(`/api/admin/news/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchNews();
      } catch (error) {
        console.error("Failed to delete news:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">新闻管理</h1>
        <Button asChild>
          <Link to="/admin/news/create">添加新闻</Link>
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead>分类</TableHead>
              <TableHead>作者</TableHead>
              <TableHead>发布日期</TableHead>
              <TableHead>微信同步</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(news) && news.length > 0 ? (
              news.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {article.wechat_media_id ? (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已同步
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500">
                        未同步
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/news/edit/${article.id}`}>编辑</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(article.id)}
                      >
                        删除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
