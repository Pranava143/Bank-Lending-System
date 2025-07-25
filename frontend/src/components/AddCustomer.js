import React, { useState } from 'react';
import { createCustomer } from '../Api';
import { FormContainer, FormTitle, Form, FormGroup, Label, Input, SubmitButton, ErrorText, SuccessText } from './FormComponents';

export default function AddCustomer({ navigateTo }) {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) {
            setError('All fields are required.');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const result = await createCustomer(formData);
            setSuccess(`Customer "${result.name}" created successfully with ID: ${result.customerId}`);
            setFormData({ name: '', email: '', phone: '' });
            setTimeout(() => navigateTo('dashboard'), 2000);
        } catch (err) {
            setError('Failed to create customer. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <FormTitle>Add New Customer</FormTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Full Name</Label>
                    <Input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                </FormGroup>
                 <FormGroup>
                    <Label htmlFor="email">Email Address</Label>
                    <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                </FormGroup>
                 <FormGroup>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} />
                </FormGroup>
                {error && <ErrorText>{error}</ErrorText>}
                {success && <SuccessText>{success}</SuccessText>}
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Customer'}
                </SubmitButton>
            </Form>
        </FormContainer>
    );
}