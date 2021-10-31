import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fBase";
import { useTranslation } from "react-i18next";

function LogOut() {
  const { t } = useTranslation();

  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/login");
  };
  return (
    <button type="button" onClick={onLogOutClick}>
      {t("logout")}
    </button>
  );
}
export default LogOut;
