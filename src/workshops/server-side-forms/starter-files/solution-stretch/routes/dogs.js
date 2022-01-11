const dogs = require("../dogs.js");

function get(request, response) {
  const name = request.params.name || "";
  const dog = dogs[name.toLowerCase()];
  const html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${dog.name}</title>
    </head>
    <body>
      <h1>${dog.name}'s page!</h1>
      <p>${dog.name} is a ${dog.breed}</p>
    </body>
  </html>
  `;
  response.send(html);
}

module.exports = { get };
