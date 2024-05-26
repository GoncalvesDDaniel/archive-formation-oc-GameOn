function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
    console.log(x);
}
//* dom elements
const modalbg = document.querySelector(".bground");
const modalbtn = document.querySelectorAll(".modal-btn");
const formdata = document.querySelectorAll(".formdata");
const modalbtnclose = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const modalform = document.querySelector("form");
const modalPrenomField = document.querySelector("#first");
const modalNomField = document.querySelector("#last");

//* launch modal event
modalbtn.forEach((btn) => btn.addEventListener("click", launchmodal));

//* launch modal form
function launchmodal() {
    modalbg.style.display = "block";
}

//* close modal event
modalbtnclose.addEventListener("click", () => {
    modalbg.style.display = "none";
});

//* reset submit
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
});

//* first / last name regex checker
const isNameInputValid = (str) => {
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/;

    if (str.value.trim().length < 2) {
        console.log(" votre réponse n'est pas assez long");
        return;
    }
    if (regex.test(str.value) === false) {
        console.log(str.value + " n'est pas valide.");
        return;
    } else {
        console.log(str.value + " prenom valid");
        return;
    }
};

//* prenom validation
modalPrenomField.addEventListener("change", () => {
    // const userPrenom = event.target.value;
    isNameInputValid(modalPrenomField);
    console.log("prenom f() fini");
});

//* nom validation
modalNomField.addEventListener("change", () => {
    // const userPrenom = event.target.value;
    isNameInputValid(modalNomField);
    console.log("nom f() fini");
});

//* modal validation
function validate() {
    console.log("validate here");
}

// TODO : mettre event.preventDefault pour le bouton submit
// ? Est-ce qu'on peut faire un .reduce pour trouver le input[type=radio] ou for obligé?
// ? pourquoi 2 boutons je m'inscris
