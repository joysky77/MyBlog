---
layout: default
title: 岁忆Blog
---

<section class="intro tech-panel">
<dl>
    <div>
      <p>这里收集折腾记录和偶尔的随笔。文章会从 `_posts/` 自动发布，推送到 GitHub 后更新。</p>
    </div>
</dl>
  <dl class="signal-list">
    <div>
      <dt>BUILD</dt>
      <dd>Jekyll · Markdown</dd>
    </div>
  </dl>
</section>

<div class="blog-shell">
  <aside class="blog-sidebar" aria-label="博客目录">
    <div class="sidebar-panel">
      <p class="sidebar-kicker">INDEX</p>
      <a class="sidebar-link" href="{{ '/' | relative_url }}#latest">
        <span>最新文章</span>
        <strong>{{ site.posts.size }}</strong>
      </a>
      <a class="sidebar-link" href="{{ '/categories/' | relative_url }}">
        <span>分类目录</span>
        <strong>{{ site.categories.size }}</strong>
      </a>
      <a class="sidebar-link" href="{{ '/tags/' | relative_url }}">
        <span>标签索引</span>
        <strong>{{ site.tags.size }}</strong>
      </a>
    </div>

    {% if site.posts.size > 0 %}
      <div class="sidebar-panel sidebar-panel-muted">
        <p class="sidebar-kicker">RECENT</p>
        <nav class="sidebar-recent" aria-label="近期文章">
          {% for post in site.posts limit: 5 %}
            <a href="{{ post.url | relative_url }}">
              <span>{{ post.title }}</span>
              <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%m-%d" }}</time>
            </a>
          {% endfor %}
        </nav>
      </div>
    {% endif %}
  </aside>

  <section class="blog-main" aria-labelledby="latest">
    <div class="section-heading" id="latest">
      <h2>最新文章</h2>
      <span>{{ site.posts.size }} 篇</span>
    </div>

    {% if site.posts.size > 0 %}
      <div class="post-list">
        {% for post in site.posts %}
          <article class="post-preview">
            <div class="post-preview-meta">
              <span class="log-prefix">POST</span>
              <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
              {% if post.categories and post.categories.size > 0 %}
                <span>{{ post.categories | join: " / " }}</span>
              {% endif %}
              {% if post.tags and post.tags.size > 0 %}
                <span>#{{ post.tags | join: " #" }}</span>
              {% endif %}
            </div>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            {% if post.excerpt %}
              <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
            {% endif %}
            <a class="read-more" href="{{ post.url | relative_url }}">阅读全文</a>
          </article>
        {% endfor %}
      </div>
    {% else %}
      <p class="post-empty">还没有文章。把 Markdown 文件放进 `_posts/` 目录后，这里会自动出现文章列表。</p>
    {% endif %}
  </section>
</div>
