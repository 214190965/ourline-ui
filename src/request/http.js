import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from '../common/lang'
import Qs from 'qs'
import Constants from '../common/constants'
import { Promise } from 'es6-promise'

Vue.use(VueAxios,Axios);
//设置请求超时时间
// Vue.axios.defaults.baseURL = 'http://localhost:20194';
Axios.defaults.timeout = 300000;
//设置请求拦截
Axios.interceptors.request.use(
  (config) =>{
    if (Ajax.vm) {
      //每次请求前设置头
      config.headers.Authorization = Ajax.vm.$store.getters['userStore/getToken']
      config.headers.CurrentLanguage = Ajax.vm.$store.getters['userStore/getLang']
      config.headers.CurrentOwner = Ajax.vm.$store.getters['userStore/getOwner']
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);
//设置响应拦截
Axios.interceptors.response.use(
  (response)=>{
    let res =response.data instanceof Object ? response.data : JSON.parse(response.data);
    //处理加载配置文件请求
    if(res.isCfg && res.isCfg === '1'){
      return Promise.resolve(response);
    }else if(!res.retCode || res.retCode != '200'){
      let msg = res.retMsg === null ? i18n.t('error.unknow') : res.retMsg;
      return Promise.reject(msg);
    }
    return Promise.resolve(response.data);
    // if (response.data) {
    //   return Promise.resolve(response);
    // } else {
    //   return Promise.resolve({ data: {} });
    // }
  },
  (error) => {
    console.log(i18n.t('http.notfound_err'));
    let errMsg = '';
    let needPromise = false;
    if(error.response && error.response.status){
      switch (error.response.status) {
        case 401:
          errMsg =i18n.t('http.auth_err');
          needPromise = false;
          let path = '/login';
          let sslFlagStr = Ajax.vm.$store.getters['UserStore/getSslflag'];
          if(sslFlagStr && sslFlagStr.indexOf('system') > -1){
            path = '/loginssl?' + sslFlagStr;
          }
          Ajax.vm.$router.replace({path:path});break;
        case 404:
          errMsg = i18n.t('http.notfound_err');break;
        //服务不可用，或者zuul调度错误
        case 503:
          errMsg = error.response.data;break;
        // 其他错误，直接抛出错误提示
        default:
          errMsg = error.response.data;
      }
    }else {
      errMsg = i18n.t('http.net_err');
    }

    if(needPromise){
      return Promise.reject(error);
    }else{
      if(window.$timing){
        clearTimeout(window.delay);
      }
      window.$timing = true;
      window.$delay = setTimeout(function() {
        window.$timing = false;
        console.log(errMsg)
      }, 1000);
      return false;
    }
  }
);
const Ajax = {
  vm:null,
  initVm:function (vm) {
    this.vm = vm;
  },
  //加载配置文件,async让函数返回一个promise对象
  loadSysCfg:async function() {
    //await等待执行，只放在async修饰的函数中,get(url,params)
    await Vue.axios
      .get(Constants.sysCfgFileName)
      .then((result) => {
          //判断环境，设置默认baseURL,dev-开发环境（development） bliud-生产环境（production）
          Vue.axios.defaults.baseURL =
            process.env.NODE_ENV === 'production' ? result.data.url_pro : result.data.url_dev;
      }).catch((error)=>{
      console.log(i18n.t('http.cfg_err')+'\r\t\n');
    })
  },
  /**
   *@param  url String业务接口地址,不包含根路径
   *@param  data JSONObject请求参数
   *@param  type String业务请求方法,get、post等,可为空，默认post
   *@param  headers JSONObject请求头 可为空,默认 'Content-Type': 'application/x-www-form-urlencoded'
   */
  request: (url, data, type, headers) => {
    //默认为post,||
    type = type || 'post';
    //Object.assign对象的合并，
    let reqHeaders = headers || Object.assign(Constants.http_content_type.urlencoded,headers);
    let needQs = true;
    if(JSON.stringify(reqHeaders).indexOf('application/json') > -1){
      needQs = false;
    }
    //检测url格式
    let patt = new RegExp('^\\/.+');
    if(!url || !patt.test(url)){
      return Promise.reject(i18n.t('http.serverurl_err'));
    }else{
      if(type.toLowerCase() === 'get'){
        return Vue.axios
          .get(url,{params:data})
      }else if(type.toLowerCase() === 'post' || type.toLowerCase() === 'put'){
        return Vue.axios.request(
          {
            url:url,
            method:type.toLowerCase(),
            data:data,
            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest:[
              function (data) {
                return needQs ? Qs.stringify(data) : JSON.stringify(data);
              }
            ],
            headers:reqHeaders
          }
        )
      }else if(type.toLowerCase() === 'delete'){
        return Vue.axios.delete(
          url,
          {params,data}
        )
      }else{
        return Promise.reject(i18n.t('notsupport_err'));
      }
    }
  },
};

export default Ajax
