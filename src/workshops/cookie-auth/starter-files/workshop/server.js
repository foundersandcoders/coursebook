const crypto = require("crypto");
const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send("<h1>Hello</h1>");
});

server.get("/login", (request, response) => {
  console.log("Logging in");
  response.redirect("/");
});

server.get("/logout", (request, response) => {
  console.log("Logging out");
  response.redirect("/");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
