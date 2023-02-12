let removeQueenButton = document.getElementById("removeQueen")
removeQueenButton.addEventListener('click', removeQueen)

function removeQueen(){
    let coord = document.getElementById("square").value
    let targetSquare = document.getElementById(coord)

    targetSquare.removeChild(targetSquare.firstChild);
}