---
title: Configurer son environnement de dev pour les Azure Functions
date: 2022-12-23
draft: false
lastmod: 2022-12-23T13:53:36.932Z
description: Découvrez les extensions et logiciels utiles pour développer des Azure
  Functions en local.
slug: configurer-son-environnement-de-dev-pour-les-azure-functions
keywords:
  - Azure Functions
  - Extensions
  - Logiciels
  - VS Code
categories:
  - Astuces
  - Azure Functions
images:
  - /2022/12/Azure-Functions-Vscode-Corgi.png
---

{{< figure src="/img/2022/12/Azure-Functions-Vscode-Corgi.webp" width="400" >}}
Aujourd'hui, on va voir comment setup un environnement de développement pour les Azure Functions. Plus spécialement sur Visual Studio Code.
Ce guide est conçu pour un environnement Windows, mais la plupart des étapes sont valables pour un environnement Linux.

Je vais prochainement faire un article sur comment j'ai configuré mon VS Code de manière générale.


## Sommaire

- [Sommaire](#sommaire)
- [Prérequis](#prérequis)
- [Les extensions utiles](#les-extensions-utiles)
  - [1. Azure Functions](#1-azure-functions)
  - [2. Azurite](#2-azurite)
- [Les logiciels utiles](#les-logiciels-utiles)
  - [1. Azure Storage Explorer](#1-azure-storage-explorer)
  - [2. Azure Cosmos DB Emulator](#2-azure-cosmos-db-emulator)
- [Comment démarrer ?](#comment-démarrer-)
- [Conclusion](#conclusion)
- [Liens utiles](#liens-utiles)

## Prérequis

- [Visual Studio Code](https://code.visualstudio.com/)
- Un compte [Azure](https://azure.microsoft.com/) (et encore)

## Les extensions utiles

Qui dit VS Code, dit extensions ! Et on en aura besoin de quelques-unes ici.

### 1. Azure Functions

L'extension [Azure Functions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions) est la base. En même temps, c'est dans le nom. Elle est une sorte de wrapper autour de `Azure functions core tools` qui permet de créer, déployer et gérer ses fonctions.

Grâce a à elle, vous pouvez générer vos projets en choisissant votre langage, avoir accès à des presets pour différents triggers et aussi avoir des tâches préconfigurées pour build ou lancer vos fonctions en local. Elle est même capable de détecter des projets créés en dehors de VSCode et de les adapter pour rendre leur utilisation plus simple.

Vous pouvez gérer vos projets déployés sur Azure directement depuis VSCode. Par exemple, voir les logs en temps réel, déployer une nouvelle version, gérer les slots, les paramètres, exécuter des fonctions manuellement (pratique lors des triggers `timer`), etc.

{{< figure src="/img/2022/12/Azure-Functions-Extension.png" caption="L'extension Azure Functions" >}}

### 2. Azurite

Les Azures fonctions ont besoins d'un storage account pour fonctionner. Pour faire du développement en local, on va utiliser [Azurite](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite) qui permet d'en émuler un directement sur son pc.

Azurite crée un "storage account" par workspace. C'est-à-dire que vous ne devez pas vous soucier de collision entre vos différents projets.

Vous pouvez aussi installer Azurite en tant que package NPM grâce à la commande suivante :

{{< highlight bash >}}
npm install -g azurite
yarn global add azurite
{{< /highlight >}}

Une petite astuce pour VS Code : modifiez le répertoire dans lequel azurite va stocker ses fichiers pour gérer le stockage. Par défaut, il va créer différents dossiers et fichiers json à la racine du workspace mais ce n'est pas très propre et ça rajoute des chemins dans son `.gitignore` (vous n'avez aucun intérêt à versionner ces fichiers).

Pour cela, il suffit de modifier le paramètre `azurite.location` dans les paramètres de VS Code et de mettre un nom de dossier de votre choix. Personnellement, j'aime bien `.azurite`.
Et si vous voulez que tout le monde dans le projet respecte cette règle, vous pouvez aussi ajouter ce paramètre dans le fichier `settings.json` de votre workspace.

{{< figure src="/img/2022/12/Azurite-location.png" caption="Paramètre d'azurite pour sélectionner le dossier racine. valeur: .azurite" >}}

{{< notice tip >}}
Vérifiez que votre projet utilise bien le compte de stockage local. Pour cela, il faut que le paramètre `AzureWebJobsStorage` dans le fichier `local.settings.json` pointe bien vers `UseDevelopmentStorage=true`. (Cet endpoint est valable également pour avoir accès à d'autres containers dans le compte)
{{< /notice >}}

## Les logiciels utiles

### 1. Azure Storage Explorer

Azure Storage Explorer permet de naviguer dans nos différents storage accounts, que ce soit celui émulé par Azurite ou bien un vrai sur Azure.

Vous pouvez le télécharger [ici](https://azure.microsoft.com/fr-fr/features/storage-explorer/) ou bien via winget:

```bash
winget install Microsoft.AzureStorageExplorer
```

### 2. Azure Cosmos DB Emulator

Ce n'est pas une obligation pour débuter dans les Azure fonctions, mais souvent j'utilise CosmosDB en serverless pour gérer mes données à stocker dans mes projets. Ça fonctionne un peu comme azurite, cependant c'est un serveur "global" pour le PC. Mais on peut créer plusieurs bases de données et containers, donc ça ne pose pas trop de problèmes.

Vous pouvez le télécharger [ici](https://docs.microsoft.com/fr-fr/azure/cosmos-db/local-emulator?tabs=ssl-netstd21#download-and-install-the-emulator) ou bien avec winget:

```bash
winget install Microsoft.AzureCosmosDB.Emulator
```

Par défaut, l'émulateur fonctionne avec l'API Core (SQL).

Pour utiliser les autres API, il faut activer l'endpoint de votre choix via les paramètres de lancement de l'émulateur dans une console administrateur.

- MongoDB : `/EnableMongoDbEndpoint`
- Table : `/EnableTableEndpoint`
- Cassandra : `/EnableCassandraEndpoint`
- Gremlin : `/EnableGremlinEndpoint`

{{< notice example Exemple>}}

```pwsh
& "C:\Program Files\Azure Cosmos DB Emulator\CosmosDB.Emulator.exe" /EnableTableEndpoint
```

{{< /notice >}}

Pour Cassandra et Gremlin, il faut installer des composants supplémentaires. Toutes les informations sont sur la page de Documentation de MS Learn.

- Cassandra : <https://learn.microsoft.com/en-us/azure/cosmos-db/local-emulator#api-for-cassandra>
- Gremlin : <https://learn.microsoft.com/en-us/azure/cosmos-db/local-emulator#api-for-gremlin> 

{{< notice warning Attention>}}
Changer d'API supprimera toutes les données existantes dans les bases de données.
{{< /notice >}}

## Comment démarrer ?

Maintenant que vous avez tous les outils, il faut se lancer. Pour cela, rien de plus simple. Il suffit d'aller dans l'onglet "Azure" de VS Code et de cliquer sur l'icône "Create Functions" et de vous laisser guider.

{{< figure src="/img/2022/12/Vscode-Create-Functions.png" caption="Créer un projet" >}}

Une fois le projet créé, il ne faut pas oublier de lancer l'émulateur "Azurite". Pour cela, il suffit de faire faire `F1` et chercher `Azurite: Start`. (Vérifiez bien que `AzureWebJobsStorage` est bien égal à `UseDevelopmentStorage=true`)

{{< figure src="/img/2022/12/Azurite-Start.png" caption="Lancer Azurite" >}}

Vscode génère automatiquement une série de tâches pour vous aider à gérer votre projet. Pour lancer vos fonctions en local, vous pouvez utiliser la tâche `func: host start`.

## Conclusion

Vous voilà paré pour commencer à développer vos fonctions Azure ! Par défaut, il n'y a pas moyen de faire de "hot reloading" mais des astuces existent suivant les langages. Je ferai certainement un article sur le sujet quand j'aurai tout ce qu'il faut.

À la prochaine pour d'autres articles et astuces !

PS : L'artwork au début a été généré par Dall-E avec un petit edit de ma part pour les logos.

## Liens utiles

- [Azure Functions](https://learn.microsoft.com/fr-be/azure/azure-functions/functions-get-started)
- [Triggers et Bindings](https://learn.microsoft.com/fr-be/azure/azure-functions/functions-triggers-bindings#supported-bindings)
- [Bonnes Pratiques](https://docs.microsoft.com/fr-be/azure/azure-functions/functions-best-practices)