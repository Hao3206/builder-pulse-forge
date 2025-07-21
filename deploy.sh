#!/bin/bash

# 浙东环境能源交易所 - 生产环境部署脚本
# 使用方法: ./deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始部署浙东环境能源交易所网站..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Node.js 版本
echo -e "${BLUE}检查 Node.js 环境...${NC}"
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo -e "${RED}错误: 需要 Node.js 18 或更高版本，当前版本: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js 版本检查通过: $(node -v)${NC}"

# 创建必要目录
echo -e "${BLUE}创建日志目录...${NC}"
mkdir -p logs
mkdir -p backups

# 备份当前版本（如果存在）
if [ -d "dist" ]; then
    echo -e "${BLUE}备份当前版本...${NC}"
    timestamp=$(date +"%Y%m%d_%H%M%S")
    tar -czf "backups/backup_$timestamp.tar.gz" dist/ --exclude=node_modules 2>/dev/null || true
    echo -e "${GREEN}✓ 备份完成: backups/backup_$timestamp.tar.gz${NC}"
fi

# 安装所有依赖（构建需要开发依赖）
echo -e "${BLUE}安装所有依赖...${NC}"
npm ci --silent
echo -e "${GREEN}✓ 依赖安装完成${NC}"

# 构建项目
echo -e "${BLUE}构建项目...${NC}"
npm run build
echo -e "${GREEN}✓ 项目构建完成${NC}"

# 清理开发依赖（可选，节省空间）
echo -e "${BLUE}清理开发依赖...${NC}"
npm prune --production --silent
echo -e "${GREEN}✓ 开发依赖清理完成${NC}"

# 检查构建文件
if [ ! -f "dist/server/production.mjs" ]; then
    echo -e "${RED}错误: 服务器构建文件不存在${NC}"
    exit 1
fi

if [ ! -f "dist/spa/index.html" ]; then
    echo -e "${RED}错误: 前端构建文件不存在${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 构建文件检查通过${NC}"

# 检查 PM2 是否已安装
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 未安装，正在安装...${NC}"
    npm install -g pm2
    echo -e "${GREEN}✓ PM2 安装完成${NC}"
fi

# 停止旧进程（如果存在）
echo -e "${BLUE}停止旧进程...${NC}"
pm2 stop zdhjsuo-web 2>/dev/null || echo "没有找到运行中的进程"
pm2 delete zdhjsuo-web 2>/dev/null || echo "没有找到已注册的进程"

# 启动新进程
echo -e "${BLUE}启动生产服务器...${NC}"
pm2 start ecosystem.config.js --env production

# 保存 PM2 配置
pm2 save

# 设置开机自启动（首次部署时）
echo -e "${BLUE}配置开机自启动...${NC}"
pm2 startup | grep -E "sudo env PATH" | bash 2>/dev/null || echo "开机自启动已配置或需要手动配置"

# 显示状态
echo -e "${BLUE}检查服务状态...${NC}"
pm2 status

# 测试健康检查
echo -e "${BLUE}测试服务健康状态...${NC}"
sleep 3
if curl -f http://localhost:3000/api/ping >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 服务健康检查通过${NC}"
else
    echo -e "${YELLOW}⚠ 服务可能需要更多时间启动，请稍后检查${NC}"
fi

echo -e "${GREEN}"
echo "=================================================="
echo "🎉 部署完成！"
echo "=================================================="
echo -e "${NC}"
echo "服务状态: pm2 status"
echo "查看日志: pm2 logs zdhjsuo-web"
echo "重启服务: pm2 restart zdhjsuo-web"
echo "监控服务: pm2 monit"
echo ""
echo "本地访问: http://localhost:3000"
echo "API 健康检查: http://localhost:3000/api/ping"
echo ""
echo -e "${YELLOW}请配置 Nginx 反向代理以支持域名访问${NC}"
