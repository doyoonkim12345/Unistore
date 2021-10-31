import React, { useEffect, useState, useContext } from "react";
import { dbService } from "../fBase";
import { useTranslation } from "react-i18next";

import { logInfo } from "../App";
import { useHistory } from "react-router-dom";
import StoreContext from "../components/StoreContext";
import {
  RtmEventContainer,
  RtmInputForm,
} from "../components/styles/infoStyle";

const defaultStoreData = {
  name: "란탕수육 이대점",
  storeKind: "한식",
  discount: "항상 대학생 10% 할인",
  phone: "010-0000-0000",
  addressXY: [37.402056, 127.108212],
};

const defaultRtmData = {
  realTime: "맥주1+1",
  startTime: 9,
  endTime: 10,
  imgUrl:
    "https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400_7.png",
  menuUrl:
    "https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400_7.png",
  startAm: true, // true= am false= pm
  endAm: true,
  status: true, // true-> on false -> off
};

function Info() {
  const { t } = useTranslation();

  const { userObj } = useContext(logInfo);

  const [storeData, setStoreData] = useState({});
  const [rtmData, setRtmData] = useState({});
  const [dataStatus, setDataStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(async () => {
      //firestore에 유저의 uid로 내용이 있는 지확인
      const data1 = await dbService
        .collection("storedata")
        .doc(userObj.uid)
        .get();
      const data2 = await dbService
        .collection("rtmstoredata")
        .doc(userObj.uid)
        .get();
      setDataStatus(data2.data() ? data2.data() : "");
      data1.data()
        ? setStoreData(data1.data())
        : setStoreData(defaultStoreData);
      data2.data() ? setRtmData(data2.data()) : setRtmData(defaultRtmData);
    }, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    alert(t("waitmsg"));
    //const imgUrl = await imgToUrl(rtmData.imgUrl)
    //const menuUrl = await imgToUrl(rtmData.menuUrl)

    const contextObj = {
      ...rtmData,
      createdAt: Date.now(),
      createrId: userObj.uid,

      status: true,
    };

    await dbService.collection("rtmstoredata").doc(userObj.uid).set(contextObj);

    alert(t("eventUploaded"));

    setRtmData({});
    setStoreData({});
    history.push("/login");
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setRtmData({
      ...rtmData, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const onToggleChange = (e) => {
    const { name } = e.target;
    setRtmData({
      ...rtmData,
      [name]: !rtmData[name],
    });
  };

  const onDeleteClick = async (event) => {
    event.preventDefault();

    const contextObj = {
      ...rtmData,
      status: false,
      createdAt: Date.now(),
      createrId: userObj.uid,
    };

    await dbService.collection("rtmstoredata").doc(userObj.uid).set(contextObj);

    alert(t("eventEnded"));
    history.push("/login");
  };

  //const onClearAttachmentClick = () => setRtmData({...rtmData, imgUrl:''})

  return (
    <RtmEventContainer>
      <h2>{t("previewTitle")}</h2>
      <div className="preview">
        <h3>{t("preview")}</h3>
        <h4>{t("previewMsg")}</h4>
        <StoreContext
          rtmData={rtmData}
          storeData={storeData}
          isSet={true}
          menuUrl={storeData.menuUrl}
          imgUrl={storeData.imgUrl}
        />
        {dataStatus.status && (
          <button className="rtmOff" onClick={onDeleteClick}>
            {t("eventEndBtn")}
          </button>
        )}
      </div>
      <RtmInputForm onSubmit={onSubmit}>
        <input
          name="realTime"
          value={rtmData.realTime}
          onChange={onChange}
          type="text"
          placeholder={t("discount")}
          maxLength={120}
          required
        />
        <div>
          <input
            name="startTime"
            value={rtmData.startTime}
            onChange={onChange}
            type="number"
            min="0"
            max="12"
            placeholder={t("startTime")}
            required
          />
          <button name="startAm" type="button" onClick={onToggleChange}>
            {rtmData.startAm ? "pm" : "am"}
          </button>
        </div>
        <div>
          <input
            name="endTime"
            value={rtmData.endTime}
            onChange={onChange}
            type="number"
            min="0"
            max="12"
            placeholder={t("endTime")}
            required
          />
          <button name="endAm" type="button" onClick={onToggleChange}>
            {rtmData.endAm ? "pm" : "am"}
          </button>
        </div>
        <button className="rtmOn" type="submit">
          {dataStatus.status ? t("evnetEdit") : t("eventOnBtn")}
        </button>
      </RtmInputForm>
    </RtmEventContainer>
  );
}

export default Info;
