// Editorial copy for the Deneb gallery, per locale.
//
// Kept out of dictionary.ts (which holds short chrome strings) because this is
// prose: ~90 strings that would swamp it. Template copy is keyed by the registry
// slug, so a missing translation is a type error at the use site rather than a
// silent English fallback.
//
// Three conventions, all deliberate:
//  - Chart-type names are translated where French BI usage has a settled term
//    ("Cascade", "Jauges linéaires") and kept where the English term *is* the
//    French usage ("Sunburst", "IBCS", "Top N").
//  - Technical vocabulary inside the thumbnails is NOT translated: Performance
//    Analyzer event names, DAX/measure names and field names appear as they do in
//    the tooling and in the source template. Only the prose around them moves.
//  - Every description has to be traceable to the upstream 2NN document or to the
//    thumbnail on the card. A description that invents an encoding is worse than a
//    dull one, because a reader acts on it: #14 claimed to plot Pearson r in circle
//    sizes when the template plots collaboration percentages in coloured squares.
import type { Lang } from './dictionary';

export interface TemplateCopy {
  /** Eyebrow tail and navigator entry. */
  label: string;
  /** Heading HTML — may contain <span class="accent"> and <em>. */
  title: string;
  description: string;
  /** Caption above the thumbnail, where the template has one. */
  chartLabel?: string;
  /**
   * One name per template JSON, in registry order, for the templates that ship
   * more than one. Required in that case: without it the links would render as
   * several identical "Template JSON" rows. DenebGallery throws on a mismatch.
   */
  jsonLabels?: string[];
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
  /** Long description for the calendar SVG, read by assistive tech. */
  t18Aria: string;
  /** Class titles, in drawing order: negative, positive, neutral. */
  t19Classes: string[];
  /** The seven survey choices, strongly disagree → strongly agree. */
  t19Choices: string[];
  /** Survey categories, top to bottom. */
  t19Cats: string[];
  /** Custom tooltip row labels: share, responses, negative total, question. */
  t19Tip: string[];
  /** Value of the tooltip's Question row. */
  t19TipQuestion: string;
  t19Aria: string;
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
    lede: 'Deneb visuals for Power&nbsp;BI, built to be reused, studied and adapted.',
    colA: 'Every template arrives fully formatted: Power&nbsp;BI theme integration, configurable parameters, and inline documentation throughout.',
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
    t18Aria:
      'Calendar heat map: six months of daily values, faceted by quarter and month, with the highest days picked out in darker tones',
    t19Classes: ['Negative', 'Positive', 'Neutral'],
    t19Choices: [
      'Strongly disagree',
      'Moderately disagree',
      'Mildly disagree',
      'Neither agree nor disagree',
      'Mildly agree',
      'Moderately agree',
      'Strongly agree',
    ],
    t19Cats: ['Brand', 'Model', 'Dealer', 'Location', 'Performance', 'Emissions'],
    t19Tip: ['Share of responses', 'Responses', 'Negative total', 'Question'],
    t19TipQuestion: 'Influence',
    t19Aria:
      'Sentiment analysis: diverging stacked bars for six survey categories, disagreement left of zero and agreement right, neutral answers in a separate panel, with a custom tooltip card open on one bar',
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
      description: 'Actuals, target, benchmark and qualitative performance bands, all inside one compact bar. Useful where a dashboard has room for a single row and still needs the context.',
      chartLabel: 'Performance vs target',
    },
    'heat-map': {
      label: 'Heat map',
      title: 'The week, <span class="accent">by the hour</span>',
      description: 'Sales by hour and weekday read as one matrix, framed by marginal bar and column charts that total each axis. Vega-Lite composes the three into a single visual, so the alignment holds without you maintaining it.',
      chartLabel: 'Sales · hour × weekday',
    },
    'ring-chart': {
      label: 'Ring chart',
      title: 'Three <span class="accent">rings</span>',
      description: 'Three concentric rings, each one measure against 100%. Stacking donut charts in Power BI means keeping their sizes, colours and alignment in step by hand; one multi-layer Vega-Lite spec does it for you.',
    },
    'linear-gauges': {
      label: 'Linear gauges',
      title: 'Reading the <span class="accent">zones</span>',
      description: 'The native Power BI gauge spends most of its area on whitespace. These read the same measure against banded performance zones in a fraction of the height, with a slim pointer marking where you land. Three variants ship.',
      chartLabel: 'Operations · against zones',
      jsonLabels: ['Zones and pointer', 'Zones only', 'Basic'],
    },
    'two-level-column': {
      label: '2-level column',
      title: 'Two levels, <span class="accent">one column</span>',
      description: 'Category columns sit behind clustered sub-category columns, each carrying its own data label. The whole and its parts share one axis instead of two charts.',
      chartLabel: 'Revenue by region &amp; line',
    },
    'quadrant-chart': {
      label: 'Quadrant chart',
      title: 'Four <span class="accent">quadrants</span>',
      description: 'A BCG-style scatter you can filter one quadrant at a time. Isolate a segment and its points spread out to fill the frame, rather than crowding into a corner of the full plot.',
    },
    'violin-box-plot': {
      label: 'Violin + box plot',
      title: 'Distribution <span class="accent">in shape</span>',
      description: 'The violin traces the density of every observation, and the box plot inside it anchors the median, the quartiles and the whiskers. You see the shape of the distribution rather than a summary of it.',
      chartLabel: 'Score distributions',
    },
    regression: {
      label: 'Regression',
      title: 'The <span class="accent">trend line</span>',
      description: 'Scatter points with an ordinary-least-squares fit and its R² annotated on the plot. The trend and how much to trust it arrive together.',
      chartLabel: 'Spend vs Revenue &middot; R² = 0.86',
    },
    'variance-analysis': {
      label: 'Variance analysis',
      title: 'Every <span class="accent">delta</span>',
      description: 'Amount variance and percent variance sit side by side. Arrows anchor on the actual value and point left or right for direction; diverging percent bars on the right carry the relative size.',
    },
    'ibcs-chart': {
      label: 'IBCS chart',
      title: 'The <span class="accent">IBCS</span> standard',
      description: 'Three stacked panels in IBCS notation: variance % as lollipop dots, variance amount as signed bars with triangle markers, and actuals against prior year as grouped columns.',
    },
    'area-min-max': {
      label: 'Area min/max',
      title: 'The <span class="accent">range</span> in full',
      description: 'A shaded band stretches between the daily minimum and maximum, with the mean line running through it. Volatility reads as the width of the band and trend as its drift.',
      chartLabel: 'Daily range · min / avg / max',
    },
    waterfall: {
      label: 'Waterfall',
      title: 'Building to a <span class="accent">total</span>',
      description: 'Floating bars show what each category adds to or takes from a running total. Built for budget-to-actual and income statement breakdowns, with the period variance carried on the same axis.',
      chartLabel: 'Contribution to net result',
    },
    // Slug stays `correlation-matrix`: it is a shared-link anchor and predates the
    // label being corrected to match the upstream document.
    'correlation-matrix': {
      label: 'Correlation chart',
      title: 'Who works <span class="accent">with whom</span>',
      description: 'One panel per team member, each showing how much of their project time went to every colleague, month by month. Only pairs above 70% are drawn, in three colour bands, and the strongest pair in a panel is picked out dark and labelled with its number. Every calculation runs in Vega-Lite; there is no DAX behind it.',
      chartLabel: 'Collaboration · above 70%',
    },
    'financial-waterfall': {
      label: 'Financial waterfall',
      title: 'From revenue <span class="accent">to profit</span>',
      description: 'A top-down bridge walks from gross revenue through each cost line to net profit, stopping at EBITDA, depreciation and tax on the way. Every step is anchored and labelled.',
      chartLabel: 'P&amp;L bridge · revenue to net profit',
    },
    sunburst: {
      label: 'Sunburst',
      title: 'Hierarchy in <span class="accent">rings</span>',
      description: 'Two levels of hierarchy radiate from a central total: parents on the inner ring, their children on the outer. The ring geometry is dynamic, so the chart absorbs a changing number of categories.',
      chartLabel: 'Revenue by category · two levels',
    },
    'performance-analysis': {
      label: 'Performance analysis',
      title: 'Performance Analyzer <span class="accent">export</span>',
      description: 'Performance Analyzer exports its results as JSON, one file per page; PBIR holds what each visual actually is. Joining the two puts every visual container lifecycle on one timeline, so the phases of a slow visual can be read next to a fast one from the same report. Two variants ship.',
      jsonLabels: ['Multiple visuals', 'Single visual'],
    },
    'calendar-heat-map': {
      label: 'Calendar heat map',
      title: 'Every day, <span class="accent">in one frame</span>',
      description: 'Faceted twice over, quarters down the rows and their months across: every day is a rounded cell on a continuous colour scale, so the handful that matter surface out of a quiet year. Only the first two quarters are drawn here; the template runs all four. Language, week-start day and the daily metric are slicer-driven.',
      chartLabel: 'Daily volume &middot; by quarter &amp; month',
      jsonLabels: ['Multiple languages', 'Single language'],
    },
    'sentiment-analysis': {
      label: 'Sentiment analysis',
      title: 'Agree or not, <span class="accent">at a glance</span>',
      description: 'Survey answers as diverging stacked bars: disagreement runs left of zero, agreement right, and neutral answers get a panel of their own. The axis is fixed at ±100% so questions and surveys compare like for like, and each class total sits beside its bars. Colours come from the Power&nbsp;BI theme’s sentiment palette, every rank below the top one 25% lighter. Non-neutral bars open a custom tooltip card drawn in Vega-Lite itself; neutral bars keep the standard tooltip. Built on Deneb 2.0.0.',
      chartLabel: 'Vehicle survey &middot; share of responses',
    },
  },
};

