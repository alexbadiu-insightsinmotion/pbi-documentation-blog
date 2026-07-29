---
title: "Quel contenu figure dans un Design Document - Résumé"
date: 2025-06-10
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/c7269671-0b88-481b-8739-ff3078ae450f"
excerpt: "Quel est le résumé des principaux points de contenu d'un Design Document ? Tout au long de cette série, de nombreux points ont été abordés dans chacune des grandes sections du design document Powe..."
sourceFile: "16 - What content is in a Design Document - Summary.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/16%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Summary.md"
enSlug: "what-content-is-in-a-design-document-summary"
---

![16 - Image - Title - Summary](https://github.com/user-attachments/assets/07269e54-ca4d-4647-99b0-fa8d9e30f425)

**Quel est le résumé des principaux points de contenu d'un Design Document ?**

Tout au long de cette série, de nombreux points ont été abordés dans chacune des grandes sections du design document Power BI, et avec ce numéro, j'aimerais lister mes principaux points personnels pour chaque section. Alors, c'est parti :

## Général

Le design document est un document « **_vivant_** » (il sera mis à jour tout au long des périodes de conception, de test et d'utilisation en production), donc incrémentez la version à chaque itération. Utilisez un format et un emplacement de stockage courants dans votre organisation, accessibles à toutes les parties prenantes (afin qu'elles puissent facilement \[et constamment\] le retrouver et le consulter), et disposant d'un contrôle de version.

## Périmètre (Scope)

Soyez précis sur tous les éléments du périmètre, et listez-les en trois sections : ceux qui seront inclus, ceux qui seront exclus, et ceux qui seront reportés à une itération ultérieure.

> [!NOTE]  
> *Note de conception : vous pouvez réduire la dérive du périmètre (« scope creep ») en étant impitoyable à la fois sur la priorité et sur le périmètre (excluez tout ce que vous pouvez, reportez tout ce que vous pouvez). N'incluez que les éléments essentiels et de haute priorité.*<br><br>
> *« Si tout est prioritaire, alors rien n'est prioritaire »*

## Workflow

Incluez un organigramme de workflow simple (avec des couloirs/« swim lanes ») pour la source des données (c'est-à-dire depuis les systèmes opérationnels), l'emplacement d'accès intermédiaire aux données (par exemple, SharePoint, etc.), et le Power BI Service (avec des couloirs pour les tables de staging, les tables transformées, et le modèle et les rapports dans le workspace Power BI).

## Problèmes (Issues)

Listez chaque problème rencontré pendant le développement, en incluant l'historique complet des décisions pour chaque niveau de statut (par exemple, NOUVEAU, CRITIQUE, NOTE, EN COURS, RÉSOLU, REPORTÉ, etc.). Ajoutez, ne modifiez pas.

## Règles métier (Business Rules)

Documentez les règles métier afin que les développeurs, les testeurs et les utilisateurs mesurent la même chose ; cela permettra d'éviter les « erreurs non forcées ». Utilisez un statut pour enregistrer toute activité ainsi que le niveau de statut d'approbation correspondant (par exemple, NOUVEAU, BROUILLON, DISCUSSION, RÉVISÉ, APPROUVÉ (par qui), etc.)

## Données (Data)

Décrivez intégralement tous les environnements qui seront utilisés dans le projet (par exemple, DEV, TEST, PROD, etc.).

> [!NOTE]  
> *« Tout le monde a un environnement TEST ; certains ont la chance d'avoir aussi un environnement PROD »*

Listez chaque source de données, décrivez ses identifiants d'accès, et notez son statut (par exemple, EXISTANTE, NOUVELLE, EN DÉVELOPPEMENT, APPROUVÉE (par qui), VÉRIFIÉE (par qui), etc.) ainsi que la date.

> [!NOTE]  
> *Note de conception : utilisez des comptes système/principaux de service, pas des comptes personnels.*

Réduisez le volume de données (lignes x colonnes) autant que possible pour chaque rapport.

> [!NOTE]  
> *« Réduisez le volume de données autant que possible en agrégeant le plus en amont possible »*<br><br>
> *« Il n'y a aucun bénéfice à transférer des données que vous n'allez pas utiliser »*

## Rapports (Reports)

Incluez un en-tête (avec le titre et la date du dernier rafraîchissement des données) et un pied de page (avec l'ID du rapport et la version [mise à jour à chaque itération]) sur chaque page.

> [!NOTE]  
> *Note de conception : utilisez un thème standard, des filtres cohérents, et une navigation familière (votre première option devrait être la navigation intégrée fournie par les Power BI Apps).*

## Validation

Consignez les tests d'acceptation manuels dans un tableau (ID, groupe, nom, notes, priorité, résultats attendus, tolérance/variance autorisée, étapes de préparation, étapes de procédure, résultats réels, étapes de nettoyage, date, réalisé par, et statut).

> [!NOTE]  
> *Note de conception : fournissez les tests d'acceptation aux développeurs le plus tôt possible pendant la période de développement, chaque cas décrivant un scénario et le comportement attendu, y compris les chemins normaux, alternatifs et d'exception le cas échéant.*
<br><br>
> *Les tests d'acceptation devraient être réalisés par des personnes différentes des développeurs.*
<br><br>
> *Les tests ne sont pas « **_terminés_** » lorsqu'un rapport est déployé en environnement de production ; il convient plutôt de mener une surveillance régulière et continue pour confirmer que le rapport fonctionne comme prévu (par exemple, rafraîchissement des données, fonctionnalité, accès, etc.).*

## Déploiement (Deployment)

Suivez une procédure écrite pour chaque déploiement, faites-la signer après chaque réalisation, et intégrez toutes les « **_leçons apprises_** » pour rendre les futurs déploiements plus fluides et plus faciles.

> [!NOTE]  
> *Note de conception : utilisez des paramètres de source de données et déployez le même fichier PBIX vers chaque environnement ; ajustez les paramètres dans les pipelines de déploiement ou dans le Power BI Service selon les besoins.*
<br><br>
> *Utilisez les pipelines de déploiement comme premier choix (si la licence le permet) pour des déploiements itératifs et reproductibles. N'utilisez le déploiement manuel qu'en cas de nécessité.*
<br><br>
> *Un déploiement n'est pas « **_terminé_** » simplement parce qu'il s'est achevé sans erreur. Utilisez des tests de fumée (« smoke testing ») pour confirmer l'accès et la fonctionnalité de base.*

## Modèle (Model)

Extrayez les données telles quelles dans des tables de staging clairement nommées. Référencez, fusionnez, ou ajoutez ces tables de staging avant d'appliquer les transformations nécessaires pour créer les tables du modèle.

Utilisez les fonctions DAX INFO VIEW pour extraire le modèle (tables, colonnes, relations, mesures) tel qu'implémenté et regrouper le tout dans des tables de documentation.

> [!NOTE]  
> *Note de conception : utilisez une table de dimension \[Dates\] unique, standard et conforme aux bonnes pratiques (et marquez-la comme telle). Voici un excellent exemple Power Query/M par l'experte Enterprise DNA Melissa de Korte :*
<br><br>
> <https://forum.enterprisedna.co/t/extended-date-table-power-query-m-function/6390>

> [!NOTE]  
> *Note de conception : utilisez une table de support \[Dernier rafraîchissement\]. Voici un excellent exemple Power Query/M par l'experte Enterprise DNA Melissa de Korte :*
<br><br>
> <https://forum.enterprisedna.co/t/adding-a-last-refresh-date-to-your-report/6485>

## Ressources (Resources)

*Publications LinkedIn*

Les publications LinkedIn couvrant le design document sont listées ci-dessous : <br>
[1. Général et Périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Workflow, Problèmes, et Règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>
[3. Données](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>
[4. Rapports](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>
[5. Validation](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7317852256215662593-MvcI) <br>
[6. Déploiement](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7322931000085295104-BIIF) <br>
[7. Modèle](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7330534859825639427-JRdN) <br>
[8. Résumé](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>

*Exemples*

Des fragments de documents exemples couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1, Design Document - Sample Fragment 01 - General and Scope](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Design Document - Sample Fragment 02 - Workflow, Issues, and Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Design Document - Sample Fragment 03 - Data](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
[4. Design Document - Sample Fragment 04 - Reports](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2004%20-%20Reports%20-%20V0.4.docx) <br>
[5a. Design Document - Sample Fragment 05 - Validation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2005%20-%20Validation%20-%20V0.5.docx) <br>
[5b. Design Document - Sample Validation Spreadsheet](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Validation%20Spreadsheet%20-%20V0.5.xlsx) <br>
[6. Design Document - Sample Fragment 06 - Deployment](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2006%20-%20Deployment%20-%20V0.6.docx) <br>
[7a. Design Document - Sample Fragment 07 - Model](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2007%20-%20Model%20-%20V0.7.docx) <br>
[7b. Design Document - Sample Power BI File](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Power%20BI%20File.pbix) <br>
