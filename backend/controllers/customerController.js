const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');

// POST /api/v1/customers -> Create a new customer
exports.createCustomer = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  }
  const id = `cust-${uuidv4()}`;
  const sql = 'INSERT INTO customers (id, name, email, phone) VALUES (?, ?, ?, ?)';
  
  db.run(sql, [id, name, email, phone], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Customer created', customerId: id, name });
  });
};

// GET /api/v1/customers/:id -> Get a single customer by ID
exports.getCustomerById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM customers WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(row);
  });
};

// PUT /api/v1/customers/:id -> Update a customer
exports.updateCustomer = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const sql = 'UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?';

  db.run(sql, [name, email, phone, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully' });
  });
};

// DELETE /api/v1/customers/:id -> Delete a customer
exports.deleteCustomer = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM customers WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  });
};

// GET /api/v1/customers -> Test route to get all customers
exports.getAllCustomers = (req, res) => {
  db.all('SELECT * FROM customers', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
};