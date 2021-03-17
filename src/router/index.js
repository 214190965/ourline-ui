import Vue from 'vue'
import Router from 'vue-router'
//切记：没有用到的组件一定要注释掉,不然页面可能会出不来
import login from '@/components/login/index.vue'
import mainpage from '@/components/page/mainpage.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:login
    },
    {
      path:'/mainpage',
      name:'mainpage',
      component:mainpage
    }
    // {
    //   path:'/',
    //   redirect: '../components/login/index.vue'
    // },
    // {
    //   name:'mainpage',
    //   path:'/mainpage',
    //   component: () => import('../components/page/mainpage.vue'),
    //   meta: { title: 'ourline' },
    //   props: true
    // }
  ]
})
