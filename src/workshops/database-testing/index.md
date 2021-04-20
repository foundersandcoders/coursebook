---
title: Database testing
description: Learn how to reset database state with Cypress tasks
tags:
  - workshop
keywords:
  - testing
  - database
  - cypress
---

Most interesting apps are _stateful_. They save information for later in some kind of database. This can make them harder to test, since each test could change the state of the app, making subsequent tests unpredictable. We're going to learn how to write tests that work with our database.

## Setup

We're going to start with the server from the [Postgres & Node workshop](/workshops/node-postgres). If you completed that you should already have a database to connect to. If not it contains instructions on setting up a new database and user.

1. Download the starter files
1. Add a `.env` file to the root of the project (where the `package.json` is)
   - This should set a `DATABASE_URL` environment variable pointing to your database. For example:
   ```shell
   DATABASE_URL='postgres://myuser:password@localhost:5432/learn_node_postgres'
   ```
1. Start the server with `npm run dev` and check it's working

{% box %}

If you get an error about the env var not being defined it probably means your `.env` file is in the wrong place. The `dotenv` module looks in the directory where you started the server. This should be the root where the `package.json` is. Make sure you don't `cd` into `workshop/` before starting the server.

{% endbox %}

## Isolating tests

It's easy to create tests that rely on each other. For example here are two tests; one checks that creating a dog works, and one checks that deleting a dog works:

```js
describe("Dog forms", () => {
  it("creates a new dog", () => {
    cy.visit("/");
    cy.get("input[name='dogName']").type("rover");
    cy.get("button[type='submit']").click();
  });
  it("deletes a dog", () => {
    cy.visit("/");
    cy.get("button[aria-label='Delete rover']").click();
    // make sure that Rover entry is removed from page
    cy.contains("Rover").should("not.exist");
  });
});
```

These tests work fine, but if we ran the delete test on its own it would fail. It expects there to already be a dog called "Rover" in the database, but this only happens if the create test runs first.

This is a bad idea since it makes tests brittle. If somebody comes along later and swaps the order of the tests (or removes a test) it could break things. Tests should always be self-contained and able to run on their own.

### Resetting state between tests

Cypress has a handy way to run some code _before_ every test—the `beforeEach` method. You can pass this a function and Cypress will run it before each test:

```js
describe("Dog forms", () => {
  beforeEach(() => {
    console.log("I run before every test!");
  })
  it("creates a dog", () => {...})
  it("deletes a dog", () => {...})
})
```

We can use this to reset our database before each new test runs.

Unfortunately there's a slight complication: all the code inside our tests runs _in the browser_. The browser doesn't have access to our Node environment, so it can't talk to our database directly.

However Cypress provides a way to execute code in your Node environment: "tasks". These are special functions you can create and then call from inside tests. Tasks are defined inside `cypress/plugins/index.js`:

```js
module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      console.log("Resetting DB...");
      // we have to return something or Cypress gets mad
      return null;
    },
  });
};
```

We can then call this task in our tests like this:

```js
beforeEach(() => {
  cy.task("resetDb");
});
```

Try creating this task now, and make sure you can call it from inside a test. You should see the log show up in your terminal, not the test browser (remember tasks are for running Node code _outside_ the browser).

## Database build script

We need to write a JS function that uses `init.sql` to reset the DB. We will then import and call it in our Cypress task.

Create a `workshop/database/build.js` file. We need to read the contents of `init.sql`, so we can send it to our database as a query:

```js
const fs = require("fs");
const path = require("path");

const initPath = path.join(__dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");
```

First we get the path to the file we want to read. Node's built-in `path.join` creates a cross-platform path (e.g. Windows uses backslashes instead of slashes). The `__dirname` variable always refers to the directory the current file is in. So on most machines this variable will be `"./workshop/database/init.sql`.

Then we read the contents of the file using the built-in `fs` module. This will give us the text content of the file as a string.

Then we can import our `db` object from `connection.js` and use it send the SQL query to the database:

```js
const fs = require("fs");
const path = require("path");
const db = require("./connection.js");

const initPath = path.join(__dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");

function build() {
  return db.query(initSQL);
}

module.exports = build;
```

{% box "error" %}

**Do not run this in production: it will delete all your users' data.**

{% endbox %}

Now we can import this function in our Cypress task and use it to reset the database.

```js
// cypress/plugins/index.js

const build = require("../../database/build.js");

module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      return build();
    },
  });
};
```

<!-- ## Creating a separate test database

It's a bit annoying to use the same DB for testing and development. Since we're resetting the data before each test we'll keep losing any data we add in the course of development.

Instead let's create a separate test database owned by the same user. Type `psql` to enter the Postgres CLI, then run this command:

```sql
CREATE DATABASE test_node_postgres WITH OWNER myuser;
```

We don't need to worry about initialising the test database with data since our build script will do that before each test.

However we do need to make sure `node-postgres` connects to this different database when our tests are running. We can override the `DATABASE_URL` environment variable by setting it when we run our test script:

```shell
DATABASE_URL='postgres://myuser:password@localhost:5432/test_node_postgres' npm test
```

Now our server will use the `test_node_postgres` database while these tests are running. -->

## Challenge 1: write some tests

Now you can finally write some tests without worrying about the DB.

1. Add a test verifying the `/` route displays a list of users
1. Add a test verifying you can create a user from the `/create-user` route
1. Add a test verifying you can delete a user from the `/` route

{% box %}

Don't forget to reset the DB before each test.

{% endbox %}

## Modularising database queries

Currently we're querying our database directly within our route handler functions. It's generally a good idea to separate out data access. Ideally our route handlers shouldn't have to do anything more than call a function like `getUsers()`. That way we could e.g. swap from Postgres to a totally different DB without having to change our route handlers at all.

The nice thing about already having tests is refactoring becomes much safer. You'll find out quite quickly if you break something.

Let's extract the homepage's query. Create a new file `workshop/database/model.js`. Since there aren't many we'll put all our SQL queries into this one file.

Create a function named `getUsers`. Import your database pool object and use it to get all the users, just like before:

```js
const db = require("./connection.js");

function getUsers() {
  return db.query("SELECT * FROM users");
}

module.exports = { getUsers };
```

You can now import and use this function in `routes/home.js`:

```js
const model = require("../database/model.js");

function get(request, response) {
  model.getUsers().then((result) => {
    const users = result.rows;
    // ...
  });
}
```

This should work, but we can improve it. Our handler is stuck dealing with database-specific details. I.e. it has to know about the Postgres `result.rows` property. Ideally we should do this data-processing inside `model.js` instead:

```js
const db = require("./connection.js");

function getUsers() {
  return db.query("SELECT * FROM users").then((result) => result.rows);
}

module.exports = { getUsers };
```

```js
const model = require("../database/model.js");

function get(request, response) {
  model.getUsers().then((users) => {
    // ...
  });
}
```

### Challenge 2: modularise queries

Move the rest of the DB queries into `model.js`. Make sure all the tests keep passing!

1. Write a `createUser` function to insert new users
1. Write a `deleteUser` function to delete a user
1. Write a `getPosts` function to select all the blog posts
1. Refactor your route handlers to use the new model functions
