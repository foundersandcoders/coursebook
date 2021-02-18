---
title: Functions, callbacks, & async JavaScript
description: Learn how functions work, and how to manage asynchronous JavaScript code using callbacks.
tags:
  - workshop
  - js
keywords:
  - js
  - functions
  - async
  - timers
---

In JavaScript functions are treated like any other variable. This concept is sometimes referred to as “first-class functions”. It lets us use functions in some interesting ways, and helps us manage "asynchronous" code.

## Functions are variables

When you create a function in JS you are creating a normal variable:

```js
function returnsOne() {
  return 1;
}
```

This code creates a new variable named `returnsOne`.

This is still true (and maybe more obvious) for arrow functions:

```js
const returnsOne = () => 1;
```

This code _also_ creates a new variable named `returnsOne`. Notice how this is similar to defining a different type of variable:

```js
const num = 1;
```

You can reference this variable the same way you would any other (by using its name):

```js
console.log(returnsOne);
// logs something like: `function returnsOne()`
```

Since functions are normal variables you can even pass them as arguments to _other_ functions.

### Mini-challenge 1

Lets try passing a function as an argument to another function. Since we're just playing around to see what happens we can write this code in the console on this page. Open up the console and try this:

1. Write a function named `logger`
1. It should take one argument, then log that argument
1. Call `logger` with the `returnsOne` function as an argument

What does the browser print?

<details class="disclosure flow pad-md border-xl">
<summary class="button">Toggle answer</summary>

```js
function logger(thing) {
  console.log(thing);
}

logger(returnsOne);
```

In Chrome this logs something like:

```
ƒ returnsOne() {
  return 1;
}
```

If you defined `returnsOne` with an arrow function it might log something like this instead:

```
() => 1;
```

The browser is showing the _value_ stored in the variable. It's the same as if we ran:

```js
const num = 1;
logger(num);
```

This would log `1` to the console.

</details>

## Functions are callable

The main distinction between a function and other types of variable is that you can _call_ a function. You call a function by putting parentheses (round brackets) after it:

```js
returnsOne();
```

Calling a function will run the lines of code inside of it. This is useful for two reasons:

1. Functions let us _reuse_ code without copy/pasting it.
1. Functions let us _delay_ running code until we're ready.

### Returning values

Functions need to be able to talk to each other. This is how you create a more complex program. You compose together a bunch of functions, passing the output of one into another.

The `return` keyword lets us control what value we get after calling a function. Our `returnsOne` function always returns a value of `1`. When you _call_ a function the lines of code inside are run, and the function spits out its return value in place. You can then use this returned value however you like.

You can save it as a new variable:

```js
const answer = returnsOne();
console.log(answer);
// This will log `1`
```

Here you can imagine that `returnsOne()` replaces itself with its return value. It's the same as if we'd written `const answer = 1` directly.

You can also use the called function directly without an intermediary variable:

```js
console.log(returnsOne());
// This will also log `1`
```

Here the same thing happens. `returnsOne()` replaces itself with its return value. It's the same as if we'd written `console.log(1)` directly.

If the function doesn't have a `return` statement you'll get `undefined`:

```js
function returnsNothing() {
  const x = 3 + 5;
  // doesn't have a return statement
  // the x variable is basically thrown away
}
const answer = returnsNothing();
console.log(answer);
// This will log `undefined`
```

Calling or not calling a function is often a source of confusion when passing functions as arguments to _other_ functions.

### Mini-challenge 2

