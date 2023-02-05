import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";
import Problem8Queens from "../Problem8Queens.js";


// function createCoord(){
//     let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

//     let cpt = -50

//     f(0, 0, 1, [])

//     function f(length, letterIdx, number, inProgress){

//         if(length === 8){
//             cpt++
//             let noDuplicate = inProgress.every((el, idx, arr) => arr.indexOf(el) === idx)
//             if(noDuplicate){
//                 //check board, add it if solution is working
//                 console.log(inProgress);
//             }
//             return
//         }

//         for(let l=letterIdx ; letterIdx<letters.length-1 && cpt<15 ; l++){
//             for(let num=number ; num<=8 && cpt<15 ; num++){
//                 let pos = letters[l] + num
//                 //letter stays the same, increase number
//                 f(length+1, l, number+1, [...inProgress, pos])
//             }
//             //backtracking + increase letter
//             //inProgress.pop()
//             f(length, l+1, 1, inProgress)
//         }
//         //backtracking + increase letter
//         //inProgress.pop()
//         f(length, letterIdx+1, 1, inProgress)

//     }
// }

//createCoord() // Doesn't work :(

function eightQueensPositions() {
    //Return every 92 solutions as an Array of matrices with 1 being a queen
    let positions = [];
    let board = Array(8).fill(0).map(() => Array(8).fill(0));

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

    solve(0);
    return positions;
}

function toCoord(positions) {
    //return every 92 solutions from above as Array of coords like 'a1', 'b4', etc
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return positions.map(matrix => {
        let coord = []
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (matrix[row][col] === 1) {
                    coord.push(letters[col] + (row + 1));
                }
            }
        }
        return coord.slice()
    })
}

let everyAnswers = toCoord(eightQueensPositions())
let problem = new Problem8Queens()

// console.log(everyAnswers.every(ans => problem.checkSolution8queensWithCoords(ans))); // True