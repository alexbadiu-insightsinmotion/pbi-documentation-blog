---
date: 2025-03-18
tag: "externaltools"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/4fa50890-197e-41de-9128-4a20bae2c7f8"
sourceFile: "08 - External Tools - Their Role in Documentation.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md"
title: "Outils externes - Leur rôle dans la documentation"
excerpt: "La documentation apporte rythme et clarté à un projet, en fixant les attentes et en traçant la voie vers les objectifs, sans ambiguïté dans les règles et les processus."
enSlug: "external-tools-their-role-in-documentation"
---

<br><br>

##### Table des matières  
[Outils externes - Leur rôle dans la documentation]() <br>
	&nbsp;&nbsp;[1. DAX Studio](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#1-dax-studio---view-model) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1. Guider des décisions de modélisation éclairées](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#1-guiding-informed-modeling-decisions) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2. Documenter l'évolution des performances](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#2-document-performance-evolution) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3. Vérifier que les agrégations Power BI sont bien sollicitées et documenter l'impact](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#3-verify-power-bi-aggregations-are-being-hit-and-document-impact) <br>
	&nbsp;&nbsp;[2. Tabular Editor](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#2-tabular-editor) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1. BPA - Best Practice Analyzer](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#1-bpa-best-practice-analyzer) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2. Règles de bonnes pratiques personnalisables](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#2-customizable-best-practice-rules) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3. Code de scripts C#](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#3-c-scripts-code) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1. Formater toutes les mesures](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#1-format-all-measures) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2. Masquer les colonnes du côté "plusieurs"](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#2-hide-columns-on-many-side) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3. Désactiver la synthèse (Summarization Off)](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#3-summarization-off) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4. Contrôles de qualité des données](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#4-data-quality-checks) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5. Importer les données VPAX dans les annotations de Tabular Editor](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#5-import-vpax-data-into-tabular-editor-annotations) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6. Supprimer les colonnes inutiles](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#6-remove-unnecessary-columns) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[7. Copier le DAX dans la description du champ](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#7-copy-dax-in-fieldss-description) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[8. Vérifier l'heure du dernier rafraîchissement](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#8-check-last-refresh-time) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[9. Vérifier les violations d'intégrité référentielle (RI)](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#9-check-ri-violations) <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[10. Table de dates étendue (par Melissa de Korte)](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/08%20-%20External%20Tools%20-%20Their%20Role%20in%20Documentation.md#10-extended-date-table-from-melissa-de-korte) <br>

La documentation apporte **rythme et clarté** à un projet, en fixant les attentes et en traçant la voie vers les objectifs, sans ambiguïté dans les règles et les processus. <br><br>

> **Lorsque nous finalisons la documentation, nous documentons l'excellence.** <br><br><br>

La documentation doit accompagner le développement, en aidant à identifier les améliorations tout en garantissant que notre solution est optimisée à chaque étape. Comme un chef étoilé qui vérifie et peaufine chaque assiette avant de la servir, **nous devons optimiser nos rapports Power BI en supprimant les éléments inutilisés, en assurant une mise en forme et un nommage corrects, et en peaufinant chaque détail**. La documentation finale doit refléter **uniquement une solution développée avec minutie.** Cette attention portée au détail tout au long du processus est ce qui distingue les meilleurs professionnels Power BI.

Cette approche met en avant le fait que **la documentation sert trois objectifs :**
- servir d'outil de contrôle qualité pendant le développement
- constituer une preuve d'excellence dans le produit final.
- servir de point de départ pour évaluer et apporter de futures modifications

Pour atteindre efficacement ces objectifs, des outils externes complémentaires sont essentiels. Dans le numéro 8 de cette semaine, nous présenterons un aperçu de deux outils externes qui peuvent aider à rationaliser la documentation et à accélérer le développement de manière professionnelle.

Sans plus attendre, entrons dans le vif du sujet :

## 1. DAX Studio - View Model

DAX Studio est un outil puissant, **open-source et gratuit**, spécialement conçu pour interroger et optimiser le DAX. C'est un incontournable pour les professionnels Power BI, en particulier ceux qui réalisent des tâches d'optimisation.

DAX Studio a la capacité d'**analyser votre modèle de données et de rendre compte de l'utilisation de la mémoire**. Cela peut s'avérer extrêmement utile lors du réglage des performances, car plus votre modèle de données nécessite de mémoire, plus son traitement et ses requêtes sont lents.

S'il est clair que DAX Studio est « inconturnable » (incontournable) pour un développeur professionnel, quels avantages spécifiques cet outil apporte-t-il à la documentation ?

### Avantages clés :

#### 1. Guider des décisions de modélisation éclairées

- Les métriques de modèle de DAX Studio fournissent **des informations détaillées sur l'utilisation de la mémoire, la taille des tables et les détails des colonnes.** Cela permet d'identifier les éléments de votre modèle qui consomment le plus de ressources, vous permettant de **prendre des décisions éclairées** sur ce qu'il faut supprimer ou organiser différemment. Cette visibilité technique crée une base pour des conversations essentielles entre développeurs et utilisateurs finaux au sujet des compromis, car **tout, dans un modèle, a un coût**. Ces discussions aident à établir qu'**un modèle sémantique NE doit PAS chercher à répondre à toutes les questions possibles dans un rapport**, mais plutôt se concentrer sur les besoins métier clés. Sur le plan documentaire, ces informations sont précieuses non seulement à intégrer dans votre documentation finale, mais aussi comme point de départ lors de la phase d'exploration initiale du projet.
- En documentant ces métriques et le raisonnement derrière les choix de modélisation, vous créez un référentiel précieux qui :

1. Montre **l'intentionnalité derrière chaque inclusion ou exclusion**
2. **Fournit du contexte** aux futurs mainteneurs sur les raisons de certains compromis
3. Établit **une justification claire des limites de portée du modèle**
4. Crée **de la transparence autour des considérations de performance**

Cette approche de la documentation transforme ce qui pourrait être perçu comme des limitations techniques en preuve de décisions de conception réfléchies, ce qui est particulièrement précieux pour justifier les contraintes du modèle auprès des parties prenantes qui pourraient sinon demander des capacités toujours plus étendues sans en comprendre les coûts associés.

#### 2. Documenter l'évolution des performances

- DAX Studio **excelle dans le suivi des évolutions de performance dans le temps**. Suivez ces étapes pour établir un processus de benchmarking fiable :

1. **Créer un protocole de test standardisé :**
    - Documenter des étapes de navigation précises dans un ordre cohérent
    - Inclure les filtres, la navigation entre pages, les actions de drill-through et les éléments interactifs
    - S'assurer que le protocole peut être reproduit précisément à chaque fois
2. **Exécuter le test de performance :**
    - S'assurer que l'environnement de test dispose d'un volume et d'une variété de données représentatifs de la production (sinon, les tests de performance ne décrivent que le processus de développement et ne peuvent pas être utilisés pour évaluer les exigences de performance en production).
    - Ouvrir une nouvelle instance de Power BI Desktop
    - Partir d'une page vierge pour éviter les données mises en cache
    - Activer l'Analyseur de performances
    - Suivre systématiquement votre protocole de test documenté
4. **Capturer et analyser les résultats :**
    - Exporter les résultats de l'Analyseur de performances au format JSON
    - Importer ces données dans DAX Studio via « Load Perf Data »
    - Générer des métriques de performance concrètes servant de preuves
    - Établir ces résultats comme référence pour les comparaisons futures
5. **Intégrer cela à votre flux de travail :**
    - Faire des tests de performance une exigence obligatoire pour tout travail de développement
    - Comparer les nouvelles versions au benchmark établi
    - Valider l'impact avec les clients avant de déployer en production

En mettant en œuvre cette approche systématique des tests de performance, **vous transformez des perceptions subjectives en mesures objectives**. Lorsque les clients demandent des fonctionnalités complexes, vous disposerez de données concrètes pour les challenger et démontrer les implications sur la performance. Cela vous positionne comme un conseiller de confiance qui équilibre fonctionnalité et performance, plutôt que comme un « constructeur de rapports » qui se contente de faire ce qu'on lui demande. **Cette approche fondée sur des preuves vous permet, en tant que développeur, de prendre des décisions éclairées et de proposer aux clients des solutions véritablement optimisées.**

![Pasted image 20250314164229](https://github.com/user-attachments/assets/8e206e59-811c-4a60-a909-190f1eb1f17a)

<img width="622" alt="Pasted image 20250314164512" src="https://github.com/user-attachments/assets/1111ef6b-604a-412b-8b43-644df03892ea" />

<br><br>

> [!TIP]
> Veillez à renommer d'abord chaque élément de la page pour plus de clarté.

> [!TIP]
> Intégrez ces données de performance dans un rapport Power BI dédié afin de suivre les dates de test et les versions/modifications du modèle, et de conserver une visibilité sur les tendances de performance. Envisagez de **développer des modèles standardisés pour suivre l'évolution des performances** sur l'ensemble de vos rapports.
****
#### 3. Vérifier que les agrégations Power BI sont bien sollicitées et documenter l'impact

DAX Studio est essentiel pour confirmer que vos **agrégations Power BI sont réellement utilisées et apportent des gains de performance**. Sans cette vérification, l'effort consacré à la création des agrégations pourrait être vain.

Avec DAX Studio, vous pouvez :

- **Confirmer quelles requêtes utilisent quelles tables d'agrégation** par rapport aux tables détaillées
- **Créer des comparaisons de performance avant/après** montrant des améliorations tangibles
- Documenter précisément **quelles mesures et combinaisons de filtres bénéficient des agrégations**
- Suivre **quels scénarios utilisateurs spécifiques sont optimisés**

Cette documentation fournit **une preuve concrète que votre stratégie d'agrégation fonctionne comme prévu et apporte les gains de performance attendus**. Elle transforme une implémentation technique en **preuve mesurable et documentée d'optimisation** que les parties prenantes peuvent comprendre.

## 2. Tabular Editor

Tabular Editor est largement considéré comme l'outil externe le plus essentiel parmi les professionnels Power BI. Bien que ses avantages soient suffisamment nombreux pour constituer une série entière, cet article se concentre spécifiquement sur la manière dont, selon moi, Tabular Editor améliore les processus de documentation.

### Avantages clés :

#### 1. BPA : Best Practice Analyzer

BPA analyse votre modèle par rapport à des règles de bonnes pratiques courantes, identifiant rapidement tout écart. Il vous permet de :

- **Évaluer la qualité du modèle** en quelques secondes
- Générer **des rapports de qualité détaillés**
- **Documenter les axes d'amélioration**
- **Suivre la conformité** dans le temps

Vous pouvez également exporter ces règles pour créer un fichier d'accompagnement démontrant que votre développement respecte les bonnes pratiques. Cela aide les clients non experts à gagner confiance en votre travail.

À l'aide du script C# ci-dessous, vous pouvez exporter les données vers un fichier Excel et documenter l'information.

```
using TabularEditor.BestPracticeAnalyzer;
  
var bpa = new Analyzer();
bpa.SetModel(Model);
  
var sb = new System.Text.StringBuilder();
string newline = Environment.NewLine;
  
sb.Append("RuleCategory" + '\t' + "RuleName" + '\t' + "ObjectName" + '\t' + "ObjectType" + '\t' + "RuleSeverity" + '\t' + "HasFixExpression" + '\t' + "RuleDescription" + newline);
  
foreach (var a in bpa.AnalyzeAll().ToList())
{
    sb.Append(a.Rule.Category + '\t' + a.RuleName + '\t' + a.ObjectName + '\t' + a.ObjectType + '\t' + a.Rule.Severity + '\t' + a.CanFix + '\t' + a.Rule.Description + newline);
}
  
sb.Output();
```

<img width="766" alt="Pasted image 20250315164412" src="https://github.com/user-attachments/assets/ca163343-21be-4e43-9d4b-dd13fa0716d5" />

Pour charger ces règles dans Tabular Editor (afin qu'elles puissent être appliquées à vos rapports), suivez ces étapes :
###### Charger les règles

1. Téléchargez et installez [Tabular Editor](https://tabulareditor.com/ "https://tabulareditor.com/").
2. Ouvrez Tabular Editor et exécutez le code suivant dans la fenêtre Advanced Scripting. *
3. Copiez/collez le code suivant et cliquez sur Play

`System.Net.WebClient w = new System.Net.WebClient(); string path = System.Environment.GetFolderPath(System.Environment.SpecialFolder.LocalApplicationData); string url = "https://raw.githubusercontent.com/microsoft/Analysis-Services/master/BestPracticeRules/BPARules.json"; string downloadLoc = path+@"\TabularEditor\BPARules.json"; w.DownloadFile(url, downloadLoc);`

4. Fermez et rouvrez Tabular Editor

<img width="766" alt="Pasted image 20250315164412" src="https://github.com/user-attachments/assets/1312843c-229f-4433-9f4d-9795065dae57" />

![Pasted image 20240726170929](https://github.com/user-attachments/assets/1be968cb-7b84-4ccf-b752-3d04d02d0956)

Source : [Best practice rules to improve your model&#8217;s performance | Microsoft Power BI Blog | Microsoft Power BI](https://powerbi.microsoft.com/en-us/blog/best-practice-rules-to-improve-your-models-performance/ "https://powerbi.microsoft.com/en-us/blog/best-practice-rules-to-improve-your-models-performance/")

#### 2. Règles de bonnes pratiques personnalisables

BPA se distingue par sa flexibilité. Vous pouvez :

- **Créer des règles personnalisées adaptées** à votre organisation
- **Documenter des exigences d'implémentation spécifiques**
- **Tirer parti des ressources de la communauté** si le scripting C# n'est pas votre point fort
- **Importer des règles créées par la communauté pour enrichir la documentation**

La communauté Power BI contribue activement à ces ressources. Des experts comme **Matt Allington, Kurt Buhler, Melissa de Korte, Brian Julius, Michael Kovalsky, Reid Havens** et d'autres ont partagé des extraits précieux. **John Kerski**, par exemple, a publié sur son GitHub des règles personnalisées spécifiques à Power Query, à la suite de retours reçus sur LinkedIn. 
Cela permet non seulement de documenter votre rapport, mais aussi de garantir le respect des bonnes pratiques et d'accélérer le développement.
[Post LinkedIn](https://www.linkedin.com/posts/john-kerski_this-is-a-set-of-preliminary-best-practices-activity-7297653607204573184-xc-9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAd2rAYBtqG-2bVNWh14j0hOzgmbFYqs3hE)

###### Charger les règles

Rendez-vous sur le GitHub de John Kerski, allez sur **PQ_Rules.json**, cliquez sur **Raw** et copiez le lien
![Pasted image 20250315170325](https://github.com/user-attachments/assets/deffca2e-5d12-4912-b9a2-cfb683a8e791)

Allez dans Tabular Editor (2 ou 3) - **Tools / Manage BPA rules**, puis **Include Rule File from URL**
<img width="410" alt="Pasted image 20250315165831" src="https://github.com/user-attachments/assets/58677e35-1d0c-45a9-82fa-deabcabee3e3" />

Collez le lien que vous avez copié depuis le fichier raw.
![Pasted image 20240726170929](https://github.com/user-attachments/assets/de0613fd-8f34-4eb4-ae52-5db3312b2404)

Vous pouvez maintenant voir les règles
![Pasted image 20250315165940](https://github.com/user-attachments/assets/015e50f8-f5ff-4eae-8b89-6fa75926a714)

Ces règles BPA constituent non seulement une excellente ressource pour documenter vos rapports et démontrer le respect des bonnes pratiques, mais elles vous poussent également à améliorer votre documentation intégrée à l'outil.

![Pasted image 20250315170118](https://github.com/user-attachments/assets/4e980ef8-3c01-4021-b46f-681f5d5d502f)

#### 3. Code de scripts C#

Voici les 10 scripts C# que j'ai trouvés les plus utiles pour documenter des rapports Power BI. Ce sont des outils éprouvés qui accélèrent considérablement le développement et améliorent la documentation. Ces scripts apportent des **bénéfices immédiats et tangibles** à votre travail ; n'hésitez donc pas à les enregistrer, à les expérimenter et à les intégrer si vous les trouvez utiles.

##### 1. Formater toutes les mesures
```
Model.AllMeasures.FormatDax();
```
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/1.%20Format%20all%20Measures)

##### 2. Masquer les colonnes du côté "plusieurs" 
```
/*
 * Title: Hide columns on the many side of a relationship  
 *
 * Author: Matt Allington, https://exceleratorbi.com.au  
 *
 * it is dangerous to use columns on the many side of a relationship as it can 
 * produce unexpected results, so it is a best practice to hide these columns
 * to discourage their use in reports.
 */

// Hide all columns on many side of a join
foreach (var r in Model.Relationships)
{ // hide all columns on the many side of a join
    var c = r.FromColumn.Name;
    var t = r.FromTable.Name;
    Model.Tables[t].Columns[c].IsHidden = true;
}
```
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/2.%20Hide%20columns%20on%20many%20side)

##### 3. Désactiver la synthèse (Summarization Off)
```
foreach(var c in Model.AllColumns)
{
    c.SummarizeBy = AggregateFunction.None;
}
```
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/3.%20Summarization%20OFF)

##### 4. Contrôles de qualité des données
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/4.%20Data%20Quality%20Checks)

##### 5. Importer les données VPAX dans les annotations de Tabular Editor
[Import VPAX Data into Tabular Editor](https://www.elegantbi.com/post/vpaxtotabulareditor#:~:text=Paste%20the%20script%20into%20the%20Advanced%20Scripting%20window,file.%20Click%20the%20play%20button%20%28or%20press%20%27F5%27%29.)

Ce code permet d'ajouter des annotations dans Tabular Editor à partir des informations d'un fichier Vertipaq Analyzer (VPAX). Et désormais, vous pouvez vérifier de manière globale l'intégrité de votre modèle via des règles BPA qui font référence à ces annotations.
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/5.%20Import%20VPAX%20Data%20into%20Tabular%20Editor%20annotations)

##### 6. Supprimer les colonnes inutiles
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/6.%20Remove%20Unnecessary%20Columns)

##### 7. Copier le DAX dans la description du champ

```
/*
 * Title: Copy DAX Expression into the measure's description field.
 * 
 * Author: Reid Havens, https://www.havensconsulting.net/ 
 * 
 * This script, when executed, will loop through all the measures in the model and
 * copy the DAX epression into the field's description for documentation purposes.
 */

foreach (var m in Model.AllMeasures) {
  m.Description = m.Expression;
}
```
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/7.%20Copy%20DAX%20in%20field's%20description)

![Pasted image 20250315172622](https://github.com/user-attachments/assets/b2cd3cf9-b663-4abb-aef5-7c152f5d9b13)

##### 8. Vérifier l'heure du dernier rafraîchissement 

```
//https://data-goblins.com/power-bi/te-dmv-scripts
/////////////////////////////////////////////////////////////////////////////////////////////
//
// Evaluates a DMV to determine the last time the model was processed (refreshed)
//
// Original method from Marco Russo https://www.sqlbi.com/articles/last-process-date-in-ssas-tabular/
//
/////////////////////////////////////////////////////////////////////////////////////////////

// Query to be evaluated
string _dmv = "SELECT TOP 1 [LAST_DATA_UPDATE] FROM $SYSTEM.MDSCHEMA_CUBES";

// Evaluate the query
using(var daxReader = ExecuteReader(_dmv))
{
    // Read the results
    while(daxReader.Read())
    
    {
        var rowValues = new object[daxReader.FieldCount];
        daxReader.GetValues(rowValues);
        var row = rowValues.Select(v => v == null ? "" : v);

        // Convert the scalar value to a string
        string _processdate = row.ElementAt(0).ToString();
        Info ( "The model was last processed at " + _processdate);
    }

    // Close the reader
    daxReader.Close();

}

```
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/8.%20Check%20last%20refresh%20time)

![Pasted image 20250315173324](https://github.com/user-attachments/assets/8ff3a777-d202-424e-a4c1-0f3c932bade7)

##### 9. Vérifier les violations d'intégrité référentielle (RI)
[Vous pouvez trouver le script C# ici](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/TE%20Scripts/9.%20Check%20RI%20Violations)

![Pasted image 20250315173433](https://github.com/user-attachments/assets/b820b0c1-66b9-424a-95c2-1fbcb7d8b589)

##### 10. Table de dates étendue, par Melissa de Korte
[Extended Date table M function | Creates an ISO-8601 type calendar](https://gist.github.com/m-dekorte/12b53faee9cc1a616fa23f15b1b4a173)

💬 Discutons-en : 
- Quel est votre outil de prédilection pour la documentation Power BI ?
- Quel a été le plus grand défi que vous ayez rencontré pour maintenir des rapports bien documentés ?
  
Partagez vos réflexions dans le post LinkedIn : nous serions ravis de poursuivre la discussion ! Post LinkedIn : [#Issue 8 - External Tools - Their Role in Documentation ](https://www.linkedin.com/posts/alexandru-badiu_powerbi-dataquality-automation-activity-7308082688777736192-xMxk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAd2rAYBtqG-2bVNWh14j0hOzgmbFYqs3hE)
