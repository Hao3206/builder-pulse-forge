import { useEffect, useState } from "react";

interface ContactMessage {
  id: number;
  name: string;
  company: string;
  contact: string;
  message: string;
  createdAt: string;
  status: string;
  source?: string;
}

const statusOptions = ["未处理", "处理中", "已处理"];

export default function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/contact");
    const result = await res.json();
    if (result.success) {
      setMessages(result.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: number, status: string) => {
    setUpdatingId(id);
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchMessages();
    setUpdatingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">留言管理</h1>
      {loading ? (
        <div>加载中...</div>
      ) : messages.length === 0 ? (
        <div>暂无留言</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">姓名</th>
                <th className="p-2">公司</th>
                <th className="p-2">联系方式</th>
                <th className="p-2">留言内容</th>
                <th className="p-2">提交时间</th>
                <th className="p-2">来源</th>
                <th className="p-2">状态</th>
                <th className="p-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 whitespace-nowrap">{msg.name}</td>
                  <td className="p-2 whitespace-nowrap">{msg.company}</td>
                  <td className="p-2 whitespace-nowrap">{msg.contact}</td>
                  <td className="p-2 max-w-[240px] break-words">{msg.message}</td>
                  <td className="p-2 whitespace-nowrap">{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="p-2 whitespace-nowrap">{msg.source || "-"}</td>
                  <td className="p-2">
                    <select
                      className="border rounded px-2 py-1"
                      value={msg.status || "未处理"}
                      disabled={updatingId === msg.id}
                      onChange={e => handleStatusChange(msg.id, e.target.value)}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">
                    {updatingId === msg.id ? <span className="text-gray-400">更新中...</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 