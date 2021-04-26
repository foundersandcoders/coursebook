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

Create a new Postgres user and database:

```shell
npm run db:setup
```

This script will also create a `.env` file containing the `DATABASE_URL` environment variable, so your server knows how to connect to the local DB.

Insert example data into the database:

```shell
npm run db:build
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

## Part one: storing sessions in the DB

The first thing we need is a way to select, insert and delete sessions from the database. Since these deal with data access they should be kept with the rest of the database-related code, in `database/model.js`.

{% box %}

You can run the unit tests for these functions to see when they work correctly.

```shell
npm run test:model
```

{% endbox %}

1. Write a `getSession` function that takes a session ID and returns the `data` column of the matching row in the `sessions` table. For example:
   ```js
   model.getSession("abc123").then((session) => console.log(session));
   // Logs: { test: "stuff" }
   ```
1. Write a `createSession` function that takes a session ID and a data object, inserts them into the `sessions` table, and returns the session ID. For example:
   ```js
   model
     .createSession("def456", { just: "testing things" })
     .then((sid) => console.log(sid));
   // Logs: "def456"
   ```
1. Write a `deleteSession` function that takes a session ID and deletes the matching row from the `sessions` table, returning nothing. For example:
   ```js
   model.deleteSession("def456").then(() => console.log("done"));
   // Logs: "done"
   ```

{% box %}

Don't forget to export these methods!

{% endbox %}

**This is a work in progress**

1. Write auth functions to handle various tasks:
   - `auth.createUser`: takes email/password, hashes pw, inserts into DB
   - `auth.createUserSession`: takes user, generates unique sid, inserts new session into DB with user data
   - `auth.verifyUser`: takes email/pw, compares pw to stored hash, either throws error for mismatch or returns user
1. Use auth functions to make signup/login routes work
   - `GET /sign-up`: uses `auth.createUser` and `auth.createUserSession` to handle new user sign ups. Should set session cookie and redirect to home after.
   - `GET /log-in`: uses `auth.verifyUser` and `auth.createUserSession` to handle existing user logging in. Should set session cookie and redirect to home after.
