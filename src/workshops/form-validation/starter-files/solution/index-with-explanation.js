const form = document.querySelector("form");

// disable native validation since we're creating our own with JS
form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  // check the validity of all inputs: returns true if all valid
  // also fires the "invalid" event on all invalid inputs
  const allInputsValid = event.target.checkValidity();

  if (!allInputsValid) {
    // stop the form submitting if an input is invalid
    event.preventDefault();
  }
});

// listen for the invalid event on every input inside the form
const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  // inputs should be valid at first
  input.setAttribute("aria-invalid", false);

  // runs for each invalid input when we call checkValidity() above
  input.addEventListener("invalid", () => {
    // the input should be marked invalid now
    input.setAttribute("aria-invalid", true);

    // update the error div with the right message
    const errorId = input.id + "Error";
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = input.validationMessage;
  });

  // mark input as valid again when the user edits it
  input.addEventListener("input", () => {
    // input should be marked valid when the user changes it
    input.setAttribute("aria-invalid", "false");

    // clear the message
    const errorId = input.id + "Error";
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = "";
  });
});
