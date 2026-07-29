---
title: "Quel contenu figure dans un Design Document - Flux de travail, problèmes et règles métier"
date: 2025-02-25
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/cd70cfda-307e-4009-8403-2fc749f53cf7"
excerpt: "Comment consigner le flux de travail, les problèmes et les règles métier dans un Design Document ? Décrivez à haut niveau le processus de collecte et de préparation des données, de la source jusqu'..."
sourceFile: "05 - What content is in a Design Document - Workflow Issues Business Rules.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/05%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Workflow%20Issues%20Business%20Rules.md"
enSlug: "what-content-is-in-a-design-document-workflow-issues-business-rules"
---

**Comment consigner le flux de travail, les problèmes et les règles métier dans un Design Document ?**

Fournissez des descriptions de haut niveau du *flux de travail* (workflow) de collecte et de préparation des données, en incluant toutes les étapes depuis le moment où les données sont initialement accédées dans les systèmes opérationnels jusqu'à la consommation du ou des rapports par les utilisateurs finaux. Cela comprend les méthodes, les processus (manuels, automatisés), les comptes (autorisations) et les planifications.

Identifiez les *problèmes* (issues) et résolvez-les au cours d'un projet. Formuler clairement leur résolution est essentiel pour la conception et l'acceptation de la solution. Documenter leur évolution permet non seulement de tracer le processus de décision, mais constitue également une référence utile pour les rétrospectives et les projets futurs.

Documentez les *règles métier* (business rules) de l'entreprise, car les filtres et les calculs sont souvent spécifiques à l'organisation. Cela accroît l'acceptation de la solution, car toutes les parties prenantes (par exemple, l'analyste, le développeur et le testeur) utilisent les mêmes algorithmes.

Ce billet traite des sections principales Flux de travail, Problèmes et Règles métier ; les sections restantes seront couvertes dans les prochains billets.

## Flux de travail

Attribuez un ordre à chaque étape à l'aide d'une liste numérotée. Évitez les malentendus en créant un simple logigramme illustrant le flux de travail.

Voici un exemple :

1. Les données de facturation seront extraites manuellement du système financier de l'entreprise par des employés utilisant leurs comptes personnels, selon une planification définie (quotidiennement à 23h00), et seront stockées sous forme d'une série de fichiers CSV dans un dossier SharePoint dédié.
2. Les données clients seront extraites automatiquement du système de gestion de la relation client de l'entreprise par des scripts PowerShell, selon une planification définie (quotidiennement à 23h00), à l'aide d'un compte de service disposant d'un accès complet à tous les enregistrements, et seront stockées sous forme d'une série de fichiers CSV dans un dossier SharePoint dédié.
3. Les données seront ensuite importées dans des tables intermédiaires brutes (non transformées) dans le Power BI Service, selon une planification définie (quotidiennement à 1h00), automatiquement par une série de dataflows Power BI.
4. Les données des tables intermédiaires seront ensuite transformées en tables de reporting dans le Power BI Service, selon une planification définie (quotidiennement à 2h00), automatiquement par une série de dataflows Power BI.
5. Les données des tables de reporting seront ensuite chargées automatiquement dans un modèle sémantique commun (dataset) dans le Power BI Service, selon une planification définie.
6. L'utilisateur final utilisera alors un navigateur pour accéder à la demande à l'application Power BI [Invoicing] dans l'espace de travail Power BI [Invoicing], et sélectionnera la page souhaitée dans le rapport Power BI souhaité (qui utilise les données du modèle sémantique commun).

