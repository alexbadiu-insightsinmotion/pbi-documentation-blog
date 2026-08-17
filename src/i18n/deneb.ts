// Editorial copy for the Deneb gallery, per locale.
//
// Kept out of dictionary.ts (which holds short chrome strings) because this is
// prose: ~90 strings that would swamp it. Template copy is keyed by the registry
// slug, so a missing translation is a type error at the use site rather than a
// silent English fallback.
//
// Two conventions, both deliberate:
//  - Chart-type names are translated where French BI usage has a settled term
//    ("Cascade", "Matrice de corrélation") and kept where the English term *is*
//    the French usage ("Sunburst", "IBCS", "Top N").
//  - Technical vocabulary inside the thumbnails is NOT translated: Performance
//    Analyzer event names, DAX/measure names and field names appear as they do in
//    the tooling and in the source template. Only the prose around them moves.
import type { Lang } from './dictionary';

export interface TemplateCopy {
  /** Eyebrow tail and navigator entry. */
  label: string;
  /** Heading HTML — may contain <span class="accent"> and <em>. */
  title: string;
  description: string;
  /** Caption above the thumbnail, where the template has one. */
  chartLabel?: string;
}

/** Strings that live inside a specific thumbnail. */
export interface DenebExtras {
  t01SliderLabel: string;
  t01Others: string;
  t07All: string;
  t07Quads: string[];
  t17Sub: string;
  t17Kpis: string[];
  t17TableHead: string[];
  t17TableCats: string[];
  t17Total: string;
  t17Legend: string[];
  t18Months: string[];
  t18Dow: string[];
  t18Slicers: { label: string; value: string }[];
}

interface DenebCopy {
  intro: {
    eyebrow: string;
    headline: string;
    lede: string;
    colA: string;
    colB: string;
    statTemplates: string;
    statThemed: string;
    statDocumented: string;
  };
  closing: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    cta: string;
    signature: string;
  };
  extras: DenebExtras;
  templates: Record<string, TemplateCopy>;
}

