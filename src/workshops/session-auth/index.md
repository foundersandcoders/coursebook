---
title: Session authentication
description: Learn how to log users in using session cookies
tags:
  - workshop
  - js
keywords:
  - js
  - authentication
  - postgres
---

This workshop will show you how to combine password-based authentication with cookie-based sessions to keep users logged in to your site.

## Setup

1. Download the starter files and `cd` in
1. Run `npm install`

### Database setup

The starter files include two scripts to help with database setup.

Create a new Postgres user and database using:

```shell
./scripts/create_db
```

This script will also create a `.env` file containing the `DATABASE_URL` environment variable, so your server knows how to connect to the local DB.

Insert example data into the database using:

```shell
./populate_db
```

This will recreate all the tables from scratch each time you run it, so it can be handy to "reset" everything if you mess up during the workshop.

Finally you can start the server:

```shell
npm run dev
```

## Code overview

Take a moment to look at the existing code. The server has routes for signing up and logging in. The `GET` routes render forms, but the `POST` routes don't do anything but redirect.

{% box %}

**Important:** a `COOKIE_SECRET` environnment variable is set in the `.env` file and used to configure the `cookie-parser` middleware. When you deploy a server to Heroku you'll need to create a long random string and set it in your app's "Config vars" in Settings.

{% endbox %}

The database created in `database/init.sql` contains two tables: `users` and `sessions`. We'll be storing new users who sign up in `users`, and currently logged in users in `sessions`.

The `sessions` table has a `data` column that is the `JSON` type. This means it can store generic blobs of unstructured data, which is perfect for a session since we don't know exactly what we want to put in there in advance.

You're going to implement the sessions-based authentication functionality. You'll work step-by-step to create each part of the code as a separate function, then bring all the parts together to make the server work.

{% box %}

There are unit tests for each part of the workshop. You can run these to find out if you've implemented the functions correctly. For example:

```shell
npm run test:one
```

{% endbox %}

## Part one: storing sessions in the DB

The database-related code is separate from the rest of the server logic, in `database/model.js`. There are already some functions for accessing data in this file.

The model is missing a way to insert new sessions into the database, so you need to write this function.

1. Write a `createSession` function that takes a session ID and a data object, inserts them into the `sessions` table, and returns the session ID. For example:
   ```js
   model
     .createSession("def456", { just: "testing things" })
     .then((sid) => console.log(sid));
   // Logs: "def456"
   ```

{% disclosure %}

```js
function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}
```

{% enddisclosure %}

## Part two: signing up

User sign up is a three-step process:

1. Get the submitted user data, hash the password, insert the user into the DB
1. Create a new session ID, then store the user data in the `sessions` table (so they're logged in)
1. Set a cookie containing the session ID so they stay logged in on future requests

The `auth.js` file is going to contain all the authentication related code. You'll need to write two functions in here, one to create a user and one to save a session.

1. Write a `createUser` function in `auth.js`. It should take an email, password, and name as arguments, hash the password, then store the user in the database, returning the saved user. For example:
   ```js
   auth
     .createUser("oli@o.com", "hunter2", "Oli")
     .then((user) => console.log(user));
   // Logs: { email: "oli@o.com", name: "Oli" }
   ```
1. Write a `saveUserSession` function in `auth.js`. It should take a user object, generate a random session ID, then store the user data in the `sessions` table. For example:

   ```js
   auth
     .saveUserSession({ email: "oli@o.com", name: "Oli" })
     .then((sid) => console.log(sid));
   // Logs: "ljasf7y983wrkbdss="
   ```

   {% box %}

   **Hint:** you can generate a random, long session ID using Node's `crypto` module:

   ```js
   crypto.randomBytes(18).toString("base64");
   ```

   {% endbox %}

{% disclosure %}

```js
function createUser(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(email, hash, name));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.updateSession(sid, { user });
}

module.exports = { createUser, saveUserSession, COOKIE_OPTIONS };
```

{% enddisclosure %}

Once those functions are working you need to use them in the `/sign-up` route:

1. Use `auth.createUser` and `auth.saveUserSession` in `routes/signUp.js`. Create the user, then save the session, then store the session ID in a cookie before redirecting.

   {% box %}

   You can use the `auth.COOKIE_OPTIONS` export when you set the cookie. You're going to be setting cookies in multiple places, so it's a good idea to centralise the config.

   {% endbox %}

{% disclosure %}

```js
function post(request, response) {
  const { email, password, name } = request.body;
  auth
    .createUser(email, password, name)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
    });
  // ...
}
```

{% enddisclosure %}

## Part three: logging in

User log in is a very similar three-step process:

1. Get the submitted user data, hash the password, check the hash matches the one you have stored for that user
1. Create a new session ID, then store the user data in the `sessions` table (so they're logged in)
1. Set a cookie containing the session ID so they stay logged in on future requests

Only the first step is different for this route, so you'll need to write just one more function in `auth.js`.

1. Write a function `verifyUser` that takes an email and password as arguments, then gets the stored user from the DB using the email, then uses `bcrypt.compare` to verify the password. If the passwords match return the user object, otherwise throw an error. For example:
   ```js
   auth.verifyUser("oli@o.com", "hunter2").then((user) => console.log(user));
   // Logs: { email: "oli@o.com", name: "Oli" }
   // (assuming the password is correct)
   ```

{% disclosure %}

```js
function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Password mismatch");
      } else {
        return user;
      }
    });
  });
}
```

{% enddisclosure %}

Once this function is working you need to use it in the `/log-in` route:

1. Use `auth.verifyUser`, `auth.saveUserSession` and `auth.COOKIE_OPTIONS` in `routes/logIn.js`. Verify the user's password, then save the session, then store the session ID in a cookie before redirecting.

{% disclosure %}

```js
function post(request, response) {
  const { email, password } = request.body;
  auth
    .verifyUser(email, password)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
    });
  // ...
}
```

{% enddisclosure %}

## Stretch goal: logging out

The `POST /log-out` route should delete the stored session from the DB, clear the session cookie and redirect back to the home page.

1. Write a `deleteSession` function in `model.js` that takes a session ID and deletes the matching row from the `sessions` table, returning nothing. For example:
   ```js
   model.deleteSession("def456").then(() => console.log("done"));
   // Logs: "done"
   ```
1. Use `model.deleteSession` in the `routes/logOut.js`. The handler should delete the session and clear the cookie.
