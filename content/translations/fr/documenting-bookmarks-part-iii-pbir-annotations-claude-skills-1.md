---
title: "Documenter les Bookmarks (Partie III) - Annotations PBIR + Claude Skills (1)"
date: 2026-04-16
tag: "PBIR"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/e860d4d2-16bf-4b62-b3ed-dd63a69b0f27"
excerpt: "Dans la Partie II, j'ai identifié trois problèmes structurels de la documentation externe : trop de discipline requise, qualité inégale, invisible pour l'IA..."
sourceFile: "25 - Documenting Bookmarks (Part III) - PBIR Annotations + Claude Skills (1).md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/25%20-%20Documenting%20Bookmarks%20(Part%20III)%20-%20PBIR%20Annotations%20%2B%20Claude%20Skills%20(1).md"
enSlug: "documenting-bookmarks-part-iii-pbir-annotations-claude-skills-1"
---

# Documentation des Bookmarks Power BI (Partie III) : Annotations PBIR + Claude Skills

Dans la [Partie II](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/23%20-%20Documenting%20Bookmarks%20(part%20II)%20-%20Why%20External%20Documentation%20Fails.md) de cette série, j'ai identifié trois problèmes structurels liés à la documentation externe : elle exige trop de discipline pour être maintenue, elle produit une qualité inégale selon les développeurs, et elle reste invisible pour les outils d'IA de plus en plus utilisés pour construire et faire évoluer les solutions Power BI. Les fichiers markdown externes et les feuilles de calcul partaient d'une bonne intuition, mais au mauvais endroit.

La solution consiste à intégrer le contexte métier directement dans le fichier source PBIR à l'aide d'annotations, et à utiliser un Claude Skill pour rendre ce processus reproductible sans dépendre de la mémoire ou de la discipline individuelle. Cet article montre précisément comment cela fonctionne, et ajoute une couche Mintlify (site de documentation convivial) par-dessus pour transformer ces annotations de fichiers source en un site de documentation consultable et lisible par des humains.

## Que sont les annotations PBIR

