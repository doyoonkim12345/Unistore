import React from "react";
import { useMemo } from "react";
import Select from "react-select";
import i18n, { userLanguage } from "../lang/i18n";

export default function LangChanger() {
  const options = useMemo(
    () => [
      { value: "ko-KR", label: "한국어" },
      { value: "en-US", label: "English" },
      { value: "zh-CN", label: "中文" },
    ],
    []
  );

  const onChange = (event) => {
    localStorage.setItem("lang", event.value);
    i18n.changeLanguage(event.value);
    console.log(userLanguage);
  };

  return (
    <Select
      onChange={onChange}
      options={options}
      defaultValue={options.find((x) => x.value === i18n.language)}
    />
  );
}
