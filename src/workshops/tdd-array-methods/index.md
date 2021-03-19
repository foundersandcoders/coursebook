---
title: TDD Array Methods
description: Learn about test-driven development and practice JS array methods
tags:
  - workshop
  - js
keywords:
  - js
  - arrays
  - testing
---

Test-driven development (TDD) is a methodology where you write tests _before_ you write any code. This forces you to think through exactly how your code should behave. It's kind of like planning an essay before you start writing it. The iterative process of writing each test is supposed to help with solving a problem too.

### TDD process

TDD generally follows the "red, green, refactor" cycle.

1. #### Red
   Write a test that fails. This is important: if you never see your test fail you might have a _false positive_ (a test that passes even if your code is broken).
1. #### Green
   Write as little code as possible to make the test pass. Make sure you don't break any existing tests.
1. #### Refactor
   Change your code to improve it (if necessary). You have passing tests to tell you if you break anything.
1. #### Repeat
   Go through the cycle until you think you have a complete working solution

### TDD example

Let's run through the process by creating a `double` function using TDD. First we write a failing test:

```js
test("double(2) should be 4", () => {
  equal(double(2), 4);
});
```

Then we write as little code as we need to make the test pass:

```js
function double(x) {
  return 4;
}
```

This will feel a bit contrived for a problem where we already know what the final code should be. The idea is not to try and solve the whole problem in one go—TDD is a way to help you solve a harder problem by iterating through solutions.

Then we refactor, if needed. Since we can't make this any simpler let's keep going and repeat the cycle. We need another failing test:

```js
test("double(4) should be 8", () => {
  equal(double(4), 8);
});
```

Once we see that fail we can amend our function to make it pass:

```js
function double(x) {
  if (x === 4) return 8;
  return 4;
}
```

Once the test passes we can try to refactor our function to remove repetition. Instead of listing every possible input/output, we can see that we need to return the input multiplied by two each time.

```js
function double(x) {
  return x * 2;
}
```

This solution looks complete, so we can end the TDD cycle here. It might be worth adding more tests for edge-cases (e.g. what happens when you don't pass any argument), but TDD has helped us solve the problem itself.

If you're confused about the TDD process at the end of the workshop you can check out the [tdd-explanation](./solution/tdd-explanation.js) solution for a step-by-step guide.

## Workshop

We're going to re-create some useful JavaScript array methods using TDD. For example if we're re-creating the `array.map` method we should use other JS features (like `for` loops) to create a function that does the same thing as `.map`, _without using `.map` itself_.

For each method you should use TDD to **write tests first**, then write the actual code. Work in pairs and alternate: person 1 writes a test, then person 2 makes it pass. Then person 2 writes the next test and person 1 makes that pass.

### Setup

1. Clone this repo
1. Open `index.html` in your browser
1. Alternate writing tests and code in `index.test.js` and `index.js`
1. You can see test results in the console

### `map`

[`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is used to transform each value in an array. It takes a function as an argument, then loops over each element in the array and calls the function with each one. Whatever that function returns is used as a new value in a new array.

```js
const arr = [1, 2, 3];
const newArr = arr.map((x) => x + 1); // [2, 3, 4]
```

Use TDD to write your own `map` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const newArr = map(arr, (x) => x + 1); // [2, 3, 4]
```

There is one passing test and one failing test to get you started.

### `filter`

[`Array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) is used to remove elements you don't want from an array. It takes a function as an argument, then loops over each element in the array and calls the function with each one. If the function returns true the element is kept, otherwise it is filtered out.

```js
const arr = [1, 2, 3];
arr.filter((x) => x > 1); // [2, 3]
```

Use TDD to write your own `filter` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const greaterThanOne = filter(arr, (x) => x > 1); // [2, 3]
```

### `every`

[`Array.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) is used to check whether every element in an array meets a certain criteria. It takes a function as an argument, then loops over each element in the array and calls the function with each one. If the function returns false for _any_ of the elements the iteration stops and `false` is immediately returned. If the function returns true for _every_ element then `true` is returned.

```js
const arr = [1, 2, 3];
const allPositive = arr.every((x) => x > 0); // true
const allNegative = arr.every((x) => x < 0); // false
```

Use TDD to write your own `every` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const allPositive = every(arr, (x) => x > 0); // true
const allNegative = every(arr, (x) => x < 0); // false
```

### `some`

[`Array.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) is used to check whether at least one element in an array meets a certain criteria. It takes a function as an argument, then loops over each element in the array and calls the function with each one. If the function returns true for _any_ of the elements the iteration stops and `true` is immediately returned. Otherwise it returns `false.

```js
const arr = [1, 2, 3];
const atLeastOneGreaterThanTwo = arr.some((x) => x > 2); // true
const atLeastOneNegative = arr.some((x) => x < 0); // false
```

Use TDD to write your own `some` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const atLeastOneGreaterThanTwo = some(arr, (x) => x > 2); // true
const atLeastOneNegative = some(arr, (x) => x < 0); // false
```

### `find`

[`Array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) is used to get the first element in an array that meets a certain criteria. It takes a function as an argument, then loops over each element in the array and calls the function with each one. If the function returns true for the element the iteration stops and the element is immediately returned. If the function returns false for every element then `undefined` is returned.

```js
const arr = [1, 2, 3];
const firstElementOverOne = arr.find((x) => x > 1); // 2
```

Use TDD to write your own `find` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const firstElementOverOne = find(arr, (x) => x > 1); // 2
```

### `reduce`

[`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) is used to transform an array into a single value. It takes a function and an initial "accumulator" value as arguments. It loops over the array, building up the accumulator on each loop.

The function is called with the current value of the accumulator and the current element. Whatever you return from the function is used as the accumulator value for the next iteration. After the final element the final accumulator value is returned.

```js
const arr = [1, 2, 3];
const finalTotal = arr.reduce((total, x) => total + x, 0);
// 1st loop (total = 0, x = 1) => 0 + 1; returns new total: 1
// 2nd loop (total = 1, x = 2) => 1 = 2; returns new total: 3
// 3rd loop (total = 3, x = 3) => 3 + 3; returns new total: 6
```

Use TDD to write your own `reduce` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, 2, 3];
const finalTotal = reduce(arr, (total, x) => total + x, 0); // 6
```

### Stretch goal: `flat`

[`Array.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) is used to turn nested arrays into "flattened" ones. It takes an optional depth argument to flatten arrays nested more than one level down.

```js
const arr = [1, [2, [3]]];
const oneLevelFlatter = arr.flat(); // [1, 2, [3]]
const fullyFlattened = arr.flat(2); // [1, 2, 3]
```

Use TDD to write your own `flat` function that behaves like the built-in one. The only difference should be that yours takes the array as the first argument:

```js
const arr = [1, [2, [3]]];
const oneLevelFlatter = flat(arr); // [1, 2, [3]]
const fullyFlattened = flat(arr, 2); // [1, 2, 3]
```

**Hint**: recursion or `while` loops will be helpful.
