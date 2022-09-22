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

Most applications need to _persist_ data—that is keep it around for future use. This means it will be available even if your server process restarts. A database is a program designed for efficiently and robustly storing information, and making it accessible to your app.

SQLite is a relational database that is quite simple to get started with. It runs in the same process as your server, unlike other popular databases like PostgreSQL or MySQL. These run as a separate server that needs to be managed separately from your app. As we will see SQLite stores data in a single file, which makes it convenient to work with for simple apps.

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

This will be added to the `dependencies` object in your `package.json`. Now you can use it to initialise a SQLite database. You'll need a JS file to do this—since there will be a few database related files create a new `database` directory for them all. Then create a `database/db.js` file where you can initialise the DB:

```js
const Database = require("better-sqlite3");

const db = new Database();
console.log(db);
```

The `better-sqlite3` library exports a constructor function that creates a new SQLite database and returns a [JS object](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-database) with methods for talking to that DB. Try running your JS file now and you should see this object logged:

```shell
node database/db.js
```

By default if we don't pass any arguments to `new Database()` it'll create an "in-memory" DB. This means the data won't be persisted—this is useful for testing as you can't permanently break anything. If you want to persist data you can pass the name of the file you want to use.

```js
const db = new Database("db.sqlite");
```

If you run this code it'll create the file if it doesn't exist, or re-use an existing one if it does. However hard-coding isn't the best idea—there are situations where we might want to use a different DB, like running tests. Instead we can use an _environment variable_ to set the filename.

```js
const db = new Database(process.env.DB_FILE);
```

Now we can choose what DB file to use without changing the code. For example if you run this file with:

```shell
DB_FILE=db.sqlite node database/db.js
```

you should see a new file called `db.sqlite` appear at the root of your project.

{% box %}

This file is where SQLite stores all your data. In a real project you should add it to your `.gitignore` so each team member can have their own local copy.

If you want to start over at any point you can delete this file—it will be recreated (but with all the data deleted!) when you next use the `db.js` file.

{% endbox %}

## Using prepared statements

Accessing data is a two-step process with `better-sqlite3`. For performance reasons all queries must first be "prepared" before they can be run. This way the library can re-use the same query over and over. You create a statement with the `db.prepare` method. This takes a SQL string and returns a [Statement](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-statement) object:

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

Relational databases need a defined schema to tell them how to organise your data. This helps them structure your data effectively. A simple schema is a collection of `CREATE TABLE` statements that you run against your database to create the tables and columns it needs. You could write all this inside strings in a `.js` file, but it's nicer to use a separate `.sql` file.

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

We're using a SQL "transaction". Every statement after `BEGIN` will be attempted, then assuming there were no errors the `COMMIT` statement will persist all changes. If anything in the transaction fails everything is reverted—this prevents your DB from getting into a broken state.

{% endbox %}

We're creating a new table called `tasks` with three columns: `id` will be an automatically incrementing integer generated by the DB, `content` will be the text content of each task, and `created_at` will be an auto-generated timestamp.

Note the `IF NOT EXISTS`; a good schema should be [_idempotent_](https://en.wikipedia.org/wiki/Idempotence)—you should be able to run it against your DB multiple times without changing the result. Running our schema a second time would result in a "table already exists" error if we didn't have this.

Let's run this schema against our DB in JS. We need to read the `.sql` file contents, then pass them into the `db.exec` method, which is designed to run one-off queries containing multiple statements like this. Edit `database/db.js`:

```js
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(process.env.DB_FILE);

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

Your database is now ready to use. We just need to make it available to other parts of our application by exporting the `db` object. Here's the full `database/db.js` file you need, with explanatory comments:

```js
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const Database = require("better-sqlite3");

/**
 * If we do not set DB_FILE env var creates an in-memory temp DB.
 * Otherwise connect to the DB contained in the file we specified (if it exists).
 * If it does not exist create a new DB file and connect to it.
 */
const db = new Database(process.env.DB_FILE);

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

## Seeding example data

It's a bit awkward to have to manually call functions to insert data when we want to check our DB is working. It would be nice if we had a script to run that could "seed" the DB with some pre-defined example data.

Delete your existing `db.sqlite` file, so we don't have to worry about any data already inserted.

Let's write some SQL to insert example tasks. Create a `database/seed.sql` file:

```sql
BEGIN;

INSERT INTO tasks VALUES
  (1, 'Create my first todo', '2022-09-16 01:01:01'),
  (2, 'Buy milk', '2022-09-16 11:10:07'),
  (3, 'Become a 10x developer', '2022-09-16 23:59:59')
ON CONFLICT(id) DO NOTHING;

COMMIT;
```

We use a transaction to ensure all the inserts succeed, similar to in our schema. There's one new addition: the `ON CONFLICT` ensures that we can run this script multiple times without getting duplicate ID errors.

Now we need a JS script that reads this file and runs it against the DB. This will be very similar to `schema.js`. Create a `database/seed.js` file:

```js
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const db = require("./db.js");

const seedPath = join("database", "seed.sql");
const seed = readFileSync(seedPath, "utf-8");
db.exec(seed);

console.log("DB seeded with example data");
```

Now you can run this script with `DB_FILE=db.sqlite node database/seed.js` to insert example data. It's worth adding an npm script to your `package.json` to make this reusable for other team members in your project:

```json
{
  "scripts": {
    "seed": "DB_FILE=db.sqlite node database/seed.js"
  }
}
```

Now anyone cloning the project can run `npm install` then `npm run seed` to have everything up and running quickly. If you ever want to start over you can delete your DB file and re-run the seed script.

## Amending the schema

A task app needs to track whether each task is completed. To do this our `tasks` table will need a `complete` column. There are two approaches to amending the schema. We won't be using the first, but it's here for completeness if you're curious.

{% disclosure "Read about migrations" "info" %}

Amending a production DB usually involves "migrations". These are incremental changes applied to a running DB to non-destructively upgrade it to the desired state. For example to add a column we could use `ALTER TABLE`.

Migrations are usually stored in separate numbered files, so they can be applied in ascending order to a database. It's uncommon to write these manually however—most apps use a library to auto-generate/apply them.

{% box %}

Migrations are a bit complicated, so we won't worry about them for now—they're mentioned here for completeness as you will probably encounter them later.

{% endbox %}

{% enddisclosure %}

The simpler way is just to delete our database, change the `schema.sql`, then regenerate the DB. This is fine while we're still working on a feature, but if we tried this on our production DB we'd **lose all our users' data**.

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

{% box %}

### Syntax highlighting SQL strings

Now that we have more complex SQL queries it is getting a bit hard to read them. If you have the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) VS Code extension installed you can use a JS comment to tell it to highlight these strings as SQL:

