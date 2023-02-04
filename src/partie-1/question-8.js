import Board from "./Board.js";
import Bishop from "./Bishop.js";
import King from "./King.js";
import Queen from "./Queen.js";
import Rook from "./Rook.js";
import Problem8Queens from "./Problem8Queens.js";

let board1 = new Board()
board1.putPiece(['a1'], Queen)
board1.putPiece(['b3'], Queen)
let problem = new Problem8Queens()
problem.proposeSolution(board1)
console.log(problem.statistiques()) // 1 solution(s), 0 valide(s)

let board2 = new Board()
board2.putPiece(['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'h5'], Queen) // solution de 8 queens puzzle
console.log(board2.getQueenPosition());
problem.proposeSolution(board2)
console.log(problem.statistiques()) // 2 solution(s), 1 valide(s)

let board3 = new Board()
board3.putPiece(['a2', 'b4', 'c6', 'd8', 'e3', 'f1', 'g7', 'g8'], Queen) // pas une solution de 8 queens puzzle
console.log(board3.getQueenPosition());
problem.proposeSolution(board3)
console.log(problem.statistiques()) // 3 solution(s), 1 valide(s)