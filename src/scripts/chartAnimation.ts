// Vanilla port of Deneb Gallery's useChartAnimation hook — a data-anim
// attribute-driven Web Animations engine. Each [data-anim-root] container
// (one per chart, matching the original hook's per-component ref) triggers
// its own IntersectionObserver-gated, staggered animation of its
// [data-anim] descendants the first time it scrolls into view.
const EASE = 'cubic-bezier(.16,1,.3,1)';

function initAnim(el: HTMLElement | SVGElement) {
  const t = el.getAttribute('data-anim');
  const origin = el.getAttribute('data-origin') ?? undefined;
  const s = el.style;
  if (t === 'grow-x') {
    s.transformBox = 'fill-box';
    s.transformOrigin = origin ?? 'left center';
    s.transform = 'scaleX(0)';
  } else if (t === 'grow-y') {
    s.transformBox = 'fill-box';
    s.transformOrigin = origin ?? 'center bottom';
    s.transform = 'scaleY(0)';
  } else if (t === 'trace' || t === 'sweep') {
    const p = parseFloat(el.getAttribute('data-dash') ?? '1');
    el.setAttribute('pathLength', '1');
    s.strokeDasharray = `${p} 2`;
    s.strokeDashoffset = String(p);
  } else if (t === 'pop') {
    s.transformBox = 'fill-box';
    s.transformOrigin = origin ?? 'center';
    s.opacity = '0';
    s.transform = 'scale(0.4)';
  } else if (t === 'rise') {
    s.opacity = '0';
    s.transform = 'translateY(16px)';
  } else if (t === 'fade') {
    s.opacity = '0';
  } else if (t === 'wipe') {
    s.clipPath = 'inset(0 100% 0 0)';
  }
}

function finalizeAnim(el: HTMLElement | SVGElement) {
  const t = el.getAttribute('data-anim');
  const s = el.style;
  if (t === 'grow-x' || t === 'grow-y' || t === 'pop' || t === 'rise') {
    s.transform = 'none';
    s.opacity = '1';
  } else if (t === 'trace' || t === 'sweep') {
    s.strokeDashoffset = '0';
  } else if (t === 'fade') {
    s.opacity = '1';
  } else if (t === 'wipe') {
    s.clipPath = 'inset(0 0 0 0)';
  }
}

function animateAnim(el: Element, delay: number) {
  const t = el.getAttribute('data-anim');
  const dur = parseInt(el.getAttribute('data-dur') ?? '0', 10);
  let kf: Keyframe[];
  let opt: KeyframeAnimationOptions;

  if (t === 'grow-x') {
    kf = [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }];
    opt = { duration: dur || 900, easing: EASE };
  } else if (t === 'grow-y') {
    kf = [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }];
    opt = { duration: dur || 900, easing: EASE };
  } else if (t === 'trace') {
    const p = parseFloat(el.getAttribute('data-dash') ?? '1');
    kf = [{ strokeDashoffset: p }, { strokeDashoffset: 0 }];
    opt = { duration: dur || 1400, easing: 'cubic-bezier(.65,0,.35,1)' };
  } else if (t === 'sweep') {
    const p = parseFloat(el.getAttribute('data-dash') ?? '1');
    kf = [{ strokeDashoffset: p }, { strokeDashoffset: 0 }];
    opt = { duration: dur || 1200, easing: EASE };
  } else if (t === 'pop') {
    kf = [{ opacity: '0', transform: 'scale(0.4)' }, { opacity: '1', transform: 'scale(1)' }];
    opt = { duration: dur || 540, easing: 'cubic-bezier(.34,1.56,.64,1)' };
  } else if (t === 'rise') {
    kf = [{ opacity: '0', transform: 'translateY(16px)' }, { opacity: '1', transform: 'translateY(0)' }];
    opt = { duration: dur || 700, easing: EASE };
  } else if (t === 'fade') {
    kf = [{ opacity: '0' }, { opacity: '1' }];
    opt = { duration: dur || 800, easing: EASE };
  } else if (t === 'wipe') {
    kf = [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }];
    opt = { duration: dur || 1150, easing: 'cubic-bezier(.62,0,.34,1)' };
  } else {
    return;
  }

  opt.delay = delay;
  opt.fill = 'both';
  const a = (el as HTMLElement | SVGElement).animate(kf, opt);
  a.onfinish = () => finalizeAnim(el as HTMLElement | SVGElement);
}

export function initChartAnimations() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll<HTMLElement>('[data-anim-root]').forEach((container) => {
    const stagger = parseInt(container.getAttribute('data-stagger') ?? '0', 10);
    const items = [...container.querySelectorAll<HTMLElement | SVGElement>('[data-anim]')];
    items.forEach((el) => initAnim(el));

    if (reduce) {
      items.forEach((el) => finalizeAnim(el));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        items.forEach((el, i) => {
          const base = parseInt(el.getAttribute('data-delay') ?? '0', 10);
          animateAnim(el, base + i * stagger);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );
    observer.observe(container);
  });
}
