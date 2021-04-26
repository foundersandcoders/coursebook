const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Password mismatch");
      } else {
        return user;
      }
    });
  });
}

function createUser(email, password, name) {
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(email, hash, name));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.updateSession(sid, { user });
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

module.exports = { verifyUser, createUser, saveUserSession, COOKIE_OPTIONS };
