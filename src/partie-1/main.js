import Board from "./Board.js";
import checkSolution8queens from "./question-4.js"



let board2 = new Board()
board2.putQueen('a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5') // solution de 8 queens puzzle
console.log(board2.getQueenPosition());
console.log(checkSolution8queens(board2)); // true

let board3 = new Board()
board3.putQueen('a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'g8') // pas une solution de 8 queens puzzle
console.log(board3.getQueenPosition());
console.log(checkSolution8queens(board3)); // false