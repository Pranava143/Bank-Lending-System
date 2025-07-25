const express = require('express');
const router = express.Router();
const { createLoan, getAllLoans, getLoanById } = require('../controllers/loanController');

router.post('/', createLoan);
router.get('/', getAllLoans);
router.get('/:id', getLoanById);

module.exports = router;