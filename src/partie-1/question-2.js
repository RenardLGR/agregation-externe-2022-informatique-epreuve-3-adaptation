class Board{
    constructor(){
        this.board = {
            a: Array(8),
            b: Array(8),
            c: Array(8),
            d: Array(8),
            e: Array(8),
            f: Array(8),
            g: Array(8),
            h: Array(8),
        }

        this.matrix = Array(8)
        for(let i=0 ; i<8 ; i++){
            this.matrix[i] = Array(8).fill(undefined)
        }
    }

    showBoard(){
        let res = []
        for(let row in this.board){
            res.push(this.board[row])
        }
        return res
    }

    putQueen(coord){
        let line = coord[0]
        let col = Number(coord[1]) - 1 // a1 should be on line a but col 0
        this.board[line][col] = true
    }

    hasQueen(coord){
        let line = coord[0]
        let col = Number(coord[1]) - 1 // a1 should be on line a but col 0
        return this.board[line][col] === true
    }

    removeQueen(coord){
        if(this.hasQueen(coord)){
            let line = coord[0]
            let col = Number(coord[1]) - 1 // a1 should be on line a but col 0
            this.board[line][col] = undefined
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