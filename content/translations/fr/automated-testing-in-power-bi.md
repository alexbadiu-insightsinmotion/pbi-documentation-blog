---
date: 2025-03-04
tag: "testing"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/953efa1b-1be3-47f0-adb9-7bb60d430a2b"
sourceFile: "06 - Automated Testing in Power BI.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md"
title: "Les tests automatisés dans Power BI"
excerpt: "Avez-vous déjà mis un rapport en production après des tests, pour que les utilisateurs finaux signalent ensuite des problèmes qui auraient pu être détectés plus tôt ?"
enSlug: "automated-testing-in-power-bi"
---

### Qualité des données et tests automatisés dans Power BI

Avez-vous déjà mis un rapport en production après des tests, pour que les utilisateurs finaux signalent ensuite des problèmes qui auraient pu être détectés plus tôt ?

Un défi commun persiste dans de nombreuses organisations : **l'absence de protocoles de tests structurés** avant le déploiement des solutions Power BI en environnement de production. Trop souvent, nous nous appuyons sur des vérifications superficielles et des approbations subjectives (« **X a dit que ça avait l'air bien** ») plutôt que sur une vérification systématique. Cet article explore trois avantages clés des tests automatisés dans Power BI : maintenir la qualité des données, améliorer les standards de documentation, et renforcer la confiance des clients grâce à des pratiques de développement professionnelles.

