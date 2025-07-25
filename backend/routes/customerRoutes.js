const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
} = require('../controllers/customerController');

// Routes
router.post('/', createCustomer);
router.get('/', getAllCustomers); // Changed from test route to get all
router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;