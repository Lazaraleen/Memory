const card = document.querySelectorAll('.card');
const start = document. querySelector('.start');

let cartesRetournees = 0;
let carte1 = null;
let carte2 = null;
let premierResultat = null;
let secondResultat = null;
let mouvements = 0;
let succes = 0;

let compteMouvements = document.getElementById('compteur_statistic');
let compteSucces = document.getElementById('compteur_succes');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
// mélanger les cartes
numeros = numeros.sort(() => {return Math.random()-0.5});


document.addEventListener('DOMContentLoaded', () => {
    startApp();
})

start.addEventListener('click', () => {
    chrono();
})

function startApp() {
    for (let i=0; i < card.length; i++) {
        card[i].disabled = true;
    }
}

function deblocCards() {
    for (let i=0; i < card.length; i++) {
        card[i].disabled = false;
    }
}

// ******************* Chrono + message de fin chrono + refresh page **************************************

function chrono() {
    deblocCards();
    let time = 60;
    start.disabled = true;
    start.classList.add('disabled');
    const count = setInterval(() => {
        time--;
        compteur_chrono.innerHTML = time;
        if (time == 0) {
            clearInterval(count);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Le temps imparti est fini',
                showConfirmButton: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }
    }, 1000);
}

// ************************************** Retourner les cartes ***********************************************************

function retourner(id) {
    cartesRetournees++;
    if (cartesRetournees == 1) {
        carte1 = document.getElementById(id);
        premierResultat = numeros[id];
        carte1.innerHTML = premierResultat;
        // désactiver le premier bouton pour qu'on ne puisse plus le sélectionner
        carte1.disabled = true;

    } else if (cartesRetournees == 2) {
        carte2 = document.getElementById(id);
        secondResultat = numeros[id];
        carte2.innerHTML = secondResultat;
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

            if (succes == 8) {
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
        } else {
            // les valeurs sont différentes, retourner les cartes et continuer à jouer
            setTimeout(() => {
                carte1.innerHTML=' ';
                carte2.innerHTML=' ';
                carte1.disabled = false;
                carte2.disabled = false;
                cartesRetournees = 0;
            }, 1500);
        }
    }
}