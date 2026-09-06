---
layout: default
title: 软件下载
permalink: /downloads/
---

<section class="download-hero">
  <p>这里放我整理、开发或维护的软件工具。下载链接优先指向 GitHub Releases，便于保留版本记录和源码说明。</p>
</section>

{% if site.data.software.size > 0 %}
  <div class="download-grid">
    {% for app in site.data.software %}
      <article class="download-card">
        <div class="download-card-main">
          {% if app.icon %}
            <img class="download-icon" src="{{ app.icon | relative_url }}" alt="{{ app.name }} 图标">
          {% endif %}
          <div>
            <div class="download-meta">
              <span>{{ app.platform }}</span>
              <span>{{ app.version }}</span>
              <span>{{ app.status }}</span>
            </div>
            <h2>{{ app.name }}</h2>
            <p>{{ app.summary }}</p>
            {% if app.tags and app.tags.size > 0 %}
              <div class="download-tags">
                {% for tag in app.tags %}
                  <span>{{ tag }}</span>
                {% endfor %}
              </div>
            {% endif %}
          </div>
        </div>
        <div class="download-actions">
          <a class="button-link" href="{{ app.download_url }}">下载 / Releases</a>
          {% if app.post_url %}
            <a class="button-link button-link-ghost" href="{{ app.post_url | relative_url }}">查看介绍</a>
          {% endif %}
          {% if app.source_url %}
            <a class="button-link button-link-ghost" href="{{ app.source_url }}">源码</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
{% else %}
  <p class="post-empty">还没有下载项。编辑 `_data/software.yml` 后，这里会自动显示软件列表。</p>
{% endif %}
