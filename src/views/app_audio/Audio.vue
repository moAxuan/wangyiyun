<template v-if="$store.state.dai_musicList[$store.state.bofang_index]">
   <div class="audio" @click='router($store.state.dai_musicList[$store.state.bofang_index].id)'> 
      <div style="display:flex;" v-if="$store.state.dai_musicList[$store.state.bofang_index].al">
        <img  :src="$store.state.dai_musicList[$store.state.bofang_index].al.picUrl"  alt="" style="width:10vw; height:90%;border-radius:50%;margin:0px 10px;">
        <p style="font-size:13px;">
          {{$store.state.dai_musicList[$store.state.bofang_index].name}} <br /> 
          <sub style="color:gray;font-size:.8em;">{{$store.state.dai_musicList[$store.state.bofang_index].ar[$store.state.bofang_index].name}}</sub>
        </p>
      </div>
      <div>
        <i class="iconfont " style="font-size:1.5em;margin-right:.3em;" @click.stop='stop' :class='$store.state.stop_play % 2 == 0 ? "icon-zanting" : "icon-xinbaniconshangchuan-"'></i>
        <i class="iconfont icon-caidanzhankai " style="font-size:1.5em;margin-right:.1em;" @click.stop='offliebiao'></i>
      </div>
    </div>

</template>

<script>
export default {
    methods: {
        stop() {
          //this.$emit('stopAudio')   
          this.$store.commit('stopAndPlay');
        },
        offliebiao() {
            this.$store.commit('boo', true)
        },
				router(id) {
					this.$router.push(`geci?id=${id}`)
				}
    }
}
</script>

<style scoped>
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
</style>
