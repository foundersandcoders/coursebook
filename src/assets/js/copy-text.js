class CopyText extends HTMLElement {
  connectedCallback() {
    const input = this.querySelector(":scope input");
    const btn = this.querySelector(":scope button");
    const copyIcon = this.querySelector(":scope [data-copy]");
    const successIcon = this.querySelector(":scope [data-success]");

    btn.removeAttribute("hidden");
    input.onclick = () => input.select();

    btn.onclick = () => {
      navigator.clipboard.writeText(input.value);
      copyIcon.setAttribute("hidden", "");
      successIcon.removeAttribute("hidden");
      setTimeout(() => {
        successIcon.setAttribute("hidden", "");
        copyIcon.removeAttribute("hidden");
      }, 2000);
    };
    this.append(btn);
  }
}

window.customElements.define("copy-text", CopyText);
