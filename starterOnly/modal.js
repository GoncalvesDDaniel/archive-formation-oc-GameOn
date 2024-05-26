function editnav() {
    var x = document.getelementbyid("mytopnav");
    if (x.classname === "topnav") {
        x.classname += " responsive";
    } else {
        x.classname = "topnav";
    }
}
// function editnav() {
//     var x = document.getelementbyid("mytopnav");
//     if (screen.width <= 768) {
//         x.classList.add("responsive");
//     } else {
//         x.classList.remove("responsive");
//     }
// }

// dom elements
// const modalbg = document.queryselector(".bground");
const modalbg = document.querySelector(".bground");
console.log("🚀 ~ modalbg:", modalbg);
const modalbtn = document.querySelectorAll(".modal-btn");
const formdata = document.querySelectorAll(".formdata");
const modalbtnclose = document.querySelector(".close");

// launch modal event
modalbtn.forEach((btn) => btn.addEventListener("click", launchmodal));

// launch modal form
function launchmodal() {
    modalbg.style.display = "block";
}

// close modal event
modalbtnclose.addEventListener("click", () => {
    modalbg.style.display = "none";
});

// TODO : mettre event.preventDefault pour le bouton submit
// ? Est-ce qu'on peut faire un .reduce pour trouver le input[type=radio] ou for obligé?
// ? pourquoi 2 boutons je m'inscris
