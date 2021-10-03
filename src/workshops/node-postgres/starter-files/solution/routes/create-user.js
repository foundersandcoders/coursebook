const db = require("../database/connection.js");

function get(request, response) {
  response.send(/*html*/ `
    <form action="create-user" method="POST">
      <p>
        <label for="username">Username</label>
        <input id="username" name="username">
      </p>
      <p>
        <label for="age">Age</label>
        <input id="age" name="age" type="number">
      </p>
      <p>
        <button type="submit">Create user</button>
      </p>
    </form>
  `);
}

function post(request, response) {
  const insert_user = /*sql*/ `
    INSERT INTO users(username, age) VALUES($1, $2)
  `;
  const values = [request.body.username, request.body.age];

  db.query(insert_user, values).then(() => {
    response.redirect("/");
  });
}

module.exports = { get, post };
