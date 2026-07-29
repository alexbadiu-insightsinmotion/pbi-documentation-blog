---
title: "Quel contenu doit figurer dans un Design Document - Déploiement"
date: 2025-04-29
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/2fc92e49-5e63-49da-a877-e93b33c63606"
excerpt: "Quelles caractéristiques de déploiement doivent être décrites dans un Design Document ?"
sourceFile: "13 - What content is in a Design Document - Deployment.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/13%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Deployment.md"
enSlug: "what-content-is-in-a-design-document-deployment"
---

**Quelles caractéristiques de déploiement doivent être décrites dans un Design Document ?**

Jusqu'à présent, le design document s'est concentré sur les caractéristiques du processus de développement du rapport. Une fois le développement et la validation terminés (pour une itération), le rapport est déployé en ligne afin de pouvoir être partagé. Que le moyen de partage final soit un accès direct depuis un workspace Power BI ou un accès indirect via une Power BI app, le rapport doit être publié dans un workspace Power BI. Deux méthodes classiques de déploiement d'un rapport Power BI vers un workspace Power BI seront décrites ici : le déploiement manuel et l'utilisation des deployment pipelines.

> [!NOTE]  
> Il existe des fonctionnalités en préversion dans Power BI Desktop (*à la date de la version de mars 2025 ; je ne sais pas exactement quand elles ont été introduites pour la première fois)* qui permettent une ***publication sans publication (no-publish publishing)*** grâce à l'intégration avec OneDrive et SharePoint, mais cette méthode de publication dépasse le cadre de cette discussion et ne sera pas développée davantage ici. Pour plus d'informations, de nombreuses ressources en ligne sont disponibles, y compris une vidéo de *Guy in a Cube* : <https://www.youtube.com/watch?v=FtsYYZpH6S4>

<img width="748" alt="13 - Image - OneDrive and SharePoint" src="https://github.com/user-attachments/assets/525b7ac9-ce89-422d-bfe1-5127403cf2b5" />

## Paramètres

Quelle que soit la méthode de déploiement, pour faciliter le processus de déploiement, les fichiers Power BI doivent être configurés avec des paramètres pour les sources de données (par exemple, fichier : nom du dossier, nom du fichier ; base de données : nom du serveur, nom de la base de données ; etc.). Le même fichier Power BI peut alors être déployé vers chaque environnement, et, dans chacun d'eux, les paramètres peuvent être modifiés selon les besoins dans le Power BI Service.

Attribuez un ID et un nom (court) à chaque paramètre utilisé, ainsi que des notes pour chaque environnement.

*L'exemple suivant utilise trois environnements (développement, test et production [ou DEV, TEST et PROD]) et SharePoint (SP) comme emplacements d'accès aux données.*

| ***ID*** | ***Nom*** | ***DEV*** | ***TEST*** | ***PROD*** |
| --- | --- | --- | --- | --- |
| *P-1* | *Invoices SP Folder name* | *Invoicing\_DEV* | *Invoicing\_TEST* | *Invoicing* |
| *P-2* | *Invoices SP File name* | *Invoices.xlsx* | *Invoices.xlsx* | *Invoices.xlsx* |
| *P-3* | *Customers SP Folder name* | *Customers\_DEV* | *Customers\_TEST* | *Customers* |
| *P-4* | *Customers SP File name* | *Customers.xlsx* | *Customers.xlsx* | *Customers.xlsx* |

## Déploiement manuel

Les artefacts Power BI (fichiers PBIX) peuvent facilement être publiés dans le Power BI Service depuis Power BI Desktop. La personne qui publie a un contrôle total sur la sélection des artefacts.

> [!WARNING]  
> *Il est possible (bien que non recommandé) de créer des versions personnalisées pour chaque environnement (par exemple, identifiants, sources de données, filtres, etc.). Dans un environnement à 3 niveaux, cela représenterait 3 versions distinctes, chacune adaptée à l'environnement cible spécifique. Si une telle méthode est utilisée, il incombe alors à la personne qui publie (souvent le développeur) de veiller à ce que le bon fichier PBIX soit utilisé à chaque instance de publication.*

> [!NOTE]  
> *Il est bien préférable d'utiliser le même fichier PBIX pour tous les environnements, puis d'apporter les modifications nécessaires aux sources de données et aux identifiants dans le Power BI Service après la publication.*

De nombreuses ressources sont disponibles concernant l'utilisation de Power BI Desktop pour publier des artefacts dans le Power BI Service, mais voici un exemple simple de déploiement à 3 niveaux :

