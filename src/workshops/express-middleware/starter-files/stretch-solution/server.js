const express = require("express");
const cookieParser = require("cookie-parser");

const logger = require("./middleware/logger");
const getUser = require("./middleware/getUser");
const checkAuth = require("./middleware/checkAuth");
const handleError = require("./middleware/handleError");
const { deleteSession, createSession } = require("./model");

const PORT = process.env.PORT || 3000;

// this should normally be hidden in a env var
const SECRET = "nkA$SD89&&282hd";

const server = express();

server.use(cookieParser(SECRET));
server.use(express.urlencoded({ extended: false }));

server.use(logger);
server.use(getUser);

server.get("/", (req, res) => {
  const user = req.session;
  if (user) {
    res.send(`
      <h1>Hello ${user.email}</h1>
      <form method="post" action="/log-out">
        <button>Log out</button>
      </form>
    `);
  } else {
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
  const sid = createSession(newUser);
  res.cookie("sid", sid, {
    signed: true,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 600000,
  });
  res.redirect("/profile");
});

server.post("/log-out", (req, res) => {
  const sid = req.signedCookies.sid;
  deleteSession(sid);
  res.clearCookie("sid");
  res.redirect("/");
});

server.get("/profile", checkAuth, (req, res) => {
  const user = req.session;
  res.send(`<h1>Hello ${user.email}</h1>`);
});

server.get("/profile/settings", checkAuth, (req, res) => {
  const user = req.session;
  res.send(`<h1>Settings for ${user.email}</h1>`);
});

server.get("/error", (req, res, next) => {
  const fakeError = new Error("uh oh");
  fakeError.status = 403;
  next(fakeError);
});

server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
