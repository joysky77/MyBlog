---
layout: post
title: "启源输入 Android 0.2.4：下载与使用说明"
date: 2026-09-13 11:15:00 +0800
categories: 软件
tags: [Android, 输入法, 启源输入, 双拼]
---

启源输入 Android 版是一款基于 RIME/librime 的中文输入法，兼顾屏幕触摸输入和蓝牙、USB 实体键盘。当前版本为 **0.2.4**，支持 Android 5.0 及以上系统。

## 下载

大多数近年的安卓手机和平板使用 `arm64-v8a`，通常下载第一项即可。若安装时提示不兼容，再根据设备 CPU 选择其他版本。

- [下载 0.2.4 arm64-v8a（常见手机和平板）](https://github.com/joysky77/MyBlog/releases/download/qiyuan-ime-android-v0.2.4/com.yangy.qiyuan.ime-0.2.4-arm64-v8a-release.apk)
- [下载 0.2.4 armeabi-v7a（较旧的 32 位 ARM 设备）](https://github.com/joysky77/MyBlog/releases/download/qiyuan-ime-android-v0.2.4/com.yangy.qiyuan.ime-0.2.4-armeabi-v7a-release.apk)
- [下载 0.2.4 x86_64（64 位 x86 设备或模拟器）](https://github.com/joysky77/MyBlog/releases/download/qiyuan-ime-android-v0.2.4/com.yangy.qiyuan.ime-0.2.4-x86_64-release.apk)
- [下载 0.2.4 x86（32 位 x86 设备或模拟器）](https://github.com/joysky77/MyBlog/releases/download/qiyuan-ime-android-v0.2.4/com.yangy.qiyuan.ime-0.2.4-x86-release.apk)
- [查看 SHA-256 校验值](https://github.com/joysky77/MyBlog/releases/download/qiyuan-ime-android-v0.2.4/SHA256SUMS.txt)

四个 APK 均已通过 Android APK Signature Scheme v1、v2 签名校验，发布证书 SHA-256 为：

```text
B1057668E0855A43F0D9A1B7E5A396E4E2CC7DC91B923C3D222682684C70464D
```

## 主要功能

- 支持全拼、加加双拼、小鹤双拼、微软双拼、自然码双拼、智能 ABC 双拼和四通双拼。
- 支持触摸键盘上滑、长按选符号、候选点击与辅码筛选。
- 支持蓝牙和 USB 实体键盘，可配置选词、翻页、中英文、简繁、标点切换及候选框样式。
- 支持日期、时间、Unicode、计算、中文数字、人民币大写等快捷输入。
- 支持导入通讯录姓名、RIME 文本词库和搜狗 `.scel` 词库。
- 支持用户词库备份恢复，以及通过用户指定目录进行 Android／Windows 多端同步。

## 安装与启用

1. 下载与设备 CPU 对应的 APK，点击安装；若系统拦截，请按提示允许当前文件管理器“安装未知应用”。
2. 安装后打开“启源输入”，按页面提示进入系统输入法设置。
3. 在“管理输入法”中启用启源输入，再把它设为当前键盘。
4. 返回应用，等待首次 RIME 数据部署完成后开始使用。

不同品牌手机的菜单名称可能略有差异，一般可在“设置 → 系统和更新 → 语言和输入法”中找到相关入口。

## 升级前请先备份

0.2.4 与此前正式版使用同一发布证书，可以直接覆盖安装并保留应用数据。稳妥起见，升级或卸载前请先在“词库与通讯录”中导出用户词库，并在“同步与多端”中完成一次同步。

如果系统提示签名不一致，不要急着卸载旧版。请先完成词库备份，否则卸载应用可能同时清除应用私有数据。

## 常用操作

- 触摸键盘：点击候选上屏；长按候选可删除误学词；长按或上滑 Enter 键进入辅码。
- 实体键盘：空格选择第一候选，数字键选词，`Tab` 进入辅码，`Esc` 取消输入。
- 快捷输入：支持 `;date`、`;time`、`;datetime`、`;week`、`;u十六进制`、`;calc表达式`、`;num数字` 和 `;money金额`。
- 词库管理：在“词库与通讯录”中导入姓名、文本词库或搜狗词库，也可以备份和恢复用户词库。

## 测试边界

本次发布的四个架构 APK 已完成构建、哈希和签名校验。项目此前还完成了 Android 15 x86_64 模拟器上的安装、启用、RIME 部署和候选上屏测试。Android 8／10／12／14 厂商真机、平板、折叠屏，以及不同实体键盘的完整兼容性仍需要对应实机验证。

输入法会接触用户输入内容。请只从本页列出的发布地址下载安装，并根据自己的设备和隐私要求决定是否启用。
