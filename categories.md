---
layout: default
title: 分类目录
permalink: /categories/
---

{% assign sorted_categories = site.categories | sort %}

<section class="taxonomy-hero">
  <p>按主题浏览文章。给文章添加 `categories` 后，这里会自动更新。</p>
</section>

{% if sorted_categories.size > 0 %}
  <nav class="taxonomy-cloud" aria-label="分类快速导航">
    {% for category in sorted_categories %}
      {% assign name = category[0] %}
      {% assign posts = category[1] %}
      <a href="#category-{{ forloop.index }}">
        <span>{{ name }}</span>
        <strong>{{ posts.size }}</strong>
      </a>
    {% endfor %}
  </nav>

  <div class="taxonomy-list">
    {% for category in sorted_categories %}
      {% assign name = category[0] %}
      {% assign posts = category[1] %}
      <section class="taxonomy-section" id="category-{{ forloop.index }}">
        <div class="section-heading">
          <h2>{{ name }}</h2>
          <span>{{ posts.size }} 篇</span>
        </div>
        <div class="post-list">
          {% for post in posts %}
            <article class="post-preview">
              <div class="post-preview-meta">
                <span class="log-prefix">CATEGORY</span>
                <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time>
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
      </section>
    {% endfor %}
  </div>
{% else %}
  <section class="taxonomy-empty">
    <p>还没有分类。给文章添加 `categories: 分类名` 后，这里会自动出现目录。</p>
  </section>
{% endif %}
