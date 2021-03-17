import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { zh } from './zh'
import { en } from './en'

Vue.use(VueI18n);
const i18n = new VueI18n({
  // silentTranslationWarn: true,
  locale:
    localStorage.getItem('locale') || 'en', //语言标识,初始化必须指定，不然会有一堆的警告
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: zh,
    en: en
  }
});
export default i18n
