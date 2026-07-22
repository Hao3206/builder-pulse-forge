import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  RefreshCw,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface WechatConfigForm {
  appId: string;
  appSecret: string;
}

export default function AdminWechatConfig() {
  const [loading, setLoading] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [hasSecret, setHasSecret] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const navigate = useNavigate();
  const form = useForm<WechatConfigForm>({
    defaultValues: { appId: "", appSecret: "" },
  });

  const fetchConfig = async () => {
    setLoadingConfig(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/wechat/config", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success)
        throw new Error(result.error || "配置加载失败");
      setHasSecret(Boolean(result.data?.hasSecret));
      form.reset({ appId: result.data?.appId || "", appSecret: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "配置加载失败",
      });
    } finally {
      setLoadingConfig(false);
    }
  };

  useEffect(() => {
    void fetchConfig();
  }, []);

  const onSubmit = async (data: WechatConfigForm) => {
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/wechat/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success)
        throw new Error(result.error || "配置保存失败");
      setHasSecret(true);
      form.setValue("appSecret", "");
      setMessage({
        type: "success",
        text: "微信配置已保存，原访问令牌缓存已清理。",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "网络错误，请重试",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-[#058A65]" />
            <h1 className="text-2xl font-bold">微信公众号配置</h1>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            管理向公众号草稿箱推送资讯所需的开发凭据
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void fetchConfig()}
          disabled={loadingConfig}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${loadingConfig ? "animate-spin" : ""}`}
          />
          重新读取
        </Button>
      </div>

      {message && (
        <Alert
          className={
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }
        >
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={
              message.type === "success" ? "text-emerald-800" : "text-red-800"
            }
          >
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle className="text-lg">开发凭据</CardTitle>
            <CardDescription>
              凭据仅保存在服务器数据库中，页面不会回传已保存的 AppSecret。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingConfig ? (
              <div className="flex min-h-52 items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin text-[#058A65]" />
                正在读取配置
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="appId"
                    rules={{
                      required: "请输入 AppID",
                      pattern: {
                        value: /^wx[a-zA-Z0-9]{16}$/,
                        message: "AppID 应以 wx 开头并包含 18 个字符",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AppID</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            maxLength={18}
                            placeholder="wx 开头的 AppID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appSecret"
                    rules={{
                      validate: (value) =>
                        hasSecret ||
                        value.trim().length >= 16 ||
                        "首次配置时请输入 AppSecret",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between gap-3">
                          <FormLabel>AppSecret</FormLabel>
                          {hasSecret && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              已安全配置
                            </span>
                          )}
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showSecret ? "text" : "password"}
                              autoComplete="new-password"
                              maxLength={128}
                              placeholder={
                                hasSecret
                                  ? "留空表示不修改"
                                  : "请输入 AppSecret"
                              }
                              {...field}
                            />
                            <button
                              type="button"
                              aria-label={
                                showSecret ? "隐藏 AppSecret" : "显示 AppSecret"
                              }
                              onClick={() => setShowSecret((value) => !value)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >
                              {showSecret ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#058A65] hover:bg-[#047558]"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {loading ? "保存中..." : "保存配置"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3">
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <KeyRound className="h-5 w-5 text-[#058A65]" />
            <h2 className="mt-3 font-semibold">配置用途</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              仅用于将官网资讯发送到微信公众号草稿箱，不影响服务器扫码采集。
            </p>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4">
            <ShieldCheck className="h-5 w-5 text-[#058A65]" />
            <h2 className="mt-3 font-semibold">安全说明</h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              修改任一凭据后，系统会立即清除旧访问令牌并在下次同步时重新获取。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
