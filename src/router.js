import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import MainMe from './views/MainMe.vue'
import MainYun from './views/MainYun.vue'
import MainVoid from './views/MainVoid.vue'
import MainFind from './views/MainFind.vue'
import Xianxi from './gedan/Xianxi.vue'
import Login from './views/login/Index.vue'
import Password from './views/login/Login.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/me',
          name: 'me',
          component: MainMe
        },
        {
          path: '/find',
          name: 'find',
          component: MainFind
        },
        {
          path: '/yun',
          name: 'yun',
          component: MainYun
        },
        {
          path: '/void',
          name: 'void',
          component: MainVoid
        },
      ]
    },
    {
      path: '/detail',
      name: 'xiani',
      component: Xianxi,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/ps',
      name: 'ps',
      component: Password,
    }
  ]
})