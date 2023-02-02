function queenLegalMoves(square){
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    let coordCol = square[0]
    let coordLine = Number(square[1])

    // let line = Array.from(Array(9).keys()).filter(el => el !== 0 && el !== coordCol)
    let col = Array.from({length: 8}, (_, i) => i+1).filter(el => el !== coordLine).map(el => coordCol + el)
    let line = letters.filter(let => let !== coordCol).map(el => el + coordLine)
    
    let diag1 = []
    for(let i=letters.indexOf(coordCol)+1, j=coordLine+1 ; i<8 && j<=8 ; i++, j++){ //goes top right
        diag1.push(letters[i] + j)
    }
    for(let i=letters.indexOf(coordCol)-1, j=coordLine-1 ; i>=0 && j>0 ; i--, j--){ //goes bottom left
        diag1.push(letters[i] + j)
    }
    
    let diag2 = []
    for(let i=letters.indexOf(coordCol)-1, j=coordLine+1 ; i>=0 && j<=8 ; i--, j++){ //goes top left
        diag2.push(letters[i] + j)
    }
    for(let i=letters.indexOf(coordCol)+1, j=coordLine-1 ; i<8 && j>0 ; i++, j--){ //goes bottom right
        diag2.push(letters[i] + j)
    }
    
    return line.concat(col).concat(diag1).concat(diag2)
}

// console.log(queenLegalMoves('b2'));
// console.log(queenLegalMoves('f7'));

