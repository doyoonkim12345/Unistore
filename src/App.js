import React, { useEffect, useState } from "react";
import AdminRouter from "../src/components/AdminRouter";
import { authService } from "./fBase";
import { useTranslation } from "react-i18next";

export const logInfo = React.createContext();
export const langData = React.createContext();

export default function App() {
  const { t } = useTranslation();

  const [init, setInit] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const initStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
    //해당 이벤트 메소드로 계정 정보를 가져오는 것 까지 기달려야 함.
  }, []);
  return (
    <>
      {init ? (
        <logInfo.Provider value={{ isLoggedin, userObj }}>
          <langData.Provider value={"ko-KR"}>
            <AdminRouter />
          </langData.Provider>
        </logInfo.Provider>
      ) : (
        <h1 style={initStyle}>{t("loading")}</h1>
      )}
    </>
  );
}
