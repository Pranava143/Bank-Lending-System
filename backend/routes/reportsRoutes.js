const express = require('express');
const router = express.Router();
const { getLoanReport, getCustomerReport } = require('../controllers/reportsController');

// Note: We'll add authentication middleware here later
router.get('/loans', getLoanReport);
router.get('/customers/:customerId', getCustomerReport);

module.exports = router;