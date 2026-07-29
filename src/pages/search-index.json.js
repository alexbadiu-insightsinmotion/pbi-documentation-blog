import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog');
  const index = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((post) => ({
      slug: post.id,
      title: post.data.title,
      tag: post.data.tag,
      author: post.data.author,
      excerpt: post.data.excerpt ?? '',
      cover: post.data.cover ?? '',
    }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
