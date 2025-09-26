import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  Settings,
  LogOut,
  User,
  BarChart3,
  Bell,
  Share2,
  Download,
  MessageSquare,
} from "lucide-react";

interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem("admin_token");
    const userData = localStorage.getItem("admin_user");

    if (!token || !userData) {
      navigate("/admin/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "仪表板",
      icon: BarChart3,
    },
    {
      path: "/admin/news",
      label: "资讯管理",
      icon: FileText,
    },
    {
      path: "/admin/contact-messages",
      label: "客户咨询",
      icon: MessageSquare,
    },
    {
      path: "/admin/wechat-config",
      label: "微信配置",
      icon: Share2,
    },
    {
      path: "/admin/wechat-sync",
      label: "微信同步",
      icon: Download,
    }
  ];

  const isActivePath = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#058A65]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 侧边栏 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo 区域 */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#058A65] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">管</span>
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">
              管理后台
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 用户信息 */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#058A65] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>

        {/* 导航菜单 */}
        <nav className="mt-6">
          <div className="px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#058A65] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 底部操作 */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="space-y-2">
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home className="w-5 h-5 mr-3" />
              返回网站
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              {/* 通知 */}
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              {/* 用户菜单 */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#058A65] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* 移动端遮罩 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
