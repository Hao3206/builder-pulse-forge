# 🚀 浙东环境能源交易所 - 服务器部署指南

## 📋 部署前准备

### 系统要求

- Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- 至少 2GB RAM, 20GB 磁盘空间
- Node.js 18.x+
- 域名解析到服务器 IP

### 服务器配置

```bash
# 1. 连接到服务器
ssh user@your-server-ip

# 2. 更新系统
sudo apt update && sudo apt upgrade -y

# 3. 创建应用用户 (如果使用 root，跳过此步)
sudo adduser appuser
sudo usermod -aG sudo appuser
su - appuser
```

## 🔧 环境设置

### 一键环境设置

```bash
# 下载并运行环境设置脚本
wget https://raw.githubusercontent.com/your-repo/setup-server.sh
chmod +x setup-server.sh
./setup-server.sh
```

### 手动环境设置

```bash
# 安装 Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 安装 SSL 证书工具
sudo apt install -y certbot python3-certbot-nginx

# 配置防火墙
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
```

## 📦 代码部署

### 1. 克隆项目

```bash
# 创建应用目录
mkdir -p ~/apps/zdhjsuo
cd ~/apps/zdhjsuo

# 克隆代码
git clone https://github.com/your-username/zdhjsuo-website.git .

# 或者上传代码包
# scp -r ./project-folder user@server:~/apps/zdhjsuo/
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.production.template .env.production

# 编辑配置文件
nano .env.production
```

### 3. 部署应用

```bash
# 确保脚本可执行
chmod +x deploy.sh setup-server.sh monitor.sh

# 运行部署脚本
./deploy.sh
```

## 🌐 Nginx 配置

### 1. 创建 Nginx 配置

```bash
# 复制配置模板
sudo cp nginx.conf.template /etc/nginx/sites-available/zdhjsuo.com

# 编辑配置文件，替换域名
sudo nano /etc/nginx/sites-available/zdhjsuo.com
# 将 your-domain.com 替换为实际域名

# 启用站点
sudo ln -s /etc/nginx/sites-available/zdhjsuo.com /etc/nginx/sites-enabled/

# 删除认站点 (可选)
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 2. 申请 SSL 证书

```bash
# 使用 Let's Encrypt 申请免费 SSL 证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 设置自动续期
sudo crontab -e
# 添加以下行：
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 监控和维护

### PM2 命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs zdhjsuo-web

# 重启应用
pm2 restart zdhjsuo-web

# 监控面板
pm2 monit

# 查看详细信息
pm2 describe zdhjsuo-web
```

### 使用监控脚本

```bash
# 交互式监控菜单
./monitor.sh

# 直接执行特定操作
./monitor.sh status      # 查看状态
./monitor.sh logs        # 查看日志
./monitor.sh restart     # 重启服务
./monitor.sh backup      # 备份数据
./monitor.sh cleanup     # 清理日志
./monitor.sh update      # 更新应用
```

### 日志位置

```bash
# PM2 日志
~/apps/zdhjsuo/logs/

# Nginx 日志
/var/log/nginx/zdhjsuo_access.log
/var/log/nginx/zdhjsuo_error.log

# 系统日志
sudo journalctl -u nginx -f
```

## 🔄 更新部署

### 自动更新

```bash
cd ~/apps/zdhjsuo
git pull
./deploy.sh
```

### 回滚版本

```bash
# 查看备份
ls -la backups/

# 恢复备份 (如果需要)
tar -xzf backups/backup_20240101_120000.tar.gz
pm2 restart zdhjsuo-web
```

## 🛡️ 安全配置

### 1. 服务器安全

```bash
# 禁用 root SSH 登录
sudo nano /etc/ssh/sshd_config
# 设置 PermitRootLogin no

# 更改 SSH 端口 (可选)
# Port 2222

# 重启 SSH
sudo systemctl restart ssh

# 配置 fail2ban (可选)
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

### 2. 应用安全

- 定期更新依赖包
- 使用环境变量存储敏感信息
- 配置 CORS 和安全头
- 启用 HTTPS

## 🚨 故障排除

### 常见问题

#### 1. 应用无法启动

```bash
# 检查 Node.js 版本
node -v

# 检查依赖安装
npm list

# 查看详细错误
pm2 logs zdhjsuo-web --err
```

#### 2. Nginx 502 错误

```bash
# 检查应用是否运行
pm2 status

# 检查端口占用
sudo netstat -tlnp | grep :3000

# 检查 Nginx 配置
sudo nginx -t
```

#### 3. SSL 证书问题

```bash
# 检查证书状态
sudo certbot certificates

# 手动续期
sudo certbot renew

# 重新申请
sudo certbot --nginx -d your-domain.com --force-renewal
```

#### 4. 内存不足

```bash
# 查看内存使用
free -h

# 查看进程内存使用
pm2 monit

# 重启应��释放内存
pm2 restart zdhjsuo-web
```

## 📞 技术支持

### 监控检查清单

- [ ] 应用状态正常 (`pm2 status`)
- [ ] API 健康检查通过 (`curl http://localhost:3000/api/ping`)
- [ ] Nginx 运行正常 (`sudo systemctl status nginx`)
- [ ] SSL 证书有效 (`sudo certbot certificates`)
- [ ] 磁盘空间充足 (`df -h`)
- [ ] 内存使用正常 (`free -h`)

### 日常维护

- 每周检查系统更新
- 每月备份重要数据
- 监控日志文件大小
- 检查 SSL 证书有效期

### 性能优化

- 配置 Nginx 缓存
- 启用 Gzip 压缩
- 优化数据库查询 (如果使用)
- 监控应用性能指标

---

## 🎯 快速部署命令总结

```bash
# 1. 服务器初始化
./setup-server.sh

# 2. 克隆代码
git clone your-repo.git ~/apps/zdhjsuo
cd ~/apps/zdhjsuo

# 3. 部署应用
./deploy.sh

# 4. 配置 Nginx
sudo cp nginx.conf.template /etc/nginx/sites-available/zdhjsuo.com
sudo ln -s /etc/nginx/sites-available/zdhjsuo.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx

# 5. 申请 SSL
sudo certbot --nginx -d your-domain.com

# 6. 验证部署
./monitor.sh status
```

部署完成后，通过 `https://your-domain.com` 访问网站！
