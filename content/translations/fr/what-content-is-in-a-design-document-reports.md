---
title: "Quel contenu doit figurer dans un Document de Conception - Rapports"
date: 2025-03-24
tag: "designdocument"
author: "Greg Philps"
cover: "https://github.com/user-attachments/assets/124ffa1b-0dd0-4ba9-a9d6-2c6e95a39302"
excerpt: "Quelles caractéristiques des rapports doivent être décrites dans un Document de Conception ? De nombreux projets Power BI comportent plusieurs fichiers, et la conception est donc souvent dispersée..."
sourceFile: "09 - What content is in a Design Document - Reports.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/09%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Reports.md"
enSlug: "what-content-is-in-a-design-document-reports"
---

**Quelles caractéristiques des rapports doivent être décrites dans un Document de Conception ?**

De nombreux projets de reporting Power BI comportent plusieurs fichiers, et, de ce fait, la conception sera probablement dispersée, ce qui peut rendre difficile l'obtention d'une vue d'ensemble (surtout lorsque plusieurs développeurs sont impliqués). Le document de conception offre un **guichet unique** et peut améliorer à la fois la clarté et la cohérence de la conception (sans oublier qu'il réduit du même coup les reprises de travail).

Les rapports du projet ne partageront pas seulement, dans l'idéal, un thème et un modèle de données commun ; il existe probablement d'autres éléments communs également (par ex. thème, navigation, etc.). Les éléments propres à un rapport individuel (par ex. filtres, visuels, etc.) sont décrits séparément ci-dessous.

## Éléments communs

Décrivez les caractéristiques de conception qui seront communes à tous les rapports du projet.

### Thème

Décrivez le fichier de thème utilisé dans les rapports, y compris la taille de page, les couleurs, les polices, les tailles de police, etc.

