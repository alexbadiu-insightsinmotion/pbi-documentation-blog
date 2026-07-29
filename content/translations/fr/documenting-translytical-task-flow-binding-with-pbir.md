---
title: "Documenter le binding des Translytical Task Flow avec PBIR"
date: 2026-03-31
tag: "PBIR"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/aa90b868-7b7d-4849-b745-69a30eaa0c23"
excerpt: "Les Translytical Task Flows sont en disponibilité générale, mais documenter leur câblage n'est pas si simple."
sourceFile: "24 - Documenting Translytical Task Flow binding with PBIR.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/24%20-%20Documenting%20Translytical%20Task%20Flow%20binding%20with%20PBIR.md"
enSlug: "documenting-translytical-task-flow-binding-with-pbir"
---

![Issue #24](https://github.com/user-attachments/assets/aa90b868-7b7d-4849-b745-69a30eaa0c23)

**Les Translytical Task Flows sont en disponibilité générale, mais documenter leur câblage n'est pas si simple.**

Fabcon Atlanta 2026 l'a rendu officiel : les Translytical Task Flows (des boutons d'action qui invoquent des Fabric User-Defined Functions depuis Power BI) sont désormais en disponibilité générale. Cela signifie qu'il faut anticiper un usage réel, à la fois en production sur les rapports et dans les opérations de maintenance.

Voici un scénario réaliste : vous héritez de l'un de ces rapports, créé par un autre collègue, et la logique de l'UDF a changé. Vous devez ajouter un nouveau paramètre dynamique basé sur DAX. Vous ouvrez le rapport, trouvez le bouton d'action, et réalisez : il n'existe aucune vue claire de ce qui est lié à quoi. L'interface ne l'expose pas. Un mauvais clic sur le bouton **fx** et tout le binding disparaît.

La carte du binding n'est pas perdue. Elle est distribuée entre la définition du rapport PBIR et les fichiers TMDL du modèle sémantique. Cet article vous montre comment la reconstruire intégralement, ainsi que six pratiques qui rendent tout futur rapport auto-documenté. Entrons dans le vif du sujet.

### Pourquoi l'interface ne vous aidera pas

Le rapport a l'air propre. Nous avons des boutons d'action sur la page. Dans l'image ci-dessous, je mettrais en évidence le bouton fx.

<img width="176" height="595" alt="Pasted image 20260330171207" src="https://github.com/user-attachments/assets/9ec06b11-cb95-435f-a3ac-3a141b0bc00f" />

Vous pouvez cliquer dessus et sélectionner la User Data Function, en supposant que vous sachiez déjà laquelle choisir.

<img width="1088" height="426" alt="Pasted image 20260330171257" src="https://github.com/user-attachments/assets/3318b108-ab32-4080-b0fe-d1b6fbe86a02" />

<img width="164" height="937" alt="Pasted image 20260330171937" src="https://github.com/user-attachments/assets/ba9cbb27-4795-4a78-adc6-f495b3883134" />

**Le risque est immédiat.** Cliquer sur ce bouton réinitialise le binding. Toute configuration de paramètre que vous n'avez pas documentée disparaît. Vous repartez de zéro.

> [!IMPORTANT]
> Vous ne pouvez pas contrôler ce que vous ne comprenez pas, et vous ne pouvez pas comprendre ce que vous n'observez pas.

Le réflexe naturel est de regarder à l'intérieur du JSON PBIR. Les bindings doivent bien être stockés quelque part dans `visual.json`.

<img width="551" height="669" alt="Pasted image 20260330174246" src="https://github.com/user-attachments/assets/9e09781c-dae4-4612-89c3-e0a3cb3bed75" />

Ils ne s'y trouvent pas directement.

