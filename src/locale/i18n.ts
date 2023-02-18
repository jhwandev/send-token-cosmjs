import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationKo from "./lang.ko.json";
import TranslationEn from "./lang.en.json";

const resources = {
  en: {
    translations: TranslationEn,
  },
  ko: {
    translations: TranslationKo,
  },
};

i18next.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  defaultNS: "translations",
  ns: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
