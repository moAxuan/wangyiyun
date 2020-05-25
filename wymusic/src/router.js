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
import Zhuce from './views/login/Zhuce.vue'
import GC from './views/more/Gedangc.vue'
import Search from './views/more/Search.vue'
import SX from './views/more/SearchXianxi.vue'
import PH from './views/more/Paihang.vue'
import ZJ from './gedan/Zhuanji.vue'
import Ping from './views/more/Pinglun.vue'
import Xingdiegc from './views/more/Xindiegc.vue'
import Geci from './views/app_audio/Geci.vue'
import DayTui from './views/me/DayTui.vue'

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
          path: '/',
          name: 'find1',
          component: MainFind
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
    },
		{
			path: '/zhuce',
			name: 'zhuce',
			component: Zhuce,
		}, 
		{
			path: '/gc',
			name: 'gc',
			component: GC
		},
		{
			path: '/search',
			name: 'search',
			component: Search
		},
		{
			path: '/sx',
			name: 'sx',
			component: SX
    },
    {
      path: '/ph',
      name: 'ph',
      component: PH
    },
		{
		  path: '/zj',
		  name: 'zj',
		  component: ZJ
		},
		{
			path: '/ping',
			name: 'ping',
			component: Ping
		}, 
		{
			path: '/xindie',
			name: 'xindie',
			component: Xingdiegc
		},
		{
			path: '/geci',
			name: 'geci',
			component: Geci
    },
    {
      path: '/daytui',
			name: 'daytui',
			component: DayTui
    },

  ]
})