1. Open your console and recreate your `logger` function from above
1. Call `logger`, but this time pass in `returnsOne()` (don't forget the parentheses)
1. Why do we see a different value logged than before?

1. Edit `logger` to log the _type_ of the value using the `typeof` operator

<details class="disclosure flow pad-md border-xl">
<summary class="button">Toggle answer</summary>

```js
function logger(thing) {
  console.log(thing);
}
```

If we call `logger` with the function itself:

```js
logger(returnsOne);
```

we see the _function_ logged as before:

```
ƒ returnsOne() {
  return 1;
}
```

However when we _call_ the function and log that:

```js
logger(returnsOne());
```

we see the the function's _return value_ logged:

```
1
```

If we amend `logger` to log the type of its argument:

```js
function logger(thing) {
  console.log(typeof thing);
}
```

we can see that in the first case `thing` is a _function_, whereas in the second case its a _number_:

```js
logger(returnsOne);
// Logs: "function"

logger(returnsOne());
// Logs: "number"
```

</details>

## Inline functions

You can also define functions _inline_: i.e. directly as you're using them. This is a common pattern for passing functions as arguments to other functions. For example we could re-write our `logger` example:

```js
logger(function () {
  return 1;
});
```

Here we're defining a new function _inline_ at the same time that we're passing it to `logger`. This is a little hard to read, which is why most developers use arrow functions for inline functions like this:

```js
logger(() => 1);
```

This has the same result as before, when we defined a separate `returnsOne` variable and passed it by name. The main difference here is we can't re-use the function, since it only exists as an argument to `logger`.

### Mini-challenge 3

Inline functions are often used for event listeners in the DOM. For example this code will log wherever the user clicks on the window:

```js
window.addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY);
});
```

1. Open your console and enter the event listener above
1. Extract the inline function and assign it to a named variable
1. Pass your extracted function variable to `addEventListener` instead

The event listener should work the same whether your function is inlined or defined as a separate variable.

<details class="disclosure flow pad-md border-xl">
<summary class="button">Toggle answer</summary>

```js
const handleClick = (event) => {
  console.log(event.clientX, event.clientY);
};

window.addEventListener("click", handleClick);
```

We have defined a named variable `handleClick` and assigned the previously inlined function as its value. We then pass this variable to `addEventListener` (since it expects a function as its second argument).

You may have done something like this:

```js
window.addEventListener("click", (event) => handleClick(event));
```

This will achieve the same result, and is not incorrect. However it adds an unnecessary extra function: we're defining an inline arrow function that takes an event argument, then passes that on to the `handleClick` function.

Since `addEventListener` will call whatever function is passed in with the event argument we don't need this extra function.

It's important to note that we don't want to _call_ our function when we pass it. This won't work since `addEventListener` expects to be passed a `function`. Remember if we put parentheses after the function name then we're effectively passing its _return value_ instead.

```js
window.addEventListener("click", handleClick());
```

Since `handleClick` doesn't return anything this is equivalent to:

```js
window.addEventListener("click", undefined);
```

</details>

## Callbacks

"Callback" is a scary word, but you've actually been using them the whole time. A callback is **a function passed to another function as an argument**. The name refers to what callbacks are usually used for: "calling you back" with a value when it's ready.

For example the `addEventListener` above takes a function that it will call when the `"click"` event happens. We're telling the browser "hey, call us back with the event info when that event happens".

Functions are a way to _delay_ a block of code. Without them all our statements would run in order all in one go, and we'd never be able to wait for anything or react to user input.

### Mini-challenge 4

1. Write a function named `one` that takes a function as an argument
1. It should call that function with `1`
1. Call your `one` function and pass in a function that logs its argument

<details class="disclosure flow pad-md border-xl">
<summary class="button">Toggle answer</summary>

```js
function one(callback) {
  callback(1);
}
```

The `one` function has a single argument: `callback`. Since we know `callback` is going to be a function we can call it using parentheses, and pass in `1`.

To use our `one` function we need to pass in a function (the callback):

```js
one((x) => console.log(x));
```

We could also define this callback as a separate named variable instead of inlining it, just like in our event listener example above:

```js
const log = (x) => console.log(x);
one(log);
```

</details>

## Asynchronous callbacks

The callback above might feel a bit convoluted: why pass in a callback to access a variable from inside when we could make the `one` function _return_ `1` directly?

Callbacks make more sense when dealing with _asynchronous_ code. Sometimes we don't have a value to return straight away.

### What is "asynchronous" code?

JavaScript is a "single-threaded" language. This means things generally happen one at a time, in the order you wrote the code.

```javascript
console.log(1);
console.log(2);
console.log(3);
// This logs 1, then 2, then 3
```

When something needs to happen out of this order, we call it "asynchronous" ("async" for short). JavaScript handles this using a "queue". Anything async gets pushed out of the main running order and into the queue. Once JS finishes what it was doing it moves on to the first thing in the queue.

```javascript
console.log(1);
setTimeout(() => console.log(2), 1000);
console.log(3);
// This logs 1, then 3, then (after about 1 second) logs 2
```

`setTimeout` is a global function that lets you run some code after a specified wait time.

It's intuitive that the above example logs `2` last, because JS has to wait a whole second before running the function passed to `setTimeout`.

What's less intuitive is that the order is the same even with a timeout of 0ms.

```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
// This logs 1, then 3, then (as soon as possible) logs 2
```

This is because `setTimeout` always gets pushed to the back of the queue—the specified wait time just tells JS the _minimum time_ that has to pass before that code is allowed to run.

### How do callbacks help?

Callbacks let us access values that may not be ready yet. Imagine ordering food in a takeaway. If you just get a pre-packaged sandwich they might be able to hand it to you straight away. This is "synchronous"—they can give you what you need then move on to the next person in the queue.

However if your food needs to be cooked you might give them your phone number, so they can text you when it's ready. This is "asynchronous"—they can move on to the next person in the queue, and "call you back" to collect your food later.

Our `addEventListener` example from above can't _return_ the click event, since it hasn't happened yet. It won't know where the user clicked until the click happens. So instead we pass a callback that the browser will run for us when the user clicks somewhere. It calls this callback with the event object containing the info we need.

### Mini-challenge 5

1. Write a function `asyncDouble` that takes 2 arguments: a number and a callback
1. It should use `setTimeout` to wait one second
1. Then it should call the callback argument with the number argument multiplied by 2
1. Call `asyncDouble` with `10` and a callback that logs whatever it is passed. You should see `20` logged after 1 second.
1. Can you see why `asyncDouble` can't just return the doubled value?

<details class="disclosure flow pad-md border-xl">
<summary class="button">Toggle answer</summary>

```js
function asyncDouble(num, callback) {
  setTimeout(() => callback(num * 2), 1000);
}

asyncDouble(10, (x) => console.log(x));
// (after one second) logs `20`
```

`asyncDouble` takes two arguments: `num` (the number to be doubled) and `callback`, the function it should call with the doubled number once it's ready.

It uses `setTimeout` to queue up a function to run in 1000ms. This function calls the `callback` argument and passes in the doubled number.

It can't _return_ the doubled number since JS code executes synchronously in order. We don't have the result ready to return straight away—only after 1000ms passes.

(Obviously we _could_ double a number synchronously—the timeout is for example's sake. Imagine we're sending a request over a slow Wi-Fi network and it takes a whole second to get the result back)

</details>

---

## Workshop

Let's use callbacks to make some traffic lights. Download the starter files using the command at the top of this workshop. Open `challenge/index.html` in your editor.

1. Inside the `script` tag write a function `light` that takes two arguments: a string and a callback
1. It should wait 1 second, log the string and then call its callback argument
1. Use `light` to log each colour of a traffic light sequence, in order, followed by `"finished"`
   - e.g. It should log:
   ```
   green
   amber
   red
   amber
   green
   finished
   ```
   with a 1 second pause before each colour
