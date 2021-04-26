const { deleteSession } = require("../database/model");

function post(request, response) {
  const sid = request.signedCookies.sid;
  deleteSession(sid).then(() => {
    response.clearCookie("sid");
    response.redirect("/");
  });
}

module.exports = { post };
