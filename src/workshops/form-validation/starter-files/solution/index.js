const form = document.querySelector("form");

form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  const allInputsValid = event.target.checkValidity();
  if (!allInputsValid) {
    event.preventDefault();
  }
});

const inputs = form.querySelectorAll("input");
inputs.forEach((input) => {
  input.setAttribute("aria-invalid", false);

  input.addEventListener("invalid", () => {
    input.setAttribute("aria-invalid", true);

    const errorId = input.id + "Error";
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = input.validationMessage;
  });

  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", "false");

    const errorId = input.id + "Error";
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = "";
  });
});
