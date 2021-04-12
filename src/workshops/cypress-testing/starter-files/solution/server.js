const express = require("express");

const server = express();

server.get("/", (request, response) => {
  response.send(`
    <h1>Welcome to my site</h1>
    <nav>
      <a href="about">About</a>
      <a href="sign-up">Sign up</a>
    </nav>
  `);
});

server.get("/about", (request, response) => {
  response.send(`<h1>About this site</h1>`);
});

server.get("/sign-up", (request, response) => {
  response.send(`
    <h1>Sign up</h1>
    <form method="POST">
      <label for="email">Email</label>
      <input id="email" type="email" name="email">
      <label for="password">Password</label>
      <input id="password" type="password" name="password">
      <button>Sign up</button>
    </form>
  `);
});

server.post("/sign-up", (request, response) => {
  // normally you'd use the body to save a new user here
  response.redirect("/welcome");
});

server.get("/welcome", (request, response) => {
  response.send(`<h1>Thanks for joining</h1>`);
});

const PORT = 4444;

server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
