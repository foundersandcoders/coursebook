const layout = require("../layout.js");

function get(request, response) {
  const html = layot(`<h1>Gonna error</h1>`);
  response.send(html);
}

module.exports = { get };
