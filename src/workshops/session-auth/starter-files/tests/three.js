const test = require("tape");
const resetDB = require("./reset.js");
const auth = require("../workshop/auth.js");
const logIn = require("../workshop/routes/logIn.js");
const db = require("../workshop/database/connection.js");

test("can verify a user's password", async (t) => {
  await resetDB();
  t.equal(
    typeof auth.verifyUser,
    "function",
    "A verifyUser function should be exported"
  );
  const email = "test@gmail.com";
  const password = "hunter2";
  const name = "Test Testington";
  // '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG',
  const returnedUser = await auth.verifyUser(email, password);
  t.equal(returnedUser.name, name, "Should return user name");
  t.equal(returnedUser.email, email, "Should return user email");
  t.equal(typeof returnedUser.id, "number", "Should return user ID");
  t.equal(returnedUser.password, undefined, "Should NOT return user password");
});

test("errors if user's password is wrong", async (t) => {
  await resetDB();
  const email = "test@gmail.com";
  const password = "incorrect";
  try {
    await auth.verifyUser(email, password);
  } catch (error) {
    t.true(
      error instanceof Error,
      "Should throw an error when password is wrong"
    );
  }
});

test("logIn route handler sets cookie and redirects", (t) => {
  t.plan(4);
  const body = { email: "test@gmail.com", password: "hunter2" };
  const request = { body };
  const response = {
    cookie: (name, value, options) => {
      t.equal(name, "sid", "Should set cookie named 'sid'");
      t.true(
        value.length > 16,
        "Session ID cookie value should be at least 16 characters"
      );
      t.deepEqual(
        options,
        auth.COOKIE_OPTIONS,
        "Should set correct cookie options"
      );
    },
    redirect: (path) => {
      t.equal(path, "/", "Should redirect to home page");
    },
  };
  logIn.post(request, response);
});