Le JSON des bookmarks PBIR prend en charge un tableau `annotations`. Ce n'est ni un contournement ni une astuce non documentée. C'est un [mécanisme standard](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?tabs=v2%2Cdesktop#pbir-annotations) intégré au format PBIR pour stocker des métadonnées structurées à côté de n'importe quel objet.

L'annotation d'un bookmark ressemble à ceci :

```json
{
  "name": "Documentation",
  "value": "{\"businessPurpose\": \"Enable sales managers to investigate specific regions when unusual performance patterns are detected during monthly review meetings.\", \"userScenario\": \"After spotting an anomaly in the overview, click FocusSpecific to drill into regional detail without losing the overall filter context.\", \"documentedDate\": \"2025-12-24T10:30:00Z\", \"documentedBy\": \"Alexandru BADIU\", \"maintenanceNotes\": \"FocusSpecific does not control Ribbon Chart visibility. Behavior is state-dependent based on the previously active bookmark.\"}"
}
```

Dans le fichier du bookmark, le tableau `annotations` se situe au même niveau que `options` et `explorationState` :

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/bookmark/1.4.0/schema.json",
  "displayName": "FocusSpecific",
  "name": "a87d1123fc3c1c928935",
  "options": { ... },
  "explorationState": { ... },
  "annotations": [
    {
      "name": "Documentation",
      "value": "{ ... }"
    }
  ]
}
```

Cette annotation voyage avec le bookmark dans git. Lorsque le JSON du bookmark est committé, le contexte métier est committé avec lui. Lorsque Claude Code ouvre le projet PBIP, il lit à la fois le comportement technique depuis `explorationState` et l'intention depuis l'annotation, sans que vous ayez besoin de coller un contexte supplémentaire.

> [!NOTE]
> Le tableau `annotations` est le même mécanisme que celui utilisé en interne par Power BI Desktop pour stocker les propriétés d'affichage. Il fait partie du schéma, ce n'est pas une extension de celui-ci.

---

## Les problèmes de scalabilité, désormais résolus

Les trois problèmes identifiés dans la Partie II sont désormais résolus :

| Problème (Partie II) | Solution (Partie III) |
|---|---|
| Trop de choses à retenir | Le skill `@pbir-documentation` vous guide à travers un workflow structuré |
| Qualité inégale | Les 5 mêmes questions d'entretien, le même format de sortie, à chaque fois |
| Invisible pour l'IA | Les annotations vivent dans le fichier PBIR que l'IA lit déjà |

Rien de tout cela n'exige de discipline. Vous invoquez le skill ; il se charge de la structure.
-->>> **Le skill est accessible [ICI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Skills/pbir-documentation.md)**

---

## Le Workflow du Skill

Le skill `pbir-documentation` s'invoque avec `@pbir-documentation` dans Claude Code. Il gère cinq opérations distinctes :

**1. Découverte et Inventaire**

Analyse la structure des dossiers PBIP et produit un inventaire de la documentation : combien de bookmarks existent, combien ont des annotations, lesquels n'ont pas de documentation. C'est toujours le point de départ pour un rapport nouveau ou hérité.

**2. Documenter un Bookmark**

C'est l'opération centrale. Le skill :
- Lit le JSON du bookmark et extrait tous les détails techniques (paramètres, mappages de visuels, états de filtre, portée)
- Vous pose cinq questions structurées pour capturer le contexte métier
- Génère un fichier de documentation markdown à `documentation/bookmarks/[BookmarkName].md`
- Génère le JSON de l'annotation et le présente pour validation
- Réécrit l'annotation approuvée dans le fichier PBIR

Les cinq questions d'entretien sont :

```
1. Business Purpose: Why was this bookmark created? What business scenario does it address?
2. User Scenario: When should end users apply this bookmark?
3. Expected Behavior: What should users see or experience when they activate it?
4. Dependencies: Are there prerequisites or specific states that must exist before using it?
5. Related Bookmarks: Does this interact with other bookmarks? If so, how?
```

<img width="998" height="280" alt="VSC_BookmarkQuestions" src="https://github.com/user-attachments/assets/abca9cd8-faa6-4bfa-849a-faead8fba109" />

Pour les rapports hérités où le contexte est inconnu, « Unknown - legacy report » est une réponse valide. Le skill ne bloque pas en cas d'absence de contexte métier.

**3. Documenter un Visual Calculation**

Le même workflow est appliqué aux visuels contenant des visual calculations : le DAX est extrait, les dépendances de mesures sont cartographiées, et le raisonnement expliquant pourquoi un visual calculation a été choisi plutôt qu'une mesure du modèle est capturé.

**4. Valider la Documentation**

Exécute trois niveaux de contrôles de validation sur tous les objets documentés :
- **Niveau 1 (Critique) :** Tous les bookmarks ont des annotations, toutes les références de visuels existent, aucun texte de remplissage
- **Niveau 2 (Recommandé) :** L'objectif métier est documenté, les scénarios utilisateur sont décrits, les dépendances de mesures sont listées
- **Niveau 3 (Optionnel) :** Notes de performance, approches alternatives, procédures de test

**5. Tout Actualiser**

Un passage complet pour les cycles de maintenance. Vérifie toute la documentation existante par rapport au JSON actuel, met à jour lorsque l'état technique a changé, et préserve le contexte métier lorsque ce n'est pas le cas.

## À quoi ressemble le résultat

J'ai utilisé ce skill sur le même projet PBIP DemoDataset que dans les articles précédents pour documenter les quatre bookmarks. Voici le résumé exécutif produit par le skill :

| Bookmark | ID | Objectif | Complexité | Filtre Année |
|---|---|---|---|---|
| **Ribbon Chart** | 3c04be006f1ebff4ddc5 | Basculer vers la vue Ribbon Chart | Simple | 2019 |
| **Clustered Chart** | 5977e1c788aabf285a32 | Vue de comparaison de valeurs | Simple | 2019 |
| **FocusSpecific** | a87d1123fc3c1c928935 | Mise en évidence avancée dépendante de l'état | **Complexe** | 2019 |
| **Reset Filters** | 77f6391b96f7c17022ed | Retour à l'état de référence | Modérée | 2023 |

Le skill a également produit une carte d'interaction des bookmarks qui a révélé quelque chose dont je n'étais pas pleinement conscient avant d'exécuter la passe complète de documentation :

```
Reset Filters (Baseline)
    │
    ├──> Ribbon Chart <──> Clustered Chart (Toggle Pair)
    │         │                    │
    │         └────────┬───────────┘
    │                  │
    └──────────────> FocusSpecific (State-dependent)
                         ↓
                   (Different result based on previous!)
