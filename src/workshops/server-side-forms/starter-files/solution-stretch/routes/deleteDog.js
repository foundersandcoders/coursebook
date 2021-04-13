const dogs = require("../dogs.js");

function post(request, response) {
  const nameToDelete = request.body.name.toLowerCase();
  delete dogs[nameToDelete];
  response.redirect("/");
}

module.exports = { post };
