import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Backend отключен - используем прямые импорты из src/locales
// import Backend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import kk from '../../locales/kz/translation.json';
import ru from '../../locales/ru/translation.json';
import en from '../../locales/en/translation.json';

export const getLocale = () => i18n.language;

export const whitelist = ['ru', 'kk', 'en'];
export const resources = {
  ru: { translation: ru },
  kk: { translation: kk },
  en: { translation: en },
};

i18n
  // Backend отключен - все переводы загружаются напрямую из импортов
  // Это предотвращает перезапись ресурсов старыми файлами с сервера
  // .use(Backend)
  .use(new I18nextBrowserLanguageDetector(null, {
      lookupLocalStorage: 'locale',
      // Сначала читаем язык только из localStorage.
      // Если там ничего нет — всегда используем fallbackLng (ru),
      // чтобы по умолчанию сайт открывался на русском.
      order: ['localStorage'],
    })
  )
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    resources,
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackNS: 'translation',
    whitelist,
    fallbackLng: 'ru',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  })
  .catch(console.error);


export default i18n;