##### Table des matières  
[Pourquoi les tests automatisés sont importants pour Power BI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#why-automated-testing-matters-for-power-bi) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Au-delà de la vérification manuelle](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#beyond-manual-verification) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Renforcer la confiance des clients](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#building-client-confidence) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Definition of Done dans les projets Power BI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#definition-of-done-in-power-bi-projects) <br>
[Présentation de DAX QUERY VIEW](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#introducing-dax-query-view) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Méthodologie de tests automatisés dans Power BI via DAX QUERY VIEW](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#automated-testing-methodology-in-power-bi-via-dax-query-view) <br>
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Types de tests possibles dans DAX QUERY VIEW](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#types-of-tests-possible-in-dax-query-view) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[1. Tests de qualité des données](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#1-data-quality-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[2. Tests d'intégrité référentielle](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#2-referential-integrity-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3. Tests de cohérence des calculs](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#3-calculation-consistency-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[4. Tests de règles métier](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#4-business-rule-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[5. Tests de complétude](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#5-completeness-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[6. Tests de calculs intermédiaires](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#6-intermediate-calculation-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[7. Tests de comparaison historique](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#7-historical-comparison-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[8. Tests d'agrégation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#8-aggregation-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[9. Tests de schéma](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#9-schema-tests) <br>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[10. Approche de test consolidée](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#consolidated-testing-approach) <br>
[Résumé](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#summary) <br>
[Conclusion](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#conclusion) <br>
[Pour aller plus loin](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md#read-more)

### Pourquoi les tests automatisés sont importants pour Power BI

#### Au-delà de la vérification manuelle

Les approches de test traditionnelles pour les rapports Power BI consistent souvent en des inspections visuelles et un échantillonnage de données basique, **très souvent limité aux seules nouvelles fonctionnalités** à livrer. Si ces méthodes peuvent détecter des erreurs évidentes, **elles sont limitées par la faillibilité humaine et les idées préconçues**, une application incohérente, et une incapacité à monter en échelle. Les humains ont tendance à ne plus prêter attention à des éléments qu'ils auraient pu remarquer auparavant, en particulier lors des retests (« je n'ai pas besoin de regarder ça, je l'ai déjà vérifié... »). Les tests automatisés offrent une approche systématique qui garantit une **couverture complète de toutes les fonctionnalités, nouvelles et anciennes (tests de régression).**

#### Renforcer la confiance des clients

Démontrer **un cadre de tests robuste témoigne d'un professionnalisme et d'une attention au détail** qui renforcent la confiance. Plutôt que d'affirmer **« nous avons vérifié que ça fonctionne »**, les équipes peuvent **fournir des preuves via des résultats de tests documentés** garantissant l'exactitude des données.

#### Definition of Done dans les projets Power BI

Definition of Done désigne une compréhension partagée de **ce que signifie « terminé » pour tout livrable**. C'est une liste de critères qui doivent être remplis avant qu'un travail ne soit considéré comme achevé.

##### Definition of Done : fonctionnalité de Drill-Through dans Power BI

Mise en œuvre d'une fonctionnalité de drill-through personnalisée permettant aux utilisateurs de naviguer depuis des visualisations de synthèse vers des rapports détaillés en fonction des points de données sélectionnés.

> [!NOTE]  
>Exemple de critères de Definition of Done
>1. **Exigences fonctionnelles :**
>   - Action de drill-through configurée sur tous les visuels de synthèse
>   - Pages détaillées cibles créées avec le contexte de filtrage approprié
>    - Info-bulles personnalisées indiquant la disponibilité du drill-through
>2. **Exigences de performance**
>   - L'action de drill-through s'exécute en moins de 3 secondes
>   - Aucune dégradation notable des performances sur les pages source
>   - L'utilisation de la mémoire reste dans les seuils alloués
> 3. **Exigences de test**
>   - Fonctionnalité vérifiée sur différents navigateurs
>   - Tests réalisés avec différents volumes de données (sélections petites, moyennes, grandes)
>   - Cas limites gérés (valeurs nulles, etc.)
>   - Tests de précision dédiés développés pour les tests automatisés
>   - Si les tests sont réalisés dans l'environnement TEST, les résultats peuvent ne pas du tout refléter l'environnement PROD, qui a probablement des performances réseau et des critères de sécurité différents.
> 4. **Documentation et formation**
>   - Documentation technique mise à jour avec les détails d'implémentation
>   - Guide utilisateur créé avec des instructions étape par étape
>   - Supports de formation préparés pour les utilisateurs finaux
>   - Démonstration vidéo créée pour la base de connaissances
> 5. **Sécurité**
>   - Sécurité au niveau des lignes propagée correctement à travers les actions de drill-through
> 6. **Assurance qualité**
>   - Revue de code réalisée par un développeur senior
>   - Tous les cas de test réussis et documentés
>   - Aucun bug critique ou majeur restant
>   - Validation des parties prenantes obtenue
> 7. **Déploiements**
>   - Fonctionnalité déployée en environnement de développement
>   - UAT réalisée avec approbation des parties prenantes
>   - Notes de version préparées
>   - Plan de retour arrière documenté

##### À quoi cela sert

- Crée de la **clarté sur les attentes de qualité**
- **Empêche un travail incomplet** d'avancer
- **Réduit les reprises de travail et la dette technique**
- Renforce la **cohérence entre les livrables de l'équipe**
- Établit **un langage commun entre les parties prenantes techniques et métier**

##### Comment les tests automatisés se rattachent au DoD (Definition of Done) dans Power BI

Les tests automatisés dans Power BI soutiennent directement le DoD en :
- Fournissant une **vérification objective de l'exactitude des calculs**
- **Décomposant une logique complexe en éléments DAX plus petits**, testables
- **Documentant les règles métier sous forme de tests exécutables**
- Créant un **processus de validation reproductible**
- **Conservant les cas de test** aux côtés du modèle dans le contrôle de version

> [!TIP]
> La méthodologie de tests automatisés aide à **développer une bibliothèque de tests réutilisables**. Cette approche **facilite la montée en échelle des tests**, car vos tests de « régression » sont déjà développés, et elle **sert également de modèle pour d'autres projets Power BI.**

# Présentation de DAX QUERY VIEW

À mesure que les rapports et modèles de données Power BI deviennent **plus complexes et critiques pour l'activité**, la mise en place de tests automatisés devient de plus en plus importante. **Les tests permettent de s'assurer que les calculs sont exacts, que les données sont complètes et que la logique métier est correctement implémentée.** Cependant, Power BI ne dispose pas nativement des capacités de test que l'on trouve dans des environnements de développement logiciel plus traditionnels.

C'est là que **DAX Query View** apporte une solution. En exploitant les requêtes DAX, les analystes et développeurs peuvent mettre en œuvre une méthodologie de test complète directement au sein de leurs modèles Power BI. Cette approche permet la **validation de la qualité des données, de l'exactitude des calculs et de la conformité aux règles métier**, sans nécessiter d'outils ou de processus externes.

La méthodologie suivante décrit comment mettre en œuvre des tests systématiques dans Power BI à l'aide de DAX Query View, en commençant par créer une approche structurée pour documenter les cas de test, puis en exécutant ces tests via des requêtes DAX. Ces tests peuvent valider aussi bien la qualité de base des données que des règles métier complexes, **tout en étant enregistrés comme partie intégrante de votre modèle et visibles dans les systèmes de contrôle de version.**

En mettant en œuvre cette approche, vous pouvez considérablement **accroître la confiance** dans vos rapports Power BI, **réduire les erreurs**, et **identifier rapidement les problèmes** si/quand ils surviennent - le tout via une interface de test unique et unifiée qui ne nécessite qu'un seul clic pour s'exécuter.

### Méthodologie de tests automatisés dans Power BI via DAX Query View

#### Comment créer des tests automatisés

##### 1. Créer un fichier Excel de référence

Documentez avec le PO (Product Owner) ou l'expert métier les tests automatisés à réaliser :

- Nom du test
- Priorité
- Valeurs attendues
- Pourcentage de variance autorisé
- Code DAX à tester

Pour chaque nouveau KPI créé, documentez la définition et les règles métier comme expliqué dans l'article de Greg de la semaine dernière [05 - What content is in a Design Document - Workflow Issues Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/05%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Workflow%20Issues%20Business%20Rules.md#business-rules)  et demandez un exemple (par exemple, le nombre d'employés en France en décembre 2024). Ce fichier Excel servira de référence et fera partie des critères de « Definition of Done ».

##### 2. Importer le fichier Excel dans Power BI

Intégrez ce fichier comme une table déconnectée dans votre modèle.

<img width="364" alt="Pasted image 20250302174444" src="https://github.com/user-attachments/assets/823384b5-b892-4cbf-931f-ccb43d644bb7" />

##### 3. Créer une requête DAX dans DAX Query View

Utilisez la structure suivante pour vos tests :

<img width="478" alt="Pasted image 20250302174647" src="https://github.com/user-attachments/assets/229500ec-d477-4107-a89f-66b96ffd61b4" /> <br>

##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - DAX Test Pattern](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/DAX%20Test%20Pattern) 

> [!IMPORTANT]  
>**Les tests sont exécutés à chaque clic sur RUN**. Le meilleur, c'est qu'ils sont enregistrés avec votre modèle et visibles dans DevOps/GitHub.

### Types de tests possibles dans DAX Query View

#### 1. Tests de qualité des données

Accédez au menu « quick queries » en faisant un clic droit sur n'importe quelle table dans la vue du modèle, depuis DAX Query View, puis sélectionnez « Show column statistics » pour révéler les fonctions analytiques intégrées pouvant être utilisées pour les tests.

- Nombre de valeurs distinctes
- Valeurs minimales et maximales
- Médianes et moyennes
- Nombre de valeurs nulles ou égales à zéro
- Distribution des valeurs

exemple : le nombre de pays différents dans la table de dimension devrait être 45

```dax
EVALUATE
ROW(
    "Test Name", "Customer Table - Count of Distinct Countries",
    "Expected Value", 45,
    "Actual Value", DISTINCTCOUNT('Customer'[Country]),
    "Allowed variance %", 0,
    "Test Passed", DISTINCTCOUNT('Customer'[Country]) = 45
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Data Quality Test 1](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Data%20Quality%20Test%201) 

Autre exemple :

![Pasted image 20250302164910](https://github.com/user-attachments/assets/4171912c-b2bf-47c0-988a-0563c729c0f0)

##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Data Quality Test 2](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Data%20Quality%20Test%202) 

#### 2. Tests d'intégrité référentielle

Vérifiez que toutes les clés étrangères correspondent à des clés primaires existantes :

>[!TIP]
>Il est essentiel de vérifier l'intégrité référentielle dans Power BI pour s'assurer que les relations entre les tables sont cohérentes et fiables, ce qui évite les données orphelines et garantit des analyses exactes.

```
FILTER(
INFO.STORAGETABLES(),
[RIVIOLATION_COUNT]>0
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Referential Integrity 1](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Referential%20Integrity%201) 

![Pasted image 20250302163340](https://github.com/user-attachments/assets/21a01e15-9e0c-4701-80c4-bed1c7739aaf)

Une requête plus détaillée identifiant quelles dimensions sont en violation d'intégrité référentielle (RI) et le nombre exact de lignes impactées.

![Pasted image 20250302163105](https://github.com/user-attachments/assets/025c8392-b63e-48bf-af4c-ec8d78fb5239)

##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Referential Integrity 2](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Referential%20Integrity%202) 

Un autre exemple pour vérifier les enregistrements orphelins :

```dax
EVALUATE
ROW(
    "Test Name", "F_Client_Overdraft with Invalid Code MIG",
    "Expected Value", 0,
    "Actual Value", COUNTROWS(FILTER(F_CLIENT_OVERDRAFT, NOT(F_CLIENT_OVERDRAFT[CODE_MIG] IN VALUES(D_STRUCTURES[CODE_MIG])))),
    "Allowed variance %", 0,
    "Test Passed", COUNTROWS(FILTER(F_CLIENT_OVERDRAFT, NOT(F_CLIENT_OVERDRAFT[CODE_MIG] IN VALUES(D_STRUCTURES[CODE_MIG])))) = 0
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Referential Integrity 3](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Referential%20Integrity%203) 

![Pasted image 20250302164128](https://github.com/user-attachments/assets/e1df296a-0a27-4409-84bf-e3ac23a64a34)

#### 3. Tests de cohérence des calculs

Valider que différentes méthodes de calcul produisent des résultats cohérents.

Ce test est pertinent car il valide que la mesure globale Total Sales correspond exactement à la somme de ses composantes trimestrielles, garantissant que la logique d'agrégation est correcte et cohérente dans une marge acceptable.
```dax
EVALUATE
ROW(
    "Test Name", "Total Sales - Sum equals aggregated quarters",
    "Expected Value", [Total Sales],
    "Actual Value", [Q1 Sales] + [Q2 Sales] + [Q3 Sales] + [Q4 Sales],
    "Allowed variance %", 0.001,
    "Variance %", ABS(1-DIVIDE([Total Sales], [Q1 Sales] + [Q2 Sales] + [Q3 Sales] + [Q4 Sales])),
    "Test Passed", ABS(1-DIVIDE([Total Sales], [Q1 Sales] + [Q2 Sales] + [Q3 Sales] + [Q4 Sales])) <= 0.001
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Calculation Consistency](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Consistency%20Tests) 

#### 4. Tests de règles métier

Vérifiez que les contraintes métier sont respectées.

Cette requête valide que la table Sales a une Gross Margin non négative, et signale un échec du test si des valeurs négatives sont trouvées.

```dax
EVALUATE
ROW(
    "Test Name", "Gross Margin always positive",
    "Expected Value", 0,
    "Actual Value", COUNTROWS(FILTER(Sales, [Gross Margin] < 0)),
    "Allowed variance %", 0,
    "Test Passed", COUNTROWS(FILTER(Sales, [Gross Margin] < 0)) = 0
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Business%20Rules%20Tests) 

#### 5. Tests de complétude

Assurez-vous que toutes les dimensions contiennent les membres attendus.

Ce test DAX valide que la table 'Product Categories' **contient exactement les dix catégories attendues**, en comparant le nombre de catégories correspondantes à une valeur attendue de 10.

```dax
EVALUATE
ROW(
    "Test Name", "Product Categories - All expected categories present",
    "Expected Value", 10,
    "Actual Value", COUNTROWS(FILTER('Product Categories', 
                       [Category] IN {"Category1", "Category2", "Category3", "Category4", "Category5", 
                                     "Category6", "Category7", "Category8", "Category9", "Category10"})),
    "Allowed variance %", 0,
    "Test Passed", COUNTROWS(FILTER('Product Categories', 
                   [Category] IN {"Category1", "Category2", "Category3", "Category4", "Category5", 
                                 "Category6", "Category7", "Category8", "Category9", "Category10"})) = 10
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Completness test](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Completness%20Tests) 

#### 6. Tests de calculs intermédiaires

Décomposez les calculs complexes pour identifier les étapes problématiques.

Ce test est pertinent car il permet de détecter les erreurs tôt, clarifie une logique complexe pour la maintenance, et fournit une preuve documentée des résultats attendus pour faciliter le dépannage et les développements futurs.

```dax
EVALUATE
ADDCOLUMNS(
    SUMMARIZE(
        Sales,
        Sales[Year]
    ),
    "Base Revenue", [Base Revenue],
    "Discounts", [Total Discounts],
    "Taxes", [Total Taxes],
    "Expected Net Revenue", [Base Revenue] - [Total Discounts] + [Total Taxes],
    "Actual Net Revenue", [Net Revenue],
    "Difference", [Net Revenue] - ([Base Revenue] - [Total Discounts] + [Total Taxes]),
    "Test Passed", ABS([Net Revenue] - ([Base Revenue] - [Total Discounts] + [Total Taxes])) < 0.01
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Intermediate Calculation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Intermediate%20Calculation) 

#### 7. Tests de comparaison historique

Vérifiez que certaines métriques restent cohérentes avec les données historiques.

```dax
EVALUATE
ROW(
    "Test Name", "Average Order Value - Within historical bounds",
    "Min Historical", 250,
    "Max Historical", 350,
    "Current Value", [Average Order Value],
    "Test Passed", [Average Order Value] >= 250 && [Average Order Value] <= 350
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Historical Comparison](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Historical%20Comparison) 

#### 8. Tests d'agrégation

Validez que différents niveaux d'agrégation sont cohérents.

Vérifiez que Total Revenue est égal à la somme des revenus régionaux

```dax
EVALUATE
ROW(
    "Test Name", "Total Revenue equals sum of regional revenues",
    "Total Revenue", [Total Revenue],
    "Sum of Regions", SUMX(VALUES(Region[RegionName]), CALCULATE([Total Revenue])),
    "Difference", [Total Revenue] - SUMX(VALUES(Region[RegionName]), CALCULATE([Total Revenue])),
    "Test Passed", ABS([Total Revenue] - SUMX(VALUES(Region[RegionName]), CALCULATE([Total Revenue]))) < 0.01
)
```
##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Aggregation Test](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Aggregation%20Tests) 

#### 9. Tests de schéma

Valider la cohérence du schéma est crucial, car tout changement inattendu dans votre modèle central peut casser les rapports qui en dépendent, entraînant des erreurs et des analyses inexactes. S'assurer que le schéma reste cohérent préserve l'intégrité de tous les rapports connectés et minimise les interruptions et les dépannages coûteux.

##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - Schema Test](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Schema%20Tests) 

![Pasted image 20250302164756](https://github.com/user-attachments/assets/530d67f0-4f11-4945-b7a1-d8b0b5a9bd33)

#### Approche de test consolidée

Tous les tests décrits ci-dessus **peuvent être intégrés dans** la structure présentée à la section 3, ce qui vous permet d'avoir **une seule requête qui exécute tous les tests en un clic**. Cela fournit une vue d'ensemble complète de la qualité et de l'exactitude de votre modèle. Voici comment les consolider :

Votre structure Excel devrait ressembler à ceci :
<img width="685" alt="Pasted image 20250302170807" src="https://github.com/user-attachments/assets/0982555f-96be-4397-9260-fea42e4b7646" />

Structure de la requête DAX :
<img width="920" alt="Pasted image 20250302170649" src="https://github.com/user-attachments/assets/dbcc438d-a312-4482-83e9-bdd9cf1d0937" />

**Code DAX** basé sur Excel <br>
<img width="203" alt="Pasted image 20250302171047" src="https://github.com/user-attachments/assets/ab5e07e0-addf-4689-a5b8-57e174841aac" />

##### Vous pouvez accéder au CODE DAX ICI -> [DAX Query View | Script - DAX Code Script](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/DAX%20Query%20View/Excel%20Consolidated%20DAX) 

Résultat du « DAX Code » dans Visual Studio Code -> Copiez, pour chaque ID de test, la formule DAX correspondante
<img width="763" alt="Pasted image 20250302171019" src="https://github.com/user-attachments/assets/7fe83ac3-b03c-40a1-bb57-7e361aacb053" />

Ainsi, vous pouvez exécuter l'intégralité de votre suite de tests en un seul clic dans DAX Query View, ce qui vous donne un aperçu complet de la qualité et de la fiabilité de votre modèle. Les résultats vous montrent en un coup d'œil quels tests ont réussi et lesquels nécessitent votre attention, **AVANT d'envisager la publication** sur le service Power BI (environnement DEV) ou un commit sur une branche de développement.

### Résumé

Mettre en place un Definition of Done formel intégrant des tests peut considérablement améliorer le développement Power BI. En documentant les résultats attendus dans un fichier Excel et en les validant avec des requêtes de test DAX Query, les équipes peuvent mesurer objectivement si un rapport répond aux exigences métier. Cette approche structurée **garantit la cohérence, renforce la confiance dans les rapports, et réduit considérablement les erreurs en production.**

### Conclusion

Bien que cet article se concentre sur les tests au sein de Power BI à l'aide de DAX Query View, il est essentiel de comprendre que **les tests de qualité des données doivent être menés tout au long du cycle de vie du projet**, de l'ingestion des données jusqu'à la diffusion finale des rapports. La méthodologie de test décrite ici couvre le périmètre du développeur Power BI, mais ne représente qu'une composante d'une stratégie globale de qualité des données.

Les organisations efficaces mettent en place des points de contrôle qualité à plusieurs étapes : lors de l'ingestion, de l'ETL (Extract Transform Load), du développement des pipelines de données, au sein du data warehouse / lakehouse, et enfin dans les rapports Power BI. Pour des implémentations avancées, envisagez d'explorer les pipelines CI/CD Azure avec des tests automatisés déclenchés par PR (Pull Request). Pour des conseils sur la mise en œuvre de ces techniques avancées, consultez notre section « Pour aller plus loin ». Chaque couche devrait disposer de mécanismes de test appropriés vérifiant l'intégrité des données, l'exactitude des transformations et la conformité aux règles métier.

En intégrant les tests sur l'ensemble du flux de données et en en faisant une composante essentielle de votre Definition of Done à chaque étape, vous créez une base solide pour une business intelligence fiable et digne de confiance, que les parties prenantes peuvent utiliser en toute confiance pour la prise de décision.

### Pour aller plus loin

- Excellente présentation détaillée du IOWA PBI User Group avec James Bartlett et Narayana Windenberger : https://www.youtube.com/live/PL7Xw2dvVrE?si=FJ7j7ZLtLiiWrKTl

- Blog de John Kerski : [DAX Query View Testing Pattern | John Kerski's Blog](https://www.kerski.tech/bringing-dataops-to-power-bi-part36/)

💬 Discutons-en : 
Partagez vos réflexions dans le post LinkedIn : nous aimerions vraiment poursuivre la discussion ! Post LinkedIn : [06 - Automated Testing in Power BI ](https://www.linkedin.com/posts/alexandru-badiu_powerbi-dataquality-automation-activity-7302650391723147264-sOIN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAd2rAYBtqG-2bVNWh14j0hOzgmbFYqs3hE)
