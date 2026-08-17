// The single source of truth for the Deneb gallery.
//
// Every thumbnail is hand-authored (10 inline SVG recreations, 7 PNGs, 1 calendar
// heat map), so the gallery can never be fully generated. What this registry does
// remove is the per-release busywork around it: the template count, the display
// order, the alternating background banding, the eyebrow numbering, the anchor id
// and the navigator entry are all derived from the list below.
//
// Adding a template = one new component + one entry here, appended in ascending
// order. Everything else follows.

import T01_SpaceSavingBar from './templates/T01_SpaceSavingBar.astro';
import T02_BulletChart from './templates/T02_BulletChart.astro';
import T03_HeatMap from './templates/T03_HeatMap.astro';
import T04_RingChart from './templates/T04_RingChart.astro';
import T05_LinearGauge from './templates/T05_LinearGauge.astro';
import T06_ColumnChart2Level from './templates/T06_ColumnChart2Level.astro';
import T07_Quadrants from './templates/T07_Quadrants.astro';
import T08_ViolinBoxPlot from './templates/T08_ViolinBoxPlot.astro';
import T09_Regression from './templates/T09_Regression.astro';
import T10_VarianceAnalysis from './templates/T10_VarianceAnalysis.astro';
import T11_IBCS from './templates/T11_IBCS.astro';
import T12_AreaMinMax from './templates/T12_AreaMinMax.astro';
import T13_Waterfall from './templates/T13_Waterfall.astro';
import T14_Correlation from './templates/T14_Correlation.astro';
import T15_FinancialWaterfall from './templates/T15_FinancialWaterfall.astro';
import T16_Sunburst from './templates/T16_Sunburst.astro';
import T17_PerfAnalysis from './templates/T17_PerfAnalysis.astro';
import T18_CalendarHeatMap from './templates/T18_CalendarHeatMap.astro';

export interface TemplateEntry {
  /** Two-digit index. Drives the eyebrow and matches the 2NN doc number upstream. */
  num: string;
  /**
   * Anchor id — stable and shareable, so it survives reordering and renumbering.
   * Also the key into the per-locale copy in src/i18n/deneb.ts, which supplies the
   * label, title, description and chart caption. Slugs stay English even on /fr/:
   * they are URLs, and a translated anchor would break every shared link.
   */
  slug: string;
  Component: any;
  /**
   * Which side the chart sits on. Omit to alternate by position; set explicitly
   * only to pin a template whose chart is too tall for its computed side.
   */
  chartFirst?: boolean;
}

/** Canonical ascending order. The gallery reverses this for display. */
export const TEMPLATES: TemplateEntry[] = [
  { num: '01', slug: 'space-saving-bar', Component: T01_SpaceSavingBar },
  { num: '02', slug: 'bullet-chart', Component: T02_BulletChart },
  { num: '03', slug: 'heat-map', Component: T03_HeatMap },
  { num: '04', slug: 'ring-chart', Component: T04_RingChart },
  { num: '05', slug: 'linear-gauges', Component: T05_LinearGauge },
  { num: '06', slug: 'two-level-column', Component: T06_ColumnChart2Level },
  { num: '07', slug: 'quadrant-chart', Component: T07_Quadrants },
  { num: '08', slug: 'violin-box-plot', Component: T08_ViolinBoxPlot },
  { num: '09', slug: 'regression', Component: T09_Regression },
  { num: '10', slug: 'variance-analysis', Component: T10_VarianceAnalysis },
  { num: '11', slug: 'ibcs-chart', Component: T11_IBCS },
  { num: '12', slug: 'area-min-max', Component: T12_AreaMinMax },
  { num: '13', slug: 'waterfall', Component: T13_Waterfall },
  { num: '14', slug: 'correlation-matrix', Component: T14_Correlation },
  { num: '15', slug: 'financial-waterfall', Component: T15_FinancialWaterfall },
  { num: '16', slug: 'sunburst', Component: T16_Sunburst },
  { num: '17', slug: 'performance-analysis', Component: T17_PerfAnalysis },
  { num: '18', slug: 'calendar-heat-map', Component: T18_CalendarHeatMap },
];

/**
 * The section band, plus the card colour that must always be its inverse.
 *
 * Publishing the card colour as a custom property is what keeps the two in step.
 * Before this, each template hardcoded both its own band and its own card colour
 * — seventeen independent copies of "the card is the opposite of the band" — so
 * reordering the gallery would have left every card wrong in a way that reads as
 * flat rather than broken.
 *
 * Returns a style *string* rather than an object: that is the reliable way to
 * emit a CSS custom property through Astro's style attribute.
 */
export const bandStyle = (alt: boolean): string =>
  alt
    ? 'background:var(--bg-alt);--card-bg:var(--bg)'
    : 'background:var(--bg);--card-bg:var(--bg-alt)';

/** The eyebrow string, e.g. `18 — Calendar heat map` (label comes from the locale copy). */
export const eyebrowFor = (num: string, label: string): string => `${num} — ${label}`;
