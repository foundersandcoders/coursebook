const model = require("../database/model.js");

function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(`
        <h1>Hello ${session.user.name}</h1>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
      `);
    });
  } else {
    response.send(`
    <h1>Hello anonymous</h1>
    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
  `);
  }
}

module.exports = { get };
