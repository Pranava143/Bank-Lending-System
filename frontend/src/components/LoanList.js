import React from 'react';
import styled from 'styled-components';

// Re-using components from CustomerList for consistency
const ListContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const ListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
`;

const ScrollableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
`;

const ListItem = styled.div`
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const ItemContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LoanId = styled.p`
  font-weight: 500;
  color: #4f46e5;
  margin: 0;
`;

const CustomerName = styled.p`
  font-size: 0.875rem;
  color: #475569;
  margin: 0;
`;

const Amount = styled.p`
    font-weight: 600;
    font-size: 1.125rem;
    color: #1e293b;
    margin: 0;
`;

const StatusBadge = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    background-color: ${props => props.active ? '#dcfce7' : '#f1f5f9'};
    color: ${props => props.active ? '#166534' : '#334155'};
`;


export default function LoanList({ loans, customers, viewLoanDetails }) {
    const getCustomerName = (customerId) => {
        const customer = customers.find(c => c.id === customerId);
        return customer ? customer.name : 'Unknown Customer';
    };

    return (
        <ListContainer>
            <ListTitle>Loans ({loans.length})</ListTitle>
            <ScrollableList>
                {loans.length > 0 ? loans.map(loan => (
                    <ListItem key={loan.id} onClick={() => viewLoanDetails(loan.id)}>
                        <ItemContent>
                            <div>
                                <LoanId>Loan ID: {loan.id.substring(0, 15)}...</LoanId>
                                <CustomerName>
                                    {getCustomerName(loan.customer_id)}
                                </CustomerName>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <Amount>
                                    ${loan.loan_amount.toLocaleString()}
                                </Amount>
                                <StatusBadge active={loan.status === 'active'}>
                                    {loan.status}
                                </StatusBadge>
                            </div>
                        </ItemContent>
                    </ListItem>
                )) : <CustomerName>No loans found.</CustomerName>}
            </ScrollableList>
        </ListContainer>
    );
}