import React from 'react';
import { StoreImg, EachStoreBack, RtmEvents, Contents, Buttons} from '../style';

const storeTestData = {
    storeName:'란탕수육 이대점',
    realTime:'맥주1+1',
    startTime: 9,
    endTime: 10,
    always:'항상 대학생 10% 할인',
    imgUrl:'https://www.eguljak.com/upload/product/3696654736_oTZCrFQ3_20210726032314.jpg',
    color:'skyblue',
    tel:'tel:010-0000-0000',
    map:'https://map.kakao.com/link/to/카카오판교오피스,37.402056,127.108212'
}

export default function EachStore({}){
    return(
            <EachStoreBack color={storeTestData.color}>
                <StoreImg imgUrl={storeTestData.imgUrl}></StoreImg>
                <Contents>
                <span className="Name">{storeTestData.storeName}</span>
                <RtmEvents>
                <span className="realtime">{storeTestData.realTime}</span>
                <span className="time">{`${storeTestData.startTime}시부터 ${storeTestData.endTime}까지만`}</span>
                </RtmEvents>
                <span className="Always">{storeTestData.always}</span>
                <Buttons>
                <a href={storeTestData.tel}>전화</a>
                <span>|</span>
                <a href={storeTestData.map}>길찾기</a>
                </Buttons>
                </Contents>
            </EachStoreBack>
    );
}