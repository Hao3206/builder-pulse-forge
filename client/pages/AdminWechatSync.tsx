import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Loader2,
  LogOut,
  QrCode,
  RefreshCw,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CandidateStatus = "pending" | "ignored" | "imported";

interface WechatCandidate {
  id: number;
  title: string;
  digest: string;
  cover_image: string;
  source_url: string;
  publish_date: string | null;
  category: string;
  status: CandidateStatus;
  news_id: number | null;
}

interface CrawlerSession {
  session_id: string;
  logged_in: boolean;
  screenshot: string;
  url: string;
}

const statusLabels: Record<CandidateStatus, string> = {
  pending: "待确认",
  ignored: "已忽略",
  imported: "已发布",
};

export default function AdminWechatSync() {
  const [items, setItems] = useState<WechatCandidate[]>([]);
  const [status, setStatus] = useState<CandidateStatus>("pending");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [acting, setActing] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [crawlerSession, setCrawlerSession] = useState<CrawlerSession | null>(
    null,
  );
  const [crawlerStarting, setCrawlerStarting] = useState(false);
  const [crawlerCollecting, setCrawlerCollecting] = useState(false);
  const [crawlerInteracting, setCrawlerInteracting] = useState(false);

  const request = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("admin_token");
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false)
      throw new Error(result.error || "请求失败");
    return result;
  };

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status });
      if (keyword.trim()) params.set("keyword", keyword.trim());
      const result = await request(`/api/wechat-candidates?${params}`);
      setItems(result.data || []);
      setSelected([]);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "加载失败",
      });
    } finally {
      setLoading(false);
    }
  }, [status, keyword]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  useEffect(() => {
    if (!crawlerSession?.session_id) return;
    const timer = window.setInterval(async () => {
      try {
        const result = await request(
          `/api/wechat-candidates/sessions/${crawlerSession.session_id}`,
        );
        setCrawlerSession(result.data);
      } catch {
        window.clearInterval(timer);
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [crawlerSession?.session_id]);

  const startCrawler = async () => {
    setCrawlerStarting(true);
    setMessage(null);
    try {
      const result = await request("/api/wechat-candidates/sessions", {
        method: "POST",
        body: "{}",
      });
      setCrawlerSession(result.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "扫码会话启动失败",
      });
    } finally {
      setCrawlerStarting(false);
    }
  };

  const collectFromWechat = async () => {
    if (!crawlerSession) return;
    setCrawlerCollecting(true);
    try {
      const result = await request(
        `/api/wechat-candidates/sessions/${crawlerSession.session_id}/collect`,
        {
          method: "POST",
          body: JSON.stringify({ pages: 1, count: 20, category: "本所动态" }),
        },
      );
      setMessage({
        type: "success",
        text: `${result.message}：新增 ${result.data.created}，跳过 ${result.data.skipped}`,
      });
      setStatus("pending");
      await fetchCandidates();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "采集失败",
      });
    } finally {
      setCrawlerCollecting(false);
    }
  };

  const clickCrawlerWindow = async (
    event: React.MouseEvent<HTMLImageElement>,
  ) => {
    if (!crawlerSession || crawlerInteracting) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 1280;
    const y = ((event.clientY - bounds.top) / bounds.height) * 860;
    setCrawlerInteracting(true);
    try {
      const result = await request(
        `/api/wechat-candidates/sessions/${crawlerSession.session_id}/click`,
        {
          method: "POST",
          body: JSON.stringify({ x, y }),
        },
      );
      setCrawlerSession(result.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "远程点击失败",
      });
    } finally {
      setCrawlerInteracting(false);
    }
  };

  const scrollCrawlerWindow = async (
    deltaY: number,
    x = 640,
    y = 430,
  ) => {
    if (!crawlerSession || crawlerInteracting) return;
    setCrawlerInteracting(true);
    try {
      const result = await request(
        `/api/wechat-candidates/sessions/${crawlerSession.session_id}/scroll`,
        {
          method: "POST",
          body: JSON.stringify({ x, y, delta_y: deltaY }),
        },
      );
      setCrawlerSession(result.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "远程滚动失败",
      });
    } finally {
      setCrawlerInteracting(false);
    }
  };

  const wheelCrawlerWindow = (event: React.WheelEvent<HTMLImageElement>) => {
    event.preventDefault();
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 1280;
    const y = ((event.clientY - bounds.top) / bounds.height) * 860;
    void scrollCrawlerWindow(Math.max(-900, Math.min(900, event.deltaY * 2)), x, y);
  };

  const logoutCrawler = async () => {
    setActing(true);
    try {
      await request("/api/wechat-candidates/profile", { method: "DELETE" });
      setCrawlerSession(null);
      setMessage({ type: "success", text: "公众号后台登录态已清理" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "退出失败",
      });
    } finally {
      setActing(false);
    }
  };

  const runAction = async (action: "confirm" | "ignore" | "restore") => {
    if (!selected.length) return;
    setActing(true);
    setMessage(null);
    try {
      const isConfirm = action === "confirm";
      const result = await request(
        isConfirm
          ? "/api/wechat-candidates/confirm"
          : "/api/wechat-candidates/status",
        {
          method: isConfirm ? "POST" : "PATCH",
          body: JSON.stringify(
            isConfirm
              ? { ids: selected, category: "本所动态" }
              : {
                  ids: selected,
                  status: action === "ignore" ? "ignored" : "pending",
                },
          ),
        },
      );
      setMessage({ type: "success", text: result.message || "操作完成" });
      await fetchCandidates();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "操作失败",
      });
    } finally {
      setActing(false);
    }
  };

  const allSelected =
    items.length > 0 && items.every((item) => selected.includes(item.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">公众号采集确认</h1>
        <p className="mt-1 text-sm text-gray-500">
          服务器采集公众号已发表文章，管理员确认后才会进入官网资讯。
        </p>
      </div>

      {message && (
        <Alert
          className={
            message.type === "success"
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base">服务器采集会话</CardTitle>
              <CardDescription>
                在服务器打开公众号后台，扫码登录后采集已发表记录。
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={logoutCrawler}
                disabled={acting}
              >
                <LogOut className="mr-2 h-4 w-4" />
                退出公众号
              </Button>
              <Button onClick={startCrawler} disabled={crawlerStarting}>
                {crawlerStarting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <QrCode className="mr-2 h-4 w-4" />
                )}
                打开扫码窗口
              </Button>
            </div>
          </div>
        </CardHeader>
        {crawlerSession && (
          <CardContent>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(360px,560px)]">
              <div className="space-y-4">
                <Badge
                  variant={crawlerSession.logged_in ? "default" : "secondary"}
                >
                  {crawlerSession.logged_in ? "已登录" : "等待扫码"}
                </Badge>
                <p className="text-sm text-gray-600">
                  {crawlerSession.logged_in
                    ? "公众号后台已登录，可以采集最近发表的文章。"
                    : "请使用公众号管理员微信扫描右侧页面中的二维码。"}
                </p>
                <Button
                  onClick={collectFromWechat}
                  disabled={!crawlerSession.logged_in || crawlerCollecting}
                >
                  {crawlerCollecting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  采集最近 20 篇
                </Button>
              </div>
              <div className="overflow-hidden rounded-md border bg-gray-50">
                {crawlerSession.screenshot ? (
                  <>
                    <img
                      src={crawlerSession.screenshot}
                      alt="公众号后台扫码页面"
                      className={`h-auto w-full ${crawlerInteracting ? "cursor-wait opacity-80" : "cursor-pointer"}`}
                      onClick={clickCrawlerWindow}
                      onWheel={wheelCrawlerWindow}
                    />
                    <div className="flex items-center justify-center gap-2 border-t bg-white p-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={crawlerInteracting}
                        onClick={() => scrollCrawlerWindow(-600)}
                      >
                        <ChevronUp className="mr-1 h-4 w-4" />
                        向上滚动
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={crawlerInteracting}
                        onClick={() => scrollCrawlerWindow(600)}
                      >
                        <ChevronDown className="mr-1 h-4 w-4" />
                        向下滚动
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex aspect-square items-center justify-center text-sm text-gray-500">
                    正在获取扫码页面
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>候选文章</CardTitle>
              <CardDescription>
                共 {items.length} 篇，已选择 {selected.length} 篇
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchCandidates}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              刷新
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["pending", "ignored", "imported"] as CandidateStatus[]).map(
              (value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={status === value ? "default" : "outline"}
                  onClick={() => setStatus(value)}
                >
                  {statusLabels[value]}
                </Button>
              ),
            )}
            <div className="flex min-w-[240px] flex-1 gap-2 sm:max-w-sm">
              <Input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="按标题搜索"
              />
              <Button variant="outline" onClick={fetchCandidates}>
                搜索
              </Button>
            </div>
          </div>
          {selected.length > 0 && (
            <div className="flex gap-2">
              {status === "pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => runAction("confirm")}
                    disabled={acting}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    确认发布
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => runAction("ignore")}
                    disabled={acting}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    忽略
                  </Button>
                </>
              )}
              {status === "ignored" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => runAction("restore")}
                  disabled={acting}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  恢复待确认
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : items.length ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={(checked) =>
                          setSelected(
                            checked ? items.map((item) => item.id) : [],
                          )
                        }
                      />
                    </TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>发布时间</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead className="w-20">原文</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(item.id)}
                          onCheckedChange={(checked) =>
                            setSelected((current) =>
                              checked
                                ? [...current, item.id]
                                : current.filter((id) => id !== item.id),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xl font-medium">{item.title}</div>
                        {item.digest && (
                          <div className="mt-1 max-w-xl truncate text-xs text-gray-500">
                            {item.digest}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.publish_date
                          ? new Date(item.publish_date).toLocaleString("zh-CN")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {statusLabels[item.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex text-[#058A65]"
                          aria-label={`查看${item.title}原文`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500">
              当前没有{statusLabels[status]}文章
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
