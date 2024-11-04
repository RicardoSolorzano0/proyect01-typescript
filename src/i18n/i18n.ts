import i18n                     from 'i18next';
import detector                 from 'i18next-browser-languagedetector';
import { initReactI18next }     from 'react-i18next';
import { enLocales, esLocales } from '@/i18n/locales';


void i18n.use(initReactI18next).use(detector).init({
    defaultNS: 'common',
    fallbackLng: 'es',
    interpolation: {
        escapeValue: false
    },
    ns: ['common'],
    resources: {
        en: enLocales,
        es: esLocales
    }
});

export default i18n;