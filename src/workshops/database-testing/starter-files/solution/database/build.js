const fs = require("fs");
const path = require("path");
const db = require("./connection.js");

const initPath = path.join(__dirname, "init.sql"); // e.g. ./workshop/database/init.sql
const initSQL = fs.readFileSync(initPath, "utf-8");

function build() {
  return db.query(initSQL);
}

module.exports = build;
