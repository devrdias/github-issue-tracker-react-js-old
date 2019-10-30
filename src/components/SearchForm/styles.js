import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  min-height: 34px;
  max-width: 280px;
  margin-top: 30px;
  line-height: 20px;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #d1d5da;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);

  svg {
    margin: 0 7px;
  }
`;

export const InputFilter = styled.input`
  border: 0;
  vertical-align: middle;
  color: #586069;
  ::placeholder {
    color: #bbb;
  }
`;
