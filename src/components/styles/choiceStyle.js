import styled from "styled-components";

export const LinkList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  p {
    margin: 0;
    margin-top: 1.375rem;
    width: 20rem;
    height: 4rem;
    border-radius: 20px;
    background-color: #8a4c7d;
    border: none;
    color: white;
    font-size: 18px;
    transition: 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;

    .default-link {
      text-decoration: none;
      color: white;
      font-size: 18px;
    }
    :active {
      background-color: black;
    }
  }
`;
