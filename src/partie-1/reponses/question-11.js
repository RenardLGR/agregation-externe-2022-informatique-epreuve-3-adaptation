import Board from "../Board.js";
import Bishop from "../Bishop.js";
import King from "../King.js";
import Queen from "../Queen.js";
import Rook from "../Rook.js";
import Problem8Queens from "../Problem8Queens.js";


/* FIRST WAY : TEST EVER COORDS */
function eightQueensPositionsNaive() {
    //returns the 92 solutions as an Array of coords
    //It tries every queen placements
    let result = [];
    let board = [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let tested = 0
    placeOne(board, 0);
    console.log("Tested : ", tested); // 16777216
    console.log("Number of results : ", result.length); // 92
    return result.map(matrix => getQueenPositions(matrix))
    //return result;

    function placeOne(board, row) {
        if (row === 8) {
            tested++
            if(isValid(board)){
                result.push(board.map(x => x.slice()));
            }
            return;
        }

        for (let i = 0; i < 8; i++) {
            board[row][i] = 1;
            //Trying
            placeOne(board, row + 1);
            //Backtracking
            board[row][i] = 0;
        }

    }

    function isValid(board){ //checks if a matrix as an Array of Array of 0s and 1s is valid
        let problem = new Problem8Queens()
        let positions = getQueenPositions(board)
        return problem.checkSolution8queensWithCoords(positions)
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

//console.log(eightQueensPositionsNaive());



/* SECOND WAY : BACKTRACK IF ON A ROW/COL/DIAGONAL OF AN EXISTING QUEEN */
function eightQueensPositionsOptimized() {
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
    return positions.map(matrix => getQueenPositions(matrix))


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

// let everyAnswers = eightQueensPositionsOptimized()
let problem = new Problem8Queens()

// console.log(everyAnswers.every(ans => problem.checkSolution8queensWithCoords(ans))); // True



// Question 11. Programmer une fonction Python solve_walker qui parcoure l’espace des board contenant 8 dames et qui s’arrête dès qu’ont été trouvées x board solutions au problème des 8 dames (0 < x ≤ 92) en imprimant sur la sortie écran chaque solution trouvée. Sachant qu’il existe 92 solutions au problème des 8 dames, on peut dire que cette fonction propose un algorithme qui résout le problème des 8 dames. Est-ce que la connaissance du nombre de solutions (92) est nécessaire ?

// Non mais elle permet d'écarter des algorithmes faux sans toutefois prouver qu'un algorithme retournant 92 solutions retourne une solution correcte au problème.