const fr: DenebCopy = {
  intro: {
    eyebrow: 'L’idée',
    headline: 'Pas des exemples. Pas des captures. <span class="accent">Des templates.</span>',
    lede: 'Des visuels Deneb pour Power&nbsp;BI, conçus pour être réutilisés, étudiés et adaptés.',
    colA: 'Chaque template arrive entièrement mis en forme : intégration du thème Power&nbsp;BI, paramètres configurables et documentation intégrée de bout en bout.',
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
    t18Aria:
      'Carte de chaleur calendaire : six mois de valeurs quotidiennes, facettées par trimestre et par mois, les journées les plus fortes ressortant en tons plus foncés',
    t19Classes: ['Négatif', 'Positif', 'Neutre'],
    t19Choices: [
      'Fortement en désaccord',
      'Modérément en désaccord',
      'Légèrement en désaccord',
      'Ni d’accord ni en désaccord',
      'Légèrement d’accord',
      'Modérément d’accord',
      'Fortement d’accord',
    ],
    // "Concession" rather than "Concessionnaire": the longer word overruns the
    // category gutter.
    t19Cats: ['Marque', 'Modèle', 'Concession', 'Emplacement', 'Performance', 'Émissions'],
    t19Tip: ['Part des réponses', 'Réponses', 'Total négatif', 'Question'],
    t19TipQuestion: 'Influence',
    t19Aria:
      'Analyse de sentiment : barres empilées divergentes pour six catégories d’enquête, le désaccord à gauche de zéro et l’accord à droite, les réponses neutres dans un panneau séparé, avec une infobulle personnalisée ouverte sur une barre',
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
      description: 'Réalisé, cible, repère et plages de performance qualitatives, le tout dans une seule barre compacte. Pratique quand le tableau de bord n’a de place que pour une ligne et qu’il faut malgré tout du contexte.',
      chartLabel: 'Performance vs cible',
    },
    'heat-map': {
      label: 'Carte de chaleur',
      title: 'La semaine, <span class="accent">heure par heure</span>',
      description: 'Les ventes par heure et par jour se lisent comme une seule matrice, encadrée par des graphiques en barres et en colonnes qui totalisent chaque axe. Vega-Lite compose les trois en un visuel unique : l’alignement tient sans que vous ayez à l’entretenir.',
      chartLabel: 'Ventes · heure × jour',
    },
    'ring-chart': {
      label: 'Anneaux concentriques',
      title: 'Trois <span class="accent">anneaux</span>',
      description: 'Trois anneaux concentriques, chacun une mesure rapportée à 100 %. Superposer des graphiques en anneau dans Power BI oblige à maintenir tailles, couleurs et alignement à la main ; une seule spécification Vega-Lite multicouche s’en charge.',
    },
    'linear-gauges': {
      label: 'Jauges linéaires',
      title: 'Lire les <span class="accent">zones</span>',
      description: 'La jauge native de Power BI consacre l’essentiel de sa surface à du vide. Celles-ci lisent la même mesure face à des zones de performance sur une fraction de la hauteur, avec un fin repère qui marque où vous vous situez. Trois variantes sont fournies.',
      chartLabel: 'Opérations · face aux zones',
      jsonLabels: ['Zones et repère', 'Zones seules', 'Version simple'],
    },
    'two-level-column': {
      label: 'Colonnes à 2 niveaux',
      title: 'Deux niveaux, <span class="accent">une colonne</span>',
      description: 'Les colonnes de catégorie passent derrière des colonnes de sous-catégorie groupées, chacune portant son étiquette de données. Le tout et ses parties partagent un même axe, au lieu de deux graphiques.',
      chartLabel: 'Chiffre d’affaires par région &amp; gamme',
    },
    'quadrant-chart': {
      label: 'Graphique en quadrants',
      title: 'Quatre <span class="accent">quadrants</span>',
      description: 'Un nuage de points façon BCG que l’on filtre quadrant par quadrant. Isolez un segment et ses points se déploient dans tout le cadre, au lieu de s’entasser dans un coin du graphique complet.',
    },
    'violin-box-plot': {
      label: 'Violon + boîte à moustaches',
      title: 'La distribution <span class="accent">prend forme</span>',
      description: 'Le violon trace la densité de chaque observation, et la boîte à moustaches qu’il contient ancre la médiane, les quartiles et les moustaches. Vous voyez la forme de la distribution, pas son résumé.',
      chartLabel: 'Distribution des scores',
    },
    regression: {
      label: 'Régression',
      title: 'La <span class="accent">droite de tendance</span>',
      description: 'Un nuage de points, un ajustement par moindres carrés et son R² annoté sur le graphique. La tendance et la confiance qu’on peut lui accorder arrivent ensemble.',
      chartLabel: 'Dépenses vs Chiffre d’affaires &middot; R² = 0,86',
    },
    'variance-analysis': {
      label: 'Analyse des écarts',
      title: 'Chaque <span class="accent">écart</span>',
      description: 'Écart en valeur et écart en pourcentage côte à côte. Les flèches s’ancrent sur le réalisé et pointent à gauche ou à droite pour donner le sens ; à droite, des barres de pourcentage divergentes portent l’ampleur relative.',
    },
    'ibcs-chart': {
      label: 'Graphique IBCS',
      title: 'La norme <span class="accent">IBCS</span>',
      description: 'Trois panneaux empilés, en notation IBCS : l’écart en % en points sucette, l’écart en valeur en barres signées à marqueurs triangulaires, et le réalisé face à l’année précédente en colonnes groupées.',
    },
    'area-min-max': {
      label: 'Aire min/max',
      title: 'Toute <span class="accent">l’amplitude</span>',
      description: 'Une bande ombrée s’étend entre le minimum et le maximum quotidiens, traversée par la ligne de moyenne. La volatilité se lit dans la largeur de la bande, la tendance dans sa dérive.',
      chartLabel: 'Amplitude quotidienne · min / moy. / max',
    },
    waterfall: {
      label: 'Cascade',
      title: 'Jusqu’au <span class="accent">total</span>',
      description: 'Des barres flottantes montrent ce que chaque catégorie ajoute ou retire à un total cumulé. Conçu pour le budget-vs-réalisé et la décomposition du compte de résultat, avec l’écart de période porté sur le même axe.',
      chartLabel: 'Contribution au résultat net',
    },
    'correlation-matrix': {
      label: 'Graphique de corrélation',
      title: 'Qui travaille <span class="accent">avec qui</span>',
      description: 'Un panneau par membre de l’équipe, montrant quelle part de son temps projet est allée à chaque collègue, mois par mois. Seules les paires au-dessus de 70 % sont tracées, en trois bandes de couleur, et la paire la plus forte de chaque panneau est détachée en foncé avec son chiffre. Tous les calculs tournent dans Vega-Lite ; il n’y a aucun DAX derrière.',
      chartLabel: 'Collaboration · au-dessus de 70 %',
    },
    'financial-waterfall': {
      label: 'Cascade financière',
      title: 'Du chiffre d’affaires <span class="accent">au résultat</span>',
      description: 'Une passerelle descendante mène du chiffre d’affaires brut au résultat net en passant par chaque poste de coût, avec un arrêt sur l’EBITDA, les amortissements et l’impôt. Chaque étape est ancrée et étiquetée.',
      chartLabel: 'Passerelle P&amp;L · du CA au résultat net',
    },
    sunburst: {
      label: 'Sunburst',
      title: 'La hiérarchie en <span class="accent">anneaux</span>',
      description: 'Deux niveaux de hiérarchie rayonnent depuis un total central : les parents sur l’anneau intérieur, leurs enfants sur l’extérieur. La géométrie des anneaux est dynamique, si bien que le graphique absorbe un nombre variable de catégories.',
      chartLabel: 'Chiffre d’affaires par catégorie · deux niveaux',
    },
    'performance-analysis': {
      label: 'Analyse de performance',
      title: 'Export de <span class="accent">l’analyseur de performances</span>',
      description: 'L’analyseur de performances exporte ses résultats en JSON, un fichier par page ; PBIR contient ce qu’est réellement chaque visuel. Joindre les deux place le cycle de vie de chaque conteneur visuel sur une même frise, et les phases d’un visuel lent se lisent à côté de celles d’un visuel rapide du même rapport. Deux variantes sont fournies.',
      jsonLabels: ['Plusieurs visuels', 'Visuel unique'],
    },
    'calendar-heat-map': {
      label: 'Carte de chaleur calendaire',
      title: 'Chaque jour, <span class="accent">d’un seul regard</span>',
      description: 'Un double facettage, les trimestres en lignes et leurs mois en colonnes : chaque jour est une cellule arrondie sur une échelle de couleur continue, si bien que les quelques jours qui comptent émergent d’une année calme. Seuls les deux premiers trimestres sont tracés ici ; le template couvre les quatre. Langue, jour de début de semaine et métrique quotidienne sont pilotés par segment.',
      chartLabel: 'Volume quotidien &middot; par trimestre &amp; mois',
      jsonLabels: ['Plusieurs langues', 'Langue unique'],
    },
    'sentiment-analysis': {
      label: 'Analyse de sentiment',
      title: 'D’accord ou pas, <span class="accent">en un coup d’œil</span>',
      description: 'Les réponses d’enquête en barres empilées divergentes : le désaccord s’étend à gauche de zéro, l’accord à droite, et les réponses neutres ont leur propre panneau. L’axe est fixé à ±100 % pour comparer questions et enquêtes à l’identique, et le total de chaque classe s’affiche à côté de ses barres. Les couleurs viennent de la palette de sentiment du thème Power&nbsp;BI, chaque rang sous le premier éclairci de 25 %. Les barres non neutres ouvrent une infobulle personnalisée dessinée dans Vega-Lite même ; les barres neutres gardent l’infobulle standard. Conçu pour Deneb 2.0.0.',
      chartLabel: 'Enquête véhicules &middot; part des réponses',
    },
  },
};

const COPY: Record<Lang, DenebCopy> = { en, fr };

export const denebCopy = (lang: Lang): DenebCopy => COPY[lang];
