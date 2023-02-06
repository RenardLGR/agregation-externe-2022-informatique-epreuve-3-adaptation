import solutionsQ11 from "./question-11.js";
import solutionsQ12 from "./question-12.js";

// console.log(solutionsQ11, solutionsQ12);

//Solution are Array of 92 Array of coords
function areSolutionsEqual(sol1, sol2){
    let sanitized1 = sol1.map(coordsArr => coordsArr.sort().join('')) //will rank coords alphabetically and join the result
    let sanitized2 = sol2.map(coordsArr => coordsArr.sort().join('')) //will rank coords alphabetically and join the result

    //Sort again and compare the 2 joins

    return sanitized1.sort().join('') === sanitized2.sort().join('')
}

// console.log(areSolutionsEqual(solutionsQ11, solutionsQ12)); // True

// L'algorithme de la question 10 a déjà des difficulté à trouver 1 résultat, il est en pratique impossible de trouver les 92 résultats, seuls les oslutions des questions 11 et 12 seront testées.