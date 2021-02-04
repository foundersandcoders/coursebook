---
title: First-class functions
description: In JavaScript functions are treated like any other variable. This is sometimes referred to as “first-class functions”. The concept can be confusing, so let's look at some examples.
setup:
  - Open `workshop.html` in your editor
  - Write new code inside the `<script>` tag
tags:
  - workshop
  - http
  - js
  - functions
  - fundamentals
---

## Functions are variables

When you create a function in JS you are creating a normal variable:

```js
function returnsOne() {
  return 1;
}
// we now have a variable named returnsOne
```

This is still true (and perhaps more obvious) for arrow functions:

```js
const returnsOne = () => 1;
```

You can reference this variable the same way you would any other (using its name):

```js
console.log(returnsOne);
// logs something like: `function returnsOne()`
```

### Challenge

We can pass functions to other functions as arguments.

1. Write a function named `logger`
1. It should take one argument and log it to the console
1. Call `logger` with the `returnsOne` function as an argument

<details>
<summary>Answer</summary>

```js
function logger(thing) {
  console.log(thing);
}

logger(returnsOne);
// function returnsOne()
```

</details>

## Functions are _callable_

The main distinction between a function and other types of variable is that you can _call_ a function. You call a function by putting parens (normal brackets) after it:

```js
returnsOne();
```

Calling a function will run the lines of code inside of it. We can either reference the called function directly or assign it to a named variable.

```js
console.log(returnsOne()); // 1

const myValue = returnsOne();
console.log(myValue); // 1
```

If the function returns nothing you'll get `undefined`:

```js
function returnsNothing() {
  // doesn't have a return statement
}
const myValue = returnsNothing();
console.log(myValue); // undefined
```

## Challenge

This is often a source of confusion when passing functions as arguments.

1. Add another call to `logger`, but this time pass in `returnsOne()`
1. Why do we see a different value logged?

   <details>
   <summary>Answer</summary>

   ```js
   function logger(thing) {
     console.log(thing);
   }

   logger(returnsOne);
   // Logs the function itself: `function returnsOne()`

   logger(returnsOne());
   // Logs the function's return value: `1`
   ```

  </details>

1. Edit `logger` to use `typeof` to log the type of the value

   <details>
   <summary>Answer</summary>

   ```js
   function logger(thing) {
     console.log(typeof thing);
   }

   logger(returnsOne);
   // function

   logger(returnsOne());
   // number
   ```

   </details>

## Inline functions

Another source of confusion is functions defined inline. This is a common pattern for passing functions as arguments to other functions (for example as event listeners):

```js
window.addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY);
});
```

## Challenge

1. Type the event listener code into your editor
1. Extract the inline function and assign it to a variable
1. Use the extracted function as your event listener

<details>
<summary>Answer</summary>

```js
const handleClick = (event) => {
  console.log(event.clientX, event.clientY);
};

window.addEventListener("click", (event) => handleClick(event));
// OR
window.addEventListener("click", handleClick);
// We don't need an extra arrow function if all it does is
// forward arguments on to the function we actually care about
```

It's important to note that we don't want to _call_ our function when we pass it here. This won't work as we need to pass a function, not its return value:

```js
const handleClick = (event) => {
  console.log(event.clientX, event.clientY);
};

window.addEventListener("click", handleClick());
// this is equivalent to:
// window.addEventListener("click", undefined);
// since handleClick doesn't return anything
```

</details>

## Callbacks

"Callback" is a scary word, but you've actually been using them the whole time. A callback is a function passed to another function as an argument. The name refers to what callbacks are usually used for: "calling you back" with a value when it's ready.

For example the `addEventListener` above takes a function that it will call when the `"click"` event happens. We're telling the browser "hey, call us back with the event info when that event happens".

Functions are effectively a way to _delay_ execution of a block of code. Without them all our statements would run in order all in one go, and we'd never be able to wait for anything or react to user input.

### Challenge

1. Write a function `one` that takes a callback as an argument
1. It should call the callback with `1`
1. Call your `one` function and pass in a callback that logs its argument

<details>
<summary>Answer</summary>

```js
function one(callback) {
  callback(1);
}

one((x) => console.log(x));
// OR
one(console.log);
// the extra wrapper arrow fn isn't needed, since all it does
// is forward its argument on to console.log (which is already a fn)
```

</details>

## Async

The callback above might feel a bit pointless: why not just have the `one` function _return_ `1`? Callbacks make more sense when dealing with _asynchronous_ code. Sometimes we don't have a value to return straight away.

For example network requests and timeouts can take multiple seconds to complete. JavaScript doesn't wait for these—it keeps on going and executes the next statements in the script.

```js
console.log(1);
setTimeout(() => console.log(2), 1000);
console.log(3);
// 1, 3, then (after one second) 2
```

Our `addEventListener` from above can't return the click event, since it hasn't happened yet. So instead we pass a callback that it will run when it has the event.

### Challenge

1. Write a function `asyncDouble` that takes 2 arguments: a number and a callback
1. It should use `setTimeout` to wait one second
1. Then it should call the callback argument with the number argument multiplied by 2
1. Call `asyncDouble` with `10` and a callback that logs whatever it is passed. You should see `20` logged after 1 second.
1. Can you see why `asyncDouble` can't just return the doubled value?

<details>
<summary>Answer</summary>

```js
function asyncDouble(num, callback) {
  setTimeout(() => callback(num * 2), 1000);
}

asyncDouble(10, (x) => console.log(x));
// OR
asyncDouble(10, console.log);
// (after one second) logs `20`
```

</details>

## Workshop

Let's make some traffic lights.

1. Write a function `light` that takes two arguments: a string and a callback
1. It should wait 1 second, log the string and then call its callback argument
1. Use `light` to log each colour of a traffic light sequence, in order, followed by `"finished"`
   - e.g. `"green"`, `"amber"`, `"red"`, `"amber"`, `"green"`, `"finished"`

### Bonus (if you have time)

Traffic light patterns are a bit more complex. The sequence should actually be `"green"`, `"amber"`, `"red"`, `"red"` and `"amber"` (at the same time), `"green"`. Without changing `light`, create the new sequence.
