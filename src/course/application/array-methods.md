# Arrays and array methods

Arrays allow us to store multiple values within a variable

```js
let myNumbers = [1, 2, 3, 5];

let myStrings = ["g", "re", "g", "or"];

let mixedVals = [true, 1, "12", 45];
```

A method is a function which is a property of an object. Some array methods include `push()`, `pop()`, and `concat()`.

## Example: the map method

JavaScript has a number of methods which take a function as a callback. We can use these to perform consistent actions on items in an array.

For example, the `map()` method returns a new array populated with the results of running a function on each item in an array.

See the example before for how we can implement this.

```js
// 1. Write a function which doubles the number given as an argument

function doubleNum(num) {
  return num * 2;
}

// 2. Use the map method, to call the doubleNum function

const map1Callback = numbersOne.map(doubleNum);
```

We can also define the function inside the method, either as an arrow function or an inline callback function.

```js
const map1Arrow = numbersOne.map((element) => element \* 2);

const map1InlineCallback = numbersOne.map(function timesTwo(element) {
return element \* 2;
});
```

## Project

Build a front-end which interacts with a set of functions. Each function focuses on using a different _array method_.

## Set-up

Open a new project in Stackblitz or VS Code. Set up HTML, CSS and JavaScript files and ensure they are connected with one another.

In your HTML, you'll need to have:

- An `<input>` tag which accepts a string
- A set of radio buttons which indicate which function the user will run
- Labels for each `input`
- A `button` for the user to click
- Somewhere to output the result

## Functions

Use the filter method on an array to fill a new array with the numbers which are divisible by two.

Use the reduce method, to return the total of the elements of the array it is called on.

## DOM Manipulation

Add JavaScript so that when the user clicks the button, one of the functions is run and the result is shown on the page.

The input should be given in the first input box as a string. The user should be able to enter numbers, separated by commas. In JavaScript, you'll convert this string to an array of numbers.

Based on which radio button is selected, choose which function to run. Pass an array as an argument to the particular function.

Finally, return the result from the function and display it on the page.

## User experience

Add CSS to give the user an intuitive experience

Think about and constrain what inputs can be given. The user may be inconsistent in the string they give, for example using spaces or not. How can we account for this, in JavaScript or HTML?
