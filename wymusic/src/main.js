import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import Vuex from 'vuex'

Vue.use(Vuex)
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper /* { default global options } */)

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.xhrFields = { withCredentials: true }
Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("authorization");
    if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.cookies = `${token}`;
    }
    // if (config.url.indexOf(url) === -1) {
    //   config.url = url + config.url;/*拼接完整请求路径*/
    // }
    return config;
  },
  err => {
    return Promise.reject(err);
  })
Vue.prototype.$http = axios






const store = new Vuex.Store({
  state:{
    dai_musicList: [],
    lishi_musicList: [],
    stop_play: 2,
    dai_bo: false,
    onliebiao: false,
    bofang_type: '列表循环',
    bofang_index: 0,
    color:'white',
		geciTime:-1,
  },
  mutations: {
    pushAll(state, item) {
      state.dai_musicList.push(item)
    },
    unshiftA(state, item) {
      state.dai_musicList.unshift(item)
    },
		removeA(state, obj) {
      state.dai_musicList.splice(obj.index,obj.number)
    },
		pushA(state, obj) {
			state.dai_musicList.splice(obj.index,obj.number, obj.item)
		},
    lishiPush(state, item) {
      state.lishi_musicList.push(item)
    },
    boo(state,boolean) {
      state.onliebiao = boolean
    }, 
    boo1(state,boolean) {
      state.dai_bo = boolean
    }, 
    stopAndPlay(state,index) {
      if(index) {
        state.stop_play = index
      }else {
        state.stop_play++
      }
    },
    bofang_index(state, index) {
      state.bofang_index = index
    },
    chooseType(state, val) {
      state.bofang_type = val
    },
		updateGeciTime(state, time) {
			state.geciTime = time
		}
  }
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
