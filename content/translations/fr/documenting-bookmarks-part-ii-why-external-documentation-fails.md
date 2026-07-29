---
title: "Documenter les Bookmarks (partie II) - Pourquoi la documentation externe échoue"
date: 2026-01-18
tag: "PBIR"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/ab6cf365-ac39-4d05-aac1-01b14907da67"
excerpt: "> [!NOTE] >TL;DR : L'article 21 montrait comment extraire les détails techniques des bookmarks via l'IA, mais laissait le problème de justification métier non résolu. La documentation externe..."
sourceFile: "23 - Documenting Bookmarks (part II) - Why External Documentation Fails.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/23%20-%20Documenting%20Bookmarks%20(part%20II)%20-%20Why%20External%20Documentation%20Fails.md"
enSlug: "documenting-bookmarks-part-ii-why-external-documentation-fails"
---

<br>
<br>

# Documentation des Bookmarks Power BI (Partie II) : Pourquoi la documentation externe échoue

<br>

> [!NOTE]  
>**TL;DR** : L'article 21 montrait comment extraire les détails techniques des bookmarks à l'aide de l'IA, mais laissait le problème de la justification métier non résolu. La documentation externe ne passe pas à l'échelle, elle exige trop de discipline, produit une qualité inégale, et reste déconnectée des outils utilisés par les assistants IA. Cet article identifie trois problèmes critiques de scalabilité qui rendent la documentation externe impraticable pour les équipes. La partie III présentera la solution : les annotations PBIR + les Claude Skills.
>

---

Dans mon [précédent article sur la documentation des bookmarks Power BI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/21%20-%20Documenting%20Bookmarks%20with%20PBIR.md), j'ai partagé des découvertes importantes sur le fonctionnement réel des bookmarks et sur la manière d'extraire une documentation technique à partir des fichiers JSON PBIR des bookmarks en utilisant l'IA avec un prompt bien conçu.

<br>

**Mais je n'avais pas proposé de solution scalable pour la partie la plus difficile à documenter.**
<br>

À la fin de cet article, j'écrivais :

> [!NOTE] 
> « Ce qui me manque ici, c'est le **pourquoi**. C'est au-delà de la partie technique. C'est comprendre le problème que nous devons résoudre et l'approche que nous avons décidé d'adopter. »

<br>

**J'avais bien proposé une amélioration** dont je pense qu'elle pourrait résoudre ce problème de façon permanente, et pas seulement pour les bookmarks, mais pour n'importe quel visuel dans Power BI. Cette approche pourrait apporter une valeur immense non seulement à la documentation elle-même, mais aussi fournir le contexte nécessaire pour que l'IA délivre des réponses de meilleure qualité lorsqu'elle travaille avec des modèles sémantiques.
<br>

> [!NOTE] 
> **Lorsqu'on utilise les bookmarks, on ne stocke un champ de description nulle part.** Je pense que cela représente une opportunité phénoménale de créer ce type de champ lors de la génération des bookmarks depuis l'interface de Power BI Desktop, et de stocker cette définition dans le PBIR. Bien que cela nécessiterait toujours une saisie manuelle, cette documentation serait créée directement dans le système source, ce qui constitue le meilleur type de documentation et le plus accessible. **J'ai soumis une idée Power BI ici** : [Add Description field for Bookmarks in Power BI Desktop and PBIR Format](https://community.fabric.microsoft.com/t5/Fabric-Ideas/Add-Description-field-for-Bookmarks-in-Power-BI-Desktop-and-PBIR/idi-p/4818843#M163577). Si ce concept vous parle, merci de voter.

<br>

J'ai soumis cette idée, mais malheureusement elle n'a pas rencontré le succès que j'espérais.

Si vous lisez ce blog et que cette idée vous parle, **merci de voter pour elle**. C'est le type d'amélioration dont Power BI a besoin. Ce n'est peut-être pas spectaculaire, ni « révolutionnaire », mais cela améliorerait significativement la maturité et la qualité des solutions Power BI.

