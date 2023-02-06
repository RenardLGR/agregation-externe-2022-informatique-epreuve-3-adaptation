export default class Problem8Queens {
    constructor() {
        this.proposedSolution = []
    }

    checkSolution8queens(board) {
        let queenPositions = board.getQueenPositions() //Array of queen pos
        // return this.checkSolution8queensWithCoords(queenPositions)
        if(queenPositions.length !== 8) {
            console.log("Invalid number of queens");
            return false
        }else{
            //to return true, no legal moves of every queens should have a queenPos in them
            for (let i = 0; i < queenPositions.length; i++) {
                let pos = queenPositions[i]
                let queenMoves = this.queenLegalMoves(pos)
                for (let j = 0; j < queenMoves.length; j++) {
                    if (queenPositions.includes(queenMoves[j])) {
                        return false
                    }
                }
            }
            return true
        }
    }

    checkSolution8queensWithCoords(coords){
        //Same than above but takes coords instead of a board
        let queenPositions = coords
        if(queenPositions.length !== 8) {
            console.log("Invalid number of queens");
            return false
        }else{
            //to return true, no legal moves of every queens should have a queenPos in them
            for (let i = 0; i < queenPositions.length; i++) {
                let pos = queenPositions[i]
                let queenMoves = this.queenLegalMoves(pos)
                for (let j = 0; j < queenMoves.length; j++) {
                    if (queenPositions.includes(queenMoves[j])) {
                        return false
                    }
                }
            }
            return true
        }
    }

    proposeSolution(board) { // Keep track of the solutions proposed
        let matrix = board.showBoard()
        let checkRes = this.checkSolution8queens(board)
        let sol = []
        if(checkRes){
            sol = [true, matrix]
        }else{
            sol = [false, matrix]
        }
        this.proposedSolution.push(sol)
    }

    statistiques() {
        // stats = [totalSol, validSol]
        let stats = this.proposedSolution.reduce((acc, subArr) => {
            if(subArr[0]){
                acc[0]++
                acc[1]++
            }else{
                acc[0]++
            }
            return acc
        }, [0, 0])

        return `${stats[0]} solution(s), ${stats[1]} valide(s)`
    }

    queenLegalMoves(square) { // return Array of legal moves from a pos
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        let coordCol = square[0]
        let coordLine = Number(square[1])

        // let line = Array.from(Array(9).keys()).filter(el => el !== 0 && el !== coordCol)
        let col = Array.from({ length: 8 }, (_, i) => i + 1).filter(el => el !== coordLine).map(el => coordCol + el)
        let line = letters.filter(letter => letter !== coordCol).map(el => el + coordLine)

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

        return line.concat(col).concat(diag1).concat(diag2)
    }

    everySolutions() { //this is based on question 11
        //Return every 92 solutions as an Array of coords
        let positions = [];
        let board = Array(8).fill(0).map(() => Array(8).fill(0));

        solve(0);
        return positions.map(matrix => getQueenPositions(matrix))
    
        function isValid(row, col) {
            // Check if there is a queen in the same column
            for (let i = 0; i < row; i++) {
                if (board[i][col]) return false;
            }
            // Check upper left diagonal
            for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
                if (board[i][j]) return false;
            }
            // Check upper right diagonal
            for (let i = row, j = col; i >= 0 && j < 8; i--, j++) {
                if (board[i][j]) return false;
            }
    
            return true;
        }
    
        function solve(row) {
            if (row === 8) {
                positions.push([...board.map((r) => r.slice())]);
                return;
            }
    
            for (let col = 0; col < 8; col++) {
                if (isValid(row, col)) {
                    board[row][col] = 1;
                    solve(row + 1);
                    // Backtracking :
                    board[row][col] = 0;
                }
            }
        }
    
    
        function getQueenPositions(board){ // return Array of coords
            let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    
            let res = []
            for(let line=0 ; line<8 ; line++){
                for(let col=0 ; col<8 ; col++){
                    if(board[line][col] === 1){
                        let letterTemp = letters[col]
                        let numTemp = line+1
                        res.push(''+letterTemp+numTemp)
                    }
                }
            }
    
            return res
        }
    }
}

let problem = new Problem8Queens()

// console.log(problem.everySolutions());