import { useState, useEffect } from "react";
import {
  FileText,
  Star,
  TrendingUp,
  Calendar,
  Users,
  Eye,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NewsStats {
  total: number;
  featured: number;
  categories: Record<string, number>;
}

interface DashboardCard {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  change?: string;
  changeType?: "increase" | "decrease";
}

export default function AdminDashboard() {
  const [newsStats, setNewsStats] = useState<NewsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
    fetchRecentMessages();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/admin/news?limit=1", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setNewsStats(result.data.statistics);
      }
    } catch (error) {
      console.error("获取仪表板数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentMessages = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setRecentMessages(result.data.slice(0, 5));
        }
      }
    } catch (error) {
      console.error("获取最近留言失败:", error);
    }
  };

  const dashboardCards: DashboardCard[] = [
    {
      title: "总文章数",
      value: newsStats?.total || 0,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+3",
      changeType: "increase",
    },
    {
      title: "精选文章",
      value: newsStats?.featured || 0,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "+1",
      changeType: "increase",
    },
    {
      title: "文章分类",
      value: Object.keys(newsStats?.categories || {}).length,
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "本月发布",
      value: "8",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+2",
      changeType: "increase",
    },
  ];

  const recentActivities = [
    {
      action: "创建文章",
      target: "CCER重启交易首日，浙东环交所成交额突破千万",
      time: "2小时前",
      user: "系统管理员",
    },
    {
      action: "更新文章",
      target: "浙江省发布碳达峰实施方案，明确2030年达峰目标",
      time: "4小时前",
      user: "系统管理员",
    },
    {
      action: "设为精选",
      target: "浙东环交所与宁波大学签署碳中和人才培养合作协议",
      time: "1天前",
      user: "系统管理员",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">仪表板</h1>
          <p className="text-gray-600 mt-1">欢迎回到管理后台</p>
        </div>
        <div className="text-sm text-gray-500">
          最后更新: {new Date().toLocaleString()}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                  {card.change && (
                    <div className="flex items-center mt-2">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${
                          card.changeType === "increase"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          card.changeType === "increase"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {card.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">本周</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 分类统计 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            文章分类统计
          </h3>
          <div className="space-y-3">
            {newsStats?.categories &&
              Object.entries(newsStats.categories).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {category}
                  </span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-[#058A65] h-2 rounded-full"
                        style={{
                          width: `${
                            newsStats.total
                              ? (count / newsStats.total) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-8">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#058A65] rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {activity.target}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => (window.location.href = "/admin/news/create")}
            className="flex items-center justify-center px-4 py-3 bg-[#058A65] text-white rounded-lg hover:bg-[#046B52] transition-colors"
          >
            <FileText className="w-5 h-5 mr-2" />
            新建文章
          </button>
          <button
            onClick={() => (window.location.href = "/admin/news")}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-5 h-5 mr-2" />
            查看所有文章
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Users className="w-5 h-5 mr-2" />
            查看网站
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* 留言管理 */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center w-full">
          <h2 className="text-xl font-bold mb-4">最新留言</h2>
          {recentMessages.length === 0 ? (
            <div className="text-gray-400">暂无留言</div>
          ) : (
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="p-1">姓名</th>
                  <th className="p-1">联系方式</th>
                  <th className="p-1">留言内容</th>
                  <th className="p-1">时间</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr key={msg.id} className="border-t">
                    <td className="p-1">{msg.name}</td>
                    <td className="p-1">{msg.contact}</td>
                    <td className="p-1 max-w-[180px] truncate">{msg.message}</td>
                    <td className="p-1 whitespace-nowrap">{new Date(msg.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button
            className="px-4 py-1 bg-[#058A65] text-white rounded hover:bg-[#046B52]"
            onClick={() => navigate("/admin/contact-messages")}
          >
            查看全部留言
          </button>
        </div>
      </div>
    </div>
  );
}
