<template>
    <transition name="fade">
			<div class="liebiao" >
					<ul>
							<li class="li1">
							<div>
									<i class="iconfont icon-gedan  nav_tuijian "></i>
									<span @click='chooseType'>{{$store.state.bofang_type}}</span><span>({{$store.state.dai_musicList.length}})</span>
							</div>
							<div>
									<i class="iconfont icon-gedan  nav_tuijian "></i>
									<span style="margin-right:.5em;border-right:1px solid #eee;padding-right:.3em;">收藏全部</span>
									<i class="iconfont icon-gedan  nav_tuijian " style="margin-right:.3em;"></i>
							</div>
							</li>
					</ul>
					<div style="overflow-y:scroll;height:60vh;border-top-left-radius:20px;border-top-right-radius:20px;">
							<ul style="height:100%;">
							<li v-for="(item, index) in $store.state.dai_musicList" :key='index' >
									<div style="width:90%;display:flex;align-item:center;overflow:hidden;">
									<p style="font-size:1.1em;">{{item.name}}</p> 
									<sub style="color:gray;font-size:.8em;margin-left:.5em;" v-if="item.ar"> - {{item.ar[0].name}}</sub>
									<sub style="color:gray;font-size:.8em;margin-left:.5em;" v-if="item.artists"> - {{item.artists[0].name}}</sub>
									</div>
									<div>
									<i class="iconfont icon-gedan  nav_tuijian " style="margin-right:.3em;color:gray;" @click='remove(index)'>X</i>
									</div>
							</li>
							</ul>

					</div>
					
			</div>
    </transition>
    
</template>

<script>

export default {
    props: ['bofangType_index'],
    methods: {
        chooseType() {
            this.$emit('chooseType', this.bofangType_index)
        },
        remove(index) {
            this.$emit('remove', index)
        }
    }
}
</script>

<style scoped>
 .liebiao {
    position: fixed;
    top:41vh;
    z-index:9999;
    height:60vh;
    width:100vw;
    background: white;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    font-size: .8em;
  }
  .liebiao ul {
    width:100%;
  }
  .liebiao ul .li1 {
    position: fixed;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    background: white;
    top:40vh;
    width: 100vw;
    z-index: 999999;
    border-bottom: 1px solid #eee;
  }
  .liebiao div ul li:first-child {
    margin-top:3em;
  }
  .liebiao ul li {
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    line-height: 3em;
    align-items: center;
   
  }
.fade-enter-active, .fade-leave-active {
  transition: all .8s;
}
.fade-enter, .fade-leave-active {
  transform: translateY(60vh);
}
</style>
