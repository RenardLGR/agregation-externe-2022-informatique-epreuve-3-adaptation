import Queen from "./Queen.js";

export default class King extends Queen{
    constructor(pos){
        super(pos)
        this.name = 'King'
    }

    legalMoves() {
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    
        let coordCol = this.pos[0]
        let coordLine = Number(this.pos[1])
    
        let col = Array.from({ length: 8 }, (_, i) => i + 1).filter(el => (el === coordLine+1) || (el === coordLine-1) ).map(el => coordCol + el)
        let line = letters.filter(letter => (letter === letters[letters.indexOf(coordCol)-1]) || (letter === letters[letters.indexOf(coordCol)+1]) ).map(el => el + coordLine)
    
        let diag1 = []
        if(letters.indexOf(coordCol)<7 && coordLine<8){ //top right
            let letter = letters[letters.indexOf(coordCol) + 1]
            let num = coordLine+1
            diag1.push(letter + num)
        } 
        if(letters.indexOf(coordCol)>0 && coordLine>1){ //bottom left
            let letter = letters[letters.indexOf(coordCol) - 1]
            let num = coordLine-1
            diag1.push(letter + num)
        } 
    
        let diag2 = []
        if(letters.indexOf(coordCol)>0 && coordLine<8){ //top left
            let letter = letters[letters.indexOf(coordCol) - 1]
            let num = coordLine+1
            diag2.push(letter + num)
        } 
        if(letters.indexOf(coordCol)<7 && coordLine>1){ //bottom right
            let letter = letters[letters.indexOf(coordCol) + 1]
            let num = coordLine-1
            diag2.push(letter + num)
        } 
    
        return line.concat(col).concat(diag1).concat(diag2)
    }
}


let king1 = new King('b3')
let king2 = new King('a6')
// console.log(king1.logPos());
// console.log(king1.legalMoves());
// console.log(king2.legalMoves());