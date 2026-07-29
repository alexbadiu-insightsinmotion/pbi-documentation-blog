---
title: "Documentation automatisée avec les fonctions INFO.VIEW dans Power BI"
date: 2025-02-17
tag: "INFOVIEW"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/8fce7820-4ff0-48ef-886c-a703e52b4e74"
excerpt: "En octobre 2024, Microsoft a introduit les fonctions DAX INFO.VIEW pour obtenir des métadonnées sur votre modèle sémantique. 4 fonctions utilisables dans des tables calculées."
sourceFile: "04 - Automated Documentation with INFO VIEW Functions in Power BI.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/04%20-%20Automated%20Documentation%20with%20INFO%20VIEW%20Functions%20in%20Power%20BI.md"
enSlug: "automated-documentation-with-info-view-functions-in-power-bi"
---

<br><br><br>

### Introduction

En octobre 2024, Microsoft a introduit les fonctions Data Analysis Expressions (DAX) INFO.VIEW pour obtenir des métadonnées sur votre modèle sémantique. Il existe 4 fonctions qui peuvent être utilisées dans des tables calculées du modèle sémantique ainsi que dans DAX Query View. Les ajouter en tant que tables calculées garantit que **votre modèle se documente lui-même et reste à jour automatiquement avec tous vos derniers changements.**

