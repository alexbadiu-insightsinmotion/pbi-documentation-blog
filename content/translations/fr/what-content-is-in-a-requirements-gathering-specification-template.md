---
title: "Quel contenu inclure dans un modèle de spécification de recueil des besoins"
date: 2025-06-26
tag: "requirements"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/43f99a32-f757-470f-bee6-42c760d518fa"
excerpt: "Quel contenu inclure dans un modèle de spécification de recueil des besoins ? Les projets de reporting échouent souvent car trop de périmètre est visé pour les ressources disponibles..."
sourceFile: "18 - What content is in a Requirements Gathering Specification Template.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/18%20-%20What%20content%20is%20in%20a%20Requirements%20Gathering%20Specification%20Template.md"
enSlug: "what-content-is-in-a-requirements-gathering-specification-template"
---

![18 - Image - Title - Requirements Gathering Specification Templates](https://github.com/user-attachments/assets/43f99a32-f757-470f-bee6-42c760d518fa)

***Quel contenu inclure dans un modèle de spécification de recueil des besoins ?***

## Généralités

Les projets de reporting échouent souvent parce qu'un périmètre trop ambitieux est envisagé au regard des ressources disponibles (par ex. temps, coût, disponibilité du personnel, expertise du personnel, etc.). De même, la dérive de périmètre (« scope creep ») est souvent une cause majeure d'échec de projet. Soyez donc impitoyable sur le périmètre : n'incluez que l'essentiel, excluez tout ce que vous pouvez (soyez précis !), et reportez tout ce qui peut l'être, en particulier les éléments disposant d'une solution de contournement.

> \[!IMPORTANT\]
> *Prévoyez l'itération*

Pour tenter de cerner les éléments de périmètre essentiels à inclure dans une itération de projet, il est utile de **recueillir les besoins** directement auprès des propriétaires métier et des utilisateurs finaux avant de finaliser un périmètre.

À cette fin, les **modèles de spécification** sous forme de questions-réponses, dans un format couramment utilisé, jouent un rôle important. Le rapport lui-même, ainsi que l'environnement dans lequel il sera développé, testé et utilisé, sont tous deux importants.

## Rapport

Pour servir non seulement de point de départ au développement et à l'estimation du temps nécessaire pour chaque rapport, mais aussi pour aider à définir son périmètre, plusieurs éléments doivent être décrits pour chaque rapport, notamment :

- Quel est le nom et l'ID du rapport ?
- Quel est l'objectif du rapport ?
- À quelles questions le rapport doit-il répondre ?
- Qui sont les consommateurs visés par le rapport ?
  - c'est-à-dire, quel est le public cible ?
- Quelle est la source des données à présenter dans le rapport ?
- Existe-t-il une source existante pour les composants de données du rapport ?
  - Si oui, cette source a-t-elle été certifiée (si oui, par qui ?) ?
  - Si non ou si inconnu, y a-t-il (ou y aura-t-il) du personnel disponible pour valider les données, et combien de temps cela prendra-t-il ?
- Quelle est la plus petite quantité de données permettant de répondre à la ou aux questions ?
  - identifier TOUS les filtres pouvant être utilisés pour réduire le nombre d'enregistrements source
  - identifier TOUTES les agrégations pouvant être appliquées pour réduire le nombre d'enregistrements de reporting
  - identifier TOUTES les colonnes pouvant être supprimées pour réduire le volume de données à traiter
- Quelles règles métier doivent être mises en œuvre dans ce rapport ? Sont-elles inhérentes au jeu de données ? Existe-t-il des exceptions ou des cas particuliers ?
- Quelles sont les formules des calculs nécessaires dans le rapport ? Existe-t-il des exceptions ou des cas particuliers ?
- Quels visuels souhaite-t-on voir figurer sur le rapport ?
  - (fournir une brève description de chacun)
- Quels filtres (segments) sont requis sur le rapport (le cas échéant) pour l'interactivité ?
- Quels indicateurs clés de performance (ou mesures) souhaite-t-on voir figurer sur le rapport ?
- Existe-t-il une maquette du rapport et/ou un wireframe décrivant le rapport ?
- Existe-t-il des exemples de rapports existants actuellement utilisés qui présentent (une partie de) cette information ?
  - Si oui, pourquoi sont-ils remplacés, quelles sont leurs lacunes, et quelles sont les améliorations souhaitées ?
- Et, surtout, à quelle date ce rapport doit-il être mis en production ?

<table><thead><tr><th><p><strong><em>Élément</em></strong></p></th><th><p><strong><em>Description</em></strong></p></th></tr><tr><th><p>Nom du rapport</p></th><th><p>&lt;nom du rapport&gt;</p></th></tr><tr><th><p>ID du rapport</p></th><th><p>&lt;identifiant du rapport&gt;</p></th></tr></thead><tbody><tr><td><p>Objectif / Questions</p></td><td><p>À quelle(s) question(s) le rapport est-il conçu pour répondre ?</p><p>Q1 :</p><p>Q2 :</p><p>Q3 :</p><p>Q4 :</p><p>Q5 :</p><p>Quelle histoire le rapport est-il conçu pour raconter ?</p><p>??</p><p>Quelles décisions ce rapport est-il conçu pour permettre/soutenir ?</p><p>??</p></td></tr><tr><td><p>Public</p></td><td><p>Qui sont les consommateurs visés par le rapport ?</p><p>Qui ?</p><p>Le rapport sera-t-il partagé exclusivement avec les utilisateurs internes de l'organisation ?</p><p>Oui ? Non ? (si oui, décrire comment (et avec qui) le rapport sera partagé)</p><p>Le rapport sera-t-il partagé avec des utilisateurs externes en dehors de l'organisation ?</p><p>Oui ? Non ? (si oui, décrire comment (et avec qui) le rapport sera partagé)</p><p>Le rapport sera-t-il partagé avec d'autres départements ? Si oui, comment ?</p><p>Oui ? Non ?</p><p>Le rapport sera-t-il partagé publiquement ? Si oui, comment ?</p><p>Oui ? Non ?</p></td></tr><tr><td><p>Source de données</p></td><td><p>Quelle(s) est/sont la ou les source(s) de données pour ce rapport ?</p><p>??</p><p>Cette ou ces source(s) de données sont-elles validées (approuvées et certifiées) ? (Si non, des ressources du client sont-elles disponibles et allouées dans le délai de développement du rapport ?)</p><p>Oui ? Non ?</p></td></tr><tr><td><p>Filtres</p></td><td><p>Quels filtres peuvent être appliqués pour réduire la taille du jeu de données ?</p><p>??</p></td></tr><tr><td><p>Agrégations</p></td><td><p>Comment les données source peuvent-elles être agrégées pour correspondre au niveau de détail (ou granularité) requis par le rapport afin de réduire la taille du jeu de données ?</p><p>??</p></td></tr><tr><td><p>Colonnes</p></td><td><p>Quelles colonnes sont requises et lesquelles peuvent être supprimées pour réduire la taille du jeu de données ?</p><p>??</p></td></tr><tr><td><p>Règles métier</p></td><td><p>Quelles règles métier doivent être utilisées dans ce rapport ?</p><p>?? (celles non déjà inhérentes aux données ; celles devant être mises en œuvre dans le rapport)</p><p>Existe-t-il des exemptions ou des cas particuliers ?</p><p>Oui ? Non ? Décrire…</p></td></tr><tr><td><p>Formules de calcul</p></td><td><p>Quelles sont les formules des calculs à utiliser dans ce rapport ?</p><p>??</p><p>Existe-t-il des exemptions ou des cas particuliers ?</p><p>Oui ? Non ? Décrire…</p></td></tr><tr><td><p>Visuels</p></td><td><p>Quels visuels souhaitez-vous voir affichés sur le rapport ?</p><p>par ex.,</p><ul><li>Graphique en colonnes – ventes par année</li><li>Graphique en barres – ventes par province</li><li>Matrice – ventes par année par catégorie de produit</li><li>…</li></ul></td></tr><tr><td><p>Segments (Slicers)</p></td><td><p>Quels segments interactifs doivent être utilisés sur le rapport ?</p><p>par ex.,</p><ul><li>Date avec curseur</li><li>Nom du client (liste déroulante)</li><li>Région de vente (tuiles)</li><li>…</li></ul></td></tr><tr><td><p>KPI / Mesures</p></td><td><p>Quels KPI / mesures doivent être affichés sur le rapport ?</p><p>??</p></td></tr><tr><td><p>Maquette / Wireframe</p></td><td><p>Existe-t-il une maquette et/ou un wireframe disponible pour le rapport ?</p><p>Oui, voir pièce jointe</p></td></tr><tr><td><p>Exemples existants</p></td><td><p>Existe-t-il des rapports existants actuellement (ou ayant historiquement été) utilisés pour présenter (une partie de) cette information ?</p><p>Oui, voir pièce jointe</p></td></tr><tr><td><p>Thème visuel</p></td><td><p>Existe-t-il des éléments visuels spécifiques au client devant être utilisés pour l'environnement/les rapports ?</p><p>Couleurs ? Polices ? Logos ? Autre ?</p><p>Existe-t-il des exemptions ou des cas particuliers ?</p><p>Oui ? Non ? Décrire…</p></td></tr><tr><td><p>Autre</p></td><td><p>Quelles autres fonctionnalités/éléments doivent être affichés sur le rapport ?</p><ul><li>Date de dernière actualisation du rapport (coin supérieur droit)</li><li>Logo de l'entreprise (coin inférieur gauche)</li><li>ID / Version / Date de version du jeu de données (coin inférieur droit)</li><li>ID / Version / Date de version du rapport (coin inférieur droit)</li></ul></td></tr><tr><td><p>Délai</p></td><td><p>Quel est le délai pour le développement, la validation, le déploiement et la mise en production du rapport ?</p><ul><li>Développement (2 semaines) (première moitié de février 2025)</li><li>Validation (2 jours) (3<sup>e</sup> semaine de février 2025)</li><li>Déploiement (4 semaines) (mars 2025)</li><li>Mise en production (1er juin 2025)</li></ul></td></tr></tbody></table>

## Environnement

Pour servir de point de départ au développement d'un nouvel environnement Power BI (ou à l'amélioration d'un environnement Power BI existant), plusieurs éléments doivent être décrits, notamment :

- Existe-t-il un environnement Power BI établi qui sera modifié/amélioré ?
  - Dans tous les cas, quel type de licence Power BI sera implémenté/utilisé ? Premium ? Pro ? Gratuite (aucune) ? Report Server (sur site) ?
- Combien de consommateurs de rapports internes sont anticipés au début et à la fin du projet ?
- Y a-t-il des consommateurs de rapports externes ? Si oui, combien, comment, et à quelle fréquence accéderont-ils aux rapports de l'organisation ?
- Y a-t-il plusieurs environnements disponibles/anticipés (par ex. DEV, TEST, PROD) ?
  - Si oui, comment le code est-il déplacé entre les environnements ? Des pipelines de déploiement sont-ils utilisés ?
- Existe-t-il des sources de données d'entreprise validées disponibles au sein de l'environnement Power BI ?
  - Si oui, des dataflows sont-ils utilisés ?
  - Si non, du temps a-t-il été réservé pour la validation et des ressources sont-elles disponibles pour valider les sources de données ?
  - Dans tous les cas, s'il existe des sources de données sur site qui contribueront aux rapports, existe-t-il des postes de travail dédiés disponibles configurés avec des passerelles Power BI pour les environnements DEV, TEST et PROD ?
- Combien de rapports seront développés, validés et déployés d'ici la fin du projet ?
- Existe-t-il un groupe pilote désigné de ressources internes qui validera la première étape d'un déploiement par phases ?
- Existe-t-il des sources de données existantes pouvant être/ayant été validées, avec les détails de connexion ? (par ex. entrepôt de données ? base de données ? SharePoint ? Autre ?)
  - Si non, existe-t-il des ressources internes disponibles dans le délai du projet pour valider les sources de données existantes ?
- Quelle est la plus petite quantité de données permettant de répondre aux questions inhérentes aux rapports anticipés ? Exercice fiscal en cours ? Exercice fiscal précédent ? Les 5 derniers exercices fiscaux ?
- Les données source peuvent-elles être agrégées avant l'extraction pour minimiser le temps de traitement Power BI ?
- Du temps a-t-il été alloué dans le délai du projet pour accéder aux sources de données, les transformer et les valider ?
- Tous (certains ?) rapports doivent-ils être livrés simultanément en plusieurs langues ? Anglais uniquement ? Si multilingue, un déploiement par phases est-il acceptable (par ex. français et espagnol en version 2.0 ?)
- Quelles sont les exigences d'actualisation du rapport ? Annuelle ? Mensuelle ? Quotidienne ? Temps réel ? Autre ?
- Existe-t-il des ressources internes assignées à l'administration Power BI pendant et après le déploiement ?

| **_Élément_** | **_Description_** |
| --- | --- |
| Licence | Quel type de licence Power BI est disponible ?<br><br>Premium ? Pro ? Gratuite (aucune) ? Report Server (sur site) |
| Consommateurs/Auteurs de rapports | Combien de ressources clientes internes interagiront avec les rapports ?<br><br>??<br><br>Comment les ressources clientes internes interagiront-elles avec les rapports ?<br><br>Navigateur ? Mobile ? Power BI Desktop ? PDF ? Autre ?<br><br>Existe-t-il des ressources externes qui interagiront avec les rapports ? (si oui, comment ?)<br><br>??<br><br>Combien d'auteurs de rapports internes existent actuellement/sont anticipés ?<br><br>?? |
| Source(s) de données / Passerelles | Quelle(s) est/sont la ou les source(s) de données pour les rapports Power BI existants et futurs ?<br><br>??<br><br>Cette ou ces source(s) de données sont-elles validées (approuvées et certifiées) ? (Si non, des ressources du client sont-elles disponibles et allouées dans le délai du projet ?)<br><br>Oui ? Non ?<br><br>Si des sources de données sur site seront utilisées, plusieurs passerelles ont-elles été établies pour connecter les environnements DEV, TEST et PROD au cloud ?<br><br>Oui ? Non ? Décrire… |
| Volume de données | Quels sont les filtres pouvant être appliqués aux données source/reporting pour minimiser le nombre d'enregistrements nécessaires aux rapports ?<br><br>??<br><br>Quelles sont les agrégations pouvant être appliquées aux données source/reporting pour minimiser le nombre d'enregistrements utilisés dans les rapports ?<br><br>?? |
| Cadence d'actualisation des données | À quelle fréquence les données doivent-elles être actualisées ?<br><br>Annuelle ? Mensuelle ? Hebdomadaire ? Quotidienne ? Horaire ? Temps réel ? Autre ? Décrire… |
| Environnements | Existe-t-il des environnements séparés disponibles pour Power BI (espaces de travail) ?<br><br>(par ex. DEV, TEST, PROD)<br><br>??<br><br>Existe-t-il des environnements séparés disponibles pour les sources de données ?<br><br>(par ex. DEV, TEST, PROD)<br><br>??<br><br>S'il existe des environnements TEST et PROD séparés, les données dans l'environnement TEST sont-elles cohérentes avec PROD de sorte que la validation soit efficace ?<br><br>?? |
| Déploiement | Comment le code est-il déployé ? Des pipelines de déploiement sont-ils utilisés ?<br><br>?? |
| Langue | Les rapports seront-ils livrés uniquement en anglais ?<br><br>Oui ? Non ?<br><br>Si des rapports multilingues sont également requis, les langues supplémentaires peuvent-elles être livrées ultérieurement dans une version/itération séparée ?<br><br>Oui ? Non ? |
| Administration | Existe-t-il des ressources internes assignées à l'administration Power BI pendant et après le déploiement ?<br><br>?? |
| Thème visuel | Existe-t-il des éléments visuels spécifiques au client devant être utilisés pour l'environnement/les rapports ?<br><br>Couleurs ? Polices ? Logos ? Autre ?<br><br>Existe-t-il des exceptions ou des cas particuliers ?<br><br>Oui ? Non ? Décrire… |
| Sécurité | Comment la sécurité est-elle appliquée ?<br><br>Active Directory ? Non ? Décrire… |

## Ressources

*Publications LinkedIn*

La publication LinkedIn couvrant les modèles de spécification de recueil des besoins est :
<br>
[Modèles de spécification de recueil des besoins](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7343958251413139461-FgAL) <br><br>

*Exemples*

Des exemples de modèles de spécification de recueil des besoins sont disponibles dans le dépôt GitHub :
<br>
[1. Modèle de besoins - Rapport Power BI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Requirements%20Template%20-%20Power%20BI%20Report%20-%20V0.81.docx) <br>
[2. Modèle de besoins - Environnement Power BI](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Requirements%20Template%20-%20Power%20BI%20Environment%20-%20V0.82.docx) <br>
