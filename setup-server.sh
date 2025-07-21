#!/bin/bash

# 服务器环境初始化脚本
# 适用于 Ubuntu/Debian 系统

set -e

echo "🔧 初始化服务器环境..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 检查是否为 root 用户
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}请不要使用 root 用户运行此脚本${NC}"
   echo "建议创建普通用户: sudo adduser appuser"
   exit 1
fi

# 更新系统
echo -e "${BLUE}更新系统包...${NC}"
sudo apt update && sudo apt upgrade -y

# 安装基础工具
echo -e "${BLUE}安装基础工具...${NC}"
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# 安装 Node.js 18.x
echo -e "${BLUE}安装 Node.js 18.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 验证 Node.js 安��
node_version=$(node -v)
npm_version=$(npm -v)
echo -e "${GREEN}✓ Node.js 安装完成: ${node_version}${NC}"
echo -e "${GREEN}✓ NPM 版本: ${npm_version}${NC}"

# 安装 PM2
echo -e "${BLUE}安装 PM2...${NC}"
sudo npm install -g pm2

# 安装 Nginx
echo -e "${BLUE}安装 Nginx...${NC}"
sudo apt install -y nginx

# 启动并启用 Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 配置防火墙
echo -e "${BLUE}配置 UFW 防火墙...${NC}"
sudo ufw --force enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw allow 80
sudo ufw allow 443

# 创建应用目录
echo -e "${BLUE}创建应用目录...${NC}"
mkdir -p ~/apps/zdhjsuo
cd ~/apps/zdhjsuo

# 设置 Git 配置（如果需要）
echo -e "${BLUE}Git 配置...${NC}"
read -p "输入 Git 用户名 (回车跳过): " git_username
if [ ! -z "$git_username" ]; then
    git config --global user.name "$git_username"
    read -p "输入 Git 邮箱: " git_email
    git config --global user.email "$git_email"
    echo -e "${GREEN}✓ Git 配置完成${NC}"
fi

# 安装 Certbot (用于 SSL 证书)
echo -e "${BLUE}安装 Certbot...${NC}"
sudo apt install -y certbot python3-certbot-nginx

echo -e "${GREEN}"
echo "=================================================="
echo "🎉 服���器环境设置完成！"
echo "=================================================="
echo -e "${NC}"
echo "下一步操作:"
echo "1. 克隆项目代码到 ~/apps/zdhjsuo"
echo "2. 运行 ./deploy.sh 部署应用"
echo "3. 配置 Nginx (使用 nginx.conf.template)"
echo "4. 申请 SSL 证书"
echo ""
echo "当前目录: $(pwd)"
echo "Nginx 配置目录: /etc/nginx/sites-available/"
echo "应用日志: ~/apps/zdhjsuo/logs/"
echo ""
echo -e "${YELLOW}重要提醒:${NC}"
echo "- 确保域名已解析到此服务器 IP"
echo "- 配置 Nginx 后需要重启: sudo systemctl restart nginx"
echo "- 申请 SSL: sudo certbot --nginx -d your-domain.com"
