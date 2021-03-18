---
title: Learn Unit Testing
description: Learn how to test that small individual parts of your code work in isolation.
tags:
  - workshop
  - js
keywords:
  - js
  - testing
---

Unit tests make sure that the smallest building blocks of an app are working correctly. Generally this means testing individual functions that do one thing. Unit testing is relatively simple to get started with, since you don't have to worry about how different parts of your code interact. You just call a single function and check the result was what you expected.

## Writing testable code

Testing is easier if you structure your code a certain way. This means making sure you have single-responsibility functions: e.g. `calculateTotal` and `updatePage` rather than a single `updatePageWithTotal` that does both at once.

It's also much easier to test "pure" functions. This means functions that always return the same output when given the same input (without changing anything else).

For example this is not pure:

```js
let url = "https://pokeapi.co/api/v2/";
function makeUrl(name) {
  url += name;
}
```

because it changes the `url` variable outside the function. It's not safe to call this multiple times:

```js
makeUrl("pikachu");
console.log(url); // "https://pokeapi.co/api/v2/pikachu"
makeUrl("bulbasaur"); // "https://pokeapi.co/api/v2/pikachubulbasaur"
```

This makes it tough to test since each time we run the function things are different.

This version is pure:

```js
function makeUrl(name) {
  const url = "https://pokeapi.co/api/v2/";
  return url + name;
}
```

which makes it much easier to test, since the results are predictable.

### Challenge

1. Open `workshop/index.js` in your editor and read the `makeUrl` definition
   - The `equal`, `notEqual` and `test` functions from the [Learn Testing](/workshops/learn-testing/) workshop are included on the page for you to use.
1. Open `workshop/index.test.js` and write a test for `makeUrl`
1. Open `workshop/index.html` and check your test passes

## Deep equality

Sometimes we'll need to test functions that return objects or arrays. This can be awkward as objects that _look_ the same are not equal to each other. For example:

```js
const x = { name: "oliver" };
const y = { name: "oliver" };
console.log(x === y); // Logs: false
```

Although `x` and `y` have the exact same _properties_ here, they are totally different objects. This means we cannot use the normal equality operators to check them.

We can work around this by testing if specific _properties_ of objects are the same. For example:

```js
console.log(x.name === y.name); // Logs: true
```

We can do the same for array elements (e.g. checking that the first thing in both arrays is the same).

Bear in mind this doesn't guarantee that _all_ the properties are the same, just the ones you check.

### Challenge

1. Open `workshop/index.js` in your editor
1. Write a `searchParamsToObject` function
   - It should take a form-encoded string like `"name=oliver&email=hello@oliverjam.es"`
   - It should return an object like `{ name: "oliver", email: "hello@oliverjam.es" }`
1. Write a test for this function in `workshop/index.test.js`

## Edge-cases

Unit tests are great for checking edge-cases. Since a unit is usually small and self-contained we can check it with all kinds of different input to make sure we get what we expect.

This is where manual testing gets very tedious: manually entering `0`, then `-1`, then `""`, then `"hello"`, then `99999999999999999` into an input to see what happens would take forever.

### Challenge

A [leap year](https://en.wikipedia.org/wiki/Leap_year) has an extra day (February 29th) to account for a solar year being about 365.24255 days long (not exactly 365). Leap years usually occur every 4 years, but in order to stay consistent there are extra rules: years divisible by 100 are **not** leap years, and years divisible by 400 **are** leap years.

For example `2020` and `2000` were leap years, but `1900` was not.

1. Write an `isLeapYear` function in `workshop/index.js`
1. It should take a year and either return an error message or a boolean
1. Write several tests to check your function works correctly
1. Make sure you account for and test all possible edge-cases
   - What happens if you pass a string?
   - What happens if you pass a negative year?
