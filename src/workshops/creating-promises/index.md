---
title: Promise creation challenge
description: Practice creating your own promises
tags:
  - workshop
  - js
keywords:
  - js
  - promises
  - async
---

You may have _used_ promises provided by libraries or built-in functions before. For example:

```js
fetch("/test")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
```

A promise is an object with a `.then` method. This method takes a callback function that it will call with the result when the promise is finished (or "resolved"). You can _imagine_ a promise object looks something like this:

```js
// this isn't really how they work
// but it's a good mental model to start with
const promise = {
  then: (callback) => {
    // magically wait until result is ready somehow
    callback(result);
  }
  catch: (callback) => {
    // magically wait until an error happens somehow
    callback(error);
  }
}
```

But how do you _create_ your own promise objects?

## Creating promises

You can create your own promise objects with `new Promise()`. You have to pass in a function that defines when the promise will resolve or reject. This function is passed two arguments: `resolve` and `reject`. These are functions you call with the value you want to resolve/reject with.

For example:

```js
function doSomethingAsync() {
  const promise = new Promise((resolve, reject) => {
    // do some async stuff that might error
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
  return promise;
}
```

You could use the above just like any other promise-returning function:

```js
doSomethingAsync()
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

## Challenge one

You're going to create a promisified version of `setTimeout`, called `wait`. It should take a number of millliseconds to wait as an argument, set a timeout for that long, then resolve the promise.

It should be usable like this:

```js
wait(1000).then(() => console.log("done"));
// (after 1000ms) Logs: "done"
```

You can run the tests to check if your solution works:

```shell
npm run test:one
```

{% disclosure %}

```js
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

{% enddisclosure %}

## Challenge two

You're going to create your own promisified wrapper of Node's [`fs.readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) method. It usually takes a callback to be run when it finishes its asynchronous task.

{% box %}

More recent versions of Node include an already-promisified version of the `fs` module that you can access via `require("fs/promises")`. In the real world you should probably just use this rather than implementing your own.

{% endbox %}

Implement the `readFilePromise` function so that it returns a new promise. It should use `fs.readFile` to read whatever file path is passed in, then resolve with the result. It should reject with any error that occurred. For example:

```js
readFilePromise("./test.txt")
  .then((contents) => console.log(contents))
  .catch((error) => console.error(error));
```

You can run the tests to check if your solution works:

```shell
npm run test:two
```

{% disclosure %}

```js
const fs = require("fs");

function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}
```

{% enddisclosure %}
