import Board from "./Board.js";
import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";

export default class Game{
    constructor(){
        this.board = new Board()
        this.putStandardPosition()
        this.isWhiteToPlay = true
        this.turn = 1
    }

    putStandardPosition(){
        this.board.putPiece(['c1', 'f1'], Bishop, 'white')
        this.board.putPiece(['a1', 'h1'], Rook, 'white')
        this.board.putPiece(['e1'], King, 'white')
        this.board.putPiece(['d1'], Queen, 'white')

        this.board.putPiece(['c8', 'f8'], Bishop, 'black')
        this.board.putPiece(['a8', 'h8'], Rook, 'black')
        this.board.putPiece(['e8'], King, 'black')
        this.board.putPiece(['d8'], Queen, 'black')
    }

    showBoard(){
        return this.board.showBoard()
    }

    clearBoard(){
        this.board.clearBoard()
    }

    movePiece(fromCoord, toCoord){
        try {
            this.board.movePiece(fromCoord, toCoord)
            this.isWhiteToPlay = !this.isWhiteToPlay
            this.turn++
        } catch (error) {
            console.log(error);
        }
    }
}
