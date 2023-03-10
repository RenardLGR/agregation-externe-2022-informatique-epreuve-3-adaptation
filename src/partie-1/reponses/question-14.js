// Question 14. Décrire la restructuration de votre application permettant à un développeur d’intégrer sa fonction solve dans votre conception. Vous devez prendre soin de bien décrire toutes les modifications à effectuer sur le code des classes existantes. Vous expliquerez aussi ce que doit faire le développeur pour intégrer sa fonction. Enfin, vous montrerez comment choisir une fonction solve qui a été proposée, et comment l’exécuter pour trouver toutes les solutions à un problème.


//Le développeur aura juste à ajouter la fonction solve en tant que méthode de la classe Problem8Queens, instancier la classe et appeler cette méthode.

// Il est possible de passer une fonction en argument :
// function giveMeYourAlgo(algo){
//     return algo()
// }

// Il peut aussi comparer sa solution grâce à l'algorithme de comparaison proposé en question 13.