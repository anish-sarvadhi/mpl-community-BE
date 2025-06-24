import * as dotenv from 'dotenv';
import { I18n } from 'i18n';
// import path from 'path';
 
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
 
const i18nConfigurations = {
  locales: process.env.APP_LANGUAGES.split(','),
  directory: `${__dirname}/`,
  languageHeaderField: 'lan',
  defaultLocale: process.env.APP_LANGUAGES.split(',')[0],
  autoReload: true,
  updateFiles: false
};
const i18n = new I18n(i18nConfigurations);
 
export default i18n;