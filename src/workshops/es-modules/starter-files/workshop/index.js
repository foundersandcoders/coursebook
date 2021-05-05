function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(a, b, sign) {
  switch (sign) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      throw new Error(`Sign '${sign}' not supported`);
  }
}

const form = document.querySelector("form");
const output = document.querySelector("output");

function handleSubmit(event) {
  event.preventDefault();
  const a = +event.target.elements.a.value;
  const b = +event.target.elements.b.value;
  const sign = event.target.elements.sign.value;
  try {
    const result = calculate(a, b, sign);
    output.textContent = result;
  } catch (error) {
    console.error(error);
    output.textContent = "Something went wrong";
  }
}

form.addEventListener("submit", handleSubmit);
