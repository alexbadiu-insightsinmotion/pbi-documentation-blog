// Vanilla port of T01_SpaceSavingBar's "Top N" slider — recomputes which
// rows show and re-sums the "Others" bar as the range input changes.
// Bar-width transition timing lives in CSS (see the .bar rule in T01.astro).
export function initSpaceSavingBar() {
  const root = document.querySelector<HTMLElement>('[data-space-saving-bar]');
  if (!root) return;

  const slider = root.querySelector<HTMLInputElement>('[data-topn-slider]');
  const valueLabel = root.querySelector<HTMLElement>('[data-topn-value]');
  const rows = [...root.querySelectorAll<HTMLElement>('[data-row]')];
  const othersRow = root.querySelector<HTMLElement>('[data-others-row]');
  if (!slider || !valueLabel || !othersRow) return;

  const values = rows.map((r) => Number(r.dataset.value));
  const max = Math.max(...values);
  const barWidth = (v: number) => `${((v / max) * 100).toFixed(1)}%`;

  let animated = false;
  const cardObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      animated = true;
      cardObserver.disconnect();
      render();
    },
    { threshold: 0.1 }
  );
  cardObserver.observe(root);

  function render() {
    const topN = Number(slider!.value);
    valueLabel!.textContent = String(topN);

    let othersSum = 0;
    rows.forEach((row, i) => {
      const shown = i < topN;
      row.style.opacity = shown ? '1' : '0';
      row.style.maxHeight = shown ? '60px' : '0';
      const bar = row.querySelector<HTMLElement>('[data-bar]');
      if (bar) bar.style.width = animated ? barWidth(values[i]) : '0%';
      if (!shown) othersSum += values[i];
    });

    const showOthers = topN < rows.length;
    othersRow!.style.opacity = showOthers ? '1' : '0';
    othersRow!.style.maxHeight = showOthers ? '64px' : '0';
    const othersBar = othersRow!.querySelector<HTMLElement>('[data-bar]');
    const othersValueLabel = othersRow!.querySelector<HTMLElement>('[data-others-value]');
    if (othersBar) othersBar.style.width = animated ? barWidth(othersSum) : '0%';
    if (othersValueLabel) othersValueLabel.textContent = String(othersSum);
  }

  slider.addEventListener('input', render);
  render();
}
