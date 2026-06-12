# MyBlog

这是一个基于 GitHub Pages + Jekyll 的个人博客。

## 发布新文章

在 `_posts/` 目录中新建 Markdown 文件，文件名使用：

```text
YYYY-MM-DD-title.md
```

文章开头写 front matter：

```md
---
layout: post
title: "文章标题"
date: 2026-06-12 10:00:00 +0800
categories: 随笔
---

正文内容写在这里。
```

提交并推送到 `main` 分支后，GitHub Actions 会自动构建并发布到：

https://joysky77.github.io/MyBlog/
