const settingsButton = document.querySelector("#settingsButton");
const navbar = document.querySelector("#settingsNav");
const overlay = document.querySelector("#overlay");

let openToggle = false

function openSettings() {
   if (openToggle === false) {
      settingsButton.classList.add("open");
      navbar.classList.add("open");
      overlay.classList.add("open");
      openToggle = true;
   } else {
      settingsButton.classList.remove("open")
      navbar.classList.remove("open");
      overlay.classList.remove("open");
      openToggle = false;
   }
}