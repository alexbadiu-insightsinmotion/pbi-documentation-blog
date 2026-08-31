// The single source of truth for the Deneb gallery.
//
// Every thumbnail is hand-authored (10 inline SVG recreations, 7 PNGs, 1 calendar
// heat map), so the gallery can never be fully generated. What this registry does
// remove is the per-release busywork around it: the template count, the display
// order, the alternating background banding, the eyebrow numbering, the anchor id,
// the navigator entry and both outbound links are all derived from the list below.
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
   *
   * A slug also outlives its own label: `correlation-matrix` still points at the
   * template now labelled "Correlation chart", because renaming it would break
   * every link anyone has shared.
   */
  slug: string;
  Component: any;
  /**
   * Which side the chart sits on. Omit to alternate by position; set explicitly
   * only to pin a template whose chart is too tall for its computed side.
   */
  chartFirst?: boolean;
  /** Upstream article filename inside Components/Deneb/. */
  doc: string;
  /**
   * Template JSON filename(s) in the same folder — the artefact you actually paste
   * into Deneb, as opposed to the article that explains it.
   *
   * These are literals, not derived from `num`, because upstream naming is not
   * regular: 913.1 and 914.1 drop the `template.` segment every other file carries,
   * and the version suffix moves (v1.8.1 for 901-907, v1.8.2 for 908-916, v1.9.1
   * for 917-918). More than one entry means the template ships user-facing variants,
   * which then need a matching `jsonLabels` array in the locale copy.
   */
  json: string[];
}

