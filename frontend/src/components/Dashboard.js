import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCustomers, getLoans } from '../Api';
import CustomerList from './CustomerList';
import LoanList from './LoanList';

const DashboardContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const DashboardTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ErrorMessage = styled.div`
    text-align: center;
    margin-top: 2.5rem;
    color: #ef4444;
    background-color: #fee2e2;
    padding: 1rem;
    border-radius: 0.375rem;
`;

export default function Dashboard({ viewLoanDetails }) {
    const [customers, setCustomers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [customersData, loansData] = await Promise.all([
                    getCustomers(),
                    getLoans()
                ]);
                setCustomers(customersData);
                setLoans(loansData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Make sure the backend server is running.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '2.5rem'}}>Loading...</div>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <DashboardContainer>
             <DashboardTitle>Dashboard</DashboardTitle>
            <Grid>
                <CustomerList customers={customers} />
                <LoanList loans={loans} customers={customers} viewLoanDetails={viewLoanDetails} />
            </Grid>
        </DashboardContainer>
    );
}