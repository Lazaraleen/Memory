const card = document.querySelectorAll('.card');
const start = document. querySelector('.start');

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

function chrono() {
    deblocCards();
    let time = 5;
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