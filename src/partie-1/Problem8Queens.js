export default class Problem8Queens {
    constructor() {
        this.proposedSolution = []
    }

    checkSolution8queens(board) {
        let queenPositions = board.getQueenPositions() //Array of queen pos

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

    proposeSolution(board) {
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

    queenLegalMoves(square) { // return Array of legal moves pos
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
}