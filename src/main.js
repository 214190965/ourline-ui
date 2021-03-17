// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './common/lang'
/** element-ui按需引入*/
/** element-ui 样式文件 */
import 'element-ui/lib/theme-chalk/index.css'
import lottie from 'vue-lottie'
import Store from './store'
import Ajax from './request/http'
import Api from './request/api'
import { InfiniteScroll,Input,Button,Tooltip,
        Tabs,TabPane,DatePicker,Cascader,Select,
        Option,Checkbox,Radio,Form,FormItem,Slider,Switch,Link} from 'element-ui'
Vue.config.productionTip = false;
/* eslint-disable no-new */
Vue.use(InfiniteScroll);
Vue.component(Input.name,Input);
Vue.component(Button.name,Button);
Vue.component(Tooltip.name,Tooltip);
Vue.component(Tabs.name,Tabs);
Vue.component(TabPane.name,TabPane);
Vue.component(DatePicker.name,DatePicker);
Vue.component(Cascader.name,Cascader);
Vue.component(Select.name,Select);
Vue.component(Option.name,Option);
Vue.component(Checkbox.name,Checkbox);
Vue.component(Radio.name,Radio);
Vue.component(Form.name,Form);
Vue.component(FormItem.name,FormItem);
Vue.component(Slider.name,Slider);
Vue.component(Switch.name,Switch);
Vue.component(Link.name,Link),
Vue.component('lottie',lottie);
Vue.config.debug = true;//开启错误提示

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// });
//加载配置文件
Ajax.loadSysCfg().then(()=>{
 Vue.prototype.$api = Api;
  let vm = new Vue({
    i18n, //vue i18n
    router: router,
    store: Store, //vuex store
    mounted: function() {},
    render: (h) => h(App)
  }).$mount('#app');
  Ajax.initVm(vm);
});
