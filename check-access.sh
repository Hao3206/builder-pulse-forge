#!/bin/bash

# 快速检查远程访问状态

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 检查浙东环境能源交易所访问状态...${NC}"

# 获取公网IP
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "获取失败")

echo -e "${YELLOW}服务器信息:${NC}"
echo "公网IP: $PUBLIC_IP"
echo ""

# 检查PM2状态
echo -e "${YELLOW}PM2服务状态:${NC}"
pm2 status

echo ""

# 检查本地服务
echo -e "${YELLOW}本地服务检查:${NC}"
if curl -f http://localhost:3000/api/ping >/dev/null 2>&1; then
    echo -e "${GREEN}✓ 本地服务正常 (localhost:3000)${NC}"
else
    echo "❌ 本地服务异常"
fi

# 检查Nginx状态
if command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Nginx状态:${NC}"
    systemctl status nginx --no-pager -l | head -3
    
    if systemctl is-active nginx >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Nginx运行正常${NC}"
        
        # 测试Nginx配置
        if nginx -t >/dev/null 2>&1; then
            echo -e "${GREEN}✓ Nginx配置正确${NC}"
        else
            echo "❌ Nginx配置有问题"
        fi
    else
        echo "❌ Nginx未运行"
    fi
else
    echo "Nginx未安装"
fi

echo ""
echo -e "${YELLOW}可能的访问地址:${NC}"

# 如果Nginx正在运行且配置正确
if command -v nginx &> /dev/null && systemctl is-active nginx >/dev/null 2>&1 && nginx -t >/dev/null 2>&1; then
    echo "网站首页: http://$PUBLIC_IP"
    echo "API测试: http://$PUBLIC_IP/api/ping"
    echo "管理后台: http://$PUBLIC_IP/admin/login"
    echo "健康检查: http://$PUBLIC_IP/health"
else
    echo "直接访问: http://$PUBLIC_IP:3000"
    echo "API测试: http://$PUBLIC_IP:3000/api/ping"
    echo "管理后台: http://$PUBLIC_IP:3000/admin/login"
fi

echo ""
echo -e "${YELLOW}管理后台登录:${NC}"
echo "用户名: admin"
echo "密码: zdhjsuo2024"

echo ""
echo -e "${YELLOW}如果无法访问，请检查:${NC}"
echo "1. 云服务器安全组是否��放端口 (80, 443, 或 3000)"
echo "2. 服务器防火墙设置: ufw status"
echo "3. 应用日志: pm2 logs zdhjsuo-web"
echo "4. Nginx日志: tail -f /var/log/nginx/error.log"