| **ID** | **Élément** | **Description** | **Notes** |
| --- | --- | --- | --- |
| *T-1* | *Page* | *Bureau :*<br>*Taille du canevas - 1600 par 900*<br>*Arrière-plan du canevas - gris clair (#F0F0F0)*<br>*Papier peint - aucun*<br>*Cartes de filtre - couleurs par défaut*<br><br>*Mobile :*<br>*s.o.* | *pixels, largeur par hauteur* |
| *T-2* | *Couleurs, Principales* | *Nuances de bleu*<br>*#8BC7F7*<br>*#46B3F3*<br>*#009FEF*<br>*#008CEE*<br>*#0078ED*<br>*#0050EB*<br>*#0641C8*<br>*#0B31A5* | *Basé sur le thème « Storm »*<br>*inclus avec Power BI Desktop* |
| *T-3* | *Couleurs, Sentiment* | *Vert-jaune-rouge (c.-à-d. « feu tricolore »)*<br>*Négatif - rouge (#E81123)*<br>*Positif - vert (#3BB44A)*<br>*Neutre - jaune (#F2C811)* |  |
| *T-4* | *Polices* | *Titres de visuels - Segoe UI Semibold, 12 pt, noir (#000000)*<br>*Sous-titres de visuels - Segoe UI, 10 pt, gris foncé (#969696)*<br>*Étiquettes d'axe - Segoe UI, 8 pt, noir*<br>*Titres d'axe - aucun (désactivé ; plutôt inclus dans le titre du visuel)*<br>*Étiquettes de données - Segoe UI, 8 pt, noir*<br>*Valeurs d'appel - Segoe UI Semibold, 18 pt, noir* |  |
| *T-5* | *Visuels* | *Marge intérieure (pixels) - 4/4/4/4*<br>*Coins arrondis (visuels) - 8 pixels*<br>*Coins arrondis (cartes, boutons) - 4 pixels*<br>*Couleur d'arrière-plan - blanc (#FFFFFF)*<br>*Ombre - aucune*<br>*Lueur - aucune* |  |
| *T-6* | *Divers* | *Titres de visuels - désactivés*<br>*Icônes - désactivées*<br>*Lignes de grille - gris clair (#E3E3E3)*<br>*Infobulles - Modernes*<br>*Pages - Une seule visible, toutes les autres masquées* |  |

### Filtres

Décrivez les filtres qui seront appliqués à chaque rapport :

- N'inclure que les clients actifs (c.-à-d. ceux ayant des factures actives)
- N'inclure que les factures actives (c.-à-d. celles qui ne sont pas supprimées)
- N'inclure que les factures de l'année civile en cours et des deux années précédentes

Voici un exemple :

<img width="160" alt="09 - Image - Filter Pane" src="https://github.com/user-attachments/assets/3ae730cc-9061-4ed0-a746-ba40e986e865" />

Les filtres propres à chaque rapport devraient être listés dans leurs sections respectives ci-dessous.

### Navigation

La navigation devrait être évidente (et explicite d'elle-même) et ne devrait nécessiter aucune instruction pour le public.

Une surcouche d'information peut également être ajoutée pour fournir une identification et une illustration supplémentaires de l'utilisation des éléments de navigation. De nombreux outils de conception peuvent être utilisés à cet effet.

Voici une procédure rapide :

- S'assurer que le rapport Power BI est terminé
- Prendre une capture d'écran de la page finale du rapport Power BI
- Modifier l'image de capture d'écran dans un outil de conception
- Superposer un rectangle plein écran (sans bordure, partiellement transparent)
	- *L'image de capture d'écran du rapport Power BI se trouve maintenant en arrière-plan*
- Ajouter des rappels visuels pour les fonctionnalités de navigation souhaitées
- Masquer ou supprimer l'image d'arrière-plan
- Enregistrer l'image (en tant qu'image)
- Ajouter l'image au fichier Power BI Desktop (l'étendre au plein écran)
- Ajouter 2 signets (panneau ouvert, panneau fermé)
- Ajouter un bouton d'information pour activer le signet « panneau ouvert »
- Modifier l'action de l'image pour activer le signet « panneau fermé »

*Guy in a Cube* a publié une vidéo en 2021 illustrant ce processus :

https://www.youtube.com/watch?v=yYr_SlG8bpw

L'expérience actuelle du public avec la navigation employée dans les rapports Power BI opérationnels de votre organisation devrait constituer la méthode de navigation par défaut, et ne devrait être modifiée que si le(s) public(s) du (des) rapport(s) le demande(nt) expressément.

Une App Power BI devrait être la première option pour la navigation multi-rapports ; les rapports individuels peuvent alors être conçus sans système de navigation (c.-à-d. uniquement des pages), l'App fournissant la navigation hiérarchique par défaut sans aucun code.

Si une navigation autonome est utilisée dans chaque rapport, disposez les éléments sous forme de barre supérieure ou de barre latérale (ou les deux) et concevez-les avec un « rebond » (changements subtils lors du survol et de la sélection [par ex. taille de police, couleur de police, couleur d'arrière-plan, soulignement, etc.]) afin que les utilisateurs sachent intuitivement où ils se trouvent et comment naviguer. Décrivez tous les éléments, y compris [ID], nom (catégorie et sous-catégorie), et conception (normal, survol, sélectionné).

Voici un exemple :

| **ID** | **Nom (Catégorie / Sous-catégorie)** | **Conception / Sélectionné / Non sélectionné / Survol** |
| --- | --- | --- |
| *N-1* | *Factures* | *CONCEPTION :*<br>* *Type=bouton*<br>* *Forme=quelconque, avec bordure=désactivée*<br>* *Action=navigation de page (sous-catégorie 1)*<br><br>*PAR DÉFAUT (sélectionné) :*<br>* *Police=Segoe UI, blanc, 10 pt*<br>* *Arrière-plan=bleu foncé*<br>* *Navigation=page, Invoices-All*<br><br>*PAR DÉFAUT (non sélectionné) :*<br>* *Police=Segoe UI, gris moyen, 10 pt*<br>* *Arrière-plan=bleu moyen*<br>* *Navigation=page, Invoices-All*<br><br>*SURVOL :*<br>* *Police=Segoe UI, gris foncé,* ***11 pt***<br>* *Arrière-plan=gris moyen*<br>* *Navigation=page, Invoices-All* |
| *N-2* | *Factures / Toutes* | *(identique à N-1 ci-dessus)* |
| *N-3* | *Factures / En cours* | *(identique à N-1 ci-dessus, mais avec une navigation de page ajustée et<br>les valeurs par défaut sélectionné/non sélectionné inversées)* |
| *N-4* | *Factures / À venir* | *(identique à N-1 ci-dessus, mais avec une navigation de page ajustée et<br>les valeurs par défaut sélectionné/non sélectionné inversées)* |
| *N-5* | *Factures / Historique* | *(identique à N-1 ci-dessus, mais avec une navigation de page ajustée et<br>les valeurs par défaut sélectionné/non sélectionné inversées)* |

*REMARQUE : Le drill-through n'est pas de la navigation et devrait plutôt être décrit dans chaque rapport spécifique.*

### En-tête de page

Décrivez tous les éléments qui seront présents dans l'en-tête de chaque page.

Voici un exemple :

Chaque page du rapport comportera les éléments d'en-tête suivants :

- Titre du rapport
- Menu de navigation horizontal à 2 niveaux (niveau 1 = catégorie [au-dessus], niveau 2 = sous-catégorie, ou page [en dessous])
  + Factures
    - Toutes
    - En cours
    - À venir
    - Historique
  + Clients
    - Niveau
    - Palier
    - Pays
  + Autre
    - Adresses
    - Problèmes connus
- Sélecteur de langue
  + FR/EN
- Date de dernier rafraîchissement des données (à partir du jeu de données commun utilisé par le rapport)
  + *Remarque : cela reflétera la dernière date/heure à laquelle le jeu de données a été rafraîchi par le Service Power BI, et n'indique pas la date/heure à laquelle les données ont été extraites pour la dernière fois des systèmes sources*

### Pied de page

*Décrivez tous les éléments qui seront présents dans le pied de page de chaque page.*

*Voici un exemple :*

*Chaque page du rapport comportera les éléments de pied de page suivants :*

- *Ligne – Séparateur (gris)*
- *Image – Logo (à gauche)*
- *Zone de texte - Sélections de filtres (au milieu)*
- *Zone de texte (ou Carte) – ID / Version / Date de version du rapport (à droite)*
- *Zone de texte (ou Carte) – ID / Version / Date de version du jeu de données (à droite)*

### Sélecteurs (Slicers)

Les sélecteurs devraient utiliser les mêmes caractéristiques de conception et ne devraient nécessiter aucune instruction pour le public.

*Décrivez les sélecteurs qui seront inclus sur toutes les pages du rapport.*

*Voici un exemple :*

| **ID** | **Sélecteur** | **Caractéristiques de conception / Données / Notes** |
| --- | --- | --- |
| *s.o.* | *Général* | *Titre=Segoe UI Semibold, 10 pt*<br>*Valeurs=Segoe UI, 8 pt*<br>*Style=liste déroulante*<br>*Sélection=multi-sélection ; CTRL désactivé ; Tout sélectionner désactivé*<br>*Icônes d'en-tête=désactivées*<br>*Zone de recherche=activée* |
| *S-1* | *Année fiscale* | *Données=Dates[Fiscal Year]*<br>*Notes=zone de recherche indisponible car donnée numérique* |
| *S-2* | *Trimestre fiscal* | *Données=Dates[Fiscal Quarter]*<br>*Notes=zone de recherche indisponible car donnée numérique* |
| *S-3* | *Plage de dates* | *Type=entre*<br>*Curseur=activé, réactif désactivé*<br>*Données=Dates[Date]* |
| *S-4* | *Province* | *Type=texte*<br>*Données=Countries[Province]* |
| *S-5* | *Ville* | *Type=texte*<br>*Données=Countries[City]* |

## Éléments spécifiques

Décrivez les caractéristiques de conception qui seront utilisées dans chaque rapport spécifique du projet (par ex. filtres [en plus de ceux déjà appliqués aux données communes], pages, sélecteurs, visuels, etc.).

Voici quelques descriptions :

## Modèle sémantique (spécifique)

Décrivez la conception de chaque modèle sémantique spécifique dans chaque rapport spécifique, y compris toutes les tables de faits, les tables de dimensions (de recherche), et les tables de support.

Attribuez un [ID] à chaque relation et décrivez-la intégralement, y compris les champs/colonnes qui seront utilisés pour lier les tables, la cardinalité, et le sens de chaque relation.

*(Remarque : il s'agit de l'intention de conception, et non de l'implémentation ; les fonctions DAX INFO seront utilisées dans les annexes [un prochain numéro] pour extraire les relations réelles du modèle développé.)*

Voici un exemple :

| **ID** | **De (table[colonne])** | **Vers (table[colonne])** | **Cardinalité / Sens** |
| --- | --- | --- | --- |
| *CR-1* | *Dates[Date]* | *Invoices[Date]* | *C=un-à-plusieurs*<br>*D=unique* |
| *CR-2* | *Customers[Customer ID]* | *Invoices[Customer ID]* | *C=un-à-plusieurs*<br>*D=unique* |

Incluez une image de chaque modèle de données spécifique dans chaque rapport spécifique et disposez les tables pour plus de clarté (par ex. conception en cascade, avec les tables de dimensions (de recherche) en haut, les tables de faits au milieu, les tables de support en bas à gauche, et les tables de mesures en haut à droite, etc.)

<img width="1272" alt="09 - Image - Data Model - Light Mode" src="https://github.com/user-attachments/assets/b1da368c-84bf-47c0-8472-ba117593c45b" />

### AR01 – Toutes les factures

Ce rapport présente des informations de synthèse et des KPI sur l'ensemble des factures, et comprend les éléments suivants :


Filtres :

-	aucun

Sélecteurs :

- Hiérarchie année fiscale et trimestre fiscal
- Hiérarchie province et ville
- Clients

KPI :

- Nombre de clients
- Nombre de factures
- Montant total des factures
- Montant total des factures en souffrance
- Date de facture la plus ancienne
- Date de facture la plus récente

Jauges :

- Montant des factures payées par rapport aux montants totaux des factures
- Montant des factures en souffrance par rapport aux montants totaux des factures

Graphiques à barres horizontales :

- Montants totaux des factures par province
- Montants totaux des factures par mode de paiement

### AR02 – Factures en cours

Ce rapport présente des informations détaillées sur les factures impayées (avec échéancier), et comprend les éléments suivants :

Filtres :

-	Invoices[Status] != PAID
-	Invoices[Status] IN { ISSUED, OVERDUE }

Sélecteurs :

- Année fiscale
- Trimestre fiscal
- Province
- Ville
- Clients
- Mode de paiement, Centre de fonds, Centre de coûts, Type de matériel

KPI :

- Montant total des factures
- Montant total des factures payées
- Montant total des factures en souffrance

Matrice :

- Clients en lignes
- Groupes d'échéancier des factures en colonnes

Table :

- Colonnes pour le groupe d'échéancier des factures, le montant des factures en souffrance par groupe, le pourcentage du montant des factures en souffrance par rapport au total par groupe (pourcentage avec barres de données)
- Graphique à barres horizontales :
  + Factures en souffrance par client

### AR03 – Factures à venir

Ce rapport présente des informations détaillées sur les factures en cours de traitement et futures, et comprend les éléments suivants :

Filtres :

-	Invoices[Status] IN { SCHEDULED, DRAFT, IN PROGRESS, APPROVED }

Sélecteurs :

- Année fiscale
- Trimestre fiscal
- Province
- Ville
- Clients

KPI :

- Montant total des factures
- Montant total des factures payées
- Montant total des factures en souffrance

Table :

- Détail des factures, avec colonnes pour le client, l'ID de commande/projet, le numéro de facture (provisoire), le montant (prévu), la date de facture (planifiée)

### AR04 – Factures historiques

Ce rapport présente des informations détaillées sur les factures payées, et comprend les éléments suivants :

Filtres :

-	Invoices[Status] = PAID

Sélecteurs :

- Année fiscale
- Trimestre fiscal
- Province
- Ville
- Clients

Cartes géographiques :

- Montant des factures par ville
- Montant des factures en souffrance par ville

## Ressources

*Publications LinkedIn*

Les publications LinkedIn couvrant le document de conception sont listées ci-dessous : <br>
[1. Généralités et Périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Flux de travail, Problèmes, et Règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>
[3. Données](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>
[4. Rapports](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>

*Exemples*

Des fragments de documents d'exemple couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1. Document de Conception - Fragment d'Exemple 01 - Généralités et Périmètre](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Document de Conception - Fragment d'Exemple 02 - Flux de travail, Problèmes, et Règles métier](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Document de Conception - Fragment d'Exemple 03 - Données](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
[4. Document de Conception - Fragment d'Exemple 04 - Rapports](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2004%20-%20Reports%20-%20V0.4.docx) <br>
