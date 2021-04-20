const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) throw new Error("DATABASE_URL env var is not defined");

const options = {
  connectionString: DB_URL,
};

const db = new pg.Pool(options);

module.exports = db;
