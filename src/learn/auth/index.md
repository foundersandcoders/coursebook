---
title: Authenticating web apps
description: Learn how to safely store passwords, and identify returning users with cookies and sessions
tags:
  - workshop
keywords:
  - js
  - express
  - auth
challenge: https://github.com/foundersandcoders/auth-challenge
---

Applications often store information specific to individual users. It is important to only allow access to the correct people, to avoid potentially malicious actors stealing or deleting private data. The term _authentication_ refers to the process of verifying the identity of a specific user; _authorization_ refers to verifying that this user is allowed to do something.

{% box "info" %}

Authentication is a complex topic with serious repercussions for getting it wrong. To keep this workshop focused we are going to focus on the necessary concepts to get a simple signup/login system working. This means we will be skipping over the "glue code" (e.g. the actual server, HTML forms etc).

{% endbox %}

## Verifying users with passwords

The simplest way to verify a user is by asking them for a secret when they create an account. They can then provide this secret when they want access—since only they should know it you can trust that they are who they say they are.

Early versions of password protection were simple:

1. Ask user for a password on account creation
1. Store the password in database
1. (later) Ask user for a password again on login
1. Read password from database and check they are the same

Unfortunately storing passwords in "plaintext" like this is problematic. Anybody with access to the DB can see every user's password—this includes employees of the business and any hackers who manage to connect to the DB.

Leaking passwords like this is especially bad because most users re-use the same password for many sites. You may not be too worried about the security of your dog-rating app, but some of your users probably gave you their bank password.

Ideally we need a way to verify passwords without actually storing the password.

## Hashing passwords

Hashing is when you use a mathematical process (algorithm) to convert a string into a different one. Hashes are:

- One-way: it should be impossible to reverse the process.
- Deterministic: hashing the same string always gives the same result.
- Unique: hashing a different string should never create the same result.

Here's a quick way to create a hash using Node:

```js
const crypto = require("node:crypto");

const password = "hunter2";

// Hash string with the SHA256 algorithm and output in hexadecimal format
const hashed = crypto.createHash("sha256").update(password).digest("hex");
// "f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7"
```

There is no way to turn the "f52fb..." hash back into "hunter2", so it's safe to store in our DB. A different password will never create the same hash, so there won't be conflicts.

Here's the flow from above updated to use hashing:

1. Ask user for a password on account creation
1. _Hash the password, then store the hash in database_
1. (later) Ask user for a password again on login
1. _Hash the provided password_
1. Read the hash from the DB and check they are the same

## Salting password hashes

There is still a security problem here: hashing the same password always creates the same output. This lets a hacker who has stolen your DB use something called a "rainbow table" to make finding passwords easier.

A rainbow table is a big list of pre-computed hashes for common passwords. This lets them quickly match pre-computed hashes to those in your DB to find out what password was used to create the hash. This is _much_ faster than hashing each password before comparing, since good hashing algorithms are deliberately slow to prevent this type of brute-force attack.

We can avoid this problem by ensuring each hash is truly unique. If we add a random string to the password before hashing then the result will always be different. We must then store the salt in the DB alongside the password, as we will need it to recreate the hash when we verify a user.

1. Ask user for a password on account creation
1. _Generate a random salt_
1. _Hash the password + salt, then store the hash and salt in database_
1. (later) Ask user for a password again on login
1. Read the hash and salt from the DB
1. _Hash the provided password + stored salt_
1. Check the hashes are the same

It is now impossible for any of these hashes to be pre-computed, since the hacker would need to know the salt in advance..

## Using BCrypt to hash passwords

Our sign up/log in process has gotten quite complex. There are many moving parts to get right, and any flaw could be exploited by a hacker. It is a good idea to rely on a popular battle-tested library to implement these features for us instead of trying to write them ourselves.

The [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js) npm package provides simple methods for hashing a password (with salt) and comparing a password to a hash. Let's see how we'd use it to hash a password:

```js
const bcrypt = require("bcryptjs");

const password = "hunter2";

bcrypt.hash(password, 12).then((hash) => console.log(hash));
// $2a$10$n1etzOWCrAtJGQIDoaw0mun1ojnIjA2UaiJ8DkL76ljhGa/cZCQtq
```

The `.hash` method is designed to be slow, to make brute-force attacks harder. You control how slow it should be using the second argument (`12` is a good compromise between speed and security). It returns a promise—you need to wait for this to resolve before you can access the hash.

The `.compare` method lets us compare the hash to passwords to see if they match:

```js
//...

bcrypt.hash(password, cost).then((hash) => {
  bcrypt.compare("hunter2", hash).then((result) => console.log(result));
  // true
  bcrypt.compare("incorrect", hash).then((result) => console.log(result));
  // false
});
```

