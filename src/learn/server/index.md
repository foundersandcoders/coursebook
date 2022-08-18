---
title: HTTP servers with Node & Express
description: Learn how to use Node and Express to create and test HTTP servers
tags:
  - workshop
keywords:
  - js
  - express
  - server
---

Node is often used to create HTTP servers for the web. It's a bit fiddly to do this with just the built-in modules, so we're going to use the Express library to help create our server.

## HTTP recap

HyperText Transfer Protocol (HTTP) is a way for computers to exchange messages over the internet. The "client" computer will send a "request" (often via a web browser). E.g. if you visit https://google.com your browser sends a request like this:

```
GET / HTTP/1.1
host: google.com
accept: text/html
```

A "server" computer receives this request and sends a "response". E.g. Google's server would send a response like this:

```
HTTP/1.1 200 Ok
content-type: text/html

<!doctype html>
<html><body><h1>Welcome to Google</h1>...</body></html>
```

We're going to learn how to use Node to create an HTTP server that can respond to requests.

## Getting started

1. Create a new directory
   ```shell
   mkdir node-server-intro
   ```
1. Move into that directory
   ```shell
   cd node-server-intro
   ```
1. Initialise the project to create a `package.json`
   ```shell
   npm init -y
   ```
1. Install the Express library
   ```shell
   npm install express
   ```
1. Open your editor, then create a `server.js` file
   ```shell
   code .
   ```

Follow along with each example in your own editor.

## Creating a server

We can create a new server object using the `express` library:

```js
const express = require("express");

const server = express();
```

You can run this file from your terminal with:

```shell
node server.js
```

Unfortunately nothing much will happen yet, since we haven't told our server to _do_ anything.

## Starting the server

Our server isn't currently listening for requests. Servers need to connect to the network and listen for incoming HTTP requests via a "port".

{% box %}

A port is an entry/exit point on a computer to allow network connections (like an airport allows people in/out of a country). Your computer has a lot of these, and identifies them using numbers. HTTP requests use **port 80** by default (and HTTPS requests use **443**). You don't normally see them in URLs on the web because browsers use the default. I.e. when you visit `https://google.com` you are really going to `https://google.com:443`.

When you're running a server locally in development it's common to use a different number like 3000 or 8080. You can access a port by adding it to a URL like this: `http://localhost:3000`.

{% endbox %}

It's a good idea to start the server in a different file: this will help with testing later on. We first need to export the server object we just created:

```js
// server.js
const express = require("express");

const server = express();

module.exports = server;
```

Then we create a new file named `index.js` file. This is just the "entrypoint" for our app—its job is to start the server. All the actual server logic will stay in `server.js`.

```js
// index.js
const server = require("./server.js");

server.listen(3000);
```

This tells the server to listen for any requests sent to **port 3000**. Now we can run the program in our terminal again:

```shell
node index.js
```

The server will start, but you won't see anything happen. Your terminal will be "stuck" as the Node process is still running (the server will keep listening indefinitely). This means you can't run any more commands.

{% box "error" %}

**Important**: You can stop the Node process by typing <kbd>control</kbd> + <kbd>c</kbd> in your terminal. Every time you change your code you must stop the old process and start a new one by running `node server.js` again.

{% endbox %}

It would be nice see a log so we know our server started correctly. Luckily the `.listen` method takes a second argument—a function to run once the server is listening.

We can use this to log a message:

```js
server.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

Stop the previous process, re-run your file, and you should see "Listening on http://localhost:3000" logged.

## Trying out our server

Since your server is now running you can send some HTTP requests to it to see what happens. The easiest way is to visit http://localhost:3000/ in your browser.

You can also use the `curl` CLI program to send requests right from your terminal. Open a new tab and run this command to send a GET request:

```shell
curl localhost:3000
```

You should see the response logged. Whether your used your browser or `curl` you should get a `404 Not found` response from your server.

This is Express' default "missing" page, which it will return when you haven't defined a response for a particular request. Let's fix that by defining our first route.

## Handling requests

Our server currently does nothing. We need to add a "route". This is a function that will be run whenever the server receives a request for a specific path.

The `server` object has methods representing all the HTTP verbs (`GET`, `POST` etc). These methods take two arguments: the path to match and a handler function.

```js
// server.js

