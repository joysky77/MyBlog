---
layout: default
title: 标签
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}

<section class="taxonomy-hero">
  <p>按关键词浏览文章。给文章添加 `tags` 后，这里会自动生成标签索引。</p>
</section>

{% if sorted_tags.size > 0 %}
  <nav class="taxonomy-cloud" aria-label="标签快速导航">
    {% for tag in sorted_tags %}
      {% assign name = tag[0] %}
      {% assign posts = tag[1] %}
      <a href="#tag-{{ forloop.index }}">
        <span>#{{ name }}</span>
        <strong>{{ posts.size }}</strong>
      </a>
    {% endfor %}
  </nav>

  <div class="taxonomy-list">
    {% for tag in sorted_tags %}
      {% assign name = tag[0] %}
      {% assign posts = tag[1] %}
      <section class="taxonomy-section" id="tag-{{ forloop.index }}">
        <div class="section-heading">
          <h2>#{{ name }}</h2>
          <span>{{ posts.size }} 篇</span>
        </div>
        <div class="post-list">
          {% for post in posts %}
            <article class="post-preview">
              <div class="post-preview-meta">
                <span class="log-prefix">TAG</span>
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
      </section>
    {% endfor %}
  </div>
{% else %}
  <section class="taxonomy-empty">
    <p>还没有标签。给文章添加 `tags: [标签一, 标签二]` 后，这里会自动出现索引。</p>
  </section>
{% endif %}
