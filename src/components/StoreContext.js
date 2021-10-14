import React, { useEffect, useState } from "react";
import {
  ButtonContainer,
  ContentBox,
  ExplainBox,
  ImgBox,
  MenuViewer,
  TimeBox,
  TitleBox,
} from "./newStyle";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { checkAm, checkDate } from "./modules";

const defaultStoreData = {
  name: "란탕수육 이대점",
  storeKind: "한식",
  discount: "항상 대학생 10% 할인",
  phone: "010-0000-0000",
  addressXY: [37.402056, 127.108212],
};

const defaultRtmData = {
  realTime: "ex)맥주1+1",
  startTime: 9,
  endTime: 10,
  imgUrl:
    "https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400_7.png",
  startAm: false, // true= am false= pm
  endAm: false,
  status: true,
};

export default function StoreContext({
  storeData = defaultStoreData,
  xy,
  rtmData = defaultRtmData,
}) {
  // console.log 결과값
  // 하루 전

  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  const [isOn, setIsOn] = useState(true);
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [isImgOn, setIsImgOn] = useState(false);
  const [isBefore, setIsBefore] = useState("");

  useEffect(
    () => {
      const repeat = setInterval(() => {
        const checkedDate = checkDate(rtmData);

        if (
          checkedDate.startDate < checkedDate.nowDate &&
          checkedDate.nowDate < checkedDate.endDate &&
          rtmData.status
        ) {
          setIsOn(true);
          setIsBefore("");
          const countHour = String(
            Math.floor(
              ((checkedDate.endDate - checkedDate.nowDate) %
                (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            )
          ).padStart(2, "0");
          setHour(countHour);

          const countMinute = String(
            Math.floor(
              ((checkedDate.endDate - checkedDate.nowDate) % (1000 * 60 * 60)) /
                (1000 * 60)
            )
          ).padStart(2, "0");
          setMinute(countMinute);

          const countSecond = String(
            Math.floor(
              ((checkedDate.endDate - checkedDate.nowDate) % (1000 * 60)) / 1000
            )
          ).padStart(2, "0");
          setSecond(countSecond);
        } else if (
          checkedDate.beforestartDate < checkedDate.nowDate &&
          checkedDate.nowDate <= checkedDate.startDate &&
          rtmData.status
        ) {
          setIsOn(true);
          const startAt = `${
            checkAm(rtmData.startAm, rtmData.startTime) >= 12
              ? checkAm(rtmData.startAm, rtmData.startTime) - 12
              : checkAm(rtmData.startAm, rtmData.startTime)
          }시부터`;

          setIsBefore(startAt);
        } else {
          setIsOn(false);
          setIsBefore("");
          clearInterval(repeat);
        }
      }, 1000);
      return () => clearInterval(repeat);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rtmData]
  );

  const onClick = () => {
    setIsMenuOn(false);
    setIsImgOn(false);
  };

  const onMenuClick = () => {
    setIsMenuOn(true);
  };

  const onImgClick = () => {
    setIsImgOn(true);
  };

  return (
    <ContentBox>
      <ImgBox imgUrl={storeData.imgUrl} onClick={onImgClick}>
        {isOn && (
          <TimeBox>
            <span className="discountContainer">{rtmData.realTime}</span>
            <span className="timeContianer">
              {isBefore ? isBefore : `${hour}:${minute}:${second}`}
            </span>
          </TimeBox>
        )}
      </ImgBox>
      <TitleBox>{`${storeData.name}( ${storeData.storeKind} )`}</TitleBox>
      <ExplainBox>{storeData.discount}</ExplainBox>
      <ButtonContainer>
        <a href={`tel:${storeData.phone}`}>
          <FaPhoneAlt size={16} />
        </a>
        <a
          href={`https://map.kakao.com/link/map/${storeData.name},${
            xy ? xy[1] : storeData.addressXY && storeData.addressXY[1]
          },${xy ? xy[0] : storeData.addressXY && storeData.addressXY[0]}`}
        >
          <FaMapMarkerAlt size={16} />
        </a>
        <button onClick={onMenuClick} type="button">
          <MdRestaurantMenu size={18} />
        </button>
      </ButtonContainer>
      {(isMenuOn || isImgOn) && (
        <MenuViewer
          imgUrl={
            isMenuOn
              ? /*메뉴이미지*/ storeData.menuUrl
              : storeData.imgUrl /*메인이미지*/
          }
        >
          <button onClick={onClick}>
            <CgClose size={30} />
          </button>
        </MenuViewer>
      )}
    </ContentBox>
  );
}
