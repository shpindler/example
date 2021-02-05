import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ru: {
        translation: {},
      },
    },
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

/* eslint-disable import/no-default-export */
export default i18n
