import { add, subtract, multiply, divide } from "./math.js";

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

export default calculate;
