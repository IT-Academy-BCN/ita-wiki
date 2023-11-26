import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { CAT } from './locales/cat'
import { EN } from './locales/en'
import { ES } from './locales/es'

// import esJSON from './locales/es.json'
// import catJSON from './locales/cat.json'
// import enJSON from './locales/en.json'

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lng') || 'cat',

  resources: {
    cat: {
      translation: CAT,
    },
    es: {
      translation: ES,
    },
    en: {
      translation: EN,
    },
  },
  // debug: true,

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
