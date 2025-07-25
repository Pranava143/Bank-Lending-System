const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'lending.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      // Create customers table with 'id' as the primary key
      db.run(`
        CREATE TABLE IF NOT EXISTS customers (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE,
          phone TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Create loans table
      db.run(`
        CREATE TABLE IF NOT EXISTS loans (
          id TEXT PRIMARY KEY,
          customer_id TEXT NOT NULL,
          loan_amount REAL NOT NULL,
          loan_period_years INTEGER NOT NULL,
          interest_rate_yearly REAL NOT NULL,
          total_repayment REAL NOT NULL,
          monthly_payment REAL NOT NULL,
          status TEXT DEFAULT 'active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (customer_id) REFERENCES customers(id)
        )
      `);

      // Create payments table
      db.run(`
        CREATE TABLE IF NOT EXISTS payments (
          id TEXT PRIMARY KEY,
          loan_id TEXT NOT NULL,
          amount REAL NOT NULL,
          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (loan_id) REFERENCES loans(id)
        )
      `);
    });
  }
});

module.exports = db;