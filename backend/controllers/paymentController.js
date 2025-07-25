const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

// POST /api/v1/payments -> Record a new payment
exports.recordPayment = (req, res) => {
  const { loan_id, amount } = req.body;
  if (!loan_id || !amount) {
    return res.status(400).json({ error: 'loan_id and amount are required.' });
  }

  const id = `pay-${uuidv4()}`;
  const sql = 'INSERT INTO payments (id, loan_id, amount, payment_date) VALUES (?, ?, ?, CURRENT_TIMESTAMP)';

  db.run(sql, [id, loan_id, amount], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Payment recorded', paymentId: id });
  });
};

// GET /api/v1/payments/:loan_id -> Get payment history for a loan
exports.getPaymentsByLoanId = (req, res) => {
  const { loan_id } = req.params;
  const sql = 'SELECT * FROM payments WHERE loan_id = ? ORDER BY payment_date DESC';

  db.all(sql, [loan_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
};