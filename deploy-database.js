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
  });
}

function insertUser(user_id, licenseKey) {
  db.serialize(() => {
    db.run(`
      INSERT INTO users (user_id, license_key)
       VALUES (?, ?)`,
      [user_id, licenseKey]
    );
  });
}

function migrateUser(old_user_id, new_user_id) {
  return new Promise((resolve, reject) => {
    db.get(`
      UPDATE users
       SET user_id = ?
       WHERE user_id = ?
       RETURNING *`,
      [new_user_id, old_user_id],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
}

function checkLicense(licenseKey) {
  return new Promise((resolve, reject) => {
    db.get(`
      SELECT COUNT(license_key) as count
       FROM users
       WHERE license_key = ?`,
      [licenseKey],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        }
        else {
          console.log(result);
          resolve(result.count === 0);
        }
      }
    );
  });
}

exports.initializeDatabase = initializeDatabase;
exports.insertUser = insertUser;
exports.migrateUser = migrateUser;
exports.checkLicense = checkLicense;
