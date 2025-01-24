const pg = require("pg");
require("dotenv").config();
async function getConnection() {
  const db = new pg.Client({
    user: process.env.SQLUSER,
    port: process.env.SQLPORT,
    host: process.env.HOST,
    password: process.env.SQLPASSWORD,
    database: process.env.DATABASE,
  });
  await db.connect();
  return db;
}

module.exports = { getConnection };
