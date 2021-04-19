const layout = require("../layout.js");

function get(request, response) {
  const html = layout(`<h1>Home</h1>`);
  response.send(html);
}

module.exports = { get };
