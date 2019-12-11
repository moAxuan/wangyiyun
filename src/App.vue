<template>
  <div id="app" >
    <router-view :style="{opacity:(onliebiao ? 'rgba(0,0,0,.4)':'')}" ></router-view>
    <audio ref="audio" style="position:fixed;top:0;z-index:99999;" autoplay> </audio>
    <audio-control v-if='dai_bo'  :onliebiao='onliebiao'  @offLie='onLie'></audio-control>
    <audio-liebiao v-show="onliebiao" @chooseType='chooseType' @remove='remove'></audio-liebiao>
    <div :class="onliebiao?'tie':''" @click='onliebiao = !onliebiao'></div>
  </div>
</template>

<script>

import audioControl from './views/app_audio/Audio';
import audioLiebiao from './views/app_audio/Liebiao';
export default {
  name: 'app',
  components: {
    audioControl,
    audioLiebiao
  },
  data () {
    return {
      dai_bo:false ,
      onliebiao:false,
      bofangType_index: 0,
    }
  },
  mounted() {
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
    chooseType() {
      this.bofangType_index++;
    },
    onLie(boolen) {
      this.onliebiao = boolen
    },
    async play() {
      try{
        let id = this.$store.state.dai_musicList[this.$store.state.bofang_index].id
        let res = await this.$http.get(`/check/music?id=${id}`)
        this.dai_bo = true
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
    }
  },
  watch: {
    async '$store.state.dai_musicList'(newVal, oldVal) {
      try{
        let id = newVal[this.$store.state.bofang_index].id
        let res = await this.$http.get(`/check/music?id=${id}`)
        this.dai_bo = true
        if(res.data.message == 'ok') {
          let music_url = await this.$http.get(`/song/url?id=${id}`)
          this.$refs.audio.src=music_url.data.data[0].url

        }
        
      }catch(e) {
         newVal.shift()        
      }
    },
    bofangType_index(newVal) {
      let type = ['列表循环', '单曲循环', '随机播放']
      if(newVal >= type.length) {
        newVal = 0
      }
      this.$store.commit('chooseType', type[newVal])
    },
    '$store.state.stop_play'(newVal) {
      console.log(newVal)
      if(newVal % 2 != 0){
        this.$refs.audio.pause()
      }else {
        this.$refs.audio.play()
      }
    }
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
  .audio {
    position:fixed;
    z-index:9999;
    bottom:0;
    width:100vw;
    height:2.8em;
    background: white;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
