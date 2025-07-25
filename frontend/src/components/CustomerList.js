import React from 'react';
import styled from 'styled-components';
import { ListContainer, ListTitle, ScrollableList, ListItem } from './ListComponents';

const ItemTitle = styled.p`
  font-weight: 500;
  color: #1e293b;
  margin: 0;
`;

const ItemSubtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

export default function CustomerList({ customers }) {
    return (
        <ListContainer>
            <ListTitle>Customers ({customers.length})</ListTitle>
            <ScrollableList>
                {customers.length > 0 ? customers.map(customer => (
                    <ListItem key={customer.id}>
                        <ItemTitle>{customer.name}</ItemTitle>
                        <ItemSubtitle>{customer.email}</ItemSubtitle>
                    </ListItem>
                )) : <ItemSubtitle>No customers found.</ItemSubtitle>}
            </ScrollableList>
        </ListContainer>
    );
}