#!/bin/bash

# 目标文件
target_file="./dist/server/node-build.mjs"

# 检查文件是否存在
if [ ! -f "$target_file" ]; then
    echo "错误: 文件 $target_file 不存在"
    exit 1
fi

# 创建备份
backup_file="${target_file}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$target_file" "$backup_file"
echo "已创建备份文件: $backup_file"

# 使用 sed 删除指定的代码块
# 删除从 "app2.use((req, res) => {" 开始到对应的 "});" 结束的整个代码块
sed -i '' '/app2\.use((req, res) => {/,/^  });$/d' "$target_file"

echo "已成功删除 404 处理器代码块"
echo "原文件已备份为: $backup_file"
echo "修改后的文件: $target_file"
