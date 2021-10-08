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

Cookies were introduced in 1994 as a way for web browsers to store information on behalf of the server. The response to one request can contain a cookie; the browser will store this cookie and automatically include it on **all future requests** to the same domain.

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

### Cookie attributes

Cookies also support extra attributes to customise their behaviour. These can be set after the cookie value itself, like this:

```
set-cookie: userid=1234; Max-Age=60; HttpOnly; SameSite=Lax
```

#### Expiry

By default a cookie only lasts as long as the user is browsing. As soon as they close their tabs the cookie will be deleted by the browser. This is useful for certain features (like a shopping cart), but less useful for keeping a user logged in.

The server can specify an expiry time for the cookie. This tells the browser to keep it around (even if the user closes their tabs) until the time runs out. There are two ways to control this: `Expires` and `Max-Age`. `Expires` lets you set a specific date it should expire on; `Max-Age` lets you specify how many seconds from now the cookie should last.

#### Security

Cookies often contain sensitive information. There are a few options that should be specified to make them more secure.

The `HttpOnly` option stops client-side JavaScript from accessing cookies. This can prevent malicious JS code (e.g. from a browser extension) from reading your cookies (this is know as "Cross-site Scripting" or XSS).

The `Same-Site` option stops the cookie from being sent on requests made from other domains. You probably want to set it to "Lax" (which is the default starting with Chrome v84). Otherwise there's a risk of other sites pretending to act on behalf of a logged in user (this is know as "Cross-site Request Forgery" or CSRF).

The `Secure` option will ensure the cookie is only set for secure encrypted (`https`) connections. You shouldn't use this in development (since your `localhost` server doesn't use `https`) but it's a very good idea in production.

---

## Cookies in Node

Lets see how to set and read cookies using Node.

### Setup

1. Download the starter files and `cd` in
1. `npm install`
1. `npm run dev`

### Raw cookie headers

#### Setting a cookie

First lets set a cookie by adding a "set-cookie" header to a response manually. Add a new handler for the `GET /example` route:

```js
server.get("/example", (request, response) => {
  response.set(
    "set-cookie",
    "hello=this is my cookie; HttpOnly; Max-Age=60; SameSite=Lax"
  );
  response.redirect("/");
});
```

Visit http://localhost:3000/example. You should be redirected back to the homepage. Open dev tools and look at the "Application" tab. Click on "Cookies" in the sidebar and you should be able to see the cookie you just set.

#### Reading a cookie

You can _read_ the cookie on the server by looking at the "cookie" header. Edit your home handler:

```js
server.get("/", (request, response) => {
  const cookies = request.get("cookie");
  console.log(cookies);
  response.send("<h1>Hello</h1>");
});
```

If you refresh the page now you should see "hello=this is my cookie" logged. If you delete the cookie using the Application tab of dev tools and refresh again the cookie log should be gone.

Working with cookies this way is quite awkward—everything is just a big string, and we'd have to manually parse any values we needed. Luckily Express comes with some built-in cookie methods.

### Cookies with Express

#### Setting a cookie with Express

Express' `response` object has a `cookie` method. It takes three arguments, the name, the value, and an optional object for all the cookie options. It handles creating the "set-cookie" header string automatically.

{% box %}

Confusingly the Express cookie handler expects the max-age to be specified in **milliseconds**, not seconds. Make sure you set a larger number than before!

{% endbox %}

Update your `/example` handler to use Express' cookie helper:

```js
server.get("/example", (request, response) => {
  response.cookie("hello", "this is my cookie", {
    httpOnly: true,
    maxAge: 1000 * 60, // 60,000ms (60s)
    sameSite: "lax",
  });
  response.redirect("/");
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

---

## Authentication

Cookies are useful for ensuring users don't have to keep verifying their identity on every request. Once a user has proved who they are (usually by entering a password only they know) it's important to remember that information.

### "Stateless" authentication

There are two ways to use cookies for authenticating users. The first is often known as "stateless" auth. We can store all the information we need to know in the cookie itself. For example:

```js
const userInfo = {
  id: 1,
  username: "oliverjam",
  admin: true,
};
response.cookie("user", userInfo, {
  httpOnly: true,
  maxAge: 1000 * 60,
  sameSite: "lax",
});
```

When the user first logs in we set a cookie containing the user's information. On subsequent requests our server can check for this cookie. If it is present we can assume the user has previously logged in, and so we allow them to see protected content.

#### Signing cookies

Unfortunately this has a pretty serious security problem: we _can't_ trust cookies sent to us. Since a cookie is just an HTTP header anybody could send a cookie that looks like anything. E.g. anyone can use `curl` to send such a request:

```shell
curl -H 'cookie: user={"id":1,"username":"oliverjam","admin":true}' localhost:3000
```

It's also easy to edit cookie values in dev tools—a user could simply change their ID/username to another.

However there is a way we can trust cookies: we can sign them. In cryptography signing refers to using a mathematical operation based on a secret string to transform a value. This signature will always be the same assuming the same secret and the same input value. Without the secret it is impossible to reproduce the same signature.

If we sign our cookie we can validate that it has not been tampered with, since only our server knows the secret required to create a valid signature. Implementing this from scratch would be complex and easy to mess up—luckily the `cookie-parser` middleware supports signed cookies.

```js
server.use(cookieParser("alongrandomstringnobodyelseknows"));

