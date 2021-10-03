---
title: Learn Postgres with Node
description: Learn how to use a Postgres database on a Node server
tags:
  - workshop
  - js
keywords:
  - js
  - sql
  - postgres
---

This workshop covers how to connect your Node server to a Postgres database using the [`node-postgres`](https://node-postgres.com/) library.

## Setup

Before you begin make sure you have [installed Postgres](https://github.com/macintoshhelper/learn-sql/blob/master/postgresql/setup.md).

1. Download the starter files
1. `cd` into the directory
1. Run `npm install`

The starter files include some dependencies and database setup. As you work through the workshop you should read the corresponding files and try to understand what the code does. Each file includes explanatory comments to help.

## Database setup

In order to run our app locally we'll need a Postgres database running on our machine to connect to.

### Creating a local database

Setting up a new DB can be frustrating, so this repo includes a script do it automatically. You can run it in your terminal with:

```shell
./scripts/create_db
```

{% disclosure "If you get a connection error" "error" %}

```shell
psql: error: could not connect to server: FATAL: database "oliver" does not exist
```

This happens because `psql` by default tries to connect to a database with the same name as your user account. If this is missing you should create it with:

```shell
createdb $(whoami)
```

`whoami` will insert your username automatically.

{% enddisclosure %}

The `create_db` script will run a few terminal commands in a row:

1. Create a new database user
1. Create a new database owned by that user
1. Create a `.env` file containing a "connection string" so your app knows where to reach the DB

After successfully running this script you should have a new database named `learn_pg`. You can check by running `psql --list` to view all your DBs.

### Populating the database

Our database is currently empty. The repo includes a script for populating the DB. You can run it in your terminal with:

```shell
./scripts/populate_db
```

This script executes the SQL commands inside `/database/init.sql` against your DB. These create the tables we want, and insert some example data. You can re-run it to wipe your DB and start from scratch whenever you need to.

{% box  "error" %}

**This is dangerous**. If you run this on your production database you'll delete all your data.

{% endbox %}

### Connecting to the database

We can query our DB manually from the terminal using `psql`, but that doesn't help us build an app. We need a way for our Node server to connect to the DB.

To do this we use the [`node-postgres`](https://node-postgres.com) library (called `pg` on npm). It's listed as a dependency in the `package.json` file, so was automatically downloaded when you ran `npm install`.

Take a look at `/database/connection.js`. We import the `pg` library, then connect to the right DB by passing in a "connection string" (a URL identifying the DB and user).

{% disclosure "More info about the connection string" %}

The connection string is a URL pointing to your exact Postgres DB, including the user and password. It is structured like this:

```
postgres://username:password@localhost:5432/database_name
```

We read it from an environment variable in `connection.js`—this is because we want the DB password to stay secret, and so that different environments can connect to different DBs. E.g. we want to use a local DB during development but one on Heroku when we deploy our app.

When we run `npm run dev` to start the server it will execute `nodemon -r dotenv/config server.js`. This tells Node to use the [`dotenv`](https://www.npmjs.com/package/dotenv) library to load env vars _before_ our server starts. This will read the `.env` file and load all the env vars automatically.

{% enddisclosure %}

The `/database/connection.js` file exports a "pool" of connections for our app to use. This helps handle multiple requests at the same time. We can import the `db` variable in any other file to send requests to the DB.

## Using the database

Now our server knows how to talk to our database we can start using it in our route handlers. First let's make our home route list all the users in the database.

Open `workshop/routes/home.js`. To access our DB we need to import the pool object we created in `connection.js`:

```js
const db = require("../database/connection.js");
```

### Querying for data

This `db` object has a `.query` method that sends SQL commands to the database. It takes a SQL string as the first argument and returns a promise. This promise resolves when the query result is ready.

Let's get all the users in the DB:

```js
const db = require("../database/connection.js");

function get(request, response) {
  db.query("SELECT * FROM users").then((result) => {
    console.log(result);
  });
  response.send("<h1>Hello world</h1>");
}
```

Refresh the home page and you should see a big object logged in your terminal. This is the entire result of our database query.

The bit we're actually interested in is the `rows` property. This is an array of each matching entry in the table we're selecting from. Each row is represented as an object, with a key/value property for each column.

You should see an array of user objects, where each object looks like this:

```js
{ id: 1, username: 'Sery1976', age: 28 }
```

Since DB queries return promises we need to make sure we send our response _inside_ the `.then` callback. Let's send back a list of all users' first names:

```js
const db = require("../database/connection.js");

function get(request, response) {
  db.query("SELECT * FROM users").then((result) => {
    const users = result.rows;
    const userList = users.map((user) => `<li>${user.username}</li>`).join("");
    response.send(`<ul>${userList}</ul>`);
  });
}
```

Refresh the page and you should see an unordered list containing each user's first name.

{% box %}

#### Challenge

We're currently querying for too much data: we only need the `username`, but we're getting _every_ column. For very big data sets this could be a performance problem.

**Amend your query so it only returns the column we need.**

{% endbox %}

### Updating data

Navigate to http://localhost:3000/create-user. You should see a form with fields for each column in our user database table. It submits a `POST` request to the same path. The `post` handler logs whatever data was submitted. Try it now to see it working.

We want to use the `INSERT INTO` SQL command to create a new user based on the user-submitted information.

#### Safely handling user input

Including user-submitted information in a SQL query is dangerous. A malicious user could enter SQL syntax into an input. If we just inserted this straight into a query this would mean they could execute dangerous commands in our DB. This is one of the most common causes of major hacks, so it's important to prevent it.

{% box "error" %}

**You should never directly insert user input into a SQL string:**

```js
// NEVER DO THIS!
db.query(`INSERT INTO users(username) VALUES(${username})`);
```

If the user typed `; DROP TABLE users;` into the `username` input we'd end up running that command and deleting all our user data!

{% endbox %}

The `pg` library uses something called "parameterized queries" to safely include user data in a SQL query. This allows it to protect us from injection. We can leave placeholders in our SQL string and pass the user input separately so `pg` can make sure it doesn't contain any dangerous stuff.

```js
db.query("INSERT INTO users(username) VALUES($1)", [username]);
```

We use `$1`, `$2` etc as placeholders, then pass our values in an array as the second argument to `query`. `pg` will insert each value from the array into its corresponding place in the SQL command (after ensuring it doesn't contain any SQL).

{% box %}

#### Challenge

Edit the `post` handler function in `create-user.js` to save the submitted user data in the database. Make sure to use a parameterized query.

{% endbox %}

### Relational data

So far we've only touched the `users` table. Let's make the `posts` visible too.

1. Add a new route `GET /posts`
1. This should display a list of all the posts in your database
1. Once that's working amend the handler to also show **the username of each post's author**.

{% box %}

**Hint**: You'll need to use a join to get data from both tables in one query.

{% endbox %}
