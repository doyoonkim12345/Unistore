import styled from "styled-components";

export const LoginBox = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LoginInputForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    width: 20rem;
    height: 4rem;
    margin-bottom: 1.375rem;
    border-radius: 20px;
    border: none;
    text-indent: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 18px;

    ::placeholder {
      color: #3c3c3c;
    }
  }
  button {
    width: 20rem;
    height: 4rem;
    margin-bottom: 1.375rem;
    border-radius: 20px;
    background-color: #8a4c7d;
    border: none;
    color: white;
    font-size: 18px;
    transition: 0.4s;
    :active {
      background-color: black;
    }
  }
`;