const en: DenebCopy = {
  intro: {
    eyebrow: 'The idea',
    headline: 'Not examples. Not screenshots. <span class="accent">Templates.</span>',
    lede: 'A curated collection of production-ready Deneb visuals for Power&nbsp;BI, built to be reused, studied, and adapted.',
    colA: 'Every template arrives fully formatted, with Power&nbsp;BI theme integration, configurable parameters, and extensive inline documentation.',
    colB: 'Import, bind your fields, and start from a strong foundation rather than a blank canvas.',
    statTemplates: 'Reusable templates',
    statThemed: 'Power&nbsp;BI theme-aware',
    statDocumented: 'Fully documented Config &amp; Named&nbsp;Styles',
  },
  closing: {
    eyebrow: 'Yours to bend',
    headline: 'Use these as <span class="accent">starting points</span>.',
    subtitle: 'Customize freely. Every Config and Named Style is documented and waiting for your fields, your palette, your report.',
    cta: 'Explore the library on GitHub',
    signature: 'Deneb &middot; Refined',
  },
  extras: {
    t01SliderLabel: 'Top N',
    t01Others: 'Others',
    t07All: 'All',
    t07Quads: ['Stars', 'Question Marks', 'Dogs', 'Cash Cows'],
    t17Sub: 'Analysis of event duration and decomposition | Single Visual',
    t17Kpis: ['Lifecycle Duration', 'Model Impact', 'DAX Impact', 'Render Impact', 'Wait Impact'],
    t17TableHead: ['Event Category', 'Count', 'Avg (ms)', 'Weight'],
    t17TableCats: ['Model', 'DAX', 'Query Pending', 'Render Visual', 'Others'],
    t17Total: 'Total Session',
    t17Legend: ['Parent Phase', 'Execution Task', 'Container Lifecycle', '0ms Event'],
    t18Months: ['January', 'February', 'March', 'April', 'May', 'June'],
    t18Dow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    t18Slicers: [
      { label: 'Language', value: 'English' },
      { label: 'Week start', value: 'Sunday' },
      { label: 'Daily metric', value: 'Value' },
    ],
  },
  templates: {
    'space-saving-bar': {
      label: 'Space-saving bar',
      title: 'Top N, <span class="accent">then Others</span>',
      description: 'Full-width bars rank your strongest categories; everything past the cut folds into a single <em>Others</em> bar. Drag the slider to choose how many stay in focus.',
      chartLabel: 'Revenue by client &middot; $K',
    },
    'bullet-chart': {
      label: 'Bullet chart',
      title: 'One bar, every <span class="accent">benchmark</span>',
      description: 'Compare actuals, targets, benchmarks, and qualitative performance bands within a single compact visual. Ideal for executive dashboards where space is limited but context matters.',
      chartLabel: 'Performance vs target',
    },
    'heat-map': {
      label: 'Heat map',
      title: 'The week, <span class="accent">by the hour</span>',
      description: 'Sales by hour and weekday read as a single matrix, framed by marginal bar and column charts that sum each axis — the busy hours surface on their own.',
      chartLabel: 'Sales · hour × weekday',
    },
    'ring-chart': {
      label: 'Ring chart',
      title: 'Three <span class="accent">rings</span>',
      description: 'Three concentric rings, each a share of 100% — nested KPIs that read at a glance, without a single legend cluttering the frame.',
    },
    'linear-gauges': {
      label: 'Linear gauges',
      title: 'Reading the <span class="accent">zones</span>',
      description: 'Each measure reads against banded performance zones, with a slim pointer marking exactly where you land — units and thresholds in a single horizontal sweep.',
      chartLabel: 'Operations · against zones',
    },
    'two-level-column': {
      label: '2-level column',
      title: 'Two levels, <span class="accent">one column</span>',
      description: 'Category columns with clustered sub-category columns overlaid in front, each carrying its own data label — the whole and its parts on one axis.',
      chartLabel: 'Revenue by region &amp; line',
    },
    'quadrant-chart': {
      label: 'Quadrant chart',
      title: 'Four <span class="accent">quadrants</span>',
      description: 'Classic BCG-style scatter, filtered by quadrant — each button sharpens focus so every point in a segment is visible without visual noise from the others.',
    },
    'violin-box-plot': {
      label: 'Violin + box plot',
      title: 'Distribution <span class="accent">in shape</span>',
      description: 'The violin traces the density of every observation; the inner box plot anchors median, quartiles, and whiskers. Skew, spread, and outliers surface without a single aggregation.',
      chartLabel: 'Score distributions',
    },
    regression: {
      label: 'Regression',
      title: 'The <span class="accent">trend line</span>',
      description: 'Scatter points paired with an ordinary-least-squares regression line and R² annotation. The relationship between variables made legible, without a pivot table.',
      chartLabel: 'Spend vs Revenue &middot; R² = 0.86',
    },
    'variance-analysis': {
      label: 'Variance analysis',
      title: 'Every <span class="accent">delta</span>',
      description: 'Amount variance and percent variance rendered side by side — arrows anchor to the actual value, pointing left or right to signal direction. Diverging percent bars on the right complete the picture.',
    },
    'ibcs-chart': {
      label: 'IBCS chart',
      title: 'The <span class="accent">IBCS</span> standard',
      description: 'Three panels stacked vertically — variance %, variance amount, and actuals vs prior year — follow IBCS notation: lollipop variance dots, signed amount bars with triangle markers, and grouped column bars.',
    },
    'area-min-max': {
      label: 'Area min/max',
      title: 'The <span class="accent">range</span> in full',
      description: 'A shaded band stretches between daily minimum and maximum values, with the mean line cutting through the middle — seasonality, volatility, and trend in a single area chart.',
      chartLabel: 'Daily range · min / avg / max',
    },
    waterfall: {
      label: 'Waterfall',
      title: 'Building to a <span class="accent">total</span>',
      description: 'Suspended floating bars reveal how each category contributes positively or negatively to a running total — the go-to for budget-to-actual and income statement breakdowns.',
      chartLabel: 'Contribution to net result',
    },
    'correlation-matrix': {
      label: 'Correlation matrix',
      title: 'Every pair, <span class="accent">measured</span>',
      description: 'A symmetric correlation matrix encodes Pearson r in both color saturation and circle size — the strongest relationships emerge at a glance, without reading a single number.',
      chartLabel: 'Pearson r · all pairs',
    },
    'financial-waterfall': {
      label: 'Financial waterfall',
      title: 'From revenue <span class="accent">to profit</span>',
      description: 'A top-down waterfall walks from gross revenue through every cost line to net profit — EBITDA, depreciation, tax — each step anchored and labeled on a bridge chart.',
      chartLabel: 'P&amp;L bridge · revenue to net profit',
    },
    sunburst: {
      label: 'Sunburst',
      title: 'Hierarchy in <span class="accent">rings</span>',
      description: 'Two levels of category hierarchy radiate outward from a central total — parent segments in the inner ring, children in the outer. Proportion and hierarchy together, without nesting.',
      chartLabel: 'Revenue by category · two levels',
    },
    'performance-analysis': {
      label: 'Performance analysis',
      title: 'Performance Analyzer <span class="accent">export</span>',
      description: '',
    },
    'calendar-heat-map': {
      label: 'Calendar heat map',
      title: 'Every day, <span class="accent">in one frame</span>',
      description: 'Faceted twice over — quarters down the rows, their months across the columns — with every day a rounded cell on a continuous colour scale, so the handful that matter surface out of a quiet year. Shown here for the first two quarters; the template runs all four. Language, week-start day and the daily metric are all slicer-driven.',
      chartLabel: 'Daily volume &middot; by quarter &amp; month',
    },
  },
};

