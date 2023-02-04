import checkSolution8queens from "./question-4.js"

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

    putQueen(...squares){
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        squares.forEach(square => {
            let col = letters.indexOf(square[0])
            let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
            this.matrix[line][col] = 'queen'
        })
    }

    hasQueen(square){
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let col = letters.indexOf(square[0])
        let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
        return this.matrix[line][col] === 'queen'
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
                if(this.matrix[line][col] === 'queen'){
                    let letterTemp = letters[col]
                    let numTemp = line+1
                    res.push(''+letterTemp+numTemp)
                }
            }
        }

        return res
    }
}


// let board = new Board()
// console.log(board);
// board.putQueen('a1')
// console.log(board.showBoard());
// console.log(board.hasQueen('a1'))
// board.removeQueen('a1')
// console.log(board.showBoard());
// console.log(board.hasQueen('a1'))

let board2 = new Board()
board2.putQueen('a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5') // solution de 8 queens puzzle
console.log(board2.getQueenPosition());
console.log(checkSolution8queens(board2)); // true

let board3 = new Board()
board3.putQueen('a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'g8') // pas une solution de 8 queens puzzle
console.log(board3.getQueenPosition());
console.log(checkSolution8queens(board3)); // false