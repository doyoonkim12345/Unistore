import styled from "styled-components";

export const ContentBox = styled.div`
    width: 11.25rem;//사진 넓이 변경
    height: 15.5rem;
    margin: 0.3rem;
    //background-color: skyblue;
`

export const ImgBox = styled.div`
    width:100%;
    height:11.25rem; // 사진 세로 변경
    background-image: url(${props=> props.imgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display:flex;
    align-items: flex-end;
`

export const TimeBox = styled.div`
    width:100%;
    height:2rem;
    background-color: rgba(255, 0, 0, 0.6);
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem 0 0.5rem;
    .discountContainer {
        color:white;
        font-size: 14px;
        font-weight: bold;
    }
    .timeContianer{
        color:yellow;
        font-size: 12px;
        font-weight:bold;
    }
    
`

export const TitleBox = styled.p`
    display: block;
    width:100%;
    margin: 0%;
    margin-top:0.1rem;
    font-size: 14px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ExplainBox = styled.p`
    margin: 0%;
    margin-bottom: 0.5rem;
    font-size: 12px;
    color: #7F7F7F;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ButtonContainer = styled.div`
    display:flex;
    justify-content: space-around;
    button{
        background: none;
        border:none;
    }
    a{
        text-decoration: none;
        color: black;
        font-size:11px;
    }
`

export const MenuViewer = styled.div`
    position:fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-image: url(${props=> props.imgUrl});
    background-color: rgba(255, 255, 255, 0.7);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display:flex;
    justify-content:flex-end;
    button{
        background: none;
        border: none;
        height:3rem;
    }
`