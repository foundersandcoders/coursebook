const express = require("express");
const dogs = require("./dogs.js");

const server = express();

server.get("/", (request, response) => {
  const search = request.query.search || "";
  let items = "";
  for (const dog of Object.values(dogs)) {
    const match = dog.name.toLowerCase().includes(search.toLowerCase());
    // if we don't have a search submission we show all dogs
    if (match || !search) {
      items += `
        <li>
          <span>${dog.name}</span>
          <form action="/delete-dog" method="POST" style="display: inline;">
            <button name="name" value="${dog.name}" aria-label="Delete ${dog.name}">
              &times;
            </button>
          </form>
        </li>`;
    }
  }
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>
      <h1>Dogs!</h1>
      <form>
        <label id="search">Search dogs</label>
        <input id="search" type="search" name="search" placeholder="E.g. rover">
        <button>Search</button>
      </form>
      <ul>${items}</ul>
      <a href="/add-dog">Add dog +</a>
    </body>
  </html>
  `;
  response.end(html);
});

server.get("/add-dog", (request, response) => {
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Dogs!</title>
    </head>
    <body>
      <h1>Create a dog</h1>
      <form method="POST">
        <label id="name">Dog name</label>
        <input id="name" name="name">
        <label id="breed">Dog breed</label>
        <input id="breed" name="breed">
        <button>Search</button>
      </form>
    </body>
  </html>
  `;
  response.end(html);
});

const bodyParser = express.urlencoded({ extended: false });

server.post("/add-dog", bodyParser, (request, response) => {
  const newDog = request.body;
  const name = newDog.name.toLowerCase();
  dogs[name] = newDog;
  response.redirect("/");
});

server.post("/delete-dog", bodyParser, (request, response) => {
  const nameToDelete = request.body.name.toLowerCase();
  delete dogs[nameToDelete];
  response.redirect("/");
});

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
