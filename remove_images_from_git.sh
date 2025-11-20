#!/bin/bash

echo "正在从 Git 中移除 public 目录中的图片文件..."

# 从 Git 中移除所有 public 目录下的图片文件，但保留在本地
git rm --cached public/*.png public/*.jpg public/*.jpeg public/*.gif public/*.webp public/*.svg 2>/dev/null || true
git rm --cached -r public/uploads/ 2>/dev/null || true

echo "已从 Git 中移除图片文件"
echo "这些文件仍然保留在本地文件系统中"
echo ""
echo "现在你可以提交这个更改："
echo "git add .gitignore"
echo "git commit -m 'Remove images from Git tracking'"