```

**FocusSpecific produit un résultat visuel différent selon le bookmark qui était actif juste avant.** Le JSON de FocusSpecific ne contrôle pas explicitement la visibilité du Ribbon Chart ; ainsi, le fait que le ribbon chart soit visible ou masqué lorsque FocusSpecific s'active dépend de ce que le bookmark précédent lui a fait.

```
Reset Filters  → FocusSpecific = Result A (Clustered Bar visible)
Ribon Chart    → FocusSpecific = Result B (Ribbon Chart visible)
Clustered Chart → FocusSpecific = Result C (Clustered Bar sorted differently)
```

Cette découverte n'était pas visible en lisant un seul JSON de bookmark isolément. Elle n'est apparue que lorsque le skill a documenté les quatre bookmarks et cartographié leurs interactions ensemble. C'est exactement le type d'insight qui justifie l'effort de documentation.

Le skill a également signalé une incohérence que je n'avais pas remarquée : les bookmarks de démonstration (Ribon Chart, Clustered Chart, FocusSpecific) référencent `Sales[Sales]` et `Sales[Sales PY]`, tandis que Reset Filters référence `_Measures[Sales]` et `_Measures[Sales PY]`. Cela indique un refactoring de la table de mesures qui a été appliqué de manière incohérente selon les bookmarks.

> [!IMPORTANT]
> Le skill a trouvé deux problèmes invisibles depuis l'interface de Power BI Desktop : le comportement dépendant de l'état de FocusSpecific, et l'incohérence de la table de mesures entre les bookmarks. Les deux ont été découverts en lisant tous les fichiers JSON de bookmarks ensemble et en les recoupant, ce qui est exactement ce que fait l'opération Découverte et Inventaire.

La structure des fichiers produits après l'exécution du skill :

```
documentation/
├── bookmarks/
│   ├── ResetFilters.md
│   ├── FocusSpecific.md
│   ├── RibbonChart.md
│   └── ClusteredChart.md
└── visual_calculations/
    └── ...
```

Chaque fichier markdown suit une structure cohérente : objectif métier, scénario utilisateur, aperçu technique, visuels concernés, états de filtre, description du comportement, dépendances et historique des modifications.

---

## Mintlify : comment rendre la documentation lisible par des humains

Le dossier `documentation/` vit à l'intérieur du dépôt git PBIP. Les développeurs utilisant VS Code peuvent le lire directement, mais on ne peut pas attendre des parties prenantes métier et des équipes QA qu'elles parcourent un dépôt git. Mintlify transforme ces fichiers markdown en un site de documentation consultable et versionné, qui se met à jour automatiquement à chaque push.

Voici un exemple de documentation de bookmark sur Mintlify - fond blanc
<img width="1944" height="1328" alt="Mintlyfy White" src="https://github.com/user-attachments/assets/63481a29-37d7-4295-89f0-a4bfdb6c4db2" />

Voici un exemple de documentation de bookmark sur Mintlify - fond sombre
<img width="1986" height="1339" alt="Mintlyfy Dark" src="https://github.com/user-attachments/assets/4f531bf0-f068-4c4c-87be-d2dceee9b991" />

Voici un exemple de documentation de bookmark sur Mintlify - IA intégrée
<img width="2054" height="1289" alt="Mintlyfy AI" src="https://github.com/user-attachments/assets/39292778-b50c-4086-af55-7fb1c36b7bfb" />

Découvrez cette documentation conviviale et dynamique ici : https://decilia.mintlify.app/documentation/bookmarks/RibonChart

### Étape 1 : Ajouter `docs.json` à la racine du PBIP

Il s'agit du fichier de configuration Mintlify. Notez les champs obligatoires `$schema` et `theme` — le format actuel de Mintlify (v2) ne se déploiera pas sans eux.

```json
{
  "$schema": "https://mintlify.com/docs.json",
  "theme": "mint",
  "name": "Demo Dataset",
  "colors": {
    "primary": "#F2C811"
  },
  "navigation": {
    "groups": [
      {
        "group": "Overview",
        "pages": ["index", "BOOKMARKS_DOCUMENTATION"]
      },
      {
        "group": "Bookmarks",
        "pages": [
          "documentation/bookmarks/ResetFilters",
          "documentation/bookmarks/ClusteredChart",
          "documentation/bookmarks/RibonChart",
          "documentation/bookmarks/FocusSpecific"
        ]
      }
    ]
  }
}
```

### Étape 2 : Comment structurer chaque fichier markdown pour Mintlify

Mintlify utilise `title` et `description` du frontmatter pour les libellés de navigation et la recherche. Ajoutez ce bloc en haut de chaque fichier de documentation de bookmark :

```yaml
---
title: "Reset Filters"
description: "Resets the report to baseline state with 2023 data and default visual configuration."
---
```

### Étape 3 : Ajouter une page d'accueil `index.mdx`

```mdx
---
title: "Demo Dataset Documentation"
description: "Technical and business documentation generated from PBIR source files."
---

# Demo Dataset

