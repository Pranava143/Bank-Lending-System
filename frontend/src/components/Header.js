import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
`;

const Nav = styled.nav`
  container-type: inline-size;
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1280px;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: #475569;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const PrimaryButton = styled(NavButton)`
  background-color: #4f46e5;
  color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background-color: #4338ca;
  }
`;

export default function Header({ navigateTo }) {
    return (
        <HeaderContainer>
            <Nav>
                <NavContent>
                    <div>
                        <Logo onClick={() => navigateTo('dashboard')}>
                           🏦Bank Lending System
                        </Logo>
                    </div>
                    <NavLinks>
                        <NavButton onClick={() => navigateTo('dashboard')}>
                            Dashboard
                        </NavButton>
                        <NavButton onClick={() => navigateTo('addCustomer')}>
                            Add Customer
                        </NavButton>
                        <PrimaryButton onClick={() => navigateTo('addLoan')}>
                            Create Loan
                        </PrimaryButton>
                    </NavLinks>
                </NavContent>
            </Nav>
        </HeaderContainer>
    );
}
