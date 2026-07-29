// Prefixes an app-relative path with Astro's configured base (e.g. '/pbi-documentation-blog')
// so links work both in dev and once deployed under a GitHub Pages project path.
export function withBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${pathname}`;
}
