---
title: Configurer Key Vault pour les Azure Functions en 3   minutes
date: 2023-01-27T11:22:52.278Z
draft: false
lastmod: 2023-01-27T11:26:01.457Z
description: Les étapes à suivre pour protéger vos secrets avec Azure Key Vault dans vos
  Azure Functions sans modifier votre code.
series:
  - Azure Functions
categories:
  - Astuces
  - Azure Functions
keywords:
  - Azure Functions
  - Key Vault
  - Secrets
slug: configurer-key-vault-pour-les-azure-functions-en-3-minutes
images:
  - /img/2023/01/Azure-Functions-KeyVault-Corgi.webp
---
{{< figure src="/img/2023/01/Azure-Functions-KeyVault-Corgi.webp" width="800" >}}

Hello tout le monde, aujourd'hui je vais vous montrer comment configurer [Azure Key Vault](https://azure.microsoft.com/fr-fr/products/key-vault) pour vos [Azure Functions](https://azure.microsoft.com/fr-fr/products/functions) en 3 minutes montre en main (posez là quand même, c'est plus pratique pour utiliser l'ordinateur).

## Sommaire <!-- omit in toc -->

- [Prérequis](#prérequis)
- [TLDR;](#tldr)
- [Créer un Key Vault](#créer-un-key-vault)
- [Créer une identité pour l'Azure Function](#créer-une-identité-pour-lazure-function)
- [Ajout de l'identité à la politique d'accès du Key Vault](#ajout-de-lidentité-à-la-politique-daccès-du-key-vault)
- [Créer un secret](#créer-un-secret)
- [Utilisation du secret](#utilisation-du-secret)
- [Utilisation en développement](#utilisation-en-développement)
- [Conclusion](#conclusion)

## Prérequis

- Un compte Azure
- Une instance Azure Function qui utilise des secrets (ex : une connexion à une base de données)

## TLDR;

1. Créer un Key Vault.
2. Créer une identité pour votre Azure Function.
3. Ajouter l'identité à la politique d'accès du Key Vault
4. Sélectionner "**Obtenir**" dans la colonne "**Authorisations du secret**" (ajuster au besoin).
5. Créer les secrets dans le Key Vault.
6. Modifier les variables d'environnement de l'Azure Function avec la bonne syntaxe : `@Microsoft.KeyVault(VaultName={{Nom du Key Vault}};SecretName={{Nom du secret}})`.

## Créer un Key Vault

C'est un peu le point central de ce tutoriel, il va vous falloir un Azure Key Vault. Vous pouvez le créer que ce soit via le portail, le CLI ou autre. Dans mon cas, je vais utiliser le portail.

Modifiez les paramètres suivants pour convenir à vos besoins :

- **Abonnement** : votre abonnement
- **Groupe de ressources** : souvent le groupe où se trouve votre instance azure function (ici je vais créer un groupe "**tutoriel-vsantele.dev**")
- **Nom** : le nom de votre Key Vault unique (ici "**mon-super-keyvault**")
- **Région** : la région où vous souhaitez créer votre Key Vault (ici "**West Europe**")
- **Niveau Tarifaire** : "**Standard**" (Standard utilise des clés logicielles tandis que les clés Premium sont protégées par HSM, un module de sécurité matériel.)

{{< figure src="/img/2023/01/Create-Azure-Keyvault.png" width="600" caption="Création d'un Azure Key Vault via le Portail" >}}

Dans l'onglet suivant "**Stratégie d'accès**", vous pouvez définir le mode d'accès au Key Vault. Par défaut via le coffre ou bien via Azure RBAC. Pour aller à l'essentiel, je vais rester sur "**Stratégie d'accès au coffre**".

Dans le même onglet, vous pouvez ajouter des utilisateurs ou services qui peuvent accéder au coffre. Par défaut, vous êtes déjà ajouté avec tous les droits. Vous pouvez modifier les accès après la création du coffre.

{{< figure src="/img/2023/01/Azure-Keyvault-Access-Policy.png" width="600" caption="Ajout d'une politique d'accès au Key Vault" >}}

Je vous laisse régler vos paramètres réseau et mettre vos tags sur la ressource si vous en avez besoin. Les valeurs par défauts sont suffisantes pour ce tutoriel.

Vous pouvez maintenant créer votre Azure Key Vault.

{{< notice tip "Via le CLI" >}}

```bash
az keyvault create --name {{Nom du Key Vault}} --resource-group {{Nom du resource group}} --location westeurope --sku standard
```

{{< /notice >}}

## Créer une identité pour l'Azure Function

Pour que votre Azure function ait accès au coffre, il lui faut une identité. Je vais la créer via le portail, mais vous pouvez aussi utiliser le CLI.

Sur la page de votre instance Azure Function, Aller dans "**Identité** dans le menu de gauche.

Vérifiez que vous êtes bien dans l'onglet "Affecté par le système" et cliquez sur "**Activé**". Ensuite, cliquez sur "**Enregistrer**".

{{< figure src="/img/2023/01/Azure-Function-Add-Identity.png" width="600" caption="Ajout d'une identité à une Azure Function" alt="Création de l'identité pour la Function App depuis le portail" >}}

{{< notice info >}}
La différence entre Système et Utilisateur se trouve au niveau de la durée de vie. Une identité Système est supprimée lorsque l'instance Azure Function est supprimée. Une identité Utilisateur est créée et supprimée manuellement.

[Plus d'info](https://learn.microsoft.com/fr-fr/azure/active-directory/managed-identities-azure-resources/overview)
{{< /notice >}}

{{< notice tip "Via le CLI" >}}

```bash
az functionapp identity assign --name {{Nom du Function App}} --resource-group {{Nom du resource group}}
```

{{< /notice >}}

## Ajout de l'identité à la politique d'accès du Key Vault

Une fois que vous avez une identité pour votre Azure Function, vous pouvez l'ajouter à la politique d'accès du Key Vault. Une fois de plus, via le portail, mais vous pouvez aussi utiliser le CLI.

Sur la page de votre Key Vault, allez dans "**Stratégie d'accès**" dans le menu de gauche et cliquez sur "**Créer**" en haut.

Ensuite, dans "**Autorisations**", sélectionnez uniquement "**Obtenir**" dans la colonne "**Autorisations du secret**". Vous pouvez ajouter d'autres droits si vous en avez besoin.

{{< figure src="/img/2023/01/Azure-Keyault-Add-Identity.png" width="600" caption="Ajout de l'identité" alt="Ajout de l'identité via le portail en sélectionnant les accès" >}}

{{< notice warning "Attention" >}}
Évitez de donner trop de droits à votre Azure Function. Sélectionnez seulement ceux dont elle aura vraiment besoin.
{{< /notice >}}

Cliquez sur **Suivant** et chercher votre Azure function dans la barre de recherche. Sélectionnez-la et cliquez sur **Suivant**.

Cliquez sur **Suivant** puis **Créer** pour les 2 derniers onglets.

{{< notice tip "Via le CLI" >}}
  Récupérer l'object id de votre Azure Function

  ```bash
  az functionapp identity show --name {{Nom de la Function App}} --resource-group {{Nom du resource group}} --query principalId
  ```

  Ajouter l'identité à la politique d'accès du Key Vault

  ```bash
  az keyvault set-policy --name {{Nom du Key Vault}} --resource-group {{Nom du resource group }} --object-id {{Object Id obtenu avant}} --secret-permissions get
  ```

{{< /notice >}}

## Créer un secret

Pour utiliser un secret depuis votre Azure Function, il faut le créer.

Dans la page de votre Key Vault, allez dans "**Secrets**" dans le menu de gauche et cliquez sur "**Générer/Importer**" en haut.

Remplissez les informations suivantes vos besoins :

- **Options de chargement** : **Manuellement**
- **Nom** : le nom de votre secret (ici "**CosmosDBEndpoint**")
- **Valeur de secret** : la valeur de votre secret (ici mon endpoint)
- **Type de contenu** : le type de votre contenu pour aider, je n'ai rien mis ici.
- **Définir la date d'activation** : Activez l'option si vous voulez spécifier une date d'activation du secret.
- **Définir la date d'expiration** : Même chose qu'au-dessus pour une date de fin.
- **Activé** : Décidez manuellement si le secret est activé ou non. (Ici **Oui**)
- **Balise** : Ajoutez des balises pour retrouver plus facilement votre secret.

{{< figure src="/img/2023/01/Azure-Keyvault-Create-Secret.png" width="600" caption="Création du secret" alt="Création du secret dans Azure Keyvault via le portail" >}}

## Utilisation du secret

C'est ici que toute la magie opère. Pas besoin de modifier mon code, je peux simplement utiliser mon secret comme une variable d'environnement.

Pour ce faire, il suffit de respecter une syntaxe comme valeur de la variable d'environnement.

Voici les syntaxes possibles :

- `@Microsoft.KeyVault(SecretUri=https://mon-super-keyvault.vault.azure.net/secrets/CosmosDBEndpoint)`
- `@Microsoft.KeyVault(VaultName=mon-super-keyvault;SecretName=ComosDBEndpoint)`

## Utilisation en développement

Le Key Vault n'est pas uniquement utilisable en production. Il est aussi possible de l'utiliser en développement.

Le principe reste le même, mais il faut faire attention à une chose supplémentaire : être connecté au bon compte Azure. Via le CLI, c'est très simple :

```bash
az login
```

Et voilà, vous pouvez utiliser votre Key Vault en développement.

## Conclusion

C'était rapide non ? Vous n'avez plus aucune excuse pour protéger vos secrets et vos clés d'accès, que ce soit pendant le développement ou en production !

N'hésitez pas à me faire part de vos retours sur Twitter [@vsantele](https://twitter.com/vsantele)

Et à la prochaine pour d'autres astuces !
