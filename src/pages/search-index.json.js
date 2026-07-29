import { getCollection } from 'astro:content';

function toEntry(post, lang) {
  return {
    slug: post.id,
    lang,
    title: post.data.title,
    tag: post.data.tag,
    author: post.data.author,
    excerpt: post.data.excerpt ?? '',
    cover: post.data.cover ?? '',
    date: post.data.date.toISOString(),
  };
}

export async function GET() {
  const [en, fr] = await Promise.all([getCollection('blog'), getCollection('blogFr')]);

  const index = [...en.map((p) => toEntry(p, 'en')), ...fr.map((p) => toEntry(p, 'fr'))].sort(
    (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
  );

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
