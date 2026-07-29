---
title: "Quel contenu inclure dans un Design Document – Modèle"
date: 2025-05-20
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/5394d34e-8b71-494e-8645-ca8a9e3cc046"
excerpt: "Quelles caractéristiques du modèle doivent être décrites dans un Design Document ?"
sourceFile: "15 - What content is in a Design Document - Model.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/15%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Model.md"
enSlug: "what-content-is-in-a-design-document-model"
---

**Quelles caractéristiques du modèle doivent être décrites dans un Design Document ?**

Le modèle de données est le cœur de tout rapport Power BI. Ce « back-end » ne reçoit souvent pas l'attention qu'il mérite, car consacrer du temps à des portions de la solution invisibles pour les consommateurs peut sembler un effort gaspillé : rien n'est plus faux. Vous serez récompensé de bien des façons si vous prenez soin de préparer votre modèle de données, notamment par :

- De meilleures performances
- Des calculs plus simples
- Des mises à niveau plus faciles (grâce à une meilleure compréhension du modèle existant et à une évaluation plus réaliste de l'impact et de l'effort requis pour les changements)

L'intention de la conception du modèle sémantique a été explorée dans des numéros précédents (#7 et #9).

<https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/07%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Data.md#semantic-model>

<https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/09%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Reports.md#semantic-model-specific>

Ce numéro traite plutôt de la conception réelle telle qu'implémentée dans le fichier Power BI.

> [!NOTE]
> *Alors que les sections du design document présentées jusqu'à présent reflètent l'intention de conception, le modèle implémenté (réel) est souvent présenté en annexes.*

## Général

### Staging

Avant d'entrer dans les détails du modèle, il convient de décrire la logique d'extraction et de transformation des données.

