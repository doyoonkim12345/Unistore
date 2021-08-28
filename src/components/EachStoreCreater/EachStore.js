import React from 'react';
import { DataContainer, EachBackGround, EachStoreBack } from '../style';

const storeTestData = {
    logo:'란탕수육 이대점',
    sTitle:'맥주1+!',
    mainTitle:'9시부터 10시까지만',
    max:1,
    explain:'항상 대학생 10% 할인',
    imgUrl:'https://pelicana.co.kr/resources/images/menu/original_menu01_200529.png',
    color:'skyblue'
}

export default function EachStore({}){
    return(
            <EachStoreBack color={storeTestData.color}>
                <DataContainer>
                    <p className='logoStyle'>{storeTestData.logo}</p>
                    <p className='sTitleStyle'>{storeTestData.sTitle}</p>
                    <span className='maxStyle'>{storeTestData.max ? '최대 ' : ''}</span>
                    <span className='mainTitleStyle'>{storeTestData.mainTitle}</span>
                    <p className='explainStyle'>{storeTestData.explain}</p>
                </DataContainer>
                <EachBackGround imgUrl={storeTestData.imgUrl}></EachBackGround>
                <a href={'tel:010-0000-0000'}>전화</a><a href={"https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212"}>길찾기</a>
            </EachStoreBack>
    );
}