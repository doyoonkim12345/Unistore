import React from "react";
import { TitleContainer } from "./styles/style";
import LangChanger from "./LangChanger";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <TitleContainer>
      <div>
        <h1>FineApple</h1>
        <h4>{t("subTitle")}</h4>
      </div>
      <LangChanger />
    </TitleContainer>
  );
}
