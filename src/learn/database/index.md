---
title: Persisting data with SQLite and Node
description: Learn how to use the SQLite database to persist data for your Node apps
tags:
  - workshop
keywords:
  - js
  - express
  - database
challenge: https://github.com/foundersandcoders/database-challenge
---

Most applications need to _persist_ data—that is keep it around for future use. This means it will be available even if your server process restarts. A database is a program designed specifically for efficiently and robustly storing information, and making it accessible to your app.

SQLite is a relational database that is relatively simple to get started with. It runs in the same process as your server, unlike other popular databases like PostgreSQL or MySQL. These run as a separate server that needs to be managed separately from your app. As we will see SQLite stores data in a single file, which makes it convenient to work with for simple apps.

## Using SQLite

If you have the SQLite command-line program you can create and manipulate databases in your terminal. However since we're building a Node app we'll use a library to do this in JS. There several to choose from, but the simplest is `better-sqlite3`.

Let's start a new Node project and set it up to use a database. First create a new directory and a `package.json`:

```shell
mkdir learn-database
cd learn-database
echo "{}" > package.json
```

Then install `better-sqlite3` from npm:

```shell
npm install better-sqlite3
```

This should be added to the `dependencies` object in your `package.json`. Now you can use it to initialise a SQLite database. You'll need a JS file to do this—since there will be a few database related files create a new `database` directory for them. Then create a `database/db.js` file where you can initialise the DB:

```js
const Database = require("better-sqlite3");

const db = new Database("db.sqlite");
console.log(db);
```

The `better-sqlite3` library exports a constructor function that expects to be passed the filename you'd like to use for your database. Here we've named the file "db.sqlite". When you run this code it'll create this file if it doesn't exist, or re-use an existing one if it does. Try running your JS file now:

```shell
node database/db.js
```

You should see a new file called "db.sqlite" appear at the root of your project. You should also see the [Database object](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-database) you logged in your terminal. This object provides several methods for accessing your data.

{% box %}

This file is where SQLite stores all your data. In a real project you should add it to your `.gitignore` so each team member can have their own local copy.

If you want to start over at any point you can delete this file—it will be recreated (but with all the data deleted!) when you next use the `db.js` file.

{% endbox %}

## Using prepared statements

Accessing data is a two-step process with `better-sqlite3`. For performance reasons all queries must first be "prepared" before they can be run. This way the library can re-use the same query over and over. You can create a statement with the `db.prepare` method. This takes a SQL string and returns a [Statement](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-statement) object:

```js
const select_date = db.prepare("SELECT DATE()");
console.log(select_date);
```

The statement object has several methods for running a query based on what the expected result is. Use `.run` when you don't need a result (e.g. for deleting a row), `.get` when you expect a single row, and `.all` when you want to get all rows matching the query.

In this case we're expecting a single result (the date), so you can use the `.get` method:

```js
const select_date = db.prepare("SELECT DATE()");
const result = select_date.get();
console.log(result);
```

Run this again in your terminal and you should see an object logged with the current date:

```json
{ "DATE()": "2022-09-13" }
```

## Setting up your schema

Relational databases need a defined schema to tell them how to organise your data. This helps them structure your data effectively. A simple schema is a collection of `CREATE TABLE` statements that you run against your database to create the tables and columns you need. You could write all this inside strings in a `.js` file, but it's nicer to use a separate `.sql` file.

Let's create a simple schema that will let us store tasks for a to-do list. Create a new file `database/schema.sql`:

```sql
BEGIN;

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
```

{% box %}

We're using a SQL "transaction". Every statement after `BEGIN` will be attempted, then assuming there were no errors the `COMMIT` statement will persist all changes. If any statement in the transaction fails everything is reverted—this prevents your DB from getting into a broken state.

{% endbox %}

We're creating a new table called `tasks` with three columns: `id` will be an automatically incrementing integer generated by the DB, `content` will be the text content of each task, and `created_at` will be an auto-generated timestamp.

