const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const databaseName = process.env.DATABASENAME
const db = new sqlite3.Database(databaseName + '.db');

function initializeDatabase() {
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
}

function insertUser(user_id, licenseKey) {
  db.serialize(() => {
    db.run(`
      INSERT INTO users (user_id, license_key)
       VALUES (?, ?)`,
      [user_id, licenseKey]
    );
    db.close();
  });
}

function migrateUser(old_user_id, new_user_id, licenseKey) {
  db.serialize(() => {
    db.run(`
      UPDATE users
       SET user_id = ?
       WHERE license_key = ? AND user_id = ?`,
      [new_user_id, licenseKey, old_user_id]
    );
    db.close();
  });
}

function checkLicense(licenseKey) {
  let count = -1;
  db.serialize(() => {
    db.get(`
      SELECT COUNT(license_key)
       FROM users
       WHERE license_key = ?`,
      [licenseKey],
      (err, result) => {
        if (err) {
          console.error(err);
        }
        count = result;
      }
    );
    db.close();
  });

  return (count == 0);
}

exports = {
  initializeDatabase,
  insertUser,
  migrateUser,
  checkLicense
}