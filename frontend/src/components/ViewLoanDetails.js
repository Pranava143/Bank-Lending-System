import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { getLoanById, getPaymentsByLoanId, recordPayment } from '../Api';
import { Input, SubmitButton } from './FormComponents';
import { ScrollableList, ListItem } from './ListComponents'; // FIXED: Import shared components

const DetailsContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
`;

const BackButton = styled.button`
  margin-bottom: 1.5rem;
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: #3730a3;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0 0 1.5rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoBox = styled.div`
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;

  &.success {
    background-color: #f0fdf4;
    p:first-child { color: #15803d; }
    p:last-child { color: #166534; }
  }
  &.danger {
    background-color: #fef2f2;
    p:first-child { color: #b91c1c; }
    p:last-child { color: #991b1b; }
  }
`;

const InfoLabel = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const InfoValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
`;

export default function ViewLoanDetails({ loanId, navigateTo }) {
    const [loan, setLoan] = useState(null);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');

    const fetchData = useCallback(async () => {
        if (!loanId) return;
        try {
            setLoading(true);
            const [loanData, paymentsData] = await Promise.all([
                getLoanById(loanId),
                getPaymentsByLoanId(loanId)
            ]);
            setLoan(loanData);
            setPayments(paymentsData);
            setError('');
        } catch (err) {
            setError('Failed to fetch loan details.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [loanId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!paymentAmount || paymentAmount <= 0) {
            setError('Please enter a valid payment amount.');
            return;
        }
        try {
            await recordPayment({ loan_id: loanId, amount: paymentAmount });
            setPaymentAmount('');
            fetchData();
        } catch (err) {
            setError('Failed to record payment.');
        }
    };

    if (loading) return <div>Loading loan details...</div>;
    if (error) return <div style={{color: '#ef4444'}}>{error}</div>;
    if (!loan) return <div>Loan not found.</div>;

    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
    const remainingBalance = loan.total_repayment - totalPaid;

    return (
        <DetailsContainer>
            <BackButton onClick={() => navigateTo('dashboard')}>&larr; Back to Dashboard</BackButton>
            <Card>
                <Title>Loan Details</Title>
                <Subtitle>ID: {loan.id}</Subtitle>
                <InfoGrid>
                    <InfoBox>
                        <InfoLabel>Principal</InfoLabel>
                        <InfoValue>${loan.loan_amount.toLocaleString()}</InfoValue>
                    </InfoBox>
                    <InfoBox>
                        <InfoLabel>Total Repayment</InfoLabel>
                        <InfoValue>${loan.total_repayment.toLocaleString()}</InfoValue>
                    </InfoBox>
                    <InfoBox className="success">
                        <InfoLabel>Total Paid</InfoLabel>
                        <InfoValue>${totalPaid.toLocaleString(undefined, {minimumFractionDigits: 2})}</InfoValue>
                    </InfoBox>
                    <InfoBox className="danger">
                        <InfoLabel>Balance Remaining</InfoLabel>
                        <InfoValue>${remainingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</InfoValue>
                    </InfoBox>
                </InfoGrid>
                <PaymentGrid>
                    <div>
                        <SectionTitle>Record a Payment</SectionTitle>
                        <form onSubmit={handlePaymentSubmit} style={{display: 'flex', gap: '0.5rem'}}>
                            <Input 
                                type="number" 
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                placeholder={`Monthly: $${loan.monthly_payment}`}
                            />
                            <SubmitButton type="submit" style={{width: 'auto'}}>Pay</SubmitButton>
                        </form>
                    </div>
                    <div>
                        <SectionTitle>Payment History</SectionTitle>
                        <ScrollableList>
                            {payments.length > 0 ? payments.map(p => (
                                <ListItem key={p.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>{new Date(p.payment_date).toLocaleDateString()}</span>
                                    <strong>${p.amount.toLocaleString()}</strong>
                                </ListItem>
                            )) : <p>No payments recorded yet.</p>}
                        </ScrollableList>
                    </div>
                </PaymentGrid>
            </Card>
        </DetailsContainer>
    );
}