Note the `IF NOT EXISTS`; a good schema should be [_idempotent_](https://en.wikipedia.org/wiki/Idempotence)—you should be able to run it against your DB multiple times without changing the result. Without this running our schema a second time would result in a "table already exists" error.

Let's run this schema against our DB in JS. We need to read the `.sql` file contents, then pass them into the `db.exec` method, which is designed to run one-off queries containing multiple statements like this. Edit `database/db.js`:

```js
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

const db = new Database("db.sqlite");

const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);
```

You can check this worked by selecting from the built-in `sqlite_schema` table (which lists everything else in the DB):

```js
const select_table = db.prepare("SELECT name FROM sqlite_schema");
const result = select_table.all();
console.log(result);
```

You should see your new `tasks` table in the array:

```json
[ { name: 'tasks' }, ... ]
```

Your database is now ready to use. We just need to make it available to other parts of our application by exporting the `db` object. Here's the full `database/db.js` file:

```js
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

/**
 * Create a new DB file, or use an existing one
 */
const db = new Database("db.sqlite");

/**
 * Make sure DB has the right structure by running schema.sql
 * This is responsible for creating the tables and columns we need
 * It should be safe to run every time
 */
const schemaPath = join("database", "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");
db.exec(schema);

/**
 * Export the DB for use in other files
 */
module.exports = db;
```

Now we can import the `db` object in our app, which will run this file, ensuring the database is created and the schema properly set-up.

## Using our database

Let's implement some features for this app that use our new database. It can be helpful to write your data access as separate functions to your server routes, so you can focus on doing one thing at a time.

Create a new `model` folder, with a new `tasks.js` file inside. This is where we'll write functions that read and write tasks from our DB. Let's import our `db` object and write a function to insert a new task:

```js
const db = require("../database/db.js");

const insert_task = db.prepare("INSERT INTO tasks (content) VALUES (?)");

function createTask(content) {
  insert_task.run(content);
}

module.exports = { createTask };
```

{% box %}

We create the prepared statement _outside_ of the function, so that this can be reused every time the function is called. This is faster than recreating it each time we create a task.

{% endbox %}

We only need to specify the `content` value, since the `id` and `created_at` columns will be generated by the DB. We are using a _parameterised query_ to pass in the dynamic `content` value. The `?` in the query will be replaced by the first argument passed in when we execute the prepared statement.

{% box "error" %}

It's **very important** to _always_ use parameterised queries when you have user-submitted data. Otherwise you will be vulnerable to SQL injection, where a malicious user submits something like `;DROP TABLE users` in a form. Parameterised queries automatically escape any SQL so this won't do anything dangerous.

{% endbox %}

Let's use this function to insert a new query. Temporarily add some code that calls your new function, then query the DB to see what is in the `tasks` table:

```js
// ...
createTask("Eat a banana");
const tasks = db.prepare("SELECT * FROM tasks").all();
console.log(tasks);
```

You should see an array with one task logged:

```json
[{ "id": 1, "content": "Eat a banana", "created_at": "2022-09-14 08:40:41" }]
```

### Returning generated data

Our `createTask` function currently doesn't return anything. Since the `id` and `created_at` columns are generated by the DB it would be nice if we returned the newly created task. We can do this using the `RETURNING` SQL statement. Amend your query and function:

```js
const insert_task = db.prepare(`
  INSERT INTO tasks (content)
  VALUES (?)
  RETURNING id, content, created_at
`);

function createTask(content) {
  return insert_task.get(content);
}
```

Note we must now use the `.get` method, since we expect the statement to return a single value. If you call this function you should receive the inserted task object:

```js
const result = createTask("Send mum flowers");
console.log(result);
```

```json
{ "id": 2, "content": "Send mum flowers", "created_at": "2022-09-14 08:52:30" }
```

## Amending the schema

A task app needs to track whether each task is completed. To do this our `tasks` table will need a `completed` column. There are two approaches to amending the schema. We won't be using the first, but it's here for completeness if you're curious.

{% disclosure "Read about migrations" "info" %}

Amending a production DB usually involves "migrations". These are incremental changes applied to a running DB to non-destructively upgrade it to the desired state. For example to add a column we could use `ALTER TABLE`.

Migrations are usually stored in separate numbered files, so they can be applied in ascending order to a database. It's uncommon to write these manually however—most apps use a library to auto-generate/apply them.

{% box %}

Migrations are a bit complicated, so we won't worry about them for now—they're mentioned here for completeness as you will probably encounter them later.

{% endbox %}

{% enddisclosure %}

The simpler way is just to delete our database, change the `schema.sql`, then regenerate the DB. This is fine while we're still working on a feature, but if we tried this on our production DB we'd lose all our users' data.

So you can just delete your `db.sqlite` file, then amend your `schema.sql` file:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  complete INTEGER DEFAULT 0 CHECK(complete IN (0, 1))
);
```

{% box %}

SQLite does not support booleans natively. Instead you must use integers (`0` is `false`, `1` is `true`). You can enforce this constraint by using `DEFAULTS` and `CHECK` to make sure that the column can only ever be `0` or `1`.

{% endbox %}

### Named SQL parameters

Now our schema has changed we need to update the `createTask` function, since we may want to create a new task that is already completed. This means the function needs to set both columns. We _could_ use multiple parameters like this:

```js
const insert_task = db.prepare(`
  INSERT INTO tasks (content, complete)
  VALUES (?, ?)
  RETURNING id, content, created_at
`);

function createTask(content, complete) {
  return insert_task.get(content, complete);
}
```

However this is error-prone as it relies on the order we pass the arguments. A safer way is to use _named_ parameters by passing a JS object. This also makes the SQL query more readable:

```js
const insert_task = db.prepare(`
  INSERT INTO tasks (content, complete)
  VALUES ($content, $complete)
  RETURNING id, content, created_at
`);

function createTask(task) {
  return insert_task.get(task);
}
```

When passed an object like `createTask({ content: "stuff", complete: 1 })` the statement will map each key to the corresponding `$param` in the query.

<!--
Let's create a Node server that uses our new database. First install `express`:

```shell
npm install express
```

Then create a `server.js`:

```js
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("hi");
});

module.exports = server;
```

and an `index.js` to start the server:

```js
const server = require("./server.js");

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
```

Check this is working by running `node index.js` in your terminal.

Now we need a form to add new tasks to our database. Edit `server.js`:

```js
server.get("/", (req, res) => {
  const body = /*html*/`
    <!doctype html>
    <form method="POST">
      <label for="content">New task</label>
      <input id="content" name="content">
      <button>Add task +</button>
    </form>
  `;
  res.send(body);
});
```

Then add a `/ POST` handler to receive the submission:

```js
server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  console.log(req.body);
  res.redirect("/");
})
```

Restart your server and try submitting the form: you should see an object logged with a `content` property.

Now we can insert a new task. Import the `db` object and create a new statement:

```js
const db = require("./database/db.js");

const insert_task = db.prepare("INSERT ") -->
