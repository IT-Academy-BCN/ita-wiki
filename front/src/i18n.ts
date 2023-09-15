import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import esJSON from './locales/es.json'
import catJSON from './locales/cat.json'
import enJSON from './locales/en.json'

i18n.use(initReactI18next).init({
  fallbackLng: localStorage.getItem('lng') || 'es',

  resources: {
    es: {
      translation: esJSON,
    },
    cat: {
      translation: catJSON,
    },
    en: {
      translation: enJSON,
    },
  },

  debug: true,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
