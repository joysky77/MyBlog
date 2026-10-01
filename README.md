# MyBlog

这是一个基于 GitHub Pages + Jekyll 的个人博客。

## 项目目录说明

- `_posts/`：已发布的 Markdown 文章，文件名使用 `YYYY-MM-DD-title.md`。
- `_drafts/`：尚未发布的文章草稿，不参与线上构建。
- `_data/`：Jekyll 结构化数据，目前用于维护软件下载清单。
- `_layouts/`：网站页面和文章布局模板。
- `assets/`：样式、图片、软件图标及其他静态资源。
- `.github/workflows/`：GitHub Pages 自动构建和部署流程。
- `_config.yml`：Jekyll 站点、链接、评论和构建配置。
- `index.md`、`categories.md`、`tags.md`、`downloads.md`、`subscribe.md`：首页及各功能页面入口。
- `Gemfile`：本地 Jekyll 构建依赖说明。

新增目录时应先确认其用途与以上结构一致，并同步补充本节说明。

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

## 发布闭源软件下载

把安装包放到 `assets/downloads/` 下，例如：

```text
assets/downloads/myapp/myapp-1.0.0-windows.zip
```

然后在 `_data/software.yml` 添加：

```yml
- name: 我的软件
  version: "1.0.0"
  platform: Windows
  icon: /assets/myapp-icon.webp
  summary: 软件简介。
  status: Direct Download
  local_file: /assets/downloads/myapp/myapp-1.0.0-windows.zip
  tags:
    - Windows
    - 工具
```

提交并推送后，下载页会自动出现该软件。
