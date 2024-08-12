const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const databaseName = process.env.DATABASENAME
const db = new sqlite3.Database(databaseName + '.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE,
      license_key TEXT
    )
  `);
  db.close();
});