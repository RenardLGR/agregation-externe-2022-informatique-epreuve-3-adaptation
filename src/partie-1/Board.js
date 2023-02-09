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
        this.isWhiteToPlay = true
    }

    showBoard(){ //gives back a matrix 
        return this.matrix.slice()
    }

    isCoordValid(coord){ //Check if a coord as a String is valid
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

    lineColSplitter(coord){ //split a String coord as an array [Number col, Number line], both 0-indexed
        if(this.isCoordValid(coord)){
            let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
            let col = letters.indexOf(coord[0])
            let line = Number(coord[1]) - 1 // a1 should be on col a but on line 0
            return [col, line]
        }else{
            throw new Error("Coord input invalid!")
        }
    }

    putPiece(squares, piece, color='black'){ // squares : Array of coord, piece : Object piece, color : String
        if( (color!=='black') && (color!=='white') ){
            throw new Error("Color input invalid!")
        }

        squares.forEach(square => {
            let [col, line] = this.lineColSplitter(square)
            this.matrix[line][col] = new piece(square, color)
        })
    }

    hasPiece(square){ // square : coord // return Bool
        let [col, line] = this.lineColSplitter(square)
        return this.matrix[line][col] !== undefined
    }

    getPiece(square){ // square : coord // return String || Object
        let [col, line] = this.lineColSplitter(square)
        return this.matrix[line][col] === undefined ? "None" : this.matrix[line][col]
    }

    movePiece(fromCoord, toCoord){ // 2 Strings // Void
        if(!this.isCoordValid(fromCoord) || !this.isCoordValid(toCoord)){
            throw new Error("Coord input invalid!")
        }


        if(!this.hasPiece(fromCoord)){
            throw new Error("movePiece failed, there is no piece to move from here!")
        }

        let piece = this.getPiece(fromCoord)

        if( (this.isWhiteToPlay && piece.color === 'black') || (!this.isWhiteToPlay && piece.color === 'white') ){
            let errMsg = `movePiece failed, you can only move a ${this.isWhiteToPlay ? 'white' : 'black'} piece!`
            throw new Error(errMsg)
        }

        let legalMoves = piece.legalMoves()

        if(!legalMoves.includes(toCoord)){
            throw new Error("movePiece failed, this movement is illegal!")
        }

        if(!this.isPathFree(fromCoord, toCoord)){
            throw new Error("movePiece failed, something is blocking!")
        }

        if(this.hasPiece(toCoord)){
            if(this.getPiece(fromCoord).color === this.getPiece(toCoord).color){
                throw new Error("movePiece failed, you can't take your own piece!")
            }else{
                console.log("A piece has been taken!");
                //TODO : piece has been taken, add point, add to cemetery, etc
            }
        }

        let [colTo, lineTo] = this.lineColSplitter(toCoord)

        this.matrix[lineTo][colTo] = piece //change coord in Board
        piece.newPos(toCoord) //change coord in Piece
        this.removePiece(fromCoord)

        this.isWhiteToPlay = !this.isWhiteToPlay
        console.log("Movement successful!");
    }

    isPathFree(fromCoord, toCoord){ // 2 Strings // Bool : check if a movement is free to do
        //if number is increasing => line is increasing (go up)
        //if letter is increasing => col in increasing (go right)
        //if number and letter are increasing => diagonal is increasing go up right
        //if number is increasing and letter is decreasing => diagonal is increasing go up left
        //decreasing => opposite
        
        let [colFrom, lineFrom] = this.lineColSplitter(fromCoord)
        let [colTo, lineTo] = this.lineColSplitter(toCoord)

        let isNumIncreasing = lineFrom < lineTo
        let isLetterIncreasing = colFrom < colTo

        if(isNumIncreasing && isLetterIncreasing){ //up right
            for(let lin=lineFrom+1, col=colFrom+1 ; lin<lineTo && col<colTo ; lin++, col++){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
        }

        if(isNumIncreasing && !isLetterIncreasing){ //up left
            for(let lin=lineFrom+1, col=colFrom-1 ; lin<lineTo && col>colTo ; lin++, col--){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
        }

        if(!isNumIncreasing && isLetterIncreasing){ //bottom right
            for(let lin=lineFrom-1, col=colFrom+1 ; lin>lineTo && col<colTo ; lin--, col++){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
        }

        if(isNumIncreasing && !isLetterIncreasing){ //bottom left
            for(let lin=lineFrom-1, col=colFrom-1 ; lin>lineTo && col>colTo ; lin--, col--){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
        }

        if(isNumIncreasing){ //up
            for(let lin=lineFrom+1 ; lin<lineTo ; lin++){
                if(this.matrix[lin][colTo] !== undefined){
                    return false
                }
            }
        }

        if(!isNumIncreasing){ //bottom
            for(let lin=lineFrom-1 ; lin>lineTo ; lin--){
                if(this.matrix[lin][colTo] !== undefined){
                    return false
                }
            }
        }

        if(isLetterIncreasing){ //right
            for(let col=colFrom+1 ; col<colTo ; col++){
                if(this.matrix[lineTo][col] !== undefined){
                    return false
                }
            }
        }

        if(!isLetterIncreasing){ //left
            for(let col=colFrom-1 ; col>colTo ; col--){
                if(this.matrix[lineTo][col] !== undefined){
                    return false
                }
            }
        }

        return true
    }

    removePiece(square){
        if(this.hasPiece(square)){
            let [col, line] = this.lineColSplitter(square)
            this.matrix[line][col] = undefined
        }else{
            throw new Error("There is no piece at this poistion");
        }
    }

    getPiecePosition(pieceStruct){ // constructor // return Array of coords of every positions of 1 Piece
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let res = []
        for(let line=0 ; line<8 ; line++){
            for(let col=0 ; col<8 ; col++){
                if(this.matrix[line][col] !== undefined){
                    let piece = this.matrix[line][col]
                    if(piece instanceof pieceStruct){
                        let letterTemp = letters[col]
                        let numTemp = line+1
                        res.push(''+letterTemp+numTemp)
                    }
                }
            }
        }

        return res
    }

    getQueenPositions(){ // return Array of coords
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
