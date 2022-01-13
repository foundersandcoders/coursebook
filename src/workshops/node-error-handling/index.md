---
title: Node error-handling
description: Learn how to handle different kinds of errors on your Node server
tags:
  - workshop
  - js
keywords:
  - js
  - node
  - errors
---

Errors (or "exceptions") stop JavaScript from running. They usually mean something has gone so wrong that the program doesn't know how to continue. This means any code _after_ the line where the error occurred won't run. This is pretty bad in the browser as it can totally break the application for a single user, but on the server it can be much worse. A single running Node server might be responding to hundreds or thousands of requests from different users. If an error stops the code executing it stops for _all of the users_.

![Heroku error page](https://user-images.githubusercontent.com/9408641/77855255-1f049700-71e7-11ea-9bf0-e91c279cb801.png)

## JavaScript errors

"Error" can refer to both the "exception" (line of code going wrong) as well as the "error object" that is created. For example this code will cause an exception:

```js
const myFunction = 2;
myFunction();
console.log("will not run");
```

If you run that in a browser you'll see an error logged: `TypeError: myFunction is not a function`. You also _will not_ see the log, as the JS stops executing your code when the exception occurs.

### Different types of errors

The error we saw above was a "TypeError". This is a more specific kind of error that is used when JavaScript expects to see one thing but got something else. In this case we tried to call a number as a function, which meant it was the wrong _type_ of value.

There are several different kinds of built-in error. You can see a [full list on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error). Mostly you'll see `TypeError` and `ReferenceError` (e.g. `ReferenceError: myVariable is not defined`).

## Creating your own errors

We've seen how JS handles exceptions, but what about your own code? It's possible to predict points in your code where something will go wrong and create your own error on purpose. For example if we write a function to square a number we can check whether the caller actually passed a number in:

```js
function square(x) {
  if (typeof x !== "number") throw new Error("Please pass a number!");
  return x * x;
}
```

The `throw` keyword causes an exception in your code (just like when a built-in JS method breaks). You can `throw` anything (`throw 5`, `throw "hello"` etc), but it's most common to create a new `Error` object and throw that. Error objects have a "stack trace", which tells the user what line of code the error occurred on.

So now our `square` function behaves similarly to built-in JS methods: execution will stop if it encounters an invalid value. We can make this more specific by using a `TypeError` and passing a more useful message:

```js
function square(x) {
  if (typeof x !== "number") throw new TypeError(`${x} is not a number`);
  return x * x;
}

square("hi"); // TypeError: hi is not a number
```

## Error-handling

All these errors will just stop our program executing. Ideally we want to _catch_ the error and handle it somehow (maybe by providing a message to the user).

We can use a `try..catch` block for this. We put all the code we think _might_ error inside the `try {}` block, and if an error is thrown the `catch (error) {}` block runs with the error object.

```js
try {
  JSON.parse("< invalid json >");
} catch (error) {
  console.error(error);
  // SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data
}

console.log("Continues to run fine);
```

Here we _try_ to run our code, `JSON.parse` throws an error that we _catch_ and log to the console. Since the error has been caught within this block the rest of our code can safely continue to run (so the final `console.log` still appears).

This works the same way for your errors you throw yourself, like our `square` function above:

```js
function handleSubmit(event) {
  const value = event.target.elements.num.value; // e.g. "hi"
  try {
    const squaredValue = square(value);
    output.textContent = squaredValue;
  } catch (error) {
    console.error(error);
    output.textContent = error.message;
    // puts "hi is not a number" on the page
  }
}
```

You can think of throwing an error as bypassing the rest of the code and jumping straight to the closest `catch` block.

### Challenge

Let's use `try..catch` to handle errors on a Node server.

1. Download the starter files, `cd` in, run `npm install`
1. Run `npm run dev` to start the server on http://localhost:3000
1. Visit http://localhost:3000/try-catch. You should see Express' default error response
1. Use `try..catch` in the `tryCatch` route handler to catch the error and send your own response to the browser
   - The response should have a `500` status code and a message of `Server error`
   - Don't fix the mistake in the `tryCatch` handler (it's deliberate to simulate a real error)

<!-- ## Error-first callbacks

Node uses error-first callbacks as a standard for asynchronous code. If an asynchronous Node module errors it will call your callback with an error argument.

