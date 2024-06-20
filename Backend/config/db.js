const mysql = require("mysql");
const util = require("util");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
  port: 3306,
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) connection.release();

  return;
});

db.query = util.promisify(db.query);

const queryDB = async (sql, params) => {
  return await db.query(sql, params);
};

createTable();
module.exports = queryDB;


async function createTable() {
  try {
    await db.query(
      `CREATE TABLE IF NOT EXISTS replays(id INT AUTO_INCREMENT PRIMARY KEY, 
      replay TEXT,
      winner VARCHAR(255),
      winHis VARCHAR(255))`
    );
    console.log("Table created");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

