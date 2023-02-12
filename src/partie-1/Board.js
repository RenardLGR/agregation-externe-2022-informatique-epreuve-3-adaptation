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

    clearBoard(){
        for(let lin=0 ; lin<8 ; lin++){
            for(let col=0 ; col<8 ; col++){
                this.matrix[lin][col] = undefined
            }
        }
    }

    getCoordAsString(line, col){ //Numbers //String
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        let letterTemp = letters[col]
        let numTemp = line+1
        return ''+letterTemp+numTemp
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
            throw new Error("Can't put piece, color input invalid!")
        }

        squares.forEach(square => {
            if(!this.isCoordValid(square)){
                throw new Error("Can't put piece, coord input invalid!")
            }

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

    canMovePiece(fromCoord, toCoord){ // 2 Strings // [Bool, String]
        //check if a piece could be move from fromCoord to toCoord, return an array with a Bool and the reason, for a castle attempt, see elsewhere
        if(!this.isCoordValid(fromCoord) || !this.isCoordValid(toCoord)){
            return [false, "Can't move, coord input invalid!"]
        }

        if(!this.hasPiece(fromCoord)){
            return [false, "Can't move, there is no piece to move from here!"]
        }

        let piece = this.getPiece(fromCoord)

        if( (this.isWhiteToPlay && piece.color === 'black') || (!this.isWhiteToPlay && piece.color === 'white') ){
            let errMsg = `Can't move, you can only move a ${this.isWhiteToPlay ? 'white' : 'black'} piece!`
            return [false, errMsg]
        }

        let legalMoves = piece.legalMoves()

        if(!legalMoves.includes(toCoord)){
            return [false, "Can't move, this movement is illegal!"]
        }

        if(!this.isPathFree(fromCoord, toCoord)){
            return [false, "Can't move, something is blocking!"]
        }

        if(this.getPiece(fromCoord).color === this.getPiece(toCoord).color){
            return [false, "Can't move, you can't move to your own piece!"]
        }

        return [true, "All good"]
    }

    movePiece(fromCoord, toCoord){ // 2 Strings // Void
        if( this.isMoveCastleAttempt(fromCoord, toCoord) ){
            console.log("Castle attempt");
            this.castle(fromCoord, toCoord)
            return
        }


        if( !(this.canMovePiece(fromCoord, toCoord)[0]) ){
            throw new Error(this.canMovePiece(fromCoord, toCoord)[1])
        }

        let piece = this.getPiece(fromCoord)

        if(this.hasPiece(toCoord)){
            console.log("A piece has been taken!");
            //TODO : piece has been taken, add point, add to cemetery, etc    
        }

        let [colTo, lineTo] = this.lineColSplitter(toCoord)

        this.matrix[lineTo][colTo] = piece //change coord in Board
        piece.newPos(toCoord) //change coord in Piece
        piece.hasMove = true //change hasMove status (usefull for Rooks and Kings)
        this.removePiece(fromCoord) //remove initial position

        this.isWhiteToPlay = !this.isWhiteToPlay
        console.log("Movement successful!");
    }

    forceMovePiece(fromCoord, toCoord){ // 2 Strings // Void
        //move a piece, doesn't check anything
        let piece = this.getPiece(fromCoord)

        let [colTo, lineTo] = this.lineColSplitter(toCoord)

        this.matrix[lineTo][colTo] = piece //change coord in Board
        piece.newPos(toCoord) //change coord in Piece
        piece.hasMove = true //change hasMove status (usefull for Rooks and Kings)
        this.removePiece(fromCoord) //remove initial position
    }

    isPathFree(fromCoord, toCoord){ // 2 Strings // Bool : check if a movement is free to do (if there is no piece between fromCoord and toCoord)
        //if number is increasing => line is increasing (go up)
        //if letter is increasing => col in increasing (go right)
        //if number and letter are increasing => diagonal is increasing go up right
        //if number is increasing and letter is decreasing => diagonal is increasing go up left
        //decreasing => opposite
        
        let [colFrom, lineFrom] = this.lineColSplitter(fromCoord)
        let [colTo, lineTo] = this.lineColSplitter(toCoord)

        let isNumIncreasing = lineFrom < lineTo
        let isLetterIncreasing = colFrom < colTo
        let isNumDecreasing = lineFrom > lineTo
        let isLetterDecreasing = colFrom > colTo

        if(isNumIncreasing && isLetterIncreasing){ //up right
            for(let lin=lineFrom+1, col=colFrom+1 ; lin<lineTo && col<colTo ; lin++, col++){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isNumIncreasing && isLetterDecreasing){ //up left
            for(let lin=lineFrom+1, col=colFrom-1 ; lin<lineTo && col>colTo ; lin++, col--){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isNumDecreasing && isLetterIncreasing){ //bottom right
            for(let lin=lineFrom-1, col=colFrom+1 ; lin>lineTo && col<colTo ; lin--, col++){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isNumDecreasing && isLetterDecreasing){ //bottom left
            for(let lin=lineFrom-1, col=colFrom-1 ; lin>lineTo && col>colTo ; lin--, col--){
                if(this.matrix[lin][col] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isNumIncreasing){ //up
            for(let lin=lineFrom+1 ; lin<lineTo ; lin++){
                if(this.matrix[lin][colTo] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isNumDecreasing){ //bottom
            for(let lin=lineFrom-1 ; lin>lineTo ; lin--){
                if(this.matrix[lin][colTo] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isLetterIncreasing){ //right
            for(let col=colFrom+1 ; col<colTo ; col++){
                if(this.matrix[lineTo][col] !== undefined){
                    return false
                }
            }
            return true
        }

        if(isLetterDecreasing){ //left
            for(let col=colFrom-1 ; col>colTo ; col--){
                if(this.matrix[lineTo][col] !== undefined){
                    return false
                }
            }
            return true
        }

        // return true
    }

    isMoveCastleAttempt(fromCoord, toCoord){
        //check if the move is a castle or a normal move, movePiece will act differently according to this result
        if(!this.isCoordValid(fromCoord) || !this.isCoordValid(toCoord)){
            return false
        }

        if(fromCoord[1] !== toCoord[1]){ //check same line
            return false
        }

        if((fromCoord!=='e1') && (fromCoord!=='e8')){ //check start
            return false
        }

        if((toCoord!=='c1') && (toCoord!=='g1') && (toCoord!=='c8') && (toCoord!=='g8')){ //check target
            return false
        }

        if(!this.hasPiece(fromCoord)){
            return false
        }

        let piece = this.getPiece(fromCoord)
        if(piece.name!=="King"){
            return false
        }

        return true
    }

    castle(fromCoord, toCoord){ // 2 Strings // Void
        let king = this.getPiece(fromCoord)

        if( (this.isWhiteToPlay && king.color === 'black') || (!this.isWhiteToPlay && king.color === 'white') ){
            let errMsg = `Castle failed, you can only move a ${this.isWhiteToPlay ? 'white' : 'black'} King!`
            throw new Error(errMsg)
        }

        if(king.hasMove){
            throw new Error("Castle failed, King has already moved")
        }

        if(this.isKingChecked(fromCoord)){
            throw new Error("Castle failed, King is checked")
        }

        if(!this.isCastleTransitSecured(fromCoord, toCoord)){
            throw new Error("Castle failed, transit or Rook is not secured")
        }

        let isLeftCastle = (toCoord[0] === 'c')

        if(isLeftCastle){ //left castle
            if(!this.hasPiece('a'+fromCoord[1])){
                throw new Error("Castle failed, there is no rook here!")
            }
            let rook = this.getPiece('a'+fromCoord[1])
            if(rook.hasMove){
                throw new Error("Castle failed, Rook has already moved")
            }

            if( this.hasPiece('b'+fromCoord[1]) || this.hasPiece('c'+fromCoord[1]) || this.hasPiece('d'+fromCoord[1]) ){
                throw new Error("Castle failed, something is blocking!")
            }

            //King movements:
            let [colTo, lineTo] = this.lineColSplitter(toCoord) //king coords

            this.matrix[lineTo][colTo] = king //change King coord in Board
            king.newPos(toCoord) //change coord in Piece
            king.hasMove = true //change hasMove status (usefull for Rooks and Kings)
            this.removePiece(fromCoord) //remove King initial position
    
            //Rook movements:
            let [colToRook, lineToRook] = this.lineColSplitter('d'+fromCoord[1])
            this.matrix[lineToRook][colToRook] = rook //change Rook coord in Board
            rook.newPos(toCoord) //change coord in Piece
            rook.hasMove = true //change hasMove status (usefull for Rooks and Kings)
            this.removePiece('a'+fromCoord[1]) //remove Rook initial position


            this.isWhiteToPlay = !this.isWhiteToPlay
            console.log("Castle successful!");

        }else{ //right castle
            if(!this.hasPiece('h'+fromCoord[1])){
                throw new Error("Castle failed, there is no rook here!")
            }
            let rook = this.getPiece('h'+fromCoord[1])
            if(rook.hasMove){
                throw new Error("Castle failed, Rook has already moved")
            }

            if( this.hasPiece('f'+fromCoord[1]) || this.hasPiece('g'+fromCoord[1]) ){
                throw new Error("Castle failed, something is blocking!")
            }

            //King movements:
            let [colTo, lineTo] = this.lineColSplitter(toCoord) //king coords

            this.matrix[lineTo][colTo] = king //change King coord in Board
            king.newPos(toCoord) //change coord in Piece
            king.hasMove = true //change hasMove status (usefull for Rooks and Kings)
            this.removePiece(fromCoord) //remove King initial position
    
            //Rook movements:
            let [colToRook, lineToRook] = this.lineColSplitter('f'+fromCoord[1])
            this.matrix[lineToRook][colToRook] = rook //change Rook coord in Board
            rook.newPos('f'+fromCoord[1]) //change coord in Piece
            rook.hasMove = true //change hasMove status (usefull for Rooks and Kings)
            this.removePiece('h'+fromCoord[1]) //remove Rook initial position

            
            this.isWhiteToPlay = !this.isWhiteToPlay
            console.log("Castle successful!");

        }
    }

    isKingChecked(kingPos){ //String // Bool
        //A king is checked if there is a free path from any opposing piece to the king
        if(!this.hasPiece(kingPos)){
            throw new Error("isKingChecked failed, there is no piece here!")
        }

        let piece = this.getPiece(kingPos)
        if(piece.name!=="King"){
            throw new Error("isKingChecked failed, selected piece is not a king!")
        }


        let isKingWhite = piece.color === "white"
        
        //check if there is any free path from any opposing piece to the king
        for(let lin=0 ; lin<8 ; lin++){
            for(let col=0 ; col<8 ; col++){
                if(this.matrix[lin][col] !== undefined){
                    if(this.matrix[lin][col].color === (isKingWhite ? 'black' : 'white') ){
                        let coord = this.getCoordAsString(lin, col)
                        if(this.canIGoToThere(coord, kingPos)[0]){
                            return true
                        }
                    }
                }
            }
        }

        return false
    }

    isKingCheckMate(kingPos){
        //! DOES NOT GIVE THE RESULT HOPED FOR
        //Idea was good, but it doesn't work
        if(!this.isCoordValid(kingPos)){
            throw new Error("isKingCheckMate failed, input invalid!")
        }

        if(!this.hasPiece(kingPos)){
            throw new Error("isKingCheckMate failed, there is no piece here!")
        }

        let king = this.getPiece(kingPos)
        if(king.name!=="King"){
            throw new Error("isKingCheckMate failed, selected piece is not a king!")
        }

        if(!this.isKingChecked(kingPos)){
            return false
        }

        let legalMoves = king.legalMoves()

        let possibleMoves = legalMoves.filter(sqr => {
            if(this.hasPiece(sqr)){
                return (sqr.color !== king.color)
            }else{
                return true
            }
        }).filter(sqr => this.canIGoToThere(kingPos, sqr))

        let opposingColor = (king.color === 'white') ? 'black' : 'white'

        //check if every possible moves sqares is defended by the opposite color - this doesn't conclude if the king is check mate
        return possibleMoves.every(sqr => this.isSquareDefended(sqr, opposingColor))
    }

    isKingCheckMateV2(kingPos){
        if(!this.isCoordValid(kingPos)){
            throw new Error("isKingCheckMate failed, input invalid!")
        }

        if(!this.hasPiece(kingPos)){
            throw new Error("isKingCheckMate failed, there is no piece here!")
        }

        let king = this.getPiece(kingPos)
        if(king.name!=="King"){
            throw new Error("isKingCheckMate failed, selected piece is not a king!")
        }

        if(!this.isKingChecked(kingPos)){
            return false
        }

        let legalMoves = king.legalMoves()

        let possibleMoves = legalMoves.filter(sqr => {
            if(this.hasPiece(sqr)){
                return (sqr.color !== king.color)
            }else{
                return true
            }
        }).filter(sqr => this.canIGoToThere(kingPos, sqr))


        let res = true
        possibleMoves.forEach(sqr => {
            let prevPiece = this.hasPiece(sqr) ? this.hasPiece(sqr) : undefined
            let [colPrevPiece, linePrevPiece] = this.lineColSplitter(sqr)
            //test new pos
            this.forceMovePiece(kingPos, sqr)
            //console.log(this.showBoard(), this.isKingChecked(sqr), sqr)
            if(!this.isKingChecked(sqr)){
                res = false
            }
            //backtrack
            this.forceMovePiece(sqr, kingPos)
            this.matrix[linePrevPiece][colPrevPiece] = prevPiece
        })
        return res
    }

    canIGoToThere(fromCoord, targetCoord){ // 2 Strings // [Bool, String]
        //check if a piece could be move from fromCoord to targetCoord, return an array with a Bool and the reason
        //Similar to canMovePiece(fromCoord, toCoord) but with fewer checks, usefull for checking if a position is defended
        if(!this.isCoordValid(fromCoord) || !this.isCoordValid(targetCoord)){
            return [false, "Can't move, coord input invalid!"]
        }

        if(!this.hasPiece(fromCoord)){
            return [false, "Can't move, there is no piece to move from here!"]
        }

        let piece = this.getPiece(fromCoord)

        let legalMoves = piece.legalMoves()

        if(!legalMoves.includes(targetCoord)){
            return [false, "Can't move, this movement is illegal!"]
        }

        if(!this.isPathFree(fromCoord, targetCoord)){
            return [false, "Can't move, something is blocking!"]
        }

        return [true, "Path is clear!"]
    }

    isSquareDefended(square, color){ // 2 Strings // Bool
        //Check is a square, empty or occupied is defended by a color
        let isOccupied = this.hasPiece(square)

        if(isOccupied){
            let piece = this.getPiece(square)
            if(piece.color !== color){
                let errMsg = `isSquareDefended failed, can't check if a ${piece.color} piece is defended by ${color}!`
                throw new Error(errMsg)
            }

            //check if there is a free path from any own piece to the target pos
            for(let lin=0 ; lin<8 ; lin++){
                for(let col=0 ; col<8 ; col++){
                    if(this.matrix[lin][col] !== undefined){
                        if(this.matrix[lin][col].color === piece.color){
                            let coord = this.getCoordAsString(lin, col)
                            if(this.canIGoToThere(coord, square)[0]){
                                return true
                            }
                        }
                    }
                }
            }

        }else{
            //check if there is a free path from any own piece to the target pos
            for(let lin=0 ; lin<8 ; lin++){
                for(let col=0 ; col<8 ; col++){
                    if(this.matrix[lin][col] !== undefined){
                        if(this.matrix[lin][col].color === color){
                            let coord = this.getCoordAsString(lin, col)
                            // console.log(coord, square, this.canIGoToThere(coord, square));
                            if(this.canIGoToThere(coord, square)[0]){
                                console.log('the possible path is:', coord, square);
                                return true
                            }
                        }
                    }
                }
            }
        }

        return false
    }

    isCastleTransitSecured(fromCoord, toCoord){ //2 Strings // Bool
        //check if the empty spots between the King and the Rook, aswell as the Rook are secured for a castle to happen
        //this function could use refactoring as it is not DRY and it is basically isKingChecked() but for every transit square and Rook
        let isLeftCastle = (toCoord[0] === 'c')
        let isBottomCastle = (toCoord[1] === '1')
        let castleColor = this.getPiece(fromCoord).color
        let res = true

        if(isLeftCastle && isBottomCastle){ //left bottom castle
            ['a1','b1','c1','d1'].forEach(sqr => {
                for(let lin=0 ; lin<8 ; lin++){
                    for(let col=0 ; col<8 ; col++){
                        if(this.matrix[lin][col] !== undefined){
                            if(this.matrix[lin][col].color !== castleColor ){
                                let coord = this.getCoordAsString(lin, col)
                                if(this.canIGoToThere(coord, sqr)[0]){
                                    res = false
                                }
                            }
                        }
                    }
                }
            })
        }

        if(!isLeftCastle && isBottomCastle){ //right bottom castle
            ['f1','g1','h1'].forEach(sqr => {
                for(let lin=0 ; lin<8 ; lin++){
                    for(let col=0 ; col<8 ; col++){
                        if(this.matrix[lin][col] !== undefined){
                            if(this.matrix[lin][col].color !== castleColor ){
                                let coord = this.getCoordAsString(lin, col)
                                if(this.canIGoToThere(coord, sqr)[0]){
                                    res = false
                                }
                            }
                        }
                    }
                }
            })
        }
        
        if(isLeftCastle && !isBottomCastle){ //left top castle
            ['a8','b8','c8','d8'].forEach(sqr => {
                for(let lin=0 ; lin<8 ; lin++){
                    for(let col=0 ; col<8 ; col++){
                        if(this.matrix[lin][col] !== undefined){
                            if(this.matrix[lin][col].color !== castleColor ){
                                let coord = this.getCoordAsString(lin, col)
                                if(this.canIGoToThere(coord, sqr)[0]){
                                    res = false
                                }
                            }
                        }
                    }
                }
            })
        }

        if(!isLeftCastle && !isBottomCastle){ //right top castle
            ['f8','g8', 'h8'].forEach(sqr => {
                for(let lin=0 ; lin<8 ; lin++){
                    for(let col=0 ; col<8 ; col++){
                        if(this.matrix[lin][col] !== undefined){
                            if(this.matrix[lin][col].color !== castleColor ){
                                let coord = this.getCoordAsString(lin, col)
                                if(this.canIGoToThere(coord, sqr)[0]){
                                    res = false
                                }
                            }
                        }
                    }
                }
            })
        }


        return res
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
