const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

// this should normally be hidden in a env var
const SECRET = "nkA$SD89&&282hd";

const server = express();

server.use(cookieParser(SECRET));
server.use(express.urlencoded({ extended: false }));

// this should really be in a database
let sessions = {};

server.get("/", (req, res) => {
  const sid = req.signedCookies.sid;
  const user = sessions[sid];
  if (user) {
    res.send(`
      <h1>Hello ${user.email}</h1>
      <form method="post" action="/log-out">
        <button>Log out</button>
      </form>
    `);
  } else {
    // no point keeping cookie if it doesn't match any saved sessions
    res.clearCookie("sid");
    res.send(`<h1>Hello world</h1><a href="/log-in">Log in</a>`);
  }
});

server.get("/log-in", (req, res) => {
  res.send(`
    <h1>Log in</h1>
    <form action="/log-in" method="POST">
      <label for="email">Email</email>
      <input type="email" id="email" name="email">
    </form>
  `);
});

server.post("/log-in", (req, res) => {
  const newUser = req.body;
  const sid = crypto.randomBytes(18).toString("base64");
  res.cookie("sid", sid, {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 600000,
  });
  sessions[sid] = newUser;
  res.redirect("/profile");
});

server.post("/log-out", (req, res) => {
  const sid = req.signedCookies.sid;
  delete sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

server.get("/profile", (req, res) => {
  const sid = req.signedCookies.sid;
  const user = sessions[sid];
  res.send(`<h1>Hello ${user.email}</h1>`);
});

server.get("/profile/settings", (req, res) => {
  const sid = req.signedCookies.sid;
  const user = sessions[sid];
  res.send(`<h1>Settings for ${user.email}</h1>`);
});

server.get("/error", (req, res, next) => {
  const fakeError = new Error("uh oh");
  fakeError.status = 400;
  next(fakeError);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
