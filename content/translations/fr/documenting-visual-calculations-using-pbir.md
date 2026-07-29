---
title: "Documenter les Visual Calculations avec PBIR"
date: 2025-09-17
tag: "PBIR"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/f26f8d5c-b327-478a-b440-c1254b119780"
excerpt: "Les Visual Calculations de Power BI changent notre approche de l'analytique dans les rapports. Simples et performantes, elles posent un nouveau défi de documentation."
sourceFile: "22 - Documenting Visual Calculations using PBIR.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/22%20-%20Documenting%20Visual%20Calculations%20using%20PBIR.md"
enSlug: "documenting-visual-calculations-using-pbir"
---

Les Visual Calculations de Power BI représentent un changement important dans notre façon d'aborder l'analytique au sein des rapports. Bien qu'elles offrent une simplicité et des gains de performance incroyables, elles introduisent un nouveau défi : **la visibilité et la documentation**. Contrairement aux mesures DAX traditionnelles qui apparaissent dans les métadonnées du modèle, les Visual Calculations sont cachées à l'intérieur de visuels individuels, ce qui les rend difficiles à inventorier, à comprendre et à maintenir à grande échelle.

Dans cet article, je vais vous montrer **comment exploiter les fichiers JSON PBIR et l'assistance de l'IA pour extraire et documenter automatiquement les Visual Calculations**, et partager des enseignements importants sur leur valeur stratégique pour les développeurs Power BI professionnels.

_Vous devez d'abord activer PBIR dans les fonctionnalités d'aperçu de Power BI Desktop : allez dans **Fichier** > **Options et paramètres** > **Options** > **Fonctionnalités en préversion** et cochez la case en regard de **« Enregistrer les rapports en utilisant le format de métadonnées enrichi (PBIR) »**._

## Que sont les Visual Calculations ?

Les Visual Calculations sont essentiellement des **calculs qui vivent à l'intérieur de vos graphiques** plutôt que dans votre modèle de données.

**Méthode traditionnelle :** Vous créez une mesure dans votre modèle, puis vous l'utilisez dans des visuels.
**Méthode des Visual Calculations :** Vous créez le calcul directement dans le visuel lui-même, et vous ne pouvez pas l'utiliser dans d'autres visuels.

### Quand ont-elles été ajoutées ?

- **Février 2024 :** Publiées comme fonctionnalité en préversion
- **Septembre 2024 :** Activées par défaut (l'activation en préversion n'est plus nécessaire)
- **Toujours en évolution :** Microsoft continue d'ajouter de nouvelles fonctionnalités

### Quelle est la valeur ajoutée ?

#### 1. Simplicité

```dax
// Traditional measure (complex)
Running Total = 
CALCULATE(
    SUM(Sales[Amount]),
    FILTER(
        ALLSELECTED(Date),
        Date[Date] <= MAX(Date[Date])
    )
)

// Visual calculation (simple)
Running Total = RUNNINGSUM([Sales Amount])
```

#### 2. Performance

- **Plus rapide :** Fonctionne sur des données déjà agrégées
- **Plus léger :** N'alourdit pas votre modèle
- **Efficace :** Pas de contexte de filtre complexe à résoudre

#### 3. Sensible au contexte

- S'adapte automatiquement aux données présentes dans votre visuel
- Pas besoin de se soucier de contextes de filtre DAX complexes
- « Ce que vous voyez est ce que vous calculez »

## Pourquoi les développeurs PBI professionnels devraient-ils les utiliser ?

#### ❌ Idée reçue courante

_« Les Visual Calculations, c'est juste pour les débutants qui ne savent pas écrire du DAX »_

#### 1. Grande flexibilité et potentiel de meilleures performances

#### 2. Conception de modèle plus propre

#### 3. Opportunités de création de modèles réutilisables

