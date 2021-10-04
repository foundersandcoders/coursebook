// const build = require("../../database/build.js");
const { execFileSync } = require("child_process");

module.exports = (on, config) => {
  on("task", {
    resetDb: () => {
      return execFileSync("./scripts/populate_db");
    },
  });
};