```js
const insert_task = db.prepare(/*sql*/ `...`);
```

{% endbox %}

## Listing rows

Our app is going to need a way to read all the tasks from the DB. We need to write a new model function that selects all rows from the `tasks` table:

```js
const select_tasks = db.prepare(/*sql*/ `
  SELECT id, content, created_at FROM tasks
`);

function listTasks() {
  return select_tasks.all();
}
```

Run this function to check that it shows all the tasks you have inserted so far.

{% box %}

It's tempting to use `SELECT *` to list _every_ column for each row, however it's a good idea to list just the ones you need. In future this table may have many more columns added that this particular feature does not need (and they could be very large, or secret), and you would end up returning them all without meaning to.

{% endbox %}

### Formatting columns

Our `created_at` column is a full timestamp, with a date and time, which is not particularly human-readable. Let's imagine our app is only for tracking tasks on the same day, so we only care about the time part. We can amend our query to use the `TIME`

```js
const select_tasks = db.prepare(/*sql*/ `
  SELECT
    id,
    content,
    TIME(created_at)
  FROM tasks
`);
```

If you log the result of this query you should see the task objects change:

```json
[{ "id": 2, "content": "Send mum flowers", "TIME(created_at)": "08:52:30" }]
```

However the column name has changed to represent this. Ideally we would keep the same name (`created_at`). We can rename columns using the `AS` SQL operator:

```js
const select_tasks = db.prepare(/*sql*/ `
  SELECT
    id,
    content,
    TIME(created_at) AS created_at
  FROM tasks
`);
```

If you run this again you should see the object key is now `created_at` like before.

```json
[{ "id": 2, "content": "Send mum flowers", "created_at": "08:52:30" }]
```

## Deleting a row

Let's add another model function that can delete a task from our `tasks` table. It should take an ID parameter and delete just the row that matches.

```js
const delete_task = db.prepare(/*sql*/ `
  DELETE FROM tasks WHERE id = ?
`);

function removeTask(id) {
  return delete_task.run(id);
}
```

{% box "error" %}

SQL queries act on **every row** by default. This makes deletion and updates very dangerous. Without a `WHERE` clause or other condition they will delete/update _every_ row.

{% endbox %}

Test this by calling `removeTasks(1)` to delete the first task you created earlier. You can call `listTasks` to check that a task has been removed.

## Testing the model

So far we've been manually testing things by calling our model functions. It would be better to write some automated tests to make this reproducible and reusable. That way we can catch reversions if the code breaks later on.

Let's write a test to verify several of our model functions. Create a new file `test/tasks.test.js`:

```js
const test = require("node:test");
const assert = require("node:assert");
const model = require("../model/tasks.js");
const db = require("../database/db.js");

test("can create, remove & list tasks", () => {
  db.exec("DELETE FROM tasks");

  const task = model.createTask("test task");
  assert.equal(task.id, 1);
  assert.equal(task.content, "test task");
  assert.equal(task.complete, 0);

  model.removeTask(task.id);
  const tasks = model.listTasks();
  assert.equal(tasks.length, 0);
});
```

{% box %}

