// Vanilla port of T07_Quadrants: filter buttons dim non-matching dots, plus
// the initial pop-in reveal for each dot.
const QUAD_COLORS: Record<string, string> = {
  Q1: '#C9A227',
  Q2: '#B8860B',
  Q3: '#A67B45',
  Q4: '#D4A843',
};
const DIM_COLOR = 'rgba(43,33,24,0.12)';

export function initQuadrants() {
  const root = document.querySelector<HTMLElement>('[data-quadrants]');
  if (!root) return;

  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-quad-button]')];
  const dots = [...root.querySelectorAll<SVGCircleElement>('.dot')];
  let active: string | null = null;

  function applyActiveState() {
    buttons.forEach((btn) => {
      const isActive = btn.dataset.quad === active;
      btn.style.borderColor = isActive ? 'var(--gold)' : 'var(--card-border)';
      btn.style.background = isActive ? 'var(--gold)' : 'transparent';
      btn.style.color = isActive ? '#fff' : 'var(--text-body)';
    });
    dots.forEach((dot) => {
      const q = dot.dataset.quad!;
      const dim = active !== null && q !== active;
      dot.setAttribute('fill', dim ? DIM_COLOR : QUAD_COLORS[q]);
      dot.setAttribute('stroke', dim ? 'none' : 'rgba(255,255,255,0.4)');
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      active = active === btn.dataset.quad ? null : (btn.dataset.quad ?? null);
      applyActiveState();
    });
  });

  dots.forEach((dot, i) => {
    dot.style.opacity = '0';
    dot.style.transform = 'scale(0)';
    const cx = dot.getAttribute('cx') ?? '50';
    const cy = dot.getAttribute('cy') ?? '50';
    dot.style.transformOrigin = `${cx}% ${cy}%`;
    const delay = i * 60 + 200;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setTimeout(() => {
          dot.animate(
            [
              { opacity: 0, transform: 'scale(0)' },
              { opacity: 1, transform: 'scale(1.15)' },
              { opacity: 1, transform: 'scale(1)' },
            ],
            { duration: 450, delay, fill: 'forwards', easing: 'cubic-bezier(.34,1.56,.64,1)' }
          );
        }, 0);
      },
      { threshold: 0.15 }
    );
    observer.observe(root);
  });
}
