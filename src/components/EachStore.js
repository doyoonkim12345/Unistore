import React from "react";
import { StoreImg, EachStoreBack, RtmEvents, Contents, Buttons } from "./style";

const storeTestData = {
  name: "란탕수육 이대점",
  realTime: "맥주1+1",
  startTime: 9,
  endTime: 10,
  discount: "항상 대학생 10% 할인",
  imgUrl:
    "https://www.eguljak.com/upload/product/3696654736_oTZCrFQ3_20210726032314.jpg",
  color: "skyblue",
  phone: "tel:010-0000-0000",
  addressXY: [37.402056, 127.108212],
};

export default function EachStore({
  rtmData = storeTestData,
  storeData = storeTestData,
}) {
  return (
    <EachStoreBack color="skyblue">
      <StoreImg imgUrl={rtmData.imgUrl}></StoreImg>
      <Contents>
        <span className="Name">{storeData.name}</span>
        <RtmEvents>
          <span className="realtime">{rtmData.realTime}</span>
          <span className="time">{`${rtmData.startAm ? "am" : "pm"}${
            rtmData.startTime
          }시~${rtmData.endAm ? "am" : "pm"}${rtmData.endTime}시까지만`}</span>
        </RtmEvents>
        <span className="Always">{storeData.discount}</span>
        <Buttons>
          <a href={`tel:${storeData.phone}`}>전화</a>
          <span>|</span>
          <a
            href={`https://map.kakao.com/link/to/${storeData.name},${
              storeData.addressXY && storeData.addressXY[0]
            },${storeData.addressXY && storeData.addressXY[1]}`}
          >
            길찾기
          </a>
        </Buttons>
      </Contents>
    </EachStoreBack>
  );
}
