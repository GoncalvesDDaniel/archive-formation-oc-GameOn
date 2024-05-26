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
console.log("🚀 ~ modalform:", modalform);

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

//* reset submit btn
modalform.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("pas de refresh");
});

//* modal validation
function validate() {
    console.log("validate here");
}

// TODO : mettre event.preventDefault pour le bouton submit
// ? Est-ce qu'on peut faire un .reduce pour trouver le input[type=radio] ou for obligé?
// ? pourquoi 2 boutons je m'inscris
