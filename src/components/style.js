import styled from "styled-components";

export const TitleContainer = styled.div`
    text-align: center
`

export const ListContainer = styled.div`
    width: 100vw;
    height:100%;
    text-align:center;
    display:flex;
    justify-content : center;
    flex-wrap: wrap;
`


export const EachStoreBack = styled.div`
    width : 24rem;
    height : 21.875rem;
    margin-top:1rem;
    margin-left:0.5rem;
    margin-right:0.5rem;
    border-radius: 10px;
    overflow: hidden;
    
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.color || "yellow"};
    //만약 백그라운드 색을 보내지 않았다면 기본값 빨간색 props. 다음에 갖고 오고 싶은 인자 이름 적기
`;

export const StoreImg= styled.div`
    width:100%;
    height:13rem;
    border-radius: 10px 10px 0 0;
    background-image: url(${props=> props.imgUrl});
    background-size: cover;
    background-repeat: no-repeat;
`;

export const RtmEvents=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
    padding-right:12px;
    .realtime{
        font-size: 30px;
        font-weight : bold;
    }
    .time{
        font-weight:bold;
    }
`;

export const Contents=styled.div`
    display:flex;
    flex-direction: column;
    width:100;
    height:10.625rem;
    .Name {
        font-size: 16px;
        margin: 0.25rem;
    }
    .Always{
        text-align: start;
        padding-left: 12px;
        margin-top: 0.25rem;
        font-size: 18px;
    }

`;

export const Buttons=styled.div`
    width: 100%;
    flex-direction:row;
    display:flex;
    justify-content: space-around;
    margin-top: 0.5rem;
    a{
        color: black;
        width: 10rem;
        text-align: center;
        margin-bottom: 4px;
        text-decoration: none;
        font-weight:600;
    }
`;