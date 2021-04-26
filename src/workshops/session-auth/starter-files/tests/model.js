const test = require("tape");
const resetDB = require("./reset.js");
const model = require("../solution/database/model.js");
const db = require("../solution/database/connection.js");

test("can get a user by email", async (t) => {
  await resetDB();
  const user = await model.getUser("test@gmail.com");
  t.equal(user.email, "test@gmail.com");
  t.equal(
    user.password,
    "$2a$10$YoazGoxCZFmVHkZWMbkH4uu91tocTXuODyrjucCgIpwbTvX1AC2wG"
  );
  t.equal(user.name, "Test Testington");
});

test("can create a user", async (t) => {
  await resetDB();
  const user = {
    email: "another@gmail.com",
    password: "12345",
    name: "testy",
  };
  const returnedUser = await model.createUser(
    user.email,
    user.password,
    user.name
  );
  t.deepEqual(
    returnedUser,
    { email: "another@gmail.com", name: "testy" },
    "Should return all new user columns except password"
  );
  const dbUser = await db
    .query("SELECT * FROM users WHERE email=$1", [user.email])
    .then((result) => result.rows[0]);
  delete dbUser.id;
  t.deepEqual(dbUser, user, "Should have stored all user properties");
});

test("Can get a session by sid", async (t) => {
  await resetDB();
  const session = await model.getSession("abc123");
  t.deepEqual(session, { test: "stuff" }, "Should return only data column");
});

test("Can create a session", async (t) => {
  await resetDB();
  const sid = "def456";
  const data = { just: "testing things" };
  const returnedSid = await model.createSession(sid, data);
  t.equal(returnedSid, sid, "Should return only the sid");
  const dbSession = await db
    .query("SELECT * FROM sessions WHERE sid=$1", [sid])
    .then((result) => result.rows[0]);
  t.deepEqual(dbSession, { sid, data }, "Should store sid and data");
});
