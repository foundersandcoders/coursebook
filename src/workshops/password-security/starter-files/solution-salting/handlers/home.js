function get(request, response) {
  response.send(`
    <h1>Create an account</h1>
    <p>New users <a href="sign-up">sign up for an account</a></p>
    <p>Existing users <a href="log-in">log in</a>
  `);
}

module.exports = { get };