Mon intuition pour les années à venir, avec la montée de l'IA :
<br>

> [!TIP] 
> **À l'ère de l'IA, la planification, l'organisation, le respect de frameworks éprouvés et la documentation jouent un rôle critique.**

<br>
Si vous ne progressez pas sur la documentation, vous ne réussirez pas à tirer parti de l'IA.
<br>
En attendant, je recommandais de créer une documentation séparée manuellement, comme un fichier markdown, où vous documenteriez le contexte métier que l'IA ne pouvait pas extraire du JSON.
<br>
<br>

**Cette recommandation était correcte. Mais incomplète.**
<br>

Faisons un récapitulatif de ce que j'ai écrit dans le précédent article et construisons dessus.
<br><br>

## Ce que l'article 21 a résolu (et ce qu'il n'a pas résolu)

### Extraction technique réussie
<br>

Le prompt IA de l'article 21 nous a donné une excellente extraction technique à partir du JSON PBIR :
<br>

✅ **Métadonnées du bookmark** - Nom, appartenance à un groupe, paramètres (Data/Display/Current Page)  
✅ **Mappages des visuels** - Quels visuels sont affectés, leurs états de visibilité  
✅ **Analyse des filtres** - Filtres au niveau du rapport et au niveau du visuel, avec les valeurs  
✅ **Comportement d'état** - Ce que le bookmark fait techniquement  
✅ **Découverte de mécaniques cachées** - La révélation « Tous les visuels » vs « Visuels sélectionnés »
<br>
<br>

Pour les exemples de bookmark « FocusSpecific » présentés, nous avons obtenu une documentation technique complète : identifiants visuels associés à leurs noms, états de filtre pour chaque visuel, sélections de surbrillance, et analyse comportementale complète.

**C'était précieux.** Nettement mieux que de n'avoir aucune documentation ou d'essayer de rétro-ingénierer le comportement des bookmarks à partir de l'interface Power BI seule.

### La découverte clé de l'article 21

Rappelez-vous ce que nous avons appris sur la portée des bookmarks :

- **Véritable « Tous les visuels »** : l'absence de la propriété `targetVisualNames` dans le JSON affecte tous les visuels actuels **ET** futurs
- **« Visuels sélectionnés »** : la présence de la propriété `targetVisualNames` **n'affecte que les visuels listés**, même si vous aviez sélectionné tous les visuels actuels lors de sa création

Cette découverte à elle seule justifiait l'approche d'analyse du JSON PBIR. L'interface Power BI peut être trompeuse quant au comportement réel des bookmarks.

### Ce que l'article 21 a laissé non résolu

L'IA ne peut pas répondre uniquement à partir du JSON :

- **Avons-nous créé ce comportement de bookmark intentionnellement ?**
- **Faisait-il partie de la Definition of Done ?**
- **Pourquoi avons-nous créé ce bookmark en premier lieu ?**
- **Quand a-t-il été créé, quel problème était-il censé résoudre ?**
- **D'autres solutions avaient-elles été envisagées ?**
- **A-t-il été validé formellement ?**
- **Où puis-je trouver la documentation de la demande ou de la Definition of Done ?**

<br>
Ma solution dans l'article 21 était :

> [!NOTE] 
> « Créer une documentation séparée pour le « pourquoi » en dehors de Power BI (feuille Excel, fichier markdown, etc.) où vous ajoutez manuellement des descriptions pour chaque bookmark. »

<br>

**C'est là que les problèmes ont commencé.**
## Les trois problèmes de scalabilité que j'ai découverts

Après avoir recommandé dans l'article 21 que les équipes « créent une documentation séparée pour le pourquoi en dehors de Power BI », j'ai essayé d'apprendre cette technique à d'autres développeurs et j'ai demandé leur retour. J'ai appris que si l'idée est intéressante, elle pouvait être difficile à standardiser et à faire passer à l'échelle au-delà de mon propre travail.

