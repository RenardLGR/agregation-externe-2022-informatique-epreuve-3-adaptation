import Queen from "./Queen.js";

export default class Rook extends Queen{
    constructor(pos, color){
        super(pos, color)
        this.name = 'Rook'
    }

    legalMoves() {
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    
        let coordCol = this.pos[0]
        let coordLine = Number(this.pos[1])
    
        let col = Array.from({ length: 8 }, (_, i) => i + 1).filter(el => el !== coordLine).map(el => coordCol + el)
        let line = letters.filter(letter => letter !== coordCol).map(el => el + coordLine)
    
        return line.concat(col)
    }
}


let rook1 = new Rook('b3')
let rook2 = new Rook('a6')
// console.log(rook1.logPos());
// console.log(rook1.legalMoves());
// console.log(rook2.legalMoves());