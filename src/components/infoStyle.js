import styled from "styled-components";

export const RtmEventContainer=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .preview{
        display:flex;
        flex-direction: column;
        align-items: center;
        background-color: #FEABAE;
        padding: 1rem;
        border-radius: 20px;
        margin-bottom: 1.375rem;
        h3{
            margin:0;
        }
        h4{
            margin:0;
            margin-top: 0.2rem;
            margin-bottom:0.2rem;
        }
    .rtmOff{
        width: 11rem;
        height: 3rem;
        margin-top: 1.375rem;
        border-radius: 20px;
        background-color: red;
        border:none;
        color: white;
        font-size: 15px;
        transition: 0.4s;
        :hover{
            background-color: black;
        }
    }

    }
`

export const RtmInputForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

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

    div button{
        width:5rem;
        border-radius: 0 20px 20px 0;
        
    }
    div input{
        width:15rem;
        border-radius: 20px 0 0 20px;
    }

`