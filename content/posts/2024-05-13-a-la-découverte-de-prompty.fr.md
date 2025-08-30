---
title: À la découverte de Prompty
date: 2024-05-17T12:00:00.000Z
draft: false
lastmod: 2024-05-17T15:02:23.120Z
description: Découvre ce qu'est Prompty, le petit frère de Promptflow et simplifie ton interaction avec des LLMs
series:
  - Promptflow
categories:
  - AI
  - LLM
keywords:
  - AI
  - LLM
  - Promptflow
  - Prompty
type: posts
slug: a-la-decouverte-de-prompty
authors:
  - Victor Santelé
images:
  - /img/2024/05/superCorgiExtended.webp
---

- [Introduction](#introduction)
- [Mais c'est un peu trop gros pour juste des petits usages non ?](#mais-cest-un-peu-trop-gros-pour-juste-des-petits-usages-non-)
- [C'est cool ça, mais c'est déjà utilisable en production ?](#cest-cool-ça-mais-cest-déjà-utilisable-en-production-)
- [Et on fait comment pour l'utiliser ?](#et-on-fait-comment-pour-lutiliser-)
  - [Prérequis](#prérequis)
  - [Création de son premier Prompty](#création-de-son-premier-prompty)
  - [Connexion avec OpenAi](#connexion-avec-openai)
  - [(Alternative) Connexion avec une API compatible OpenAI](#alternative-connexion-avec-une-api-compatible-openai)
  - [Tester son Prompty](#tester-son-prompty)
  - [Modifier les inputs](#modifier-les-inputs)
  - [Utilisation en Chat](#utilisation-en-chat)
  - [Intégration dans un script Python](#intégration-dans-un-script-python)
- [Conclusion](#conclusion)

## Introduction

Avant de parler de Prompty, il faut que je te parle un peu de [Promptflow](https://microsoft.github.io/promptflow/?wt.mc_id=studentamb_236461).
C'est une suite d'outil de développement pour interagir avec des LLMs facilement pour créer des applis AI.
Le principe de fonctionnement utilise des flows, comme le nom l'indique. On détermine une suite d'action à faire lors d'une requête via un fichier YAML sous forme de DAG combiné avec du code Python et des fichiers Markdown propulsé par Jinja.
Il est également possible depuis peu de faire des flows uniquement avec du code Python via des classes ou des fonctions, des flex flow, mais ce n'est pas le sujet d'aujourd'hui.

{{< figure src="/img/2024/05/promptflow-dag.webp" caption="Exemple d'un PromptFlow DAG" >}}

Même si c'est un projet développé par Microsoft et disponible sur leur plateforme [AI](https://azure.microsoft.com/fr-fr/solutions/ai?wt.mc_id=studentamb_236461), il est relativement facile de se détacher d'Azure et de le faire tourner où on veut via un container docker ou un exécutable.

## Mais c'est un peu trop gros pour juste des petits usages non ?

Oui, c'est vrai, si on veut simplement faire un appel à OpenAI en utilisant un template simple. Et c'est là que Prompty intervient !
Tout se fait dans un fichier qui combine du Markdown et un frontmatter en YAML.
On garde la puissance du moteur de template Jinja avec la simplicité de définir sa connexion et ses variables.

Ensuite, on peut utiliser ce fichier avec le CLI de Promptflow ou bien un petit bout de code Python qui est intégrable où on veut.

## C'est cool ça, mais c'est déjà utilisable en production ?

Alors, c'est encore en preview, je ferais attention avant de l'envisager en production. La fonctionnalité est sortie fin avril, rien ne nous garantit qu'il n'y aura pas de grosses modifications dans le futur.
Cependant, Prompty ne fait rien de magique en soi, il permet simplement de gagner du temps de développement pour interagir avec des LLMs.
Si le projet est abandonné, ou quoi que ce soit, il sera toujours temps de remplacer le Prompty par du code Python entièrement, même si cela prendra un peu de temps à mettre en place.

## Et on fait comment pour l'utiliser ?

Puisque tu sembles impatient, on va commencer à rentrer dans le vif du sujet ! Je vais t'expliquer comment créer ton premier Prompty depuis 0 et on va voir pour augmenter la complexité (et donc le fun) au fur et à mesure. Tu es prêt ?

### Prérequis

Pour commencer, il te faut un accès à Python. Le site de Promptflow recommandait la version 3.9 jusqu'à il y a quelques semaines, mais tu peux choisir n'importe quelle version supérieure à 3.9.
Si tu veux suivre de bonnes pratiques et éviter de potentielles onflits avec d'autres packages, tu peux créer un environnement virtuel avec venv ou conda

```pwsh
python -m venv prompty
# Linux/MacOS
source prompty/bin/activate
# Windows
prompty\Scripts\activate
```

Ensuite, il faut installer promptflow pour avoir accès au CLI.

```pwsh
pip install promptflow
```

{{< notice warning "Si tu as déjà promptflow" >}}

La version 1.8 de promptflow a modifié la structure interne des packages, il est conseillé de désinstaller les packages et de les réinstaller pour éviter tout problème.

{{< /notice >}}

Testons si le CLI est bien installé et est accessible.

```pwsh
pf --version
```

Si tout est bon, tu devrais voir la version des différents packages de promptflow s'afficher.

### Création de son premier Prompty

Maintenant, il est temps de créer son premier fichier `.prompty`. Il s'agit d'un type de fichier reconnu par Promptflow qui combine du Markdown avec un front-matter et le format Jinja.

Créer un fichier `hello-world.prompty` avec le contenu suivant :

```markdown
---
name: "Hello World"
description: "Un simple hello world propulsé par GPT"
model:
  api: chat
  configuration:
    type: openai
    model:  gpt-3.5-turbo
    api_key: ${env:OPENAI_API_KEY}
  parameters:
    max_tokens: 128
    temperature: 1.4
inputs:
  first_name:
    type: string
  last_name:
    type: string
  tone:
    type: string
sample:
  first_name: John
  last_name: Doe
  tone: cérémonieux
---

system:
Tu es un assistant qui salue les gens. Tu vas ajouter une touche d'originalité pour chaque personne. Tu dois avoir un ton "{{tone}}".
Ton seul rôle est de saluer les gens. Tu ne dois pas répondre à des questions ou faire des commentaires sur autre chose.

La personne s'appelle "{{first_name}} {{last_name}}".
```

On va décortiquer un peu le contenu du fichier pour mieux comprendre ce qu'on fait.

Tout d'abord, nous avons le front matter qui respecte la syntaxe YAML. Il est défini entre les deux `---`. Il contient des informations nécéssaires et par défaut pour faire tourner notre Prompty. Voici les différentes informations que l'on peut y mettre :

- `name`: Le nom de notre Prompty
- `description`: Une description pour savoir ce que fait notre Prompty
- `model`: Les informations pour de connection à l'API d'openAI ou Azure OpenAI et les paramètres du modèle.
  - `api`: Le type d'API à utiliser (pour le moment `chat`)
  - `configuration`: Les informations pour se connecter à l'API d'OpenAI
    - `type`: Pour le moment, seul `openai` et `azure-openai` sont supportés.
    - `model`: Le nom du modèle (openai uniquement)
    - `api_key`: La clé d'API pour se connecter
    - `base_url`: Optionnel, l'URL de base pour se connecter à l'API (openai uniquement).
    - `azure_deployment`: Le nom du déploiement sur Azure OpenAI (azure-openai uniquement)
    - `api_version`: La version de l'API à utiliser (azure-openai uniquement)
    - `azure_endpoint`: L'URL de l'API (azure-openai uniquement)
  - `parameters`: Les paramètres pour le modèle. Ici, les 2 plus souvent utilisés, `max_tokens` et `temperature`.
    - `max_tokens`: Le nombre de tokens à générer au maximum pour la réponse
    - `temperature`: La température pour générer la réponse. Plus la température est élevée, plus la réponse sera "créative/folle". Plus elle s'approche de 0, plus elle sera reproductible.
  - `inputs`: Les différentes variables que l'on peut passer à notre modèle. Ici, on a 3 variables, `first_name`, `last_name` et `tone`.
    - `type`: Le type de la variable.
  - `outputs`: Optionnel, les champs de sorties du JSON si on utilise le `response_format`: `json_object`. Il fonctionne comme le champ `inputs`.
  - `sample`: Un exemple de données qui seront utilisées par défaut.
  
Ensuite, nous pouvons écrire notre prompt en Markdown. Le prompt est assez court et se compose que d'un bloc `system`. Il va décrire le comportement du modèle et lui apporter les informations nécessaires pour répondre à la demande. Ici, on demande simplement au modèle de saluer quelqu'un en étant original.

Il y a 3 blocs principaux disponibles : `system`, `user` et `assistant`. Le bloc `tool` n'est pas supporté pour le moment. Fais attention à bien avoir un passage à la ligne après le `:` pour que le bloc soit reconnu.

Si tu regardes bien le contenu du markdown, tu peux voir des expressions Jinja. C'est ce qui va permettre d'utiliser les inputs que nous avons définis dans le frontmatter de notre Prompty. Pour uniquement utiliser une variable, il suffit de la mettre entre `{{` et `}}`. Le reste de la syntaxe Jinja est disponible ici : [https://jinja.palletsprojects.com/en/3.1.x/templates/](https://jinja.palletsprojects.com/en/3.1.x/templates/)

### Connexion avec OpenAi

Maintenant que nous avons un prompty il manque les informations de connexion pour l'API d'OpenAI. Tu peux obtenir une clé en cliquant [ici](https://platform.openai.com/api-keys?wt.mc_id=studentamb_236461). Tu peux également utiliser une ressource Azure Open AI, mais je ne décrirai pas la procédure ici.

Une fois que tu as ta clé d'API, tu peux ajouter la variable d'environnement `OPENAI_API_KEY` avec la valeur de ta clé.

```pwsh
# Powershell
$env:OPENAI_API_KEY = "ta_clé"
# Bash
export OPENAI_API_KEY="ta_clé"
```

### (Alternative) Connexion avec une API compatible OpenAI

Si tu ne souhaites pas utiliser OpenAI, ni Azure OpenAI. Tu peux simplement utiliser un autre fournisseur compatible avec l'API d'OpenAI ou utiliser un modèle Open Source sur ta machine grâce à [ollama](https://ollama.com/) ou [LM Studio](https://lmstudio.ai/) par exemple.

La seule chose à ajouter dans ton frontmatter est `base_url` dans `model.configuration`. Voici un example pour Ollama:

```yaml
# ... Ta configuration
model:
  api: chat
  configuration:
    type: openai
    model: phi-3 # Non utilisé
    api_key: "Non utilisé"
    base_url: "http://localhost:11434/"
# ...
```

Tu peux remplacer `http://localhost:11434/` par `${env:OPENAI_BASE_URL}` pour utiliser une variable d'environnement si tu préfères. Cela te permet de facilement changer l'URL sans avoir à modifier le fichier. Et même d'utiliser OpenAI par la suite avec `https://api.openai.com/v1` comme valeur (Attention à ton nom de modèle).

### Tester son Prompty

Maintenant que tout est en place, il est temps d'obtenir notre premier résultat avec la commande suivante :

```pwsh
pf flow test --flow hello-world.prompty
```

{{< figure src="/img/2024/05/hello-world-prompty.webp" caption="Résultat du hello-world" alt="Bonjour, noble John Doe, humblement je vous salue avec toute la cérémonie qui se doit. Puissiez-vous briller comme une étoile polaire dans le firmament de vos journées." >}}

Si tu cliques sur le lien de la réponse avant la réponse, tu peux voir les étapes qu'il y a eues avant d'arriver à la réponse et obtenir plus de détail. Ce n'est pas vraiment utile pour un Prompty, mais pour un Promptflow plus complexe, cela peut être très utile.

### Modifier les inputs

Maintenant que le premier test est passé, on peut s'amuser avec les variables d'entrée via le flag `--inputs`

Par Exemple:

```pwsh
pf flow test --flow hello-world.prompty --inputs first_name=Victor last_name=Santelé tone=amusé
```

{{< figure src="/img/2024/05/inputs-prompty.webp" caption="Résultat du hello-world avec des inputs" alt="Bonjour Victor Maître du Monde Santelé ! Comment ça va ?" >}}

(Promis, j'ai pas triché sur le résultat)

### Utilisation en Chat

Maintenant qu'on a un peu jouer avec des entrées simples, on va pousser un peu plus loin la logique pour permettre d'intéragir avec notre Prompty comme un chat. En gardant l'historique de la conversation en gros.

Il ne faut pas oublier que l'API d'OpenAI (et la majorité des LLMs) fonctionne en "stateless", c'est-à-dire qu'il ne garde pas en mémoire les précédentes réponses. Pour chaque interaction, il faut envoyer l'ensemble de la conversation dans le contexte pour qu'il puisse répondre correctement.

Pour cela, on va créer un nouveau fichier `chat.prompty` avec le contenu suivant :

```markdown
---
name: "Auteur de mail"
description: "Chatbot pour aider à la rédaction d'un mail."
model:
  api: chat
  configuration:
    type: openai
    model:  gpt-3.5-turbo
    api_key: ${env:OPENAI_API_KEY}
  parameters:
    max_tokens: 256
    temperature: 1.4
inputs:
  question:
    type: string
    is_chat_input: true
  chat_history:
    is_chat_history: true
    type: list
    default: []
sample:
  question:
  chat_history: []

---

system:
Tu es un assistant bienveillant. Tu vas aider l'utilisateur a écrire un mail. Tu as besoin d'un minimum d'information pour commencer: le nom du destinataire, le sujet, un résumé du contenu et le ton du message. Tu peux demander ces informations à l'utilisateur en posant des questions. Tu peux aussi donner des conseils pour écrire un mail efficace. Quand tu as toutes les informations, rédiges le mail en respectant les demandes de l'utilisateur.

{% for message in chat_history %}
{{ message.author }}:
{{ message.content }}
{% endfor %}
user:
{{ question }}

```

Tu peux ensuite tester le chat avec la commande :

```pwsh
pf flow test --flow chat.prompty --interactive
```

{{< notice tip "Ajoute une inteface web" >}}

Si tu préfères une version plus agréable à utiliser pour un chat, rajoute le flag `--ui`

{{< /notice >}}

Qu'est-ce qui a changé par rapport à notre hello world ? Déjà, dans les paramtres, on a modifié les inputs pour avoir la question de l'utilisateur et l'historique de la conversation.
On a également précisé que `question` est une entrée de chat avec `is_chat_input: true` et que `chat_history` est un... historique de chat grâce à `is_chat_history: true`. Cela permet à promptflow de comprendre quels champs correspond à un message dans le chat et où stocker l'historique.

Mais, je ne venais pas de dire que les requêtes sont stateless?

Et oui, c'est bien le cas! La mention `is_chat_history:true` n'est utile que lors des tests interactifs. C'est une aide pour le développeur simplement. En production, il faudra gérer nous-mêmes l'historique de la conversation sous la forme suivante :

```json
[
  { "author": "user", "content": "Bonjour" },
  { "author": "assistant", "content": "Bonjour, comment puis-je vous aider ?" }
]
```

Voici ce que ça peut donner :

{{< figure src="/img/2024/05/chat-ui-prompty.webp" caption="Exemple de conversation pour écrire un mail." alt="Conversation entre le chatbot et un utilisateur qui l'aide à écrire un mail." >}}

Si tu es habitué à Azure Ai, tu ne seras pas perdu dans l'interface. Comme on peut le voir dans la capture d'écran, il a continué de me poser des questions pour obtenir les informations requises pour m'aider à rédiger mon e-mail. Grâce à l'historique, il a pu garder dans son contexte les informations que je lui ai données.

### Intégration dans un script Python

Maintenant que tu as les bases pour créer un Prompty, tu peux l'intégrer dans n'importe quel script Python.

Pour cela, il faut charger le fichier `.prompty` depuis la classe `Prompty` de `promptflow.core` et l"utiliser avec les bons `inputs`.

Commence par créer un fichier python `run.py` :

```py
from promptflow.core import Prompty

prompty = Prompty("hello-world.prompty")
response = prompty(first_name="John", last_name="Doe", tone="drôle")
```

{{< figure src="/img/2024/05/python-run-prompty.webp" caption="Résultat de l'appel depuis Python" alt="Salut Johnny-boy! Comment ça roule aujourd'hui, champion?" >}}

Maintenant tu as les bases pour faire les Prompty que tu souhaites!

## Conclusion

On a pu découvrir pas mal de fonctionnalités de Prompty et Promptflow. J'ai essayé de rester simple sans oublier de détail pour que ça puisse être accessible à un maximum de monde.

J'espère que je t'ai donné l'envie de tester Prompty et de découvrir le reste des fonctionnalités de Promptflow. Je vais publier un autre article bientôt pour présenter des fonctionnalités un peu plus avancées et on va finir par maîtriser toutes les possibilités de Promptflow ensemble!

On se revoit vite ! 😎
