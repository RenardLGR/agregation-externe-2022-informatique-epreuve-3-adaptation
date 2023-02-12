let solveButton = document.getElementById("solve")
solveButton.addEventListener('click', trySolution)

async function trySolution() {
    let tds = document.querySelectorAll('td')
    let queenCoords = []
    tds.forEach(td => {
        if (td.hasChildNodes()) {
            queenCoords.push(td.id)
        }
    })

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