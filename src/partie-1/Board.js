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
        return this.matrix.slice()
    }

    isCoordValid(coord){
        if(typeof coord !== 'string'){
            return false
        }
        if(coord.length !== 2){
            return false
        }
        let nums = '12345678'
        let letters = 'abcdefgh'
        if(!letters.includes(coord[0]) || !nums.includes(coord[1])){
            return false
        }

        return true
    }

    lineColSplitter(coord){
        if(this.isCoordValid(coord)){
            let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
            let col = letters.indexOf(coord[0])
            let line = Number(coord[1]) - 1 // a1 should be on col a but on line 0
            return [col, line]
        }else{
            throw new Error("Coord input invalid")
        }
    }

    putPiece(squares, piece){ // squares : Array of coord, piece : Object piece
        squares.forEach(square => {
            let [col, line] = this.lineColSplitter(square)
            this.matrix[line][col] = new piece(square)
        })
    }

    hasPiece(square){ // square : coord // return Bool
        let [col, line] = this.lineColSplitter(square)
        return this.matrix[line][col] !== undefined
    }

    getPiece(square){ // square : coord // return String
        let [col, line] = this.lineColSplitter(square)
        return this.matrix[line][col] === undefined ? "None" : this.matrix[line][col]
    }

    removePiece(square){
        if(this.hasPiece(square)){
            let [col, line] = this.lineColSplitter(square)
            this.matrix[line][col] = undefined
        }else{
            console.log("There is no piece at this poistion");
        }
    }

    getQueenPosition(){ // return Array of coords
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let res = []
        for(let line=0 ; line<8 ; line++){
            for(let col=0 ; col<8 ; col++){
                if(this.matrix[line][col] !== undefined && this.matrix[line][col].name === 'Queen'){
                    let letterTemp = letters[col]
                    let numTemp = line+1
                    res.push(''+letterTemp+numTemp)
                }
            }
        }

        return res
    }
}
