const main = document.querySelector("#main");
const globalNav = document.querySelector("#globalNav");
const toggleNav = document.querySelector("#toggleNav");

const closeNav = () => {
  globalNav.classList.remove("active");
};

toggleNav.addEventListener("click", () => {
  globalNav.classList.toggle("active");
  if (globalNav.classList.contains("active")) {
    main.addEventListener("click", closeNav, { once: true });
    document.addEventListener(
      "keydown",
      (event) => event.key === "Escape" && closeNav(),
      { once: true }
    );
  }
});