- Créer les artefacts DEV dans Power BI Desktop en utilisant les sources de données et identifiants DEV
- Créer les workspaces DEV, TEST et PROD
- Publier les artefacts dans le workspace DEV
- Publier les artefacts dans le workspace TEST
- Définir manuellement les sources de données et les identifiants dans le workspace TEST
- Définir manuellement les paramètres dans le workspace TEST
- Actualiser manuellement les données dans le workspace TEST
- Terminer la validation dans le workspace TEST
- Publier les artefacts dans le workspace PROD
- Définir manuellement les sources de données et les identifiants dans le workspace PROD
- Définir manuellement les paramètres dans le workspace PROD
- Actualiser manuellement les données dans le workspace PROD
- Définir manuellement la fréquence d'actualisation des données dans le workspace PROD
- S'assurer que la propriété correcte des modèles sémantiques est établie dans le workspace PROD
- S'assurer que l'accès au workspace est correctement restreint pour protéger les actifs PROD

Ces étapes sont nécessaires, que le déploiement soit réalisé par les développeurs ou par d'autres personnes. Dans de nombreuses organisations, les développeurs ne peuvent publier que dans l'environnement DEV, et d'autres personnes autorisées sont responsables de toute publication vers les environnements TEST et PROD.

## Deployment Pipelines

L'utilisation d'un deployment pipeline dans Power BI limite la publication manuelle des artefacts via Power BI Desktop à une seule instance, à savoir la publication initiale vers l'environnement DEV ; les déploiements supplémentaires vers les environnements en aval ne nécessitent plus Power BI Desktop mais sont réalisés via le pipeline dans le Power BI Service.

Pour tirer pleinement parti des deployment pipelines, les paramètres utilisés (comme décrit ci-dessus) peuvent être intégrés directement dans le deployment pipeline lui-même, et la bonne définition de ces valeurs lors du déploiement peut ensuite être facilement confirmée dans le Power BI Service.

