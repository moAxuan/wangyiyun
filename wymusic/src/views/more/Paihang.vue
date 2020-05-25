<template >
	<div class="dayTuijian" ref='container'>
	  <header style='position:fixed;margin:0 auto;top:0;background:white;z-index:999;width:90%;display:flex;justify-content: flex-start;align-items:center;padding:10px;'>
	     <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
	     <p style="margin-left:20px;">排行榜</p>
	  </header>

	  <div v-for='(item, index) in paihang' :key='index' style='width:31%;margin-top:15px;margin-left:5px;' >
	    <router-link  :to="{path: '/detail', query : {id : item.id }}" style='position:relative;'>
	      <span style="position:absolute;right:.1em; font-size:.6em;color:white;top:0;">{{item.updateFrequency}}</span>
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
				paihang: [],
			}
		},
		mounted() {
			this.fetch();
			document.body.onscroll=this.top;
			this.cb = false
		},
		methods: {
			async fetch() {
				let res = await this.$http.get(`/toplist`)
                this.paihang = res.data.list
                console.log(this.paihang)
			},
			back() {
				this.$router.go(-1)
				
			},
			
			
		},
	}
</script>

<style scoped>
	.dayTuijian {
	  width:90%;
	  display: flex;
	  margin:0px 10px;
      justify-content: flex-start;
	  flex-wrap: wrap;
	  text-align: center;
	  margin:20px auto;
	
	}
</style>
