import queenLegalMoves from "./question-3.js"


export default function checkSolution8queens(board){
    let queensPos = board.getQueenPosition()

    //to return true, no legal moves of every queens should have a queenPos in them
    for (let i = 0; i < queensPos.length; i++) {
        let pos = queensPos[i]
        let queenMoves = queenLegalMoves(pos)
        for (let j = 0; j < queenMoves.length; j++) {
            if (queensPos.includes(queenMoves[j])) {
                return false
            }
        }
    }
    return true
}


// export default { checkSolution8queens }