<img width="1213" height="1035" alt="Pasted image 20260114073122" src="https://github.com/user-attachments/assets/08708d57-aee3-4118-b2f6-c5353f104d74" />

### **Problème 1 : Scalabilité - Trop de choses à retenir**

Le processus fonctionnait bien... pour moi. Parce que c'est moi qui l'avais créé. Je savais :

- Quelles questions poser
- Quel niveau de détail capturer
- Comment structurer la documentation
- Où sauvegarder les différentes informations
  <br>

**Mais quand j'ai essayé de transmettre cela à d'autres développeurs :**
<br>

« Donc je dois :
<br>

1. **Lancer le prompt IA** pour extraire les détails techniques
2. **Me souvenir de créer** le fichier de contexte, tableur ou markdown
3. **Le sauvegarder** au bon endroit
4. **Remplir toutes les questions** que vous avez mentionnées
5. Me souvenir de **le garder à jour** quand les bookmarks changent
6. M'assurer que l'extraction JSON et mes notes **restent synchronisées** ?
<br>

Ça fait beaucoup de choses à retenir. Peux-tu écrire le processus exact ? »
<br>

**J'avais créé une documentation _sur_ le processus de documentation. Puis les développeurs devaient se référer à cette documentation _pendant_ qu'ils documentaient.**
<br>

**Voici le problème de scalabilité :** un processus qui exige de se souvenir de plusieurs étapes, de sauvegarder des scripts, de garder des notes disponibles, et de suivre un workflow spécifique ne passera pas facilement à l'échelle au-delà de la personne qui l'a créé. C'est simplement trop de travail, trop de discipline.

> [!NOTE] 
> **Il est difficile de faire suivre son propre processus par d'autres lorsque ce processus implique de trop nombreuses choses à retenir.**

<br><br>

### **Problème 2 : Standardisation - Justification métier incohérente**

Même lorsque les développeurs suivaient le processus, la qualité variait considérablement.

**La documentation du développeur A pouvait ressembler à ceci :**

```
Bookmark: FocusSpecific
Purpose: Shows focused view for analysis
```

**La documentation du développeur B pouvait ressembler à ceci :**

```
Bookmark: FocusSpecific

Business Purpose: Enable sales managers to investigate specific regions when 
unusual performance patterns are detected during monthly review meetings. This 
supports the quarterly planning process by providing quick access to regional 
detail without losing position in the overall workflow.

Created: 2024-07-15
Requested by: Sales Operations team
Approved by: Head of Sales Analytics
Related to: JIRA-1234 - Regional Analysis Enhancement
Alternatives Considered: Drill-through page (rejected due to filter context loss)
```

**Même bookmark. Qualité de documentation radicalement différente.**

**Le problème :** certains développeurs n'accordent pas la même importance à la justification métier. Ils restent trop généraux ou l'expliquent en quelques mots seulement. Ils pensent que « affiche une vue focalisée » est suffisant, car c'est techniquement exact.

**Et ils n'ont pas tort de leur point de vue.** Si vous construisez le rapport, vous connaissez le contexte. La documentation semble redondante. La justification métier paraît évidente.

**Ce que je me suis retrouvé à faire :** suivre les développeurs, vérifier leur documentation, demander plus de détails, expliquer pourquoi nous avons besoin de contexte métier, et pas seulement d'une description technique.

**Cela ne passe pas à l'échelle.** Je ne peux pas être le point de contrôle qualité pour chaque bookmark, dans chaque rapport, sur chaque projet.

> [!NOTE] 
> **Le problème d'uniformité et de standardisation :** sans application structurée, la qualité de la documentation dépend entièrement du jugement individuel et de la discipline de chaque développeur. Et le jugement individuel varie énormément.

<br><br>

### **Problème 3 : La documentation doit vivre dans l'outil**

C'est la constatation la plus importante, et il m'a fallu trop de temps pour en comprendre toutes les raisons.

**Ce que je pensais initialement :** « La documentation des éléments visuels comme les bookmarks, les calculs visuels, dans un fichier Excel/markdown séparé, c'est très bien. Les développeurs peuvent s'y référer au besoin. »

