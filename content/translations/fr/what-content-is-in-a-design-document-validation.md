---
title: "Quel contenu figure dans un Design Document - Validation"
date: 2025-04-15
tag: "designdocument"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/f1f0905b-b135-47fd-bd40-751ff21828cc"
excerpt: "Quelles caractéristiques de Validation doivent être décrites dans un Design Document ?"
sourceFile: "11 - What content is in a Design Document - Validation.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/11%20-%20What%20content%20is%20in%20a%20Design%20Document%20-%20Validation.md"
enSlug: "what-content-is-in-a-design-document-validation"
---

**Quelles caractéristiques de Validation doivent être décrites dans un Design Document ?**

La validation doit être menée à bien avec succès avant le déploiement de tout rapport. Idéalement, on utiliserait une validation automatisée, mais de nombreuses organisations (en particulier les plus petites) mettent en place et s'appuient sur une validation manuelle pour décider si un rapport est prêt pour une utilisation en production.

Une discussion sur la validation automatisée a été présentée précédemment par Alex dans le [numéro #6](<https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/06%20-%20Automated%20Testing%20in%20Power%20BI.md>) de cette série. Les tests manuels font l'objet de ce numéro.

Vous trouverez également ici une discussion générale sur certains éléments des trois grands domaines de la validation manuelle : les tests de développement, les tests de recette et les tests en production.

## Feuille de calcul de validation

Une manière de recenser et de clarifier la validation manuelle consiste à préparer un tableau des tests requis. Un tel tableau pourrait comporter des colonnes pour :

* Groupe de test (ID et nom)
* Test (ID, nom, notes, priorité, résultats attendus et tolérance/écart autorisé)
* Procédure (mise en place [étapes], procédure [étapes], résultats réels et démontage [étapes])
* Date (date et heure d'exécution et par qui)
* Statut (réussi, échoué, reporté)

C'est l'un des domaines où il peut effectivement être préférable de NE PAS inclure tous les détails dans le design document, mais d'utiliser plutôt une feuille de calcul séparée.

Un exemple de feuille de calcul avec quelques tests possibles pour un système de facturation est présenté ci-dessous :

<img width="1687" alt="11 - Image - Validation Spreadsheet - 2" src="https://github.com/user-attachments/assets/0d6f5434-671a-4878-8b89-416607a36c86" />

### Généralités

Le nom d'un test doit suivre un schéma de nommage cohérent et être court tout en restant pleinement descriptif. De même, les tests doivent être classés en groupes et se voir attribuer un niveau de priorité (par exemple, P1, P2, P3, critique, majeur, mineur, etc.).

> [!TIP]
> Attribuez un identifiant unique à chaque test et à chaque groupe de tests afin d'éviter tout malentendu

### Mise en place et démontage

Un test efficace nécessite un état de départ cohérent du système. Également appelé ***état initial***, il s'agit du système chargé avec un ensemble connu de données provenant des systèmes source.

La mise en place est la préparation du système de test en vue d'un test à venir, ou, en d'autres termes, ce sont les changements nécessaires ***pour faire passer le système de test de son état initial à un état prêt pour la conduite du test***. Les étapes de mise en place doivent être clairement énoncées (facilement reproductibles) car elles peuvent être exécutées à de nombreuses reprises.

Le démontage est la restauration du système de test à son état initial, ou, autrement dit, les changements nécessaires ***pour ramener le système de test à son état initial après l'exécution du test***. Là encore, les étapes doivent être clairement énoncées (facilement reproductibles) car elles peuvent être exécutées à de nombreuses reprises.

### Résultats

Les résultats attendus sont ceux déterminés à partir des systèmes source (c'est-à-dire ceux qui fournissent les données du rapport) avant le test.

Les résultats réels sont ceux obtenus en exécutant le test dans le système de test (c'est-à-dire le rapport lui-même).

L'écart est la différence entre les résultats attendus et les résultats réels. Exprimé sous forme de pourcentage, il peut facilement être comparé à une tolérance (ou écart autorisé) pour déterminer la réussite ou l'échec du test.

### Statut

La date à laquelle le test a été effectué, le nom de la personne qui l'a réalisé, et le statut du test doivent être consignés. Tous les tests qui ont été menés à terme doivent comporter ces 3 éléments, tandis que des notes explicatives décrivant la cause/situation doivent accompagner tout test qui a été reporté.

Ces informations, examinées conjointement avec les priorités des tests, permettront une évaluation objective de la question de savoir si un système (rapport) a passé la validation et est prêt à être déployé dans l'environnement de production.

## Tests de développement

Les tests de développement font partie intégrante du processus de développement et sont réalisés en continu par les développeurs pendant la période de développement.

### Critères de conception

Des cas de test doivent être fournis aux développeurs pendant la période de développement afin de garantir que les critères qui seront utilisés lors des tests de recette servent également à développer la solution.

Chaque cas de test doit décrire un scénario et le comportement attendu, y compris, le cas échéant, les chemins normaux, alternatifs et d'exception.

> [!TIP]
> *L'une des meilleures façons d'accélérer la vitesse d'un projet consiste à rédiger les cas de test le plus tôt possible dans le cycle de développement ; les développeurs peuvent alors tenir compte des critères de test lors de la conception et de l'itération de la solution. (Si les cas de test ne sont élaborés qu'au moment des tests de recette, cela diminue la probabilité que la solution se comporte comme souhaité et réponde aux attentes.)*

### Tests unitaires

Les tests unitaires sont effectués sur des composants individuels du système par les développeurs tout au long de la période de développement.

### Tests d'intégration

Les tests d'intégration sont effectués sur l'ensemble du système par les développeurs tout au long de la période de développement et permettent de vérifier les connexions entre les modules (rapports) et les sources de données.

Pour les rapports destinés à plusieurs publics, les tests d'intégration doivent être réalisés pour chaque public (par exemple, IT, administrateurs, utilisateurs, externes, etc.).

## Tests de recette

Les tests de recette doivent être réalisés par des personnes différentes des développeurs, idéalement celles qui sont responsables (c'est-à-dire les utilisateurs métier) de s'assurer que les rapports répondent aux critères d'acceptation métier. Ceci est également communément appelé UAT, ou User Acceptance Testing.

Si les tests de recette ne sont pas réalisés et que l'on s'appuie à la place sur les tests des développeurs, alors les impacts et les risques suivants doivent être acceptés, tels que :

- L'environnement DEV peut ne pas être représentatif de l'environnement PROD (par exemple, caractéristiques du poste de travail, performance réseau [géographique], etc.)
- Les développeurs testeront leur propre compréhension du fonctionnement du système (rapport), ce qui n'est pas nécessairement la manière dont le système (rapport) devrait fonctionner
  - Pour atténuer cet impact, il est impératif que les spécifications du rapport soient exhaustives et couvrent tous les flux normaux, alternatifs et d'exception
- Les développeurs disposent souvent de permissions élevées dans l'environnement DEV et, par conséquent, la sécurité du système (rapport) peut ne pas être vérifiée de manière adéquate
- L'environnement DEV présente souvent un volume, une variété et une fraîcheur des données réduits par rapport à l'environnement PROD

Les tests de recette doivent être réalisés dans un environnement de test dédié qui :

- Est configuré de la même manière que l'environnement de production
- Dispose d'une variété, d'une fraîcheur, d'un volume et d'un accès aux données représentatifs :
  - Pour donner confiance dans le fait que les tests refléteront l'utilisation en environnement de production
  - Pour tirer parti de la connaissance métier des testeurs (utilisateurs métier) quant à la validité ou non des valeurs, ou à leur conformité avec les plages de tolérance

De plus, des comptes appropriés doivent être mis à disposition des testeurs pendant les tests afin de confirmer la sécurité de la solution.

### Tests fonctionnels

Au niveau le plus élémentaire, si le système (rapport) ne présente pas les fonctionnalités prévues dans le périmètre, alors le système (rapport) n'a pas atteint son objectif. Toutes les fonctionnalités doivent donc être couvertes lors des tests de recette afin de vérifier que le système (rapport) répond à ses exigences.

### Tests de conformité aux standards

Les tests de conformité aux standards dépendront de l'organisation et refléteront les normes attendues pour tout rapport existant au sein de l'organisation (par exemple, transitions entre pages en moins d'une seconde, actualisation d'une matrice après sélection dans un slicer en moins de 2 secondes, etc.). De plus, une organisation peut disposer d'une thématisation et d'une mise en page visuelle standard qui doivent être respectées (par exemple, polices, couleurs, ombrages, navigation par barre latérale, etc.), et cela doit également être vérifié.

Les tests de conformité aux standards doivent également toujours être réalisés avec une configuration/un environnement fixe (par exemple, Windows 11 Home 64 bits, processeur Intel I5, 8 Go de RAM, navigateur utilisé = Microsoft Edge version 1.35.0, niveau d'utilisation réseau normal [par exemple, pas entre 9h et 11h ET, pas de nuit (23h-7h)], etc.).

### Tests de performance

Même si un système (rapport) présente toutes les fonctionnalités requises et respecte l'ensemble des standards applicables, il risque de ne pas être utilisé par les utilisateurs finaux (et donc de ne pas remplir son objectif) s'il est trop lent. La performance doit atteindre un niveau acceptable avant qu'une décision de déploiement ne soit prise, et cela doit être vérifié.

Pour que les tests de performance soient pertinents, l'environnement de test doit, comme indiqué ci-dessus, être représentatif de l'environnement de production en termes de variété, de fraîcheur, de volume et d'accès aux données, et doit présenter une charge et une performance réseau similaires à celles de la production.

### Tests de sécurité

Pour les rapports destinés à plusieurs publics, les tests de recette doivent être réalisés à l'aide de comptes appropriés pour chaque public cible (par exemple, IT, administrateurs, utilisateurs, externes, etc.). Ces tests doivent garantir que seuls les enregistrements appropriés sont affichés à chaque groupe (par exemple, les cadres dirigeants voient tous les enregistrements, les responsables commerciaux ne voient que les enregistrements de leurs territoires, les commerciaux ne voient que leurs propres enregistrements de ventes, etc.).

### Validation finale (Signoff)

Chaque test de recette individuel doit être validé (signoff) et daté par la personne qui a réalisé le test, et se voir attribuer un statut.

Une fois que tous les tests ont été validés, une décision globale ***go/no-go*** peut être prise par le propriétaire métier quant à savoir si le système est prêt à être déployé dans l'environnement de production.

## Utilisation en production

### Tests de fumée (Smoke Testing)

Des tests de fumée doivent être effectués après le déploiement dans l'environnement de production afin de confirmer l'accès au rapport, son bon fonctionnement, et qu'il est prêt à être utilisé.

Les tests de fumée désignent des tests légers ou ad hoc portant sur les principales fonctionnalités et sont souvent utilisés pour identifier les signaux d'alerte ou points sensibles à résoudre avant une utilisation généralisée.

> [!NOTE]
> *L'expression « smoke testing » fait référence au vieil adage : **« il n'y a pas de fumée sans feu »***

### Surveillance (Monitoring)

Les tests ne sont pas ***« terminés »*** une fois qu'un rapport est déployé dans l'environnement de production ; au contraire, une surveillance continue doit être régulièrement effectuée pour confirmer que le rapport fonctionne comme prévu, et peut porter notamment sur les domaines suivants :

- Actualisation des données (l'actualisation planifiée se déroule-t-elle comme prévu ?)
- Fonctionnalité (les fonctionnalités inhérentes fonctionnent-elles comme prévu ?)
- Accès (la sécurité est-elle correctement appliquée pour le(s) public(s) interne(s) et les utilisateurs externes [le cas échéant] ?)

Un sur-ensemble ou un sous-ensemble de ces domaines s'appliquera selon les situations et sera soumis aux critères de surveillance propres à l'organisation.

Il convient toutefois de noter, dans tous les cas, les identifiants utilisés pour la surveillance : si la personne chargée de la surveillance est administratrice et utilise son propre compte (ou un compte de service) pour surveiller l'espace de travail/le modèle sémantique/le rapport/l'application, alors les permissions élevées peuvent ne pas être représentatives de l'utilisation par le public visé. Un compte disposant des identifiants et permissions appropriés doit tout particulièrement être utilisé s'il existe des restrictions d'accès ou de sécurité pour les utilisateurs externes.

### Reproduction des incidents

Souvent, les tests manuels ne seront pas exhaustifs, et il n'est pas rare non plus que des utilisateurs rencontrent des problèmes et déposent des rapports d'anomalie (bug reports). L'utilisateur cherche souvent avant tout à signaler qu'un problème existe, plutôt qu'à fournir un ensemble complet d'étapes permettant de reproduire ce problème. De plus, le simple fait qu'un problème existe ne signifie pas nécessairement qu'il doive être corrigé immédiatement.

Le fait qu'un utilisateur ou une équipe documente un incident de manière précise et complète est très utile pour pouvoir reproduire ce problème (par exemple, compte, configuration du poste de travail, navigateur utilisé, etc.), et contribuera à ce que la gravité, la priorité et l'estimation de l'effort nécessaire soient correctement évaluées et hiérarchisées. Le traitement du problème peut ensuite être soit planifié, soit ajouté à la liste des problèmes connus.

## Ressources

*Publications LinkedIn*

Les publications LinkedIn couvrant le design document sont listées ci-dessous : <br>
[1. Généralités et périmètre](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7295051537129615362-px8i) <br>
[2. Workflow, incidents et règles métier](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7300125349743316992-tG1U) <br>
[3. Données](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7305187426413563904-6yVG) <br>
[4. Rapports](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7310232246613934082-w7iW) <br>
[5. Validation](https://www.linkedin.com/posts/gregphilps_powerbi-documentationmatters-dataanalytics-activity-7317852256215662593-MvcI)

*Exemples*

Des extraits de documents d'exemple couvrant des sections spécifiques sont disponibles dans le dépôt GitHub : <br>

[1. Design Document - Sample Fragment 01 - General and Scope](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2001%20-%20General%20and%20Scope%20-%20V0.1.docx) <br>
[2. Design Document - Sample Fragment 02 - Workflow, Issues, and Business Rules](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2002%20-%20Workflow%20Issues%20and%20Business%20Rules%20-%20V0.2.docx) <br>
[3. Design Document - Sample Fragment 03 - Data](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2003%20-%20Data%20-%20V0.3.docx) <br>
[4. Design Document - Sample Fragment 04 - Reports](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2004%20-%20Reports%20-%20V0.4.docx) <br>
[5a. Design Document - Sample Fragment 05 - Validation](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Fragment%2005%20-%20Validation%20-%20V0.5.docx) <br>
[5b. Design Document - Sample Validation Spreadsheet](https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/Design%20Document%20-%20Sample%20Validation%20Spreadsheet%20-%20V0.5.xlsx)
