const card = document.querySelectorAll('.card');
// const start = document. querySelector('.start');

let cartesRetournees = 0;
let carte1 = null;
let carte2 = null;
let premierResultat = null;
let secondResultat = null;
let mouvements = 0;
let succes = 0;
let minuteur = false;
let timer = 60;
let compteRebours = null;

let compteMouvements = document.getElementById('compteur_statistic');
let compteSucces = document.getElementById('compteur_succes');
let compteurChrono = document.getElementById('compteur_chrono');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// mélanger les cartes
numeros = numeros.sort(() => {return Math.random()-0.5});

let clicAudio = new Audio('./sounds/clic.mp3');
let successAudio = new Audio('./sounds/success.mp3');
let errorAudio = new Audio('./sounds/error.mp3');
let winAudio = new Audio('./sounds/win.mp3');
let gameoverAudio = new Audio('./sounds/gameover.mp3');



// ******************* Chrono + message de fin chrono + refresh page **************************************

function chronometre() {
    compteRebours = setInterval(() => {
        timer--;
        compteurChrono.innerHTML = timer;
        if(timer == 0) {
            clearInterval(compteRebours);
            blocCarte();
            gameoverAudio.play();
        }
    }, 1000);
}

function blocCarte() {
    for (let i=0; i < card.length; i++){
        let carteBloquee = document.getElementById(i);
        imageBloquee = numeros[i];
        carteBloquee.innerHTML = `<img src="./images/${imageBloquee}.jpg" alt="">`;
        carteBloquee.disabled = true;
    }
}


// ************************************** Retourner les cartes ***********************************************************

function retourner(id) {

    if (minuteur == false) {
        chronometre();
        minuteur = true;
    }

    cartesRetournees++;
    if (cartesRetournees == 1) {
        carte1 = document.getElementById(id);
        premierResultat = numeros[id];
        carte1.innerHTML = `<img src="./images/${premierResultat}.jpg" alt="">`;
        clicAudio.play();
        // désactiver le premier bouton pour qu'on ne puisse plus le sélectionner
        carte1.disabled = true;

    } else if (cartesRetournees == 2) {
        carte2 = document.getElementById(id);
        secondResultat = numeros[id];
        carte2.innerHTML = `<img src="./images/${secondResultat}.jpg" alt="">`;
        clicAudio.play();
        carte2.disabled = true;

        // augmenter le nombre de mouvements
        mouvements++;
        compteMouvements.innerHTML=mouvements;

        if (premierResultat == secondResultat) {
            // réinitialiser cartesRetournees
            cartesRetournees = 0;

            // augmenter le nombre de succès
            succes++;
            compteSucces.innerHTML=succes;
            successAudio.play();

        } else {
            errorAudio.play();
            // les valeurs sont différentes, retourner les cartes et continuer à jouer
            setTimeout(() => {
                carte1.innerHTML=' ';
                carte2.innerHTML=' ';
                carte1.disabled = false;
                carte2.disabled = false;
                cartesRetournees = 0;
            }, 800);
        }

        // Si on a les 8 succès, mettre un message et remettre le jeu au début
        if (succes == 8) {
            clearInterval(compteRebours);
            winAudio.play();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu as gagné !!!',
                showConfirmButton: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }
    }
}