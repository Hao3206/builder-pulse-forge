#!/bin/bash

# 服务器信息
server="113.44.52.107"
username="root"
remote_dir="/root/apps/zdhjsuo/builder-pulse-forge/public"

# 本地 public 目录（可根据实际情况修改）
local_dir="./public/"

# 执行同步（只同步常见图片类型）
echo "正在同步本地 public 目录下的图片到服务器..."
scp $local_dir*.{png,jpg,jpeg,svg,gif,webp} $username@$server:$remote_dir

echo "图片已同步到服务器 $server:$remote_dir" 