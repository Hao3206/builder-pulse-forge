#!/bin/bash

echo "🚀 启动生产服务器..."

# 确保日志目录存在
mkdir -p logs

# 停止旧进程（如果存在）
echo "停止旧进程..."
pm2 stop zdhjsuo-web 2>/dev/null || echo "没有找到运行中的进程"
pm2 delete zdhjsuo-web 2>/dev/null || echo "没有找到已注册的进程"

# 启动新进程
echo "启动新进程..."
pm2 start ecosystem.config.cjs --env production

# 显示状态
echo "检查服务状态..."
pm2 status

# 保存配置
pm2 save

echo "✅ 服务器已启动"
echo "查看日志: pm2 logs zdhjsuo-web"
echo "监控服务: pm2 monit"
echo "访问网站: http://localhost:3000"
