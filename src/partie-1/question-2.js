class Board{
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

    putQueen(square){
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let col = letters.indexOf(square[0])
        let line = Number(square[1]) - 1 // a1 should be on col a but on line 0
        this.matrix[line][col] = 'queen'
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
}


let board = new Board()
board.putQueen('a1')
// console.log(board.showBoard());
console.log(board.hasQueen('a1'))
board.removeQueen('a1')
// console.log(board.showBoard());
console.log(board.hasQueen('a1'))