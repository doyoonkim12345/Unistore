import styled from "styled-components";

export const ListContainer = styled.div`
    width: 100vw;
    height:100%;
    text-align:center;
    display:flex;
    justify-content : center;
    flex-wrap: wrap;
    align-items: center;

`

export const EachListContainer = styled.div``






export const EachStoreBack = styled.div`
    order:-10;
    width : 24rem;
    height : 12rem;
    margin-top:1rem;
    margin-left:0.5rem;
    margin-right:0.5rem;
    border-radius: 1em;
    transition: 400ms;
    align-items: center;
    display:flex;
    background-color: ${props => props.color || "red"};
    //만약 백그라운드 색을 보내지 않았다면 기본값 빨간색 props. 다음에 갖고 오고 싶은 인자 이름 적기
    :active{
        width:30rem;
        height:15rem;
    }
`;

export const DataContainer = styled.div`
    width : 20rem;
    margin-left: 1.25rem;
    text-align:left;
    align-content: center;
    position: absolute;
    display: inline;
    .logoStyle{
        font-size:18px;
        font-weight: 600;
    }
    .sTitleStyle{
        font-size:18px;
        font-weight: 500;
        margin-bottom:-0.25rem;
        margin-top:-0.5rem;
    }
    .maxStyle{
        font-size:10px;
        writing-mode: vertical-rl;
        font-weight: 900;
    }
    .mainTitleStyle{
        font-size:30px;
        font-weight: 900;
    }
    .explainStyle{
        font-size:12px;
    }
    p { width:65%;}
`;

export const EachBackGround= styled.div`
    width:100%;
    height:100%;
    background-image: url(${props=> props.imgUrl});
    background-position: 130% center;
    background-size: 70%;
    background-repeat: no-repeat;
`;