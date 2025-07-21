#!/bin/bash

# 测试部署脚本 - 验证构建文件
echo "🔍 检查构建文件..."

# 检查服务器构建文件
if [ -f "dist/server/node-build.mjs" ]; then
    echo "✅ 服务器构建文件存在: dist/server/node-build.mjs"
    echo "📊 文件大小: $(ls -lh dist/server/node-build.mjs | awk '{print $5}')"
else
    echo "❌ 服务器构建文件不存在: dist/server/node-build.mjs"
    exit 1
fi

# 检查前端构建文件
if [ -f "dist/spa/index.html" ]; then
    echo "✅ 前端构建文件存在: dist/spa/index.html"
else
    echo "❌ 前端构建文件不存在: dist/spa/index.html"
    exit 1
fi

echo ""
echo "🚀 所有构建文件都存在，可以启动服务器了！"
echo ""
echo "启动命令:"
echo "pm2 start ecosystem.config.cjs --env production"
echo ""
echo "或者直接运行:"
echo "node dist/server/node-build.mjs"
