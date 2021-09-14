import styled from "styled-components";

export const InputForm = styled.form`
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input{
        width: 20rem;
        height: 4rem;
        margin-bottom: 1.375rem;
        border-radius: 20px;
        border: none;
        text-indent:1rem;
        background-color: rgba(0,0,0,0.1);
        font-size: 18px;

        ::placeholder{
            color: #3C3C3C;
        }
    }
    button{
        width: 20rem;
        height: 4rem;
        margin-bottom: 1.375rem;
        border-radius: 20px;
        background-color: #8A4C7D;
        border:none;
        color: white;
        font-size: 18px;
        transition: 0.4s;
        :hover{
            background-color: black;
        }
    }
    .postcode{
        position: fixed;
        top:0;
        left:0;
        height:100vh;
        width:100%;
        background-color: white;
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        button{
            width: 3rem;
            height:3rem;
            color: black;
            background-color: transparent;
        }
    }
    
`