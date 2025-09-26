#!/bin/bash

# 服务器信息
server="113.44.52.107"
username="root"
remote_dir="/root/apps/zdhjsuo/builder-pulse-forge/public"

# 本地 public 目录（可根据实际情况修改）
local_dir="./public/"

# 执行同步（递归同步所有子目录中的图片）
echo "正在同步本地 public 目录及其子目录下的图片到服务器..."

# 使用 rsync 递归同步所有图片文件
rsync -avz --include="*/" --include="*.png" --include="*.jpg" --include="*.jpeg" --include="*.svg" --include="*.gif" --include="*.webp" --exclude="*" $local_dir $username@$server:$remote_dir

echo "图片已同步到服务器 $server:$remote_dir" 