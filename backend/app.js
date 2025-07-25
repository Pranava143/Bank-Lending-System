require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); 
const authRoutes = require('./routes/authRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/loans', loanRoutes);
app.use('/api/v1/payments', paymentRoutes); 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});