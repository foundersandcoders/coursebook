const model = require("../model.js");
const layout = require("../layout.js");

function get(request, response) {
  model
    .getPosts()
    .then((posts) => {
      const html = layout(`<h1>Gonna reject</h1>`);
      response.send(html);
    })
    .catch((error) => {
      console.error(error);
      response.status(404).send(`<h1>Posts not found</h1>`);
    });
}

module.exports = { get };
