---
title: Promise practice
description: Practice using promises to avoid "callback hell" in asynchronous JavaScript
tags:
  - workshop
  - js
keywords:
  - js
  - promises
  - async
---

Running functions in sequence (one after another) is a common requirement. For example, triggering animations in order, or requesting some data then sending that response on to another API.

If your code is synchronous it's easy to make it run in order: that's what JavaScript does automatically. Each line of code runs one by one:

```js
console.log("green");
console.log("amber");
console.log("red");
// etc
```

However once you have asynchronous code this gets harder to manage. You don't know how long each bit of code will take, so you have to make sure each line of code waits for the previous one.

We've previously [used callbacks to solve this](/workshops/functions-callbacks-async/):

```js
light("green", () => {
  light("amber", () => {
    light("red"); // etc
  });
});
```

However this quickly gets difficult to manage as each new callback introduces another level of nesting.

Promises make it easier to run code in sequence. A promise object's `.then` method returns a _new promise_ that resolves with whatever value you returned from the callback you passed in.

Here we have a promise that will eventually resolve with the value `1`:

```js
const onePromise = resolvesWithOne();
```

We can access this value using the promise's `.then` method:

```js
const onePromise = resolvesWithOne();
onePromise.then((value) => console.log(value));
// Logs 1 (eventually)
```

Since `.then` returns a new promise we can assign it to a variable and use it again:

```js
const onePromise = resolvesWithOne();
const fivePromise = onePromise.then((value) => value * 5);
fivePromise.then((value) => console.log(value));
// Logs 5 (eventually)
```

Here we wait for `onePromise` to resolve with `1`, then multiply that by `5` and return the result. This creates a _new promise_ that will eventually resolve with `5`. We can then access this value by using the `.then` method of this second promise.

Since each `.then` returns a new promise object we can avoid all the extra variables and chain the `.then` methods directly:

```js
resolvesWithOne() // <- returns a promise that resolves with 1
  .then((value) => value * 5) // <- returns a promise that resolves with (1 * 5)
  .then((value) => console.log(value)); // <- returns a promise that resolves with undefined
// Logs 5 (eventually)
```

This example is a bit silly since multiplication is synchronous—we can just use `value * 5` directly without the second `then`. However since `.then`s always return new promises we can chain _asynchronous_ operations together to avoid nesting our callbacks.

Imagine we had another function that multiplied numbers after 2 seconds:

```js
resolvesWithOne().then((value) => {
  const fivePromise = multipliesEventually(value, 5);
  fivePromise.then((finalValue) => {
    console.log(finalValue);
  });
});
// Logs 5 (eventually)
```

Here we're starting to recreate our "callback hell" from the traffic lights example. Each new asynchronous operation means nesting a callback one level deeper.

However since each `.then` returns a promise we can return our `fivePromise` promise and access in it the _next_ `.then`:

```js
resolvesWithOne()
  .then((value) => {
    const fivePromise = multipliesEventually(value, 5);
    return fivePromise;
  })
  .then((finalValue) => {
    console.log(finalValue);
  });
// Logs 5 (eventually)
```

Since all we do with the `fivePromise` variable is return it we can skip defining it and simplify our code to:

```js
resolvesWithOne() // <- returns a promise that resolves with 1
  .then((value) => multipliesEventually(value, 5)) // <- returns a promise that resolves with (1 * 5)
  .then((finalValue) => console.log(finalValue));
// Logs 5 (eventually)
```

The magic part is that we can return sync _or_ async operations from a `.then`—promise objects don't care what kind of value is inside them. The next `.then` in the chain will always wait for the previous value to be ready.

### Challenge 1: traffic lights again

You're going to recreate the traffic lights from the callback workshop, but using promises to avoid nesting your callbacks.

1. Download the starter files and open `challenge-1/index.html`
1. The pre-defined `wait` function is like `setTimeout`, except it returns a promise that resolves after waiting the specified number of milliseconds
1. Use `wait` to write a `light` function. This should:
   - Take a colour string argument
   - Wait 1 second then log this string
1. Use `light` to log a sequence of traffic light colours with a one second pause between each
   E.g. `"green", "amber", "red", "amber", "red", "green", "finished"`

Try not to let your callbacks go beyond a single level of nesting!

### Challenge 2: Pokémon shape

You probably won't be programming traffic lights using JavaScript, so let's try a more realistic example.

APIs often require you to make request to multiple different URLs to get all the data you need. For example the [PokéAPI](https://pokeapi.co/) returns Pokémon objects with properties containing followup URLs with extra information (since it would make for a very big initial response if they included everything).

1. Open `challenge-2/index.html`
1. Use `fetch` to request data from `"https://pokeapi.co/api/v2/pokemon/pikachu"`
1. Once your code has the response it should grab the `species.url` property and make a new request to that
1. Once your code has that response it should grab the `shape.url` property and make a final request to that
1. Log the final response body. It should look something like this:
   ```json
   {
    "awesome_names": [...],
    "id": 8,
    "name": "quadruped",
    "names": [...],
    "pokemon_species": [...]
   }
   ```

Try not to let your callbacks go beyond a single level of nesting!
