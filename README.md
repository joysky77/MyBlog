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
tags: [生活, 记录]
---

正文内容写在这里。
```

`categories` 用于文章分类，`tags` 用于文章标签。发布后会自动出现在：

- 分类目录：https://joysky77.github.io/MyBlog/categories/
- 标签索引：https://joysky77.github.io/MyBlog/tags/

提交并推送到 `main` 分支后，GitHub Actions 会自动构建并发布到：

https://joysky77.github.io/MyBlog/

## 开启文章讨论

文章页底部已经接入 Utterances 评论区。首次使用需要：

1. 在 GitHub 仓库设置里启用 Issues。
2. 安装 Utterances app：https://github.com/apps/utterances
3. 确认 `_config.yml` 里的 `comments.repo` 是 `joysky77/MyBlog`。

完成后，每篇文章会自动对应一个 GitHub Issue 作为讨论帖。
