<template>
	<div>
		<div class="container">
			<header  ref='header'>
				<div>
					<div class="left" style="width:80%;">
						<i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
						<p style='margin-left:1em;width:90%;overflow: hidden;
						text-overflow: ellipsis;white-space:nowrap;'>
							<span style='color:white; font-size:1em; '>{{title}}</span><br>
							<sub style='color:gray;float:left; font-size:12px;'>猜你喜欢</sub>
						</p>
					</div>
					<div class="right">
						<i class="iconfont icon-sousuo nav_tuijian " ></i>
						<i class="iconfont icon-caidan nav_tuijian " style='margin-left:1em;'></i>
					</div>
				</div>
			 
			</header>
			<div style="padding-top:5em;">
				<div  style="width:35vw;position:relative;">
					<span style="position:absolute;right:.3em;top:.2em; font-size:.6em;color:white;"><i class="iconfont icon-bofang" style="font-size:.8em;"></i>{{listHeader.playCount = listHeader.playCount / 10000 >= 0 ? Math.floor((listHeader.playCount / 10000)) +'万' : listHeader.playCount}}</span>
					<img :src="listHeader.coverImgUrl" alt="" style="width:100%;">
				</div>
				<div style="width:60vw;margin-left:5vw;">
					<h4 style="color:white; width:90%; overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						font-size:14px;
						-webkit-box-orient: vertical;">{{listHeader.name}}</h4>
					<p style="margin-top:1em;font-size:12px;" v-if="listHeader.creator" >
						<img :src="listHeader.creator.avatarUrl" alt="" width='30' height='30' style="border-radius:50%;vertical-align:middle;"> 
						<span style="color:gray;margin-left:.1em;">{{listHeader.creator.nickname}} &gt;</span>
					</p>
					<p style="margin-top:10px;color:gray; width:90%; overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					font-size:11px;
					-webkit-box-orient: vertical; float:left;" v-if="listHeader.description" v-html='$options.filters.zhuanyi(listHeader.description)'>
					</p>
					<span style="float:right;line-height:3em;">&gt;</span>
				</div>
			</div>
			<nav class="tui_nav">
				<li>
					<router-link to='/tuijian' class="a_nav">
						<!-- 分享 -->
						<i class="iconfont icon-fenxiang-1  nav_tuijian " ></i>
						<p >{{listHeader.shareCount}}</p>  
					</router-link>
				</li>
				<li>
					<router-link :to="{path: '/ping', query : {id : $route.query.id,type: 'playlist'}}" class="a_nav">
					<!-- 评论 -->
						<i class="iconfont icon-pinglun nav_tuijian " ></i>
						<p >{{listHeader.commentCount}}</p> 
					</router-link>
				</li>
				<li>
					<router-link to='/tuijian' class="a_nav">
						<i class="iconfont icon-xiazai  nav_tuijian " ></i>
						<p >下载</p> 
					</router-link>
				</li>
				<li>
					<router-link to='/tuijian' class="a_nav" >
						<i class="iconfont icon-duoxuankuang2 nav_tuijian " ></i>
						<p >多选</p> 
					</router-link>
				</li>
			</nav>
			<table style="background:white; width:100vw; border-top-left-radius:20px;border-top-right-radius:20px;margin-top:10px;">
				<tr >
					<td ><i class="iconfont icon-xinbaniconshangchuan-  nav_tuijian "></i></td>
					<td><p @click='pushAll'>播放全部<span style='color:gray; font-size:.5em;'>(共{{listHeader.trackCount}}首)</span></p>   </td>
					<td style="" colspan="2" >
						<p style="background:red;border-radius:20px;text-align:Center;color:white;padding:10px 0px;margin-right:5px;font-size:12px;">+ 收藏({{listHeader.subscribedCount =  listHeader.subscribedCount / 10000 >= 1 ? Math.floor(( listHeader.subscribedCount / 10000)) +'万' :  listHeader.subscribedCount}})</p>

					</td>
				</tr>
				<tr v-for='(item, index) in listBody' :key='item.id'  @click='pusha(item)'>
					<td style="color:gray;">{{index}}</td>
					<td style="font-size:14px;padding-bottom:10px;">
						<p>{{item.name}}</p>
						<p style="font-size:11px;color:gray;">{{item.ar[0].name}} - {{item.al.name}}</p>
					</td>
					<td style='width:3em; font-size:.5em;color:gray; text-align:right;'>
						<i class="iconfont icon-xinbaniconshangchuan-  nav_tuijian " v-if="item.mv != 0"></i>
					</td>
					<td style='width:3em; font-size:.5em;color:gray; text-align:right;'>
						<i class="iconfont icon-caidan  nav_tuijian " ></i>
					</td>
				</tr>
					
					
			</table>
		</div>
		<div class="background" :style="{background: `url(${listHeader.coverImgUrl}) 100% 100%`}"></div>
	</div>
  
</template>

<script>
export default {
  filters:{
    zhuanyi(value) {
  
      return value.replace(/\n/,'<br />')
    }
  },
  data() {
    return {
      listHeader: [],
      listBody: [],
      title: '歌单',
    }
  },
  mounted() {
    this.fetch();
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/playlist/detail?id=${this.$route.query.id}`);
      this.listHeader = res.data.playlist
      this.listBody = res.data.playlist.tracks
      
    },
    back() {
      this.$router.go(-1)
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop >= 80 && scrollTop < 230) {
				this.title = this.listHeader.name
				if(this.$refs.header) {
					 this.$refs.header.style.background = 'rgba(255,255,255,.1)';
				}
      }else if(scrollTop >= 230){
        this.title = this.listHeader.name
				if(this.$refs.header) {
					this.$refs.header.style.background = `url(${this.listHeader.coverImgUrl})`;
				}
      }else {
        this.title = '歌单'
				if(this.$refs.header) {
					this.$refs.header.style.background = 'none';
				}
      }
    },
    pushAll() {
      this.$store.commit('stopAndPlay')
      this.$store.state.dai_musicList.length = 0;
      this.listBody.forEach(item => {
        //this.$store.state.dai_musicList.push(item);
        this.$store.commit('pushAll', item)
      })
    },
    pusha(item) {
      this.$emit('pusha',item)
    }
  }
}
</script>

<style scoped>
.background {
	position: absolute;

	left: 0;
	top: 0;
	width:100%;
	height:100vh;
	z-index: -1;
	filter: blur(20px);
}
header {
  position:fixed;
  top: 0;
  
  left:0;
  width: 100vw;
  z-index:999;
}
header > div {
  display:flex;
  justify-content:space-between;
  width:90%;
  margin:0 auto;
}
.container > div {
  display:flex;
  justify-content:space-between;
  width:90%;
  margin:0 auto;
}
.left,.right {
  font-size:1em;
  display: flex;
  padding:10px 0px;
}
.iconfont {
  font-size:30px;
}
.tui_nav {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.tui_nav > li {
  text-align: center;
  margin:0 auto;
}
.a_nav {
  color: gray;
  font-size: 12px;
}
tr > td:first-child {
  width:10px;
  padding:10px;
  text-align: center;
}
tr > td:nth-child(2) {
  width:55%;
}
</style>

