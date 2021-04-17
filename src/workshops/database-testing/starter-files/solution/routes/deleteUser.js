const db = require("../database/connection.js");

function post(request, response) {
  const idToDelete = request.body.id;
  // Note: this also deletes all the user's blog_posts
  // see "ON DELETE CASCADE" in init.sql
  db.query("DELETE FROM users WHERE id = $1", [idToDelete]).then(() => {
    response.redirect("/");
  });
}

module.exports = { post };
