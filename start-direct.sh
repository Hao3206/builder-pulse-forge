#!/bin/bash

echo "🚀 直接启动Node.js生产服务器..."

# 设置环境变量
export NODE_ENV=production
export PORT=3000

# 检查构建文件
if [ ! -f "dist/server/node-build.mjs" ]; then
    echo "❌ 服务器构建文件不存在，请先运行构建"
    echo "运行: npm run build"
    exit 1
fi

if [ ! -f "dist/spa/index.html" ]; then
    echo "❌ 前端构建文件不存在，请先运行构建"
    echo "运行: npm run build"
    exit 1
fi

echo "✅ 构建文件检查通过"
echo "🌐 启动服务器 http://localhost:3000"
echo "📱 前端访问: http://localhost:3000"
echo "🔧 API访问: http://localhost:3000/api/ping"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

# 启动服务器
node dist/server/node-build.mjs
