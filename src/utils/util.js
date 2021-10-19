import Vue from 'vue'
/**
 * 工具类
 */
let util = {};

/**
 * javascript comment
 * @Desc: 配置vue实例
 */
util.initVM = function(vm) {
  this.vm = vm
};

util.setSession = function(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
};
/**
 * 根据key获取保存在sessionStorage中的值
 * @Date: 20210310 09:57:24
 * @Desc: session缓存
 */
util.getSession = function(key) {
  return JSON.parse(sessionStorage.getItem(key))
};


export default util
