import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  border: 1px solid #eee;
  ${props =>
    props.error &&
    css`
      border: 1px solid red;
    `}
`;

const rotate = keyframes`${css`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`}`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading || props.disabled,
}))`
  background: ${props => (props.disabled ? '#999' : '#7159c1')};
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  & [disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  opacity: 0.9;
  flex: 1;
  padding-top: 5px;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
