function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

// Close modal event
modalBtnClose.addEventListener("click", () => {
    modalbg.style.display = "none";
});

// TODO : mettre event.preventDefault pour le bouton submit
// ? Est-ce qu'on peut faire un .reduce pour trouver le input[type=radio] ou for obligé?
// ? pourquoi 2 boutons je m'inscris
