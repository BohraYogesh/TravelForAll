import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import * as Localization from 'react-native-localize'; 
import en from './locales/en.json';
import hi from './locales/hi.json'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const getStoredLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem('appLanguage');
    return storedLang || 'en';
  } catch (error) {
    console.error('Error loading language', error);
    return 'en';
  }
};

getStoredLanguage().then(lng => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {en: {translation: en}, hi: {translation: hi}},
    lng,
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
  });
});

export default i18n;
