import Queen from "./Queen.js";

export default class Bishop extends Queen{
    constructor(pos){
        super(pos)
        this.name = 'Bishop'
    }

    legalMoves() {
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    
        let coordCol = this.pos[0]
        let coordLine = Number(this.pos[1])
    
        let diag1 = []
        for (let i = letters.indexOf(coordCol) + 1, j = coordLine + 1; i < 8 && j <= 8; i++, j++) { //goes top right
            diag1.push(letters[i] + j)
        }
        for (let i = letters.indexOf(coordCol) - 1, j = coordLine - 1; i >= 0 && j > 0; i--, j--) { //goes bottom left
            diag1.push(letters[i] + j)
        }
    
        let diag2 = []
        for (let i = letters.indexOf(coordCol) - 1, j = coordLine + 1; i >= 0 && j <= 8; i--, j++) { //goes top left
            diag2.push(letters[i] + j)
        }
        for (let i = letters.indexOf(coordCol) + 1, j = coordLine - 1; i < 8 && j > 0; i++, j--) { //goes bottom right
            diag2.push(letters[i] + j)
        }
    
        return diag1.concat(diag2)
    }
}


let bishop1 = new Bishop('b3')
let bishop2 = new Bishop('a6')
// console.log(bishop1.logPos());
// console.log(bishop1.legalMoves());
// console.log(bishop2.legalMoves());