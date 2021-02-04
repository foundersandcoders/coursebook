class ToggleButton extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector(":scope button");
    btn.hidden = false;
    btn.setAttribute("aria-expanded", false);
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true" || false;
      btn.setAttribute("aria-expanded", !expanded);
      expanded ? this.removeAttribute("open") : this.setAttribute("open", "");
    });
  }
}

window.customElements.define("toggle-button", ToggleButton);
