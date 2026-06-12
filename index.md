---
layout: default
title: 我的随便写写的 Blog
---

# 文章列表

{% if site.posts.size > 0 %}
  <div class="post-list">
    {% for post in site.posts %}
      <article class="post-preview">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
        {% if post.excerpt %}
          <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
        {% endif %}
      </article>
    {% endfor %}
  </div>
{% else %}
  还没有文章。把 Markdown 文件放进 `_posts/` 目录后，这里会自动出现文章列表。
{% endif %}
