import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";
import Problem8Queens from "../Problem8Queens.js";


// let board1 = new Board()
// board1.putPiece(['a1'], Queen)
// board1.putPiece(['b3'], Queen)
// let problem = new Problem8Queens()
// problem.proposeSolution(board1)
// console.log(problem.statistiques()) // 1 solution(s), 0 valide(s)

// let board2 = new Board()
// board2.putPiece(['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5'], Queen) // solution de 8 queens puzzle
// board2.putPiece(['b3'], Rook)
// console.log(board2.getQueenPositions()); // ['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5']
// console.log(board2.getPiecePosition(Queen)); // ['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5'] // same
// console.log(board2.getPiecePosition(Rook)); // [ 'b3' ]
// problem.proposeSolution(board2)
// console.log(problem.statistiques()) // 2 solution(s), 1 valide(s)

// let board3 = new Board()
// board3.putPiece(['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'g8'], Queen) // pas une solution de 8 queens puzzle
// console.log(board3.getQueenPositions());
// problem.proposeSolution(board3)
// console.log(problem.statistiques()) // 3 solution(s), 1 valide(s)


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

console.log(problem4Rooks4Queens.checkSolution(board1)); // True


let board2 = new Board()
board2.putPiece(['a2', 'b4', 'c6', 'd8'], Queen)
board2.putPiece(['e3', 'f1', 'g7', 'h6'], Rook)
//This is not a valid solution

console.log(problem4Rooks4Queens.checkSolution(board2)); // False