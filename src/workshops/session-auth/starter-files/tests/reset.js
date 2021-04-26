const { execFile } = require("child_process");
const { join } = require("path");

const BUILD_PATH = join(__dirname, "..", "scripts", "build_db");

function resetDB() {
  return new Promise((resolve, reject) => {
    execFile(BUILD_PATH, (err, stdout, stderr) => {
      console.log(stderr);
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

module.exports = resetDB;
