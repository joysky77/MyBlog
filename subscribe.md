---
layout: default
title: 订阅
permalink: /subscribe/
---

<section class="intro subscribe-panel">
  <p>可以用 RSS 阅读器订阅这个博客。订阅后，新文章发布时会自动出现在你的阅读器里。</p>
  <a class="button-link" href="{{ '/feed.xml' | relative_url }}">打开 RSS Feed</a>
</section>

<section class="subscribe-help">
  <h2>怎么订阅</h2>
  <p>复制下面的地址，添加到你常用的 RSS 阅读器中：</p>
  <pre><code>{{ site.url }}{{ site.baseurl }}/feed.xml</code></pre>
  <p>如果直接在浏览器里打开 RSS Feed，看到 XML 内容是正常现象；RSS 阅读器会正确识别它。</p>
</section>
