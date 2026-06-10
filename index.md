---
layout: default
title: 我的随便写写的Blog
---

文章列表:

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a><span>    ({{ post.date | date_to_string }})    </span>
    </li>
  {% endfor %}
</ul>
