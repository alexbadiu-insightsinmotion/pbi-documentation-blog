---
title: "Quel contenu inclure dans un Document de Conception - Données"
date: 2025-03-11
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/a0ac9319-73ea-4506-b5ba-e507d080ca47"
excerpt: "Quelles caractéristiques des données décrire dans un Document de Conception ? Le mode de connexion Power BI (import ou direct) détermine le format et l'impact de la section données."
sourceFile: "07 - What content is in a Design Document - Data.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/07%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Data.md"
enSlug: "what-content-is-in-a-design-document-data"
---

**Quelles caractéristiques des données doivent être décrites dans un Document de Conception ?**

Le mode de connexion aux données Power BI (import ou direct) déterminera le format et l'impact de la section données dans le document de conception. Comme le déplacement de données n'est pas une composante des modèles en **requête directe**, l'accès aux données en mode **import** sera décrit ici.

Les données disponibles (et présentées) dans un rapport Power BI seront soumises à plusieurs critères, notamment l'environnement source, les identifiants d'accès, le volume de données, la fréquence de rafraîchissement des données, les transformations, et la modélisation (relations).

Ce numéro traite de la section majeure Données, et les sections restantes seront couvertes dans les numéros suivants.

## Environnements

Décrivez les différents environnements distincts qui seront utilisés dans le projet. (Par exemple, dans une structure à 3 niveaux, des instances séparées de la ou des application(s) source, des bases de données, et de la plateforme de partage de rapports cible seront disponibles et utilisées [par ex., DEV, TEST, PROD]. Dans une structure à 4 niveaux, les environnements peuvent être nommés DEV, TEST, STAGE et PROD.)

Évaluez la déclaration (paraphrasée),

> *« Tout le monde a un environnement TEST ; certains ont même la chance d'avoir un environnement PROD. »*

