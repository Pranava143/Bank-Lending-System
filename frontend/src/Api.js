const API_BASE_URL = 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    const config = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An API error occurred');
    }
    return response.json();
}

// Customer APIs
export const getCustomers = () => request('/customers');
export const createCustomer = (customerData) => request('/customers', {
    method: 'POST',
    body: JSON.stringify(customerData),
});

// Loan APIs
export const getLoans = () => request('/loans');
export const getLoanById = (loanId) => request(`/loans/${loanId}`);
export const createLoan = (loanData) => request('/loans', {
    method: 'POST',
    body: JSON.stringify(loanData),
});

// Payment APIs
export const getPaymentsByLoanId = (loanId) => request(`/payments/${loanId}`);
export const recordPayment = (paymentData) => request('/payments', {
    method: 'POST',
    body: JSON.stringify(paymentData),
});
