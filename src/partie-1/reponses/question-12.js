//Cette partie se base sur des explications données en annexe.
//L'algorithme utilise une méthode de backtracking. L'algorithme construit un arrangement partiel de position de reines que l'on appelle prefix.

// La fonction prend en paramètre "s", qui est la colonne actuelle en considération. Elle génère ensuite toutes les permutations possibles des reines dans cette colonne, en essayant de placer une reine dans chaque ligne de la colonne actuelle.

// Si la fonction trouve un placement qui ne viole pas les contraintes du puzzle, elle passe à la colonne suivante et génère toutes les permutations possibles pour l'arrangement mis à jour. Ce processus continue jusqu'à ce que toutes les 8 colonnes aient été considérées et qu'une solution complète ait été trouvée.

// Si la fonction trouve qu'un placement n'est pas possible (c'est-à-dire que la reine attaquerait une autre reine qui a déjà été placée), elle effectue un backtracking en enlevant la reine actuelle et en essayant un autre placement dans la même colonne. Ce processus continue jusqu'à ce qu'une solution complète soit trouvée ou que toutes les possibilités aient été épuisées.

// Au début de la fonction permute_8queens, s = 0, ce qui signifie que nous essayons de placer la première reine dans la colonne 0. Après avoir placé la première reine, s est incrémenté à 1, ce qui signifie que nous essayons maintenant de placer la deuxième reine dans la colonne 1. La fonction continue à placer des reines de cette manière jusqu'à ce que toutes les 8 reines aient été placées, moment auquel s sera égal à 8.

// Au cours de chaque itération de la boucle for, la fonction essaie de placer la reine actuelle (représentée par la variable s) dans une ligne différente de la colonne actuelle. Si le placement est valide, la fonction étend le préfixe de permutation en définissant les valeurs appropriées dans les tableaux rpar et rmar, puis appelle elle-même avec s incrémenté de 1 pour placer la prochaine reine. Si le placement n'est pas valide, la fonction continue à la prochaine itération pour essayer une ligne différente. Lorsque toutes les lignes possibles ont été essayées et qu'aucune d'entre elles ne mène à un placement valide, la fonction réduit le préfixe de permutation et renvoie le contrôle à l'appel précédent.

import Problem8Queens from "../Problem8Queens.js";

const N = 8; //Nombre de reine à placer, aussi taille de l'échiquier
let a = Array(N).fill(0); //Array qui enregistre le placement en colonne des reines sur chaque ligne, la valeur a[i] represente la ligne sur laquelle la reine est placée sur la colonne i, par exemple :
//Si a[3] = 5, la reine de la colonne 3 est sur la ligne 5
let placed = Array(N).fill(0); //Array de booleens qui garde une trace des colonnes qui ont déjà une reine
let rpar = Array(15).fill(0); // Array de booleens qui garde une trace des diagonales qui ont déjà une reine. Cette diagonal va du haut gauche vers le bas droit. 15 est le nombre de diagonales.
let rmar = Array(15).fill(0); // Array de booleens qui garde une trace des diagonales qui ont déjà une reine. Cette diagonal va du haut droit vers le bas gauche. 15 est le nombre de diagonales.
let nCall = 0 //Enregiste le nombre de solution trouvées
let solutions = [] //Enregistre les solutions trouvées

// Vérifie si le mouvement est valide. prefix_extensible prend en argument la row courante r at la colonne courante e, la fonction vérifie si l'une des deux diagonales serait déjà occupée. Elle vérifie donc si le préfixe
const prefix_extensible = (r, e) => (!rpar[r + e] && !rmar[r - e + 7]);

//Extend donc le prefix précédemment validée, marque les diagonales comme visitée
const prefix_extended = (r) => {
    rpar[r + a[r]] = 1;
    rmar[r - a[r] + 7] = 1;
};

//Backtrack le prefix, marque les diagonales comme non visitées
const prefix_reduced = (r) => {
    rpar[r + a[r]] = 0;
    rmar[r - a[r] + 7] = 0;
};

//Sors un résultat trouvé
const addToSolution = () => {
    nCall++

    let res = a.slice() //Garde une copie profonde de la configuration actuelle
    res = res.map(el => {
        let arr = Array(N).fill(0)
        arr[el] = 1
        return arr
    })


    res = res.map(matrix => getQueenPositions(matrix)) // Configuration actuelle sous format coordonnées

    solutions.push(res.slice())

    function getQueenPositions(board){ // return Array of coords
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let res = []
        for(let line=0 ; line<8 ; line++){
            for(let col=0 ; col<8 ; col++){
                if(board[line][col] === 1){
                    let letterTemp = letters[col]
                    let numTemp = line+1
                    res.push(''+letterTemp+numTemp)
                }
            }
        }

        return res
    }
};


//Le paramètre s est la colonne courante sur laquelle la reine sera placée.
const permute_8queens = (s) => {
    for (let i = 0; i < N; i++) { //loop à travers toutes les lignes
        if (!placed[i]) { //Vérifie si la colonne actuelle peut accueillir une reine
            if (!prefix_extensible(s, i)) { //Vérifie si les diagonales actuelles peuvent accueillir une reine. s est la colonne courante considérée, i est la ligne courrante considérée
                continue; //Essaye la ligne suivante
            }
            a[s] = i; //i est la ligne actuelle de la reine de la colonne s
            placed[i] = 1; // place garde les colonne qui ont une reine. La colonne i a maintenenat une reine
            prefix_extended(s); //Met à jour les diagonales
            if (s === N - 1) { //Si nous sommes sur la dernière colonne
                addToSolution(); //Ajoute notre configuration actuelle aux solutions
            }else{ //Passe à la colonne suivante
                permute_8queens(s + 1);
            }
            //Backtrack
            placed[i] = 0;
            prefix_reduced(s);
        }
    }
};

//Call with the column 0
permute_8queens(0)

// console.log(nCall); // 92

let problem = new Problem8Queens()

// console.log(solutions.every(ans => problem.checkSolution8queensWithCoords(ans))); // True