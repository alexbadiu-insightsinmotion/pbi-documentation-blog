// Scroll-spy for the Deneb gallery navigator rail.
//
// Deliberately a passive scroll listener rather than an IntersectionObserver.
// Every other observer on the site (motion.ts, chartAnimation.ts, countUp.ts)
// answers "has this appeared yet?" and disconnects — a one-shot question that
// observers are ideal for. "Which section am I in right now?" is a different
// question: an observer only reports *changes*, so it has to be paired with a
// running set of what is currently on screen, and that bookkeeping desynchronises
// on large jumps (deep links, clicking a rail entry far down the page) leaving the
// rail stuck on a stale entry. Computing the answer outright is both shorter and
// always right, and it mirrors initScrollProgress()'s existing scroll listener.
//
// Cost is one comparison per section per frame while scrolling, against offsets
// cached until the next resize — no layout reads in the scroll path.
const EASE_LINE_RATIO = 0.2; // a section becomes current once it crosses 20% down

export function initDenebNav() {
  const nav = document.querySelector<HTMLElement>('[data-deneb-nav]');
  if (!nav) return;

  const links: { slug: string; el: HTMLAnchorElement; section: HTMLElement }[] = [];
  nav.querySelectorAll<HTMLAnchorElement>('[data-deneb-nav-link]').forEach((el) => {
    const slug = el.dataset.denebNavLink;
    if (!slug) return;
    const section = document.getElementById(slug);
    if (section) links.push({ slug, el, section });
  });
  if (!links.length) return;

  // Document-relative tops, cached so scrolling never forces a reflow.
  let offsets: number[] = [];
  const measure = () => {
    offsets = links.map(({ section }) => section.getBoundingClientRect().top + window.scrollY);
  };

  let current = '';
  const setActive = (slug: string) => {
    if (slug === current) return;
    current = slug;
    for (const { el, slug: s } of links) {
      if (s === slug) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    }
  };

  const update = () => {
    const line = window.scrollY + window.innerHeight * EASE_LINE_RATIO;
    // The last section that has started above the line is the one we are in.
    // Falls back to the first entry when the line is still above every section.
    let activeIndex = 0;
    for (let i = 0; i < offsets.length; i += 1) {
      if (offsets[i] <= line) activeIndex = i;
      else break;
    }
    setActive(links[activeIndex].slug);
  };

  // Coalesce to one computation per frame — scroll fires far more often than paint.
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      update();
    });
  };

  const onResize = () => {
    measure();
    update();
  };

  measure();
  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  // Images and fonts settling changes section offsets after first paint.
  window.addEventListener('load', onResize);
}
