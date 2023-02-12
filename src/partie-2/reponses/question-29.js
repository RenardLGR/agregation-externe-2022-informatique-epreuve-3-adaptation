// Question 29. Discuter des avantages et inconvénients de réaliser certaines validations de la solution proposée avant d'envoyer une demande de validation au serveur (on considère que le calcul de la vérification est trop long pour se faire intégralement sur le navigateur).

// Les validations de formatage (taille égale à 8, que des coordonnées présentes sur l'échiqiuer) sont simples à faire côté client et éviteront que le server soit surchargé de requêtes qui n'ont aucune chance d'aboutir.
//L'utilisateur sera aussi immédiatement prévenu de l'erreur sur son échiquier sans attendre une réponse du serveur.
//Il est aussi intéressant lors de l'ajout d'une dame de vérifier que ses coordonnées soient possibles.

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