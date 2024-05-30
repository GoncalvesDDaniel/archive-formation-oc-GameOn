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
const modalListRadioInput = document.querySelectorAll(
    ".formData input[type=radio]"
);
const modalRadio = document.querySelector(".formData:has(input[type=radio])");
const modalCheckboxCG = document.querySelector("#checkbox1");

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

//* first / last name regex checker and HTML injection
const isUserNameInputValide = (input, inputRequest) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    let result;
    if (input.value.trim().length < 2) {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Vérifier que votre ${inputRequest} a au moins 2 caratères.`;
        return false;
    }
    if (nameRegex.test(input.value) === false) {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Vérifier que votre ${inputRequest} ne contien pas de caratère invalide.`;
        return false;
    } else {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error-visible");
        input.parentNode.removeAttribute("data-error");
        return true;
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
        return true;
    } else {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Veuillez saisir une adresse e-mail valide`;
        return false;
    }
};

//* email validation
modalEmailInput.addEventListener("change", () => {
    isUserEmailInputValid(modalEmailInput);
});

//* nombre de result regex checker
const isUserQuantityInputValid = (input) => {
    const quantityRegex = /^\d{1,2}$/;
    if (quantityRegex.test(input.value) === true) {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error");
        input.parentNode.removeAttribute("data-error-visibility");
        return true;
    } else {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Veuillez saisir une valeur entre 0 et 99`;
        return false;
    }
};

modalQuantityInput.addEventListener("change", () => {
    isUserQuantityInputValid(modalQuantityInput);
});

//* input lisener
//* if radio is check clear the error and return true
let radioChecked = false;
const isRadioCheck = (listRadio) => {
    listRadio.forEach((radio) => {
        radio.addEventListener("click", (event) => {
            if (event.currentTarget.checked === true) {
                radioChecked = true;
                modalRadio.dataset.errorVisible = false;
                modalRadio.removeAttribute("data-error");
                modalRadio.removeAttribute("data-error-visibility");
            }
        });
    });
    return radioChecked;
};

const noRadioCheck = (input) => {
    if (radioChecked !== true) {
        input.dataset.errorVisible = true;
        input.dataset.error = `*Veuillez sélectionner une option`;
    }
};

//* checkbox lisener
const isUserCheckboxCgCheck = (input) => {
    if (input.checked === true) {
        input.parentNode.dataset.errorVisible = false;
        input.parentNode.removeAttribute("data-error");
        input.parentNode.removeAttribute("data-error-visibility");
    } else {
        input.parentNode.dataset.errorVisible = true;
        input.parentNode.dataset.error = `*Pour poursuivre vous devez accepter les conditions d'utilisations.`;
    }
};
modalCheckboxCG.addEventListener("click", () => {
    isUserCheckboxCgCheck(modalCheckboxCG);
});

//* date checker
const modalUserInputBirthday = document.querySelector("#birthdate");
const today = new Date();
const majeur = (input) => {
    const userBirthDay = input.valueAsDate;
    if (today.getFullYear() - userBirthDay.getFullYear() > 18) return true;
    else
        return today.getFullYear() - userBirthDay.getFullYear() !== 18
            ? false
            : today.getMonth() - userBirthDay.getMonth() < 0
            ? false
            : today.getDate() - userBirthDay.getDate() < 0
            ? false
            : true;
};

//* reset submit
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
    noRadioCheck(modalRadio);
});
//* modal validation
function validate() {
    // console.log("validate here");
    // console.log(isRadioCheck(modalListRadioInput));
    console.log(majeur(modalUserInputBirthday));
}
// TODO : faire retourner true ou false aux fonctions
// TODO : valider le formulaire en vérifiant si toutes les fonctions sont true

// ? pourquoi je peux pas faire un some() est-ce que je dois utiliser une Array.from() etc ?
// ? utiliser un novalide sur le form et prendre le relais sur la validier des champs ou tout prendre en charge. ?
