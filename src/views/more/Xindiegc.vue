<template >
	<div class="dayTuijian" ref='container'>
	  <header style='position:fixed;top:0;margin:0 auto;background:white;z-index:999;width:90%;display:flex;justify-content: flex-start;align-items:center;padding:10px;'>
	     <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
	     <p style="margin-left:20px;">新碟广场</p>
	  </header>
	 
	  <div v-for='(item, index) in dayTui' :key='index' style='width:45%;margin-top:15px;' >
	    <router-link  :to="{path: '/zj', query : {id : item.id }}" style='position:relative;'>
	       <img :src="item.blurPicUrl" alt=""  style="width:100%;">
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
				let res = await this.$http.get(`/top/album?limit=${this.index * 20}&order=new`)
				this.dayTui = res.data.albums
			},
			back() {
				this.$router.go(-1)

			},
			
			
		},
		watch: {
			cb(newVal, oldVal) {
				console.log(oldVal)
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
