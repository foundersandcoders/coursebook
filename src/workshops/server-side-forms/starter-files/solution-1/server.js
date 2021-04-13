const express = require("express");
const dogs = require("./dogs.js");

const server = express();

server.get("/", (request, response) => {
  let items = "";
  for (const dog of Object.values(dogs)) {
    items += `<li>${dog.name}</li>`;
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
      <ul>${items}</ul>
    </body>
  </html>
  `;
  response.end(html);
});

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
