#!/bin/bash

# Git 更新代码后的快速部署脚本
# 使用方法: ./update-deploy.sh

set -e  # 遇到错误立即退出

echo "🔄 Git 更新代码后的部署流程..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. 拉取最新代码
echo -e "${BLUE}步骤 1: 拉取最新代码...${NC}"
git pull origin main
echo -e "${GREEN}✓ 代码更新完成${NC}"

# 2. 检查是否有 package.json 或 package-lock.json 的变化
echo -e "${BLUE}步骤 2: 检查依赖变化...${NC}"
if git diff HEAD@{1} HEAD --name-only | grep -q "package"; then
    echo -e "${YELLOW}检测到依赖文件变化，需要重新安装依赖${NC}"
    npm ci --silent
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 依赖文件未变化，跳过安装${NC}"
fi

# 3. 构建项目
echo -e "${BLUE}步骤 3: 构建项目...${NC}"
npm run build
echo -e "${GREEN}✓ 项目构建完成${NC}"

# 4. 重启服务
echo -e "${BLUE}步骤 4: 重启服务...${NC}"
pm2 restart zdhjsuo-web
echo -e "${GREEN}✓ 服务重启完成${NC}"

# 5. 健康检查
echo -e "${BLUE}步骤 5: 健康检查...${NC}"
sleep 3
if curl -f http://localhost:3000/api/ping >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 服务健康检查通过${NC}"
else
    echo -e "${YELLOW}⚠ 服务可能需要更多时间启动，请稍后检查${NC}"
fi

echo -e "${GREEN}"
echo "=================================================="
echo "🎉 更新部署完成！"
echo "=================================================="
echo -e "${NC}"
echo "查看服务状态: pm2 status"
echo "查看日志: pm2 logs zdhjsuo-web"
echo "访问网站: http://localhost:3000"



