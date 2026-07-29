---
title: "Quel contenu inclure dans un document de conception - Généralités et périmètre"
date: 2025-02-11
tag: "designdocument"
author: "Greg Philps"
cover: "https://github.com/user-attachments/assets/8cc575b1-04a8-4c1d-bf23-3ef29b56847d"
excerpt: "Quel contenu inclure dans un document de conception ? Beaucoup voient la documentation comme un frein au développement agile et itératif. C'est loin d'être la vérité..."
sourceFile: "03 - What content is in a Design Document - General and Scope.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/03%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20General%20and%20Scope.md"
enSlug: "what-content-is-in-a-design-document-general-and-scope"
---

**Quel contenu inclure dans un document de conception ?**

Beaucoup voient la documentation comme un frein au développement agile et itératif, qui ne servirait qu'à ralentir le projet. Rien n'est plus éloigné de la vérité : la documentation accélère en réalité le développement ! Non seulement elle aide à prévenir la dérive du périmètre (scope creep) et à réduire les écarts d'attentes, mais avec un projet bien défini et une source unique de vérité pour les fonctionnalités, le comportement, la performance, les audiences, la sécurité, les décisions de conception et les critères de validation, tout le monde y gagne.

Il y a probablement d'autres personnes qui ne partagent pas cet avis, mais **Alex Badiu** et moi estimons que l'effort consacré à la documentation Power BI en vaut largement la peine, et comme c'est le sujet de cette série, nous allons continuer.

Avant de commencer, assurez-vous que toutes les parties prenantes peuvent facilement se référer au document de conception :
- Utilisez un document unique
- Utilisez un format commun (par ex., Microsoft Word, etc.) pour garantir que le contenu peut être facilement lu
- Utilisez un emplacement commun (par ex., SharePoint, etc.) pour garantir que le contenu peut être facilement trouvé/accédé

Le document de conception n'est pas utile uniquement pendant le développement (c'est-à-dire un exercice « one-and-done »), mais c'est un document vivant. Mettez à jour le contenu au besoin pour refléter l'état des rapports au fil du temps, à mesure qu'ils sont utilisés en production. (Le document de conception peut également constituer une ressource précieuse pour les personnes travaillant sur de futurs projets.)

**Résumé**

Le contenu d'un document de conception peut lui-même être regroupé en plusieurs grandes sections, notamment :
- Généralités (identification, historique des versions, acronymes/abréviations/définitions, table des matières, introduction)
- Périmètre (inclus, exclu, différé)
- Flux de travail (Workflow)
- Problèmes (résolus, différés/connus)
- Règles métier (calculs, filtres, performance, audiences, sécurité)
- Sources de données (filtres, fréquences de rafraîchissement, agrégations, identifiants, environnements [par ex., DEV, TEST, PROD], flux de travail, passerelles, certification)
- Éléments communs des rapports (navigation, couleurs, polices, images, thème, en-tête, pied de page, ombre, etc.)
- Éléments spécifiques des rapports (pages, visuels, segments/slicers, infobulles)
- Validation (critères de conception, critères de tests de recette, résultats des tests)
- Déploiement (groupe/personnes responsables, procédure, tests de fumée)
- Modèle (tables, relations, mesures)

Les deux premières sections sont traitées ci-dessous, et les sections restantes seront couvertes dans les prochains numéros.

## Généralités

Il existe plusieurs éléments généraux, notamment :

**Identification**

Il est important (pour toute documentation, pas seulement celle de Power BI) que les utilisateurs sachent toujours exactement ce qu'ils regardent. Alors, même si cela va sans dire, je vais tout de même le dire :
- Incluez une page de titre avec le titre du document, l'auteur, la version et la date de version
- Incluez un en-tête de page sur chaque page avec le titre du document
- Incluez un pied de page sur chaque page avec la version, le numéro de page et le nombre total de pages

Il n'est pas rare que les utilisateurs fassent une capture d'écran ou exportent (par exemple, en PDF) une page pour la partager avec d'autres. Le fait d'avoir des informations d'identification sur chaque page permet d'évaluer facilement si le contenu est « à jour ».

**Historique des versions**

Chaque itération du document de conception devrait avoir un numéro de version incrémenté et une date de version. La numérotation des versions améliore la communication en garantissant que tous les participants utilisent la bonne référence.

Le numéro de version devrait également être référencé dans chaque note de fonctionnalité ou de test afin de permettre une comparaison appropriée.

**Terminologie**

