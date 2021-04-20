const bcrypt = require("bcryptjs");
const model = require("../database/db");

function get(request, response) {
  response.send(`
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

function post(request, response) {
  const { email, password } = request.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser({ email, password: hash }))
    .then(() => {
      response.send(`<h1>Welcome ${email}</h1>`);
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>Something went wrong, sorry</h1>`);
    });
}

module.exports = { get, post };
