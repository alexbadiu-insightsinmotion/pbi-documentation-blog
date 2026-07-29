import { withBase } from '../lib/url';

interface SearchItem {
  slug: string;
  title: string;
  tag: string;
  author: string;
  excerpt: string;
  cover: string;
}

function cardHtml(item: SearchItem): string {
  const href = withBase(`/blog/${item.slug}/`);
  const cover = item.cover
    ? `<a href="${href}" class="cover-link" tabindex="-1"><img src="${item.cover}" alt="" loading="lazy" /></a>`
    : '';
  return `
    <article class="post-card">
      ${cover}
      <div class="body">
        <h2><a href="${href}">${item.title}</a></h2>
        <div class="meta"><span class="tag">#${item.tag}</span><span class="author">${item.author}</span></div>
        <a href="${href}" class="read-more">Read more &rarr;</a>
      </div>
    </article>`;
}

export async function initSearch() {
  const root = document.querySelector<HTMLElement>('[data-search-root]');
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const results = root.querySelector<HTMLElement>('[data-search-results]');
  const empty = root.querySelector<HTMLElement>('[data-search-empty]');
  if (!input || !results) return;

  const res = await fetch(withBase('/search-index.json'));
  const items: SearchItem[] = await res.json();

  function render(query: string) {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.tag.toLowerCase().includes(q) ||
            item.author.toLowerCase().includes(q) ||
            item.excerpt.toLowerCase().includes(q)
        )
      : items;

    results!.innerHTML = filtered.map(cardHtml).join('');
    if (empty) empty.hidden = filtered.length > 0;
  }

  input.addEventListener('input', () => render(input.value));
  render('');
}
