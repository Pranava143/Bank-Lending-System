const db = require('../db/db');

// GET /api/v1/reports/loans?start=<YYYY-MM-DD>&end=<YYYY-MM-DD>
exports.getLoanReport = (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ message: 'Start and end date parameters are required.' });
    }

    // Add time to the end date to include the entire day
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const sql = `
        SELECT * FROM loans
        WHERE created_at BETWEEN ? AND ?
        ORDER BY created_at DESC
    `;

    db.all(sql, [start, endDate.toISOString()], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.status(200).json(rows);
    });
};

// GET /api/v1/reports/customers/:customerId
exports.getCustomerReport = (req, res) => {
    const { customerId } = req.params;
    if (!customerId) {
        return res.status(400).json({ message: 'Customer ID is required.' });
    }

    const customerSql = 'SELECT id, name, email, phone, created_at FROM customers WHERE id = ?';
    const loansSql = 'SELECT * FROM loans WHERE customer_id = ? ORDER BY created_at DESC';
    const paymentsSql = `
        SELECT p.* FROM payments p
        JOIN loans l ON p.loan_id = l.id
        WHERE l.customer_id = ?
        ORDER BY p.payment_date DESC
    `;

    db.get(customerSql, [customerId], (err, customer) => {
        if (err) {
            return res.status(500).json({ message: 'Database error fetching customer', error: err.message });
        }
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        db.all(loansSql, [customerId], (err, loans) => {
            if (err) {
                return res.status(500).json({ message: 'Database error fetching loans', error: err.message });
            }

            db.all(paymentsSql, [customerId], (err, payments) => {
                if (err) {
                    return res.status(500).json({ message: 'Database error fetching payments', error: err.message });
                }

                res.status(200).json({
                    customerDetails: customer,
                    loans: loans,
                    payments: payments,
                });
            });
        });
    });
};