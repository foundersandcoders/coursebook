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

1. Download the starter files
1. Change into the `workshop` directory
1. Create a local DB by running: `./scripts/create_db`
1. Populate the DB by running: `./scripts/populate_db`
1. Start the server with `npm run dev` and check it's working

There is a very minimal Cypress testing setup. You can start Cypress with `npm test`—you should see the single example test from `cypress/integration/test.js`.

## Isolating tests

It's easy to create tests that rely on each other. For example imagine we had an app for managing different types of dogs. Here are two example tests; one checks that creating a dog works, and one checks that deleting a dog works:

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

These tests work fine _together_, but if we ran the delete test on its own it would fail. It expects there to already be a dog called "Rover" in the database, but this only happens if the creation test runs first.

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

Unfortunately there's a slight complication: all the code inside our test runs _in the browser_. The browser doesn't have access to our Node environment, so it can't talk to our database directly.

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

#### Running the populate_db script

We already have a script that can reset our DB back to its initial state: `./scripts/populate_db`. We can re-use this within our Cypress task using Node's `child_process` module. This allows us to run terminal commands from inside Node.

In this case we want to use the `execFileSync` method to execute a given file:

```js
// cypress/plugins/index.js

const { execFileSync } = require("child_process");

module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      console.log("Resetting DB...");
      return execFileSync("./scripts/populate_db");
    },
  });
};
```

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
