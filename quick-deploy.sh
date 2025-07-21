#!/bin/bash

# 快速部署修复脚本
set -e

echo "🔧 快速修复部署问题..."

# 安装所有依赖（包括开发依赖）
echo "安装依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

# 检查构建结果
if [ -f "dist/server/node-build.mjs" ] && [ -f "dist/spa/index.html" ]; then
    echo "✅ 构建成功！"
    echo "📁 服务器文件: dist/server/node-build.mjs"
    echo "📁 前端文件: dist/spa/index.html"
else
    echo "❌ 构建失败，请检查错误信息"
    exit 1
fi

echo "🚀 现在可以继续使用 PM2 启动服务"
echo "运行: pm2 start ecosystem.config.cjs --env production"