Les données doivent être extraites telles quelles (c'est-à-dire sans transformation) dans des tables de staging. Les tables de staging doivent en outre être clairement nommées comme telles, par exemple en ajoutant un préfixe « RAW ». Lorsque nécessaire, les tables de staging peuvent être fusionnées pour produire une table du modèle (par exemple, RAW Customers + RAW Addresses 🡪 Customers, etc.).
<br><br>
Table de staging : RAW Customers

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Customer ID | Integer | 1 | Clé primaire |
| 2 | Customer | Text | Dave |  |
| 3 | Address ID | Integer | 1 | Clé étrangère |

<br>

Table de staging : RAW Addresses

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Address ID | Integer | 1 | Clé primaire |
| 3 | City | Text | Ottawa |  |
| 4 | Country | Text | Canada |  |

<br>

Opération de transformation : fusionner les tables RAW Customers et RAW Addresses via Address ID (jointure externe gauche)

<br>

Table du modèle : Customers

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Customer ID | Integer | 1 | Clé primaire |
| 2 | Customer | Text | Dave |  |
| 3 | City | Text | Ottawa |  |
| 4 | Country | Text | Canada |  |

<br>

### Fonctions INFO VIEW

Les fonctions INFO VIEW peuvent être facilement exploitées pour extraire la conception implémentée. Une fois cette information consolidée en un seul endroit (oui, je sais que Power BI Desktop est déjà un seul endroit, mais l'information y est quelque peu dispersée et une vue « à 10 000 pieds » peut être difficile à obtenir), une vision « à vol d'oiseau » permet de repérer plus facilement les écarts.

À cette fin, les tables et colonnes, les relations et les mesures tels qu'implémentés doivent être rassemblés dans des tables de documentation.

*REMARQUE : la procédure utilisée pour exporter les données des tableaux suivants depuis Power BI Desktop a été la suivante :*

1. *Ouvrir DAX Query View et saisir la requête souhaitée*
2. *Cliquer sur le bouton « Run »*
3. *Cliquer sur le bouton « Copy » et sélectionner « Entire table »*
4. *Sélectionner plus de lignes que nécessaire dans la table du design document souhaitée et utiliser CTRL-V pour coller les données exportées*
5. *Supprimer la ligne d'en-tête ainsi que toute ligne vide ou dupliquée*
6. *Modifier les colonnes « ID » et « Notes » selon les besoins*
7. *Ajouter les données de la colonne « Sample » selon les besoins*

<br>

## Tables et colonnes

*Lister toutes les tables du modèle ; la requête suivante peut être utilisée dans DAX Query View depuis Power BI Desktop pour récupérer les données des tables :*

```dax
EVALUATE
VAR _Result =
  SELECTCOLUMNS(
    INFO.VIEW.TABLES(),
    "ID", [ID],
    "Name", [Name],
    "Category", [DataCategory],
    "Type", IF( ISBLANK([Expression]), "Normal", "Calculated" ),
    "Expression", [Expression],
    "Is Hidden", [IsHidden]
  )

RETURN
_Result
```

| **ID** | **Name** | **Category** | **Type** | **Expression** | **Is Hidden** |
| --- | --- | --- | --- | --- | --- |
| 1 | Key Measures | Regular | Normal |  | false |
| 2 | Dates | Time | Normal |  | false |
| 3 | Invoices | Regular | Normal |  | false |
| 4 | Customers | Regular | Normal |  | false |
| 5 | Last Refresh | Regular | Normal |  | true |
| 6 | Orders | Regular | Normal |  | false |
| 7 | Products | Regular | Normal |  | false |
| 8 | Regions | Regular | Normal |  | false |
| 9 | Aging | Regular | Calculated | SELECTCOLUMNS ( <br>GENERATESERIES ( 1, 6, 1 ), <br>"Aging ID", <br>[Value]<br> ) | true |

*Lister toutes les colonnes de chaque table ; la requête suivante peut être utilisée dans DAX Query View depuis Power BI Desktop pour récupérer les données des colonnes (ajuster la variable [_Table] selon les besoins) :*

```dax
EVALUATE
VAR _Table = "Dates"
VAR _Result =
  SELECTCOLUMNS(
    FILTER( INFO.VIEW.COLUMNS(), [Table] = _Table && [Type] IN {"Data", "Calculated"} ),
    "ID", [ID],
    "Name", [Name],
    "Type", IF( [DataType] = "True/False" , "Boolean", [DataType] ),
    // "Nulls", IF( [IsNullable] = TRUE(), "Yes", "No" ),
    "Sample", BLANK(),
    "Notes", COMBINEVALUES( " | ", IF( [IsKey] = TRUE(), "Primary Key", BLANK() ),
      IF( OR( [FormatString] = "0", [DataType] = "True/False" ), BLANK(), [FormatString] ), [Expression] )
  )

RETURN
_Result
```

### Fait

#### Invoices

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Invoice ID | Integer | 2401 | Clé primaire |
| 2 | Invoice Date | Date | January 31, 2024 | Long Date |
| 3 | Amount | Number | 371900 |  |
| 4 | Customer ID | Integer | 1 | Clé étrangère |
| 5 | Region ID | Integer | 1 | Clé étrangère |

#### Orders

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Order ID | Integer | 2407 | Clé primaire |
| 2 | Order Date | Date | July 17, 2024 | Long Date |
| 3 | Product ID | Integer | 5 | Clé étrangère |
| 4 | Quantity | Integer | 16 |  |
| 5 | Customer ID | Integer | 4 | Clé étrangère |
| 6 | Region ID | Integer | 6 | Clé étrangère |

### Dimension

#### Customers

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Customer ID | Integer | 1 | Clé primaire |
| 2 | Customer | Text | Dave |  |
| 3 | City | Text | Ottawa |  |
| 4 | Country | Text | Canada |  |

#### Products

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Product ID | Integer | 4 | Clé primaire |
| 2 | Product | Text | Shoes |  |
| 3 | Unit Price | Integer | 120 |  |
| 4 | Unit Cost | Integer | 110 |  |

#### Regions

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Region ID | Integer | 1 | Clé primaire |
| 2 | Region | Text | Canada |  |

#### Dates

*Une table de dates sera créée directement en code M dans Power BI. La table de dates doit couvrir toute la période d'intérêt avec des années civiles complètes et sera initialement créée pour une période de trois ans (soit du 2023-01-01 au 2025-12-31).*

La table [Dates] a été générée à l'aide de code Power Query/M provenant de l'Extended Date Table, conçue par Melissa de Korte, experte Enterprise DNA, l'une des (sinon la) meilleures tables de dates disponibles pour Power BI.<br>
https://forum.enterprisedna.co/t/extended-date-table-power-query-m-function/6390.

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Date | Date | 05-Feb-2025 | Clé primaire  dd-mmm-yyyy |
| 2 | Year | Integer | 2025 |  |
| 3 | Quarter Number | Integer | 1 |  |
| 4 | Quarter | Text | Q1 |  |
| 5 | Month | Integer | 2 |  |
| 6 | Month & Year | Text | Feb 2025 |  |
| 7 | MonthnYear | Integer | 202502 |  |
| 8 | Month Name | Text | February |  |
| 9 | Month Short | Text | Feb |  |
| 10 | Month Initial | Text | F |  |
| 11 | Day of Month | Integer | 5 |  |
| 12 | Day of Week Number | Integer | 2 |  |
| 13 | Day of Week Name | Text | Wednesday |  |
| 14 | Day of Week Initial | Text | W |  |
| 15 | DateInt | Integer | 20250205 |  |
| 16 | IsAfterToday | Boolean | True |  |
| 17 | IsWeekDay | Boolean | True |  |
| 18 | Day Type | Text | Weekday |  |
| 19 | Fiscal Year | Text | FY2025 |  |
| 20 | Fiscal Quarter | Text | FQ4 2025 |  |
| 21 | FQuarternYear | Integer | 20254 |  |
| 22 | Fiscal Period | Text | FP11 2025 |  |
| 23 | FPeriodnYear | Integer | 202511 |  |
| 24 | IsCurrentFY | Boolean | True |  |
| 25 | IsCurrentFQ | Boolean | True |  |
| 26 | IsCurrentFP | Boolean | False |  |
| 27 | IsPYTD | Boolean | False |  |
| 28 | IsPFYTD | Boolean | False |  |

### Support

#### Aging

Il s'agit d'une table calculée qui reflète les tranches d'ancienneté des factures utilisées par l'organisation.

```dax
Aging = SELECTCOLUMNS ( GENERATESERIES ( 1, 6, 1 ), "Aging ID", [Value] )
```

| **ID** | **Name** | **Type** | **DAX Expression** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Aging ID | Integer | (voir l'expression de création de table ci-dessus) | Clé primaire |
| 2 | Aging | Text | SWITCH(TRUE(),<br>  [Aging ID] = 1, "0-30 days",<br>  [Aging ID] = 2, "31-60 days",<br>  [Aging ID] = 3, "61-90 days",<br>  [Aging ID] = 4, "91-120 days",<br>  [Aging ID] = 5, "121-180 days",<br>  [Aging ID] = 6, "over 180 days",<br>  "ERROR") |  |
| 3 | Min | Integer | SWITCH(TRUE(),<br>  [Aging ID] = 1, 0,<br>  [Aging ID] = 2, 31,<br>  [Aging ID] = 3, 61,<br>  [Aging ID] = 4, 91,<br>  [Aging ID] = 5, 121,<br>  [Aging ID] = 6, 181,<br>  -1) |  |
| 4 | Max | Integer | SWITCH(TRUE(),<br>  [Aging ID] = 1, 30,<br>  [Aging ID] = 2, 60,<br>  [Aging ID] = 3, 90,<br>  [Aging ID] = 4, 120,<br>  [Aging ID] = 5, 180,<br>  [Aging ID] = 6, 9999,<br>  -1) |  |

#### Tiers

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Tier ID | Integer | 1 | Clé primaire |
| 2 | Tier | Text | Gold |  |
| 3 | Lower Bound | Integer | 10,000,000 |  |
| 4 | Upper Bound | Integer | 9,999,999,999 |  |

#### Last Refresh

Il n'y a pas de source de données pour cette table ; elle a plutôt été générée à l'aide de code Power Query/M par Melissa de Korte, experte Enterprise DNA :
https://forum.enterprisedna.co/t/adding-a-last-refresh-date-to-your-report/6485

Cette table est une table de support utilisée par la mesure [Last Refresh].

```m
let
  Source = DateTime.FixedLocalNow(),
  #"Converted to Table" = #table(1, {{Source}}),
  #"Renamed Columns" = Table.RenameColumns(#"Converted to Table", {{"Column1", "Last Refresh"}}),
  #"Changed Type" = Table.TransformColumnTypes(#"Renamed Columns", {{"Last Refresh", type datetime}}),
  #"Inserted Date" = Table.AddColumn(#"Changed Type", "Date", each DateTime.Date([Last Refresh]), type date),
  #"Insert Time" = Table.AddColumn(#"Inserted Date", "Time", each DateTime.Time([Last Refresh]), type time)

in
  #"Insert Time"
```

| **ID** | **Name** | **Type** | **Sample** | **Notes** |
| --- | --- | --- | --- | --- |
| 1 | Last Refresh | Date | 2024-12-05 1:19.22 | General Date |
| 2 | Date | Date | December 5, 2024 | Long Date |
| 3 | Time | Date | 1:19.22 PM | Long Time |

<br>

## Relations

*Lister toutes les relations du modèle ; la requête suivante peut être utilisée dans DAX Query View depuis Power BI pour récupérer le détail des relations :*

```dax
EVALUATE
VAR _Result =
  SELECTCOLUMNS(
    INFO.VIEW.RELATIONSHIPS(),
    "ID", [ID],
    // "Relationship", [Relationship],
    "From", [FromTable] & "[" & [FromColumn] & "]",
    "To", [ToTable] & "[" & [ToColumn] & "]",
    "Cardinality", [FromCardinality] & "-to-" & [ToCardinality],
    "Cross-filter Direction", SWITCH( TRUE(),
        [CrossFilteringBehavior] = "OneDirection", "Single",
        [CrossFilteringBehavior] = "BothDirections", "Both",
        [CrossFilteringBehavior] ),
    "Status", IF( [IsActive] = TRUE(), "Active", "Inactive" )
  )

RETURN
_Result
```

| **ID** | **From** | **To** | **Cardinality** | **Cross-Filter Direction** | **Status** |
| --- | --- | --- | --- | --- | --- |
| 1 | Invoices[Customer ID] | Customers[Customer ID] | Many-to-One | Single | Active |
| 2 | Invoices[Invoice Date] | Dates[Date] | Many-to-One | Single | Active |
| 3 | Orders[Order Date] | Dates[Date] | Many-to-One | Single | Active |
| 4 | Orders[Product ID] | Products[Product ID] | Many-to-One | Single | Active |
| 5 | Orders[Region ID] | Regions[Region ID] | Many-to-One | Single | Active |
| 6 | Orders[Customer ID] | Customers[Customer ID] | Many-to-One | Single | Active |

<br>

## Mesures

Une table **Key Measures** saisie manuellement a été ajoutée, ainsi que diverses mesures.

*Pour formater toutes les mesures d'un modèle Power BI :*

1. *Ouvrir [Power BI Desktop] et le fichier PBIX concerné*
2. *Ouvrir l'outil externe [Tabular Editor V2] (version 2.13 ou supérieure)*
3. *Sélectionner l'onglet [C# Script]*
4. *Saisir ce qui suit dans la fenêtre C# Script, puis cliquer sur le bouton [Run]*

```
bool shortFormat = false;
bool skipSpaceAfterFunctionName = true;
FormatDax(Model.AllMeasures, shortFormat, skipSpaceAfterFunctionName);
```

*Méthode :*

*Lister toutes les mesures du modèle ; la requête suivante peut être utilisée dans DAX Query View depuis Power BI pour récupérer les noms et expressions des mesures :*

```dax
EVALUATE
VAR _Result =
  SELECTCOLUMNS(
    INFO.VIEW.MEASURES(),
    "Documentation", [Name] & " = " & [Expression]
  )

RETURN
_Result
```

*Méthode alternative 1 (DAX Studio) : pour lister toutes les mesures d'un modèle Power BI :*

1. *Ouvrir [Power BI Desktop] et le fichier PBIX concerné*
2. *Ouvrir l'outil externe [DAX Studio]*
3. *Faire un clic droit sur n'importe quelle table dans l'onglet [Metadata] du panneau [Query] et sélectionner [Define All Measures (All Tables)]*

*Méthode alternative 2 (TMDL) : pour lister toutes les mesures d'un modèle Power BI (y compris les format strings) :*

1. *Ouvrir [Power BI Desktop] et le fichier PBIX concerné*
2. *Dans la barre latérale gauche, sélectionner [TMDL View]*
3. *Glisser la table souhaitée (contenant les mesures) dans la fenêtre TMDL*
4. *Supprimer les lignes non désirées (createOrReplace, table, lineageTag, partition, annotation)*

```dax
Total Sales = SUMX( Orders, Orders[Quantity] * RELATED( Products[Unit Price] ) )

Total Costs = SUMX( Orders, Orders[Quantity] * RELATED( Products[Unit Cost] ) )

Total Profit = [Total Sales] - [Total Costs]

Profit % = DIVIDE( [Total Profit], [Total Sales], 0 )
```

## Ressources

*Publications LinkedIn*

Les publications LinkedIn couvrant le design document sont listées ci-dessous : <br>
[1. Général et périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Flux de travail, enjeux et règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>
[3. Data](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>
[4. Reports](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>
[5. Validation](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7317852256215662593-MvcI) <br>
[6. Déploiement](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7322931000085295104-BIIF) <br>
[7. Modèle](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7330534859825639427-JRdN) <br>

*Exemples*

Des fragments de documents exemples couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1. Design Document - Sample Fragment 01 - General and Scope](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Design Document - Sample Fragment 02 - Workflow, Issues, and Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Design Document - Sample Fragment 03 - Data](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
[4. Design Document - Sample Fragment 04 - Reports](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2004%20-%20Reports%20-%20V0.4.docx) <br>
[5a. Design Document - Sample Fragment 05 - Validation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2005%20-%20Validation%20-%20V0.5.docx) <br>
[5b. Design Document - Sample Validation Spreadsheet](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Validation%20Spreadsheet%20-%20V0.5.xlsx) <br>
[6. Design Document - Sample Fragment 06 - Deployment](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2006%20-%20Deployment%20-%20V0.6.docx) <br>
[7a. Design Document - Sample Fragment 07 - Model](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2007%20-%20Model%20-%20V0.7.docx) <br>
[7b. Design Document - Sample Power BI File](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Power%20BI%20File.pbix) <br>
