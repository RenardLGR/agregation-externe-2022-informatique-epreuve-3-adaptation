// Problème des mats en N coups

// L'application ChessMate ne porte pas bien son nom puisque, en l'état, les problèmes d'échecs et mat ne sont pas supportés. On se propose d'y remédier.

// La classe MatInNMoves représente un problème de type mat en N coups. Un tel problème est défini par une position initiale des pièces sur l'échiquier, une couleur (blanc ou noir) pour laquelle le problème est posé, et un nombre de coups maximum pour que cette couleur mette l'autre couleur en position de mat (c'est-à-dire dans l'impossibilité d'empêcher la prise de son roi).

// Question 21. Proposer les méthodes de cette classe (pas le code) permettant à un utilisateur d'essayer de résoudre un tel problème. A noter que dans le cadre spécifique des mats en N coups, c'est la même entité qui manipule à la fois le joueur avec les pièces blanches et avec les pièces noires. Vous ferez en sorte que la classe MatInMoves réutilise un maximum la classe Game, et vous expliquerez la façon dont la vérification du problème se fait.



//On s'intéressera d'abord à construire la fonction isKingCheckMate(kingPos) qui regardera si un roi est en poistion d'échec et mat.

//Pour ce faire :

//On regarde si le roi est en position d'échec avec board.isKingChecked(kingPos).
//On appelle king.legalMoves() pour obtenir les mouvements légaux.
//Que l'on filtre pour garder les mouvements possibles possibleMoves. Un mouvement possible et un mouvement vers une case vide ou un mouvement vers une pièce d'une autre couleur.
// Si chacun des mouvements possibles entraîne une nouvelle fois à un roi en position d'échec, donc que chacune de ces positions est défendues par une pièce de la couleur adverse, c'est échec et mat. On utilisera la fonction board.isSquareDefended(square, color) pour chacune des ces positions. Ce n'est pas une vérification suffisante, voir board4.

// Concernant Game, nous ajoutons la variable this.turn initialisée à 1 (ou autre), une fois N tours exactement passés nous appellerons la fonction introduite ci-dessus, chercher la position du roi pourra être fait par Board ou Game, ça n'a que peu d'importance.

import Game from "../Game.js";
import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";
import Problem8Queens from "../Problem8Queens.js";

// let board1 = new Board()
// board1.clearBoard()
// board1.putPiece(['c6'], Queen, 'white')

// console.log(board1.isSquareDefended('b8', 'white')) // false
// console.log(board1.isSquareDefended('c8', 'white')) // true
// console.log(board1.isSquareDefended('a8', 'white')) // true

// board1.putPiece(['e8'], Bishop, 'white')
// console.log(board1.isSquareDefended('e8', 'white')) // true

// ____________
// let board2 = new Board()
// board2.clearBoard()

// board2.putPiece(['c8'], King, 'black')

// board2.putPiece(['d4'], Queen, 'white')
// board2.putPiece(['f4'], Bishop, 'white')
// board2.putPiece(['h7', 'e8'], Rook, 'white')

// console.log(board2.isKingCheckMate('c8')); //true

// let board3 = new Board()
// board3.clearBoard()
// board3.putPiece(['c8'], King, 'black')

// board3.putPiece(['d4'], Queen, 'white')
// board3.putPiece(['e4'], Bishop, 'white')
// board3.putPiece(['e8'], Rook, 'white')

// console.log(board3.isKingCheckMate('c8')); //false // c7 open

// let board4 = new Board()
// board4.clearBoard()
// board4.putPiece(['c8'], King, 'black')
// board4.putPiece(['d4'], Queen, 'white')
// board4.putPiece(['e8', 'a7'], Rook, 'white')

// console.log(board4.isKingCheckMate('c8')); //false, but it is actually true


//====================================
// New approach : for each movement possible, create a new board and check if the kind is checked too.

let board2 = new Board()
board2.clearBoard()

board2.putPiece(['c8'], King, 'black')

board2.putPiece(['d4'], Queen, 'white')
board2.putPiece(['f4'], Bishop, 'white')
board2.putPiece(['h7', 'e8'], Rook, 'white')

// console.log(board2.isKingCheckMateV2('c8')); //true

let board3 = new Board()
board3.clearBoard()
board3.putPiece(['c8'], King, 'black')

board3.putPiece(['d4'], Queen, 'white')
board3.putPiece(['e4'], Bishop, 'white')
board3.putPiece(['e8'], Rook, 'white')

// console.log(board3.isKingCheckMateV2('c8')); //false // c7 open

let board4 = new Board()
board4.clearBoard()
board4.putPiece(['c8'], King, 'black')
board4.putPiece(['d4'], Queen, 'white')
board4.putPiece(['e8', 'a7'], Rook, 'white')

// console.log(board4.isKingCheckMateV2('c8')); //true

let board5 = new Board()
board5.clearBoard()
board5.putPiece(['d8'], King, 'black')
board5.putPiece(['c4'], Queen, 'white')
board5.putPiece(['e8', 'a7'], Rook, 'white')

// console.log(board5.isKingCheckMateV2('d8')); //false