---
title: "Documenter les Bookmarks avec PBIR"
date: 2025-09-10
tag: "PBIR"
author: "Alex Badiu"
cover: "https://github.com/user-attachments/assets/d39b541e-ef45-48cd-88ca-15466fd1cd82"
excerpt: "Les bookmarks Power BI sont des outils puissants pour créer des rapports interactifs, mais bien les documenter peut être difficile. Découvrez comment extraire une documentation..."
sourceFile: "21 - Documenting Bookmarks with PBIR.md"
sourceUrl: "https://github.com/alexbadiu-insightsinmotion/PBI-Documentation/blob/main/21%20-%20Documenting%20Bookmarks%20with%20PBIR.md"
enSlug: "documenting-bookmarks-with-pbir"
---

![Issue #21](https://github.com/user-attachments/assets/d39b541e-ef45-48cd-88ca-15466fd1cd82)

# Documenter les bookmarks Power BI : du JSON PBIR à une documentation claire

Les bookmarks Power BI sont des outils puissants pour créer des rapports interactifs, mais bien les documenter peut s'avérer difficile. Dans cet article, je vais vous montrer comment extraire une documentation pertinente à partir des fichiers JSON PBIR des bookmarks à l'aide de l'IA, et partager quelques découvertes importantes sur le fonctionnement réel des bookmarks.

_Vous devez d'abord activer PBIR dans les fonctionnalités preview de Power BI Desktop : allez dans **Fichier** > **Options et paramètres** > **Options** > **Fonctionnalités preview** et cochez la case en regard de **« Store reports using enhanced metadata format (PBIR) »**._

PBIR est associé aux **fichiers Power BI Project (.pbip)**, qui stockent les rapports et les modèles sémantiques dans une structure de dossiers adaptée au contrôle de source
## Le défi : comprendre le comportement des bookmarks

Lors de la création de bookmarks dans Power BI, l'interface utilisateur peut être trompeuse. Je l'ai constaté de première main en analysant un bookmark « **Reset Filters** » qui semblait s'appliquer à « **All Visuals** » dans l'interface, mais qui se comportait différemment dans le JSON.

Comment j'ai créé le bookmark : **j'ai sélectionné tous les éléments de la page pour m'assurer qu'il s'applique à tous les visuels, puis j'ai cliqué sur Update** avec les paramètres ci-dessus.
J'ai ensuite enregistré le rapport Power BI au format PBIP dans un dossier appelé DemoDataset.

### Découverte clé : « All Visuals » vs « Selected Visuals »

**Voici ce que j'ai appris sur les bookmarks, et que je n'attendais pas :**

- **Véritable « All Visuals »** : aucune propriété `targetVisualNames` dans le JSON - **affecte tous les visuels actuels ET futurs**
- **« Selected Visuals »** : la propriété `targetVisualNames` est présente - **n'affecte que les visuels listés**, même si vous avez sélectionné tous les visuels présents au moment de la création

Ouvrons ce rapport dans Visual Studio Code et regardons le JSON PBIR du bookmark

<img width="375" height="348" alt="Pasted image 20250901131852" src="https://github.com/user-attachments/assets/35b0542f-93cb-44de-8331-8a4b7c679bd2" />

*Open Folder > Choisissez le dossier > DemoDataset*

<img width="695" height="509" alt="Pasted image 20250901132221" src="https://github.com/user-attachments/assets/f35ecebc-18bd-47b2-8552-a484455b9fbe" />

La définition du rapport est stockée dans le dossier `definition\`, selon la structure suivante : (bookmarks d'abord, pages et visuels ensuite)
```
├── bookmarks\
│   ├── [bookmarkName].bookmark.json
|   └── bookmarks.json
├── pages\
│   ├── [pageName]\
│   |   ├── \visuals
|   │   |   ├── [visualName]\
|   |   │   │   |── mobile.json
|   |   |   └   └── visual.json
|   |   └── page.json
|   └── pages.json
├── version.json
├── reportExtensions.json
└── report.json
```

<br>

<details closed>
<summary>Voici le code JSON complet :</summary>
  
``` json
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/bookmark/1.4.0/schema.json",
  "displayName": "Reset Filters",
  "name": "77f6391b96f7c17022ed",
  "options": {
    "targetVisualNames": [
      "5e6acabae3ac49fd5c3b",
      "bf11a6fb91dc9f853419",
      "ed774ceec96dd040ac19",
      "34f97140074284eaa8de"
    ]
  },
  "explorationState": {
    "version": "1.3",
    "activeSection": "4cb813ea0b6a5c8296b0",
    "filters": {
      "byExpr": [
        {
          "name": "5bf850d4ae79b6122847",
          "type": "Categorical",
          "filter": {
            "Version": 2,
            "From": [
              {
                "Name": "d",
                "Entity": "Date",
                "Type": 0
              }
            ],
            "Where": [
              {
                "Condition": {
                  "In": {
                    "Expressions": [
                      {
                        "Column": {
                          "Expression": {
                            "SourceRef": {
                              "Source": "d"
                            }
                          },
                          "Property": "Year"
                        }
                      }
                    ],
                    "Values": [
                      [
                        {
                          "Literal": {
                            "Value": "2019L"
                          }
                        }
                      ]
                    ]
                  }
                }
              }
            ]
          },
          "expression": {
            "Column": {
              "Expression": {
                "SourceRef": {
                  "Entity": "Date"
                }
              },
              "Property": "Year"
            }
          },
          "howCreated": 1
        }
      ]
    },
    "sections": {
      "4cb813ea0b6a5c8296b0": {
        "visualContainers": {
          "34f97140074284eaa8de": {
            "filters": {
              "byExpr": [
                {
                  "name": "70e95568ae04fa1d4cd0",
                  "type": "Categorical",
                  "expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Continent"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "2a38a5d841d9322e52c4",
                  "type": "Categorical",
                  "expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Country"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "eebd83c6a4a3378e0706",
                  "type": "Advanced",
                  "expression": {
                    "Measure": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Sales"
                        }
                      },
                      "Property": "Sales"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "5f0bc86dfc9a074e9486",
                  "type": "Advanced",
                  "expression": {
                    "Measure": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Sales"
                        }
                      },
                      "Property": "Sales PY"
                    }
                  },
                  "howCreated": 0
                }
              ]
            },
            "singleVisual": {
              "visualType": "clusteredBarChart",
              "objects": {},
              "orderBy": [
                {
                  "Direction": 2,
                  "Expression": {
                    "Measure": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Sales"
                        }
                      },
                      "Property": "Sales"
                    }
                  }
                }
              ],
              "activeProjections": {
                "Category": [
                  {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Continent"
                    }
                  }
                ]
              }
            }
          },
          "ed774ceec96dd040ac19": {
            "filters": {
              "byExpr": [
                {
                  "name": "5edc333a7dbbaa98ba74",
                  "type": "Categorical",
                  "expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Continent"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "ca874f1b83beed1bfc93",
                  "type": "Categorical",
                  "expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Country"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "bf5689a2fa810580a03a",
                  "type": "Advanced",
                  "expression": {
                    "Measure": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Sales"
                        }
                      },
                      "Property": "Sales"
                    }
                  },
                  "howCreated": 0
                },
                {
                  "name": "e7febea5ccadf56781bb",
                  "type": "Advanced",
                  "expression": {
                    "Measure": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Sales"
                        }
                      },
                      "Property": "Sales PY"
                    }
                  },
                  "howCreated": 0
                }
              ]
            },
            "singleVisual": {
              "visualType": "ribbonChart",
              "objects": {},
              "orderBy": [
                {
                  "Direction": 1,
                  "Expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Continent"
                    }
                  }
                },
                {
                  "Direction": 1,
                  "Expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Country"
                    }
                  }
                }
              ],
              "activeProjections": {
                "Category": [
                  {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Continent"
                    }
                  }
                ]
              },
              "display": {
                "mode": "hidden"
              }
            }
          },
          "bf11a6fb91dc9f853419": {
            "filters": {
              "byExpr": [
                {
                  "name": "23c698b6efa81dc92f5c",
                  "type": "Categorical",
                  "expression": {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Gender"
                    }
                  },
                  "howCreated": 0
                }
              ]
            },
            "singleVisual": {
              "visualType": "slicer",
              "objects": {
                "merge": {
                  "general": [
                    {
                      "properties": {
                        "filter": {
                          "filter": {
                            "Version": 2,
                            "From": [
                              {
                                "Name": "c",
                                "Entity": "Customer",
                                "Type": 0
                              }
                            ],
                            "Where": [
                              {
                                "Condition": {
                                  "Contains": {
                                    "Left": {
                                      "Column": {
                                        "Expression": {
                                          "SourceRef": {
                                            "Source": "c"
                                          }
                                        },
                                        "Property": "Gender"
                                      }
                                    },
                                    "Right": {
                                      "Literal": {
                                        "Value": "'Ma'"
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  ],
                  "data": [
                    {
                      "properties": {
                        "mode": {
                          "expr": {
                            "Literal": {
                              "Value": "'Basic'"
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              },
              "activeProjections": {
                "Values": [
                  {
                    "Column": {
                      "Expression": {
                        "SourceRef": {
                          "Entity": "Customer"
                        }
                      },
                      "Property": "Gender"
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    "objects": {}
  }
}
```
</details>

<br>

C'est intéressant. Même si l'interface Power BI affiche une coche indiquant que le bookmark impacte « All visuals », il n'affecte en réalité que les visuels présents sur la page au moment de la création du bookmark.

```json
// Ce bookmark n'affecte que les visuels listés
"options": {
  "targetVisualNames": [
    "5e6acabae3ac49fd5c3b",
    "bf11a6fb91dc9f853419",
    "ed774ceec96dd040ac19",
    "34f97140074284eaa8de"
  ]
}
```

>[!NOTE]
**Remarque importante** : les états de filtre (Data) sont toujours appliqués à tous les visuels de la page, indépendamment du paramètre `targetVisualNames`. La propriété `targetVisualNames` ne limite que les visuels qui reçoivent les changements de Display/Selection.

Maintenant que nous avons appris cela, avançons et voyons comment exploiter PBIR et GitHub Copilot (ou d'autres modèles LLM) pour mieux documenter nos bookmarks.
## Mon flux de documentation

### Étape 1 : Identifier le JSON du bookmark à documenter

Avec Visual Studio Code, j'accède facilement à la structure JSON du bookmark.

### Étape 2 : Ajouter le bookmark et la page au contexte de chat IA dans Visual Studio Code

<img width="608" height="599" alt="Pasted image 20250729160823" src="https://github.com/user-attachments/assets/a8731b20-0579-4545-a7ec-687202bab855" />

### Étape 3 : Choisissez votre LLM
<img width="257" height="142" alt="Pasted image 20250901134123" src="https://github.com/user-attachments/assets/d649c9c3-5ef5-4ce2-bde4-af6638373483" />

### Étape 4 : Ajoutez le prompt suivant

J'ai développé ce prompt pour analyser systématiquement les fichiers JSON de bookmarks :

```
What can you tell me about this bookmark to help me document it?

1. **What is the bookmark’s name?**
    - Use the `displayName` property for the bookmark name.
      
2. **Is the bookmark part of a group?**
    - If so, provide the group name using the `parentGroupName` property.
      
3. **Which settings were selected for the bookmark?**
    - Indicate if the bookmark stores **Data**, **Display**, **Current Page**, and whether it applies to **All Visuals** or **Selected Visuals**.
      
4. **If Selected Visuals:**
    - Create a mapping from each visual ID in `targetVisualNames` to its:
        - `displayName` (from the visual’s JSON)
        - `visualType` (from the visual’s JSON)
        - `parentGroupName` (if available, for context/grouping)
        - **Visibility status** (Visible or Hidden, based on the visual’s display properties)
    - Output this mapping as a Markdown table.
      
5. **Add a summary table:**
    - Use the following format:
    
    |Bookmark Name|Group Name|Data|Display|Current Page|All Visuals|Selected Visuals|Visuals Included (ID: Status)|
    |---|---|---|---|---|---|---|---|
    
1. **Filter Details:**
    - List all filters stored by the bookmark, both at the report and visual level, in plain language.  
        For each filter, specify:
        - The field(s) being filtered (e.g., `Date[Year]`)
        - The filter type (e.g., categorical, advanced)
        - The value(s) or condition(s) being applied (e.g., equals 2019, contains 'Ma')
    - Summarize what activating the bookmark will do to the report’s filters in a human-readable way.
```

### Résultats : exemple de documentation générée

Pour mon bookmark « Reset Filters », ce processus a généré :

**Paramètres du bookmark :**

- **Data :** Oui (les propriétés `filters` et `explorationState` sont présentes)
- **Display :** Oui (la propriété `singleVisual.display` est présente pour au moins un visuel)
- **Current Page :** Oui (la propriété `activeSection` est définie)
- **All Visuals :** <mark> Non </mark> (le tableau `options.targetVisualNames` est présent, donc seuls les visuels sélectionnés sont inclus)
- **Selected Visuals :** Oui (le bookmark cible des visuels spécifiques par ID)

**Mapping des visuels :**

| Visual ID            | Display Name        | Visual Type       |
| -------------------- | ------------------- | ----------------- |
| 5e6acabae3ac49fd5c3b | Bookmark            | Group (Bookmark)  |
| bf11a6fb91dc9f853419 | <mark>(non spécifié)</mark> | slicer            |
| ed774ceec96dd040ac19 | Ribbon Chart        | ribbonChart       |
| 34f97140074284eaa8de | Clustered Bar Chart | clusteredBarChart |

## Bonnes pratiques à suivre

### 1. Renommez toujours vos visuels

**Avant :**

```json
"displayName": "(not specified)"
```

**Après :**

```json
"displayName": "Gender Filter Slicer"
```

Cela rend la documentation infiniment plus utile et facilite la maintenance future.

### 2. Utilisez des noms de bookmark explicites

Au lieu de « Bookmark1 », utilisez des noms descriptifs comme :

- `ResetFilters`
- `ShowDetailView`
- `ToggleQuarterlySummary`

### 3. Exploitez les groupes de bookmarks

Organisez les bookmarks liés en groupes. Les noms de groupe apparaissent dans le JSON sous la propriété `parentGroupName` et aident à structurer votre documentation.

### 4. Testez le comportement du bookmark après l'ajout de nouveaux visuels

Ajoutez un nouveau visuel après avoir créé votre bookmark et testez le comportement. Cela révélera si votre bookmark s'applique réellement à « tous les visuels » ou seulement aux visuels sélectionnés.

**J'ai fait cet exercice pour « tester » ce que j'ai appris. J'ai ajouté un nouveau visuel (scatter chart) et je l'ai masqué sur la page**
<img width="1945" height="598" alt="Pasted image 20250729171021" src="https://github.com/user-attachments/assets/ec781a59-d2f3-409e-9ec1-3800b12bd38a" />

**Lorsque je navigue vers d'autres bookmarks puis reviens à Reset Filters, je vois de nouveau le visuel.**

<img width="969" height="389" alt="Pasted image 20250729171117" src="https://github.com/user-attachments/assets/6ebc3ee2-4c8f-4c8d-b92d-dc43ac4a8a3e" />

**Observation :**
- Le bookmark **Reset Filters** inclut des paramètres Display pour des visuels spécifiques (ceux listés dans `targetVisualNames`).
- En ajoutant un **nouveau scatter chart**, en le masquant, puis en cliquant sur le bookmark « Reset Filters », le scatter chart **redevient visible**.

> [!tip]
>**Remarque :** dans Power BI, les états Data (filtre) des bookmarks sont appliqués à tous les visuels de la page, indépendamment du paramètre `targetVisualNames`. La propriété `targetVisualNames` ne limite que les visuels qui reçoivent les changements de Display/Selection.

> [!tip]
>**Vous ne pouvez pas créer de véritables bookmarks « All visuals » via l'interface Power BI.** La seule façon d'y parvenir est de modifier manuellement le fichier JSON

### 5. Ne créez qu'un nombre limité de bookmarks

**Règle empirique :** si vous avez besoin de plus d'une main pour compter vos bookmarks sur une seule page, vous devez probablement simplifier votre design.

**Envisagez d'abord des alternatives :**

- **Field parameters :** pour basculer entre différentes mesures ou colonnes, les field parameters sont souvent plus simples et plus adaptés que de multiples bookmarks
- **Pages drill-through :** pour une analyse détaillée, plutôt que des changements de vue pilotés par bookmark
- **Navigation entre pages :** plusieurs pages ciblées plutôt qu'une seule page complexe surchargée de bookmarks
- **Translytical Task Flows :** pour des flux analytiques plus complexes, utilisez les Translytical Task Flows (voir ma participation au Translytical Task Flow challenge pour des techniques avancées [ici](https://community.fabric.microsoft.com/t5/Translytical-Task-Flow-Gallery/Dynamic-Power-BI-Experiences/td-p/4808192))

### Bonus : exemple avancé - analyse d'un bookmark complexe

Pour démontrer davantage la puissance de cette approche de documentation, je l'ai testée sur un bookmark plus sophistiqué, qui aurait été bien plus difficile à documenter manuellement.

**Détails** : la sélection sur le slicer Gender est définie sur « Male ». Le clustered bar chart est filtré sur « North America ». Il n'y a aucune sélection de visibilité sur le ribbon chart. Cela signifie que lorsque l'utilisateur navigue vers le bookmark « RibbonChart » puis revient au bookmark « FocusSpecific », au lieu de voir le clustered bar chart, il/elle verra le ribbon chart filtré sur « North America ». Un filtre appliqué à toutes les pages pour l'année 2019 complète ce comportement de bookmark complexe.

<img width="1060" height="398" alt="Pasted image 20250729175157" src="https://github.com/user-attachments/assets/89465279-75ee-457b-b070-7ff6dc77b0fb" />

'FocusSpecific' change lorsque nous naviguons d'abord vers le bookmark 'Ribbon Chart' puis revenons à 'FocusSpecific'
<img width="569" height="439" alt="Pasted image 20250902171223" src="https://github.com/user-attachments/assets/6b78cbe6-6750-442c-a1eb-5e724868b380" />

<br>

<details closed>
<summary>Analyse IA : décomposition détaillée du bookmark 'FocusSpecific' :</summary>

---

### 1. **Nom du bookmark**

- **FocusSpecific**

### 2. **Le bookmark fait-il partie d'un groupe ?**

- **Non** (la propriété `parentGroupName` n'est pas présente)

### 3. **Paramètres du bookmark**

- **Data :** Oui (les filtres et états du slicer sont stockés)
- **Display :** Oui (la visibilité et l'ordre des visuels sont stockés)
- **Current Page :** Oui (la section active est définie)
- **All Visuals :** Non
- **Selected Visuals :** Oui (s'applique uniquement aux visuels listés dans `targetVisualNames`)

### 4. **Mapping des visuels sélectionnés**

| Visual ID            | Display Name        | Visual Type       | Parent Group Name    | Visibility |
| -------------------- | ------------------- | ----------------- | -------------------- | ---------- |
| bf11a6fb91dc9f853419 | Slicer Gender       | slicer            | _(aucun)_             | Visible    |
| 34f97140074284eaa8de | Clustered Bar Chart | clusteredBarChart | 5e6acabae3ac49fd5c3b | Visible    |

- **Display Name** : à partir de la propriété `title` du JSON de chaque visuel.
- **Visual Type** : à partir de la propriété `visualType`.
- **Parent Group Name** : à partir de la propriété `parentGroupName` si présente.
- **Visibility** : les deux visuels sont visibles (aucun mode d'affichage masqué défini).

### 5. **Tableau récapitulatif**

|Bookmark Name|Group Name|Data|Display|Current Page|All Visuals|Selected Visuals|Visuals Included (ID: Status)|
|---|---|---|---|---|---|---|---|
|FocusSpecific|_(aucun)_|Oui|Oui|Oui|Non|Oui|bf11a6fb91dc9f853419: Visible, 34f97140074284eaa8de: Visible|

### 6. **Détails des filtres**

#### **Filtre au niveau du rapport**

- **Champ :** `Date[Year]`
- **Type :** Categorical
- **Valeur :** égal à 2019

#### **Filtres au niveau des visuels**

**Clustered Bar Chart (`34f97140074284eaa8de`) :**

- **Continent** (`Customer[Continent]`) : Categorical, aucune valeur spécifiée (état par défaut)
- **Country** (`Customer[Country]`) : Categorical, aucune valeur spécifiée (état par défaut)
- **Sales** (`Sales[Sales]`) : Advanced, aucune valeur spécifiée (état par défaut)
- **Sales PY** (`Sales[Sales PY]`) : Advanced, aucune valeur spécifiée (état par défaut)
- **Highlight :** North America est sélectionné pour `Customer[Continent]` (le graphique est mis en surbrillance pour cette valeur).

**Slicer Gender (`bf11a6fb91dc9f853419`) :**

- **Gender** (`Customer[Gender]`) : Categorical, filtré sur **Male** uniquement.

---

### **Résumé de l'effet du bookmark**

L'activation du bookmark **FocusSpecific** va :

- Placer le rapport sur la **Page 1**.
- Appliquer un filtre au niveau du rapport pour n'afficher que les données de l'**année 2019**.
- Limiter son effet à deux visuels :
    - **Slicer Gender** : filtre les données pour n'afficher que les clients **Male**.
    - **Clustered Bar Chart** : met en surbrillance le continent **North America**, avec tous les autres filtres à leur état par défaut.
- Tous les autres visuels restent inchangés par ce bookmark.

</details>

<br>

### 5. Le modèle de documentation (manuel)

Cela représente une quantité substantielle de nouvelles informations que nous pouvons exploiter grâce à PBIR pour enrichir notre documentation.
Imaginez hériter d'un rapport contenant ce type de bookmarks.
- Comment sauriez-vous quels visuels ils impactent ?
- Comment déterminer si un bookmark se comporte comme prévu ?

> [!tip]
>**Lorsqu'on utilise des bookmarks, on ne stocke nulle part un champ de description.** Je pense que cela représente une opportunité extraordinaire de créer ce type de champ lors de la génération de bookmarks depuis l'interface Power BI Desktop, et de stocker la définition dans PBIR. Bien que cela nécessiterait toujours une saisie manuelle, cette documentation serait créée directement dans le système source, ce qui constitue la meilleure documentation, et la plus accessible.
**J'ai soumis une idée Power BI ici** : [Add Description field for Bookmarks in Power BI Desktop and PBIR Format](https://community.fabric.microsoft.com/t5/Fabric-Ideas/Add-Description-field-for-Bookmarks-in-Power-BI-Desktop-and-PBIR/idi-p/4818843#M163577).
Si ce concept vous parle, merci de voter.

En attendant, réfléchissons à ce qui manque dans la documentation générée - <br>
**Le contexte, bien sûr.** <br>
Par exemple, lorsque l'utilisateur navigue vers le bookmark « RibbonChart » puis revient à « FocusSpecific », au lieu du Clustered Bar Chart, l'utilisateur final verra le Ribbon Chart filtré sur « North America ».
Nous ne voyons cette information écrite nulle part.
- Avons-nous créé ce comportement de bookmark intentionnellement ?
- Faisait-il partie de la Definition of Done ?
- Pourquoi avons-nous créé ce bookmark en premier lieu ?
- Quand a-t-il été créé, quel problème était-il censé résoudre ?
- D'autres solutions avaient-elles été envisagées ?
- A-t-il été validé (signé) ?
- Où puis-je trouver la documentation de la demande ou de la Definition of Done ?

Ce qui me manque ici, c'est le pourquoi. Cela dépasse l'aspect technique. Il s'agit de comprendre le problème que nous devons résoudre et l'approche que nous avons décidé d'adopter.

Ma recommandation est de :
**Créer une documentation séparée pour le « pourquoi » en dehors de Power BI** (feuille Excel, fichier markdown, etc.) où vous ajoutez manuellement des descriptions pour chaque bookmark et listez les visuels qu'ils affectent. Le bookmark deviendra le lien de connexion entre votre documentation externe et les données JSON extraites automatiquement (documentation issue de PBIR).

Cette approche hybride vous offre à la fois la précision technique du comportement du bookmark tirée du fichier JSON, et le contexte que seul l'œil humain peut apporter.

## Points clés à retenir

1. **Ne faites pas entièrement confiance à l'interface** - vérifiez toujours le comportement du bookmark en examinant le JSON
2. **Nommez tout de manière explicite** - votre futur vous (et les assistants IA) vous en remercieront
3. **Testez avec de nouveaux visuels** - cela révèle la véritable portée de vos bookmarks
4. **Utilisez l'IA pour automatiser l'analyse** - la structure JSON est complexe, mais l'IA peut l'analyser efficacement
5. **Documentez au fur et à mesure** - n'attendez pas d'avoir des dizaines de bookmarks non documentés

## Conclusion

**Le prompt IA que j'ai partagé automatisera la documentation des bookmarks à un niveau sans précédent** : il aide à extraire ce que je considère comme les informations les plus importantes sur les bookmarks. Cependant, l'automatisation seule ne suffit pas pour une documentation réellement utile.

**L'élément humain reste crucial.** Vous seul pouvez apporter le contexte qui rend la documentation utile : _Pourquoi_ ce bookmark a-t-il été créé ? _Quand_ les utilisateurs doivent-ils l'utiliser ? _Quel_ scénario métier adresse-t-il ? _Qui_ l'a validé et dans quel contexte ?

**Considérez ceci comme une fondation, pas la ligne d'arrivée.** L'extraction automatisée vous donne le squelette technique, et c'est à vous d'ajouter maintenant le contexte métier qui lui donne du sens. J'espère que l'approche que j'ai partagée ici vous met sur la voie d'une documentation de bookmark complète, claire et riche en contexte.

_Avez-vous découvert d'autres éléments intéressants sur le comportement des bookmarks Power BI ? Avez-vous des idées pour améliorer le prompt que j'ai utilisé ? J'aimerais beaucoup connaître votre expérience en commentaires._
