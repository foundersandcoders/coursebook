const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();

server.use(cookieParser());

server.get("/", (request, response) => {
  // const cookies = request.get("cookie");
  console.log(request.cookies);
  response.cookie("hello", "this is my cookie", {
    HttpOnly: true,
    "Max-Age": 60,
  });
  response.send("<h1>Hello</h1>");
});

server.get("/remove", (request, response) => {
  response.clearCookie("hello");
  response.redirect("/");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