server.get("/", (request, response) => {
  response.send("hello");
});
```

Here we tell the server to call our function whenever it receives a HTTP GET request to the home path. This is similar to an event listener in the DOM.

The handler function will be passed two arguments: an object representing the incoming request, and an object representing the response that will eventually be sent. Here we've named them `request` and `response` respectively. These are often abbreviated to `req` and `res`.

We can use the `send` method of the response object to tell Express to send the response. Whatever argument we pass will be sent as the response body.

Open http://localhost:3000/ in your browser. This will send a `GET` request to your server. You should see the "hello" response on the page. It's helpful to open the network tab of the dev tools so you can see all the details of the request and response.

---

## Testing our server

Making requests manually in the browser or terminal is fine for quick checks, but to be responsible developers we should write automated tests to verify our server is working correctly.

### Testing with Node

As of version 18 Node has a built-in test runner. It works in a similar way to the popular Tape testing library (most testing libraries are quite similar).

Let's try an example test. Create a new directory called `tests/`, and then a new file inside called `server.test.js`. We can create a simple test like this:

```js
const test = require("node:test");
const assert = require("node:assert");

test("the test works", () => {
  assert.equal(1, 1);
});
```

Since this is a normal Node JS file we can run it from our terminal like any other JS file:

```shell
node tests/server.test.js
```

You should see some logs showing the status of your test.

Node also has a special way to run all the tests in your project:

```shell
node --tests
```

It will find and run any files in a folder named `tests`, and also any file ending in `.test.js`. This is handy when you want to divide your tests up into different files but run them all in one go.

### Testing our server

Let's write a test that verifies the route we just added. Our test should:

1. Start the server
1. Send a request to the server
1. Verify the request was successful
1. Retrieve the response body
1. Verify that the response is what we expect
1. Stop the server

Note that this is exactly how we _manually_ checked our server was working before. We just want to automate it.

{% box %}

Remember you can run your test in the terminal at each step with `node --test`

{% endbox %}

First we need a test function. We will use an `async` function here so that Node knows to wait for any promises to resolve:

```js
const test = require("node:test");
const assert = require("node:assert");

test("home route returns expected page", async () => {
  // test goes here
});
```

#### Start the server

Next we need to start the server. We'll use a different port to before, just so we don't clash with any already running instances in your terminal:

```js
const test = require("node:test");
const assert = require("node:assert");
const server = require("../server.js");

test("home route returns expected page", async () => {
  const app = server.listen(9876);
});
```

We import the server object directly and start it listening ourselves. This is why splitting up our app into `index.js` and `server.js` helps testing: we have control over when the server starts.

#### Send a request to the server

Now we need to send a request to the server. As of Node 18 we can use `fetch` to make HTTP requests, just like in the browser. We can use it to send a request to our server:

```js
test("home route returns expected page", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876");
  assert.equal(response.status, 200);
});
```

Here we're sending a request, waiting for the server to respond, then checking that the response was successful.

{% box %}

We're using [`await`](https://javascript.info/async-await) to simplify the promise-handling here. We could use the `.then()` callback method but the test would end up a bit more convoluted.

{% endbox %}

#### Check the response body

Finally we need to get the response body and check that it is correct:

```js
test("home route returns expected page", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876");
  assert.equal(response.status, 200);

  const body = await response.text();
  assert.equal(body, "hello");

  app.close();
});
```

Here we're using the `.text()` method to get the raw text content of the response body, then checking it matches what we expect. Now that we're finished with this instance of the server we use the `.close()` method to stop it listening. Otherwise we'd end up with lots of rogue servers in the background using up port numbers.

Now that we know how to test our server we can get back to learning a bit more about Express.

---

## Port flexibility

We are currently hard-coding the port our server listens on to `3000`. This works fine, but we could make it more flexible. When you deploy this code to a hosting provider like Heroku they will run your code on their computer. This computer may have lots of different programs running that all need to use ports. Ideally the host can tell your server which port to listen to.

This is usually achieve with [environment variables](https://en.wikipedia.org/wiki/Environment_variable). These are like global variables that are set _before_ your program runs. For example we can set a variable named `TEST` in our terminal like this:

```shell
TEST=123 node index.js
```

Node makes environment variables available via the global `process.env` object. So we could read that `TEST` variable using this JS:

```js
console.log(process.env.TEST); // Logs: 123
```

We can tweak our server code in `index.js` to use a `PORT` environment variable if it's set, otherwise fallback to `3000`:

```js
// index.js
const server = require("./server.js");