**Ce que j'avais raté :** nous nous dirigeons vers le développement assisté par IA. Et le développement assisté par IA change _où_ la documentation doit vivre.

**Voici un scénario pour bien illustrer cela :**

Je travaille dans VS Code avec Claude Code sur un rapport Power BI. Je demande :

```
"Claude, I need to modify the FocusSpecific bookmark to also reset 
the product category slicer. What's the impact?"
```

**Sans la justification métier, voici la réponse qu'on pourrait obtenir (dans l'idéal) :**

```
Claude: "I can see the technical structure of FocusSpecific in the JSON. 
It currently affects the Gender slicer and Clustered Bar Chart. 

To understand the full impact, I'd need to know:
- What's the business purpose of this bookmark?
- Why were only those specific visuals included?
- Are there other bookmarks that depend on the current behavior?

Do you have this context documented somewhere?"
```

Il me faut alors :

1. **Trouver** le fichier Excel ou markdown
2. **Rechercher** le bookmark
3. **Lire** le contexte
4. M'assurer que la **documentation est à jour**
5. **Copier/coller** cela dans Claude
6. Claude analyse avec ce contexte
7. J'obtiens ma réponse

**Avec la documentation à l'intérieur même de l'outil, Claude peut fournir cette réponse :**

```
Claude: "I can see FocusSpecific is designed to 'enable sales managers to 
investigate specific regions during monthly review meetings.' 

Looking at the annotations and referenced markdown files, this bookmark is part of a navigation flow:
Overview → FocusSpecific → DetailView

The Gender slicer and Clustered Bar Chart were specifically chosen because 
they need to reset to a clean state for focused analysis, while other visuals 
provide context and should stay.

Adding product category slicer reset would impact:
1. User workflow: Currently product context persists through focus → detail flow
2. Related bookmarks: DetailView expects product filter to be maintained
3. Business logic: Per annotations, Sales Ops requested this specific behavior

Recommendation: Before making this change, verify with Sales Ops whether 
product context should persist or reset. The current design appears intentional."
```
<br>

> [!IMPORTANT]   
>**La différence est spectaculaire.**

<br>

**Lorsque la documentation vit dans l'outil :**
<br>

- L'IA peut la lire **sans que j'aie besoin de fournir un contexte supplémentaire**
- L'IA **comprend non seulement _ce que_ fait le bookmark, mais aussi _pourquoi_**
- L'IA peut **évaluer l'impact des changements** au regard de l'intention métier
- L'IA peut **m'avertir lorsque des modifications entrent en conflit** avec l'objectif documenté
<br>

## Ce que ces trois problèmes ont révélé
<br>

En examinant ces trois problèmes ensemble, la solution est devenue claire :
<br>

**Le processus doit :**
<br>

1. **Exiger un effort minimal** - Un workflow guidé, pas des étapes mémorisées
2. **Imposer l'uniformité** - Des questions structurées, pas une documentation libre
3. **Vivre dans la source** - Des annotations PBIR aussi, pas seulement des fichiers externes

<br>

**C'est pourquoi les Claude Skills + Claude Code sont devenus la réponse :**
<br>

- **Scalabilité** : les développeurs peuvent simplement invoquer une skill (dans mon cas `@pbir-documentation`), et la Skill les guide à travers le processus complet
- **Uniformité** : les mêmes questions structurées pour tout le monde, le même format de sortie
- **Prêt pour l'IA** : documentation intégrée dans le PBIR, où l'IA peut en tirer parti

<br>

**Pas « essayer de se souvenir de mon processus ».**  
**Pas « espérer que les développeurs documentent de façon cohérente ».**  
**Pas « maintenir des fichiers de documentation séparés ».**
<br>

> [!IMPORTANT]  
> **Résultat : un framework qui vous accompagne, vous guide à travers une capture structurée, et produit directement une sortie dans le système source.**
<br>

