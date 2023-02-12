import Game from "./Game.js";
import Board from "./Board.js";
import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";
import Problem8Queens from "./Problem8Queens.js";

//This is a testing environment

let board1 = new Board()
board1.clearBoard()

console.log(board1.isSquareDefended('b8', 'white'))
console.log(board1.isSquareDefended('c8', 'white'))
console.log(board1.isSquareDefended('a8', 'white'))