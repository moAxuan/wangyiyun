<template>
  <div id="app" >
    <router-view :style="{opacity:($store.state.onliebiao ? 'rgba(0,0,0,.4)':'')}" @pusha='pusha' :cb='callBackTo' ></router-view>
    <audio ref="audio"  autoplay @timeupdate="updateTime"> </audio>
    <audio-control v-if='$store.state.dai_bo'   ></audio-control>
    <audio-liebiao v-if="$store.state.onliebiao" @chooseType='chooseType' @remove='remove'></audio-liebiao>
    <div :class="$store.state.onliebiao?'tie':''" @click='$store.commit("boo", !$store.state.onliebiao)'></div>
  </div>  
</template>

<script>

import audioControl from './views/app_audio/Audio';
import audioLiebiao from './views/app_audio/Liebiao';

export default {
  name: 'app',
  components: {
    audioControl,
    audioLiebiao,
  },
  data () {
    return {
      callBackTo:false,
      bofangType_index: 0,
    }
  },
  mounted() {
    document.body.onscroll=this.top;
    this.$refs.audio.addEventListener('ended', this.next);  
  },
  methods: {
    next() {
      this.$store.commit('lishiPush', this.$store.state.dai_musicList[this.$store.state.bofang_index])
      if(this.$store.state.bofang_type == '列表循环') {
        this.$store.commit('bofang_index', ++this.$store.state.bofang_index)
   
      }else if(this.$store.state.bofang_type == '单曲循环') {
        this.$store.commit('bofang_index', this.$store.state.bofang_index)
      }else {
        let random = Math.floor(Math.random() * this.$store.state.dai_musicList.length)
        this.$store.commit('bofang_index', random)
      }
      this.play()
    },
    pusha(item) {
      var cunzai = this.$store.state.dai_musicList.findIndex(item1 => item1 == item);
      if(cunzai != -1 && cunzai != 0) {
        this.$store.commit('pushA', {index:this.$store.state.bofang_index,number:0, item:this.$store.state.dai_musicList.splice(cunzai,1)[0]})
        //this.$store.state.dai_musicList.unshift(this.$store.state.dai_musicList.splice(cunzai,1)[0])
        return;
      }else if(cunzai == 0){
        this.$store.commit('unshiftA', this.$store.state.dai_musicList.splice(0,1)[0])
        //  this.$store.state.dai_musicList.unshift(this.$store.state.dai_musicList.splice(0,1)[0])
        return ;
      }
      this.$store.commit('unshiftA', item)
      //this.$store.state.dai_musicList.unshift(item);
      this.$store.commit('stopAndPlay',2)
    },
    chooseType() {
      this.bofangType_index++;
    },
    async play() {
      try{
        let id = this.$store.state.dai_musicList[this.$store.state.bofang_index].id
        let res = await this.$http.get(`/check/music?id=${id}`)
        this.$store.commit('boo1', true)
        if(res.data.message == 'ok') {
          let music_url = await this.$http.get(`/song/url?id=${id}`)
          this.$refs.audio.src=music_url.data.data[0].url

        } 
      }catch(e) {
        this.$store.commit('removeA',{index:-1,number : 1})
        //  this.$store.state.dai_musicList.shift()
        // alert('亲,没有版权,请自动点滚,谢谢!')
      }
    },
    remove(index) {
     this.$store.commit('stopAndPlay')
     // this.$store.state.dai_musicList.splice(index,1);
     this.$store.commit('removeA',{index, number:1})
    },
    updateTime(e) {
      this.$store.commit('updateGeciTime', e.target.currentTime);
		},
		getScrollHeight() {
  　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
		},
    getWindowHeight(){
  　　var windowHeight = 0;
  　　if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　}else{
  　　　　windowHeight = document.body.clientHeight;
  　　}
  　　return windowHeight;
		},
			//获取Y轴滚动
    getScrollTop(){
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;  
    },
    top() {
      if(Math.ceil(this.getScrollTop()) + this.getWindowHeight() >= this.getScrollHeight()){
      　this.callBackTo = true;
      }else {
        this.callBackTo = false;
      }
    },
		callbackto() {
			this.cb = false
		}
  },
  watch: {
    async '$store.state.dai_musicList'(newVal, oldVal) {
      try{
        let id = newVal[this.$store.state.bofang_index].id
				this.$store.commit('stopAndPlay', 2)
        let res = await this.$http.get(`/check/music?id=${id}`)
        this.$store.commit('boo1', true)
        if(res.data.message == 'ok') {
          let music_url = await this.$http.get(`/song/url?id=${id}`)
					if(music_url.data.data[0].url) {
						 this.$refs.audio.src=music_url.data.data[0].url
					}else {
						// 如果正在播放的列表为1 无法删除直接报错
						this.$store.commit('removeA',{index:0, number:1})
						console.log('获取不到音乐路径')
					}
        } 
      }catch(e) {
         newVal.shift()   
				 console.log(e.response)
      }
    },
		'$store.state.bofang_index'(newVal, oldVal) {
			this.play()
		},
    bofangType_index(newVal) {
      let type = ['列表循环', '单曲循环', '随机播放']
      if(newVal >= type.length) {
        newVal = 0
      }
      this.$store.commit('chooseType', type[newVal])
    },
    '$store.state.stop_play'(newVal) {
      if(newVal % 2 != 0){
        this.$refs.audio.pause()
      }else {
        this.$refs.audio.play()
      }
    },
		
	}
  
}
</script>

<style>
  * {
    margin: 0 ;
    padding:0;
    box-sizing: border-box;

  }
  li {
    list-style-type:none;
  }
  a {
    text-decoration: none;
  }

 
  .tie {
    position: fixed;
    left: 0;
    top: 0;
    width:100vw;
    height:100vh;
    background: rgba(0, 0, 0, .4);
    z-index:999;
  }
</style>
