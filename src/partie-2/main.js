let putQueenButton = document.getElementById("putQueen")
putQueenButton.addEventListener('click', putQueen)
let removeQueenButton = document.getElementById("removeQueen")
removeQueenButton.addEventListener('click', removeQueen)
let solveButton = document.getElementById("solve")
solveButton.addEventListener('click', trySolution)

//Initialize
drawBoard()
putDefaultQueens()

function drawBoard() {
    let isWhite = true
    let board = document.getElementById('board')
    let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    for (let i = 8; i > 0; i--) {
        let row = document.createElement('tr')
        for (let j = 0; j < 8; j++) {
            let td = document.createElement('td')
            td.classList.add(isWhite ? 'white' : 'black')
            td.id = letters[j] + i
            isWhite = !isWhite
            row.appendChild(td)
        }
        isWhite = !isWhite
        board.appendChild(row)
    }
}

function isCoordValid(coord){ //Check if a coord as a String is valid
    if(typeof coord !== 'string'){
        return false
    }
    if(coord.length !== 2){
        return false
    }
    let nums = '12345678'
    let letters = 'abcdefgh'
    if(!letters.includes(coord[0]) || !nums.includes(coord[1])){
        return false
    }

    return true
}

function putQueen() {
    let coord = document.getElementById("square").value
    if(!isCoordValid(coord)){
        alert("Input coordinates wrong!")
        return
    }
    //We can check if there is already a queen on this square, but it actually doesn't affect the program
    let targetSquare = document.getElementById(coord)
    let img = document.createElement('img')
    img.src = "assets/img/queen.png"
    img.alt = "queen"
    targetSquare.appendChild(img)
}

function removeQueen() {
    let coord = document.getElementById("square").value
    let targetSquare = document.getElementById(coord)

    targetSquare.removeChild(targetSquare.firstChild);
}

async function trySolution() {
    let tds = document.querySelectorAll('td')
    let queenCoords = []
    tds.forEach(td => {
        if (td.hasChildNodes()) {
            queenCoords.push(td.id)
        }
    })
    if(queenCoords.length !== 8){
        alert("Make sure you have exactly 8 queens on the board!")
        return
    }
    try {
        let sol = queenCoords.join('-')
        let url = "http://www.serveur-chess.fr/solve8queens?solution=" + sol
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        console.log(json);
        if (response.status === 200) {
            alert("Great! Solution valid!")
        }else{
            alert("Erf! Solution not valid!")
        }
    } catch (error) {
        console.log(error)
    }
}


//Change this function if you want some queens on page load!
function putDefaultQueens() {
    let coords = ['e4', 'f4']
    coords.forEach(c => {
        let targetSquare = document.getElementById(c)
        let img = document.createElement('img')
        img.src = "assets/img/queen.png"
        img.alt = "queen"
        targetSquare.appendChild(img)
    })
}