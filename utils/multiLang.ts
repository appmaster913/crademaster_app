// /* eslint-disable import/no-named-as-default-member */
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import { getLocales } from 'expo-localization';

// import translationCN from "@/assets/lang/cn.json";
// import translationEN from "@/assets/lang/en.json";
// import translationRU from "@/assets/lang/ru.json";
// import translationKO from "@/assets/lang/kn.json";

// const languageDetector = {
//     type: 'languageDetector' as const,
//     async: true,
//     detect: (callback: (lng: string) => void) => {
//       return getLocales();
//     },
//     init: () => {},
//     cacheUserLanguage: () => {},
// };

// // the translations
// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   cn: {
//     translation: translationCN,
//   },
//   ru: {
//     translation: translationRU,
//   },
//   kn: {
//     translation: translationKO,
//   },
// };

// i18n
//   .use(languageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: "en",
//     keySeparator: false,
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;


import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import translationCN from "@/assets/lang/cn.json";
import translationEN from "@/assets/lang/en.json";
import translationRU from "@/assets/lang/ru.json";
import translationKO from "@/assets/lang/kn.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      cn: { translation: translationCN },
      ru: { translation: translationRU },
      kn: { translation: translationKO }
    },
    lng: Localization.getLocales()[0].languageCode ?? "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
