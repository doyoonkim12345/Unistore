import styled from "styled-components";

export const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: -10rem, -10rem;
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
    :hover {
      background-color: black;
    }
  }
  .postcode {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      width: 3rem;
      height: 3rem;
      color: black;
      background-color: transparent;
    }
  }
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #feabae;
    padding: 1rem;
    border-radius: 20px;
    margin-bottom: 1.375rem;

    h3 {
      margin: 0;
    }
    h4 {
      margin: 0;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
    }
  }
`;
