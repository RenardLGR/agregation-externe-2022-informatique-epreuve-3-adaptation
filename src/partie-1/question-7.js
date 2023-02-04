import Board from "./Board.js";
import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";

let board1 = new Board()
board1.putPiece(['a1'], Queen)
board1.putPiece(['b3'], Rook)
console.log(board1.hasPiece('a2')) // False 
let queen = board1.getPiece('a1') // Queen
let rook1 = board1.getPiece('b3') // Rook

console.log(queen);
console.log(rook1);

console.log(board1.hasPiece('b3')) // True
board1.removePiece('b3')
console.log(board1.hasPiece('b3')) // False

console.log(board1);