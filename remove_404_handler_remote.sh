#!/bin/bash

# 服务器信息
server="113.44.52.107"
username="root"
remote_file="/root/apps/zdhjsuo/builder-pulse-forge/dist/server/node-build.mjs"

echo "正在连接线上服务器删除 404 处理器代码..."

# 创建远程备份
echo "创建远程备份..."
ssh $username@$server "cp $remote_file ${remote_file}.backup.\$(date +%Y%m%d_%H%M%S)"

# 使用 sed 在远程服务器上删除指定的代码块
echo "删除 404 处理器代码块..."
ssh $username@$server "sed -i '/app2\.use((req, res) => {/,/^  });$/d' $remote_file"

# 验证删除结果
echo "验证删除结果..."
ssh $username@$server "grep -n 'app2\.use((req, res)' $remote_file || echo '404 处理器代码已成功删除'"

echo "完成！线上服务器的 404 处理器代码已被删除"
echo "如需恢复，可以使用备份文件"