L'un des aspects les plus intéressants des Visual Calculations est qu'avec le format PBIR, vous pouvez créer des **modèles de visuels réutilisables** avec des calculs préconstruits. Grâce à [l'approche innovante d'Injae Park](https://www.linkedin.com/posts/injae-park_powerbi-dataanalysis-businessintelligence-activity-7308758404972318721-NAkB), on peut voir comment les Visual Calculations peuvent être modélisées autour d'une seule mesure « Value », les rendant incroyablement réutilisables.
<br><br>

> [!IMPORTANT]
> Cela signifie que vous pourriez potentiellement constituer toute une bibliothèque de visuels entièrement personnalisés que vous pourriez réutiliser dans de nouveaux rapports et ainsi augmenter votre vélocité de développement.

![](https://media.licdn.com/dms/image/v2/D4D22AQEiRO0TaUQ58g/feedshare-shrink_800/B4DZW3tBi9HIAg-/0/1742543792492?e=1760572800&v=beta&t=z-3OxsxTkPZzcn8R3RsOi6M2AdI_xDmmhYEuQs0usRM)

## Le défi de la documentation

**Voici le problème :** les Visual Calculations ne sont pas comme les mesures DAX.

Elles :

- N'apparaissent pas dans INFO.MEASURES
- Ne sont pas faciles à identifier sans cliquer sur des visuels spécifiques
- Sont bien cachées et peuvent rapidement devenir un cauchemar à documenter et à maintenir
- **N'ont aucun champ de description intégré**

**C'est un angle mort important**, car dans les environnements d'entreprise, des Visual Calculations non documentées peuvent devenir une dette technique difficile à suivre et à maintenir.

### Mon flux de travail de documentation

Pour cette démonstration, j'ai utilisé une excellente Visual Calculation en cascade (waterfall) inspirée par [la publication LinkedIn de Fowmy Abdulmuttalib](https://www.linkedin.com/posts/fowmy_powerbi-dax-dataviz-activity-7315684557419134977-xoI7) et par [la vidéo explicative d'Injae](https://youtu.be/Tg-q69DQsuM?si=2ziOv_0uAjKGGEDL).

J'ai choisi cette Visual Calculation car je pense qu'elle offre plusieurs avantages clés par rapport aux états financiers tabulaires traditionnels, comme :

- **Reconnaissance de motifs et compréhension du flux améliorées :**
Le format en graphique à barres horizontales rend immédiatement évident quels revenus sont les plus importants et quelles catégories de dépenses consomment le plus de ressources. De plus, la mise en page guide naturellement le regard (principe gestaltiste de continuité).

- **Comparaison de performance intuitive :**
Les colonnes côte à côte pour l'année précédente et l'année en cours, avec des indicateurs d'écart, permettent une évaluation rapide de la performance d'une année sur l'autre. Le codage couleur fournit un retour visuel instantané.

- **Communication améliorée :**
Ce format rend l'information financière accessible aux parties prenantes non financières qui pourraient avoir du mal avec les états financiers traditionnels

Enfin, je trouve très intéressante la combinaison de la précision numérique et de la clarté visuelle pour rendre l'information financière plus exploitable et plus digeste.

<img width="814" height="417" alt="Pasted image 20250910114822" src="https://github.com/user-attachments/assets/487832f7-e0bf-48fd-8a3f-a15f84176238" />

<br><br><br>

Voici une procédure qui peut être utilisée pour documenter les Visual Calculations :
#### Étape 1 : Enregistrez votre rapport au format PBIP

Après avoir créé vos Visual Calculations dans Power BI Desktop, enregistrez le rapport au format PBIP dans un dossier dédié.

#### Étape 2 : Identifiez les visuels contenant des Visual Calculations

L'une des premières étapes consiste à **identifier quels visuels contiennent des Visual Calculations**, afin de savoir lesquels nécessitent une documentation de leurs formules et de leur logique sous-jacentes.

Dans Visual Studio Code, ajoutez l'ensemble du rapport au contexte de votre chat et utilisez ce prompt : <br>

<img width="275" height="335" alt="Pasted image 20250910121509" src="https://github.com/user-attachments/assets/b2455be9-9b43-4875-a5fc-0422fd6dc8a1" />

```
Scan all pages and identify which visuals contain visual calculations
```

Cela vous donne un inventaire complet de l'ensemble de votre rapport.

<img width="443" height="212" alt="Pasted image 20250910121556" src="https://github.com/user-attachments/assets/cd0398f0-ab51-41b3-ba0f-6182eeb52db5" />

<br><br>
Comme bonne pratique, il est fortement recommandé de vous familiariser avec les différentes propriétés à votre disposition.
<img width="1270" height="676" alt="Pasted image 20250910114058" src="https://github.com/user-attachments/assets/76b77965-285c-40b0-87ff-fd245178ae46" />

>**Astuce**
> Méthode rapide pour identifier le nom technique d'un visuel lors de la création de documentation.

Allez dans **Fichier > Options et paramètres > Paramètres du rapport > Objets du rapport** et activez le paramètre _Copier les noms d'objets lors d'un clic droit sur les objets du rapport_. Cela ne doit être fait qu'une seule fois.
<img width="867" height="685" alt="Pasted image 20250913162954" src="https://github.com/user-attachments/assets/5c521dea-a5e0-428a-91c3-0138c0633f34" />

Faites un clic droit sur n'importe quel objet du rapport et sélectionnez _Copier le nom de l'objet_.

![](https://learn.microsoft.com/en-us/power-bi/developer/projects/media/projects-report/copy-object-name.png)

Une fois le nom de l'objet copié dans votre presse-papiers, vous pouvez facilement le saisir dans la barre de recherche de l'Explorateur Windows ou de Visual Studio Code pour localiser ou identifier l'objet dans le dossier PBIR.

![](https://learn.microsoft.com/en-us/power-bi/developer/projects/media/projects-report/search-object-name.png)

#### Étape 3 : Documentez les visuels individuellement

Pour chaque visuel contenant des Visual Calculations, **ajoutez le fichier JSON du visuel spécifique au contexte de votre chat** et utilisez ce prompt complet :

<img width="522" height="667" alt="Pasted image 20250913163636" src="https://github.com/user-attachments/assets/eae744b7-653f-49f8-9c73-0bea8aacb7b5" />

<br><br>

``` PROMPT

Analyze the Power BI Report (PBIR) JSON file and provide documentation in this concise format:
Visual Overview

Visual Type: [visualType from JSON]
Visual Name: [name from JSON]

Visual Calculations

For each NativeVisualCalculation found, document:
[Calculation Name]
Formula:
dax[Formatted DAX code with line breaks and comments]

Description: [Brief explanation of what this calculation does]

Measure References: [List any measures referenced like [CY], [PY], etc.]

Conditional Formatting: [Any fontColor or other formatting applied - Yes/No and details]

Hidden: [true/false based on hidden property]

Column Alignment: [Left/Right/Center/Auto from columnFormatting]

Instructions:

Extract visualType and name from the root level
Extract visual title from visualContainerObjects.title.properties.text if it exists
Find all NativeVisualCalculation entries in the query projections
Format DAX code with proper indentation and brief inline comments
List referenced measures in square brackets [MeasureName]
Check objects.values for conditional formatting rules matching each calculation
Check for hidden: true property
Extract alignment from objects.columnFormatting matching the calculation's metadata
Keep descriptions to 1-2 sentences maximum

Provide clean, scannable output focusing on the essential technical details.

Make sure to format the formulas
````

### Documentation générée par l'IA à partir du prompt

#### Vue d'ensemble du visuel

**Type de visuel :** pivotTable
**Nom du visuel :** a945e79d30de01db7cd6
**Titre du visuel :** MyName

---

#### Visual Calculations

##### Waterfall

**Formule :**
````dax
VAR _A = ABS([CY]) / 15
// Calculate scaled absolute value of CY

VAR _B = ABS(RUNNINGSUM([CY]) - [CY]) / 15
// Calculate scaled difference between running sum and CY

VAR _C = IF([CY] > 0, _B, ABS(RUNNINGSUM([CY])) / 15)
// Choose _B if CY positive, else scaled running sum

VAR _D =
    SWITCH(
        TRUE(),
        ISINSCOPE([Category]), 
            REPT(UNICHAR(8202), _C) & REPT(UNICHAR(9608), ABS(_A)),
        ISINSCOPE([Total]), 
            REPT(UNICHAR(9608), RUNNINGSUM([CY]) / 15)
    )
// Build Unicode bar for Category or Total

RETURN _D
````

**Description :**
Affiche une barre Unicode en cascade pour chaque Category ou Total, mise à l'échelle selon [CY] et sa somme cumulée.

**Mesures référencées :**
[CY], RUNNINGSUM([CY]), [Category], [Total]

**Mise en forme conditionnelle :**
Oui — fontColor selon [_Measures.waterfall color]

**Masqué :**
false

**Alignement de colonne :**
Left

---

##### Delta

**Formule :**
````dax
VAR _X = [MaxCY_ByTotal_PerYear] / 100
// Scale factor based on max CY per year

RETURN
IF(
    [Delta△] < 0 && ISINSCOPE([Category]) && _X <> 0,
    REPT(UNICHAR(9473), INT(ABS([Delta△] / _X))),
    BLANK()
)
// Render bar for negative Delta△ values
````

**Description :**
Affiche une barre horizontale pour les valeurs négatives de [Delta△] par Category, mise à l'échelle selon [MaxCY_ByTotal_PerYear].

**Mesures référencées :**
[MaxCY_ByTotal_PerYear], [Delta△], [Category]

**Mise en forme conditionnelle :**
Oui — fontColor selon [_Measures.Delta color]

**Masqué :**
false

**Alignement de colonne :**
Auto

---

##### Bar

**Formule :**
````dax
VAR _X = [MaxCY_ByTotal_PerYear] / 100
// Scale factor based on max CY per year

RETURN
IF(
    [Delta△] > 0 && ISINSCOPE([Category]) && _X <> 0,
    REPT(UNICHAR(9473), INT(ABS([Delta△] / _X))),
    BLANK()
)
// Render bar for positive Delta△ values
````

**Description :**
Affiche une barre horizontale pour les valeurs positives de [Delta△] par Category, mise à l'échelle selon [MaxCY_ByTotal_PerYear].

**Mesures référencées :**
[MaxCY_ByTotal_PerYear], [Delta△], [Category]

**Mise en forme conditionnelle :**
Oui — fontColor selon [_Measures.Delta color]

**Masqué :**
false

**Alignement de colonne :**
Left

<br><br>
---

- [x] Et voilà ! Documentation technique automatisée et terminée. C'est plutôt cool, non ?

<br>

## Bonnes pratiques pour les Visual Calculations

### 1. Utilisez des noms explicites

Au lieu de « Calculation1 », utilisez des noms descriptifs comme :

- `Render_Bar_Waterfall`
- `Calculate_RunningTotalPercent`
- `Calculate_Rank_ByCategory`

### 2. Ajoutez des commentaires dans votre DAX

Les Visual Calculations n'ont pas de champs de description, donc les commentaires en ligne deviennent essentiels :

```dax
VAR _ScaleFactor = [MaxValue] / 100  // Scale bars to fit column width
VAR _BarLength = INT([Value] / _ScaleFactor)  // Calculate bar length
RETURN REPT(UNICHAR(9608), _BarLength)  // Render Unicode bar
```

### 3. Suivez des conventions de nommage cohérentes

- **Préfixez par objectif :** `Bar_`, `Rank_`, `Pct_`
- **Utilisez des verbes descriptifs :** `Calculate`, `Render`, `Format`
- **Incluez les unités quand c'est pertinent :** `Days`, `Percent`, `Currency`

### 4. Documentez les dépendances

Listez toujours les mesures dont dépendent vos Visual Calculations. Cela aide pour :

- L'analyse d'impact lors de modifications des mesures du modèle
- Le dépannage des erreurs de calcul
- La compréhension du lignage des données

## Considérations pour l'entreprise

### Le problème du contexte manquant

La documentation générée par l'IA est actuellement solide sur le plan tactique, mais incomplète sur le plan stratégique — pour les environnements d'entreprise, il faut un contexte qui va au-delà des spécifications techniques.

**Ce qui manque à la documentation automatisée :**

- **Objectif métier :** pourquoi ce visuel existe et pourquoi les Visual Calculations ont été choisies plutôt que du DAX traditionnel
- **Profil de performance :** volumes de données attendus et temps de rafraîchissement
- **Directives de maintenance :** qui peut modifier ces éléments et sous quelles conditions
- **Informations sur l'auteur :** qui a créé cet élément et quand
- **Dépendances :** quels changements du modèle pourraient/risqueraient de casser ces calculs

### Ma recommandation : une documentation hybride

**Créez une documentation séparée pour le contexte** (feuille de calcul Excel, fichier markdown, etc.) dans laquelle vous ajoutez manuellement :

1. La **justification métier** pour chaque Visual Calculation
2. Les **repères de performance** et les attentes
3. Les directives de **gestion du changement**
4. Les informations d'**auteur et de date de création**
5. Les **liens vers les exigences** ou user stories

**Approche alternative : commentaires de code intégrés**
Si maintenir une documentation séparée n'est pas viable pour votre équipe, envisagez d'ajouter des commentaires complets directement au sein de chaque formule de Visual Calculation.
Cette approche garantit que la documentation voyage avec le code et reste visible pour quiconque révise ou maintient les Visual Calculations, bien qu'elle ajoute une certaine surcharge aux définitions des calculs.
Je pense que cette approche est très utile jusqu'à un certain seuil de documentation.

> **Idée** :
> J'aimerais que Microsoft introduise une zone de description pour chaque élément visuel, bookmark et fonctionnalité en général. Ce ne devrait pas être obligatoire, mais stocké comme un attribut spécifique dans la structure JSON du PBIR.

<br>
Pour les organisations avec plusieurs rapports, vous pouvez également envisager de créer un **inventaire des Visual Calculations** :

|Nom du rapport|Page|Nom du visuel|Nom du calcul|Aperçu de la formule|Dépendances|Dernière mise à jour|
|---|---|---|---|---|---|---|
|Sales Dashboard|Overview|Sales Trend|Running Total|RUNNINGSUM([Sales])|[Sales]|2024-01-15|
|Finance Report|P&L|Variance Chart|Waterfall Bar|REPT(UNICHAR...)|[CY], [PY]|2024-01-20|

Cet inventaire aide pour :

- L'**analyse d'impact** lors de changements du modèle
- Les processus de **revue de code** pour les Visual Calculations
- Le **transfert de connaissances** lors des changements de membres de l'équipe
- L'**optimisation des performances** à travers les rapports

## Points clés à retenir

1. **Les Visual Calculations** sont encore en préversion mais ont un fort potentiel
2. **La documentation est essentielle** : étant cachées par conception, leur documentation est indispensable
3. **L'IA peut automatiser l'extraction technique** : mais le contexte humain reste nécessaire
4. **Le nommage et les commentaires comptent davantage** : l'absence de champs de description intégrés rend la documentation en ligne cruciale
5. **La documentation hybride fonctionne le mieux** : combinez l'extraction automatisée avec le contexte manuel

## Conclusion

Les Visual Calculations représentent une évolution significative du développement Power BI, offrant des avantages de performance et de simplicité que même les développeurs avancés devraient adopter. Cependant, leur nature cachée crée de nouveaux défis pour la documentation et la maintenance.

**L'approche d'extraction assistée par IA que j'ai partagée automatise la documentation technique à un niveau sans précédent**, vous offrant une visibilité complète sur les Visual Calculations à travers vos rapports. Mais souvenez-vous : l'automatisation fournit les fondations, pas la ligne d'arrivée.

**La valeur stratégique vient de l'ajout du contexte métier** que seul le jugement humain peut apporter. Utilisez l'extraction automatisée comme votre squelette technique, puis ajoutez le contexte opérationnel qui la rend précieuse pour un usage en entreprise.

À mesure que les Visual Calculations continuent d'évoluer et de se généraliser dans les rapports Power BI, disposer de pratiques de documentation robustes deviendra de plus en plus important. Commencez à mettre en place ces pratiques dès maintenant, et votre futur vous-même, ainsi que votre équipe, vous remercieront.

_Avez-vous commencé à utiliser les Visual Calculations dans vos rapports Power BI ? Quels défis de documentation avez-vous rencontrés ? J'aimerais beaucoup connaître votre expérience et toute amélioration possible à l'approche que j'ai partagée._
