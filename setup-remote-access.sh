#!/bin/bash

# 浙东环境能源交易所 - 远程访问配置脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🌐 配置浙东环境能源交易所远程访问...${NC}"

# 获取服务器公网IP
echo -e "${BLUE}获取服务器信息...${NC}"
PUBLIC_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip || echo "无法获取公网IP")
PRIVATE_IP=$(hostname -I | awk '{print $1}')

echo -e "${GREEN}服务器信息:${NC}"
echo "公网IP: $PUBLIC_IP"
echo "内网IP: $PRIVATE_IP"
echo ""

# 检查端口是否开放
echo -e "${BLUE}检查服务状态...${NC}"
if curl -f http://localhost:3000/api/ping >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 应用服务正常运行${NC}"
else
    echo -e "${RED}❌ 应用服务未正常运行，请检查PM2状态${NC}"
    echo "运行: pm2 status"
    exit 1
fi

# 选择配置方式
echo ""
echo -e "${YELLOW}请选择远程访问配置方式:${NC}"
echo "1) 直接开放端口3000（简单，但不推荐生产环境）"
echo "2) 配置Nginx反向代理（推荐）"
echo "3) 仅查看当前配置"
echo ""
read -p "请输入选择 (1-3): " choice

case $choice in
    1)
        echo -e "${YELLOW}配置防火墙开放端口3000...${NC}"
        
        # UFW防火墙配置
        if command -v ufw &> /dev/null; then
            echo "配置UFW防火墙..."
            ufw allow 3000
            ufw status
        fi
        
        # iptables配置（备用）
        if command -v iptables &> /dev/null; then
            echo "配置iptables..."
            iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
            # 保存规则（Ubuntu/Debian）
            if command -v iptables-save &> /dev/null; then
                iptables-save > /etc/iptables/rules.v4 2>/dev/null || echo "请手动保存iptables规则"
            fi
        fi
        
        echo -e "${GREEN}✓ 端口3000已开放${NC}"
        echo -e "${YELLOW}访问地址: http://$PUBLIC_IP:3000${NC}"
        ;;
        
    2)
        echo -e "${YELLOW}配置Nginx反向代理...${NC}"
        
        # 安装Nginx
        if ! command -v nginx &> /dev/null; then
            echo "安装Nginx..."
            apt update
            apt install -y nginx
        fi
        
        # 备份默认配置
        if [ -f "/etc/nginx/sites-available/default" ]; then
            cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
        fi
        
        # 复制配置文件
        cp nginx-site.conf /etc/nginx/sites-available/zdhjsuo
        
        # 启用站点
        ln -sf /etc/nginx/sites-available/zdhjsuo /etc/nginx/sites-enabled/
        
        # 禁用默认站点
        rm -f /etc/nginx/sites-enabled/default
        
        # 测试Nginx配置
        nginx -t
        
        if [ $? -eq 0 ]; then
            # 重启Nginx
            systemctl restart nginx
            systemctl enable nginx
            
            # 开放HTTP端口
            if command -v ufw &> /dev/null; then
                ufw allow 'Nginx Full'
            fi
            
            echo -e "${GREEN}✓ Nginx配置完成${NC}"
            echo -e "${YELLOW}访问地址: http://$PUBLIC_IP${NC}"
            echo -e "${BLUE}健康检查: http://$PUBLIC_IP/health${NC}"
        else
            echo -e "${RED}❌ Nginx配置有误，请检查${NC}"
            exit 1
        fi
        ;;
        
    3)
        echo -e "${BLUE}当前配置信息:${NC}"
        ;;
        
    *)
        echo -e "${RED}无效选择${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=== 远程访问信息 ===${NC}"
echo "服务器公网IP: $PUBLIC_IP"
echo "应用端口: 3000"
echo ""

if [ "$choice" = "1" ]; then
    echo -e "${YELLOW}直接访问:${NC}"
    echo "网站: http://$PUBLIC_IP:3000"
    echo "API: http://$PUBLIC_IP:3000/api/ping"
    echo "管理后台: http://$PUBLIC_IP:3000/admin/login"
elif [ "$choice" = "2" ]; then
    echo -e "${YELLOW}通过Nginx访问:${NC}"
    echo "网站: http://$PUBLIC_IP"
    echo "API: http://$PUBLIC_IP/api/ping"
    echo "管理后台: http://$PUBLIC_IP/admin/login"
    echo "健康检查: http://$PUBLIC_IP/health"
fi

echo ""
echo -e "${BLUE}管理后台登录信息:${NC}"
echo "用户名: admin"
echo "密码: zdhjsuo2024"
echo ""

echo -e "${YELLOW}注意事项:${NC}"
echo "1. 确保云服务器安全组/防火墙已开放相应端口"
echo "2. 如果有域名，请将域名A记录指向: $PUBLIC_IP"
echo "3. 生产环境建议配置HTTPS证书"
echo "4. 定期检查应用日志: pm2 logs zdhjsuo-web"

# 测试连通性
echo ""
echo -e "${BLUE}测��远程连通性...${NC}"
if [ "$choice" = "1" ]; then
    TEST_URL="http://$PUBLIC_IP:3000/api/ping"
elif [ "$choice" = "2" ]; then
    TEST_URL="http://$PUBLIC_IP/api/ping"
else
    TEST_URL="http://localhost:3000/api/ping"
fi

if curl -f "$TEST_URL" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 服务可正常访问${NC}"
else
    echo -e "${YELLOW}⚠ 可能需要配置云服务器安全组规则${NC}"
fi
