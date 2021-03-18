test("Can add numbers", () => {
  equal(calculate(1, "+", 2), 3);
  equal(calculate(100000, "+", 27.5), 100027.5);
});

test("Can subtract numbers", () => {
  equal(calculate(3, "-", 2), 1);
  equal(calculate(100000, "-", 27.5), 99972.5);
});

test("Can multiply numbers", () => {
  equal(calculate(4, "*", 3), 12);
  equal(calculate(10.5, "*", 27.5), 288.75);
});

test("Can divide numbers", () => {
  equal(calculate(4, "/", 2), 2);
  equal(calculate(10.5, "/", 2.5), 4.2);
});

test("Errors for invalid sign", () => {
  equal(calculate(4, "$", 2), "Please enter a valid sign (+, -, *, /)");
});

test("Can add string numbers", () => {
  equal(calculate("1", "+", "2"), 3);
});

test("calculator multiplies numbers and updates the page correctly", () => {
  // get all three inputs
  const aInput = document.querySelector("input[name='a']");
  const signInput = document.querySelector("select");
  const bInput = document.querySelector("input[name='b']");

  // enter test data into inputs
  aInput.value = "2";
  signInput.value = "*";
  bInput.value = "3";

  // submit the form
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.click();

  // verify that the page contains the expected result
  const result = document.querySelector("#result");
  equal(result.textContent, "6");

  // reset the page so it doesn't affect anything else
  result.textContent = "";
});
