// Vanilla ports of the Deneb Gallery scroll-progress bar and IntersectionObserver
// reveal-on-scroll effect — same easing curve, thresholds, and reduced-motion
// handling as the original React components, without needing a UI framework.
const EASE = 'cubic-bezier(.16,1,.3,1)';

function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;

  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight || 1;
    const progress = Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max));
    bar.style.width = `${progress * 100}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initReveal() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const delay = Number(el.dataset.revealDelay ?? '0');

    if (reduce) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(38px)';
    el.style.transition = `opacity .95s ${EASE} ${delay}ms, transform .95s ${EASE} ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    observer.observe(el);
  });
}

export function initMotion() {
  initScrollProgress();
  initReveal();
}
