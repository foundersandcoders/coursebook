const auth = require("../auth.js");

function get(request, response) {
  response.send(`
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  const { email, password, name } = request.body;
  console.log("Signing up...");
  response.redirect("/");
}

module.exports = { get, post };
