const test = require("tape");
const resetDB = require("./reset.js");
const model = require("../workshop/database/model.js");
const db = require("../workshop/database/connection.js");

test("Can create a user", async (t) => {
  await resetDB();
  t.equal(
    typeof model.createSession,
    "function",
    "A createSession function should be exported"
  );

  const sid = "def456";
  const data = { just: "testing things" };
  const returnedSid = await model.createSession(sid, data);
  t.equal(returnedSid, sid, "Should return only the sid");
  const dbSession = await db
    .query("SELECT * FROM sessions WHERE sid=$1", [sid])
    .then((result) => result.rows[0]);
  t.deepEqual(dbSession, { sid, data }, "Should store sid and data");
});
