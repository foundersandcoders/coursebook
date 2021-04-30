---
title: Express middleware
description: Learn how to create your own middleware for Express servers
tags:
  - workshop
  - js
keywords:
  - js
  - express
  - middleware
---

Learn how to write your own Express middleware to do logging, authentication and error-handling.

## Middleware

Express is built around middleware. Middleware are functions that receive a request, do something with it, then either pass the request on to the next middleware or send a response (ending the chain).

Technically _all_ route handlers are middleware, since they fit the above definition. However middleware usually _transform_ the request in some way and don't actually send a response.

For example the built in `express.urlencoded` middleware grabs the HTTP request body, turns it into an object, then attaches it to the request object. This allows subsequent handlers to easily access it at `request.body`. The 3rd party `cookie-parser` middleware does the same for cookies. We're going to learn how to create our own middleware functions.

## Setup

1. Download the starter files and `cd` in
1. Run `npm install` to install all the dependencies
1. Run `npm run dev` to start the development server

Visit http://localhost:3000 to see the workshop app. You can "log in" by entering an email, which will be saved as a cookie so the server can identify you.

## Our first middleware

It would be useful if our server logged each incoming request to our terminal. That way we can see a log of what's happening as we use our server locally.

Usually we match our handlers to specific routes (e.g. `server.get("/about", ...)`. However we can run a handler for _every_ route by using `server.use`:

```js
server.use((req, res) => {
  console.log(`${req.method} ${req.url}`);
});
```

This will log the method and URL for every request the server receives (e.g. `GET /` or `POST /submit`). Unfortunately that's _all_ it will do, as this handler never tells the next handler in the chain to run. This will cause all requests to time out, since the server never sends a response using `response.send`.

We can fix this with the third argument all handlers receive: `next`. This is a function you call inside a handler when you want Express to move on to the next one.

```js
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

This tells Express to run the logger handler before every request, then move on to whatever handler is queued for that route. E.g. if the user requests the home page (`GET /`) this handler will run, log the method/URL, then pass on to the next handler that matches `GET /`, which will send an HTML response.

---

## Authentication middleware

{% box %}

**Note:** we are just storing all the session info about the user in an object in-memory. In a real app you'd want this top live in a persistent store like a database.

{% endbox %}

### Accessing the user

Currently we are accessing the user cookie in three handlers (`GET /`, `GET /profile` and `GET /profile/settings`). We have to grab the session ID from the signed cookies, then look the session info up in the `sessions` object. This ends up being quite a lot of code repeated whenever we want to find out info about which user is currently logged in. We can create a middleware to handle this repeated task.

We don't know which routes will want to access the logged in user value so we'll set this middleware on the whole app using `server.use`. We'll mimic the other middleware we're using and add the `user` value to the `req` object. This lets us pass values down through the request chain to later handlers.

#### Challenge 1.1

1. Create a new middleware that runs before every request.
1. It should read the `sid` cookie and find the session info in the `sessions` object
1. Then create a "session" property on the request object containing that info
1. Finally call the `next` function to tell Express to move on to the next handler.
1. Change each handler that currently gets the session cookie to instead grab the info from `req.session`.

{% disclosure %}

```js
server.use((req, res, next) => {
  const token = req.cookies.user;
  const sessionInfo = sessions[sid];
  if (sessionInfo) {
    req.session = sessionInfo;
  }
  next();
});

server.get("/", (req, res) => {
  const user = req.session;
  // ...
});

server.get("/profile", (req, res) => {
  const user = req.session;
  // ...
});

server.get("/profile/settings", (req, res) => {
  const user = req.session;
  // ...
});
```

{% enddisclosure %}

### Protecting routes

Currently our `GET /profile` route is broken. If the user isn't logged in we get an error trying to access `user.email` (since `req.session` is undefined). It would be better to show a "Please log in" page for unauthenticated users.

#### Challenge 1.2

1. Amend the `GET /profile` handler to check whether there is a session.
1. If not send a `401` HTML response with an error message in the `h1` and a link to the `/log-in` page.

{% disclosure %}

```js
server.get("/profile", (req, res) => {
  const user = req.session;
  if (!user) {
    res.status(401).send(`
      <h1>Please log in to view this page</h1>
      <a href="/log-in">Log in</a>
    `);
  } else {
    res.send(`<h1>Hello ${user.email}</h1>`);
  }
});
```

{% enddisclosure %}

Now you should see the "please log in" page if you visit `/profile` when you aren't logged in. However the `GET /profile/settings` route has the same problem.

We _could_ copy paste the above code, but it would be better to avoid the duplication and move this logic into a middleware that makes sure users are logged in.

#### Challenge 1.3

1. Create a new middleware function named `checkAuth` that takes `req`, `res` and `next` as arguments.
1. If there is no `req.session` respond with the `401` HTML.
1. If there is a `req.session` call `next` to move on to the next handler.
1. Add this middleware in front of the handler for any route we want to protect. We don't want this middleware running on all routes, since some of them are public.

{% box %}

**Hint:** you can set multiple middleware/handlers for a route by passing multiple arguments.

```js
server.get("/example", doSomething, anotherHandler, (req, res) => {
  // ...
});
```

{% endbox %}

{% disclosure %}

```js
function checkAuth(req, res, next) {
  const user = req.session;
  if (!user) {
    res.status(401).send(`
      <h1>Please log in to view this page</h1>
      <a href="/log-in">Log in</a>
    `);
  } else {
    next();
  }
}

server.get("/profile", checkAuth, (req, res) => {
  // ...
});

server.get("/profile/settings", checkAuth, (req, res) => {
  // ...
});
```

{% enddisclosure %}

---

## Error-handling

The `next` function is also used for error-handling. If you call it with no arguments Express will move to the next handler in the chain as we just saw.

However if you call it with an argument Express will skip all the rest of the handlers for this route and instead run the error handler.

For example if we encounter an error reading from a database:

```js
server.get("/example", (req, res, next) => {
  model
    .getSomething()
    .then((result) => {
      // do success stuff
    })
    .catch((error) => {
      // stop all route handlers and jump to error handler
      next(error);
    });
});
```

Calling `next(error)` stops this handler executing and jumps straight to the first error-handling middleware. If you haven't created any of your own then Express' built-in one will handle the error. By default this will respond with a `500` status code. Express will also catch any synchronous errors that get thrown by your server automatically.

### Error handling middleware

Creating our own error-handling middleware is a little weird. An error-handler has _four_ arguments instead of the usual two or three—the first is the error itself:

```js
function handleErrors(error, req, res, next) {
  // handle the error
}

server.use(handleErrors);
```

Express knows this middleware is for errors (because it has four arguments), so it will only get called when there's an error to deal with (i.e when a handler calls `next` with an argument, or an error is thrown).

#### Challenge 2.1

1. Add an error-handling middleware to your server.
1. It should log the error it receives, then respond with a `500` status and a generic HTML message.

You can test this by visiting the http://localhost:3000/error route to cause a fake error.

{% disclosure %}

```js
function handleErrors(error, req, res, next) {
  console.error(error);
  res.status(500).send(`<h1>Something went wrong</h1>`);
}

server.use(handleErrors);
```

{% enddisclosure %}

### Custom error responses

The `500` status code is for general server errors, but sometimes we might want to be more specific. Since JavaScript errors are objects we can attach extra properties to them to provide more information for the error handler to use.

#### Challenge 2.2

1. Amend the `GET /error` handler to add a `status` property to the `fakeError` object with a value of `403`.
1. Amend your error handler to use this property as the response status code (defaulting to `500` if there isn't one).

{% disclosure %}

```js
server.get("/error", (req, res, next) => {
  const fakeError = new Error("uh oh");
  fakeError.status = 403;
  next(fakeError);
});

function handleErrors(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;
  res.status(status).send(`<h1>Something went wrong</h1>`);
}

server.use(handleErrors);
```

{% enddisclosure %}

Open the network tab and visit the `/error` route again. You should see a `403` response instead of `500`.

## Stretch goal: refactoring

It's a bit cluttered having all our middleware mixed in with our handlers. Create a `middleware/` directory with files for each middleware function we built. Export each one, then import them in `server.js` to use.

You'll also need to move the `sessions` object out into its own file and export it so it's available to anything that needs it.

## Stretch goal: fancier error-handling

The built-in Express error-handler does a bit more than just sending a static error message. It behaves differently in development and production.

While you're developing locally it sends the entire error's stack trace as a response, allowing you to see exactly what went wrong in the browser. For example:

```
Error: uh oh
    at /Users/yourname/Code/fac/workshops/learn-express-middleware/workshop/server.js:73:21
    at Layer.handle [as handle_request] (/Users/yourname/Code/fac/workshops/learn-express-middleware/node_modules/express/lib/router/layer.js:95:5)
    at next (/Users/yourname/Code/fac/workshops/learn-express-middleware/node_modules/express/lib/router/route.js:137:13)
    at Route.dispatch (/Users/yourname/Code/fac/workshops/learn-express-middleware/node_modules/express/lib/router/route.js:112:3)
    ...
```

This would be dangerous for real users to have access to, so in production it reads the `status` property from the error object (just like we did above), and just sends the default message for each status code (e.g. `404 -> Not found`). The `status` property defaults to `500 -> Internal server error` if you don't set it.

Let's make our custom error handler behave the same way.

Node actually comes with a list of all the HTTP error codes and their messages. You can get them from `http.STATUS_CODES`. For example:

```js
const { STATUS_CODES } = require("http");

console.log(STATUS_CODES[401]); // "Unauthorized"
```

You can check whether your app is running in production using `process.env.NODE_ENV`. Production environments like Heroku will set this environment variable to "production".

Amend your error-handler to send a standard HTTP status message in production, and the entire error stack trace in development. To test you can amend the `"dev"` script in the `package.json` to `NODE_ENV=production nodemon workshop/server.js`.

{% box %}

**Hint:** look at the `error.stack` property. You ca also use a `<pre>` tag to make the stack display nicely.

{% endbox %}

{% disclosure %}

```js
function handleErrors(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;
  res.status(status);

  const inProd = process.env.NODE_ENV === "production";
  if (inProd) {
    const message = STATUS_CODES[status];
    res.send(message);
  } else {
    res.send(`<pre>${error.stack}</pre>`);
  }
}

server.use(handleErrors);
```

{% enddisclosure %}
