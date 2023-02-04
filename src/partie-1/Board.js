import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";

export default class Board{
    constructor(){
        this.matrix = Array(8)
        for(let i=0 ; i<8 ; i++){
            this.matrix[i] = Array(8).fill(undefined)
        }
        // this.matrix[0][0] <==> a1 is bottom left 
    }

    showBoard(){ //gives back a matrix 
        return this.matrix
    }

    putPiece(squares, piece){ // squares : Array of coord, piece : Object piece
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        squares.forEach(square => {
            let col = letters.indexOf(square[0])
            let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
            this.matrix[line][col] = new piece(square)
        })
    }

    hasPiece(square){ // square : coord // return Bool
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let col = letters.indexOf(square[0])
        let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
        return this.matrix[line][col] !== undefined
    }

    getPiece(square){ // square : coord // return String
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let col = letters.indexOf(square[0])
        let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
        return this.matrix[line][col] === undefined ? "None" : this.matrix[line][col]
    }

    removeQueen(square){
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        if(this.hasQueen(square)){
            let col = letters.indexOf(square[0])
            let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
            this.matrix[line][col] = undefined
        }else{
            console.log("There is no queen at this poistion");
        }
    }

    getQueenPosition(){
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let res = []
        for(let line=0 ; line<8 ; line++){
            for(let col=0 ; col<8 ; col++){
                if(this.matrix[line][col].name === 'Queen'){
                    let letterTemp = letters[col]
                    let numTemp = line+1
                    res.push(''+letterTemp+numTemp)
                }
            }
        }

        return res
    }
}

let board1 = new Board() 
board1.putPiece(['a1'], Queen) 
board1.putPiece(['b3'], Rook)
console.log(board1.hasPiece('a2')) // False 
let queen = board1.getPiece('a1') // Queen
let rook1 = board1.getPiece('b3') // Rook

console.log(queen);
console.log(rook1);