Mais attendez, comment peut-on documenter dans l'outil alors que je viens de dire que cette fonctionnalité n'existe pas dans Power BI ?
<br>

> [!IMPORTANT]
>  Bien qu'il ne soit pas possible de documenter au sein de l'interface existante de Power BI, **IL EST POSSIBLE** de tirer parti des **annotations à l'intérieur du format PBIR** !
<br>

Et cela change beaucoup de choses.
<br>
### Pourquoi cela mérite votre attention maintenant
<br>

Il ne s'agit pas seulement d'améliorations incrémentales de la documentation. **Le format sous-jacent et l'outillage sont déjà en train de changer.**

À partir de **janvier 2026**, le PBIR devient le format par défaut dans Power BI :
<br>

- Tous les nouveaux rapports créés dans le service Power BI utilisent le PBIR
- Les rapports existants sont convertis au format PBIR lors de leur modification et enregistrement
<br>

Dans le même temps, **VS Code, Git, et GitHub/Azure DevOps deviennent l'environnement standard** pour le développement professionnel de Power BI.
<br>

Fait important, **vous n'êtes pas _obligé_ de travailler activement avec le PBIR**. Vous pouvez continuer à utiliser Power BI Desktop et les fichiers PBIX comme avant.
<br>

Cependant, ce choix a des conséquences.
<br>

**Ce qui change de toute façon :**
<br>

- Vos rapports sont stockés au format PBIR dans tous les cas
- Les capacités sous-jacentes sont présentes, même si vous ne les exposez pas ou ne les utilisez pas
- Les outils IA opèrent de plus en plus sur ces artefacts au niveau du code
<br>

**Ce que vous manquez en les ignorant :**
<br>

- Des annotations structurées que l'IA peut lire et sur lesquelles elle peut raisonner
- Une documentation intégrée qui évolue avec le rapport
- Un contexte versionné expliquant _pourquoi_ les décisions ont été prises

<br>

### L'écart de productivité qui émerge
<br>

Les équipes qui adoptent les workflows PBIP/PBIR et l'outillage assisté par IA commencent à observer des **effets multiplicatifs dans le temps**, en particulier sur :
<br>

- La couverture et la cohérence de la documentation
- L'analyse d'impact des changements
- L'onboarding et la maintenabilité
- La qualité des décisions lors de la modification de rapports existants

<br>

Il ne s'agit pas d'une « productivité x10 » instantanée.  
Il s'agit d'**avantages qui s'accumulent** à mesure que l'IA peut de plus en plus assister l'analyse, le refactoring et la gouvernance **_parce que le contexte est disponible dans les artefacts source_**.
<br>

**Coût d'opportunité dans le temps :**
<br>

- Annotations PBIR : *disponibles mais inutilisées*
- Agents IA : *capables, mais aveugles au contexte*
- Contrôle de version : *présent, mais sous-exploité*
- Intention métier : *connue des personnes, invisible pour les outils*

<br>

### Deux voies raisonnables à suivre
<br>

La plupart des équipes se situeront naturellement quelque part sur un spectre, mais de façon générale :
<br>

1. **Maintenir les pratiques actuelles**  
    Continuer à travailler principalement dans Power BI Desktop, s'appuyer sur la documentation externe, et adopter progressivement les nouveaux outils selon les besoins.

<br>

2. **Adopter intentionnellement les workflows PBIP/PBIR**  
    Apprendre comment fonctionne le PBIR, introduire des pratiques de documentation dans la source, et activer le développement assisté par IA de façon contrôlée et délibérée.

<br>

Il ne s'agit pas d'être « forcé » versus « résister au changement ».  
Il s'agit de choisir de **révéler et d'exploiter des capacités qui existent déjà**.
<br>

> [!WARNING]
>  Les équipes qui ne s'adaptent pas auront de plus en plus de mal à suivre le rythme et à maintenir leurs rapports, même si l'écart n'est pas immédiatement visible.

<br>

## Le développement BI assisté par IA n'est plus théorique

