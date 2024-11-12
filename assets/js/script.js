// set cookie function
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// get cookie function
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function checkFirstVisit() {
  const hasVisited = getCookie("hasVisited");

  if (!hasVisited) {
    document.getElementById("welcomeModal").style.display = "block";

    setCookie("hasVisited", "true", 30); // Expires in 30 days
  }
}

// close the modal
document.addEventListener("DOMContentLoaded", function () {
  checkFirstVisit();

  document.querySelector(".close").onclick = function () {
    document.getElementById("welcomeModal").style.display = "none";
  };

  window.onclick = function (event) {
    const modal = document.getElementById("welcomeModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});

const body = document.querySelector("body");
const header = document.querySelector(".header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

hamburgerBtn.addEventListener("click", () => {
  header.classList.toggle("show-mobile-menu");
  if (header.classList.contains("show-mobile-menu")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});

closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero-section");

  const heroHeight = heroSection.offsetHeight;

  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
