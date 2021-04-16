function get(request, response) {
  response.send(`
    <form action="create-user" method="POST">
      <label for="username">Username</label>
      <input id="username" name="username">
      <label for="age">Age</label>
      <input id="age" name="age" type="number">
      <label for="location">Location</label>
      <input id="location" name="location">
      <button type="submit">Create user</button>
    </form>
  `);
}

function post(request, response) {
  const data = request.body;
  console.log(data); // e.g. { username: "oli", ... }
  response.redirect("/");
}

module.exports = { get, post };
