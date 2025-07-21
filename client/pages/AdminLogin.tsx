import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

interface LoginForm {
  username: string;
  password: string;
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // 保存token到localStorage
        localStorage.setItem("admin_token", result.data.token);
        localStorage.setItem("admin_user", JSON.stringify(result.data.user));

        // 跳转到管理后台
        navigate("/admin/dashboard");
      } else {
        setError(result.error || "登录失败");
      }
    } catch (err) {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 清除错误信息
    if (error) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F3B2F] to-[#058A65] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#058A65] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#333] mb-2">管理后台登录</h1>
          <p className="text-[#666] text-sm">浙东环境能源交易所</p>
        </div>

        {/* 登录表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* 用户名输入 */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-[#333] block"
            >
              用户名
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999]" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent outline-none transition-colors"
                placeholder="请输入用户名"
                required
              />
            </div>
          </div>

          {/* 密码输入 */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[#333] block"
            >
              密码
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#999]" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-12 py-3 border border-[#E5E5E7] rounded-lg focus:ring-2 focus:ring-[#058A65] focus:border-transparent outline-none transition-colors"
                placeholder="请输入密码"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#999] hover:text-[#666] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            disabled={loading || !formData.username || !formData.password}
            className="w-full bg-[#058A65] text-white py-3 rounded-lg font-semibold hover:bg-[#046B52] disabled:bg-[#999] disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                登录中...
              </div>
            ) : (
              "登录"
            )}
          </button>
        </form>

        {/* 默认账户提示 */}
        <div className="mt-8 p-4 bg-[#F2F9F7] rounded-lg">
          <p className="text-sm text-[#058A65] font-medium mb-2">
            默认管理员账户：
          </p>
          <p className="text-xs text-[#666]">
            用户名: admin
            <br />
            密码: zdhjsuo2024
          </p>
        </div>

        {/* 返回首页链接 */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-[#058A65] text-sm hover:underline"
          >
            ← 返回网站首页
          </button>
        </div>
      </div>
    </div>
  );
}
