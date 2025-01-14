[English](./README_EN.md)
# 网页二维码读取器

这是一个Chrome扩展，可以快速读取网页中的二维码并跳转至相应网页。

## 功能

- 右键点击网页中的图片，选择"读取二维码"选项
- 自动解析二维码内容
- 如果二维码内容是有效URL，提供快速跳转按钮

## 安装

1. 克隆或下载此仓库
2. 打开Chrome浏览器，进入扩展管理页面（chrome://extensions/）
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"，选择项目根目录

## 使用

1. 在网页上找到包含二维码的图片
2. 右键点击图片，选择"读取二维码"选项
3. 查看解析结果，如果是有效URL，可以点击"跳转"按钮访问

## 技术栈

- JavaScript
- Chrome Extension API
- jsQR (二维码解析库)