Source : [INFO VIEW Function Intro](https://www.linkedin.com/posts/zoedouglas-data_powerbi-dax-daxqueryview-activity-7252028773431222273-YYLh?utm_source=share&utm_medium=member_desktop)

### Documentation automatisée

Les **fonctions DAX INFO** de Power BI telles que `INFO.VIEW.MEASURES()`, `INFO.VIEW.TABLES()`, `INFO.VIEW.COLUMNS()`, et `INFO.VIEW.RELATIONSHIPS()` sont essentielles pour quiconque souhaite un **modèle sémantique autodocumenté**, toujours à jour. Plutôt que de naviguer entre les différentes vues de Power BI (Vue Rapport et Vue Modèle) pour comprendre ce que contient votre modèle de données, ces fonctions vous offrent une **vue d'ensemble tabulaire et claire**, facilement interrogeable, affichable et filtrable pour une analyse plus approfondie.

#### <mark>Peut-on qualifier cette fonctionnalité de véritable game changer ?</mark>  &nbsp;

Eh bien, **sans intégrer ces tables dans des processus spécifiques, et sans savoir comment agir en fonction de leur contenu,** **la réponse est NON**. La documentation seule n'a aucune valeur. Ce qui compte, c'est d'avoir un **objectif clair, un processus structuré, et les bonnes personnes qui examinent la documentation au bon moment.**

Les fonctions INFO **peuvent apporter beaucoup de valeur si elles sont intégrées** aux **revues de code** ou aux **exercices d'optimisation**. Elles aident à repérer des informations importantes en quelques secondes. Voici comment :

---

### **1. `INFO.VIEW.MEASURES()`** : Documenter les mesures à grande échelle

Un guichet unique pour décrire toutes les mesures de votre modèle (par exemple, où elles se trouvent, leur nom, leur type de données, leur expression, leur état, leur format, etc.) est exactement ce que fournit `INFO.VIEW.MEASURES()`. &nbsp;

![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/word-image-28196-27-2.png)

#### Pourquoi c'est puissant

- **Toujours à jour** : la table se met à jour à chaque actualisation du modèle sémantique et affiche toutes les mesures ajoutées ou modifiées.
- **Vue d'ensemble sur un seul écran** : plus besoin de basculer entre les tables pour vérifier l'emplacement ou la cohérence des noms de mesures, vous pouvez tout voir dans un seul écran de table.
- **Validation et bonnes pratiques** : identifiez rapidement les mesures en erreur, confirmez des conventions de nommage standardisées, ou vérifiez si vous utilisez un formatage cohérent (par ex. devise, pourcentage, etc.). &nbsp;
  

#### Vérifiez les bonnes pratiques DAX suivantes pour les mesures &nbsp;

- [ ] **Nommage cohérent** : adoptez des conventions de nommage claires et concises (par ex. `Sales Total`, `Margin %`, etc.).
- [ ] **Utilisez des variables** : les instructions `VAR` simplifient votre code, augmentent la clarté (et la lisibilité), et réduisent le nombre d'évaluations.
- [ ] **Type de données approprié** : assurez-vous que les mesures affichent la bonne devise, le bon pourcentage, ou la bonne précision décimale.
- [ ] **Minimisez les IF imbriqués** : remplacez les instructions IF multiples par des alternatives plus efficaces comme SWITCH ou COALESCE.
- [ ] **Table de mesures dédiée** : conservez vos mesures organisées dans une seule table ou un seul dossier pour faciliter la navigation.
- [ ] **Validez les performances** : évaluez régulièrement les mesures complexes, en particulier sur de grands jeux de données, pour éviter les goulets d'étranglement de performance.
- [ ] **Documentez avec des annotations** : ajoutez des descriptions pour clarifier l'objectif et la logique de chaque mesure.
 <br><br><br>

> [!TIP]
> Stockez temporairement les nouvelles mesures dans un dossier dédié (par ex. « WorkInProgress » ou le préfixe `_Temp`) jusqu'à ce qu'elles soient finalisées. Cela aide votre équipe à suivre quelles mesures nécessitent encore une revue ou une optimisation.

> [!TIP]
> Pour du DAX complexe, concentrez-vous sur le **POURQUOI** le code est écrit de cette manière, pas seulement sur ce qu'il fait — Copilot, ChatGPT ou d'autres LLM peuvent facilement expliquer cela. **La vraie valeur réside dans la documentation du raisonnement et des décisions derrière l'approche.**

---
<br><br><br>

### **2. `INFO.VIEW.TABLES()` :** Un instantané de votre modèle de données

Alors que `INFO.VIEW.MEASURES()` fournit des informations sur les mesures, `INFO.VIEW.TABLES()` vous donne un aperçu instantané des propriétés de chaque table. Vous pouvez rapidement voir le **mode de stockage** (Import, DirectQuery, Direct Lake) et vérifier si vous avez désigné une table avec la catégorie de données **Time** (une étape essentielle pour tout rapport Power BI est d'avoir une table de dates et de la marquer comme telle).

![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/word-image-28196-23-2.png)
<br><br><br>

#### Avantages clés

- **Aperçu du mode de stockage** : identifiez les problèmes potentiels de performance ou d'actualisation si le modèle mélange Import et DirectQuery.
- **Vérification de la table de dates** : confirmez que vous avez une table de dates correcte (c'est-à-dire qu'il n'y a pas de tables avec le préfixe « LocalDateTable_ »
- **Gouvernance simplifiée** : repérez les tables qui pourraient être sous-utilisées ou incorrectement étiquetées.
<br><br><br>

> [!WARNING]  
> 💡`INFO.VIEW.TABLES()` peut être utilisé pour identifier le mode de stockage d'une table. Notez que, même si une table spécifique apparaît comme Direct Lake, cela ne signifie pas que les requêtes seront en mode Direct Lake. Lors du développement du modèle, vous devez tester les requêtes à l'aide de DAX Studio ou de Performance Analyzer pour déterminer si la requête est en mode Direct Lake ou DirectQuery
[Controlling Direct Lake Fallback Behavior](https://fabric.guru/controlling-direct-lake-fallback-behavior)

> [!TIP]
> Enrichissez vos tables de support avec des **descriptions détaillées**

Pour les tables de support, l'ajout de descriptions détaillées peut considérablement améliorer la compréhension et la maintenabilité. Voici comment améliorer votre documentation :
<br><br><br>

- **Descriptions informatives** : ajoutez des descriptions claires qui expliquent l'objectif de chaque table de support. Détaillez pourquoi la table existe, quel type de données elle contient et quel rôle elle joue.
- **Descriptions enrichies par l'IA** : utilisez des outils d'IA pour générer ou enrichir automatiquement ces annotations comme point de départ. Par exemple, vous pouvez demander à l'IA de résumer les étapes les plus importantes effectuées dans Power Query, comme le filtrage, la fusion ou le pivotement.
- **Documenter les transformations et les décisions de conception** : indiquez clairement pourquoi vous avez choisi de normaliser ou de dénormaliser certaines tables. Incluez la justification de ces décisions (par ex. optimisation des performances, simplicité de la structure de données, facilité de maintenance, visualisations spécifiques, etc.) afin que les futurs développeurs ou parties prenantes puissent comprendre les compromis de conception.
<br><br><br>

Intégrer ces annotations ou descriptions favorise non seulement une meilleure communication au sein de votre équipe, mais crée également un **document vivant qui évolue avec votre modèle**. Cela garantit que le raisonnement derrière vos **décisions de conception reste transparent**, rendant le modèle plus facile à dépanner et à améliorer au fil du temps. **Cela crée une documentation utile à laquelle vous pouvez revenir**.
<br><br><br>

---
<br><br><br>

### **3. `INFO.VIEW.COLUMNS()`** : Construire un véritable dictionnaire de données

`INFO.VIEW.COLUMNS()` a pour but de vous donner les détails de chaque colonne, sa table, son type de données et sa catégorie de données. C'est la base pour construire un **véritable dictionnaire de données** au sein de Power BI.

![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/word-image-28196-29-2.png)

![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/a-screenshot-of-a-computer-description-automatica-27.png)

<br><br><br>

#### Pourquoi les informations de colonnes sont importantes

- **Optimisation du type de données** : assurez-vous que les colonnes contenant uniquement des nombres entiers sont définies en « Integer » et que les colonnes numériques ou monétaires sont définies en « Number » ou « Currency » pour minimiser le stockage et maximiser les performances.
- **IsAvailableInMDX** : contrôlez si une colonne doit être visible pour les outils basés sur MDX (par ex. les tableaux croisés dynamiques Excel, etc.). Masquer les colonnes non essentielles peut **améliorer les performances** et réduire la confusion.
- **Gouvernance et collaboration** : gardez votre équipe alignée en montrant quelles colonnes sont destinées au reporting par rapport aux calculs internes. Masquez les colonnes qui ne sont pas nécessaires (pour le reporting)
- **Validation continue** : repérez les incohérences ou trouvez des colonnes rarement utilisées (et envisagez de les supprimer).
<br><br><br>
> [!TIP]
> Documenter les descriptions des colonnes est une étape essentielle pour construire un dictionnaire de données efficace. Des descriptions détaillées et bien conçues font plus que simplement nommer une colonne, **elles apportent du contexte**. Elles expliquent le rôle de la colonne et facilitent l'utilisation du modèle sémantique. **Une aide précieuse pour les développeurs en self-service !**

#### Astuce performance
> [!TIP]
> Lorsque vous n'avez besoin que de quatre chiffres après la virgule au maximum, utilisez **Fixed Decimal Number** (Currency) pour réduire la cardinalité et rationaliser le stockage. C'est un petit changement, mais il peut avoir de **gros** gains de performance sur les grands modèles.

---
<br><br><br>
### **4. `INFO.VIEW.RELATIONSHIPS()`** : Simplifier les schémas complexes
![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/a-white-background-with-text-on-it-description-au-2.png)
![](https://powerbiblogsfd-ep-aveghkfaexa3e4bx.b02.azurefd.net//wp-content/uploads/2024/10/word-image-28196-25-2.png)
<br><br><br>
Pour les modèles volumineux ou complexes, la Vue Modèle peut rapidement devenir encombrée. `INFO.VIEW.RELATIONSHIPS()` offre un aperçu simple, sous forme de tableau, de toutes les relations avec des informations utiles : cardinalité, direction du filtre croisé, et si l'intégrité référentielle est utilisée.
<br><br><br>
#### Avantages
- **Analyse plus rapide** : voyez rapidement tous les détails des relations en un seul endroit, sans avoir à cliquer sur chaque connecteur dans le diagramme.
- **Vérification de l'intégrité référentielle** : si `RelyOnReferentialIntegrity` est `False`, enquêtez pour vous assurer qu'il n'y a pas de clés manquantes ou d'incohérences de données.
- **Audit et gouvernance** : exportez ou visualisez les relations directement dans un rapport Power BI pour les partager avec les parties prenantes, rendant le modèle de données plus transparent.
<br><br><br>
---
Toutes ces vues de documentation sont extrêmement utiles, mais pour vraiment en tirer parti, vous avez besoin d'une stratégie qui combine les informations de ces tables avec des analyses supplémentaires en DAX Query View et en TMDL.
<br><br><br>
L'approche la plus efficace pour faire fonctionner la documentation Power BI pour vous consiste à **l'intégrer dans des processus plus larges comme le CI/CD et les revues de code (par ex. autour des processus de pull requests, etc.)** La documentation ne consiste pas seulement à avoir des tables bien organisées, il s'agit de **passer à l'action à partir de ces informations.** Utilisez ces vues INFO directement dans votre flux de travail de développement, en complément de ce qui suit :
<br><br><br>
- [ ] **Exécutez des Best Practice Analyzers** : des outils comme **Semantic Link Labs**, **Tabular Editor BPA** ou **Dax Studio** peuvent automatiquement signaler des problèmes potentiels. Ces vérifications sont conçues pour garantir que votre modèle n'est pas seulement performant, mais aussi maintenable et évolutif dans un environnement de production.
- [ ] **Automatisez les contrôles de santé du modèle** : intégrez des scripts qui génèrent les sorties `INFO.VIEW.*` à chaque déploiement, ce qui vous aide à identifier et corriger rapidement les écarts par rapport à vos standards établis.
- [ ] **Standardisez vos pratiques** : définissez clairement les conventions de nommage, les politiques de types de données, et les règles de placement des mesures pour créer un « gold standard » pour vos modèles.
<br><br><br>
> [!TIP]
> Envisagez d'utiliser **Semantic Link Labs** pour agréger les tables INFO de tous vos modèles sémantiques dans un référentiel de métadonnées unifié. Ce référentiel peut vous montrer comment chaque table ou colonne est utilisée à travers les rapports, offrant une vue d'ensemble complète de la santé de votre modèle.

En intégrant ce processus dans votre cycle de développement, vous vous assurez que votre documentation reste **précise** et exploitable.
<br><br><br>
## Conclusion

Ces **fonctions DAX INFO** permettent à votre modèle Power BI de se documenter lui-même, révélant tout, des définitions de mesures aux types de données des colonnes en passant par les détails des relations, le tout dans **un format tabulaire et exportable**. Lorsque vous intégrez ces informations dans un processus de revue solide, comme une revue de code ou un exercice d'optimisation, vous ne vous contentez pas de collecter des données sur votre modèle, vous l'améliorez de manière **proactive**.

Si vous avez besoin d'une raison supplémentaire de vous y intéresser, la **mise à jour du catalogue OneLake de janvier 2025** pourrait bien l'être. Microsoft étend la **vue des détails des modèles sémantiques** pour y inclure les descriptions de tables et de colonnes issues de Power BI Desktop.

Cette mise à jour aide les consommateurs de données à identifier rapidement les tables pertinentes et renforce la confiance dans les données. C'est une avancée importante pour promouvoir la **qualité des données, la confiance, et le self-service.**

![](https://dataplatformblogwebfd-d3h9cbawf0h8ecgf.b01.azurefd.net/wp-content/uploads/2025/01/word-image-18117-27.png)

Source :
[OneLake Catalog – Semantic model table & column description](https://blog.fabric.microsoft.com/en-gb/blog/microsoft-fabric-january-2025-update?ft=All#post-18117-_Toc188889227)
<br><br><br>
**Les sorties de ces vues INFO peuvent également être utilisées pour enrichir le document de conception ; un prochain numéro développera ce sujet et inclura des extraits de code prêts à l'emploi.**

---
<br><br><br>
**Quelle est votre partie préférée des nouvelles fonctions DAX INFO ? Les utilisez-vous déjà ?** Partagez vos réflexions dans le post LinkedIn : nous serions ravis de poursuivre la discussion !
Post LinkedIn : [# Issue 4 : 𝗔𝘂𝘁𝗼𝗺𝗮𝘁𝗲𝗱 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻 𝘄𝗶𝘁𝗵 𝗜𝗡𝗙𝗢 𝗗𝗔𝗫 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝘀 𝗶𝗻 PBI ](https://www.linkedin.com/posts/alexandru-badiu_powerbi-documentationmatters-dataanalytics-activity-7297534340001923072-zGkz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAd2rAYBtqG-2bVNWh14j0hOzgmbFYqs3hE)
