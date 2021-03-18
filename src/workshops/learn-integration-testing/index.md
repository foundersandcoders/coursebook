---
title: Learn Integration Testing
description: Learn how to use integration tests to make sure the different parts of your application work together correctly.
tags:
  - workshop
  - js
keywords:
  - js
  - testing
---

Integration tests check that whole features of your code work correctly. This usually involves checking several _units_ of code at once.

## Testing application logic

Usually some of your code is devoted to "application logic". This is where you coordinate several other bits of code, possibly with branching logic depending on some conditions. Imagine we were building a calculator:

```js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function calculate(a, sign, b) {
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
      return "Please enter a valid sign (+, -, *, /)";
  }
}
```

We could individually unit test all the small maths functions, but that would be a lot of work. Instead we can write tests for the `calculate` function. If we verify that gives the right answer then we know the smaller functions must work. We're also testing how our application _integrates_ those small units together. If we only unit tested our maths functions we could miss that our app was still totally broken (e.g. if there was a mistake in our `switch`).

### Challenge

1. Open `workshop/index.js` in your editor and read the `calculate` function
1. Open `workshop/index.test.js` and write tests for the `calculate` function.
   - The `equal`, `notEqual` & `test` functions from [Learn Testing](/workshops/learn-testing/) are included on the page.
   - You should have one test for each branch of the switch statement.
   - Open `workshop/index.html` and check the console to see your test results
   - Don't worry about the UI on the page for now
1. What happens if we provide non-numerical input?
   - Write a test that calls `calculate` with strings instead of numbers.
1. Change `calculate` so that it can handle numbers passed as strings
   - hint: have a look at [`parseFloat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

## Testing UI logic

Integration tests can also check where our code integrates with things outside our control. For example web apps often have to update the DOM to show results to the user. We didn't write the DOM code (that's part of the browser), but we still need to make sure our code integrates with it correctly.

We can write our tests to simulate a real user browsing the site. For example here is a form that takes user input and makes it uppercase:

```html
<form>
  <label for="text">Enter text to be uppercased</label>
  <input type="text" id="text" name="text" />
  <button type="submit">Submit</button>
  <output id="result"></output>
</form>
<script>
  const form = document.querySelector("form");
  const result = document.querySelector("#result");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = form.elements.text.value; // get the value of the name="text" input
    const uppercased = value.toUpperCase(); // uppercase the value
    result.textContent = uppercased; // put the result on the page
    form.reset(); // clear the form inputs for next time
  });
</script>
```

Imagine we wanted to check that our code worked correctly. We would open the page in our browser, then follow these steps:

1. Find the input we want
1. Change the input's value to "test"
1. Click the submit button
1. Check the result on the page is "TEST"

We can write an automated test using JS that does exactly the same thing.

```js
test("Uppercases the user's input and updates the page", () => {
  const input = document.querySelector("input"); // step 1
  input.value = "test"; // step 2
  const submitButton = document.querySelector("button[type='submit']");
  submitButton.click(); // step 3
  const result = document.querySelector("#result");
  equal(result.textContent, "TEST"); // step 4
  result.textContent = ""; // reset the page so it doesn't affect the page/other tests
});
```

### Challenge

1. Open `workshop/index.html` in your editor. You should see a basic calculator form.
1. Add a test to `workshop/index.test.js` that checks the form works correctly, just like the example above.
