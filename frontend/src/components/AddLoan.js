import React, { useState, useEffect } from 'react';
import { getCustomers, createLoan } from '../Api';
import { FormContainer, FormTitle, Form, FormGroup, Label, Input, Select, SubmitButton, ErrorText, SuccessText } from './FormComponents';


export default function AddLoan({ navigateTo }) {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        loan_amount: '',
        loan_period_years: '',
        interest_rate_yearly: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, customer_id: data[0].id }));
                }
            } catch (err) {
                setError('Could not fetch customers.');
            }
        };
        fetchCustomers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formData).some(val => val === '')) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const result = await createLoan(formData);
            setSuccess(`Loan created successfully with ID: ${result.loanId}`);
            setTimeout(() => navigateTo('dashboard'), 2000);
        } catch (err) {
            setError('Failed to create loan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Create New Loan</FormTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="customer_id">Customer</Label>
                    <Select name="customer_id" id="customer_id" value={formData.customer_id} onChange={handleChange}>
                        {customers.length > 0 ? customers.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        )) : <option>Loading customers...</option>}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="loan_amount">Loan Amount ($)</Label>
                    <Input type="number" name="loan_amount" id="loan_amount" value={formData.loan_amount} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="loan_period_years">Loan Period (Years)</Label>
                    <Input type="number" name="loan_period_years" id="loan_period_years" value={formData.loan_period_years} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="interest_rate_yearly">Yearly Interest Rate (%)</Label>
                    <Input type="number" step="0.1" name="interest_rate_yearly" id="interest_rate_yearly" value={formData.interest_rate_yearly} onChange={handleChange} />
                </FormGroup>
                {error && <ErrorText>{error}</ErrorText>}
                {success && <SuccessText>{success}</SuccessText>}
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Loan'}
                </SubmitButton>
            </Form>
        </FormContainer>
    );
}