const PORT = process.env.PORT || 3000;
server.listen(PORT);
```

Now we can control what port our server listens on without editing the code. E.g. to start it using a different port:

```shell
PORT=8080 node index.js
```

When you deploy to a hosting provider like Heroku they will use this to start your server with a random available port.

---

## The response

HTTP responses need a few different things:

1. A status code (e.g. `200` for success or `404` for not found)
1. Headers to provide info about the response
1. A body (the response data itself)

### Status code

Our home route currently only provides the body, as Express will set the status code to `200` by default when you call `response.send()`. To set a different code use the `response.status` method. Let's add a new route that returns a different status code:

```js
server.get("/uh-oh", (request, response) => {
  response.status(500);
  response.send("something went wrong");
});
```

You can chain `.status` together with `.send` to make it shorter:

```js
response.status(500).send("something went wrong");
```

Try creating a test for this new route in `tests/server.test.js`: it should check that the status is `500` and the body is "something went wrong". It will look very similar to the first test we wrote.

{% disclosure %}

```js
test("/uh-oh route returns error message", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/uh-oh");
  assert.equal(response.status, 500);

  const body = await response.text();
  assert.equal(body, "something went wrong");

  app.close();
});
```

{% enddisclosure %}

### Headers

Express will automatically set some HTTP headers describing the response. For example since we called `send` with a string it will set the `content-type` to `text/html` and the `content-length` to the size of the string.

You can set your own headers using the `response.set` method. This can take two strings to set a single header:

```js
response.set("x-fake-header", "my-value");
```

Or it can take an object of string values to set multiple headers:

```js
response.set({
  "x-fake-header": "my value",
  "x-another-header": "another value",
});
```

### HTML body

We aren't limited to plaintext in our body. The browser will parse any HTML tags and render them on the page. Change your home route to return some HTML instead:

```js
server.get("/", (request, response) => {
  response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `);
});
```

Run your tests again and you should see the first one fail, since it is still expecting the response body to be "hello". Amend the test so that it matches the new body.

{% box %}

**Hint:** You can use [`assert.match`](https://nodejs.org/api/assert.html#assertmatchstring-regexp-message) to match a string to a regular expression. This allows you to check if it includes a certain substring without having to compare the whole thing.

{% endbox %}

{% disclosure %}

```js
// ...
assert.match(response.body, /Hello/);
```

{% enddisclosure %}

Visit http://localhost:3000/ again and you should see an `h1` rendered.

Since we're rendering HTML using JS strings we can insert dynamic values using template literals. Let's add the current year to the response:

```js
server.get("/", (request, response) => {
  const year = new Date().getFullYear();
  response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
      </head>
      <body>
        <h1>Hello, it's ${year}</h1>
      </body>
    </html>
  `);
});
```

You'll need to amend your test again to keep it passing.

<!-- ### JSON body

If you were creating an API you might not want to send HTML. Express supports easily sending structured data back as JSON. Add a new route to your server:

```js
server.get("/json", (request, response) => {
  response.send({ message: "Hello" });
});
```

HTTP response bodies are always strings, so Express will automatically convert our object to a JSON string for us. It will also set the `content-type` header to `application/json`.

Visit http://localhost:3000/json and you should see a JSON object with a `message` property.

### Redirects

Sometimes we want to _redirect_ the request to another URL. You can use the `response.redirect` method for this. Add a new route:

```js
server.get("/redirects", (request, response) => {
  response.redirect("/");
});
```

Now if you visit http://localhost:3000/redirects in your browser you should end up back on the home page. If you look at the network tab in the dev tools you'll see two requests.

First a request to `/redirects`. This has a response status code of `302` and a `location` header pointing to `/`. This tells the browser to then make a second request to `/`. -->

## The request

Now let's look at the HTTP request. This object include lots of information that's useful to us.

### Search parameters

Incoming request URLs can contain extra information known as "search parameters" (or sometimes "query parameters"). These are key/value pairs listed after a `?` character in the URL.

They are usually added to the URL automatically as the result of a form submission. For example this form:

```html
<form action="/search" method="GET">
  <input name="keyword" />
