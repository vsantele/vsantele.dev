---
draft: true
date: "{ .Date }"
title: Experience Github Copilot Labs
description: Comment comprendre du code grâce à Github Copilot Labs
slug: ""
authors:
  - Victor Santelé
tags:
  - Copilot
  - Haskell
categories:
  - Experience
externalLink: ""
series: []
lastmod: 2022-09-17T23:21:08.186Z
---

Cette semaine j'ai eu mon premier cours de programmation functionnelle à l'université. On voit les principes avec [Haskell](https://fr.wikipedia.org/wiki/Haskell) et c'est un langage avec une syntaxe assez différente comparé à C#, JavaScript ou encore le C. On a vu en exemple une fonction pour effectuer un [quicksort](https://fr.wikipedia.org/wiki/Tri_rapide) sur un tableau de nombre.

{{< highlight haskell >}}
qsort [] = []
qsort (x:xs) = qsort less ++ [x] ++ qsort more
  where less = filter (<x) xs
        more = filter (>=x) xs
{{< / highlight >}}

Je ne vais pas vous expliquer comment fonctionne ce code, mais ne vous inquiétez pas, quelqu'un d'autre va s'en charger!

En le voyant j'ai repensé à une fonctionnalité présente dans GitHub Copilot Labs, une extension complémentaire à GitHub Copilot qui ajoute, pour le moment, deux fonctionnalités en plus: l'explication de code et la traduction de code.

J'ai donc entré ce code dans le champ pour l'explication avec le paramètre `Explain code` et voilà ce qu'il m'a sorti la première fois:

<!-- Début -->
  Here is the explanation for the code above:
  1. The first line is the base case. If the input list is an empty list, then the output is an empty list, and nothing else needs to be done. 
  2. The second line is the recursive case. The input list is split into two parts: the first element of the list (x) and the rest of the list (xs). The first element of the list is called the pivot.
  3. The list is recursively sorted using qsort. This is done by sorting the list of elements that are less than the pivot (x) and the list of elements that are greater than or equal to the pivot. 
  4. The list of elements that are less than x is called less and the list of elements that are greater than or equal to x is called more.
  5. The list of elements that are less than x is sorted using qsort.
  6. The list of elements that are greater than or equal to x is sorted using qsort.
  7. The sorted list of elements that are less than x is concatenated with the pivot and the sorted list of elements that are greater than or equal to x.

The code is available at
<!-- Fin -->

Franchement, on comprend bien ce que fait la fonction. Je ne sais pas d'où sort la fin de l'explication mais on va mettre ça sur le dos de la béta. Ou alors j'ai pas vu la suite de l'explication quand j'ai copié le résultat.

Parce que oui, si vous testez chez vous (GitHub Copilot est gratuit pour les étudiants et même les professeurs), vous avez de grande chance d'obtenir un résultat différent. Lors de l'écriture de cet article, j'ai réessayé et j'ai eu ceci:

<!-- Début -->
  Here is the explanation for the code above:
  1. qsort is the function name. It takes an input in the form of a list of integers and returns a sorted list of integers.
  2. [] is the base case. If the input list is empty, then the output list is also empty.
  3. (x:xs) is the recursive case. The input list is partitioned into two sub-lists: the first element, x, and the rest of the list, xs. The output is the concatenation of the sorted sub-lists less and more.
  4. less = filter (<x) xs is the list of elements less than the first element of the input list.
  5. more = filter (>=x) xs is the list of elements greater than or equal to the first element of the input list.
<!-- Fin -->

L'explication prend une autre approche mais on comprend également. Cependant ce n'était pas tout! Copilot a décidé d'être bavard cette fois-ci et il a voulu continuer son explication.
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

On est d'accord, c'est un peu long. Un peu beaucoup même. Je ne connais pas assez cette fonctionalité de Copilot pour comprendre pourquoi il a écrit autant de texte cette fois-ci. L'explication sur le récursive est très bien mais je ne vois pas pourquoi il a écrit autant de texte sur les types.

Si vous êtes étudiants ou même professeurs, vous pouvez tester cette fonctionnalité gratuitement. Cela peut être utile pour découvrir rapidement un nouveau langage ou une partie d'un code que vous ne connaissez pas. Alors attention, jamais cela remplacera un vrai apprentissage d'un langage mais c'est un bon complément. Et ça peut être utile même dans les langages qu'on maitrise déjà. Il arrive fréquemment de devoir travailler sur un projet déjà existant et de devoir modifier ou ajouter des fonctionnalités. Dans ce cas, Copilot peut être utile pour comprendre rapidement le code existant.

PS: Cet article a été écrit avec l'aide de Copilot (D'ailleurs il voulait écrire que c'est lui qui a écrit, le bougre).
