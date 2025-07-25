import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddCustomer from './components/AddCustomer';
import AddLoan from './components/AddLoan';
import ViewLoanDetails from './components/ViewLoanDetails';
import styled from 'styled-components';

const MainContainer = styled.main`
  padding: 2rem;
  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

function App() {
    const [page, setPage] = useState('dashboard');
    const [selectedLoanId, setSelectedLoanId] = useState(null);

    const navigateTo = (targetPage) => {
        setPage(targetPage);
    };

    const viewLoanDetails = (loanId) => {
        setSelectedLoanId(loanId);
        setPage('viewLoan');
    };

    const renderPage = () => {
        switch (page) {
            case 'addCustomer':
                return <AddCustomer navigateTo={navigateTo} />;
            case 'addLoan':
                return <AddLoan navigateTo={navigateTo} />;
            case 'viewLoan':
                 return <ViewLoanDetails loanId={selectedLoanId} navigateTo={navigateTo} />;
            case 'dashboard':
            default:
                return <Dashboard navigateTo={navigateTo} viewLoanDetails={viewLoanDetails} />;
        }
    };

    return (
        <>
            <Header navigateTo={navigateTo} />
            <MainContainer>
                {renderPage()}
            </MainContainer>
        </>
    );
}

export default App;