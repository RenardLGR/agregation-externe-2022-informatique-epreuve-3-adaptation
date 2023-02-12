let putQueenButton = document.getElementById("putQueen")
putQueenButton.addEventListener('click', putQueen)

//Initialize
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
            td.id = letters[j]+i
            isWhite = !isWhite
            row.appendChild(td)
        }
        isWhite = !isWhite
        board.appendChild(row)
    }
}

function putQueen(){
    let coord = document.getElementById("square").value
    let targetSquare = document.getElementById(coord)
    let img = document.createElement('img')
    img.src = "assets/img/queen.png"
    img.alt = "queen"
    targetSquare.appendChild(img)
}