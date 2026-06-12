---
layout: default
title: 岁忆Blog
---

<section class="intro tech-panel">
  <div>
    <p>这里收集折腾记录和偶尔的随笔。文章会从 `_posts/` 自动发布，推送到 GitHub 后更新。</p>
  </div>
  <dl class="signal-list">
    <div>
      <dt>BUILD</dt>
      <dd>GitHub Actions Jekyll · Markdown</dd>
    </div>
  </dl>
</section>

<section class="section-heading" id="latest">
  <h2>最新文章</h2>
  <span>{{ site.posts.size }} 篇</span>
</section>

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
  还没有文章。把 Markdown 文件放进 `_posts/` 目录后，这里会自动出现文章列表。
{% endif %}
