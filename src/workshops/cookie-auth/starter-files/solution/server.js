const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();

server.use(cookieParser("nkjadfnjkafdjnnjad"));

let sessions = {};

server.get("/", (request, response) => {
  const sid = request.signedCookies.sid;
  if (sid) {
    const userInfo = sessions[sid];
    console.log(userInfo);
  }
  response.send("<h1>Hello</h1>");
});

server.get("/login", (request, response) => {
  const sid = crypto.randomBytes(18).toString("base64");
  const userInfo = {
    id: 1,
    username: "oliverjam",
    admin: true,
  };
  sessions[sid] = userInfo;
  response.cookie("sid", sid, {
    httpOnly: true,
    maxAge: 6000,
    sameSite: "lax",
    signed: true,
  });
  response.redirect("/");
});

server.get("/logout", (request, response) => {
  const sid = request.signedCookies.sid;
  delete sessions[sid];
  response.clearCookie("sid");
  response.redirect("/");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
