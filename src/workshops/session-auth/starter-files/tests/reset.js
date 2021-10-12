const { execFileSync } = require("child_process");
const { join } = require("path");

const script_path = join(__dirname, "..", "scripts", "populate_db");

function resetDB() {
  return execFileSync(script_path);
}

module.exports = resetDB;
