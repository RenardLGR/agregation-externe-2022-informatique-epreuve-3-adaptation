import Board from "./Board.js";
import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";

class ProblemFactory{
    constructor(arrayPieces){ //[ [Rook, 4] , [Queen, 4] ]
        this.arrayPieces = arrayPieces
    }


    checkSolution(board) {
        //TODO : check if the board has the same and only the same pieces than constructor

        let piecesPositions = [] //Array of pieces pos
        this.arrayPieces.forEach(piece => {
            let structor = piece[0]
            piecesPositions = piecesPositions.concat(board.getPiecePosition(structor))
        })


        //to return true, no legal moves of every pieces should have a piecesPositions in them
        for (let i = 0; i < piecesPositions.length; i++) {
            let pos = piecesPositions[i]
            let piece = board.getPiece(pos) //grab the structor
            let pieceMoves = piece.legalMoves(pos)
            for (let j = 0; j < pieceMoves.length; j++) {
                if (piecesPositions.includes(pieceMoves[j])) {
                    return false
                }
            }
        }
        return true
    }
}

let problem4Rooks4Queens = new ProblemFactory([ [Rook, 4] , [Queen, 4] ])
let board1 = new Board()
board1.putPiece(['a2', 'b4', 'c6', 'd8'], Queen)
board1.putPiece(['e3', 'f1', 'g7', 'h5'], Rook)
//This is a valid solution

// console.log(problem4Rooks4Queens.checkSolution(board1)); // True


let board2 = new Board()
board2.putPiece(['a2', 'b4', 'c6', 'd8'], Queen)
board2.putPiece(['e3', 'f1', 'g7', 'h6'], Rook)
//This is not a valid solution

// console.log(problem4Rooks4Queens.checkSolution(board2)); // False