This method returns a promise that resolves with a boolean telling you whether the password matches the hash.

{% box %}

Make sure you pass the hash as the _second_ argument, otherwise the comparison won't work.

{% endbox %}

## Keeping users logged in

We can verify that a user's submitted password matches the one they previously signed up with, but this isn't enough for an authentication system. Users do not want to type their password in every time they load a new page or take an action. We need a way to persist our verification across many requests.

HTTP is a "stateless" protocol. This means each new request to your server is totally independent of any other. There is no way by default for a request to contain information from previous requests.

Cookies were introduced in 1994 as a way for web browsers to store information on behalf of the server. The response to one request can contain a cookie; the browser will store this cookie and automatically include it on **all future requests** to the same domain.

## How cookies work

A cookie is just a standard HTTP header. They can be set by a server including the `set-cookie` header in a response. Here's an example HTTP response:

```
HTTP/1.1 200 Ok
content-type: text/html
set-cookie: userid=1234

<h1>Hello</h1>
```

That `set-cookie` header tells the browser to store a cookie with a name of `"userid"` and a value of `"1234"`. This cookie is then sent on all future requests to this domain via the `cookie` request header. Here's an example HTTP request:

```
GET /about HTTP/1.1
accept: text/html
cookie: userid=1234
```

The server can read the `cookie` header to retrieve the info it previously stored.

### Cookie attributes

Cookies also support extra attributes to customise their behaviour. These can be set after the cookie value itself, like this:

```
set-cookie: userid=1234; Max-Age=60; HttpOnly; SameSite=Lax
```

#### Expiry

By default a cookie only lasts as long as the user is browsing. As soon as they close their tabs the cookie will be deleted by the browser. The server can specify an expiry time for the cookie. There are two ways to control this: `Expires` and `Max-Age`. `Expires` lets you set a specific date it should expire on; `Max-Age` lets you specify how many seconds from now the cookie should last.

#### Security

These options help make your cookies more secure:

- `HttpOnly` stops client-side JavaScript from accessing cookies. This can prevent malicious JS code from reading your cookies ("Cross-site Scripting" or XSS).
- `Same-Site=Lax` stops the cookie from being sent on requests made from other domains. Without this other sites can fake requests from a logged in user ("Cross-site Request Forgery" or CSRF).
- `Secure` will ensure the cookie is only set for encrypted (`https`) connections. You shouldn't use this in development (since `localhost` doesn't use `https`) but it's a good idea in production.

## Cookies in Node

Since cookies are just HTTP headers you can set them and read them in a Node server:

```js
// responding to one request...
response.set("set-cookie", "hello=world; HttpOnly; Max-Age=60; SameSite=Lax");

// reading a later request...
console.log(request.get("cookie"));
// "hello=world; HttpOnly; Max-Age=60; SameSite=Lax"
```

Working with the raw headers like this is awkward though. Everything is just a big string, so it's hard to create a cookie with the right options and even harder to extract the cookie value from the header. There could also be _multiple_ cookies within one header.

## Cookies in Express

Express provides helper methods for setting cookies. The `response.cookie` method lets you set a cookie by providing the name, value and any options:

```js
response.cookie("hello", "world", {
  httpOnly: true,
  maxAge: 6000,
  sameSite: "lax",
});
// This sets the same `set-cookie` header as before
```

You can also delete a cookie using the `response.clearCookie` method. This takes the name of the cookie to delete and sets the right header to remove it:

```js
response.clearCookie("hello");
// This sets a header that deletes the previous cookie in the browser
```

Express does not have a built-in way to _read_ cookies. You need to install the `cookie-parser` middleware from npm for this. It works just like the built-in body-parsing middleware—it grabs the header, parses the string into an object, then attaches it to the `request` object for you.

```js
const cookieParser = require("cookie-parser");

server.use(cookieParser());

// Reading a later request...
console.log(request.cookies);
// { hello: "world" }
```

## Using cookies for authentication

Now we know how to use cookies to store info in the browser we can keep a user logged in. Once we've verified their password we can store a cookie that effectively says "this is oli". On subsequent requests the server would read the cookie to find out which user it came from. E.g. the cookie might look like this: `userid=1`.

Unfortunately this wouldn't be very secure. Anyone can send any HTTP headers they like to your server. You could use dev tools to edit your request to send `userid=2` to pretend to be a totally different user.

We need a way to ensure our cookie hasn't been tampered with. Luckily cryptography has a solution for us: [_signatures_](https://en.wikipedia.org/wiki/Digital_signature). This means combining a value with a secret in a one-way mathematical operation. This is called a "signature", and it can only be reproduced by someone with both the value _and_ the secret.

If we send both the value and the signature in the cookie we can recalculate the signature on the server (using the secret) to make sure the cookie wasn't tampered with. E.g. if someone changed `userid=1` to `userid=2` it would break the signature.

