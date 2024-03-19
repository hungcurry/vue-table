import { createI18n } from "vue-i18n";
import en from "./en.js";
import zh from "./zh.js";

const getDefalutLang = () => {
  if (navigator.language == 'en-US') {
    return 'en-US';
  } else {
    return 'zh-TW';
  }
}


const i18n = createI18n({
  legacy: false,
  locale: getDefalutLang(),
  fallbackLocale: "zh-TW",
  messages: {
    "en-US": en,
    "zh-TW": zh,
  }
});

export default i18n;