</form>
```

will send a GET request to `/search?keyword=what-the-user-typed`. This allows your server to receive user-submitted information.

Let's write a test _first_ before we try to implement this. Our route is going to be simple: it will return a message telling the user what keyword they submitted. Our new test should check that a request to `/search?keyword=bananas` returns a body including "You searched for bananas".

```js
// tests/server.test.js

test("/search returns message including keyword", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/search?keyword=bananas");
  assert.equal(response.status, 200);

  const body = await response.text();
  assert.match(body, /You searched for bananas/);

  app.close();
});
```

This test will currently fail when you run it, as we now need to implement the new route in `server.js`.

Express provides the search parameters from the URL on the `request.query` object. Each `key=value` pair will be parsed and represented as an object property.

```js
// server.js

server.get("/search", (request, response) => {
  const keyword = request.query.keyword;
  response.send(`<p>You searched for ${keyword}</p>`);
}
```

Your test should now pass when you run it. If you visit http://localhost:3000/search?keyword=css you should see "You searched for css" on the page.

### Dynamic paths

Sometimes you can't know in advance all the routes you need. For example if you wanted a page for each user profile in your app: `/users/oli`, `/users/dan` etc. You can't statically list _every_ possible route here. Instead you can use a placeholder value in the path to indicate that part of it is variable:

```js
server.get("/users/:name", (request, response) => {
  const name = request.params.name;
  response.send(`<h1>Hello ${name}</h1>`);
});
```

We use a colon (`:`) to indicate to Express that _any_ value can match a part of the path. It will put any matched values on the `request.params` object so you can use them. For example a request to `/users/oli` would result in a `request.params` object like: `{ name: "oli" }`.

If you visit http://localhost:3000/users/oli you should see "Hello oli". If you visit http://localhost:3000/users/knadkmnaf you should see "Hello knadkmnaf".

---

## Missing routes

Try visiting http://localhost:3000/asdfg in your browser. You should see `Cannot GET /asdfg`. This is Express' default response for when no handler matches a path.

You can customise this by putting a "catch-all" handler after all your other routes. If no other route matches then this will be used (since Express matches them in the order they are defined).

We can use the `server.use` method to create a handler that will match _any_ method/route:

```js
server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});
```

Reload http://localhost:3000/asdfg and you should now see your custom response. Try writing a test that checks whether requests to different URLs correctly return this 404 response.

{% disclosure %}

```js
// tests/server.test.js

test("missing routes return 404 response", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/lndfklkj");
  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /Not found/);

  const response = await fetch("http://localhost:9876/definitely-not-real");
  assert.equal(response.status, 404);
  const body = await response.text();
  assert.match(body, /Not found/);

  app.close();
});
```

{% enddisclosure %}

## Middleware

Express route handlers don't have to send a response. They actually receive a third argument: the `next` function. Calling this function tells Express to move on to the next handler registered for the route, without sending a response to the browser.

Let's add another handler for the home route. It will just log the request, then move on to the next handler:

```js
server.get("/", (request, response, next) => {
  console.log(request.method + " " + request.url);
  next();
});

server.get("/", (request, response) => {
  response.send(`...`);
});
```

If you run this code and refresh the home page you should see `GET /` logged in your terminal.

The route methods like `.get` accept multiple handler functions, so you can actually pass several all in one go. I.e. this does the same thing as above:

```js
function logger(request, response, next) {
  console.log(request.method + " " + request.url);
  next();
}

