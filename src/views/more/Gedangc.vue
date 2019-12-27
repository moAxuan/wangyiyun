<template >
	<div class="dayTuijian" ref='container'>
	  <header style='position:fixed;top:0;margin:0 auto;background:white;z-index:999;width:90%;display:flex;justify-content: flex-start;align-items:center;padding:10px;'>
	     <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
	     <p style="margin-left:20px;">歌单广场</p>
	  </header>
	 
	  <div v-for='(item, index) in dayTui' :key='index' style='width:31%;margin-top:15px;' >
	    <router-link  :to="{path: '/detail', query : {id : item.id }}" style='position:relative;'>
	      <span style="position:absolute;right:.1em; font-size:.6em;color:white;top:0em;"><i class="iconfont icon-bofang" style="font-size:.8em;"></i>{{item.playCount = item.playCount / 10000 >= 0 ? Math.floor((item.playCount / 10000)) +'万' : item.playCount}}</span>
	       <img :src="item.coverImgUrl" alt=""  style="width:100%;">
	       <p style='-webkit-box-orient: vertical; color:gray; font-size:.7em; text-align:left;margin-top:3px;text-overflow：ellipsis;height:32px;overflow:hidden;display: -webkit-box;-webkit-line-clamp: 2;'>{{item.name}}</p>
	    </router-link>
	  </div>
	</div>
</template>

<script>
	
	export default {
		props: ['cb'],
		data() {
			return {
				dayTui: [],
				index: 1,
				
			}
		},
		mounted() {
			this.fetch();
			document.body.onscroll=this.top;
		},
		methods: {
			async fetch() {
				let res = await this.$http.get(`/top/playlist?limit=${this.index * 30}&order=new`)
				this.dayTui = res.data.playlists
			},
			back() {
				this.$router.go(-1)
				
			},
			
			
		},
		watch: {
			cb(newVal) {
				if(newVal == true) {
					this.index++
					this.fetch()
				}
			}
		}
	}
</script>

<style scoped>
	.dayTuijian {
	  width:90%;
	  display: flex;
	  justify-content: space-between;
	  flex-wrap: wrap;
	  text-align: center;
	  margin:20px auto;
	
	}
</style>
