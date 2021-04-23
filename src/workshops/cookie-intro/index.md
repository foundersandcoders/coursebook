---
title: Cookie intro
description: Learn how to use cookies to persist information across HTTP requests
tags:
  - workshop
  - js
keywords:
  - js
  - cookies
  - sessions
---

Cookies are an important part of authentication. We're going to learn how they allow your server to "remember" information about previous requests.

## Cookie background

HTTP is a "stateless" protocol. This means each new request to your server is totally independent of any other. There is no way by default for a request to contain information from previous requests. Unfortunately it's quite hard to build a website without being able to remember things. For example "what has this user added to their shopping cart?" and "has this user already logged in?".

Cookies were introduced in 1994 as a way for web browsers to store information on behalf of the server. The response to one request can contain a cookie; the browser will store this cookie and automatically include it on all future requests to the same domain.

## How cookies work

A cookie is just a standard HTTP header. A cookie can be set by a server including the `set-cookie` header in a response. Here's an example HTTP response:

```
HTTP/1.1 200 Ok
content-type: text/html
set-cookie: userid=1234

<h1>Hello</h1>
```

That `set-cookie` header tells the browser to store a cookie with a name of `"userid"` and a value of `"1234"`.

This cookie is then sent on all future requests to this domain via the `cookie` request header. Here's an example HTTP request:

```
GET /about HTTP/1.1
accept: text/html
cookie: userid=1234
```

The server would receive this second request, read the `cookie` header and know that this request was made by the same user as before (with a `"userid"` of `"1234"`).

### Expiry

By default a cookie only lasts as long as the user is browsing. As soon as they close their tabs the cookie will be deleted by the browser. This is useful for certain features (like a shopping cart), but less useful for keeping a user logged in.

The server can specify an expiry time for the cookie. This tells the browser to keep it around (even if the user closes their tabs) until the time runs out. There are two ways to control this: `Expires` and `Max-Age`. `Expires` lets you set a specific date it should expire on; `Max-Age` lets you specify how many seconds from now the cookie should last.

All options like this can be set after the cookie value itself:

```
set-cookie: userid=1234; Max-Age=60
```

### Security

Cookies often contain sensitive information. There are a few options that should be specified to make them more secure.

The `HttpOnly` option stops client-side JavaScript from accessing cookies. This can prevent malicious JS code (e.g. from a browser extension) from reading your cookies (this is know as "Cross-site Scripting" or XSS).

The `Same-Site` option stops the cookie from being sent on requests made from other domains. You probably want to set it to "strict". Usually if a site at evil.com sent a request to mybank.com all the cookies for mybank.com would be sent to the server. This can allow other sites to pretend to act on behalf of a logged in user (this is know as "Cross-site Request Forgery" or CSRF).

The `Secure` option will ensure the cookie is only set for secure encrypted (`https`) connections. You shouldn't use this in development (since your `localhost` server doesn't use `https`) but it's a very good idea in production.

## Cookies in Node

Lets see how to set and read cookies using Node.

### Setup

1. Download the starter files and `cd` in
1. `npm install`
1. `npm run dev`

### Raw cookie headers

#### Setting a cookie

First lets set a cookie by adding a "set-cookie" header to the response manually. Edit your home handler:

```js
server.get("/", (request, response) => {
  response.set("set-cookie", "hello=this is my cookie; HttpOnly; Max-Age=60");
  response.send("<h1>Hello</h1>");
});
```

Visit http://localhost:3000 then open dev tools and look at the "Application" tab. Click on "Cookies" in the sidebar and you should be able to see the cookie you just set.

#### Reading a cookie

You can _read_ the cookie on the server by looking at the "cookie" header. Edit your home handler:

```js
server.get("/", (request, response) => {
  const cookies = request.get("cookie");
  console.log(cookies);
  response.set("set-cookie", "hello=this is my cookie; HttpOnly; Max-Age=60");
  response.send("<h1>Hello</h1>");
});
```

If you refresh the page now you should see "hello=this is my cookie" logged. If you delete the cookie using the Application tab of dev tools and refresh again the cookie log should be gone.

Working with cookies this way is quite awkward—everything is just a big string, and we'd have to manually parse any values we needed. Luckily Express comes with some built-in cookie methods.

### Cookies with Express

#### Setting a cookie with Express

Express' `response` object has a `cookie` method. It takes three arguments, the name, the value, and an optional object for all the cookie options. It handles creating the "set-cookie" header string automatically.

Update your home handler:

```js
server.get("/", (request, response) => {
  const cookies = request.get("cookie");
  console.log(cookies);
  response.cookie("hello", "this is my cookie", {
    HttpOnly: true,
    "Max-Age": 60,
  });
  response.send("<h1>Hello</h1>");
});
```

This should create the exact same cookie as before.

#### Reading a cookie with Express

Since reading cookies isn't something _every_ server needs Express doesn't come with it built-in. They provide an optional middleware you need to install and use.

```shell
npm install cookie-parser
```

```js
const cookieParser = require("cookie-parser");

server.use(cookieParser());
```

This middleware works like the built-in body-parsing one. It grabs the "cookie" header, parses it into a nice object, then attaches it to the `request` for you to use.

So now you can access all the cookies sent on this request at `request.cookies`:

```js
server.get("/", (request, response) => {
  console.log(request.cookies);
  // ...
});
```

You should see an object like this logged:

```json
{ "hello": "this is my cookie" }
```

#### Removing cookies with Express

Express also provides the `response.clearCookie` method for removing cookies. It takes the name of the cookie to remove. When the browser receives this response it will delete the matching cookie. Add a new route to your server:

```js
server.get("/remove", (request, response) => {
  response.clearCookie("hello");
  response.redirect("/");
});
```

If you visit http://localhost:3000/remove in your browser you should be redirected back to the home page, but the cookie will be gone.
