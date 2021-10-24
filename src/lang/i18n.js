import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import langEn from "./lang.en.json";
import langKo from "./lang.ko.json";
import langZh from "./lang.zh.json";

const resource = {
  "en-US": {
    translation: langEn,
  },
  "ko-KR": {
    translation: langKo,
  },
  "zh-CN": {
    translation: langZh,
  },
};

i18n.use(initReactI18next).init({
  resources: resource,
  lng: "ko-KR",
  fallbackLng: {
    "en-US": ["en-US"],
    default: ["ko-KR"],
    "zh-CN": ["zh=CN"],
  },
  debug: true,
  defaultNS: "translation",
  ns: "translation",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
