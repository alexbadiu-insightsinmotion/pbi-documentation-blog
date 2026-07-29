import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../site.config';
import { withBase } from '../lib/url';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.excerpt,
        link: withBase(`/blog/${post.id}/`),
      })),
  });
}
