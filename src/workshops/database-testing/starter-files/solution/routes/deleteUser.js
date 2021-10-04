const { deleteUser } = require("../database/model.js");

function post(request, response) {
  const idToDelete = request.body.id;
  // Note: this also deletes all the user's blog_posts
  // see "ON DELETE CASCADE" in init.sql
  deleteUser(idToDelete).then(() => {
    response.redirect("/");
  });
}

module.exports = { post };