/** Canonical ascending order. The gallery reverses this for display. */
export const TEMPLATES: TemplateEntry[] = [
  {
    num: '01',
    slug: 'space-saving-bar',
    Component: T01_SpaceSavingBar,
    doc: '201 - Space-Saving Bar Chart with Top N and Others (Deneb Template).md',
    json: ['901.1 - deneb_template.space_saving_bar_chart_with_top_n_and_others.v1.8.1.json'],
  },
  {
    num: '02',
    slug: 'bullet-chart',
    Component: T02_BulletChart,
    doc: '202 - Bullet Chart (Deneb Template).md',
    json: ['902.1 - deneb_template.bullet_chart.v1.8.1.json'],
  },
  {
    num: '03',
    slug: 'heat-map',
    Component: T03_HeatMap,
    doc: '203 - Heat Map with Marginal Bar and Column Charts (Deneb Template).md',
    json: ['903.1 - deneb_template.heat_map_with_marginal_bar_and_column_charts.v1.8.1.json'],
  },
  {
    num: '04',
    slug: 'ring-chart',
    Component: T04_RingChart,
    doc: '204 - Ring Chart (Deneb Template).md',
    json: ['904.1 - deneb_template.ring_chart.v1.8.1.json'],
  },
  {
    num: '05',
    slug: 'linear-gauges',
    Component: T05_LinearGauge,
    doc: '205 - Linear Gauges (Deneb Template).md',
    json: [
      '905.1 - deneb_template.linear_gauge_1_units_with_performance_zones_and_pointer.v1.8.1.json',
      '905.2 - deneb_template.linear_gauge_2_units_with_performance_zones.v1.8.1.json',
      '905.3 - deneb_template.linear_gauge_3_units_basic.v1.8.1.json',
    ],
  },
  {
    num: '06',
    slug: 'two-level-column',
    Component: T06_ColumnChart2Level,
    doc: '206 - 2-Level Column Chart (Deneb Template).md',
    json: ['906.1 - deneb_template.2_level_column_chart.v1.8.1.json'],
  },
  {
    num: '07',
    slug: 'quadrant-chart',
    Component: T07_Quadrants,
    doc: '207 - Performance Quadrants (Deneb Template).md',
    json: ['907.1 - deneb_template.performance_quadrants.v1.8.1.json'],
  },
  {
    num: '08',
    slug: 'violin-box-plot',
    Component: T08_ViolinBoxPlot,
    doc: '208 - Violin Plot with Box Plot (Deneb Template).md',
    json: ['908.1 - deneb_template.violin_plot_with_box_plot.v1.8.2.json'],
  },
  {
    num: '09',
    slug: 'regression',
    Component: T09_Regression,
    doc: '209 - Regression (Deneb Template).md',
    json: ['909.1 - deneb_template.regression.v1.8.2.json'],
  },
  {
    num: '10',
    slug: 'variance-analysis',
    Component: T10_VarianceAnalysis,
    doc: '210 - Variance Analysis (Deneb Template).md',
    json: ['910.1 - deneb_template.variance_analysis.v1.8.2.json'],
  },
  {
    num: '11',
    slug: 'ibcs-chart',
    Component: T11_IBCS,
    doc: '211 - IBCS-style Performance Visual (Deneb Template).md',
    json: ['911.1 - deneb_template.ibcs-style_performance_visual.v1.8.2.json'],
  },
  {
    num: '12',
    slug: 'area-min-max',
    Component: T12_AreaMinMax,
    doc: '212 - Area Chart with Min-Max Variance (Deneb Template).md',
    json: ['912.1 - deneb_template.area_chart_with_min_max_variance.v1.8.2.json'],
  },
  {
    num: '13',
    slug: 'waterfall',
    Component: T13_Waterfall,
    doc: '213 - Waterfall Chart with Period Variance (Deneb Template).md',
    json: ['913.1 - deneb_waterfall_chart_with_period_variance.v1.8.2.json'],
  },
  {
    num: '14',
    slug: 'correlation-matrix',
    Component: T14_Correlation,
    doc: '214 - Correlation Chart (Deneb Template).md',
    json: ['914.1 - deneb_correlation_chart.v1.8.2.json'],
  },
  {
    num: '15',
    slug: 'financial-waterfall',
    Component: T15_FinancialWaterfall,
    doc: '215 - Financial Waterfall Chart (Deneb Template).md',
    json: ['915.1 - deneb_template.financial_waterfall_chart.v1.8.2.json'],
  },
  {
    num: '16',
    slug: 'sunburst',
    Component: T16_Sunburst,
    doc: '216 - Dynamic Sunburst Chart (Deneb Template).md',
    json: ['916.1 - deneb_template.dynamic_sunburst_chart.v1.8.2.json'],
  },
  {
    num: '17',
    slug: 'performance-analysis',
    Component: T17_PerfAnalysis,
    doc: '217 - Performance Analysis (Deneb Template).md',
    json: [
      '917.1 - deneb_template.performance_analysis_multiple_visuals.v1.9.1.json',
      '917.2 - deneb_template.performance_analysis_single_visual.v1.9.1.json',
    ],
  },
  {
    num: '18',
    slug: 'calendar-heat-map',
    Component: T18_CalendarHeatMap,
    doc: '218 - Calendar Heat Map (Deneb Template).md',
    json: [
      '918.1 - deneb_template.calendar_heat_map_multiple_languages.v1.9.1.json',
      '918.2 - deneb_template.calendar_heat_map_single_language.v1.9.1.json',
    ],
  },
];

const DENEB_DIR =
  'https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Components/Deneb';

/**
 * Absolute URL for an upstream file.
 *
 * Every filename carries spaces and most carry parentheses, so encoding is not
 * optional. `blob/` rather than raw.githubusercontent.com deliberately: GitHub's
 * blob view of a JSON file offers Copy and Download buttons, where the raw host
 * dumps 60 KB of text into the tab.
 */
export const upstreamHref = (file: string): string => `${DENEB_DIR}/${encodeURIComponent(file)}`;

/** One outbound link on a template card. */
export interface TemplateLink {
  href: string;
  label: string;
  /** The article. Rendered as the primary call to action; the JSONs sit under it. */
  primary?: boolean;
}

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
