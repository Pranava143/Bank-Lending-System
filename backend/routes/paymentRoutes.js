const express = require('express');
const router = express.Router();
const { recordPayment, getPaymentsByLoanId } = require('../controllers/paymentController');

router.post('/', recordPayment);
router.get('/:loan_id', getPaymentsByLoanId);

module.exports = router;