---
title: "Accessibilité dans PBIP avec l'ordre de tabulation et le texte alternatif"
date: 2026-05-04
tag: "accessibility"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/f20597d1-90e8-41d7-84f1-135623d19bed"
excerpt: "L'accessibilité est un prérequis pour un bon design. Je pense que la communauté a fait des progrès significatifs sur ces sujets ces dernières années, notamment sur le contraste des couleurs..."
sourceFile: "26 - Accessibility in PBIP with Tab Order and Alt Text.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/26%20-%20Accessibility%20in%20PBIP%20with%20Tab%20Order%20and%20Alt%20Text.md"
enSlug: "accessibility-in-pbip-with-tab-order-and-alt-text"
---

<br>
<br>

**L'accessibilité est un prérequis pour un bon design.** Je pense que la communauté a fait des progrès significatifs sur ces sujets ces dernières années, notamment sur l'amélioration du contraste des couleurs, la taille des polices et l'utilisation de palettes de couleurs accessibles. Ce progrès se reflète clairement dans les compétitions de rapports, les articles de blog, les portfolios et les exemples partagés par la communauté.

Cependant, l'accessibilité est un sujet bien plus vaste. Par exemple, si vous participez aux Microsoft Data Visualization Championships, vous remarquerez deux critères que la plupart des développeurs ont rarement, voire jamais, implémentés : l'**ordre de tabulation** (Tab order) et le **texte alternatif** (Alt text).

Pourquoi cela ? Je ne pense pas que le problème soit que les développeurs ignorent l'existence de ces fonctionnalités. Je pense que la plupart savent qu'elles existent, du moins à un niveau général. Le vrai problème, c'est que l'interface de Power BI Desktop rend les fonctionnalités d'accessibilité difficiles à trouver et difficiles à tester. Il n'existe aucun mécanisme de contrôle et aucun retour de validation. On découvre souvent le problème uniquement lorsqu'un utilisateur au clavier navigue dans le rapport et se retrouve au mauvais endroit.

Passer au format PBIR change la donne. Les propriétés d'accessibilité, auparavant cachées dans l'interface, deviennent auditables, automatisables et applicables.
<br>

> [!NOTE]
>**C'est l'objectif de cet article : explorer si l'accessibilité peut passer d'un « nice to have » à une véritable norme portée par l'automatisation.**

<br>

Entrons dans le vif du sujet.

### Ce que font réellement l'ordre de tabulation et le texte alternatif

L'**ordre de tabulation** est la séquence selon laquelle le focus clavier se déplace parmi les visuels d'une page de rapport lorsqu'un utilisateur appuie sur la touche Tab. Pour une personne naviguant sans souris, un utilisateur de lecteur d'écran, ou toute personne dépendant d'une interaction au clavier uniquement, l'ordre de tabulation est le seul mécanisme de navigation disponible. Sans le définir explicitement, Power BI attribue le focus selon une séquence arbitraire basée sur l'ordre dans lequel les visuels ont été ajoutés au canevas. Cette séquence correspond rarement au flux de lecture prévu.
<br>

<img width="180" height="250" alt="image" src="https://github.com/user-attachments/assets/3e3de585-c3c7-4c66-9200-d8cea885eef2" />

<br>

> [!TIP]
> Saviez-vous que si vous allez dans Sélection > Ordre de tabulation et que vous cliquez sur le bouton mis en évidence dans l'image « Faire correspondre l'ordre de tabulation à l'ordre visuel », cela réorganise automatiquement la séquence de tabulation des éléments de la page ?

<br>

Le **texte alternatif** est la description qu'un lecteur d'écran énonce lorsqu'il se positionne sur un visuel. Correctement défini, l'utilisateur entend « Graphique à barres montrant les ventes mensuelles par région pour l'exercice 2024. L'Amérique du Nord est en tête avec 4,2 M$. » C'est la différence entre un rapport qui fonctionne pour tout le monde et un rapport qui ne fonctionne que pour les utilisateurs voyants équipés d'une souris.
<br>

<img width="178" height="406" alt="image" src="https://github.com/user-attachments/assets/5da65056-6c52-4f3d-8db8-92e4cd23c117" />

<br>
Les deux propriétés servent le même objectif : rendre un rapport navigable et interprétable pour des utilisateurs qui l'expérimentent différemment.

<br>

### Ce qu'il se passe quand on essaie de bien faire les choses dans PBIR

Implémenter l'accessibilité dans vos rapports n'est pas une question d'effort. Ce n'est pas une case à cocher avant publication. C'est une question d'architecture. Un développeur qui traite l'accessibilité comme une tâche de dernière minute passera à côté de catégories entières. Un développeur dont le flux de travail produit les propriétés d'accessibilité comme un résultat structurel obtiendra toujours de meilleurs résultats.

Voici l'expérience que j'ai vécue en implémentant l'ordre de tabulation et le texte alternatif via PBIR, à l'aide de PowerBI-modelling-mcp.

