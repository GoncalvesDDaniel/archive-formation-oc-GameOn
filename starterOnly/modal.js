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
const modalBirthdayInput = document.querySelector("#birthdate");
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

//* print modal error message
const injectModalError = (input, errorMessage) => {
    input.parentNode.dataset.errorVisible = true;
    input.parentNode.dataset.error = `${errorMessage}`;
    return false;
};

//* print modal error message on parent
const injectModalErrorOnParent = (input, errorMessage) => {
    input.dataset.errorVisible = true;
    input.dataset.error = `${errorMessage}`;
    return false;
};

//* clear modal error
const resetModalError = (input) => {
    input.parentNode.dataset.errorVisible = false;
    input.parentNode.removeAttribute("data-error-visible");
    input.parentNode.removeAttribute("data-error");
    return true;
};

//* clear modal error on parent
const resetModalErrorOnParent = (input) => {
    input.dataset.errorVisible = false;
    input.removeAttribute("data-error-visible");
    input.removeAttribute("data-error");
    return true;
};

//* User name error printer
const isUserNameValide = (userModalInput, modalName) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    const errorMessageLength = `Votre ${modalName} doit contenir au moins 2 caratères.`;
    const errorMessageCharaters = `Votre ${modalName} doit contenir uniquement des lettres.`;

    if (userModalInput.value.trim().length < 2)
        return injectModalError(userModalInput, errorMessageLength);

    if (nameRegex.test(userModalInput.value) === false || undefined || null)
        return injectModalError(userModalInput, errorMessageCharaters);

    return resetModalError(userModalInput);
};

//* User prenom checker (instant feedback)
modalPrenomInput.addEventListener("change", () =>
    isUserNameValide(modalPrenomInput, "prénom")
);
//* User nom checker (instant feedback)
modalNomInput.addEventListener("change", () =>
    isUserNameValide(modalNomInput, "nom")
);

//* email regex checker
const isUserEmailInputValid = (userModalInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailErrorMessage = `Veuillez saisir une adresse e-mail valide.`;

    if (emailRegex.test(userModalInput) === false || undefined || null)
        return injectModalError(userModalInput, emailErrorMessage);

    return resetModalError(userModalInput);
};

//* email checker (instant feedback)
modalEmailInput.addEventListener("change", () => {
    isUserEmailInputValid(modalEmailInput);
});

//* date checker (checked on validate)
const today = new Date();
const isUserAnAdult = (input) => {
    if (input.value === undefined || null) return false;
    let userBirthDay = input.valueAsDate;
    let userYearOld = today.getFullYear() - userBirthDay.getFullYear();
    let userMonthOld = today.getMonth() - userBirthDay.getMonth();
    let userDayOld = today.getDate() - userBirthDay.getDate();

    if (userYearOld > 18) return true;
    if (userYearOld < 18) return false;
    if (userYearOld === 18) {
        //?  18 yo with some months ?
        if (userMonthOld < 0) return false;
        //?  18 yo 0 mounth with some days ?
        if (userDayOld < 0) return false;
        else return true;
    }
};

//* How many tournament checker
const isUserQuantityInputValid = (userModalInput) => {
    const quantityRegex = /^\d{1,2}$/;
    const quantityErrorMessage = `Veuillez saisir une valeur entre 0 et 99`;

    if (quantityRegex.test(userModalInput.value) === false || undefined || null)
        return injectModalError(userModalInput, quantityErrorMessage);

    return resetModalError(userModalInput);
};

//* tournament lisener (instant feedback)
modalQuantityInput.addEventListener("change", () => {
    isUserQuantityInputValid(modalQuantityInput);
});

//* input lisener
//* if radio is check clear the error and return true
// let radioChecked = false;
const isRadioCheck = (userModalInput, modalName) => {
    // listRadio.forEach((radio) => {
    //     radio.addEventListener("click", (event) => {
    //         if (event.currentTarget.checked === true) {
    //             radioChecked = true;
    //             modalRadio.dataset.errorVisible = false;
    //             modalRadio.removeAttribute("data-error");
    //             modalRadio.removeAttribute("data-error-visibility");
    //         }
    //     });
    // });
    // return radioChecked;
    return Array.from(userModalInput).some((radio) => radio.checked === true)
        ? resetModalErrorOnParent(modalName)
        : injectModalErrorOnParent(
              modalName,
              `Veuillez sélectionner une option`
          );
};

// const noRadioCheck = (input) => {
//     if (radioChecked !== true) {
//         input.dataset.errorVisible = true;
//         input.dataset.error = `*Veuillez sélectionner une option`;
//     }
// };

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

//* reset submit
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
    // isRadioCheck(modalRadio);
});
//* modal validation
function validate() {
    // console.log("validate here");
    console.log(isRadioCheck(modalListRadioInput, modalRadio));
    console.log(isUserAnAdult(modalBirthdayInput));
}
// TODO : faire retourner true ou false aux fonctions
// TODO : refactoring birthday f() et rajouter si input.valueAsDate === null etc
// TODO : valider le formulaire en vérifiant si toutes les fonctions sont true

// ? pourquoi je peux pas faire un some() est-ce que je dois utiliser une Array.from() etc ?
// ? utiliser un novalide sur le form et prendre le relais sur la validier des champs ou tout prendre en charge. ?
