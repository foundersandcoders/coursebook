const db = require("../database/connection.js");

function post(request, response) {
  const idToDelete = request.body.id;
  // Note: this also deletes all the user's blog_posts
  // see "ON DELETE CASCADE" in init.sql
  const delete_user = /*sql*/ `DELETE FROM users WHERE id = $1`;
  db.query(delete_user, [idToDelete]).then(() => {
    response.redirect("/");
  });
}

module.exports = { post };
