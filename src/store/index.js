import Vue from 'vue'
import Vuex from 'vuex'
//组件名要与文件名保持一致，因为开启了namespace
import userStore from './modules/userStore'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { userStore }
});

export default store
