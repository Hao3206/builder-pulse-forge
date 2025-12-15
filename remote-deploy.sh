#!/bin/bash

# 远程服务器部署脚本
# 从本地执行，自动部署到服务器
# 使用方法: ./remote-deploy.sh

set -e

# 服务器配置
SERVER_IP="113.44.52.107"
SERVER_USER="root"
PROJECT_PATH="/root/apps/zdhjsuo/builder-pulse-forge"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=================================================="
echo "  远程部署到服务器: ${SERVER_IP}"
echo "==================================================${NC}"
echo ""

# 检查 SSH 连接
echo -e "${BLUE}[1/4] 检查服务器连接...${NC}"
if ssh -o ConnectTimeout=5 ${SERVER_USER}@${SERVER_IP} "echo '连接成功'" 2>/dev/null; then
    echo -e "${GREEN}✓ 服务器连接正常${NC}"
else
    echo -e "${RED}✗ 无法连接到服务器，请检查：${NC}"
    echo "  1. SSH 密钥是否已配置"
    echo "  2. 服务器 IP 是否正确: ${SERVER_IP}"
    echo "  3. 网络连接是否正常"
    exit 1
fi

# 检查服务器环境
echo -e "${BLUE}[2/4] 检查服务器环境...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << 'EOF'
    cd /root/apps/zdhjsuo/builder-pulse-forge
    
    # 检查 Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        echo "✓ Node.js: $NODE_VERSION"
    else
        echo "✗ Node.js 未安装"
        exit 1
    fi
    
    # 检查项目目录
    if [ ! -d "/root/apps/zdhjsuo/builder-pulse-forge" ]; then
        echo "✗ 项目目录不存在"
        exit 1
    else
        echo "✓ 项目目录存在"
    fi
EOF

if [ $? -ne 0 ]; then
    echo -e "${RED}环境检查失败，请先配置服务器环境${NC}"
    exit 1
fi

# 执行部署
echo -e "${BLUE}[3/4] 开始部署...${NC}"
ssh ${SERVER_USER}@${SERVER_IP} << EOF
    set -e
    cd ${PROJECT_PATH}
    
    # 确保脚本有执行权限
    chmod +x deploy.sh server-update.sh monitor.sh 2>/dev/null || true
    
    # 执行部署
    ./deploy.sh
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ 部署完成${NC}"
else
    echo -e "${RED}✗ 部署失败，请检查错误信息${NC}"
    exit 1
fi

# 验证部署
echo -e "${BLUE}[4/4] 验证部署...${NC}"
sleep 3
if ssh ${SERVER_USER}@${SERVER_IP} "curl -f http://localhost:3000/api/ping >/dev/null 2>&1"; then
    echo -e "${GREEN}✓ 服务运行正常${NC}"
else
    echo -e "${YELLOW}⚠ 服务可能需要更多时间启动${NC}"
fi

echo ""
echo -e "${GREEN}=================================================="
echo "  🎉 部署完成！"
echo "==================================================${NC}"
echo ""
echo "服务器信息:"
echo "  IP: ${SERVER_IP}"
echo "  项目路径: ${PROJECT_PATH}"
echo ""
echo "管理命令:"
echo "  SSH 连接: ssh ${SERVER_USER}@${SERVER_IP}"
echo "  查看状态: ssh ${SERVER_USER}@${SERVER_IP} 'cd ${PROJECT_PATH} && pm2 status'"
echo "  查看日志: ssh ${SERVER_USER}@${SERVER_IP} 'cd ${PROJECT_PATH} && pm2 logs zdhjsuo-web'"
echo ""



