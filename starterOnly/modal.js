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
const modalPrenomInput = document.querySelector("#first");
const modalNomInput = document.querySelector("#last");
const modalEmailInput = document.querySelector("#email");
const modalQuantityInput = document.querySelector("#quantity");

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

//* first / last name regex checker and HTML injection
const isUserNameInputValide = (input, inputRequest) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    let result;
    if (input.value.trim().length < 2) {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Vérifier que votre ${inputRequest} a au moins 2 caratères.`;
        return;
    }
    if (nameRegex.test(input.value) === false) {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Vérifier que votre ${inputRequest} ne contien pas de caratère invalide.`;
        return;
    } else {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error-visible");
        input.parentNode.removeAttribute("data-error");
        return;
    }
};
//* prenom validation
modalPrenomInput.addEventListener("change", () => {
    isUserNameInputValide(modalPrenomInput, "prénom");
});

//* nom validation
modalNomInput.addEventListener("change", () => {
    isUserNameInputValide(modalNomInput, "nom");
});

//* email regex checker
const isUserEmailInputValid = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input.value) === true) {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error");
        input.parentNode.removeAttribute("data-error-visible");
    } else {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Veuillez entrer une adresse mail valide`;
    }
};

//* email validation
modalEmailInput.addEventListener("change", () => {
    isUserEmailInputValid(modalEmailInput);
});

//* nombre de tournois regex checker
const isUserQuantityInputValid = (input) => {
    const quantityRegex = /^\d{1,2}$/;
    if (quantityRegex.test(input.value) === true) {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error");
        input.parentNode.removeAttribute("data-error-visibility");
    } else {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Veuiller entre une valeur entre 0 et 99`;
    }
};

modalQuantityInput.addEventListener("change", () => {
    isUserQuantityInputValid(modalQuantityInput);
});

//* modal validation
function validate() {
    console.log("validate here");
}

// TODO : mettre event.preventDefault pour le bouton submit

// ? Est-ce qu'on peut faire un .reduce pour trouver le input[type=radio] ou for obligé?
// ? pourquoi 2 boutons je m'inscris

//! Set attribut to formData for the error - font-size: 10px
// formData[data-error]::after ou
// .formData[data-error-visible="true"]::after
// email.parentNode.dataset.errorVisible = 'true'; permet de sélectionner le partent de formData et de mettre l'attribut data-errorVisible
