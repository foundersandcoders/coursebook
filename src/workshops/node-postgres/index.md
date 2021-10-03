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

<!--
## Creating your local database

Type `psql` in your terminal to enter the Postgres command-line interface. You can type `ctrl-d` to exit this at any time. You can enter SQL commands here.

{% disclosure "If you get a connection error" "error" %}

```shell
psql: error: could not connect to server: FATAL: database "oliver" does not exist
```

This happens because `psql` by default tries to connect to a database with the same name as your user account. This should exist automatically, but if it's missing you should create it with:

```shell
createdb $(whoami)
```

`whoami` will insert your username automatically.

{% enddisclosure %}

First we need to create a new database user for our app. It's more secure to have a dedicated user per application, rather than reusing your personal admin user.

```sql
CREATE USER myuser SUPERUSER PASSWORD 'password';
```

Then create a new database owned by the new user:

```sql
CREATE DATABASE learn_node_postgres WITH OWNER myuser;
```

You can connect to this new database with:

```sql
\connect learn_node_postgres
```

Unfortunately there's nothing inside our database yet. We need to write some SQL that creates our tables and populates them with example data for us to use. We're going to create two tables: `users` and `blog_posts`. Each blog post will have a `user_id` relation pointing to whichever user wrote the post.

### Schemas

#### `users`

| Column   | Type         | Constraints |
| -------- | ------------ | ----------- |
| id       | SERIAL       | PRIMARY KEY |
| username | VARCHAR(255) | NOT NULL    |
| age      | INTEGER      |             |
| location | VARCHAR(255) |             |

#### `blog_posts`

| Column       | Type    | Constraints          |
| ------------ | ------- | -------------------- |
| id           | SERIAL  | PRIMARY KEY          |
| user_id      | INTEGER | REFERENCES users(id) |
| text_content | TEXT    |                      |

## Initialising your database

Let's write some SQL to put some initial data into our database. Create a directory called `database` inside `workshop/`. Create a file called `init.sql` inside the `database/` directory. We can write our initialisation commands here.

First we create a "transaction". This is a block of SQL that will run in order, saving the result only if everything was successful. This avoids ending up with partially updated (broken) data if the commands fail halfway through. We start a transaction with `BEGIN;` and end it with `COMMIT;`.

```sql
BEGIN;
-- our commands go in between
COMMIT;
```

This file is going to be used to set up the database from scratch whenever we run it, which means we need to delete any existing tables before we try to create them.

{% box  "error" %}

**This is dangerous**. If you run this on your production database you'll delete all your users' data.

{% endbox %}

```sql
BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

COMMIT;
```

The `CASCADE` tells it to delete any related tables to these ones as well.

Now we can create our tables from scratch using `CREATE TABLE`. We need to specify all the type information from the schema above:

```sql
BEGIN;

DROP TABLE IF EXISTS users, blog_posts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  age INTEGER,
  location VARCHAR(255)
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  text_content TEXT
);

COMMIT;
```

Finally we need to put some example data into the tables so we can experiment with the database. In a production database you probably wouldn't do this. We can use `INSERT INTO` to add data to a table. Add these lines to your file before the `COMMIT`:

```sql
INSERT INTO users (username, age, location) VALUES
  ('Sery1976', 28, 'Middlehill, UK'),
  ('Notne1991', 36, 'Sunipol, UK'),
  ('Moull1990', 41, 'Wanlip, UK'),
  ('Spont1935', 72, 'Saxilby, UK'),
  ('Precand', 19, 'Stanton, UK')
;

INSERT INTO blog_posts (text_content, user_id) VALUES
  ('Announcing of invitation principles in.', 1),
  ('Peculiar trifling absolute and wandered yet.', 2),
  ('Far stairs now coming bed oppose hunted become his.', 3),
  ('Curabitur arcu quam, imperdiet ac orci ac.', 4),
  ('Aenean blandit risus sed pellentesque.', 5)
;
```

To test that this works you can run `psql learn_node_postgres` to start the Postgres CLI and connect to your database, then run the `init.sql` file:

```shell
\include workshop/database/init.sql
```

Your database tables should be created and populated. You can verify this by running:

```shell
\dt
```

You should see the `users` and `blog_posts` tables listed.

## Connecting the server and database

