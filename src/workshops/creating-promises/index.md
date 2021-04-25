---
title: Promise creation challenge
description:
tags:
  - workshop
  - js
keywords:
  - js
  - promises
  - async
---

Let's practice using and _creating our own_ promises.

## Setup

1. Clone this repo
1. Run `npm install` to install dependencies

## Using promises

A promise is an object that _represents_ the eventual result of an some asynchronous code. A function that needs to do some asynchronous work (e.g. fetching data from an API on another website) can _return_ a promise object, which is its "promise" to you that you will eventually get a result.

A promise has two final states: it can "resolve" (complete successfully with an optional value), or "reject" (fail, usually with an `Error` object).

A promise object contains two methods that we can use to tell it what to do when the async code finishes. We can call `.then` with a "success" function that will be called with the resolved. We can call `.catch` with a "failure" function that will be called with the rejected error.

### Chaining

You can "chain" `.then`s as it always returns a new promise object. This new promise object will resolve with whatever value you return from the success function you pass in. For example:

```js
fetch("some-url.com")
  .then((response) => {
    console.log(response); // we can see the response { status: 200... }
    return 1;
  })
  .then((x) => {
    console.log(x); // 1, because that's what the previous .then() returned
  });
```

A single `.catch` will catch all rejections from a promise chain, which means you can handle errors in one place. You can't chain catches since the promise chain stops once it hits a rejection.

### Challenge one

Open `workshop/challenge-one.js` in your editor. It contains a function `getUsersWithRepos` that fetches a user by name, then passes the result to the `addReposToUser` function.

Implement the `addReposToUser` function: it should receive a user object, fetch that user's repos using `api.getRepos` (which takes a user's ID as an argument), then resolve with a new user object with an extra `repos` property.

You can run the tests with `npm run test:one`—they should all pass when you're done.

## Creating promises

You can create your own promise objects with `new Promise()`. You have to pass in a function that defines when the promise will resolve or reject. This function is passed two arguments: `resolve` and `reject`. These are functions you call with the value you want to resolve/reject with.

For example:

```js
function doesSomethingAsync(ms) {
  const promise = new Promise((resolve, reject) => {
    // do some stuff
    reject(new Error("it broke"));
    // or
    resolve("It worked!");
  });
  return promise;
}
```

### Challenge two

You're going to create your own promisified wrapper of Node's [`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) method. It usually takes a callback to be run when it finishes its asynchronous task. Implement the `readFilePromise` function so that it returns a new promise. It should use `fs.readFile` to read whatever file path is passed in, then resolve with the result. It should reject with any error that occurred.

You can run the tests with `npm run test:two`.
