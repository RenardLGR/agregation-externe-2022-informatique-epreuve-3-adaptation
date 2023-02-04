// sol est une solution au probleme des 8 dames
// sol est un ensemble de 8 valeurs
// exemple : [8 , 5, 20, 25, 42, 59, 54, 39]
// correspondant à une solution correcte (cf echiquier ci-dessus)
// retourne True si la solution est correcte , False sinon
// l'echiquier est represente par une liste de 64 cases
// la case 0 est le coin bas gauche
// la case 63 est le coin haut droit

// 56 57 58 59 60 61 62 63
// 48 49 50 51 52 53 54 55
// 40 41 42 43 44 45 46 47
// 32 33 34 35 36 37 38 39
// 24 25 26 27 28 29 30 31
// 16 17 18 19 20 21 22 23
// 8   9 10 11 12 13 14 15
// 0   1  2  3  4  5  6  7

function checkSolution8queens(sol){
    let sortedSol = sol.sort((a,b) => a-b) //sorted increasingly
    for(let i=0 ; i<sortedSol.length ; i++){
        let square = sortedSol[i] //dame courante
        let otherSquares = sortedSol.slice(i+1) //autres dames, inutile de vérifier les dames déja verifiees
        otherSquares.forEach(otherSquare => { //pour chaque autre dame
            if(square%8 === otherSquare%8){ //verifie la presence de la dame courante sur les colonnes des autres dames
                return false
            }
            if(Math.floor(otherSquare/8) - Math.floor(square/8) === 0){ //verifie la presence de la dame courante sur les lignes des autres dames
                return false
            }
        })
    }
    return true
}

// Question 1. La fonction du listing 1 est en fait fausse car incomplète.
//Elle retourne True pour certaines solutions qui ne sont en fait pas correctes. Programmer trois tests qui montrent trois défauts différents de la fonction check_solution8queens(sol). Le code de vos tests doit préciser les données en entrée et le résultat attendu.
// Commenter en quoi vos trois tests vérifient des propriétés différentes.

//=>
//Le programme ne vérifie pas le nombre de dames le test [35] renvoie True
//Le progamme ne vérifie pas que les valeurs de dames sont dans l'intervalle 0 <= dame <= 63 , le test [16 , 13, 28, 33, 50, 67, 62, 47] renvoie True
//Le programme ne vérifie pas les diagonales, le test [0, 9, 18, 27, 36, 45, 54, 63] renvoie True

// console.log(checkSolution8queens([35])); // True
// console.log(checkSolution8queens([16 , 13, 28, 33, 50, 67, 62, 47])); // True
// console.log(checkSolution8queens([0, 9, 18, 27, 36, 45, 54, 63])); // True