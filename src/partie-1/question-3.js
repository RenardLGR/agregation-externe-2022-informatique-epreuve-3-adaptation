function queenLegalMoves(square){
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    let coordLine = square[0]
    let coordCol = Number(square[1])

    // let line = Array.from(Array(9).keys()).filter(el => el !== 0 && el !== coordCol)
    let line = Array.from({length: 8}, (_, i) => i+1).filter(el => el !== coordCol).map(el => coordLine + el)
    let col = letters.filter(let => let !== coordLine).map(el => el + coordCol)

    let diag1 = []
    for(let i=letters.indexOf(coordLine)+1, j=coordCol+1 ; i<8 && j<=8 ; i++, j++){ //goes top right
        diag1.push(letters[i] + j)
    }
    for(let i=letters.indexOf(coordLine)-1, j=coordCol-1 ; i>=0 && j>0 ; i--, j--){ //goes bottom left
        diag1.push(letters[i] + j)
    }

    let diag2 = []
    for(let i=letters.indexOf(coordLine)-1, j=coordCol+1 ; i>=0 && j<=8 ; i--, j++){ //goes top left
        diag2.push(letters[i] + j)
    }
    for(let i=letters.indexOf(coordLine)+1, j=coordCol-1 ; i<8 && j>0 ; i++, j--){ //goes bottom right
        diag2.push(letters[i] + j)
    }
    
    return line.concat(col).concat(diag1).concat(diag2)
}

// console.log(queenLegalMoves('b2'));
// console.log(queenLegalMoves('f7'));