Express' `cookie-parser` middleware supports signing cookies automatically. You just have to pass a secret in when you initialise the middleware, then set the `signed` option when you create a cookie:

```js
server.use(cookieParser("random-string-that-should-be-an-env-var"));

// ...
response.cookie("hello", "world", {
  signed: true,
  httpOnly: true,
  maxAge: 6000,
  sameSite: "lax",
});
```

Now when you read cookies they'll be available at `request.signedCookies`:

```js
// Reading a later request...
console.log(request.signedCookies);
// { hello: "world" }
```

If the signature didn't match the cookie will not be present in the object.

{% box %}

You should use signed cookies for pretty much everything

{% endbox %}

## Stateless authentication flow

Our current auth flow looks like this:

1. Ask user for a password on login
1. Read the hash from the DB
1. Check the hashes are the same with `bcrypt.compare`
1. Set a signed cookie with any user info we might need
1. (later) read the cookie to find out info about the user

This is known as "stateless" auth, because we store all the info we might need for authentication in the cookie. The server doesn't need to check the DB to know whether a request is authenticated.

This is convenient but has some downsides:

1. Cookies have a 4kb size limit, so you can't fit _too_ much info in them.
1. The server cannot log users out. Any device with a valid cookie is "logged in".
1. The server cannot enforce expiry time, since users can edit their cookies in the browser.

Ideally we need a system that lets us keep track of who is logged in on the server, so we can revoke that access when necessary.

## Session authentication flow

Instead of storing all the user info in the cookie, we can just store a random "session ID" that corresponds to info stored in our DB. Now the cookie itself has no power, the _server_ decides whether the user is logged in based on the session info.

Here's a modified auth flow:

1. Ask user for a password on login
1. Read the hash from the DB
1. Check the hashes are the same with `bcrypt.compare`
1. _Insert row into `sessions` table with user info_
1. Set a signed cookie with _the session ID_
1. (later) read the _session ID_ from the cookie
1. _(later) look up the session info from the DB_

This avoids all the problems with stateless auth:

1. We only store an ID in the cookie, so the 4kb limit doesn't matter
1. The server can log users out by deleting the corresponding row from the DB
1. The server can store session expiry dates in the DB to ensure an old cookie cannot be reused

Here's roughly how this might be implemented. First we need a table to store our session in:

```sql
-- schema.sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- plus other columns...
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  expires_at DATETIME NOT NULL
)
```

For now we're just storing the `user_id`, which we can use to look up other user info later. We'll also store the expiry time so we can ensure users aren't logged in forever.

Then we need a function to generate a random session ID and insert the session:

```js
// model.js
const crypto = require("node:crypto");

// Sets the expiry to current date + 7 days
const insert_session = db.prepare(`INSERT INTO sessions VALUES (
  $id,
  $user_id,
  DATE('now', '+7 days')
)`);

function createSession(user_id) {
  // quick way to generate a random string in Node
  const id = crypto.randomBytes(18).toString("base64");
  insert_session.run({ id, user_id });
  // return the generated ID so we can store in a cookie
  return id;
}
```

We'll also need function to retrieve a session:

```js
// model.js

const select_session = db.prepare(`
  SELECT id, user_id, expires_at
  FROM sessions WHERE id = ?
`);

function getSession(sid) {
  return select_session.get(sid);
}
```

Now handlers can read the session cookie to find out which user (if any) made the request:

```js
// routes/private.js

function get(req, res) {
  const sid = req.signedCookies.sid;
  const session = model.getSession(sid);
  if (session && session.user_id) {
    // we have a logged in user
    res.send("<h1>Private stuff</h1>");
  } else {
    // request is not authenticated
    res.status(401).send("<h1>Please log in to view this page</h1>");
  }
}
```

Since this logic will be repeated in any request that needs to check the session it would be worth abstracting into an Express middleware.

## Authentication summary

Things got a little complicated, so let's recap our final authentication flow to make it clear:

### Signing up

1. User submits their email and password
1. Hash the password with BCrypt
1. Insert a new user into the DB to store email and hash
1. Create new session in the DB
1. Set a signed cookie with the session ID
1. Redirect to whatever page comes next

### Logging in

1. User submits their email and password
1. Retrieve the stored user where email matches
1. Compare submitted password with stored hash
1. If they match create a new session in the DB
1. Set a signed cookie with the session ID
1. Redirect to whatever page comes next

### Checking auth

1. Read the session ID from the signed cookie
1. Retrieve the stored session from DB
1. (optional) remove the session & cookie if expired
1. Get the user ID from the session
1. (optional) Retrieve the stored user from the DB using the user ID
1. Decide whether the user is allowed to see the page
