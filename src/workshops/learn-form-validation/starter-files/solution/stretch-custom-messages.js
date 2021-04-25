const form = document.querySelector("form");

form.setAttribute("novalidate", "");

form.addEventListener("submit", (event) => {
  const allInputsValid = event.target.checkValidity();
  if (!allInputsValid) {
    event.preventDefault();
  }
});

// Store messages by input ID, then error type
const messages = {
  email: {
    valueMissing: "Please enter an email.",
    typeMismatch: "Please enter a valid email.",
  },
  password: {
    valueMissing: "Please enter a password.",
    patternMismatch: "Please include at least one number.",
    tooShort: "Please enter at least 8 characters.",
  },
};

function getMessage(input) {
  // get the right set of messages for this specific input
  const inputMessages = messages[input.id];
  const validity = input.validity;

  if (validity.valueMissing) {
    return inputMessages.valueMissing;
  } else if (validity.typeMismatch) {
    return inputMessages.typeMismatch;
  } else if (validity.patternMismatch) {
    return inputMessages.patternMismatch;
  } else if (validity.tooShort) {
    return inputMessages.tooShort;
  }
}

const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  input.setAttribute("aria-invalid", false);

  input.addEventListener("invalid", handleInvalidInput);

  input.addEventListener("input", () => {
    input.setAttribute("aria-invalid", "false");

    const errorId = input.id + "Error";
    const errorContainer = form.querySelector("#" + errorId);
    errorContainer.textContent = "";
  });
});

function handleInvalidInput(event) {
  const input = event.target;

  input.setAttribute("aria-invalid", true);

  const message = getMessage(input);
  const errorId = input.id + "Error";
  const errorContainer = form.querySelector("#" + errorId);
  errorContainer.textContent = message;
}
