import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const ListTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
`;

export const ScrollableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 24rem;
  overflow-y: auto;
`;

export const ListItem = styled.div`
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
`;