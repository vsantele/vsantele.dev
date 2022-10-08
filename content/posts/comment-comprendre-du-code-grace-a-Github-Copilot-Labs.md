---
draft: false
date: 2022-10-08
title: Comment comprendre du code grâce à Github Copilot Labs
description: Comment comprendre et traduire du code grâce à Github Copilot Labs
slug: ""
authors:
  - Victor Santelé
tags:
  - Copilot
  - Haskell
categories:
  - Experiences
externalLink: ""
series: []
lastmod: 2022-10-08T17:03:34.920Z
---

Il y a quelques semaines, j'ai eu mon premier cours de programmation fonctionnelle à l’université. On voit les principes via [Haskell](https://fr.wikipedia.org/wiki/Haskell). C’est un langage avec une syntaxe assez différente comparé au C ou JavaScript. On a vu, en exemple, une fonction pour effectuer un [quicksort](https://fr.wikipedia.org/wiki/Tri_rapide) sur un tableau de nombre.

{{< highlight haskell >}}
qsort [] = []
qsort (x:xs) = qsort less ++ [x] ++ qsort more
  where less = filter (<x) xs
        more = filter (>=x) xs
{{< / highlight >}}

Je ne vais pas vous expliquer comment fonctionne ce code maintenant, mais ne vous inquiétez pas, quelqu'un d'autre va s'en charger !

En le voyant, j'ai repensé à une fonctionnalité présente dans GitHub Copilot Labs, une extension complémentaire à GitHub Copilot qui ajoute, pour le moment, deux fonctionnalités en plus : l'explication de code et la traduction de code vers un autre langage.

J'ai donc entré le quicksort dans le champ pour l'explication avec le paramètre `Explain code` et voilà ce qu'il m'a sorti la première fois :

<!-- Début -->
{{< notice example Explication >}}
  Here is the explanation for the code above:

  1. The first line is the base case. If the input list is an empty list, then the output is an empty list, and nothing else needs to be done.
  2. The second line is the recursive case. The input list is split into two parts: the first element of the list (x) and the rest of the list (xs). The first element of the list is called the pivot.
  3. The list is recursively sorted using qsort. This is done by sorting the list of elements that are less than the pivot (x) and the list of elements that are greater than or equal to the pivot.
  4. The list of elements that are less than x is called less and the list of elements that are greater than or equal to x is called more.
  5. The list of elements that are less than x is sorted using qsort.
  6. The list of elements that are greater than or equal to x is sorted using qsort.
  7. The sorted list of elements that are less than x is concatenated with the pivot and the sorted list of elements that are greater than or equal to x.

The code is available at
{{< / notice >}}
<!-- Fin -->

Franchement, on comprend bien ce que fait la fonction. J'ignore d'où sort la fin de l'explication, mais on va mettre ça sur le dos de la bêta. Ou alors, je n'ai pas vu la suite de l'explication quand j'ai copié le résultat.

Parce que oui, si vous testez chez vous (GitHub Copilot est gratuit pour les étudiants et même les professeurs), vous avez de grandes chances d'obtenir un résultat différent. Lors de l'écriture de cet article, j'ai réessayé et j'ai eu ceci :

<!-- Début -->
{{<  notice example "Autre Explication" >}}
  Here is the explanation for the code above:

  1. qsort is the function name. It takes an input in the form of a list of integers and returns a sorted list of integers.
  2. [] is the base case. If the input list is empty, then the output list is also empty.
  3. (x:xs) is the recursive case. The input list is partitioned into two sub-lists: the first element, x, and the rest of the list, xs. The output is the concatenation of the sorted sub-lists less and more.
  4. less = filter (<x) xs is the list of elements less than the first element of the input list.
  5. more = filter (>=x) xs is the list of elements greater than or equal to the first element of the input list.
{{< / highlight >}}
<!-- Fin -->

L'explication prend une autre approche, mais on comprend également. Cependant, ce n'était pas tout ! Copilot a décidé d'être bavard cette fois-ci et il a voulu continuer son explication.

{{<  notice example "Longue explication" >}}
<!-- Début -->
  This is a simple example of recursion. The real power of recursion in Haskell is that you can easily define functions on lists that do not require you to think about the list structure. For example, here is a function that returns the length of a list:

  -- Language: haskell
  length [] = 0
  length (x:xs) = 1 + length xs

  The code above is very simple. It uses the same two cases as the qsort function. The base case is that the length of an empty list is zero. The recursive case is that the length of a list is one more than the length of the list minus the first element. The second case is just a one-liner!

  The Haskell compiler can automatically infer the types of variables and functions. Haskell also supports type classes. Here is a simple example of a type class:

  class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x == y = not (x /= y)
    x /= y = not (x == y)

  The Eq type class defines a set of functions for testing equality. The functions (==) and (/=) are used to test equality and inequality. The last two lines of the code above specify that the functions (==) and (/=) are equal to each other when negated.

  Haskell also supports a type system called type inference. Type inference is the process of inferring the type of a variable based on its context. For example, if a variable is assigned a value of type Int, then it is inferred that the variable is of type Int. Haskell supports type inference because it is a statically-typed language. A statically-typed language is a programming language in which the type of a variable is known at compile time, as opposed to a dynamically-typed language.

  The type system in Haskell is very powerful. It is possible to define a type class over a type class. For example, the Eq type class can be defined over the Eq type class:

  class (Eq a) => Ord a where
    (<) :: a -> a -> Bool
    (<=) :: a -> a -> Bool
    (>) :: a -> a -> Bool
    (>=) :: a -> a -> Bool
    max :: a -> a -> a
    min :: a -> a -> a
    compare :: a -> a -> Ordering

  The Ord type class is a subclass of the Eq type class. The functions (<), (<=), (>=), and (>) are used to compare two values. The functions max and min are used to return the maximum and minimum of two values. The function compare compares two values and returns an ordering. The ordering can be GT, LT, or EQ.

  Haskell supports type inference. The type inference in Haskell is very powerful. It is possible to define a type class over a type class. For example, the Eq type class can be defined over the Eq type class:

  class (Eq a) => Ord a where
    (<) :: a -> a -> Bool
    (<=) :: a -> a -> Bool
    (>) :: a -> a -> Bool
    (>=) :: a -> a -> Bool
    max :: a -> a -> a
    min :: a -> a -> a
    compare :: a -> a -> Ordering

  The Ord type class is a subclass of the Eq type class. The functions (<), (<=), (>=), and (>) are used to compare two values. The functions max and min are used to return the maximum and minimum of two values. The function compare compares two values and returns an ordering. The ordering can be GT, LT, or EQ.

  Haskell supports type inference. The type inference in Haskell is very powerful. It is possible to define a type class over a type class. For example, the Eq type class can be defined over the Eq type class
