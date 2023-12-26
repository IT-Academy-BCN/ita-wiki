import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import esJSON from './stories/locales/es.json'
import catJSON from './stories/locales/cat.json'
import enJSON from './stories/locales/en.json'

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lng') || 'cat',

  resources: {
    cat: {
      translation: catJSON,
    },
    es: {
      translation: esJSON,
    },
    en: {
      translation: enJSON,
    },
  },


  interpolation: {
    escapeValue: false,
  },
})

export default i18n
