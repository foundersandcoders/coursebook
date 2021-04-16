function get(request, response) {
  response.send(`<h1>Hello world</h1>`);
}

module.exports = { get };
