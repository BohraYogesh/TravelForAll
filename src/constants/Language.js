import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localization from 'react-native-localize'; // For device language detection
import en from './locales/en.json'; // English translations
import hi from './locales/hi.json'; // Spanish translations
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

// Set up the i18n configuration
getStoredLanguage().then(lng => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {en: {translation: en}, hi: {translation: hi}},
    lng, // Set stored or default language
    fallbackLng: 'en',
    interpolation: {escapeValue: false},
  });
});

export default i18n;
