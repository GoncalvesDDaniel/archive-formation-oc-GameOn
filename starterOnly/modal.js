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
const modalbtnclose = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const modalform = document.querySelector("[name='reserve']");

//* input dom elements
const modalPrenomInput = document.querySelector("#first");
const modalNomInput = document.querySelector("#last");
const modalEmailInput = document.querySelector("#email");
const modalBirthdayInput = document.querySelector("#birthdate");
const modalQuantityInput = document.querySelector("#quantity");
const modalListRadioInput = document.querySelectorAll("input[name='location']");
const modalCheckboxCG = document.querySelector("#checkbox1");

//* launch modal form
function launchmodal() {
    modalbg.style.display = "block";
}

//* launch modal event
modalbtn.forEach((btn) => btn.addEventListener("click", launchmodal));

//* close modal event
modalbtnclose.addEventListener("click", () => {
    modalbg.style.display = "none";
});

//* print modal error message with input.parentNode set by default (need to be change for the nodeElement like  radio list input)
const injectModalError = (input, errorMessage, notNodeElement = true) => {
    const target = notNodeElement ? input.parentNode : input[0].parentNode;
    target.dataset.errorVisible = true;
    target.dataset.error = `${errorMessage}`;
    return false;
};

//* clear modal error
const resetModalError = (input, notNodeElement = true) => {
    const target = notNodeElement ? input.parentNode : input[0].parentNode;
    target.dataset.errorVisible = false;
    target.removeAttribute("data-error-visible");
    target.removeAttribute("data-error");
    return true;
};

//Validation function

//* User name checker
const isUserNameValide = (userModalInput, modalName) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,}$/;
    const errorMessageLength = `Votre ${modalName} doit contenir au moins 2 caratères.`;
    const errorMessageCharaters = `Votre ${modalName} doit contenir uniquement des lettres.`;

    if (userModalInput.value.trim().length < 2)
        return injectModalError(userModalInput, errorMessageLength);

    if (!nameRegex.test(userModalInput.value))
        return injectModalError(userModalInput, errorMessageCharaters);

    return resetModalError(userModalInput);
};

//* email regex checker
const isUserEmailValid = (userModalInput) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailErrorMessage = `Veuillez saisir une adresse e-mail valide.`;

    if (!emailRegex.test(userModalInput.value))
        return injectModalError(userModalInput, emailErrorMessage);

    return resetModalError(userModalInput);
};

//* date checker (checked on validate)
const isUserAnAdult = (userModalInput) => {
    const today = new Date();
    let userBirthDay = userModalInput.valueAsDate;
    if (!userBirthDay) return false;
    let userYearOld = today.getFullYear() - userBirthDay.getFullYear();
    // userMonthOld >= 0 if he is older than current month
    let userMonthOld = today.getMonth() - userBirthDay.getMonth();
    // userDayOld >= 0 if he is older than current day
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
const isUserQuantityValid = (userModalInput) => {
    const quantityRegex = /^\d{1,2}$/;
    const quantityErrorMessage = `Veuillez saisir une valeur entre 0 et 99`;

    if (!quantityRegex.test(userModalInput.value))
        return injectModalError(userModalInput, quantityErrorMessage);

    return resetModalError(userModalInput);
};

//* input lisener
//* if radio is check clear the error and return true
const isRadioCheck = (userModalInput) => {
    Array.from(userModalInput).some((radio) => radio.checked === true)
        ? resetModalError(userModalInput, false)
        : injectModalError(
              userModalInput,
              `Veuillez sélectionner une option`,
              false
          );
};

//* checkbox lisener
const isUserCheckboxCgCheck = (userModalInput) => {
    userModalInput.checked === true
        ? resetModalError(userModalInput)
        : injectModalError(
              userModalInput,
              `Pour poursuivre vous devez accepter les conditions d'utilisations.`
          );
};

// All listener
//* addListener change on each input of the form
//change can give an instant feedback for the user
const setupListener = (form) => {
    form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => validateField(input));
    });
};

//* Validate function on change with switch case
const validateField = (input) => {
    switch (input.id) {
        case "first":
            return isUserNameValide(input, "prénom");
            break;
        case "last":
            return isUserNameValide(input, "nom");
            break;
        case "email":
            return isUserEmailValid(input);
            break;
        case "birthdate":
            return isUserAnAdult(input);
            break;
        case "quantity":
            return isUserQuantityValid(input);
            break;
        case "checkbox1":
            return isUserCheckboxCgCheck(input);
            break;
        default:
            if (input.name === "location") {
                const inputRadioList = document.querySelectorAll(
                    'input[name="location"]'
                );
                return isRadioCheck(inputRadioList);
            }
            break;
    }
};

//* Apply dom element to the function
const modalValidation = () => {
    const isPrenomValid = validateField(modalPrenomInput);
    const isNomValid = validateField(modalNomInput);
    const isEmailValid = validateField(modalEmailInput);
    const isUserAdult = validateField(modalBirthdayInput);
    const isQuantityValid = validateField(modalQuantityInput);
    const isLocationCheck = validateField(modalListRadioInput);
    const isCgCheck = validateField(modalCheckboxCG);
    return isPrenomValid &&
        isNomValid &&
        isEmailValid &&
        isUserAdult &&
        isQuantityValid &&
        isLocationCheck &&
        isCgCheck
        ? true
        : false;
};

//* Apply dom element to the change listener
setupListener(modalform);

//* reset submit
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
});
//* modal validation
function validate() {
    console.log(modalValidation());
}
// TODO : faire retourner true ou false aux fonctions
// TODO : refactoring birthday f() et rajouter si input.valueAsDate === null etc
// TODO : valider le formulaire en vérifiant si toutes les fonctions sont true

// ? pourquoi je peux pas faire un some() est-ce que je dois utiliser une Array.from() etc ?
// ? utiliser un novalide sur le form et prendre le relais sur la validier des champs ou tout prendre en charge. ?

// //* User prenom checker (instant feedback)
// modalPrenomInput.addEventListener("change", () =>
//     isUserNameValide(modalPrenomInput, "prénom")
// );
// //* User nom checker (instant feedback)
// modalNomInput.addEventListener("change", () =>
//     isUserNameValide(modalNomInput, "nom")
// );
// //* email checker (instant feedback)
// modalEmailInput.addEventListener("change", () => {
//     isUserEmailInputValid(modalEmailInput);
// });

// //* tournament lisener (instant feedback)
// modalQuantityInput.addEventListener("change", () => {
//     isUserQuantityInputValid(modalQuantityInput);
// });

// modalCheckboxCG.addEventListener("click", () => {
//     isUserCheckboxCgCheck(modalCheckboxCG);
// });
