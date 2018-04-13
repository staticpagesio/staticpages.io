---
title: staticpages
---
{% for section in site.sections %}
  {% include sections/{{ section.uuid }}.html uuid=section.uuid %}
{% endfor %}

{% include modal/hey-iamin.html %}