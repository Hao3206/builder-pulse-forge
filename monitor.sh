#!/bin/bash

# 系统监控和维护脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

show_status() {
    echo -e "${BLUE}=== 系统状态概览 ===${NC}"
    
    # 系统信息
    echo -e "${YELLOW}系统信息:${NC}"
    echo "  服务器时间: $(date)"
    echo "  系统负载: $(uptime | awk -F'load average:' '{print $2}')"
    echo "  内存使用: $(free -h | awk 'NR==2{printf "%.1f%% (%s/%s)", $3*100/$2, $3, $2}')"
    echo "  磁盘使用: $(df -h / | awk 'NR==2{printf "%s (%s)", $5, $4}')"
    echo ""
    
    # PM2 状态
    echo -e "${YELLOW}应用状态:${NC}"
    pm2 status
    echo ""
    
    # Nginx 状态
    echo -e "${YELLOW}Nginx 状态:${NC}"
    if systemctl is-active --quiet nginx; then
        echo -e "  ${GREEN}✓ Nginx 运行正常${NC}"
    else
        echo -e "  ${RED}✗ Nginx 未运��${NC}"
    fi
    
    # 服务健康检查
    echo -e "${YELLOW}服务健康检查:${NC}"
    if curl -f http://localhost:3000/api/ping >/dev/null 2>&1; then
        echo -e "  ${GREEN}✓ API 服务正常${NC}"
    else
        echo -e "  ${RED}✗ API 服务异常${NC}"
    fi
    
    # 最近的错误日志
    echo -e "${YELLOW}最近错误 (最后10行):${NC}"
    if [ -f "logs/err.log" ]; then
        tail -n 10 logs/err.log | while IFS= read -r line; do
            echo -e "  ${RED}$line${NC}"
        done
    else
        echo "  无错误日志文件"
    fi
}

show_logs() {
    echo -e "${BLUE}=== 应用日志 ===${NC}"
    echo "选择要查看的日志:"
    echo "1) 所有日志"
    echo "2) 错误日志"
    echo "3) 输出日志"
    echo "4) 实时日志"
    read -p "请选择 (1-4): " choice
    
    case $choice in
        1) pm2 logs zdhjsuo-web --lines 50 ;;
        2) pm2 logs zdhjsuo-web --err --lines 50 ;;
        3) pm2 logs zdhjsuo-web --out --lines 50 ;;
        4) pm2 logs zdhjsuo-web --lines 0 ;;
        *) echo "无效选择" ;;
    esac
}

restart_services() {
    echo -e "${BLUE}=== 重启服务 ===${NC}"
    echo "选择要重启的服务:"
    echo "1) 重启应用 (PM2)"
    echo "2) 重启 Nginx"
    echo "3) 重启所有服务"
    read -p "请选择 (1-3): " choice
    
    case $choice in
        1)
            echo "重启应用..."
            pm2 restart zdhjsuo-web
            echo -e "${GREEN}✓ 应用重启完成${NC}"
            ;;
        2)
            echo "重启 Nginx..."
            sudo systemctl restart nginx
            echo -e "${GREEN}✓ Nginx 重启完成${NC}"
            ;;
        3)
            echo "重启所有服务..."
            pm2 restart zdhjsuo-web
            sudo systemctl restart nginx
            echo -e "${GREEN}✓ 所有服务重启完成${NC}"
            ;;
        *) echo "无效选择" ;;
    esac
}

backup_data() {
    echo -e "${BLUE}=== 数据备份 ===${NC}"
    timestamp=$(date +"%Y%m%d_%H%M%S")
    backup_dir="backups/manual_backup_$timestamp"
    
    mkdir -p "$backup_dir"
    
    # 备份日志
    if [ -d "logs" ]; then
        cp -r logs "$backup_dir/"
        echo "✓ 日志已备份"
    fi
    
    # 备份配置文件
    cp ecosystem.config.js "$backup_dir/" 2>/dev/null || true
    cp package*.json "$backup_dir/" 2>/dev/null || true
    
    # 打包备份
    tar -czf "backups/manual_backup_$timestamp.tar.gz" "$backup_dir"
    rm -rf "$backup_dir"
    
    echo -e "${GREEN}✓ 备份完成: backups/manual_backup_$timestamp.tar.gz${NC}"
}

cleanup_logs() {
    echo -e "${BLUE}=== 清理日志 ===${NC}"
    echo "当前日志大小:"
    if [ -d "logs" ]; then
        du -sh logs/*
        echo ""
        read -p "是否清理 7 天前的日志? (y/N): " confirm
        if [[ $confirm == [yY] ]]; then
            find logs/ -name "*.log" -mtime +7 -delete
            echo -e "${GREEN}✓ 旧日志清理完成${NC}"
        fi
    else
        echo "没有找到日志目录"
    fi
}

update_app() {
    echo -e "${BLUE}=== 更新应用 ===${NC}"
    echo -e "${YELLOW}警告: 此操作将拉取最新代码并重新部署${NC}"
    read -p "确认继续? (y/N): " confirm
    
    if [[ $confirm == [yY] ]]; then
        echo "拉取最新代码..."
        git pull
        echo "重新部署..."
        ./deploy.sh
        echo -e "${GREEN}✓ 应用更新完成${NC}"
    else
        echo "操作已取消"
    fi
}

show_help() {
    echo -e "${BLUE}=== 监控脚本使用说明 ===${NC}"
    echo "用法: ./monitor.sh [选项]"
    echo ""
    echo "选项:"
    echo "  status    - 显示系统状态"
    echo "  logs      - 查看应用日志"
    echo "  restart   - 重启服务"
    echo "  backup    - 手动备份"
    echo "  cleanup   - 清理日志"
    echo "  update    - 更新应用"
    echo "  help      - 显示此帮助"
    echo ""
    echo "无参数运行时显示交互菜单"
}

# 主菜单
show_menu() {
    while true; do
        echo -e "${BLUE}"
        echo "=================================================="
        echo "     浙东环境能源交易所 - 系统监控"
        echo "=================================================="
        echo -e "${NC}"
        echo "1) 查看状态"
        echo "2) 查看日志"
        echo "3) 重启服务"
        echo "4) 数据备份"
        echo "5) 清理日志"
        echo "6) 更新应用"
        echo "7) 帮助"
        echo "0) 退出"
        echo ""
        read -p "请选择操作 (0-7): " choice
        echo ""
        
        case $choice in
            1) show_status ;;
            2) show_logs ;;
            3) restart_services ;;
            4) backup_data ;;
            5) cleanup_logs ;;
            6) update_app ;;
            7) show_help ;;
            0) echo "再见！"; exit 0 ;;
            *) echo -e "${RED}无效选择，请重试${NC}" ;;
        esac
        echo ""
        read -p "按 Enter 继续..."
        clear
    done
}

# ��理命令行参数
case "$1" in
    status) show_status ;;
    logs) show_logs ;;
    restart) restart_services ;;
    backup) backup_data ;;
    cleanup) cleanup_logs ;;
    update) update_app ;;
    help) show_help ;;
    "") show_menu ;;
    *) echo "未知选项: $1"; show_help ;;
esac
