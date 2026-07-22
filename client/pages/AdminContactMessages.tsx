import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock3,
  Copy,
  Eye,
  Inbox,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type MessageStatus = "未处理" | "处理中" | "已处理";

interface ContactMessage {
  id: number;
  name: string;
  company: string | null;
  contact: string;
  message: string | null;
  createdAt: string;
  status: MessageStatus | null;
  source?: string | null;
}

const statusOptions: MessageStatus[] = ["未处理", "处理中", "已处理"];

const statusStyles: Record<MessageStatus, string> = {
  未处理: "border-red-200 bg-red-50 text-red-700",
  处理中: "border-amber-200 bg-amber-50 text-amber-700",
  已处理: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function normalizeStatus(status: ContactMessage["status"]): MessageStatus {
  return statusOptions.includes(status as MessageStatus)
    ? (status as MessageStatus)
    : "未处理";
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "时间未知"
    : date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
}

function contactHref(value: string) {
  const contact = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) return `mailto:${contact}`;
  const phone = contact.replace(/[^\d+]/g, "");
  return phone.length >= 7 ? `tel:${phone}` : "";
}

export default function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<ContactMessage | null>(null);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<"全部" | MessageStatus>(
    "全部",
  );
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();

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
    if (response.status === 401) {
      navigate("/admin/login", { replace: true });
      throw new Error("登录状态已失效");
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      throw new Error(result.error || "请求失败");
    }
    return result;
  };

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await request("/api/contact");
      setMessages(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "留言加载失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMessages();
  }, []);

  const counts = useMemo(
    () => ({
      all: messages.length,
      pending: messages.filter(
        (item) => normalizeStatus(item.status) === "未处理",
      ).length,
      processing: messages.filter(
        (item) => normalizeStatus(item.status) === "处理中",
      ).length,
      completed: messages.filter(
        (item) => normalizeStatus(item.status) === "已处理",
      ).length,
    }),
    [messages],
  );

  const filteredMessages = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    return messages.filter((item) => {
      const matchesStatus =
        statusFilter === "全部" ||
        normalizeStatus(item.status) === statusFilter;
      const matchesKeyword =
        !query ||
        [item.name, item.company, item.contact, item.message, item.source].some(
          (value) =>
            String(value || "")
              .toLowerCase()
              .includes(query),
        );
      return matchesStatus && matchesKeyword;
    });
  }, [keyword, messages, statusFilter]);

  const handleStatusChange = async (id: number, status: MessageStatus) => {
    setUpdatingId(id);
    setError("");
    setNotice("");
    try {
      await request(`/api/contact/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setMessages((current) =>
        current.map((message) =>
          message.id === id ? { ...message, status } : message,
        ),
      );
      setSelectedMessage((current) =>
        current?.id === id ? { ...current, status } : current,
      );
      setNotice("留言状态已更新");
    } catch (err) {
      setError(err instanceof Error ? err.message : "状态更新失败，请重试");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteMessage = async () => {
    if (!deleting) return;
    setDeletePending(true);
    setError("");
    try {
      await request(`/api/contact/${deleting.id}`, { method: "DELETE" });
      setMessages((current) =>
        current.filter((item) => item.id !== deleting.id),
      );
      setSelectedMessage((current) =>
        current?.id === deleting.id ? null : current,
      );
      setNotice("留言已删除");
      setDeleting(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败，请重试");
    } finally {
      setDeletePending(false);
    }
  };

  const copyContact = async (contact: string) => {
    try {
      await navigator.clipboard.writeText(contact);
      setNotice("联系方式已复制");
    } catch {
      setError("复制失败，请手动选择联系方式");
    }
  };

  const renderStatusSelect = (message: ContactMessage) => (
    <div className="relative inline-flex items-center">
      <select
        aria-label={`修改 ${message.name} 的处理状态`}
        className={`h-9 rounded-md border px-3 pr-8 text-sm font-medium outline-none focus:ring-2 focus:ring-[#058A65]/30 ${statusStyles[normalizeStatus(message.status)]}`}
        value={normalizeStatus(message.status)}
        disabled={updatingId === message.id}
        onChange={(event) =>
          void handleStatusChange(
            message.id,
            event.target.value as MessageStatus,
          )
        }
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {updatingId === message.id && (
        <Loader2 className="pointer-events-none absolute right-2 h-4 w-4 animate-spin" />
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-950">留言管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            查看官网咨询并跟进处理进度
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void fetchMessages()}
          disabled={loading}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
          刷新留言
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "全部留言",
            value: counts.all,
            icon: Inbox,
            color: "text-gray-700",
            bg: "bg-gray-100",
          },
          {
            label: "未处理",
            value: counts.pending,
            icon: AlertCircle,
            color: "text-red-700",
            bg: "bg-red-50",
          },
          {
            label: "处理中",
            value: counts.processing,
            icon: Clock3,
            color: "text-amber-700",
            bg: "bg-amber-50",
          },
          {
            label: "已处理",
            value: counts.completed,
            icon: CheckCircle2,
            color: "text-emerald-700",
            bg: "bg-emerald-50",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-950">
                  {loading ? "-" : item.value}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-md ${item.bg}`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void fetchMessages()}
            className="border-red-200 bg-white"
          >
            重试
          </Button>
        </div>
      )}
      {notice && !error && (
        <div className="flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {notice}
        </div>
      )}

      <section className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="搜索姓名、公司、联系方式或留言内容"
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
            {(["全部", ...statusOptions] as const).map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant={statusFilter === option ? "default" : "outline"}
                className={
                  statusFilter === option
                    ? "bg-[#058A65] hover:bg-[#047558]"
                    : ""
                }
                onClick={() => setStatusFilter(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-sm text-gray-500">
            <Loader2 className="h-7 w-7 animate-spin text-[#058A65]" />
            正在加载留言
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100">
              {messages.length === 0 ? (
                <MessageSquare className="h-6 w-6 text-gray-500" />
              ) : (
                <Search className="h-6 w-6 text-gray-500" />
              )}
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">
              {messages.length === 0 ? "暂时没有留言" : "没有匹配的留言"}
            </h2>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              {messages.length === 0
                ? "官网访客提交咨询后，留言会自动出现在这里。"
                : "调整搜索词或处理状态后再试。"}
            </p>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setKeyword("");
                  setStatusFilter("全部");
                }}
              >
                清除筛选
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500">
                  <tr>
                    <th className="px-4 py-3">咨询人</th>
                    <th className="px-4 py-3">联系方式</th>
                    <th className="px-4 py-3">留言内容</th>
                    <th className="px-4 py-3">提交信息</th>
                    <th className="px-4 py-3">状态</th>
                    <th className="px-4 py-3 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMessages.map((message) => {
                    const href = contactHref(message.contact);
                    return (
                      <tr
                        key={message.id}
                        className="align-top hover:bg-gray-50/70"
                      >
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-950">
                            {message.name}
                          </div>
                          <div className="mt-1 flex max-w-44 items-center gap-1 text-xs text-gray-500">
                            <Building2 className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {message.company || "未填写公司"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1">
                            {href ? (
                              <a
                                href={href}
                                className="max-w-48 truncate font-medium text-[#047558] hover:underline"
                              >
                                {message.contact}
                              </a>
                            ) : (
                              <span className="max-w-48 break-all">
                                {message.contact}
                              </span>
                            )}
                            <button
                              title="复制联系方式"
                              aria-label={`复制 ${message.name} 的联系方式`}
                              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                              onClick={() => void copyContact(message.contact)}
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="max-w-sm px-4 py-4">
                          <button
                            type="button"
                            className="line-clamp-3 w-full whitespace-pre-wrap text-left leading-6 text-gray-700 hover:text-[#047558] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#058A65]/40"
                            onClick={() => setSelectedMessage(message)}
                            aria-label={`查看 ${message.name} 的留言详情`}
                          >
                            {message.message || "未填写具体需求"}
                          </button>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-500">
                          <div>{formatDate(message.createdAt)}</div>
                          <div
                            className="mt-1 max-w-44 truncate"
                            title={message.source || ""}
                          >
                            来源：{message.source || "官网咨询"}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          {renderStatusSelect(message)}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="查看详情"
                            aria-label={`查看 ${message.name} 的留言详情`}
                            onClick={() => setSelectedMessage(message)}
                          >
                            <Eye className="h-4 w-4 text-[#047558]" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="删除留言"
                            aria-label={`删除 ${message.name} 的留言`}
                            onClick={() => setDeleting(message)}
                          >
                            <Trash2 className="h-4 w-4 text-gray-500" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 md:hidden">
              {filteredMessages.map((message) => {
                const href = contactHref(message.contact);
                const ContactIcon = href.startsWith("mailto:") ? Mail : Phone;
                return (
                  <article key={message.id} className="space-y-4 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-medium text-gray-950">
                          <UserRound className="h-4 w-4 text-gray-400" />
                          {message.name}
                        </div>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {message.company || "未填写公司"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          statusStyles[normalizeStatus(message.status)]
                        }
                      >
                        {normalizeStatus(message.status)}
                      </Badge>
                    </div>
                    <p className="line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">
                      {message.message || "未填写具体需求"}
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <ContactIcon className="h-3.5 w-3.5" />
                        {href ? (
                          <a
                            href={href}
                            className="break-all font-medium text-[#047558]"
                          >
                            {message.contact}
                          </a>
                        ) : (
                          <span className="break-all">{message.contact}</span>
                        )}
                        <button
                          aria-label="复制联系方式"
                          onClick={() => void copyContact(message.contact)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div>
                        {formatDate(message.createdAt)} ·{" "}
                        {message.source || "官网咨询"}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-3">
                      {renderStatusSelect(message)}
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <Eye className="mr-1.5 h-4 w-4" />
                          查看详情
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="删除留言"
                          onClick={() => setDeleting(message)}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {!loading && filteredMessages.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500">
            显示 {filteredMessages.length} 条，共 {messages.length} 条留言
          </div>
        )}
      </section>

      <Dialog
        open={Boolean(selectedMessage)}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      >
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto p-0">
          {selectedMessage && (
            <>
              <DialogHeader className="border-b border-gray-200 px-5 py-5 pr-12 sm:px-6">
                <DialogTitle>留言详情</DialogTitle>
                <DialogDescription>
                  {selectedMessage.name} 于 {formatDate(selectedMessage.createdAt)} 提交
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 px-5 pb-6 sm:px-6">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">留言内容</h3>
                  <div className="max-h-72 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-800 whitespace-pre-wrap break-words">
                    {selectedMessage.message || "未填写具体需求"}
                  </div>
                </div>

                <dl className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-gray-500">咨询人</dt>
                    <dd className="mt-1 font-medium text-gray-950">{selectedMessage.name}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">公司</dt>
                    <dd className="mt-1 font-medium text-gray-950">{selectedMessage.company || "未填写公司"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">联系方式</dt>
                    <dd className="mt-1 flex min-w-0 items-center gap-2">
                      {contactHref(selectedMessage.contact) ? (
                        <a href={contactHref(selectedMessage.contact)} className="min-w-0 break-all font-medium text-[#047558] hover:underline">
                          {selectedMessage.contact}
                        </a>
                      ) : (
                        <span className="min-w-0 break-all font-medium text-gray-950">{selectedMessage.contact}</span>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        title="复制联系方式"
                        aria-label="复制联系方式"
                        onClick={() => void copyContact(selectedMessage.contact)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">来源</dt>
                    <dd className="mt-1 break-words font-medium text-gray-950">{selectedMessage.source || "官网咨询"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">提交时间</dt>
                    <dd className="mt-1 font-medium text-gray-950">{formatDate(selectedMessage.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-gray-500">处理状态</dt>
                    <dd>{renderStatusSelect(selectedMessage)}</dd>
                  </div>
                </dl>

                <div className="flex justify-end border-t border-gray-200 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                    onClick={() => setDeleting(selectedMessage)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    删除留言
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(open) => !open && !deletePending && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除这条留言？</AlertDialogTitle>
            <AlertDialogDescription>
              将永久删除 {deleting?.name || "该访客"}{" "}
              提交的留言，此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePending}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void deleteMessage();
              }}
              disabled={deletePending}
              className="bg-red-600 hover:bg-red-700"
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
