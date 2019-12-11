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

axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'

Vue.config.productionTip = false
Vue.prototype.$http = axios





const store = new Vuex.Store({
  state:{
    dai_musicList: [],
    lishi_musicList: [],
    stop_play: 1,
    bofang_type: '列表循环',
    bofang_index: 0,
    color:'white',
    choose: 'find',
    uid:-1,
  },
  mutations: {
    pushAll(state, item) {
      state.dai_musicList.push(item)
    },
    unshiftA(state, item) {
      state.dai_musicList.unshift(item)
    },
    lishiPush(state, item) {
      state.lishi_musicList.push(item)
    },
    removeA(state, obj) {
      state.dai_musicList.splice(obj.index,obj.number)
    },
    stopAndPlay(state) {
      state.stop_play += 1
    },
    bofang_index(state, index) {
      state.bofang_index = index
    },
    chooseType(state, val) {
      state.bofang_type = val
    },
    login(state, id) {
      state.uid = id
    }
  }
})

new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
