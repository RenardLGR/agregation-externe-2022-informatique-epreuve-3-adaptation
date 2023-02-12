let putQueenButton = document.getElementById("putQueen")
putQueenButton.addEventListener('click', putQueen)

function putQueen(){
    let coord = document.getElementById("square").value
    let targetSquare = document.getElementById(coord)
    let img = document.createElement('img')
    img.src = "assets/img/queen.png"
    img.alt = "queen"
    targetSquare.appendChild(img)
}