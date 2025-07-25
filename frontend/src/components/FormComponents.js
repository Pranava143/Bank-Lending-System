import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
`;

export const Input = styled.input`
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid #cbd5e1;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
  }
`;

export const Select = styled(Input).attrs({ as: 'select' })``;

export const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #4f46e5;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
`;

export const SuccessText = styled.p`
  color: #22c55e;
  font-size: 0.875rem;
`;