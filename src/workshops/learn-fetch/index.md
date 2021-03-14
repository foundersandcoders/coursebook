---
title: Learn Fetch & Promises
description: Learn how promises make asynchronous JS easier to manage, then make HTTP requests using the fetch method
tags:
  - workshop
  - js
keywords:
  - js
  - promises
  - fetch
---

We're going to learn how to make HTTP requests in JavaScript. This is made possible by the `fetch` function, which uses something called "promises" to manage async code. Here's a really quick example of what it looks like before we dive in:

```js
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then((response) => {
  console.log(response);
});
```

## Asynchronicity

Before we look at promises, lets make sure we understand what problem they solve.

JavaScript is a single-threaded language. This means things generally happen one at a time, in the order you wrote the code.

```javascript
console.log(1);
console.log(2);
console.log(3);
// logs 1, then 2, then 3
```

When something needs to happen out of this order, we call it _asynchronous_. JavaScript handles this using a "queue". Anything asynchronous gets pushed out of the main running order and into the queue. Once JS finishes what it was doing it moves on to the first thing in the queue.

```javascript
console.log(1);
setTimeout(() => console.log(2), 1000);
console.log(3);
```

This code logs `1`, then `3`, then (after 1 second) logs `2`.

It's intuitive that the above example logs `2` last, because JS has to wait a whole second before running the function passed to `setTimeout`.

What's less intuitive is that this is the same even with a timeout of 0ms.

```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
```

This code logs `1`, then `3`, then (as soon as possible) logs `2`.

This is because `setTimeout` always gets pushed to the back of the queue—the specified wait time just tells JS the _minimum time_ that has to pass before that code is allowed to run.

## Callbacks

We can use callbacks (functions passed as arguments to other functions) to access async values or run our code once some async task completes. In fact the first argument to `setTimeout` above is a callback. We pass a function which `setTimeout` runs once the timeout has finished.

Callbacks can be fiddly to deal with, and you can end up with very nested function calls if you have to chain lots of async stuff. Here's a contrived example:

```js
getStuff((stuff) => {
  getOtherStuff((otherStuff) => {
    getThirdStuff((thirdStuff) => {
      getEvenMoreStuff((finalStuff) => {
        console.log(finalStuff);
      });
    });
  });
});
```

This is often referred to as "callback hell". In more realistic code with error handling etc it can be pretty hard to follow.

Here's how that would look if each function returned a promise instead:

```js
getStuff()
  .then(getOtherStuff)
  .then(getThirdStuff)
  .then(getEvenMoreStuff)
  .then(console.log);
```

Our code stays "flat" at the same level no matter how many async things happen.

## What is a promise?

