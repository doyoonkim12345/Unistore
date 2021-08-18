import React from 'react';
import { DataContainer, EachBackGround, EachStoreBack } from '../style';

/*const storeTestData = {
    logo:'치킨플러스',
    sTitle:'신메뉴 출시 기념',
    mainTitle:'5천원 할인',
    max:1,
    explain:'8월 4일~8월 31일 닭볶이 5천원',
    imgUrl:'https://pelicana.co.kr/resources/images/menu/original_menu01_200529.png',
    color:'skyblue'
}*/

export default function EachStore({storeTestData}){
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
            </EachStoreBack>
    );
}