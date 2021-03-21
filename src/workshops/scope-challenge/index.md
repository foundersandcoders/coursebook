---
title: Scope debugging challenge
description: Practice your understanding of variable scoping by debugging a JS app
tags:
  - workshop
  - js
keywords:
  - js
  - scope
  - debugging
---

Scope is the context a variable is available in. It defines what variables can be used in each part of your code. There are two kinds of scope: global and local.

## Global scope

Everything at the "top-level" of your code is global. This means anything outside of functions or "blocks" like `if` statements.

The global scope is also shared across all normal script tags. This can be confusing as you can use variables that don't appear to exist in that JS file. For example:

```html
<!-- index.html -->
<script src="first.js"></script>
<script src="second.js"></script>
```

```js
// first.js
const x = 10;
```

```js
// second.js
console.log(x); // Logs: 10
```

## Local scope

Variables inside of functions or "blocks" are locally scoped. A block is created by curly brackets, like `if` statements.

Local variables are not visible or usable outside of that function or block.

```js
function square(x) {
  const result = x * x;
  return result;
}
console.log(result); // ReferenceError: result is not defined
```

## Nested scope

A local scope always has access to the scopes _above_ it.

```js
function square(x) {
  if (typeof x !== "number") {
    const err = `${x} should be a number`; // can see x as it is "above" this scope
    return err;
  }
  console.log(err); //ReferenceError: err is not defined
  return x * x;
}
```

Here the `if` block can see the `x` variable as that is defined in the scope "above". However the `console.log(err)` will fail as the `err` variable is defined inside a block—a "lower" scope.

Think of your code as a series of nested one-way mirrors: code can see out into the scopes above, but not further down.

## ES6

Variables defined with `var` are _not_ block scoped, whereas those defined with `let` and `const` are. `var` is still function scoped though.

```js
if (true) {
  var y = 2;
  const z = 3;
}
console.log(y); // Logs: 2
console.log(z); // ReferenceError: z is not defined
```

Generally you should always prefer `let` and `const`, since it can be confusing for variables to be accessible outside of a block.

## Challenge

1. Open `starter-files/challenge/index.html` in your browser
1. You should see a JS error in the console.
1. Fix this error, and every other error that shows up

Don't worry about understanding all of the code, just try to make it work. This is mostly an exercise in [debugging](/course/handbook/debugging/), so keep persisting until the app works like [the solution](starter-files/solution/):

<figure>
  <img src="https://user-images.githubusercontent.com/9408641/76011766-0a492200-5f0d-11ea-9d20-a8676725255d.gif" alt="Colourful circles appearing as I click on a web page">
  <figcaption>Click and hold to create colourful circles</figcaption>
</figure>
