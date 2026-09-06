---
layout: default
title: 软件下载
permalink: /downloads/
---

<section class="download-hero">
  <p>这里放我整理、开发或维护的软件工具。闭源软件可以直接把安装包放在博客仓库的 `assets/downloads/` 目录中，再在软件清单里配置下载路径。</p>
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
            {% if app.checksum %}
              <p class="download-checksum">{{ app.checksum }}</p>
            {% endif %}
          </div>
        </div>
        <div class="download-actions">
          {% if app.local_file %}
            <a class="button-link" href="{{ app.local_file | relative_url }}" download>下载</a>
          {% elsif app.download_url %}
            <a class="button-link" href="{{ app.download_url }}">下载 / Releases</a>
          {% endif %}
          {% if app.post_url %}
            <a class="button-link button-link-ghost" href="{{ app.post_url | relative_url }}">查看介绍</a>
          {% endif %}
          {% if app.docs_url %}
            <a class="button-link button-link-ghost" href="{{ app.docs_url | relative_url }}">使用说明</a>
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