Promises are a special type of object. They allow us to represent the _eventual result_ of async code. A function that executes asynchronously can return a promise object instead of the final value (which it doesn't have yet).

For example when we fetch some data from a server we will receive a _promise_ that will eventually represent the server's response (when the network request completes).

## Using `fetch`

We can use the global `fetch` function to make HTTP requests in the browser. It takes two arguments: the URL you want to send the request to and an options object (we'll look at that later). It returns a promise object that will eventually contain the response.

### Challenge 1

1. Open `starter-files/workshop.html` in your editor. Add your code inside the script tag.
1. Use `fetch` to make a request to `"https://pokeapi.co/api/v2/pokemon/pikachu"`.
1. Assign the return value to a variable and log it.
1. Open the file in your browser. You should see the pending promise in the console.

![](https://user-images.githubusercontent.com/9408641/74358318-2dbef800-4db9-11ea-903d-63f0530bcffa.png)

{% solution %}

```js
const pokePromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
console.log(pokePromise);
```

{% endsolution %}

### Promise terminology

Promises can be in 3 states:

1. _pending_ (async code has not finished yet)
1. _fulfilled_ (expected value is available)
1. _rejected_ (expected value is _not_ available).

There's a bit more complexity to this, so it's worth reading this [explanation of promise states](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) later.

```javascript
const myPromise = fetch("url");
console.log(myPromise);
// Promise { <state>: "pending" }
// or
// Promise { <state>: "fulfilled", <value>: theResult }
// or
// Promise { <state>: "rejected", <value>: Error }
// Note: different browsers may show promises differently in the console
```

So how do we actually access the value when the promise fulfills?

## Accessing the promise value

Since the promise's fulfilled value isn't accessible synchronously, we can't use it immediately like a normal JS variable. We need a way to tell JS to run our code once the promise has fulfilled.

```javascript
const myPromise = fetch("url");
myPromise.then((result) => console.log(result));
```

Promises are objects with a `.then()` method. This method takes a callback function as an argument. The promise will call this function with the fulfilled value when it's ready.

It's worth noting that you don't need to keep the promise itself around as a variable.

```javascript
fetch("url").then((result) => console.log(result));
```

### Challenge 2

1. Use `.then()` to access the result of your PokéAPI request. Log this to see what a JS response object looks like.

![](https://user-images.githubusercontent.com/9408641/74358327-31527f00-4db9-11ea-873d-30865128b313.png)

{% solution %}

```js
const pokePromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
pokePromise.then((result) => console.log(result));
```

{% endsolution %}

## Accessing the response body

The promise resolves with an object representing the HTTP response (e.g. it has a `status` property). However since the response body could be in many different formats there's an extra step to access it. Response objects have built-in methods for parsing different body formats.

Since the PokéAPI returns JSON-formatted data we can use the `response.json()` method to access it. Accessing the body can be slow, so this is async too. The `.json()` method also returns a promise, so we need to use another `.then()` to access the value.

```js
fetch("url").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});
```

Nesting our `.then()`s like this is getting us back into the same mess as with callbacks. Luckily promises have a nice solution to this problem.

#### Chaining `.then`s

The `.then()` method always returns a promise, which will resolve to whatever value you return from your callback. This allows you to chain your `.then()`s and avoid nested callback hell.

The `.then`s will run in order, and wait for the previous one to fulfill before starting. Here our first `.then` returns the promise that the `response.json()` method creates. Our second `.then` only runs once that promise fulfills with the JSON data.

```js
fetch("url")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

### Challenge 3

1. Use `response.json()` to get the response body
1. Add another `.then()` to log the body. You should see a Pokémon object

![](https://user-images.githubusercontent.com/9408641/74358336-34e60600-4db9-11ea-8394-e6df57e3cef2.png)

{% solution %}

```js
const pokePromise = fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
pokePromise
  .then((response) => response.json())
  .then((pikachu) => console.log(pikachu));
```

{% endsolution %}

## Handling errors

Sometimes requests go wrong. Promises have a built in way to control what happens when the asynchronous code hits an error. We can pass a function to the promise's `.catch()` method. This will be run _instead of_ the `.then()` if the promise rejects. Your callback will be passed the error that occurred instead of the data you wanted.

```javascript
fetch("broken-url")
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```

### Challenge 4

1. Remove the URL from your fetch call. You should see the browser warn you about an "uncaught error"
1. Add a `.catch()` to your code that logs the error instead

Note: you would usually want to do something useful with the error instead of just logging it.

![](https://user-images.githubusercontent.com/9408641/74358484-6959c200-4db9-11ea-98a0-7cb2ba107908.png)

{% solution %}

```js
const pokePromise = fetch();
pokePromise
  .then((response) => response.json())
  .then((pikachu) => console.log(pikachu))
  .catch((error) => console.log(error));
```

{% endsolution %}

---

## Workshop

We're going to use the `fetch` function to get a user from the GitHub API. The API is free to access, but you might get rate-limited if you make too many requests. If you hit this problem you can fix it by [generating an access token](https://github.com/settings/tokens) and including it in the request URL.

### Task 1

1. Write a `getUser` function that takes a username argument
1. It should fetch that user's profile from `"https://api.github.com/users/USERNAME_HERE"`
1. It should be callable like this:
   ```js
   getUser("oliverjam")
     .then((user) => console.log(user))
     .catch((error) => console.log(error));
   ```

![](https://user-images.githubusercontent.com/9408641/74358494-6bbc1c00-4db9-11ea-9abe-687aa5a574f1.png)

### Task 2

1. Write a `getRepos` function that takes the Github user response object as an argument.
1. Fetch the a user using `getUser`, _then_ use `getRepos` to fetch their repos using the `repos_url` property from the user object.
1. Log the array of repos.

![](https://user-images.githubusercontent.com/9408641/74358501-6eb70c80-4db9-11ea-95f8-69264ed3585c.png)

### Bonus if you have time: Task 3

1. Fetch multiple GitHub profiles _simultaneously_ using your `getUser` function above (you'll have to call it more than once)

You might want to read the docs for [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

![](https://user-images.githubusercontent.com/9408641/74358510-7080d000-4db9-11ea-8cf9-63d15b78a618.png)