This site documents the bookmarks in the Demo Dataset Power BI report.
Documentation is generated from PBIR source files using the `pbir-documentation`
Claude Skill and maintained in version control alongside the report.
```

### Étape 4 : Committer et pousser vers GitHub

```bash
git add docs.json index.mdx documentation/
git commit -m "Add Mintlify documentation site configuration"
git push
```
Pas besoin de vous inquiéter si ces étapes ne sont pas totalement claires. Un assistant LLM peut s'en charger pour vous. Ceci n'est qu'un aperçu de ce qu'il fait.

### Étape 5 : Se connecter à Mintlify

1. Créez un compte gratuit sur [mintlify.com](https://mintlify.com)
2. Lorsqu'on vous demande comment configurer votre documentation, choisissez **Try the manual setup instead** (et non Auto-generate, car cette option réécrit votre contenu avec l'IA)
3. Installez la Mintlify GitHub App lorsque demandé, autorisez-la pour votre dépôt
4. Allez dans **Settings > Git settings** dans le dashboard Mintlify
5. Définissez le dépôt, la branche (`main`), et laissez le répertoire de documentation vide (racine)
6. Enregistrez - Mintlify se déploie automatiquement

À partir de ce moment, chaque `git push` met à jour le site. Aucune étape de publication manuelle.

> [!TIP]
> Si votre projet PBIP se trouve dans un sous-dossier d'un dépôt plus large, définissez le répertoire de documentation dans Git settings sur le chemin du sous-dossier où se trouve `docs.json`.

---

## La Vue d'Ensemble

Partie I - [Issue 21](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/21%20-%20Documenting%20Bookmarks%20with%20PBIR.md) a montré que le JSON des bookmarks PBIR est structuré et riche : les IDs de visuels, les états de filtre, les paramètres de portée et les propriétés d'affichage sont tous là pour être lus par une IA ou un développeur avec VS Code.

Partie II - [Issue 23](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/23%20-%20Documenting%20Bookmarks%20(part%20II)%20-%20Why%20External%20Documentation%20Fails.md) a montré qu'extraire cette information ne suffit pas. Sans processus de capture cohérent et sans emplacement accessible, le contexte métier ne survit pas aux passations d'équipe, aux refontes de rapports, ni au passage du temps.

Cette partie III boucle la boucle. L'annotation intègre le « pourquoi » directement dans la source. Le skill impose une structure et supprime la charge liée à la mémoire. Le site Mintlify rend le résultat accessible à quiconque dispose d'un navigateur, pas seulement aux développeurs équipés de VS Code.

Lorsque Claude Code ouvre un projet PBIP avec des annotations en place, il lit à la fois le comportement technique dans `explorationState` et l'intention dans l'annotation, en une seule passe. Vous n'avez pas besoin de coller de contexte. Vous n'avez pas besoin d'expliquer pourquoi le bookmark a été créé ; cette information est déjà là.

---

## Conclusion

Cette série a commencé par une question simple : peut-on extraire une documentation utile du JSON PBIR ? La réponse est oui, clairement et immédiatement. PBIR stocke suffisamment de structure pour reconstituer avec une bonne précision ce que fait un bookmark.

Mais cette question en a rapidement révélé une plus difficile : où vit le « pourquoi » ? Le JSON peut vous dire que FocusSpecific applique une mise en évidence sur l'Amérique du Nord et un filtre de genre Homme. Il ne peut pas vous dire que cela a été demandé par l'équipe Sales Operations pour soutenir les réunions de revue mensuelles, ni que le comportement dépendant de l'état avec le Ribbon Chart n'a pas été détecté lors des tests et déroute les utilisateurs depuis.

L'approche par annotation ne nécessite ni nouvel outil ni nouveau format. Le tableau `annotations` est déjà présent dans le schéma. Le Claude Skill enveloppe un workflow structuré autour de lui afin que la qualité du résultat ne dépende pas du développeur qui l'exécute. Mintlify rend le résultat lisible par les personnes qui s'y intéressent le plus, mais qui sont les moins susceptibles d'ouvrir un fichier JSON.

Ce principe plus large s'applique au-delà des bookmarks. À mesure que l'IA devient une véritable participante au développement Power BI, et non plus seulement un assistant qui génère du code sur demande, la valeur du contexte intégré à la source se cumule. Chaque annotation écrite aujourd'hui devient un contexte sur lequel une future modification assistée par IA pourra raisonner. La documentation cesse d'être un exercice de conformité et devient de l'infrastructure.

Les briques de base sont en place. Le format le permet. L'outillage existe. Ce qui reste, c'est la décision de traiter la documentation comme faisant partie du workflow de développement, plutôt que comme quelque chose qui arrive après la livraison du rapport.

---

**Prochaines étapes :**

- Votez pour l'idée [Add Description field for Bookmarks in Power BI Desktop and PBIR Format](https://community.fabric.microsoft.com/t5/Fabric-Ideas/Add-Description-field-for-Bookmarks-in-Power-BI-Desktop-and-PBIR/idi-p/4818843#M163577) sur la communauté Fabric
- Essayez le skill `pbir-documentation` sur un rapport que vous possédez
- Partagez vos découvertes en commentaires

**Pour toute question ou commentaire à propos de cet article, contactez :** Alexandru BADIU

**Si vous avez trouvé cet article utile, merci de :**
- Partager cet article avec votre équipe Power BI
- Suivre le travail de Greg et le mien sur [GitHub](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation)
