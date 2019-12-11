<template>
    <div class="audio" > 
      <div style="display:flex;">
        <img :src="$store.state.dai_musicList[0].al.picUrl" alt="" style="width:10vw; height:90%;border-radius:50%;margin:0px 10px;">
        <p style="font-size:13px;">
          {{$store.state.dai_musicList[0].name}} <br /> 
          <sub style="color:gray;font-size:.8em;">{{$store.state.dai_musicList[0].ar[0].name}}</sub>
        </p>
      </div>
      <div>
        <i class="iconfont " style="font-size:1.5em;margin-right:.3em;" @click='stop' :class='$store.state.stop_play % 2 == 0 ? "icon-zanting" : "icon-xinbaniconshangchuan-"'></i>
        <i class="iconfont icon-caidanzhankai " style="font-size:1.5em;margin-right:.1em;" @click='offliebiao'></i>
      </div>
    </div>
</template>

<script>
export default {
    props:['index', 'onliebiao'],
    methods: {
        stop() {
          //this.$emit('stopAudio')   
          this.$store.commit('stopAndPlay');
        },
        offliebiao() {
          this.$emit('offLie', !this.onliebiao)
        }
    }
}
</script>

<style>

</style>
