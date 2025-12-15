# 服务器部署指南 - 113.44.52.107

## 服务器信息
- **IP**: 113.44.52.107
- **项目路径**: `/root/apps/zdhjsuo/builder-pulse-forge`

## 快速部署步骤

### 1. SSH 连接到服务器
```bash
ssh root@113.44.52.107
```

### 2. 进入项目目录
```bash
cd /root/apps/zdhjsuo/builder-pulse-forge
```

### 3. 检查环境
```bash
# 检查 Node.js 版本（需要 18+）
node -v

# 检查 PM2 是否安装
pm2 -v

# 检查 Nginx 是否安装（可选）
nginx -v
```

### 4. 执行部署
```bash
# 确保脚本有执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

## 详细部署流程

### 步骤 1: 环境检查

```bash
# 检查 Node.js
node -v
# 如果版本 < 18，需要安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 检查 PM2
pm2 -v
# 如果未安装
npm install -g pm2
```

### 步骤 2: 拉取最新代码（如果需要）

```bash
cd /root/apps/zdhjsuo/builder-pulse-forge
git pull origin main
```

### 步骤 3: 执行部署脚本

```bash
# 给脚本添加执行权限
chmod +x deploy.sh setup-server.sh monitor.sh

# 执行部署
./deploy.sh
```

### 步骤 4: 验证部署

```bash
# 检查 PM2 服务状态
pm2 status

# 检查服务日志
pm2 logs zdhjsuo-web --lines 50

# 测试 API
curl http://localhost:3000/api/ping
```

### 步骤 5: 配置 Nginx（如果需要域名访问）

```bash
# 复制 Nginx 配置模板
cp nginx.conf.template /etc/nginx/sites-available/zdhjsuo.conf

# 编辑配置文件，替换域名
nano /etc/nginx/sites-available/zdhjsuo.conf
# 将 your-domain.com 替换为实际域名

# 启用站点
ln -s /etc/nginx/sites-available/zdhjsuo.conf /etc/nginx/sites-enabled/

# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx
```

## 一键部署命令（从本地执行）

如果你想从本地直接执行服务器部署，可以使用：

```bash
ssh root@113.44.52.107 "cd /root/apps/zdhjsuo/builder-pulse-forge && chmod +x deploy.sh && ./deploy.sh"
```

## 常用管理命令

### 查看服务状态
```bash
pm2 status
pm2 logs zdhjsuo-web
pm2 monit
```

### 重启服务
```bash
pm2 restart zdhjsuo-web
```

### 停止服务
```bash
pm2 stop zdhjsuo-web
```

### 更新代码后重新部署
```bash
cd /root/apps/zdhjsuo/builder-pulse-forge
git pull origin main
./deploy.sh
```

## 故障排查

### 如果部署失败

1. **检查 Node.js 版本**
   ```bash
   node -v
   # 需要 18.x 或更高
   ```

2. **检查构建错误**
   ```bash
   npm run build
   # 查看具体错误信息
   ```

3. **查看 PM2 日志**
   ```bash
   pm2 logs zdhjsuo-web --err
   ```

4. **检查端口占用**
   ```bash
   netstat -tlnp | grep 3000
   ```

5. **检查文件权限**
   ```bash
   ls -la dist/server/node-build.mjs
   ```

### 如果服务无法访问

1. **检查防火墙**
   ```bash
   ufw status
   # 如果需要开放端口
   ufw allow 3000
   ```

2. **检查服务是否运行**
   ```bash
   pm2 status
   curl http://localhost:3000/api/ping
   ```

3. **检查 Nginx 配置（如果使用）**
   ```bash
   nginx -t
   systemctl status nginx
   ```

## 后续更新流程

当代码更新后，在服务器上执行：

```bash
cd /root/apps/zdhjsuo/builder-pulse-forge
git pull origin main
./deploy.sh
```

或者使用快速更新脚本：

```bash
./server-update.sh
```

## 注意事项

1. **首次部署**：确保服务器已安装 Node.js 18+ 和 PM2
2. **端口冲突**：确保 3000 端口未被占用
3. **文件权限**：确保脚本有执行权限
4. **环境变量**：如果有 `.env` 文件，确保已正确配置
5. **数据库**：如果有数据库，确保已正确配置连接