Rechercher le GUID du bouton (`59f8b15373dbadd47ff9`, l'`actionButton` nommé `btn_ReviewNextSegment`) dans `visual.json` le confirme : `"parameters": []` est toujours vide. **PBIR ne persiste pas les bindings de paramètres UDF.** Ce n'est ni une mauvaise configuration, ni un bug. Les données de binding ne sont simplement pas stockées dans ce champ.

### La Résolution : reconstruire la carte complète du binding

La carte du binding existe. Elle est simplement distribuée. Le schéma de la table de write-back révèle les paramètres UDF attendus. Les visuels de la page révèlent les sources de binding. Les mesures TMDL révèlent la logique. Il vous suffit de savoir où regarder.

Voici le prompt exact que j'utilise. Déposez-le dans n'importe quelle nouvelle session IA. Remplacez les deux placeholders. L'IA fait le reste.

```
I have a Power BI PBIP project. I need you to fully document the UDF (Data Function) parameter bindings for one action button, discovering everything from the PBIR JSON and semantic model files. Assume we know nothing about the parameters upfront.

Working directory: <PBIP_ROOT> ← replace with the actual path
Button visual GUID: <VISUAL_GUID> ← replace with the visual ID (e.g. 59f8b15373dbadd47ff9)

Please follow these steps exactly, using ONLY the local PBIR/TMDL files:

STEP 1: Locate the button
Search all visual.json files under <PBIP_ROOT>/**.Report/definition/pages/_/visuals/_/visual.json for the file whose "name" field equals <VISUAL_GUID>. Confirm it is a DataFunction-type action button (visualLink.type = 'DataFunction'). Note: "parameters": [] being empty is expected. PBIR does not persist UDF bindings.

STEP 2: Identify the write-back table
Look for tables in <PBIP_ROOT>/**.SemanticModel/definition/tables/ that are likely write-back buffers. Signals to look for:
• Table names containing "Buffer", "Submission", "WriteBk", or "Staging"
• Measures using USERPRINCIPALNAME() (signals the UPN is written back)
• Columns like CountryID, Status, SavedDateTime, SubmittedBy
Read the best candidate table's .tmdl file and list ALL its columns with data types. These columns are the candidate UDF parameters (the fields written by the UDF).

STEP 3: Identify the page and all its visuals
From the button's visual.json path, extract the page GUID. Read all visual.json files on the same page. For each visual, extract:
• visual name (GUID)
• visualType
• title (from visualContainerObjects.title)
• all query field projections (queryRef, nativeQueryRef, Entity, Property)

STEP 4: Map write-back columns to page visuals and measures
For each column of the write-back table, find the most likely source on the page:
a) Slicer visuals (advancedSlicerVisual, slicer, textSlicer) → match by field Entity/Property
b) fx measures in KeyMeasures.tmdl → match by:
   • USERPRINCIPALNAME() → userUpn-type param
   • SELECTEDVALUE(DimX[Key]) → ID/key-type params
   • SUM / CALCULATE aggregates → amount/volume params
c) Numeric parameter slicers (tables generating 0–N series) → percentage/rate params

STEP 5: Produce the final parameter table
Output a markdown table with columns:
| UDF Parameter Name | Binding Type | Power BI Object Name | Visual GUID | Measure / Column / Field | Source File |

Include one row per write-back column. For any column that cannot be matched, mark binding as "UNKNOWN (requires UDF notebook inspection)".

STEP 6: PBIR limitation note
Confirm that "parameters": [] is present in the button's visual.json and note that this is a known PBIR serialization limitation (not a misconfiguration).
```

### 6 pratiques pour rendre les bindings UDF auto-documentés

Le prompt ci-dessus résout le problème immédiat. Les six bonnes pratiques suivantes l'éliminent pour l'avenir. Appliquez-les à chaque nouveau rapport Translytical, et n'importe quelle IA ou humain pourra reconstruire la carte complète du binding à partir des seuls fichiers TMDL.

#### 1. Nommez vos visuels d'après leur paramètre UDF

Définissez le **title** du visuel (le champ `visualContainerObjects.title` dans PBIR) pour qu'il corresponde exactement au nom du paramètre UDF. PBIR sérialise les titres. Une IA peut les lire directement.

| Au lieu de... | Utilisez... |
|---|---|
| `slicer_Country` | `udf_countryName` |
| `Select Primary Driver` | `udf_primaryDriver` |
| `Justify Your Assumptions` | `udf_justification` |
| `Select Confidence Rating` | `udf_confidenceRating` |

Un prompt du type « trouve tous les visuels dont le titre commence par `udf_` » associe immédiatement les paramètres aux visuels. Aucune déduction n'est nécessaire.

#### 2. Ajoutez un `displayFolder` aux mesures liées aux UDF dans le modèle sémantique

Regroupez toutes les mesures qui alimentent des paramètres UDF sous un dossier dédié dans `KeyMeasures.tmdl` :

```
measure UPN = USERPRINCIPALNAME()
    displayFolder: "UDF Parameters"

measure 'Selected Country Key' = SELECTEDVALUE(DimCountry[CountryKey])
    displayFolder: "UDF Parameters"

measure 'Total Volume NY' = CALCULATE(SUM(FactSales[Volume]), Dates[Year] = 2026)
    displayFolder: "UDF Parameters"
```

Rechercher `displayFolder: "UDF Parameters"` récupère instantanément tous les candidats paramètres fx.

#### 3. Ajoutez des annotations `description` de mesure pour documenter le nom du paramètre UDF

TMDL prend en charge `description` sur les mesures. Utilisez-la pour indiquer explicitement le nom du paramètre UDF :

```
measure UPN = USERPRINCIPALNAME()
    description: "UDF parameter: userUpn | the current user's identity"
    displayFolder: "UDF Parameters"

measure 'Selected Country Key' = SELECTEDVALUE(DimCountry[CountryKey])
    description: "UDF parameter: countryId | integer key of the selected country"
    displayFolder: "UDF Parameters"
```

Recherchez `description: "UDF parameter:` et la carte complète est reconstruite.

#### 4. Créez une mesure de registre unique sous forme de bloc de commentaires

Ajoutez une mesure de documentation à `KeyMeasures`. Cette mesure ne sera jamais utilisée dans les visuels, mais sera entièrement lisible par n'importe quelle IA ou humain à partir du fichier TMDL :

```
measure __UDF_Registry_ReviewNextSegment = """
// UDF: btn_ReviewNextSegment (SAVE / SUBMIT)
// Fabric item: navigationSection = '3a1da8dd68291a0a2879'
// Write-back table: BudgetConsolidationBuffer
//
// Parameter bindings:
// userUpn          → fx measure: [UPN]
// countryName      → slicer title: udf_countryName (DimCountry.CountryName)
// countryId        → fx measure: [Selected Country Key]
// baselineAmount   → fx measure: [Total Volume NY]
// inputPct         → slicer title: udf_inputPct (Parameter.Parameter)
// primaryDriver    → slicer title: udf_primaryDriver (Drivers.Drivers)
// confidenceRating → slicer title: udf_confidenceRating (Confidence Rating)
// justification    → slicer title: udf_justification (AssumptionNotes)
// riskAssessment   → slicer title: udf_riskAssessment (AssumptionNotes)
BLANK()"""
    description: "UDF parameter registry | do not use in visuals"
    displayFolder: "UDF Parameters/_Registry"
```

#### 5. Concevez la table de write-back avec des noms de colonnes auto-documentés

Faites correspondre exactement les noms de colonnes de la table de write-back aux noms des paramètres UDF. Si le paramètre UDF est `inputPct`, la colonne est `InputPct`, pas `SubmittedPct`. Une correspondance directe 1:1 que n'importe quelle IA résout sans déduction.

#### 6. Gardez des titres de boutons cohérents et spécifiques au contexte

Lorsque le même bouton UDF existe sur plusieurs pages, des titres vagues comme `btn_ReviewNextSegment` les rendent impossibles à distinguer. Incluez le segment ou le contexte dans le titre :

• `btn_Save_Enterprise`
• `btn_Save_MidMarket`
• `btn_Save_SMB`

---

### Comment vérifier dans Power BI Desktop

Utilisez ceci pour confirmer ou reconfigurer les bindings après avoir exécuté le prompt ci-dessus :

1. Ouvrez le rapport et accédez à la page contenant le bouton d'action
2. Sélectionnez le bouton → volet Format → Action → Type = « Data Function »
3. Sous « Data Function parameters », confirmez que chaque paramètre correspond à la table reconstruite issue de la sortie de l'IA
4. Si le rapport comporte plusieurs boutons UDF (SAVE, SUBMIT, ou des variantes par segment), répétez l'opération pour chacun
5. Enregistrez le fichier. Les bindings se sérialiseront de nouveau sous la forme `"parameters": []` dans le JSON PBIR. C'est attendu, ce n'est pas un bug.

> [!TIP]
> Effectuez cette vérification après chaque changement de logique UDF. Les bindings se réinitialisent silencieusement si vous cliquez sur le mauvais bouton. Votre mesure de registre est la source de vérité.

### Conclusion

**PBIR ne persiste pas les bindings de paramètres UDF.** `"parameters": []` est toujours vide, par conception.

**La carte du binding existe. Elle est simplement distribuée.** Le schéma de la table de write-back, les visuels de la page et les mesures TMDL vous donnent tout ce dont vous avez besoin.

**Le prompt réutilisable fait le travail.** Une session IA, deux placeholders, six étapes. Documentation complète du binding sans ouvrir Power BI Desktop.

**Six pratiques éliminent le problème pour l'avenir.** Titres des visuels, dossiers d'affichage, descriptions de mesures, une mesure de registre, des noms de colonnes cohérents et des titres de boutons cohérents rendent tout futur rapport auto-documenté.

**La suite :** comment automatiser la validation des paramètres UDF dans le cadre d'un pipeline CI PBIP, en détectant les bindings cassés avant qu'ils n'atteignent la production.

💬 Partagez vos réflexions dans le post LinkedIn.
✅ Scripts disponibles dans le dépôt GitHub.

### Je reviens ! ⌛