Si vous choisissez de tester en production, vous acceptez alors les impacts et les risques associés (par ex., performance dégradée, réactivité, fiabilité/temps d'arrêt, etc.).

Notez si des applications sources dédiées sont disponibles dans chaque environnement, ou s'il est nécessaire, par exemple, d'utiliser l'environnement PROD pour le développement et les tests d'acceptation.

Si des instances séparées d'applications source sont disponibles, notez les caractéristiques des données et si elles sont représentatives de l'environnement PROD (par ex., performance réseau, sécurité des données, volume de données, variabilité des données, rafraîchissement des données, etc.).

## Sources de données

Décrivez les caractéristiques de l'accès aux données pour le(s) rapport(s), y compris les systèmes source, les identifiants d'accès, le volume de données (et le niveau de détail disponible [ou granularité]), et la fréquence de mise à jour.

Les systèmes opérationnels ne seront idéalement pas utilisés comme sources de données pour le reporting direct ; ce seront plutôt des entrepôts de données ou des répliques dédiés qui, on l'espère, constitueront les sources à partir desquelles réaliser le reporting.

Si les systèmes opérationnels sont effectivement la source de données du reporting, alors l'impact sur la performance des processus de transfert de données doit être acceptable. Une approche possible pour minimiser cet impact consiste à effectuer tout le reporting sur les données d'**hier** (c.-à-d., ne rafraîchir qu'une fois par jour, en dehors des heures ouvrées, lorsque les impacts sur la performance sont acceptables).

### Sources

Attribuez un [ID] à chaque source de données, décrivez-la, et utilisez la colonne [Statut] pour noter si elle est nouvelle ou existante (par ex., EXISTANTE, NOUVELLE, EN DÉVELOPPEMENT, APPROUVÉE (par qui), VÉRIFIÉE (par qui), etc.) ainsi que la date (utilisez un format de date cohérent et non ambigu [par ex., aaaa-mm-jj, jj-mmm-aaaa, etc.]).

Incluez toutes les sources de données qui seront utilisées dans les flux de données et les modèles sémantiques alimentant les rapports, qu'elles soient existantes ou incluses dans ce document.

Voici un exemple :

| **ID** | **Nom** | **Description** | **Statut** |
| --- | --- | --- | --- |
| *S-1* | *Source de données Clients* | *Microsoft Dynamics (sur site)* | *NOUVELLE (2025-02-14) :*<br>1. *Une demande a été soumise à [Nom spécifique de la personne] du département IT pour la mise en place d'une nouvelle passerelle Power BI et d'un compte de service permettant d'accéder à toutes les données clients*<br><br>*EN DÉVELOPPEMENT (2025-02-28) :*<br>1. *La passerelle [Nom spécifique] est en cours de mise en place avec le compte de service [Nom spécifique] pour accéder à toutes les données clients dans l'environnement DEV*<br>2. *Les passerelles n'ont pas encore été mises en place, ni les comptes de service créés, pour les environnements TEST et PROD* |
| *S-2* | *Source de données Factures* | *SAP Financials (sur site)* | *EXISTANTE (2025-02-27) :*<br>1. *La passerelle Power BI [Nom spécifique de la passerelle] peut être utilisée pour accéder à toutes les données financières en utilisant les identifiants du compte [Compte de service spécifique] dans l'environnement PROD*<br>2. *Il n'existe actuellement aucune instance de SAP Financials dans les environnements DEV ou TEST, et il n'est pas prévu d'en mettre en place* |

### Identifiants

Attribuez un [ID] à chaque ensemble d'identifiants qui sera utilisé pour accéder à chaque source de données dans chaque environnement, ainsi que l'adresse IP/URL, le nom de compte, et le mot de passe qui seront utilisés pour s'y connecter, idéalement des comptes de service créés et utilisés exclusivement pour l'accès aux données par d'autres services.

> [!NOTE] 
> *Ces identifiants doivent faire référence à des comptes* ***système*** *et non à des comptes personnels, car les comptes personnels peuvent faire l'objet de modifications par d'autres personnes en dehors du système de reporting, sans préavis (par ex., réaffectation, promotion/rétrogradation, retraite, départ, etc.).*

Voici un exemple :

| **ID** | **Nom** | **Environnement** | **Identifiants** |
| --- | --- | --- | --- |
| *C-11* | *Identifiants de la Source de données Clients* | *DEV* | *IP/URL : 192.1.1.1*<br>*Nom de compte : serviceDYN-DEV@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceDYN-DEV*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |
| *C-12* | *Identifiants de la Source de données Clients* | *TEST* | *IP/URL : dynamics-TEST.abc.com*<br>*Nom de compte : serviceDYN-TEST@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceDYN-TEST*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |
| *C-13* | *Identifiants de la Source de données Clients* | *PROD* | *IP/URL : dynamics.abc.com*<br>*Nom de compte : serviceDYN@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceDYN*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |
| *C-21* | *Identifiants de la Source de données Factures* | *DEV* | *IP/URL : 192.2.2.2*<br>*Nom de compte : serviceSAP-DEV@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceSAP-DEV*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |
| *C-22* | *Identifiants de la Source de données Factures* | *TEST* | *IP/URL : sap-TEST.abc.com*<br>*Nom de compte : serviceSAP-TEST@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceSAP-TEST*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |
| *C-23* | *Identifiants de la Source de données Factures* | *PROD* | *IP/URL : sap.abc.com*<br>*Nom de compte : serviceSAP@abc.ca*<br>*Mot de passe = (récupérer depuis Keepass)*<br>*- Entrée=serviceSAP*<br>*- Coffre=[Insérer le nom du coffre de clés]*<br>*- Secret=[Insérer le nom du secret]* |

### Volume

Réduisez le volume de données (lignes X colonnes) autant que possible pour chaque rapport.

Ne chargez pas les colonnes à forte cardinalité (par ex., Clé de vente, Clé de vente alternative, etc.) sauf si elles sont absolument nécessaires pour votre/vos rapport(s).

Il n'y a rien d'intrinsèquement mauvais à charger trop de données, mais cela infligera une pénalité de performance à tous les utilisateurs du rapport, que ce soit le département IT (qui souffre inutilement de longs temps de rafraîchissement des données) ou les utilisateurs du rapport (qui souffrent inutilement de rapports lents). On peut appliquer les concepts de la [Maxime de Roche]( https://ssbipolar.com/2021/05/31/roches-maxim/) sur la transformation des données Power BI (*« …aussi loin en amont que possible et aussi loin en aval que nécessaire… »*) à l'agrégation des données également (et donc à la réduction du volume), ce qui donne lieu à une déclaration comme,

> *« Réduisez le volume de données autant que possible en agrégeant aussi loin en amont que possible »*

Si vous pouvez agréger les données avant leur transfert, vous pouvez à la fois réduire le temps nécessaire au transfert de données (rafraîchissement) et augmenter la performance de Power BI (en supprimant le besoin d'agrégation au sein de Power BI). Ne transférez que le volume de données que vous allez réellement utiliser, ou, dit autrement,

> *« Il n'y a aucun avantage à transférer des données que vous n'allez pas utiliser »*

Attribuez un [ID] à la source de données et décrivez le volume de données nécessaire pour répondre aux questions du/des rapport(s), le grain de la source de données et son utilisation dans le/les rapport(s), ainsi que l'agrégation disponible et requise pour chacun.

Voici un exemple :

| **ID** | **Nom** | **Volume** | **Grain/Agrégation** |
| --- | --- | --- | --- |
| *V-1* | *Rafraîchissement des données Clients* | *Mensuel* | *Source/G=n/a*<br>*Source/A=aucune*<br><br>*Rapport/G=n/a*<br>*Rapport/A=aucune* |
| *V-2* | *Rafraîchissement des données Factures* | *Quotidien* | *Source/G=milliseconde*<br>*Source/A=aucune*<br><br>*Rapport/G=jour*<br>*Rapport/A=agrégation au jour* |

### Rafraîchissement

Il est inutile de rafraîchir des données qui n'ont pas changé depuis la dernière mise à jour. De plus, si le(s) rapport(s) en question doivent analyser, par exemple, la performance jusqu'à la fin du mois précédent, alors une fréquence de rafraîchissement quotidienne consommera des ressources sans apporter de valeur. Dit autrement,

> *« Tenez compte à la fois de la fréquence de mise à jour de la source et de la période d'analyse du/des rapport(s) avant de définir les critères de rafraîchissement des données qui apporteront la valeur nécessaire tout en minimisant les ressources requises »*

De même, et comme noté ci-dessus, il n'y a aucun intérêt à faire effectuer au département IT des opérations de transfert de données inutiles, d'autant plus qu'il peut y avoir des contraintes de temps (ou pire, des conflits) avec d'autres périodes d'opérations quotidiennes (par ex., réplications, sauvegardes, archivages, etc.).

Attribuez un [ID] au rafraîchissement de la source de données et décrivez la fréquence, la procédure, la cible, la surveillance, et la responsabilité pour chacun.

Voici un exemple :

| **ID** | **Nom** | **Fréquence** | **Procédure / Cible /**  **Surveillance / Responsabilité** |
| --- | --- | --- | --- |
| *R-1* | *Rafraîchissement des données Clients* | *Mensuel* | *P=Manuel via fichier Excel*<br>*T=Dossier SharePoint dédié*<br>*M=Sue Jones (département IT)*<br>*R=Jane Doe (département des ventes)* |
| *R-2* | *Rafraîchissement des données Factures* | *Quotidien* | *P=Automatique via dataflow planifié*<br>*T=Dossier SharePoint dédié*<br>*M=Sue Jones (département IT)*<br>*R=John Smith (département comptabilité)* |

## Connexions aux données
Power BI peut se connecter aux données de 3 façons :
* Directe
* Passerelle
* Connexions cloud

Les connexions directes sont des sources ***internes*** que vous ***pouvez*** voir depuis votre ordinateur (c.-à-d., celles auxquelles vous pouvez vous connecter directement)
* Sources de fichiers (par ex., Excel, CSV, Texte, JSON, OneDrive, SharePoint, etc.)
* Sources de bases de données (par ex., SQL Server, Oracle, MySQL, IBM DB2, IBM Netezza, etc.)

Les connexions par passerelle sont des sources ***internes*** que vous ***ne pouvez pas*** voir depuis votre ordinateur (c.-à-d., celles auxquelles vous ne pouvez pas vous connecter sans un « pont »)
* Sources de données sur site inaccessibles depuis Internet (par ex., derrière un pare-feu sur un lecteur réseau, etc.)
* Utilisent des identifiants stockés et gérés en interne

Les connexions cloud sont des sources ***externes*** (Internet, ou Web) ***hébergées*** sur des plateformes cloud
* Sources cloud (par ex., Azure SQL, Snowflake, Databricks, etc.)
* Utilisent des identifiants stockés et gérés en externe

### Directe

Décrivez chaque connexion de données interne qui sera directement accédée, y compris l'ID, le type, l'emplacement, le dossier, la responsabilité, et le nom de fichier.

Voici un exemple :

| **ID** | **Nom** | **Description** | **Type / Emplacement / Dossier / Responsabilité / Nom de fichier** |
| --- | --- | --- | --- |
| CD-1 | Tranches d'ancienneté | Feuille de calcul Excel avec 5 tranches<br>pour catégoriser les données de factures<br>Valeurs initiales :<br>- 0-30 jours<br>- 31-60 jours<br>- 61-90 jours<br>- 91-180 jours<br>- 181 jours et plus<br><br>À utiliser comme source de données <br>pour la table de support [Ancienneté] | T=Excel<br>L=SharePoint<br>Dossier=Comptabilité/Données maîtresses/<br>R=Jennifer Smith/Comptabilité<br>Nom de fichier=Invoice Aging.xlsx

### Passerelle

Décrivez toutes les passerelles qui permettront une connexion indirecte aux sources de données sur site afin qu'elles puissent être accédées par le Power BI Service, y compris l'ID, le type (nouvelle, existante, de secours), et le statut (en ligne, hors ligne, etc.). 
Idéalement, toutes les passerelles utiliseront des comptes de service disposant d'une autorisation complète de lecture de tous les enregistrements source (c.-à-d., aucune restriction de sécurité).
<br><br>(Pour toutes les passerelles, décrivez l'environnement, la disponibilité [en cluster ; autonome], l'usage [par ex., dédiée à une seule passerelle ; partagée par plusieurs passerelles ; utilisée par d'autres services, etc.], qui sera responsable de la surveillance et de la gestion de la passerelle, et toute autre remarque).
<br><br>(Pour toute passerelle de secours, décrivez les intervalles de vérification de bascule requis et toute caractéristique différant de la passerelle principale.)

Voici un exemple :

| **ID** | **Nom** | **Description** | **Type / Statut / Environnement / Disponibilité / Usage / Responsabilité / Vérification / Autre** |
| --- | --- | --- | --- |
| *CG-1* | *Système RH sur site (Unique)* | *Passerelle Power BI existante permettant déjà l'accès en lecture par le Power BI Service aux données Clients*<br>* *(Liste des tables exposées et horizon temporel pour chacune)*<br>* *Clients*<br>* *Contacts*<br>* *Adresses (actuelles)*<br>* *Adresses (historiques)*<br>* *Régions* | *T=Existante*<br>*S=En ligne*<br>*E=PROD (aucune passerelle DEV ou TEST)*<br>*A=Cluster de passerelle Power Platform GC-1)*<br>*U=Dédiée/unique*<br>*R=surveillée et gérée de manière centralisée par les administrateurs du tenant corporatif*<br>*V=n/a*<br>*O=aucune* |
| *CG-2* | *Système Financier sur site (Principale)* | *Nouvelle passerelle Power BI permettant l'accès en lecture par le Power BI Service*<br>* *(Liste des tables exposées et horizon temporel pour chacune)*<br>* *Factures (exercice fiscal courant)*<br>* *Factures (exercice fiscal précédent)*<br>* *Factures (historiques [c.-à-d., avant l'exercice fiscal précédent])*<br>* *Paiements (exercice fiscal courant, exercice fiscal précédent)* | *T=Nouvelle*<br>*S=Hors ligne*<br>*E=PROD (aucune passerelle DEV ou TEST)*<br>*A=Autonome*<br>*U=Partagée/multiple*<br>*R=surveillée et gérée localement par le département comptabilité*<br>*V=n/a*<br>*O=aucune* |
| *CG-3* | *Système Financier sur site (Secours)* | *Passerelle Power BI de secours pour fournir le même accès que la passerelle Power BI principale du système financier (CG-2)* | *T=Secours*<br>*S=Hors ligne*<br>*E=PROD (aucune passerelle DEV ou TEST)*<br>*A=Autonome*<br>*U=Partagée/multiple (passerelle de secours commune fournissant une protection de basculement pour plusieurs passerelles principales)*<br>*R=surveillée et gérée localement par le département comptabilité*<br>*V=mensuelle pendant 24 heures (le premier lundi à partir du 15 du mois ; bascule complète [désactivation de la principale, activation de la secours])*<br>*O=mémoire (16 Go contre 256 Go pour CG-2)* |

### Cloud

Décrivez tous les détails nécessaires pour configurer la connexion, y compris le type, le type d'identifiant, les identifiants, la méthode d'authentification, etc.

Voici quelques bonnes pratiques à considérer :
- Utilisez des connexions partageables
    - Prennent en charge plusieurs connexions à la même source de données
    - La sécurité et les permissions peuvent être ajustées selon les besoins :
        - Peuvent attribuer à différentes tables leur propre connexion séparée
        - Peuvent accorder la permission Utilisateur pour permettre à d'autres d'utiliser la connexion pour se lier à la source de données
- Utilisez des principaux de service (préféré) ou des comptes de service (bien) plutôt que des comptes personnels (à éviter)
    - Principaux de service : Aucune licence Power BI nécessaire, sécurité centralisée, gouvernance
    - Comptes de service : Licence Power BI nécessaire, sécurité distribuée (les identifiants doivent être partagés), expiration de mot de passe sans préavis
    - Comptes personnels : Licence Power BI nécessaire, sécurité gérée par d'autres, activation des identifiants et changements de permissions sans préavis (par ex., réaffectation, promotion/rétrogradation, retraite, départ, etc.)

## Dataflows

Décrivez la conception de tous les dataflows qui seront développés pour cette (série de) rapport(s). Incluez le type (par ex., staging, fait, dimension, support, etc.) et tous les filtres et transformations qui seront appliqués au dataflow.

> [!NOTE]  
> *Les dataflows doivent être écrits pour des personnes ; l'ordinateur exécutera un code fonctionnel quelle que soit sa clarté. Utilisez des espacements ainsi que des noms de variables et d'étapes longs et descriptifs (l'ordinateur les tokenisera de toute façon en interne, donc...) et écrivez pour ceux qui mettront à jour le code à l'avenir (ce qui pourrait bien être vous dans 6 mois)*<br><br>*Ne soyez pas le seul à comprendre votre code (ne laissez pas votre code « échouer au test du bus »).*

> [!NOTE]  
> *Les tables de staging sont idéalement utilisées uniquement pour la connexion et le transfert de données et ne contiennent aucune transformation*

Voici un exemple :

| **ID** | **Nom (Exemple)** | **Type** | **Source / Filtres / Transformations** |
| --- | --- | --- | --- |
| *D-1* | *RAW Clients* | *Staging* | *S=système opérationnel*<br>*F=aucun*<br>*T=aucune* |
| *D-2* | *RAW Factures* | *Staging* | *S=système opérationnel*<br>*F=uniquement les 2 derniers exercices fiscaux*<br>*T=aucune* |
| *D-3* | *Clients* | *Dimension* | *S=référence de D-1 (RAW Clients)*<br>*F=aucun*<br>*T=*<br>* *colonnes renommées en Casse Propre*<br>* *types de données des colonnes vérifiés* |
| *D-4* | *Factures* | *Fait* | *S=référence de D-2 (RAW Factures)*<br>*F=aucun*<br>*T=*<br>* *colonnes renommées en Casse Propre*<br>* *types de données des colonnes vérifiés* |
| *D-5* | *Régions* | *Dimension* | *S=référence de D-1 (RAW Clients)*<br>*F=aucun*<br>*T=*<br>* *colonnes renommées en Casse Propre*<br>* *types de données des colonnes vérifiés*<br>* *doublons supprimés*<br>* *index ajouté* |
| *D-6* | *Tranches d'ancienneté<br>(0-30j, 31-60j, 61-90j,<br>91-180j, 181j+)* | *Support* | *S=feuille de calcul Excel*<br>*F=aucun*<br>*T=aucune* |

## Modèle sémantique

Incluez une image du modèle de données et disposez les tables de manière claire (par ex., conception en cascade, avec les tables de dimension [lookup] en haut, les tables de faits au milieu, les tables de support en bas à gauche, et les tables de mesures en haut à droite, etc.)

<img width="1273" alt="07 - Image - Data Model" src="https://github.com/user-attachments/assets/cf7471b0-7cd4-4d87-be85-df1b486bc1ad" />

Décrivez la conception du modèle sémantique, y compris toutes les tables de faits, les tables de dimension (ou lookup), et les tables de support.

Attribuez un [ID] à chaque relation et décrivez-la entièrement, y compris les champs/colonnes qui seront utilisés pour lier les tables, la cardinalité, et la directionnalité de chaque relation.

> [!NOTE]  
> *Ceci correspond à l'intention de conception, et non à l'implémentation ; les fonctions DAX INFO seront utilisées dans les annexes [un exemple sera présenté dans un numéro suivant] pour extraire les relations réelles du modèle développé*

Voici un exemple :

| **ID** | **De (table[colonne])** | **Vers (table[colonne])** | **Cardinalité / Directionnalité** |
| --- | --- | --- | --- |
| *CR-1* | *Dates[Date]* | *Invoices[Date]* | *C=un-à-plusieurs*<br>*D=unique* |
| *CR-2* | *Customers[Customer ID]* | *Invoices[Customer ID]* | *C=un-à-plusieurs*<br>*D=unique* |

## Ressources

*Publications LinkedIn*

Les publications LinkedIn couvrant le document de conception sont listées ci-dessous : <br>
[1. Général et Portée](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Workflow, Enjeux, et Règles Métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U)) <br>
[3. Données](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>

*Exemples*

Des fragments de documents d'exemple couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1. Document de Conception - Fragment d'exemple 01 - Général et Portée](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Document de Conception - Fragment d'exemple 02 - Workflow, Enjeux, et Règles Métier](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Document de Conception - Fragment d'exemple 03 - Données](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