Un autre obstacle courant à la communication sur un projet Power BI est une divergence d'opinion sur la signification de divers termes. Il est donc utile d'inclure un tableau des acronymes, abréviations et définitions auquel toutes les parties prenantes peuvent se référer à toutes les étapes du projet (par ex., collecte des exigences, développement, tests de recette, déploiement, etc.). Veillez à inclure toutes les descriptions corporatives et techniques (même celles couramment utilisées dans l'environnement métier) afin que tous les niveaux de parties prenantes aient la même compréhension.

**Table des matières**

Une table des matières peut accélérer la navigation dans le document de conception lorsque le volet est activé.

<img width="1119" alt="03 - Image - Navigation Pane" src="https://github.com/user-attachments/assets/fb20d524-5a03-492f-b151-5cde892a869c" />

**Introduction**

Incluez une introduction générale au projet ainsi que les principales fonctionnalités, filtres, audiences et exigences de performance.

Voici un exemple :

*Le projet produira 4 rapports Power BI pour surveiller le processus de facturation. Les données seront extraites automatiquement du système de facturation corporatif et déposées automatiquement dans un dossier dédié du système de gestion documentaire, sur une base quotidienne. Le service Power BI actualisera automatiquement les données du rapport sur une base quotidienne.*

*La version initiale des rapports sera uniquement en anglais, et le français ainsi que d'autres langues seront ajoutés dans des versions futures. Seules les factures datées de l'exercice fiscal en cours et des exercices précédents seront incluses. Les rapports seront accessibles uniquement aux utilisateurs corporatifs internes.*

## Périmètre

Le périmètre d'un projet Power BI est composé non seulement des rapports qui seront développés et des fonctionnalités spécifiques qu'ils incluront, mais aussi des éléments qui seront exclus et de ceux qui seront différés à des versions futures.

**Rapports**

Attribuez un identifiant (ID) et un nom (court) à chaque rapport du projet, avec une description de haut niveau, l'audience et les notes de sécurité pour chacun.

Voici un exemple :

| *ID* | *Nom* | *Description* | *Audience/Sécurité* |
|--|--|--|--|
| *AR01* | *All Invoices* | *Une liste de toutes les factures (historiques, courantes, à venir)* | *A=Cadres dirigeants, Responsables de département / S=Les cadres dirigeants peuvent voir toutes les factures / S=Les responsables de département ne peuvent voir que leurs propres factures* |
| *AR02* | *Historical Invoices* | *Une liste de toutes les factures historiques (payées)* | *A=Responsables de département / S=Les responsables de département ne peuvent voir que leurs propres factures* |
| *AR03* | *Current Invoices* | *Une liste de toutes les factures courantes (émises et impayées), incluant l'ancienneté* | *A=Responsables de département / S=Les responsables de département ne peuvent voir que leurs propres factures* |
| *AR04* | *Upcoming Invoices* | *Une liste de toutes les factures à venir (en cours, planifiées)* | *A=Responsables de département / S=Les responsables de département ne peuvent voir que leurs propres factures* |

**Inclus**

Attribuez un identifiant (ID) et fournissez une description de haut niveau ainsi qu'une raison pour chaque élément qui sera inclus dans le périmètre du projet.

Voici un exemple :

| *ID* | *Élément inclus au périmètre* | *Description* |
|--|--|--|
| *SI-1* | *Langue - Anglais uniquement* | *En raison d'un délai serré pour développer les rapports, la version initiale utilisera des libellés et des données codés en dur en anglais uniquement* |
		
**Exclu**

Attribuez un identifiant (ID) et fournissez une description de haut niveau ainsi qu'une raison pour chaque élément qui sera exclu du périmètre du projet.

Voici un exemple :

| *ID* | *Élément exclu du périmètre* | *Description* |
|--|--|--|
| *SE-1* | *Langue - Ajouter le français* | *Une future version des rapports contiendra des libellés et des données traduits, et tous les libellés et données codés en dur en anglais seront remplacés par des calculs permettant de présenter la langue sélectionnée* |
	

**Différé**

Attribuez un identifiant (ID) et fournissez une description de haut niveau ainsi qu'une raison pour chaque élément du périmètre du projet qui sera différé à une version future (itération, version).

Voici un exemple :

| *ID* | *Élément différé du périmètre* | *Description/Raison/Version* |
|--|--|--|
| *SD-1* | *Langue - Ajouter plusieurs langues* | *D=Une future version des rapports contiendra des libellés et des données traduits pour plusieurs langues. En plus de l'anglais et du français déjà fournis, des traductions en espagnol, allemand, italien et portugais seront ajoutées, et tous les calculs de libellés et de données seront ajustés en conséquence. R=Les politiques corporatives de traduction sont actuellement en cours de révision et le niveau d'effort ne peut pas être correctement évalué et planifié pour le moment. V=2.x* |
	

## Exemple

Un fragment d'exemple de document couvrant ces sections est disponible à l'adresse suivante :

[Design Document - Sample Fragment 01 - General and Scope -](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx)

#PowerBI, #DocumentationMatters, #DataAnalytics
