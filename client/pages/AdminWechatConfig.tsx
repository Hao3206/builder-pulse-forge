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
  QrCode,
  RefreshCw,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
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
  const [wechatQrCodeUrl, setWechatQrCodeUrl] = useState("");
  const [uploadingQr, setUploadingQr] = useState(false);
  const [savingQr, setSavingQr] = useState(false);
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

      const qrResponse = await fetch("/api/site-settings/customer-service");
      const qrResult = await qrResponse.json().catch(() => ({}));
      if (!qrResponse.ok || !qrResult.success)
        throw new Error(qrResult.error || "客服二维码加载失败");
      setWechatQrCodeUrl(qrResult.data?.wechatQrCodeUrl || "");
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

  const saveCustomerQr = async (url: string) => {
    setSavingQr(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/site-settings/customer-service", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ wechatQrCodeUrl: url }),
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success)
        throw new Error(result.error || "客服二维码保存失败");
      setWechatQrCodeUrl(result.data?.wechatQrCodeUrl || "");
      setMessage({ type: "success", text: result.message || "客服二维码已保存" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "客服二维码保存失败",
      });
    } finally {
      setSavingQr(false);
    }
  };

  const handleQrUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadingQr(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/upload/image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (response.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success)
        throw new Error(result.error || "二维码上传失败");
      setWechatQrCodeUrl(result.data.url);
      setMessage({ type: "success", text: "图片已上传，请点击保存客服二维码。" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "二维码上传失败",
      });
    } finally {
      setUploadingQr(false);
      event.target.value = "";
    }
  };

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

      <Card className="rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <QrCode className="h-5 w-5 text-[#058A65]" />
            官网微信客服二维码
          </CardTitle>
          <CardDescription>
            用户点击官网右侧“微信客服”后将看到此二维码，与公众号开发凭据相互独立。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-gray-50">
              {wechatQrCodeUrl ? (
                <img
                  src={wechatQrCodeUrl}
                  alt="微信客服二维码预览"
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <div className="px-4 text-center text-sm text-gray-400">
                  <QrCode className="mx-auto mb-2 h-8 w-8" />
                  暂未配置
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-sm leading-6 text-gray-500">
                建议上传正方形 PNG 或 JPG 图片，文件不超过 5MB。保存后官网立即生效。
              </p>
              <div className="flex flex-wrap gap-3">
                <input
                  id="customer-qr-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={handleQrUpload}
                  disabled={uploadingQr || savingQr}
                />
                <Button asChild variant="outline" disabled={uploadingQr || savingQr}>
                  <label htmlFor="customer-qr-upload" className="cursor-pointer">
                    {uploadingQr ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {uploadingQr ? "上传中..." : "选择二维码"}
                  </label>
                </Button>
                <Button
                  type="button"
                  onClick={() => void saveCustomerQr(wechatQrCodeUrl)}
                  disabled={!wechatQrCodeUrl || uploadingQr || savingQr}
                  className="bg-[#058A65] hover:bg-[#047558]"
                >
                  {savingQr && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  保存客服二维码
                </Button>
                {wechatQrCodeUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void saveCustomerQr("")}
                    disabled={uploadingQr || savingQr}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    清除
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
