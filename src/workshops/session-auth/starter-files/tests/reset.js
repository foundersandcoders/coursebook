const fs = require("fs/promises");
const { join } = require("path");
const db = require("../workshop/database/connection.js");

const BUILD_PATH = join(__dirname, "..", "workshop", "database", "init.sql");

function resetDB() {
  return fs.readFile(BUILD_PATH, "utf-8").then((sql) => db.query(sql));
}

module.exports = resetDB;
