const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

// POST /api/v1/loans -> Create a new loan
exports.createLoan = (req, res) => {
  const { customer_id, loan_amount, loan_period_years, interest_rate_yearly } = req.body;
  if (!customer_id || !loan_amount || !loan_period_years || !interest_rate_yearly) {
    return res.status(400).json({ error: 'All loan fields are required.' });
  }

  const id = `loan-${uuidv4()}`;
  const total_repayment = loan_amount * (1 + (interest_rate_yearly / 100) * loan_period_years);
  const monthly_payment = total_repayment / (loan_period_years * 12);

  const sql = `
    INSERT INTO loans (id, customer_id, loan_amount, loan_period_years, interest_rate_yearly, total_repayment, monthly_payment, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [id, customer_id, loan_amount, loan_period_years, interest_rate_yearly, total_repayment, monthly_payment.toFixed(2), 'active'];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Loan created successfully', loanId: id });
  });
};

// GET /api/v1/loans -> Get all loans
exports.getAllLoans = (req, res) => {
  const sql = 'SELECT * FROM loans';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};

// GET /api/v1/loans/:id -> Get a single loan by ID
exports.getLoanById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM loans WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.status(200).json(row);
  });
};