**Important**: we must empty the `tasks` table at the start of each test to ensure any leftovers from other tests don't effect this one. This ensures tests are not dependent on each other, so they can be run in any order (or in parallel) without affecting the results.

{% endbox %}

Ideally our tests shouldn't mess with our dev environment (where we may have changes to the DB we don't want to overwrite). We can run the tests with a separate DB file by specifying a different value for the env var:

```shell
DB_FILE=test.sqlite node test/tasks.test.js
```

We should make sure to add `test.sqlite` to our `.gitgnore` too, since we don't want random DBs floating around on GitHub.

It's not necessary in this case, but if we wanted to seed the test DB (so we can assert against the example data) we can tell Node to require `seed.js` before running the test:

```shell
DB_FILE=test.sqlite node -r ./database/seed.js test/tasks.test.js
```

## Updating a row

It's likely we'll need to be able to change the content of a task if a user wants to edit it. We need to write a function that can take a task object and update the row with a matching ID:

```js
const update_content = db.prepare(/*sql*/ `
  UPDATE tasks
  SET content = $content
  WHERE id = $id
  RETURNING id, content, created_at, complete
`);

function editTask(task) {
  return update_content.get(task);
}
```

We return the edited task for convenience.

## Toggling a boolean

When a user marks a task as complete (or incomplete) we need to update that row to match. We can easily toggle our "fake boolean" integer column using `NOT`:

```js
const update_complete = db.prepare(/*sql*/ `
  UPDATE tasks
  SET complete = NOT complete
  WHERE id = ?
  RETURNING id, content, created_at, complete
`);

function toggleTask(id) {
  return update_complete.get(id);
}
```

This function will flip the `complete` column from `0` to `1`, or from `1` to `0`.

## Integrating a UI

We now have all the functionality for our app contained in the model. All that's left is to build a UI that calls these functions, so that a user can interact with them.

Let's create a Node server that uses our new database. First install `express`:

```shell
npm install express
```

Then we'll create the boilerplate we need to get an HTTP server going. First we need a `server.js` file:

```js
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("hello world");
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

### Submitting new tasks

Now we need a form to add new tasks to our database. Edit `server.js`:

```js
server.get("/", (req, res) => {
  const body = /*html*/ `
    <!doctype html>
    <form method="POST">
      <input id="content" name="content" aria-label="New task" required>
      <button>Add task +</button>
    </form>
  `;
  res.send(body);
});
```

Then add a `/ POST` handler to receive the submission a insert the new task:

```js
const model = require("./model/tasks.js");

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  model.createTask(req.body.content);
  res.redirect("/");
});
```

### Rendering tasks

Now that we can insert tasks we need to show them on the page. Edit the `GET /` handler to get the list and render them:

```js
server.get("/", (req, res) => {
  const tasks = listTasks();
  const body = /*html*/ `
    <!doctype html>
    <form method="POST">
      <input id="content" name="content" aria-label="New task" required>
      <button>Add task +</button>
      <ul>${tasks.map((t) => `<li>${t.content}</li>`).join("")}</ul>
    </form>
  `;
  res.send(body);
});
```

### Updating tasks

We need to be able to toggle and delete each task. This will mean each task `<li>` needs to contain a `<form>` that can send a POST telling the server to either toggle or remove the task.

Let's write a `POST /update` handler _first_. This is what will carry out the changes when a task is toggled or removed. Writing this first will help us know what our form should include.

Our handler is going to need to know two things: which action should it take (toggle or remove), and which task should it update. Both will need to be submitted by the form as part of the request body:

```js
server.post("/update", express.urlencoded({ extended: false }), (req, res) => {
  const { action, id } = req.body;
  if (action === "remove") removeTask(id);
  if (action === "toggle") toggleTask(id);
  res.redirect("/");
});
```

Since all our "business logic" is contained in the model our route handler ends up pretty simple.

Now we need to update the list render to add a form to each task. It'll two submit buttons—one for each action—and a hidden input with the ID. Since it will get a bit long to embed inline we'll create a separate function to render this HTML:

```js
function Task(task) {
  return /*html*/ `
    <li>
      <form method="POST" action="/update">
        <input type="hidden" name="id" value="${task.id}">
        <button name="action" value="toggle" aria-label="Toggle complete">
          ${task.complete ? "☑︎" : "☐"}
        </button>
        <span style="${task.complete ? "text-decoration: line-through" : ""}">
          ${task.content}
        </span>
        <button name="action" value="remove">&times;</button>
      </form>
    </li>
  `;
}

server.get("/", (req, res) => {
  const tasks = listTasks();
  const list = tasks.map(Task);
  const body = /*html*/ `
    <!doctype html>
    <form method="POST">
      <input id="content" name="content" aria-label="New task" required>
      <button>Add task +</button>
      <ul>${list.join("")}</ul>
    </form>
  `;
  res.send(body);
});
```

{% box %}

This example is missing validation and other important things in order to keep it brief.

{% endbox %}
