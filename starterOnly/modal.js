//* dom elements
const modalbg = document.querySelector(".bground");
const modalbtn = document.querySelectorAll(".modal-btn");
const modalbtnclose = document.querySelector(".close");
const submitBtn = document.querySelector(".btn-submit");
const modalform = document.querySelector("[name='reserve']");
const modalBody = document.querySelector(".modal-body");

//* input dom elements
const modalPrenomInput = document.querySelector("#first");
const modalNomInput = document.querySelector("#last");
const modalEmailInput = document.querySelector("#email");
const modalBirthdayInput = document.querySelector("#birthdate");
const modalQuantityInput = document.querySelector("#quantity");
const modalListRadioInput = document.querySelectorAll("input[name='location']");
const modalCheckboxCG = document.querySelector("#checkbox1");

//* print modal error message with input.parentNode set by default (need to be change for the nodeElement like  radio list input)
const injectModalError = (input, errorMessage, notNodeList = true) => {
    const target = notNodeList ? input.parentNode : input[0].parentNode;
    target.dataset.errorVisible = true;
    target.dataset.error = `${errorMessage}`;
    return false;
};

//* clear modal error
const resetModalError = (input, notNodeList = true) => {
    const target = notNodeList ? input.parentNode : input[0].parentNode;
    target.dataset.errorVisible = false;
    target.removeAttribute("data-error-visible");
    target.removeAttribute("data-error");
    return true;
};

//*Validation function

//* User name checker
const isUserNameValide = (userModalInput, modalName) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿÑñ\s'-\.]{2,}$/;
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
    const userBirthDay = userModalInput.valueAsDate;
    const errorMessageNotValid = "Veuillez entrer une date de naissance valide";
    const errorMessageNotAdult =
        "Vous devez avoir au moins 18 ans pour vous inscrire.";

    //* not valid case
    if (!userBirthDay)
        return injectModalError(userModalInput, errorMessageNotValid);

    const userYearOld = today.getFullYear() - userBirthDay.getFullYear();
    const userMonthOld = today.getMonth() - userBirthDay.getMonth();
    const userDayOld = today.getDate() - userBirthDay.getDate();

    //* not an adult <18
    if (userYearOld < 18)
        return injectModalError(userModalInput, errorMessageNotAdult);
    //* edge case === 18
    else if (userYearOld === 18) {
        if (userMonthOld < 0 || (userMonthOld === 0 && userDayOld < 0)) {
            return injectModalError(userModalInput, errorMessageNotAdult);
        } else {
            return resetModalError(userModalInput);
        }
    }

    //* is an adult >+18
    else if (userYearOld > 18) return resetModalError(userModalInput);
};

//* How many tournament checker
const isUserQuantityValid = (userModalInput) => {
    const quantityRegex = /^\d{1,2}$/;
    const quantityErrorMessage = `Veuillez saisir une valeur entre 0 et 99`;

    if (!quantityRegex.test(userModalInput.value))
        return injectModalError(userModalInput, quantityErrorMessage);

    return resetModalError(userModalInput);
};

//* if  one radio location is check clear the error and return true
const isLocationCheck = (radioNodeList) => {
    return Array.from(radioNodeList).some((radio) => radio.checked === true)
        ? resetModalError(radioNodeList, false)
        : injectModalError(
              radioNodeList,
              `Veuillez sélectionner une option`,
              false
          );
};

//* if radio is check clear the error and return true
const isUserRadioCheck = (userModalInput) => {
    return userModalInput.checked
        ? resetModalError(userModalInput)
        : injectModalError(userModalInput, `Veuillez sélectionner une option`);
};

//* checkbox lisener
const isUserCheckboxCgCheck = (userModalInput) => {
    return userModalInput.checked === true
        ? resetModalError(userModalInput)
        : injectModalError(
              userModalInput,
              `Pour poursuivre vous devez accepter les conditions d'utilisations.`
          );
};

//* All listener

//* addListener change on each input of the form
//*change can give an instant feedback for the user
const setupListener = (form) => {
    form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => validateField(input));
    });
};

//* launch modal event
modalbtn.forEach((btn) => btn.addEventListener("click", launchmodal));

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
                return isUserRadioCheck(input);
            }
            break;
    }
};

//* Dom + function

//* Apply dom element to the function
const modalValidation = () => {
    const isPrenomValid = validateField(modalPrenomInput);
    const isNomValid = validateField(modalNomInput);
    const isEmailValid = validateField(modalEmailInput);
    const isUserAdult = validateField(modalBirthdayInput);
    const isQuantityValid = validateField(modalQuantityInput);
    const isOneLocationCheck = isLocationCheck(modalListRadioInput);
    const isCgCheck = validateField(modalCheckboxCG);
    return isPrenomValid &&
        isNomValid &&
        isEmailValid &&
        isUserAdult &&
        isQuantityValid &&
        isOneLocationCheck &&
        isCgCheck
        ? true
        : false;
};

//* Apply dom element to the change listener
setupListener(modalform);

//* Validation

//* modal validation
function validate() {
    const isModalValid = modalValidation();
    const userName = modalPrenomInput.value;
    const validateMessage = `Merci ${userName} ! Votre formulaire a été soumis avec succès.`;

    if (isModalValid) {
        let messageDiv = document.createElement("p");
        messageDiv.className = "validate-message";
        messageDiv.innerText = validateMessage;
        modalBody.appendChild(messageDiv);
    }
}

//* reset submit
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
});

//* operative function

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
    console.log(x);
}

//* launch modal form
function launchmodal() {
    modalbg.style.display = "block";
    modalform.style.display = "block";
}

//* close modal event
modalbtnclose.addEventListener("click", () => {
    modalbg.style.display = "none";
    const isMessagePresent = document.querySelector(".validate-message");
    if (isMessagePresent) {
        isMessagePresent.remove();
    }
});
