import React, { useState, useContext, useEffect } from "react";
import DaumPostCode from "react-daum-postcode";
import { dbService, storageService } from "../fBase";
import { logInfo } from "../App";
import LogOut from "../routes/Profile";
import { useHistory } from "react-router-dom";
import { InputForm, Preview } from "./storeStyle";
import { CgClose } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import StoreContext from "./StoreContext";

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

export default function StoreDataInput({
  setCheckFirstTime,
  discountOff = false,
}) {
  //props로 useState 함수를 가져오면 안됨 하지만 ... ㅋㄷ
  const { kakao } = window;
  const { userObj } = useContext(logInfo);

  const history = useHistory();

  const [isPoped, setIsPoped] = useState(false);

  const [downloadData, setDownloadData] = useState({});
  const [addressXY, setAddressXY] = useState([]);

  useEffect(
    () => {
      if (!discountOff) {
        setTimeout(async () => {
          //firestore에 유저의 uid로 내용이 있는 지확인
          const data = await dbService
            .collection("storedata")
            .doc(userObj.uid)
            .get();
          setDownloadData(data.data());
          getXY(data.data().isAddress);
        }, 0);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 나중에 x값과 y값을 받으려고 했으나 발생하는 매우 작은 시간 차이 때문에 업로드가 되고 후에 좌표값을 가져오는 현상을 찾게 되었다.
    // 이점 때문에 주소 검색한 후와 처음 주소를 가져온 경우에 좌표를 가져올 수 있도록 설정 했다.
    // 나중에 deps를 설정해서 하는 다른 방법이 있을 거 같으나 일단 빠른 개발을 위해 진행하고 코드리뷰 때 정정하도록 하겠다/.
    getXY(fullAddress);
    setDownloadData({
      ...downloadData,
      isAddress: fullAddress,
    });

    setIsPoped(false);
  };

  const onClick = () => {
    setIsPoped(true);
  };

  const onCloseClick = () => {
    setIsPoped(false);
  };

  const getXY = async (Address) => {
    let geocoder = new kakao.maps.services.Geocoder();

    await geocoder.addressSearch(Address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const xy = [result[0].x, result[0].y];
        setAddressXY(xy);
      }
    });
  };

  const onSubmit = async (event) => {
    if (!downloadData.ok) {
      alert(
        "아직 승인되지 않았습니다. 승인 후 정보가 사용자에게 표시됩니다. 승인완료 후 문자로 알림이 갑니다."
      );
    }
    event.preventDefault();
    if (downloadData.isAddress) {
      const contextObj = {
        ...downloadData,
        addressXY,
        id: userObj.uid,
        createdAt: Date.now(),
        discount: discountOff ? "" : downloadData.discount,
      };
      if (!(downloadData === contextObj)) {
        await dbService
          .collection("storedata")
          .doc(userObj.uid)
          .set(contextObj);
      }

      if (discountOff) {
        setCheckFirstTime(false);
      } else {
        history.push("/login");
      }
    } else {
      alert("주소를 입력해주세요");
    }
  };

  const onClickChange = (event) => {
    const { name, value } = event.target;
    setDownloadData({
      ...downloadData,
      [name]: value,
    });
  };

  const onFileChange = (event) => {
    const {
      target: { files, name },
    } = event;
    try {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = async (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;

        //const Url =
        setDownloadData({
          ...downloadData,
          [name]: await imgToUrl(result),
        });
      };
      reader.readAsDataURL(theFile);
    } catch (e) {}
  };

  const imgToUrl = async (img) => {
    let imgUrl = "";
    if (img !== "") {
      try {
        const attachmentRef = storageService
          .ref()
          .child(`${userObj.uid}/${uuidv4()}`); //각각의 게시물에 첨부되어 있는이미지를 가져옴
        const response = await attachmentRef.putString(img, "data_url");
        imgUrl = await response.ref.getDownloadURL();
      } catch (error) {
        imgUrl = img;
      }
    }
    return imgUrl;
  };

  const onRejectSubmit = (event) => {
    event.preventDefault();
    alert("메인이미지와 메뉴이미지를 넣어주세요!");
  };

  return (
    <>
      <Preview>
        <h2>가게 정보를 알려주세요</h2>
        <h4>사용자들에게 표시되는 정보입니다</h4>
        {!discountOff && (
          <div className="preview">
            <h3>미리보기</h3>
            <h4>아래와 같이 보여집니다</h4>
            <StoreContext
              storeData={downloadData}
              xy={addressXY}
              rtmData={{}}
              isSet={true}
            />
          </div>
        )}
      </Preview>
      <InputForm
        onSubmit={
          downloadData.imgUrl === defaultRtmData.imgUrl ||
          downloadData.menuUrl === defaultRtmData.menuUrl
            ? onRejectSubmit
            : onSubmit
        }
      >
        <input
          name="storeKind"
          value={downloadData.storeKind}
          onChange={onClickChange}
          type="text"
          placeholder="가게 종류(ex 한식, 중식 ..)"
          required
        />
        <input
          name="name"
          value={downloadData.name}
          onChange={onClickChange}
          type="text"
          placeholder="가게이름"
          required
        />
        <input
          name="phone"
          value={downloadData.phone}
          onChange={onClickChange}
          type="tel"
          placeholder="가게 전화번호"
          required
        />
        {!discountOff && (
          <input
            name="discount"
            value={downloadData.discount}
            onChange={onClickChange}
            type="text"
            placeholder="학생대상 할인 정보를 입력해주세요!"
            required
          />
        )}
        {isPoped ? (
          <div className="postcode">
            <button onClick={onCloseClick}>
              <CgClose size={30} />
            </button>
            <DaumPostCode onComplete={onComplete} />
          </div>
        ) : (
          <button onClick={onClick}>
            {downloadData.isAddress ? downloadData.isAddress : "가게주소찾기"}
          </button>
        )}
        <button type="button">
          <label for="imgUrl">
            {downloadData.imgUrl ? "업로드 완료" : "메인이미지"}
          </label>
        </button>
        <button type="button">
          <label for="menuUrl">
            {downloadData.menuUrl ? "업로드 완료" : "메뉴이미지"}
          </label>
        </button>
        <button type="submit" required>
          확인
        </button>
        <input
          style={{ display: "none" }}
          id="imgUrl"
          name="imgUrl"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        ></input>
        <input
          style={{ display: "none" }}
          id="menuUrl"
          name="menuUrl"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        ></input>
        {!discountOff && <LogOut />}
      </InputForm>
    </>
  );
}
