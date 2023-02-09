//Le board comprend maintenant initialisé avec une key isWhiteToPlay = true

//Deux méthodes ont été ajoutées :
//isPathFree(fromCoord, toCoord){} => Bool qui parcourt le chemin et vérifie qu'il n'y ait pas de pièce au travers.
//movePiece(fromCoord, toCoord){} => Void qui fait les vérification nécessaires au déplacement et l'effectue.

//putPiece(squares, piece, color='black'){} => Void prend mainetanat une couleur en argument defaulté à 'black'


import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";


let board1 = new Board()
board1.putPiece(['d1'], Queen, 'white')
board1.putPiece(['c1'], King, 'white')
board1.putPiece(['e1'], Bishop, 'white')
board1.putPiece(['d2'], Rook, 'white')

board1.putPiece(['d8'], Queen, 'black')
board1.putPiece(['e8'], King, 'black')
board1.putPiece(['c8'], Bishop, 'black')
board1.putPiece(['d7'], Rook, 'black')

// console.log(board1.showBoard());

// board1.movePiece('d1', 'd0') // Coord input invalid!
// board1.movePiece('d1', 'd2') // movePiece failed, you can't take your own piece!
// board1.movePiece('d1', 'h6') // movePiece failed, this movement is illegal!
// board1.movePiece('d1', 'd6') // movePiece failed, something is blocking!
// board1.movePiece('d1', 'd8') // movePiece failed, something is blocking!
board1.movePiece('d1', 'h5') // Movement successful!
// board1.movePiece('d2', 'd7') // movePiece failed, you can only move a black piece!
// board1.movePiece('d7', 'd7') // movePiece failed, this movement is illegal!
board1.movePiece('d7', 'd2') // A piece has been taken! // Movement successful!

// console.log(board1.showBoard());