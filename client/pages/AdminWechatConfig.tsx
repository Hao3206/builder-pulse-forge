import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Settings } from "lucide-react";

type WechatConfigForm = {
  appId: string;
  appSecret: string;
};

export default function AdminWechatConfig() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [config, setConfig] = useState<WechatConfigForm | null>(null);

  const form = useForm<WechatConfigForm>({
    defaultValues: {
      appId: "",
      appSecret: "",
    },
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/wechat/config", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data.appId) {
          setConfig(result.data);
          form.reset(result.data);
        }
      }
    } catch (error) {
      console.error("获取配置失败:", error);
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

      const result = await response.json();

      if (result.success) {
        setMessage({ type: "success", text: "配置保存成功！" });
        setConfig(data);
      } else {
        setMessage({ type: "error", text: result.error || "保存失败" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "网络错误，请重试" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold">微信公众号配置</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>配置信息</CardTitle>
          <CardDescription>
            配置微信公众号的AppID和AppSecret，用于文章同步功能
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className={`mb-4 ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="appId"
                rules={{ required: "请输入AppID" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AppID</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入微信公众号AppID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appSecret"
                rules={{ required: "请输入AppSecret" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AppSecret</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="请输入微信公众号AppSecret" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "保存中..." : "保存配置"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">1. 获取AppID和AppSecret</h4>
            <p>登录微信公众平台，在"开发"→"基本配置"中获取AppID和AppSecret</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">2. 配置服务器域名</h4>
            <p>在微信公众平台配置服务器域名白名单，确保API调用正常</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">3. 文章同步</h4>
            <p>配置完成后，在文章管理页面可以一键同步文章到微信公众号草稿箱</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