Un logigramme du flux de travail des données est le suivant :<br>
![05 - Image - Workflow Flowchart](https://github.com/user-attachments/assets/ed2b9adc-a5f1-4d93-8018-f6710b22cfe1)

## Problèmes

Les problèmes (c.-à-d. le **quoi**) seront identifiés et résolus au cours d'un projet. Consigner l'historique des statuts permet de suivre le processus de décision, car le **pourquoi** et le **qui** sont deux questions fréquemment posées lorsqu'un élément (par exemple une fonctionnalité, un comportement, une procédure, etc.) est inclus ou exclu.

Attribuez un identifiant et un nom (court) à chaque problème, décrivez-le, et utilisez un statut pour consigner toute l'activité, accompagné du niveau de statut pertinent (par exemple NEW, CRITICAL, NOTE, IN PROGRESS, RESOLVED, DEFERRED, etc.) et d'une date (utilisez un format de date cohérent et non ambigu [par exemple aaaa-mm-jj, jj-mmm-aaaa, etc.]).

Voici un exemple :

| <div style="width:20px">*ID*</div> | <div style="width:100px">*Nom*</div> | *Description* | *Statut* |
| --- | --- | --- | --- |
| *I-1* | *Accès aux données* | *Accéder au système CRM à l'aide d'un compte de service dédié disposant de toutes les autorisations pour accéder à tous les enregistrements* | *NEW (2024-10-01) :* <br>1. *[Nom de la personne] du service informatique doit poursuivre la création du compte de service pour l'accès aux données du système source* |
| *I-2* | *Processus ETL - Partie 1 : Extraction* | *Scripts PowerShell planifiés pour extraire automatiquement les données brutes du système CRM opérationnel et les charger dans des fichiers CSV dans un dossier dédié de l'environnement SharePoint* | *NEW (2025-02-03) :*   <br>1. *[Nom de la personne] du service DEV doit être responsable du développement d'un processus ETL permettant de faire parvenir les données brutes (non transformées) dans l'environnement de reporting*   <br><br>*IN PROGRESS (2025-02-10) :* <br>2. *[John Doe] a créé une série de scripts PowerShell pour lire les données brutes de la base de données CRM opérationnelle, les stocker dans des fichiers CSV, et les charger dans l'environnement SharePoint* |
| *I-3* | *Processus ETL - Partie 2 : Transformation* | *Dataflows Power BI planifiés pour charger automatiquement les données brutes des fichiers CSV de l'environnement SharePoint, transformer les données en tables intermédiaires, et combiner les tables dans le Power BI Service afin d'alimenter le modèle de données* | *NEW (2025-02-10) :* <br>1. *[Nom de la personne] du service DEV doit être responsable du développement d'une série de dataflows Power BI permettant de transformer les données brutes en données de reporting utilisables dans l'environnement de reporting* <br><br>*IN PROGRESS (2025-02-17) :* <br>2. *[Sue Smith] a créé des dataflows prototypes pour lire les données SharePoint et les transformer en tables intermédiaires Power BI* |
| *I-4* | *Filtrage des données* | *Seules les données opérationnelles de l'exercice fiscal en cours et de l'exercice précédent seront chargées (c.-à-d. aucune donnée historique ou d'archive)* | *NEW (2025-02-03) :* <br>1. *Une demande a été soumise à [Nom de la personne] (le responsable métier des rapports) afin de préciser la quantité de données à extraire* <br><br>*RESOLVED (2025-02-10) :* <br>2. *[Nancy Jones] a confirmé que les données opérationnelles depuis le début de l'exercice fiscal précédent répondraient effectivement aux questions visées par les rapports* |

## Règles métier

Les règles métier et les calculs ne sont pas universels. Différentes organisations, et même différents groupes au sein d'une même organisation, ont souvent une compréhension propre d'une **règle**, qu'il s'agisse d'une définition, d'un algorithme ou d'un filtre. Pour garantir que tous les membres de l'équipe (sans oublier les autres personnes qui interagiront avec la solution) utilisent la même règle, il est judicieux de documenter la règle, même si cela semble *« énoncer une évidence »*. Le coût pour un projet ou une organisation en termes de réputation dégradée, de bonne volonté réduite, de ressources accrues (temps et coût) et de coûts d'opportunité liés au fait que le métier, les développeurs ou les testeurs utilisent des règles différentes est une dépense inutile. Pour paraphraser une expression sportive courante, l'utilisation de règles différentes par différents groupes est une **erreur non forcée**. Avec un minimum d'effort, de telles erreurs peuvent facilement être évitées.

Attribuez un identifiant à chaque règle métier, décrivez-la, et utilisez un statut pour consigner toute l'activité, accompagné du niveau de statut d'approbation pertinent (par exemple NEW, DRAFT, DISCUSSION, REVISED, APPROVED (par qui), etc.) et d'une date (utilisez un format de date cohérent et non ambigu [par exemple aaaa-mm-jj, jj-mmm-aaaa, etc.]). Incluez toutes les règles métier qui seront utilisées dans les processus de transformation des données, de calcul, de tests d'acceptation, de déploiement et d'utilisation finale.

Voici un exemple :

| <div style="width:30px">*ID*</div> | *Nom* | *Description* | *Statut* |
| --- | --- | --- | --- |
| *BR-1* | *Client actif* | *Un client comptant plus de 1 000 employés ayant payé une facture pour un produit ou un service livré au cours des 12 derniers mois.* | *DRAFT (2025-02-03) :* <br> 1. *« Tout client ayant effectué un achat ».* <br> 2. *Une demande a été soumise à [Nom de la personne] du service commercial pour confirmation* <br><br> *APPROVED (2025-02-10) :* <br> 1. *[Derek James] a confirmé que la taille du client doit être supérieure à 1 000 employés et que le client doit avoir effectué un achat au cours de l'année précédente.* <br> 2. *La description de la règle a été mise à jour en conséquence* |
| *BR-2* | *Client fidèle* | *Un client de toute taille ayant effectué 3 achats ou plus au cours des 24 derniers mois.*  *Un client peut être classé comme « fidèle » mais sera « inactif » s'il ne satisfait pas à la règle du client « actif ».* | *NEW (2025-02-03) :* <br> 1. *Une demande a été soumise à [Nom de la personne] du service commercial pour la définition d'un client fidèle*   *DRAFT (2025-02-04) :*   1. *« Tout client ayant effectué au moins 2 achats ».* <br><br> *APPROVED (2025-02-10) :* <br> 1. *[Derek James] a confirmé que le client peut être de toute taille mais doit avoir effectué au moins 3 achats au cours des 2 années précédentes ; un client « inactif » peut être un client « fidèle »* <br> 2. *La description de la règle a été mise à jour en conséquence* |
| *BR-3* | *Facture ouverte* | *Une facture ouverte est une facture qui a été envoyée à un client, mais qui n'a pas été payée.*  *Une facture ouverte est classée comme « en retard » lorsque la date d'échéance est dépassée.* | *DRAFT (2025-02-03) :* <br> 1. *« Une facture qui n'a pas été annulée et qui a franchi les statuts brouillon, approuvée et envoyée »* <br> 2. *Une demande a été soumise à [Nom de la personne] du service comptable pour confirmation* <br><br> *APPROVED (2025-02-10) :* <br> 1. *[Sally McMillan] a confirmé que la règle provisoire est correcte.* |
| *BR-4* | *Montant de la facture* | *Le montant indiqué (converti en euros si la devise indiquée n'est pas l'euro) et hors frais de retard de paiement.* | *DRAFT (2025-02-03) :* <br> 1. *« Le montant indiqué sur la facture ».* <br><br> *DISCUSSION (2025-02-04) :* <br>  1. *[Thomas Delaney], du service comptable, a fait remarquer que le montant de la facture doit être exprimé dans la devise de reporting de l'entreprise, l'euro.* <br><br> *REVISED (2025-02-05) :* <br> 1. *« Le montant indiqué sur la facture, converti en euros ».* <br> 2. *La description de la règle a été mise à jour en conséquence* <br> 3. *Une demande a été soumise à [Nom de la personne] du service comptable pour confirmation* <br><br>  *APPROVED (2025-02-06) :* <br> 1. *[Mary Wallace] a confirmé que la règle révisée est correcte.* |

## Ressources

*Publications LinkedIn*

Les publications LinkedIn consacrées au design document sont listées ci-dessous : <br>
[1. Général et périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Flux de travail, problèmes et règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>


*Exemples*

Des extraits de documents exemples couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1. Design Document - Extrait exemple 01 - Général et périmètre](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Design Document - Extrait exemple 02 - Flux de travail, problèmes et règles métier](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