server.get("/", logger, (request, response) => {
  response.send("<h1>Hello</h1>");
});
```

Express calls handlers that don't send a response "middleware". Our example here isn't that useful, but we could change it to run before _all_ requests. We can do this with `server.use`:

```js
server.use(logger);
```

Now we'll get a helpful log like `GET /` in our terminal when we load any page. Without middleware we would have to copy this into every route we wrote.

We'll be making more use of middleware in later topics where we have shared logic that must run on many different routes.

## Static files

It's common to have some static files that don't change for each request. E.g. CSS, images, maybe some basic HTML pages. For convenience Express includes a built-in middleware for serving a directory of files: `express.static`.

Create a new directory named `public`. This is where we'll keep all the files sent to the client. Create a `public/style.css` file with some example CSS:

```css
/* public/style.css */

body {
  color: red;
}
```

Finally configure the middleware to serve this directory:

```js
// server.js

const staticHandler = express.static("public");

server.use(staticHandler);
```

The server will now handle requests to http://localhost:3000/style.css and respond with the file contents. Note that there is no `public` in the final URL: Express serves the files from the root of the site.

We can link this CSS from our homepage to apply the styles:

```js
server.get("/", (request, response) => {
  response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="/style.css>
      </head>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `);
});
```

Visit http://localhost:3000/ in your browser again and you should see the styles applied.

## Post requests

So far we've only created `GET` handlers. Let's add a `POST` handler to see how we'd deal with forms submitting user data to our server:

```js
server.post("/submit", (request, response) => {
  response.send("thanks for submitting");
});
```

We can't make a `POST` request as easily in our browser, since that would require a form. Instead let's write a test to check this worked.

```js
// tests/server.test.js

test("/submit route responds to POST requests", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/submit", {
    method: "POST",
  });
  assert.equal(response.status, 200);
  const body = await response.text();
  assert.match(body, /thanks for submitting/);

  app.close();
});
```

### Request body

A `POST` request that doesn't send any data isn't very useful. Usually a form would be submitting some user input. Let's imagine we have a form that asks a user's name. We want to get the name they submit and send back a message like "Thanks for submitting, oli".

Since bodies can be large they are sent in small chunks—this means there's no simple way to read the body. Instead we must use a "body parser" middleware. This will wait for all the chunks to be received, then make the final body available to our route handler via the request object.

For convenience Express includes parsers for different formats. Request bodies can come in different formats (JSON, form submission etc), so we must use the right middleware. We want `express.urlencoded`, which is what HTML forms submit by default. It will add a `request.body` property, which is an object containing the submitted data:

```js
// server.js

const bodyParser = express.urlencoded();

server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.send(`thanks for submitting, ${name}`);
});
```

No we can update our test to send a URL-encoded body as part of the POST request. We need to make sure we add the right content-type header to the request, as this is how Express knows how to decode the body. We'll also change the assertion to expect the right response:

```js
// tests/server.test.js

test("/submit route responds to POST requests", async () => {
  const app = server.listen(9876);

  const response = await fetch("http://localhost:9876/submit", {
    method: "POST",
    body: "name=oli",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
  assert.equal(response.status, 200);

  const body = await response.text();
  assert.match(body, /thanks for submitting, oli/);

  app.close();
}
```

This test simulates how a real form in the browser would send a POST request.

### Redirecting responses

It's not good practice to send a response directly from a POST request like this. It can cause issues with duplicate requests—the POST will be re-submitted if the user refreshes the resulting page. This is why some retailers ask you to not refresh the page after buying something, to avoid being charged twice.

A safer pattern is to always _redirect_ to the next page after a POST request. That will tell the browser to send a new GET request to the next page, avoiding any resubmission problems.

We can use the `response.redirect` method to return a redirect response:

```js
// server.js

const bodyParser = express.urlencoded();

server.post("/submit", bodyParser, (request, response) => {
  const name = request.body.name;
  response.redirect(`/submit/success?name=${name}`);
});
```

The next page needs to know the name that was submitted—we can pass that in the URL using the search parameters (in a "real" app this might be stored in a cookie or database, but the URL is fine for now). We then need a new route to show the "success" page:

```js
// server.js

server.get("/submit/success", (request, response) => {
  const name = request.query.name;
  response.send(`<p>Thanks for submitting, ${name}</p>`);
});
```

This route reads the name from the URL search parameters, then returns the same HTML response as before.

---

That's it, you've learnt the basics of using Node and Express to create an HTTP server.
