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
      items += `<li>${dog.name}</li>`;
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
    </body>
  </html>
  `;
  response.send(html);
});

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
