import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TiptapEditor from "@/components/TiptapEditor";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, AlertCircle, Share2, Loader2 } from "lucide-react";

type FormData = {
  title: string;
  content: string;
  rich_content?: string;
  imageUrl: string;
  author: string;
  category: string;
};

export default function AdminNewsEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const form = useForm<FormData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    synced: boolean;
    mediaId?: string;
    syncedAt?: string;
  } | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchNewsArticle = async () => {
        try {
          const token = localStorage.getItem("admin_token");
          const response = await fetch(`/api/admin/news/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            form.reset(data);
          }
        } catch (error) {
          console.error("Failed to fetch news article:", error);
        }
      };
      fetchNewsArticle();
      
      // 获取微信同步状态
      fetchSyncStatus();
    }
  }, [id, form]);

  const fetchSyncStatus = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/wechat/sync-status/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSyncStatus(result.data);
        }
      }
    } catch (error) {
      console.error("获取同步状态失败:", error);
    }
  };

  const handleSyncToWechat = async () => {
    setSyncing(true);
    setSyncMessage(null);

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/wechat/sync/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setSyncMessage({ type: "success", text: "同步成功！文章已添加到微信公众号草稿箱" });
        fetchSyncStatus(); // 重新获取同步状态
      } else {
        setSyncMessage({ type: "error", text: result.error || "同步失败" });
      }
    } catch (error) {
      setSyncMessage({ type: "error", text: "网络错误，请重试" });
    } finally {
      setSyncing(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("admin_token");
      const url = isEditMode ? `/api/admin/news/${id}` : "/api/admin/news";
      const method = isEditMode ? "PUT" : "POST";

      // 只使用 rich_content 字段
      const submitData = {
        ...data,
      };

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      navigate("/admin/news");
    } catch (error) {
      console.error("Failed to save news article:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "编辑新闻" : "添加新闻"}
        </h1>
        
              {/* 微信同步状态和按钮 */}
      {isEditMode && (
        <div className="flex items-center gap-3">
          {syncStatus?.synced ? (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                已同步到微信
              </Badge>
              <Button
                onClick={handleSyncToWechat}
                disabled={syncing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {syncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                {syncing ? "重新同步中..." : "重新同步"}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSyncToWechat}
              disabled={syncing}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {syncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              {syncing ? "同步中..." : "同步到微信"}
            </Button>
          )}
        </div>
      )}
      </div>

      {/* 同步消息提示 */}
      {syncMessage && (
        <Alert className={`mb-4 ${syncMessage.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {syncMessage.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={syncMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {syncMessage.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>标题</FormLabel>
                  <FormControl>
                    <Input placeholder="输入新闻标题" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rich_content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TiptapEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="请输入文章内容..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>图片链接</FormLabel>
                  <FormControl>
                    <Input placeholder="输入图片URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>作者</FormLabel>
                  <FormControl>
                    <Input placeholder="输入作者" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>分类</FormLabel>
                  <FormControl>
                    <Input placeholder="输入分类" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">
                {isEditMode ? "更新" : "创建"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
