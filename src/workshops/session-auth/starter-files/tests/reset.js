const fs = require("fs/promises");
const { join } = require("path");
const db = require("../solution/database/connection.js");

const BUILD_PATH = join(__dirname, "..", "solution", "database", "init.sql");

function resetDB() {
  return fs.readFile(BUILD_PATH, "utf-8").then((sql) => db.query(sql));
}

module.exports = resetDB;