Plusieurs évolutions survenues ces derniers mois pointent dans la même direction :
<br>

**Novembre 2025 – Microsoft Ignite**
<br>

- Introduction du **Power BI Modeling MCP Server**
- Des voies d'intégration IA officielles, quoique précoces, pour les modèles sémantiques Power BI
- Les outils IA peuvent inspecter et interagir avec les artefacts Power BI dans des conditions contrôlées

<br>

**Décembre 2025**
<br>

- Anthropic a introduit les **Claude Skills** comme standard ouvert
- OpenAI a adopté des schémas similaires pour **Codex CLI**
- Des workflows IA réutilisables et structurés deviennent portables d'un environnement à l'autre

<br>

**Janvier 2026**
<br>

- Le PBIR devient le format de rapport par défaut
- Les artefacts Power BI orientés code deviennent la norme, plutôt que l'exception

<br>

Pris ensemble, les **briques de base sont désormais en place** :
<br>

- Des artefacts adaptés au code (PBIR / PBIP)
- Un accès au niveau des outils (MCP)
- Des workflows IA portables (Agent Skills)

<br>

Ce qui reste, ce n'est pas la technologie, mais **la gouvernance, les conventions et les pratiques d'équipe**.
<br>

Ce changement est déjà en cours. La communauté Power BI ne fait que commencer à s'y adapter.
<br>

---
<br>

## Ce que cela signifie pour votre carrière
<br>

Au cours des 12 à 18 prochains mois, la différence entre développeurs Power BI se jouera de plus en plus sur **la manière dont ils travaillent**, pas seulement sur ce qu'ils construisent.
<br>

Certains vont :
<br>

- Utiliser l'IA comme un véritable partenaire de développement
- Maintenir des solutions riches en contexte et évolutives
- Construire des systèmes réutilisables qui s'améliorent avec le temps

<br>

D'autres vont :
<br>

- S'appuyer principalement sur des workflows manuels
- Peiner à raisonner sur les rapports hérités
- Passer plus de temps à maintenir qu'à faire évoluer les solutions

<br>

Les compétences qui permettent la première voie : **la maîtrise du PBIR, la documentation dans la source, les workflows assistés par IA**, ne sont pas de niche. Elles sont en passe de devenir des **attentes de base**.
<br>

Les apprendre tôt ne fait pas de vous quelqu'un de radical.  
Cela fait de vous quelqu'un de préparé.
<br>

### Le retour sur investissement est concret, pas théorique
<br>

Même sans automatisation complète par l'IA, **la documentation intégrée à l'outil apporte déjà des retours tangibles**, principalement en réduisant les frictions, le retravail et l'incertitude.
<br>

**Bénéfices observés en pratique :**
<br>

**Temps & effort**
<br>

- Les annotations PBIR structurées réduisent considérablement le coût de documentation des bookmarks
- Les développeurs passent quelques minutes à capturer l'intention _une seule fois_, au lieu de la redécouvrir sans cesse plus tard
- Les étapes de documentation manuelle (fichiers séparés, changements de contexte, synchronisation) disparaissent largement

<br>

> [!TIP]
> **La documentation passe du statut de « travail supplémentaire » à celui de partie intégrante du flux de développement.**
<br>
---
<br>

**Qualité & couverture**
<br>

- La couverture de la documentation augmente significativement car la capture est guidée et intégrée
- La production devient cohérente d'un développeur à l'autre, quel que soit son niveau d'expérience
- L'intention métier est préservée aux côtés de la définition technique
<br>
---
<br>

**Impact opérationnel**
<br>

- Des changements plus rapides et plus sûrs sur les rapports existants
- Un temps d'onboarding réduit pour les nouveaux membres de l'équipe
- Moins de régressions causées par des bookmarks mal compris
- Une assistance IA plus fiable car l'intention est visible
<br>

Ces bénéfices **s'accumulent dans le temps** :
<br>

