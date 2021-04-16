const db = require("../database/connection.js");

function get(request, response) {
  db.query("SELECT * FROM users").then((result) => {
    const users = result.rows;
    const userList = users.map((user) => `<li>${user.username}</li>`).join("");
    response.send(`<ul>${userList}</ul>`);
  });
}

module.exports = { get };
