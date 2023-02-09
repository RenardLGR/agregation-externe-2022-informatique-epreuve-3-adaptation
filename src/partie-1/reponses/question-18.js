// Question 18. Proposer une conception générale de la classe Game permettant aux joueurs de déplacer les pièces jusqu'au mat. Certaines particularités du jeu d'échecs (prise en passant, pat, fin de partie, etc.) non décrites dans l'extrait (cf figure 2, page 4) ne doivent pas être considérées ici. On ne détectera donc pas le mat. Donner les signatures des méthodes que vous jugez nécessaires (pas le code) pour que les joueurs puissent jouer une partie. Préciser par du texte les propriétés de cette classe (sans donner le code de la méthode __init__).

function movePiece(fromCoord, toCoord){
    try {
        this.board.movePiece(fromCoord, toCoord)
        this.isWhiteToPlay = !this.isWhiteToPlay
    } catch (error) {
        console.log(error);
    }
}

// Il serait aussi intéressant que Game s'ossupe du chrono des différents joueurs, des points marqués, du cimetière de pièces, de la possibilité du roque, de la possibilité d'abandonner, de rejouer, etc.