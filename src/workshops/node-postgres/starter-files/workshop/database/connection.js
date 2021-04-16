const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

const options = {
  connectionString: DB_URL,
};

const db = new pg.Pool(options);

module.exports = db;

db.query("SELECT * FROM USERS").then((result) => console.log(result));
