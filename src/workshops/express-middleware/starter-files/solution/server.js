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

server.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} ${req.method} ${req.url}`);
  next();
});

server.use((req, res, next) => {
  const sid = req.signedCookies.sid;
  const sessionInfo = sessions[sid];
  if (sessionInfo) {
    req.session = sessionInfo;
  }
  next();
});

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

function checkAuth(req, res, next) {
  const user = req.session;
  if (!user) {
    res.status(401).send(`
      <h1>Please log in to view this page</h1>
      <a href="/log-in">Log in</a>
    `);
  } else {
    next();
  }
}

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

function handleErrors(error, req, res, next) {
  console.error(error);
  const status = error.status || 500;
  res.status(status).send(`<h1>Something went wrong</h1>`);
}

server.use(handleErrors);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
