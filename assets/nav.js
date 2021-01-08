const toggle = document.querySelector("#toggle-nav");

toggle.hidden = false;
toggle.setAttribute("aria-expanded", false);
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true" || false;
  toggle.setAttribute("aria-expanded", !expanded);
});
