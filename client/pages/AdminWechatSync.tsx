import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertCircle, Download, RefreshCw, Loader2 } from "lucide-react";

interface WechatDraft {
  media_id: string;
  title: string;
  author: string;
  digest: string;
  content_preview: string;
  update_time: number;
}

interface SyncResult {
  title: string;
  id: number;
  action: string;
}

export default function AdminWechatSync() {
  const [drafts, setDrafts] = useState<WechatDraft[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [syncResult, setSyncResult] = useState<SyncResult[]>([]);

  // 获取微信草稿箱文章列表
  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/wechat/drafts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setDrafts(result.data.drafts);
        } else {
          setMessage({ type: "error", text: result.error || "获取草稿箱失败" });
        }
      } else {
        setMessage({ type: "error", text: "网络错误" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "获取草稿箱失败" });
    } finally {
      setLoading(false);
    }
  };

  // 从微信同步文章到网站
  const syncFromWechat = async () => {
    setSyncing(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/wechat/sync-from-wechat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setMessage({ 
            type: "success", 
            text: result.message || `成功同步 ${result.data.synced} 篇文章` 
          });
          setSyncResult(result.data.articles);
          // 重新获取草稿箱列表
          fetchDrafts();
        } else {
          setMessage({ type: "error", text: result.error || "同步失败" });
        }
      } else {
        setMessage({ type: "error", text: "网络错误" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "同步失败" });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">微信同步管理</h1>
        <div className="flex gap-2">
          <Button
            onClick={fetchDrafts}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            刷新草稿箱
          </Button>
          <Button
            onClick={syncFromWechat}
            disabled={syncing || drafts.length === 0}
            size="sm"
          >
            {syncing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {syncing ? "同步中..." : "同步到网站"}
          </Button>
        </div>
      </div>

      {/* 消息提示 */}
      {message && (
        <Alert className={`${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* 同步结果 */}
      {syncResult.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              同步结果
            </CardTitle>
            <CardDescription>
              本次同步了 {syncResult.length} 篇文章
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {syncResult.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{item.title}</span>
                  <Badge variant={item.action === "新增" ? "default" : "secondary"}>
                    {item.action}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 微信草稿箱列表 */}
      <Card>
        <CardHeader>
          <CardTitle>微信草稿箱</CardTitle>
          <CardDescription>
            共 {drafts.length} 篇文章，点击"同步到网站"将文章导入到网站
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              加载中...
            </div>
          ) : drafts.length > 0 ? (
            <Table>
              <TableHeader>
                               <TableRow>
                 <TableHead>标题</TableHead>
                 <TableHead>作者</TableHead>
                 <TableHead>内容预览</TableHead>
                 <TableHead>更新时间</TableHead>
               </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.map((draft) => (
                  <TableRow key={draft.media_id}>
                    <TableCell className="font-medium">{draft.title}</TableCell>
                                       <TableCell>{draft.author || "未知"}</TableCell>
                   <TableCell className="max-w-xs">
                     <div className="text-sm text-gray-600">
                       {draft.content_preview || draft.digest || "无内容"}
                     </div>
                   </TableCell>
                    <TableCell>
                      {new Date(draft.update_time * 1000).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              草稿箱中没有文章
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