- Chaque bookmark documenté réduit l'effort d'investigation futur
- Chaque annotation améliore la capacité de l'IA à raisonner sur l'impact
- Chaque rapport devient plus facile à faire évoluer plutôt qu'à réécrire

<br>

> [!IMPORTANT]
>Le véritable retour n'est pas seulement le temps gagné aujourd'hui, mais **l'effort de maintenance évité demain**.

<br>

---
<br>

### Pourquoi cela compte à long terme
<br>

À mesure que l'IA s'intègre davantage dans les workflows de développement Power BI, **les solutions dotées d'un contexte intégré en bénéficieront de façon disproportionnée** :
<br>

- L'IA peut expliquer, avertir et suggérer, pas seulement générer
- Les équipes passent moins de temps à réapprendre d'anciennes décisions
- L'architecture devient plus intentionnelle, moins accidentelle

<br>

Il ne s'agit pas de courir après des gains de productivité à court terme.  
Il s'agit de **construire des systèmes qui passent à l'échelle avec les personnes, l'outillage et le temps**.
<br>

## Conclusion
<br>

J'ai identifié trois problèmes fondamentaux liés à la documentation externe des bookmarks Power BI :
<br>

1. **Scalabilité** – Les processus qui reposent sur la mémoire, la discipline et des étapes manuelles ne passent pas à l'échelle au sein des équipes
2. **Standardisation** – La qualité de la documentation varie fortement selon le jugement individuel
3. **Visibilité pour l'IA** – Les fichiers externes restent invisibles pour les outils de plus en plus utilisés pour construire et faire évoluer les solutions

<br>

Ce ne sont pas des désagréments mineurs.  
Ce sont des **limitations structurelles** qui empêchent la documentation de passer à l'échelle au-delà des développeurs individuels.
<br>

Les approches traditionnelles comme les tableurs, les fichiers markdown, les dossiers partagés peuvent encore fonctionner dans certains contextes :
<br>

- Petites équipes
- Complexité limitée des rapports
- Implication minimale de l'IA
- Documentation traitée comme une activité purement humaine
<br>

Cependant, ces hypothèses deviennent de plus en plus difficiles à maintenir.
<br>

Power BI évolue vers des **artefacts basés sur le code**, le **contrôle de version**, et le **développement assisté par IA**. À mesure que cela se produit, la documentation qui vit _en dehors_ du système devient plus difficile à maintenir, plus difficile à croire, et plus difficile à utiliser efficacement, tant pour les humains que pour l'IA.
<br>

La question n'est plus de savoir si la documentation compte.  
C'est de savoir **où elle doit vivre et comment elle doit être capturée**.
<br>

Dans la **partie III**, je détaillerai une solution concrète utilisant les **annotations PBIR combinées aux Claude Skills**, notamment :
<br>

- Comment fonctionnent les annotations dans le PBIR et pourquoi elles sont particulièrement adaptées à ce problème
- Un framework de documentation guidé qui impose la cohérence sans dépendre de la discipline
- Des structures d'annotations réelles et des exemples
- Des conseils pratiques pour introduire cette approche dans une équipe

<br>
Les problèmes sont désormais clairs.  
L'outillage est disponible.  
Ce qui reste, c'est d'adopter des pratiques alignées sur la façon dont le développement Power BI évolue réellement.
<br>

**Construisons quelque chose qui passe à l'échelle.**

<br>

---
<br>

**Suite** : [Partie III : La solution - Annotations PBIR + Claude Skills](link-to-part-3)

<br>
---
<br>

**Pour toute question ou commentaire sur cet article, contactez :** Alexandru BADIU
<br>
**Si vous avez trouvé cet article utile, merci de :**
<br>

- Voter pour l'[idée de champ de description des bookmarks](https://community.fabric.microsoft.com/t5/Fabric-Ideas/Add-Description-field-for-Bookmarks-in-Power-BI-Desktop-and-PBIR/idi-p/4818843#M163577)
- Partager cet article avec votre équipe Power BI
- Suivre mon travail sur [GitHub](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation)