server.get("/", (request, response) => {
  console.log(request.signedCookies);
});

server.get("/example", (request, response) => {
  response.cookie("hello", "this is my cookie", { signed: true });
  response.redirect("/");
});
```

You need to pass a random secret string to the `cookieParser()` middleware function. Then you can specify `signed: true` in the cookie options. Signed cookies are available at a different request key to normal cookies: `request.signedCookies`.

### Challenge 1: stateless auth

1. Add a `GET /login` route that sets a _signed_ cookie containing some user information, then redirects to the home page
1. Add a `GET /logout` route that removes the cookie, then redirects to the home page
1. Log the signed cookies in the home route

If you visit `/login` you should see the cookie data you set logged in your terminal. In the browser's dev tools the cookie will have some extra random stuff attached to it. This is the signature.

```
s:j:{"id":1,"username":"oliverjam","admin":true}.uJLn0/18tqme8pQE0bB+8WsqeEXP2IY19l+34YdyFnk
```

If you edit the cookie in dev tools and then refresh you should instead see your server log `false` for that cookie name. This is because the signature no longer matches, so the server does not trust the cookie.

If you visit `/logout` the cookie should be removed from your browser.

{% disclosure %}

```js
server.get("/", (request, response) => {
  console.log(request.signedCookies);
  response.send("<h1>Hello</h1>");
});

server.get("/login", (request, response) => {
  const userInfo = {
    id: 1,
    username: "oliverjam",
    admin: true,
  };
  response.cookie("user", userInfo, {
    httpOnly: true,
    maxAge: 1000 * 60,
    sameSite: "lax",
    signed: true,
  });
  response.redirect("/");
});

server.get("/logout", (request, response) => {
  response.clearCookie("user");
  response.redirect("/");
});
```

{% enddisclosure %}

#### Stateless auth downsides

Storing all the information we need inside the cookie like this is very convenient. However there are some downsides:

1. Cookies have a 4kb size limit, so you can't fit _too_ much info in them.
1. The cookie is the "source of truth". This means the server cannot invalidate a cookie, it has to wait for the cookie to expire. The server cannot log users out—as long as their cookie is valid they can keep making requests.

### Server-side session authentication

The other way to keep users logged in is to keep track of that state on the server. The cookie just stores a unique ID. This ID refers to some data that lives on the server and stores all the user info.

For example once a user logs in you might set a cookie containing a session ID like this:

```
set-cookie: sid=abcd; HttpOnly; Max-Age=60;
```

and then store the relevant user info using that `sid` as a key:

```js
let sessions = {};

// later
sessions["abcd"] = { id: 1, username: "oliverjam", admin: true };
```

Here we're just putting the session data in an object, which means it will get deleted whenever the server restarts. Ideally this information would be stored in a database so it persists.

On subsequent requests the server would read the session ID cookie, then use that to look up the user info from the `sessions` object.

```js
server.get("/", (request, response) => {
  const sid = request.signedCookies.sid;
  if (sid) {
    const userInfo = sessions[sid];
    console.log(userInfo);
  }
  response.send("<h1>Hello</h1>");
});
```

This allows the server to control the "session"—if it needs to log a user out it can simply delete that entry from the `sessions` storage.

#### Security

It's important that the session ID is a long random string, so that nobody can guess them. Here's a good way to generate a random 18 byte long string in Node:

```js
const crypto = require("crypto");

const sid = crypto.randomBytes(18).toString("base64");
// "MqLV99hG294x5+Q+gm5gHnbH" (this will be different every time)
```

Also although we aren't directly storing user info in the cookie we still need to sign it. Otherwise if someone did find a way to guess the session IDs they could edit their cookie.

#### Challenge 2: session auth

1. Change your `GET /login` route to set a signed session ID cookie. This cookie should just contain a long random string
1. Store the user data in a global sessions object
1. Change the home handler to read the session ID cookie, look the user info up in the global sessions object, then log it
1. Change the `GET /logout` route to remove the cookie and delete the session from the global sessions object

{% disclosure %}

```js
let sessions = {};

server.get("/", (request, response) => {
  const sid = request.signedCookies.sid;
  if (sid) {
    const userInfo = sessions[sid];
    console.log(userInfo);
  }
  response.send("<h1>Hello</h1>");
});

server.get("/login", (request, response) => {
  const sid = crypto.randomBytes(18).toString("base64");
  const userInfo = {
    id: 1,
    username: "oliverjam",
    admin: true,
  };
  sessions[sid] = userInfo;
  response.cookie("sid", sid, {
    httpOnly: true,
    maxAge: 60,
    signed: true,
  });
  response.redirect("/");
});

server.get("/logout", (request, response) => {
  const sid = request.signedCookies.sid;
  delete sessions[sid];
  response.clearCookie("sid");
  response.redirect("/");
});
```

{% enddisclosure %}
