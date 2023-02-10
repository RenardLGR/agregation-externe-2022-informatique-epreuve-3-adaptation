// Question 19. Illustrer les 4 premiers coups échangés entre deux joueurs (2 coups chacun) à l'aide d'un diagramme décrivant la séquence des échanges de messages entre les objets de l'application. L'objectif est d'illustrer graphiquement combien d’objets participent à ces échanges, comment ces objets sont créés et reliés entre eux, et dans quel ordre se font les échanges. Votre diagramme devra alors faire apparaître graphiquement : tous les objets impliqués, tous les messages échangés, et l'ordre de ces messages.

//Coup 1 :
//Reine blanche en d1 prend d8
// game.movePiece('d1', 'd8') communique board.movePiece('d1', 'd8') qui fait des vérifications et du traitement avec lui même ainsi qu'avec Reine du départ. Board fait les changements de position nécessaires et communique à Reine du départ son nouveau positionnement. Reine.pos('d8')
// Game fait maintenant les changements de statut précisés en question 18

//Coup 2 :
//Roi noir prend d8
// game.movePiece('e8', 'd8') communique board.movePiece('e8', 'd8') qui fait des vérifications et du traitement avec lui même ainsi qu'avec Roi du départ. Board fait les changements de position nécessaires et communique à Roi du départ son nouveau positionnement. Roi.pos('d8')
// Game fait maintenant les changements de statut précisés en question 18

//Coup 3 :
//Fou blanc se déplace en h6
// game.movePiece('c1', 'h6') communique board.movePiece('c1', 'h6') qui fait des vérifications et du traitement avec lui même ainsi qu'avec Fou du départ. Board fait les changements de position nécessaires et communique à Fou du départ son nouveau positionnement. Fou.pos('h6')
// Game fait maintenant les changements de statut précisés en question 18

//Coup 4 :
//Tour noir prend h6
// game.movePiece('h8', 'h6') communique board.movePiece('h8', 'h6') qui fait des vérifications et du traitement avec lui même ainsi qu'avec Tour du départ. Board fait les changements de position nécessaires et communique à Tour du départ son nouveau positionnement. Tour.pos('h6')
// Game fait maintenant les changements de statut précisés en question 18

import Game from "../Game.js";

let game = new Game()
console.log(game.showBoard())

game.movePiece('d1', 'd8')
console.log(game.showBoard())
game.movePiece('e8', 'd8')
console.log(game.showBoard())
game.movePiece('c1', 'h6')
console.log(game.showBoard())
game.movePiece('h8', 'h6')
console.log(game.showBoard())

game.movePiece('h1', 'a8') //movePiece failed, this movement is illegal!