La véritable expérience.

**Le texte alternatif, c'est facile.** Vous modifiez le JSON du visuel, vous ajoutez la propriété `altText` sous `visualContainerObjects`, et Power BI Desktop la prend en compte immédiatement. Aucun souci. Commit, push, terminé. La structure est propre et prévisible.

<img width="1380" height="582" alt="image" src="https://github.com/user-attachments/assets/753a57df-9c6d-4497-ba11-455c63a6b539" />

**L'ordre de tabulation, en revanche, a échoué dès la première tentative.** La première tentative d'ajout de propriétés `tabOrder` au JSON des visuels a déclenché des erreurs de validation de schéma dans Power BI Desktop. La propriété existe dans le fichier, mais Power BI l'ignorait, sans avertissement, sans erreur, sans aucune indication qu'un problème existait. Je n'ai découvert le problème qu'en ouvrant le rapport et en constatant que la navigation au clavier ne fonctionnait toujours pas. J'ai supprimé les propriétés et recommencé.

**La réimplémentation a mis en lumière deux comportements qui ne sont clairement documentés nulle part.**

**La règle de l'ordre décroissant** : `tabOrder` fonctionne à l'envers. Une valeur numérique plus élevée signifie un passage plus tôt dans la séquence clavier. Un visuel avec `tabOrder: 6000` reçoit le focus en premier. Un visuel avec `tabOrder: 1000` reçoit le focus en dernier. C'est l'inverse de ce que la plupart des développeurs supposent. Si vous l'implémentez de manière intuitive, valeur la plus basse en premier, votre séquence de tabulation se déroulera à l'envers sur la page.

