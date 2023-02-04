import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";
import Problem8Queens from "../Problem8Queens.js";

function generateBoardPopulated8QueensRandom(){ //generate a board with 8 queens randomly placed inside of it
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    let pos = []

    while(pos.length < 8){
        let randomLetter = letters[randomNumberBetween0and7()]
        let randomNumber = randomNumberBetween1and8()
        let randomPos = randomLetter + randomNumber

        if(!pos.includes(randomPos)){
            pos.push(randomPos)
        }
    }


    let board = new Board()
    board.putPiece(pos, Queen)

    return board

    function randomNumberBetween0and7() {
        return Math.floor(Math.random() * 8);
    }
    
    function randomNumberBetween1and8() {
        return Math.floor(Math.random() * 8) + 1;
    }
      
}

// console.log(generateBoardPopulated8QueensRandom());

function find8QueensProblem(){
    let randomBoard
    let isSolutionValid
    let problem = new Problem8Queens()
    let increment = 0
    do{
        increment++
        randomBoard = generateBoardPopulated8QueensRandom()
        // problem.proposeSolution(randomBoard)
        isSolutionValid = problem.checkSolution8queens(randomBoard)
        // console.log(randomBoard);
    }while(!isSolutionValid)
    
    console.log(increment + ' tries');
    return randomBoard.getQueenPositions()
}

console.log(find8QueensProblem()) // ['d1', 'b2', 'g3', 'c4', 'f5', 'h6', 'a7', 'e8'] // in 186.575 seconds
// [ 'd1', 'g2', 'e3', 'b4', 'f5', 'a6', 'c7', 'h8'] // 17378750 tries in 99.81 seconds

//As there are 4,426,165,368 possible arrangements of eight queens on an 8×8 board, but only 92 solutions ; brute force is very inefficient.