Note that this error is not thrown and will not immediately cause an exception in your program. This makes it important to handle the error straight away: if you try to ignore it and carry on you'll probably encounter a problem soon after.

```js
fs.readFile("incorrect-path.html", (error, file) => {
  // don't handle error
  response.end(file); // sends `undefined`
});
```

Instead we should check whether the error exists, then log it and send a useful error response:

```js
fs.readFile("incorrect-path.html", (error, file) => {
  if (error) {
    console.error(error);
    // send error response here
  } else {
    // use the file
  }
});
```

### Challenge

The `/callback` endpoint tries to serve a file that doesn't exist. Don't fix this (it's erroring on purpose as an example).

1. Visit http://localhost:3000/callback
1. You should see a blank page, as we're responding with `undefined`
1. Edit the `callback` function in `handlers.js` to send a response when there's an error
   - The response should have a status code of `500` and a message of `Server error` -->

## Promise rejection

Errors often occur in asynchronous code, as this can involve network requests or file-system access (both of which can take a long time and lose connection partway through).

We can't handle exceptions in asynchronous code using `try..catch` because the `try` block will have finished executing before the error occurs. For example:

```js
try {
  fetch("broken").then(console.log);
  // then some more stuff
} catch (error) {
  console.error(error);
}
```

If the `fetch` request takes 5 seconds the `try` will have finished executing long before the error occurs, which means the `catch` never runs. Promises don't _throw_ errors because that doesn't work asynchronously. Instead they _reject_, which is the async equivalent.

Promises have a `.catch` method, which allows you to pass a function that runs if the promise is rejected.

```js
fetch("broken")
  .then(console.log)
  .catch((error) => {
    console.error(error);
    // do stuff with the error here
  });
```

{% box %}

It's important to **always** have a `.catch` somewhere in a promise chain. Otherwise you'll get an "unhandled rejection", which could crash your program.

{% endbox %}

### Challenge

Let's handle a rejection. The server has a `model.js` file that pretends to access a database. However the `getPosts` function always rejects with an error (don't fix this!).

1. Visit http://localhost:3000/rejection
1. Your browser should timeout waiting for a response
1. Your server should log an error in your terminal:
   `UnhandledPromiseRejectionWarning: Error: Retrieving posts failed`
1. Edit the route handler to catch the `model.getPosts()` promise rejecting
   - You should send a response with a `404` status code and a message of "Posts not found"

## Bonus: unhandled Node exceptions

Unhandled exceptions are very dangerous on the server. They will cause the whole Node program to crash, preventing it from responding to more requests. This is actually a good thing—attempting to continue serving requests after an unhandled exception could lead to much worse issues, like saving incorrect data to a database or serving the wrong information to users.

This is why Node automatically stops your program on an unhandled exception. Unfortunately it **does not** do this for unhandled _rejections_ (i.e. when a promise errors). This is why you see a warning when a promise rejects without a `.catch`:

> In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

It's a good idea to make your program stop on unhandled rejections too. You can do this by listening for an event on the global `process` object:

```js
// in server.js
process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});
```

The [`unhandledRejection`](https://nodejs.org/api/process.html#process_event_unhandledrejection) event will fire when a promise rejects without being caught, and your callback function will run. We log the error, then tell the Node process to stop with an "exit code" of 1 (which means an error occurred). This will stop your server processing any more requests.

Add this to your `server.js`, then remove your `.catch` from the `rejection` handler function. Now when you visit http://localhost:3000/rejection and you shouldn't see the "unhandled rejection" warning in your terminal. Instead your server should crash and stop processing further requests.

{% box %}

**Note**: it's always better to handle the promise rejection properly in your route handler so you can send a response. This `unhandledRejection` listener is a last-ditch strategy because errors always slip through the cracks.

{% endbox %}

### Recovering from unhandled exceptions

Ideally your server shouldn't _stay_ crashed: you want it to restart and continue handling requests. This has to be managed by something outside of the Node process.

If you have deployed your server to Heroku it will automatically try to restart your server if it crashed. If it crashes again it will wait up to 20 minutes before trying again, then keep waiting longer before each attempt. You can read about their [crash restart policy](https://devcenter.heroku.com/articles/dynos#dyno-crash-restart-policy).

If you're managing your own Node deployment it's common to use something like [`pm2`](https://www.npmjs.com/package/pm2) or [`systemd`](https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/) to automatically restart the process after it crashes.
