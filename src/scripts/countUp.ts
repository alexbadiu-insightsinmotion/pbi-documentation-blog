// Vanilla port of Deneb Gallery's CountUp component.
export function initCountUp() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-countup]').forEach((el) => {
    const target = Number(el.dataset.target ?? '0');
    const suffix = el.dataset.suffix ?? '';
    const duration = Number(el.dataset.duration ?? '1800');

    if (reduce) {
      el.textContent = target + suffix;
      return;
    }

    el.textContent = '0' + suffix;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3);
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          el.textContent = Math.round(target * ease(p)) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
  });
}
