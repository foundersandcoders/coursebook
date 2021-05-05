import calculate from "./calculate.js";

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
