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
import { CheckCircle, AlertCircle, Share2, Loader2, Upload, X, File, Download, Image as ImageIcon } from "lucide-react";

type FormData = {
  title: string;
  content: string;
  rich_content?: string;
  imageUrl: string;
  author: string;
  category: string;
  attachments?: Array<{
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
  }>;
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
  const [uploading, setUploading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [attachments, setAttachments] = useState<Array<{
    url: string;
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
  }>>([]);

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
            // 设置附件列表
            if (data.attachments && Array.isArray(data.attachments)) {
              setAttachments(data.attachments);
            }
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

      // 确保 content 字段有值，如果没有则使用 rich_content 或空字符串
      const submitData = {
        ...data,
        content: data.content || data.rich_content || "",
        attachments: attachments,
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("attachment", file);

      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/upload/attachment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setAttachments([...attachments, result.data]);
      } else {
        alert(result.error || "上传失败");
      }
    } catch (error) {
      console.error("上传失败:", error);
      alert("上传失败，请重试");
    } finally {
      setUploading(false);
      // 清空input，允许重复上传同一文件
      e.target.value = "";
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 检查是否为图片文件
    if (!file.type.startsWith("image/")) {
      alert("请上传图片文件");
      e.target.value = "";
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/upload/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // 更新表单中的 imageUrl 字段
        form.setValue("imageUrl", result.data.url);
      } else {
        alert(result.error || "上传失败");
      }
    } catch (error) {
      console.error("图片上传失败:", error);
      alert("图片上传失败，请重试");
    } finally {
      setUploadingImage(false);
      // 清空input，允许重复上传同一文件
      e.target.value = "";
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
                  <FormLabel>封面图片</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* 图片上传区域 */}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center cursor-pointer"
                        >
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-8 h-8 text-gray-400 mb-2 animate-spin" />
                              <span className="text-sm text-gray-600">上传中...</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-sm text-gray-600">
                                点击上传图片（支持 JPG、PNG、GIF、WEBP，最大5MB）
                              </span>
                            </>
                          )}
                        </label>
                      </div>
                      
                      {/* 图片预览 */}
                      {field.value && (
                        <div className="relative">
                          <img
                            src={field.value}
                            alt="预览"
                            className="w-full max-w-md h-auto rounded-lg border border-gray-200"
                            onError={() => {
                              // 如果图片加载失败，显示错误提示
                              console.error("图片加载失败");
                            }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              field.onChange("");
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      
                      {/* 也可以手动输入URL */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-600">或手动输入图片URL</label>
                        <Input 
                          placeholder="输入图片URL" 
                          {...field}
                          value={field.value || ""}
                        />
                      </div>
                    </div>
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
            
            {/* 附件上传区域 */}
            <div className="space-y-4">
              <FormLabel>附件</FormLabel>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  id="attachment-upload"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <label
                  htmlFor="attachment-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    {uploading ? "上传中..." : "点击上传附件（支持各种文件类型，最大50MB）"}
                  </span>
                </label>
              </div>
              
              {/* 附件列表 */}
              {attachments.length > 0 && (
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {attachment.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAttachment(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
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