const fr: DenebCopy = {
  intro: {
    eyebrow: 'L’idée',
    headline: 'Pas des exemples. Pas des captures. <span class="accent">Des templates.</span>',
    lede: 'Une collection de visuels Deneb prêts pour la production sous Power&nbsp;BI, conçus pour être réutilisés, étudiés et adaptés.',
    colA: 'Chaque template arrive entièrement mis en forme : intégration du thème Power&nbsp;BI, paramètres configurables et documentation intégrée détaillée.',
    colB: 'Importez, associez vos champs et partez d’une base solide plutôt que d’une page blanche.',
    statTemplates: 'Templates réutilisables',
    statThemed: 'Compatibles thème Power&nbsp;BI',
    statDocumented: 'Config et Named&nbsp;Styles entièrement documentés',
  },
  closing: {
    eyebrow: 'À vous de les adapter',
    headline: 'Servez-vous-en comme <span class="accent">points de départ</span>.',
    subtitle: 'Personnalisez librement. Chaque Config et chaque Named Style est documenté et n’attend que vos champs, votre palette, votre rapport.',
    cta: 'Explorer la bibliothèque sur GitHub',
    signature: 'Deneb &middot; Raffiné',
  },
  extras: {
    t01SliderLabel: 'Top N',
    t01Others: 'Autres',
    t07All: 'Tous',
    // BCG matrix segment names — the standard French terms for the framework.
    t07Quads: ['Vedettes', 'Dilemmes', 'Poids morts', 'Vaches à lait'],
    t17Sub: 'Analyse de la durée et de la décomposition des événements | Visuel unique',
    t17Kpis: ['Durée du cycle de vie', 'Impact du modèle', 'Impact DAX', 'Impact du rendu', 'Impact de l’attente'],
    t17TableHead: ['Catégorie d’événement', 'Nombre', 'Moy. (ms)', 'Poids'],
    // Left in English: these mirror the Performance Analyzer export's own
    // event-category names, as do the event rows in the Gantt.
    t17TableCats: ['Model', 'DAX', 'Query Pending', 'Render Visual', 'Autres'],
    t17Total: 'Total de la session',
    t17Legend: ['Phase parente', 'Tâche d’exécution', 'Cycle de vie du conteneur', 'Événement à 0 ms'],
    t18Months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    // Lundi-first initials would misrepresent the visual, which is showing a
    // Sunday-start week here: D L M M J V S.
    t18Dow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    t18Slicers: [
      { label: 'Langue', value: 'Français' },
      { label: 'Début de semaine', value: 'Dimanche' },
      { label: 'Métrique du jour', value: 'Valeur' },
    ],
  },
  templates: {
    'space-saving-bar': {
      label: 'Barres compactes',
      title: 'Top N, <span class="accent">puis Autres</span>',
      description: 'Des barres pleine largeur classent vos meilleures catégories ; tout ce qui dépasse le seuil est regroupé dans une seule barre <em>Autres</em>. Déplacez le curseur pour choisir combien restent en vue.',
      chartLabel: 'Chiffre d’affaires par client &middot; k$',
    },
    'bullet-chart': {
      label: 'Graphique bullet',
      title: 'Une barre, tous les <span class="accent">repères</span>',
      description: 'Comparez le réalisé, la cible, les repères et des plages de performance qualitatives dans un seul visuel compact. Idéal pour les tableaux de bord de direction, où la place manque mais le contexte compte.',
      chartLabel: 'Performance vs cible',
    },
    'heat-map': {
      label: 'Carte de chaleur',
      title: 'La semaine, <span class="accent">heure par heure</span>',
      description: 'Les ventes par heure et par jour se lisent comme une seule matrice, encadrée par des graphiques en barres et en colonnes qui totalisent chaque axe — les heures de pointe ressortent d’elles-mêmes.',
      chartLabel: 'Ventes · heure × jour',
    },
    'ring-chart': {
      label: 'Anneaux concentriques',
      title: 'Trois <span class="accent">anneaux</span>',
      description: 'Trois anneaux concentriques, chacun une part de 100 % — des indicateurs imbriqués qui se lisent d’un coup d’œil, sans qu’aucune légende n’encombre le cadre.',
    },
    'linear-gauges': {
      label: 'Jauges linéaires',
      title: 'Lire les <span class="accent">zones</span>',
      description: 'Chaque mesure se lit face à des zones de performance, avec un fin repère qui marque exactement où vous vous situez — unités et seuils en un seul balayage horizontal.',
      chartLabel: 'Opérations · face aux zones',
    },
    'two-level-column': {
      label: 'Colonnes à 2 niveaux',
      title: 'Deux niveaux, <span class="accent">une colonne</span>',
      description: 'Des colonnes de catégorie avec, au premier plan, des colonnes de sous-catégorie groupées, chacune portant son étiquette de données — le tout et ses parties sur un même axe.',
      chartLabel: 'Chiffre d’affaires par région &amp; gamme',
    },
    'quadrant-chart': {
      label: 'Graphique en quadrants',
      title: 'Quatre <span class="accent">quadrants</span>',
      description: 'Nuage de points façon BCG, filtrable par quadrant — chaque bouton resserre la focale pour que tous les points d’un segment soient visibles, sans le bruit visuel des autres.',
    },
    'violin-box-plot': {
      label: 'Violon + boîte à moustaches',
      title: 'La distribution <span class="accent">prend forme</span>',
      description: 'Le violon trace la densité de chaque observation ; la boîte à moustaches interne ancre médiane, quartiles et moustaches. Asymétrie, dispersion et valeurs extrêmes apparaissent sans la moindre agrégation.',
      chartLabel: 'Distribution des scores',
    },
    regression: {
      label: 'Régression',
      title: 'La <span class="accent">droite de tendance</span>',
      description: 'Un nuage de points associé à une droite de régression par moindres carrés et à son annotation R². La relation entre deux variables rendue lisible, sans tableau croisé.',
      chartLabel: 'Dépenses vs Chiffre d’affaires &middot; R² = 0,86',
    },
    'variance-analysis': {
      label: 'Analyse des écarts',
      title: 'Chaque <span class="accent">écart</span>',
      description: 'Écart en valeur et écart en pourcentage côte à côte — les flèches s’ancrent sur le réalisé et pointent à gauche ou à droite pour indiquer le sens. À droite, des barres de pourcentage divergentes complètent le tableau.',
    },
    'ibcs-chart': {
      label: 'Graphique IBCS',
      title: 'La norme <span class="accent">IBCS</span>',
      description: 'Trois panneaux empilés verticalement — écart en %, écart en valeur, et réalisé vs année précédente — suivent la notation IBCS : points d’écart en sucette, barres signées à marqueurs triangulaires et colonnes groupées.',
    },
    'area-min-max': {
      label: 'Aire min/max',
      title: 'Toute <span class="accent">l’amplitude</span>',
      description: 'Une bande ombrée s’étend entre le minimum et le maximum quotidiens, la ligne de moyenne la traversant en son milieu — saisonnalité, volatilité et tendance dans un seul graphique en aires.',
      chartLabel: 'Amplitude quotidienne · min / moy. / max',
    },
    waterfall: {
      label: 'Cascade',
      title: 'Jusqu’au <span class="accent">total</span>',
      description: 'Des barres flottantes en suspension révèlent la contribution positive ou négative de chaque catégorie à un total cumulé — la référence pour le budget-vs-réalisé et la décomposition du compte de résultat.',
      chartLabel: 'Contribution au résultat net',
    },
    'correlation-matrix': {
      label: 'Matrice de corrélation',
      title: 'Chaque paire, <span class="accent">mesurée</span>',
      description: 'Une matrice de corrélation symétrique encode le r de Pearson à la fois par la saturation de la couleur et par la taille du cercle — les relations les plus fortes ressortent d’un coup d’œil, sans lire un seul chiffre.',
      chartLabel: 'r de Pearson · toutes les paires',
    },
    'financial-waterfall': {
      label: 'Cascade financière',
      title: 'Du chiffre d’affaires <span class="accent">au résultat</span>',
      description: 'Une cascade descendante mène du chiffre d’affaires brut au résultat net en passant par chaque poste de coût — EBITDA, amortissements, impôt — chaque étape ancrée et étiquetée sur un graphique de transition.',
      chartLabel: 'Passerelle P&amp;L · du CA au résultat net',
    },
    sunburst: {
      label: 'Sunburst',
      title: 'La hiérarchie en <span class="accent">anneaux</span>',
      description: 'Deux niveaux de hiérarchie de catégories rayonnent depuis un total central — les segments parents sur l’anneau intérieur, les enfants sur l’extérieur. Proportion et hiérarchie ensemble, sans imbrication.',
      chartLabel: 'Chiffre d’affaires par catégorie · deux niveaux',
    },
    'performance-analysis': {
      label: 'Analyse de performance',
      title: 'Export de <span class="accent">l’analyseur de performances</span>',
      description: '',
    },
    'calendar-heat-map': {
      label: 'Carte de chaleur calendaire',
      title: 'Chaque jour, <span class="accent">d’un seul regard</span>',
      description: 'Un double facettage — les trimestres en lignes, leurs mois en colonnes — où chaque jour est une cellule arrondie sur une échelle de couleur continue, si bien que les quelques jours qui comptent émergent d’une année calme. Les deux premiers trimestres sont montrés ici ; le template couvre les quatre. Langue, jour de début de semaine et métrique quotidienne sont tous pilotés par segment.',
      chartLabel: 'Volume quotidien &middot; par trimestre &amp; mois',
    },
  },
};

const COPY: Record<Lang, DenebCopy> = { en, fr };

export const denebCopy = (lang: Lang): DenebCopy => COPY[lang];
