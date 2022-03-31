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

You can create a new Postgres user and a new Postgres database owned by that user with these two commands:

```shell
createuser learn_pg_user &&
createdb learn_pg --owner learn_pg_user
```

If this succeeds you shouldn't see any output in your terminal. You can check it worked properly by listing your databases with this command:

```shell
psql --list
```

You should see the new `learn_pg` database in the list, like this:

```
                                  List of databases
   Name    |  Owner        | Encoding |   Collate   |    Ctype    |   Access privileges
-----------+----------+----------+-------------+-------------+-----------------------
 learn_pg  | learn_pg_user | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```

### Populating the database

You can list all the tables in your new database with this command:

```shell
psql learn_pg --command "\dt"
```

You should see "Did not find any relations." This is because our database is empty—we haven't created any tables or inserted any data.

You can populate your database by running SQL commands to create tables and insert data. Doing this manually would be slow and repetitive, however you can run them from a file in the repo instead:

```shell
psql learn_pg --file "./database/init.sql"
```

The `/database/init.sql` file contains SQL commands to create the tables we want, then insert some example data. You can re-run this command to wipe your DB and start from scratch whenever you need to.

{% box  "error" %}

**This is dangerous**. If you run this on your production database you'll delete all your data.

{% endbox %}

### Connecting to the database

We can query our DB manually from the terminal using `psql`, but that doesn't help us build an app. We need a way for our Node server to connect to the DB. To do this we use the [`node-postgres`](https://node-postgres.com) library. You need to install this into the project with:

```shell
npm install pg
```

Our app needs to know the database's address. Postgres runs a local server so you can talk to the DB. The full URL (also known as the "connection string") for your database will be:

```
postgres://learn_pg_user:@localhost:5432/learn_pg
```

You _could_ hard-code this URL into our app code, but this address is only correct for the database running on your computer. When someone else clones your repo they'll have their own DB set up.

### Environment variables

It's best to read configuration like this from an "environment variable" (env vars). This is a value set in the shell before you start your application. For example it's common to read the `PORT` env var to know what port your app should listen on.

Take a look at the `/database/connection.js` file. It imports the `pg` library, then connects to the right DB by passing in the connection string. It reads this from the `DATABASE_URL` env var, which means we must make sure this is set before starting our server.

Rather than type `DATABASE_URL=postgres://... npm run dev` every time, we can rely on the popular `dotenv` library. This allows us to define env vars in a file named `.env`. We gitignore this file so each person who clones the repo can make their own with their own personal DB URL.

First install `dotenv` as a dev dependency:

```shell
npm install --save-dev dotenv
```

Then create a `.env` file at the root of your project containing:

```shell
DATABASE_URL='postgres://learn_pg_user:@localhost:5432/learn_pg'
```

Then change your `dev` npm script in the `package.json` file to this:

```
"nodemon -r dotenv/config server.js"
```

The `-r dotenv/config` bit tells the `dotenv` library to read the `.env` file and pass all the values inside it to your application. They will then be accessible via `process.env.VAR_NAME`.

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
