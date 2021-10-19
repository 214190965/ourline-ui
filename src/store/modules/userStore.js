/**
 * 用户状态管理
 * */
import KEYS from '../Keys'
import Util from '../../utils/util'

const state = {
  user: {
    username: '',
    usercode: '',
    isadmin: '',
  },
  token: '',
  owner: '',
  lang: '',
  sslflag: ''
}
const getters = {
  getUser: () => {
    state.user = Util.getSession(KEYS.user);
    return state.user;
  },
  getToken: () => {
    state.token = Util.getSession(KEYS.token);
    return state.token;
  },
  getOwner: () => {
    state.owner = Util.getSession(KEYS.owner);
    return state.owner;
  },
  getLang: () => {
    state.lang = Util.getSession(KEYS.lang);
    return state.lang;
  },
  getSslflag: () => {
    state.sslflag = Util.getSession(KEYS.sslflag);
    return state.sslflag;
  }
};
//因为vuex页面刷新时会失效，所以结合session做持久化
const mutations = {
  setUser: (state, cuser) => {
    state.user = cuser;
    Util.setSession(KEYS.user, cuser);
  },
  setToken: (state, token) => {
    state.token = token;
    Util.setSession(KEYS.token, token);
  },
  setOwner: (state, owner) => {
    state.owner = owner;
    Util.setSession(KEYS.owner, owner);
  },
  setLang: (state, lang) => {
    state.lang = lang;
    Util.setSession(KEYS.lang, lang);
  },
  setSslflag: (state, sslflag) => {
    state.sslflag = sslflag;
    Util.setSession(KEYS.sslflag, sslflag);
  }
};
const actions = {
  storeUser: (context, user) => context.commit('setUser', user),
  storeToken: (context, token) => context.commit('setToken', token),
  storeOwner: (context, owner) => context.commit('setOwner', owner),
  storeLang: (context, lang) => context.commit('setLang', lang),
  storeSslflag: (context, sslflag) => context.commit('setSslflag', sslflag)
};
//namespace:true,导出为文件同名
export default { namespaced: true, state, getters, mutations, actions }