> *La configuration et l'utilisation des deployment pipelines dépendent de la licence disponible. Mon expérience actuelle avec les licences est assez limitée, mais je crois comprendre qu'une licence Power BI Premium ou Power BI Premium-Per-User (PPU) est requise pour utiliser les deployment pipelines. (Au moment de la rédaction de cet article, une licence Power BI Pro était utilisée, mais un Fabric Trial venait d'être accordé par Microsoft, donc je ne sais pas si Pro peut être utilisé ou si une licence Premium ou Fabric est nécessaire. Quoi qu'il en soit, le processus est le même, donc je terminerai ici la discussion sur les licences.)*
> *De plus, pendant les recherches menées pour cet article, il a été annoncé en mars 2025 que les licences Power BI Premium seraient retirées et que des licences Fabric équivalentes seraient disponibles. Microsoft a publié des détails (et, j'en suis sûr, en publiera bien d'autres) dans cet article :*
> [*https://powerbi.microsoft.com/en-us/blog/important-update-coming-to-power-bi-premium-licensing/*](https://powerbi.microsoft.com/en-us/blog/important-update-coming-to-power-bi-premium-licensing/)

> [!WARNING]  
> *Il est possible (bien que non recommandé) d'utiliser un deployment pipeline pour déplacer les artefacts Power BI, puis de mettre à jour manuellement le modèle déployé dans le Power BI Service avec les modifications nécessaires des sources de données.*

> [!NOTE]  
> *Il est bien préférable d'utiliser des paramètres de source de données dans le fichier PBIX et de définir des règles directement dans le deployment pipeline lui-même, de sorte qu'une intervention manuelle ne soit nécessaire qu'une seule fois, lors de la configuration initiale du pipeline, plutôt qu'après chaque itération d'exécution.*

De nombreuses ressources sont disponibles concernant la configuration et l'utilisation des deployment pipelines, mais voici un exemple simple de déploiement à 3 niveaux (3 stages) :

- Créer les artefacts DEV dans Power BI Desktop en utilisant les sources de données et identifiants DEV
- Créer les workspaces DEV, TEST et PROD
- Publier les artefacts dans le workspace DEV via Power BI Desktop
- Créer le pipeline avec les stages DEV, TEST et PROD
- Attribuer les workspaces DEV, TEST et PROD aux stages
- Sélectionner les artefacts dans le stage DEV et les déployer vers le stage TEST
- Définir les règles (paramètres) dans le stage TEST
- Définir les sources de données et les identifiants dans le workspace TEST
- Actualiser manuellement les données dans le workspace TEST
- Terminer la validation dans l'environnement TEST
- Sélectionner les artefacts dans le stage TEST et les déployer vers le stage PROD
- Définir les règles (paramètres) dans le stage PROD
- Définir les sources de données et les identifiants dans le workspace PROD
- Actualiser manuellement les données dans le workspace PROD
- Définir manuellement la fréquence d'actualisation des données dans le workspace PROD
- S'assurer que la propriété correcte des modèles sémantiques est établie dans le workspace PROD
- S'assurer que l'accès au workspace est correctement restreint pour protéger les actifs PROD

## Procédure

Quelle que soit la méthode de déploiement, il est essentiel de disposer d'une procédure reproductible, écrite et validée par signature. De plus, la procédure doit être mise à jour après chaque déploiement afin que les ajustements nécessaires (les enseignements tirés) soient consignés, ce qui rendra les déploiements futurs plus fluides et plus simples.

Attribuez un ID séquentiel et un nom (court) à chaque étape de la procédure de déploiement, ainsi que les notes requises, la valeur finale spécifique et la date à laquelle l'étape a été réalisée (et par qui).

*NOTE*

*La méthode du deployment pipeline sera utilisée dans l'exemple suivant.*

| ***ID*** | ***Nom*** | ***Notes*** | ***Valeur*** | ***Réalisation & Signature*** |
| --- | --- | --- | --- | --- |
| *S-1* | *Environment* | *The target environment* | *PROD* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-2* | *Publish Target Data* | *Target data has been published to the access location* | *SharePoint Folder:*  <br>*\Corporate\Invoicing*  <br>*File names: <br>various* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-3* | *Publish Power BI file* | *Source PBIX has been published to the source Power BI Workspace* | *AR01 - All Invoices* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-4* | *Set Rule/Parameter (Invoices SP Folder name)* | *(as many lines as necessary for 1 per rule/parameter; <br>only 1 shown here for illustrative purposes)* | *Invoicing* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-5* | *Select Artifacts in Source* | *All that will be deployed in this iteration* | *Report:*  <br>*AR01 - All Invoices*  <br>*Semantic Model:*  <br>*AR01 - All Invoices* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-6* | *Deploy* | *From the source environment to the target environment* | *TEST to PROD* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-7* | *Verify Artifacts in Target* | *In Power BI Service*  <br>*All that should have been deployed in this iteration* | *n/a* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-8* | *Verify Data Source Credentials on target* | *In Power BI Service* | *n/a* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-9* | *Verify Security on target* | *In Power BI Service*  <br>*Credentials/access on workspace and/or report and/or app* | *n/a* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-10* | *Verify Parameter (Invoices SP Folder name)* | *(as many lines as necessary for 1 per rule/parameter; <br>only 1 shown here for illustrative purposes)* | *Invoicing* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-11* | *Verify Data Refresh* | *In Power BI Service*  *Manually refresh the data to confirm access* | *n/a* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-12* | *Set Data Refresh Schedule* | *In Power BI Service* | *Daily at <br>2:00 AM UTC* | *Date: 2025-03-29*  <br>*By: Greg Philps* |
| *S-13* | *Verify Deployment* | *In Power BI Service*  *Conduct smoke testing to confirm the <br>basic operation of the report(s)* | *n/a* | *Date: 2025-03-29*  <br>*By: Greg Philps* |

## Ressources

*Publications LinkedIn*

Les publications LinkedIn couvrant le design document sont listées ci-dessous : <br>
[1. Général et périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Flux de travail, problèmes et règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>
[3. Données](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>
[4. Rapports](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>
[5. Validation](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7317852256215662593-MvcI) <br>
[6. Déploiement](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7322931000085295104-BIIF) <br>

*Échantillons*

Des fragments d'exemple de documents couvrant des sections spécifiques sont disponibles dans le repo GitHub : <br>

[1. Design Document - Sample Fragment 01 - General and Scope](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Design Document - Sample Fragment 02 - Workflow, Issues, and Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Design Document - Sample Fragment 03 - Data](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
[4. Design Document - Sample Fragment 04 - Reports](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2004%20-%20Reports%20-%20V0.4.docx) <br>
[5a. Design Document - Sample Fragment 05 - Validation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2005%20-%20Validation%20-%20V0.5.docx) <br>
[5b. Design Document - Sample Validation Spreadsheet](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Validation%20Spreadsheet%20-%20V0.5.xlsx) <br>
[6. Design Document - Sample Fragment 06 - Deployment](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2006%20-%20Deployment%20-%20V0.6.docx)