<!-- Fin -->
{{< / notice >}}

On est d'accord, c'est un peu long. Un peu beaucoup même. Je ne connais pas assez cette fonctionnalité de Copilot pour comprendre pourquoi il a écrit autant de texte cette fois-ci. L'explication sur la récursive est très bien, mais je ne vois pas pourquoi il a écrit autant de texte sur les types. Peut-être qu'il n'y a pas assez de ressources en Haskell disponible sur GitHub et donc, Copilot peine à faire une synthèse de ce qu'il a trouvé.

Si vous êtes étudiants ou même professeurs, vous pouvez tester cette fonctionnalité gratuitement. Sinon, Copilot est disponible via un [abonnement](https://github.com/features/copilot). Cela peut être utile pour découvrir rapidement un nouveau langage ou une partie d'un code que vous ne connaissez pas. Alors attention, jamais cela remplacera un vrai apprentissage d'un langage, mais c'est un bon complément. Cela peut être utile même dans les langages que l'on maitrise déjà. Il arrive fréquemment de devoir travailler sur un projet déjà existant et de devoir modifier ou ajouter des fonctionnalités. Dans ce cas, Copilot peut être utile pour comprendre rapidement le code existant.

Une autre fonctionnalité intéressante de Copilot Labs est la traduction de code. Vous pouvez traduire du code d'un langage à un autre. Cela peut être utile pour apprendre un nouveau langage. Vous pouvez également vous en servir pour vous aider à comprendre un code existant. Les résultats en Haskell ne sont pas concluant à tous les coups. Cela provient peut-être du paradigme d'Haskell, le fonctionnel et de sa syntaxe très différente de ce que l'on peut voir dans d'autres langages.

Par exemple, voici ce qu'il m'a proposé pour passer la fonction quicksort en Python :

{{< highlight python >}}
def qsort (xs):
    if xs == []:
        return []
    else:
        x = xs[0]
        less = filter(lambda a: a < x, xs)
        more = filter(lambda a: a >= x, xs)
        return qsort(less) + [x] + qsort(more)
{{< / highlight >}}

Ce code contient plusieurs erreurs. Déjà, il ne fonctionne pas dans l'état. L'interpréteur vous dira que filter n'est pas `subscribable` et donc, il ne peut pas récupérer le premier élément de la liste à la seconde itération. On peut régler cela en castant simplement la fonction en `list`. Mais, en faisant ça, d'autres erreurs arrivent ! On arrive sur une boucle infinie, le premier élément de la liste n'est jamais extrait et de ce fait, la taille de la liste ne diminue pas. Le cas de base de cette fonction récursive n'est jamais atteint. Pour y arriver, il faut modifier `xs`, qui correspond à la liste sans son premier élément `x` pour, justement, enlever `x`. On peut donc écrire :

{{< highlight python >}}
def qsort(xs):
    if xs == []:
        return []
    else:
        x = xs[0]
        xs = xs[1:]
        less = list(filter(lambda a: a < x, xs))
        more = list(filter(lambda a: a >= x, xs))
        return qsort(less) + [x] + qsort(more)
{{< / highlight >}}

Il y a certainement moyens d'optimiser cette fonction d'avantage. Mais, elle fonctionne et reste proche du fonctionnement en Haskell. Il a fallu régler quelques problèmes de syntaxe, mais rien de bien compliqué si l'on sait lire les codes d'erreurs et que l'on connait un minimum le langage cible. Peut-être que si j'avais redemandé à Copilot une autre version, il y aurait eu moins de bugs. Car, comme pour l'explication, le résultat varie d'une demande à l'autre.

Le Python peut également être utilisé en fonctionnel, Copilot s'en est plus ou moins bien sorti. Mais, que se passe-t-il si on lui demande de le traduire en C ?

Eh bien... il n'y arrive pas, il me ressort systématiquement le code Haskell, sauf une fois, où il m'a simplement sorti une fonction main qui retourne 0. Il y a encore des progrès à faire, les fonctionnalités n'existent pas depuis longtemps, il y a encore une marge de progression non négligeable.

Affaire à suivre donc.

PS : Cet article a été écrit avec l'aide de Copilot (D'ailleurs, il voulait écrire qu'il l'a écrit, le bougre).
