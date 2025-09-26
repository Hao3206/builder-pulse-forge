import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  MessageSquare,
  User,
  Building,
  Phone,
  Calendar,
  MapPin
} from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  company: string;
  contact: string;
  message: string;
  source: string;
  status: string;
  createdAt: string;
}

export default function AdminContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, statusFilter]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
    if (result.success) {
      setMessages(result.data);
    }
    } catch (error) {
      console.error("获取咨询信息失败:", error);
    } finally {
    setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    // 按状态筛选
    if (statusFilter !== "全部") {
      filtered = filtered.filter(msg => msg.status === statusFilter);
    }

    // 按搜索词筛选
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  };

  const updateMessageStatus = async (messageId: number, newStatus: string) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/contact/${messageId}`, {
      method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // 更新本地状态
        setMessages(prev => 
          prev.map(msg => 
            msg.id === messageId ? { ...msg, status: newStatus } : msg
          )
        );
        setShowDetailDialog(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("更新状态失败:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "已处理":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />已处理</Badge>;
      case "处理中":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />处理中</Badge>;
      case "未处理":
      default:
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />未处理</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSourceLabel = (source: string) => {
    if (!source) return "未知来源";
    const sourceMap: { [key: string]: string } = {
      "/": "首页",
      "/about": "关于我们",
      "/carbon-footprint": "碳足迹",
      "/corporate-carbon-management": "企业碳管理",
      "/zero-carbon-park": "零碳园区",
    };
    return sourceMap[source] || source;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">客户咨询管理</h1>
              <p className="text-gray-600 mt-1">查看和管理所有客户咨询信息</p>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">共 {filteredMessages.length} 条咨询</span>
            </div>
          </div>
        </div>

        {/* 筛选和搜索 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="搜索姓名、公司、联系方式或内容..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="筛选状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="全部">全部状态</SelectItem>
                    <SelectItem value="未处理">未处理</SelectItem>
                    <SelectItem value="处理中">处理中</SelectItem>
                    <SelectItem value="已处理">已处理</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 咨询列表 */}
        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无咨询信息</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "全部" 
                    ? "没有找到符合条件的咨询信息" 
                    : "还没有客户提交咨询信息"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredMessages.map((message) => (
              <Card key={message.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{message.name}</h3>
                        {getStatusBadge(message.status)}
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {getSourceLabel(message.source)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Building className="w-4 h-4" />
                          <span>{message.company || "未填写公司"}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{message.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(message.createdAt)}</span>
                        </div>
                      </div>
                      
                      <div className="text-gray-700">
                        <p className="line-clamp-2">{message.message}</p>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex flex-col space-y-2">
                      <Dialog open={showDetailDialog && selectedMessage?.id === message.id} onOpenChange={(open) => {
                        if (open) {
                          setSelectedMessage(message);
                          setUpdateStatus(message.status);
                          setShowDetailDialog(true);
                        } else {
                          setShowDetailDialog(false);
                          setSelectedMessage(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            查看详情
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>咨询详情</DialogTitle>
                          </DialogHeader>
                          {selectedMessage && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-gray-500">姓名</label>
                                  <p className="text-lg font-semibold">{selectedMessage.name}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">联系方式</label>
                                  <p className="text-lg">{selectedMessage.contact}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">公司</label>
                                  <p className="text-lg">{selectedMessage.company || "未填写"}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">来源页面</label>
                                  <p className="text-lg">{getSourceLabel(selectedMessage.source)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">提交时间</label>
                                  <p className="text-lg">{formatDate(selectedMessage.createdAt)}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-gray-500">当前状态</label>
                                  <div className="mt-1">{getStatusBadge(selectedMessage.status)}</div>
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-gray-500">咨询内容</label>
                                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                                  <p className="text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <label className="text-sm font-medium text-gray-500">更新状态:</label>
                                <Select value={updateStatus} onValueChange={setUpdateStatus}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="未处理">未处理</SelectItem>
                                    <SelectItem value="处理中">处理中</SelectItem>
                                    <SelectItem value="已处理">已处理</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button 
                                  onClick={() => updateMessageStatus(selectedMessage.id, updateStatus)}
                                  disabled={updating || updateStatus === selectedMessage.status}
                                  size="sm"
                                >
                                  {updating ? "更新中..." : "更新状态"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 