const db = require("../database/connection.js");
const layout = require("../layout.js");

function get(request, response) {
  const html = layout(
    "Create user",
    `
    <form method="POST">
      <p>
        <label for="username">Username</label>
        <input id="username" name="username">
      </p>
      <p>
        <label for="age">Age</label>
        <input id="age" name="age" type="number">
      </p>
      <p>
        <label for="location">Location</label>
        <input id="location" name="location">
      </p>
      <p>
        <button type="submit">Create user</button>
      </p>
    </form>
  `
  );
  response.send(html);
}

function post(request, response) {
  const data = request.body;
  const values = Object.values(data);
  db.query(
    "INSERT INTO users(username, age, location) VALUES($1, $2, $3)",
    values
  ).then(() => {
    response.redirect("/");
  });
}

module.exports = { get, post };
