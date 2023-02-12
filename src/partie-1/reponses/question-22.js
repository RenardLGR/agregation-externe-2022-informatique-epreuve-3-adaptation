// Question 22. Il existe différentes façons de représenter l'échiquier dans la classe Board. Cela peut se faire notamment à l'aide d'un tableau comme c'est le cas dans le code donné du listing 1. Proposer une autre façon de représenter l'échiquier et discuter de ses avantages et de ses inconvénients (en espace et en temps).


// Nous avons actuellement une matrice de Pièces avec chaque pièce n'ayant que peu de méthodes. On peut imaginer une matrice de Squares où chaque Square s'occupe de son environnement : s'il est menacé, si une pièce s'y trouve, avec quels est la nature des échange qu'il aurait avec les autres Squares etc.

// On peut évidemment organiser notre code en une Array de 64 éléments comme proposé au début.

//Enfin, si on a vraiment un souci d'espace, on peut organiser le board par un String dont les lignes sont séparés par un slash / et un nombre séparant un espace entre deux pièces représentés par une lettre majuscule ou non selon la couleur. Le board de départ serait donc :

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

// Et après le mouvement d2 -> d4 :

// rnbqkbnr/ppp1pppp/8/3p4/8/8/PPPPPPPP/RNBQKBNR

// Un gain considérable d'espace mais des opérations de Board difficiles.