We need to tell our Node server how to send requests to our database. [`node-postgres`](https://node-postgres.com/) is a library for connecting to and querying a PostgreSQL database.

```shell
npm install pg
```

Create a new file `workshop/database/connection.js`. We'll put all the code related to database connection in here. That way we don't have to repeat it every time we want to send a query.

First import the library we just installed:

```js
const pg = require("pg");
```

We need to tell `pg` where our database is, and what user to log in as. We need something called a "connection string". This is a URL in the following format:

```
postgres://username:password@localhost:5432/database_name
```

For the specific database/user we created above it will look like this:

```
postgres://myuser:password@localhost:5432/learn_node_postgres
```

If you changed the username, password or database name you should swap them in to that string.

Create a new variable in your `connection.js` file containing this string:

```js
const pg = require("pg");

const DB_URL = "postgres://myuser:password@localhost:5432/learn_node_postgres";
```

### Making a connection

We're going to create a "pool" of connections for our server to use. This is better for performance than continually connecting and disconnecting from the database. The server will reuse connections from the pool as it receives requests.

```js
const pg = require("pg");

const DB_URL = "postgres://myuser:password@localhost:5432/learn_node_postgres";

const options = {
  connectionString: DB_URL,
};

const db = new pg.Pool(options);

module.exports = db;
```

`pg.Pool` takes a config object, which needs to include the `connectionString` property to tell it which database to connect to.

We also export the pool object so we can reuse it in other files.

Let's send a quick query to make sure everything is working. We can use the `query` method of our pool object to send SQL commands to the database. It takes a SQL string as the first argument and returns a promise. This promise resolves when the query result is ready.

```js
const pg = require("pg");

const DB_URL = "postgres://myuser:password@localhost:5432/learn_node_postgres";

const options = {
  connectionString: DB_URL,
};

const db = new pg.Pool(options);

db.query("SELECT * FROM USERS").then((result) => console.log(result));

module.exports = db;
```

Run this file from your terminal with `node workshop/database/connection.js` and you should hopefully see some data logged.

## Environment variables

So far we've hard-coded our database connection string into our JS. This isn't an ideal solution. We have no way of using a different database for testing or when we deploy our server to Heroku. Worst of all, we are telling anyone who can see our code on GitHub the password to our database (containing all our users' data).

A better solution is to read the connection string from an "environment variable".

{% box %}

An "environment variable" is a value set in your terminal that can affect how programs run. You can set a variable as you run a program:

```shell
MY_VARIABLE=something node index.js
```

You can access environment variables in Node:

```js
console.log(process.env.MY_VARIABLE); // Logs: "something"
```

{% endbox %}

That way different environments can pass in different values. On Unix systems like macOS and Linux you can set an environment variable like this:

```shell
MY_VARIABLE=something node server.js
```

This sets the variable temporarily for the execution of a single command. So in this case `server.js` can access the environment variable like this:

```js
console.log(process.env.MY_VARIABLE); // Logs: "something"
```

Manually typing your database connection string every time you start your server is annoying though. Most projects use a library called `dotenv` for this. It will read values from a file named `.env`, then set them all as environment variables.

First install `dotenv`:

```shell
npm install dotenv
```

Then create a new file named `.env` at the root of the project. Put the variable you need inside the file like this:

```
DATABASE_URL='postgres://myuser:password@localhost:5432/learn_node_postgres'
```

Then we can tell `dotenv` to load all environment variables at the top of our `connection.js` file:

```js
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
```

`dotenv` by default looks for a `.env` file in the current directory (where you started the server from). If you want to put the file somewhere else you have to tell it:

```js
dotenv.config({ path: "/custom/path/to/.env" });
```

We can now access any values from our `.env` file. Change the connection string variable to read the new environment variable:

```js
const DB_URL = process.env.DATABASE_URL;
```

Everything should still be working the same. You can test by running this file from your terminal with `node workshop/database/connection.js` and you should hopefully see some data logged.

{% box %}

**Make sure you add the `.env` to your `.gitignore` file**. It doesn't make sense to share the values in here, since they could be different on each dev's machine. It's also common for it to contain secrets you don't want on GitHub.

{% endbox %} -->

## Database setup

In order to run our app locally we'll need a Postgres database running on our machine to connect to.

### Creating a local database

Setting up a new DB can be frustrating, so this repo includes a script do it automatically. You can run it in your terminal with:

```shell
./scripts/create_db
```

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