**La règle de synchronisation avec z** : la propriété `z` (qui contrôle l'empilement des calques) et `tabOrder` ne sont pas indépendantes. Elles doivent évoluer proportionnellement dans la même direction. Si les valeurs de `z` ne sont pas mises à l'échelle en cohérence avec les valeurs de `tabOrder`, le rendu des calques se casse indépendamment de l'ordre clavier. Vous obtenez un rapport où la navigation au clavier fonctionne correctement, mais où les visuels se chevauchent dans le mauvais ordre d'empilement.

```json
// First tab stop: KPI visual, top-left of the page
{
  "position": {
    "z": 4000,
    "tabOrder": 5000
  }
}

// Second tab stop: bar chart
{
  "position": {
    "z": 3800,
    "tabOrder": 4000
  }
}

// Last tab stop: matrix at the bottom
{
  "position": {
    "z": 1000,
    "tabOrder": 1000
  }
}
```

`tabOrder` 5000 se déclenche en premier. `tabOrder` 1000 se déclenche en dernier. `z` diminue proportionnellement en parallèle de `tabOrder`. **Ce comportement est bien réel et, personnellement, je ne le trouve pas si évident.**

> [!NOTE]
> `tabOrder` était silencieusement invalide dans Power BI Desktop 2.147.x. La propriété existait dans le fichier mais était ignorée sans erreur. Vérifiez toujours que votre version de PBI Desktop prend en charge la version de schéma référencée dans vos fichiers JSON de visuels avant de construire un flux de travail autour de l'ordre de tabulation.

L'arc de développement complet, réparti sur cinq commits, raconte l'histoire que tout développeur vivra : ajouter le texte alternatif (ça fonctionne), ajouter `tabOrder` (échec de schéma, retour en arrière forcé), réimplémenter avec la logique décroissante (ça fonctionne), découvrir que la synchronisation avec `z` est nécessaire (mise à jour de toutes les valeurs de `z`), appliquer le modèle validé au reste des pages.

Trois heures d'itération. Deux comportements non évidents. Un modèle reproductible au final.

<br>

### Le format PBIR rend l'accessibilité auditable

Voici ce que PBIR permet et que le binaire `.pbix` ne permet pas : puisque PBIR stocke les métadonnées de rapport sous forme de fichiers JSON dans une structure de dossiers, vous pouvez grep chaque visuel à la recherche d'une propriété `altText` manquante en une seule commande. Vous pouvez valider que toutes les valeurs de `tabOrder` suivent la bonne séquence décroissante avant même d'ouvrir Power BI Desktop.

Lorsque quelqu'un modifie un rapport dans l'interface et écrase une propriété de texte alternatif, cela apparaît comme une ligne modifiée dans Git. Une seule ligne. Consultable. Réversible. Traçable jusqu'à un message de commit.

La structure du texte alternatif dans PBIR est cohérente sur tous les types de visuels. Une variante littérale statique et une variante dynamique basée sur une mesure DAX sont toutes deux prises en charge :

```json
// Static alt text
"visualContainerObjects": {
  "general": [{
    "properties": {
      "altText": {
        "expr": {
          "Literal": {
            "Value": "'Scatter chart analyzing the relationship between Margin (x-axis) and Sales (y-axis) by City. Each bubble represents a city, showing profitability versus revenue correlation.'"
          }
        }
      }
    }
  }]
}
```

```json
// Dynamic alt text via DAX measure
"altText": {
  "expr": {
    "Measure": {
      "Expression": { "SourceRef": { "Entity": "_Measures" } },
      "Property": "Alt Text - Sales Visual"
    }
  }
}
```

La variante statique est simple. La variante DAX nécessite une mesure dans votre modèle sémantique, mais cette mesure peut faire référence au contexte de filtre, aux valeurs sélectionnées et à des synthèses calculées. Le résultat est un texte alternatif qui se lit « Ventes pour l'exercice 2024 en Amérique du Nord : 4,2 M$, en hausse de 12 % par rapport à l'année précédente » plutôt que quelque chose comme « Graphique à barres montrant les ventes. » C'est la différence entre une étiquette et une description. Cette distinction est au cœur même de l'accessibilité.

<br>

### L'IA et le serveur MCP de modélisation peuvent générer automatiquement les propriétés d'accessibilité

Un serveur MCP de modélisation connecté à votre dossier PBIR peut lire le type d'un visuel, sa position, ses liaisons de données et le contexte de la page. À partir de ces informations, il peut générer une chaîne de texte alternatif pertinente ainsi qu'une valeur `tabOrder` correcte qui respecte la hiérarchie de lecture des visuels. PBIR est du JSON structuré. Un modèle d'IA avec accès aux fichiers peut l'analyser de manière fiable et appliquer des règles bien définies dessus.

Le flux de travail est direct. Vous pointez un outil d'IA vers votre dossier de rapport PBIR. Il lit les fichiers de visuels, identifie ceux auxquels il manque un texte alternatif, et produit des descriptions contextuellement appropriées pour chacun. Le résultat est un ensemble d'objets de patch JSON : à examiner, comparer (diff) et commiter comme n'importe quel autre changement de code. Aucune interaction avec l'interface n'est requise.

C'est la bonne frontière d'abstraction. Vous définissez l'intention du visuel et le contexte des données au moment de la conception. L'IA se charge de la traduction mécanique de cette intention en descriptions conformes aux WCAG. Séparer ces responsabilités, c'est de la bonne ingénierie.

Pour exécuter cela sur votre propre rapport, ouvrez Visual Studio Code et une session Claude ou GitHub Copilot avec accès aux fichiers de votre dossier PBIR, puis collez ce prompt :

```
For each visual in this PBIR report folder:

1. Read the visual type (visualType), title (from visualContainerObjects),
   and data bindings (from the query object: field names, measure names).
2. Read the position object: x, y coordinates indicate where the visual
   sits on the page.
3. Check whether altText is defined under
   visualContainerObjects > general > properties.
4. If altText is missing, generate a descriptive alt text string that:
   • Names the chart type
   • Names the primary measure and dimension
   • Describes the user question the visual answers
   • Stays under 150 characters
5. Output a JSON patch object for each visual using the PBIR altText
   structure under visualContainerObjects.
6. For tab order: assign descending tabOrder values in multiples of 1000,
   following left-to-right, top-to-bottom reading sequence based on x/y.
   Set z values to scale proportionally downward with tabOrder.
   Output the updated position objects for every visual on the page.

Do not modify any other properties. Output only the patch objects,
grouped by page, with the visual name as the key.
```

> [!TIP]
> Ce prompt fonctionne parce que PBIR est une donnée structurée, pas un binaire compilé. L'IA analyse le type de visuel, les champs du graphique et les coordonnées, puis applique des règles que le format rend explicites. La fiabilité vient de la structure, pas de la connaissance générale du modèle.

<img width="946" height="670" alt="Prompt AltText and TabOrder" src="https://github.com/user-attachments/assets/d817a1d5-2bb2-45ac-a853-85b4da534096" />

<br>
<img width="957" height="785" alt="Prompt AltText and TabOrder 2" src="https://github.com/user-attachments/assets/040fc4ed-8f11-4cde-bd3f-f5ec380871e0" />

<br>

### Conclusion

L'accessibilité appliquée via l'interface à la fin d'un projet est fragile. Elle ne survit pas à une restructuration du rapport, à des ajouts de visuels sous pression du temps, ou à un sprint de compétition où la dernière heure est consacrée à peaufiner les graphiques. L'accessibilité intégrée dans la structure PBIR, suivie dans Git et renforcée par un audit piloté par l'IA survit à tout cela. Elle fait partie de l'architecture, elle n'est pas peinte par-dessus.

<br>

💬 Partagez vos réflexions dans le **[post LinkedIn](https://www.linkedin.com/posts/alexandru-badiu_powerbi-accessibility-inclusivedesign-share-7456938364324372480-LQKG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAd2rAYBtqG-2bVNWh14j0hOzgmbFYqs3hE)**.
✅ Scripts disponibles dans le **[dépôt GitHub]((https://github.com/alexbadiu-insightsinmotion/PBI-Documentation))**.

### À bientôt ! ⌛
