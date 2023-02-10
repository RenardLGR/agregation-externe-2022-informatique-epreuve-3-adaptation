// Question 20. Implémenter une fonction en Python qui implémente le mouvement du roque en vérifiant préalablement si le roque est possible. On fera l'hypothèse que le joueur indiquera la case de départ du roi et la case d'arrivée (le déplacement de la tour étant déduit). Expliquer comment vous avez organisé votre code notamment pour vérifier la possibilité du roque.


//Ajout de hasMove dans le constructeur de Queen fixé par défaut à False, mis à jour à True dès que movePiece est fait ou qu'un roque est effectué

// Ajout de isKingChecked(kingPos) qui vérifie que le roi qui essaye de roque n'est pas en échec : Chaque pièce de la couleur opposée ayant accès au roi entraînera is mise en échec.

//Ajout de isMoveCastleAttempt(fromCoord, toCoord) qui oriente movePiece(fromCoord, toCoord) vers un mouvement normal ou un mouvement de type roque.
//Regarde les coordonnées de départ et d'arrivée tentées.

//Ajout de castle(fromCoord, toCoord) qui fait les vérifications et effectue le mouvement.


import Game from "../Game.js";
import Rook from "../Rook.js";


let game = new Game()
// console.log(game.showBoard())

game.movePiece('f1', 'b5') //white move
// console.log(game.showBoard())
game.movePiece('c8', 'a6') //black move
// console.log(game.showBoard())
// game.board.removePiece('h8')
// game.board.putPiece(['g8'], Rook, 'black')
game.movePiece('e1', 'g1') //castle white
// console.log(game.showBoard())
game.movePiece('d8', 'd7') //black move
// console.log(game.showBoard())


// MULTIPLE SCENARI : WHITE TO PLAY
// game.movePiece('f1', 'f8') //white move
// console.log(game.showBoard())
// game.movePiece('e8', 'c8') //black castle attempt, King is checked
// ____________
// game.movePiece('f1', 'f7') //white move
// game.movePiece('e8', 'g8') //black castle attempt, something is blocking
// ____________
// game.movePiece('f1', 'f7') //white move
// game.movePiece('f8', 'g7') //black move
// game.movePiece('f7', 'f6') //white move
// game.movePiece('e8', 'e7') //black move
// game.movePiece('f6', 'f7') //white move
// game.movePiece('e7', 'e8') //black move
// game.movePiece('f7', 'f6') //white move
// console.log(game.showBoard())
// game.movePiece('e8', 'c8') //black castle attempt, King has already moved
// ____________
//trying to castle a wrong color king tried also
// ____________
//trying to castle when transit or path is not secured tried also