const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// This line is the key change. It looks for a special Render path.
const dbDirectory = process.env.DB_DIR || __dirname;

// Create the directory if it doesn't exist (important for the first run on Render)
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.resolve(dbDirectory, 'lending.db');

console.log(`Attempting to connect to database at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      // All of your CREATE TABLE statements go here
      db.run(`
        CREATE TABLE IF NOT EXISTS customers (
          id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE,
          phone TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS loans (
          id TEXT PRIMARY KEY, customer_id TEXT NOT NULL, loan_amount REAL NOT NULL,
          loan_period_years INTEGER NOT NULL, interest_rate_yearly REAL NOT NULL,
          total_repayment REAL NOT NULL, monthly_payment REAL NOT NULL,
          status TEXT DEFAULT 'active', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (customer_id) REFERENCES customers(id)
        )
      `);
      db.run(`
        CREATE TABLE IF NOT EXISTS payments (
          id TEXT PRIMARY KEY, loan_id TEXT NOT NULL, amount REAL NOT NULL,
          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (loan_id) REFERENCES loans(id)
        )
      `);
       db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL, role TEXT DEFAULT 'customer',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    });
  }
});

module.exports = db;