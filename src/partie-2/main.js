drawBoard()

function drawBoard(){
    let isWhite = true
    let board = document.getElementById('board')
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    for(let i=8 ; i>0 ; i--){
        let row = document.createElement('tr')
        for(let j=0 ; j<8 ; j++){
            let td = document.createElement('td')
            td.classList.add(isWhite ? 'white' : 'black')
            td.classList.add(letters[j]+i)
            isWhite = !isWhite
            row.appendChild(td)
        }
        isWhite = !isWhite
        board.appendChild(row)
    }
}