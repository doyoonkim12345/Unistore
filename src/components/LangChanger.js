import React from "react";
import { useMemo } from "react";
import Select from "react-select";
import i18n from "../lang/i18n";
/*import { useContext } from "react";
import { langData } from "../App";*/

export default function LangChanger() {
  //const { lang } = useContext(langData);
  const options = useMemo(
    () => [
      { value: "ko-KR", label: "한국어" },
      { value: "en-US", label: "English" },
      { value: "zh-CN", label: "中文" },
    ],
    []
  );

  const onChange = (event) => {
    console.log(event.value);
    i18n.changeLanguage(event.value);
    //return <langData.Provider value={}></langData.Provider>;
  };

  return (
    <Select onChange={onChange} options={options} defaultValue={options[0]} />
  );
}
