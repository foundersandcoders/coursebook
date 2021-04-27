const test = require("tape");
const resetDB = require("./reset.js");
const auth = require("../workshop/auth.js");
const signUp = require("../workshop/routes/signUp.js");
const db = require("../workshop/database/connection.js");

test("can create a user", async (t) => {
  await resetDB();
  t.equal(
    typeof auth.createUser,
    "function",
    "A createUser function should be exported"
  );
  const email = "another@gmail.com";
  const password = "12345";
  const name = "testy";
  const returnedUser = await auth.createUser(email, password, name);
  t.equal(returnedUser.name, name, "Should return user name");
  t.equal(returnedUser.email, email, "Should return user email");
  t.equal(typeof returnedUser.id, "number", "Should return user ID");
  t.equal(returnedUser.password, undefined, "Should NOT return user password");
  const dbUser = await db
    .query("SELECT * FROM users WHERE email=$1", [email])
    .then((result) => result.rows[0]);
  t.equal(dbUser.name, name, "Should store user name in DB");
  t.equal(dbUser.email, email, "Should store user email in DB");
  t.equal(typeof dbUser.id, "number", "Should store user ID");
  t.true(dbUser.password.startsWith("$"), "Should store user password in DB");
});

test("can create a user", async (t) => {
  await resetDB();
  t.equal(
    typeof auth.saveUserSession,
    "function",
    "A saveUserSession function should be exported"
  );
  const data = { name: "testy", email: "t@t.co.uk" };
  const returnedSid = await auth.saveUserSession(data);
  t.equal(typeof returnedSid, "string", "Should return a session ID string");
  t.true(
    returnedSid.length > 16,
    "Session ID should be at least 16 characters"
  );
  const dbSession = await db
    .query("SELECT * FROM sessions WHERE sid=$1", [returnedSid])
    .then((result) => result.rows[0]);
  t.equal(dbSession.sid, returnedSid, "Should store session ID in DB");
  t.deepEqual(
    dbSession.data,
    { user: data },
    "Should store session data in DB"
  );
});

test("signUp route handler sets cookie and redirects", (t) => {
  t.plan(4);
  const body = { email: "test@t.com", name: "testy", password: "hunter2" };
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
  signUp.post(request, response);
});
