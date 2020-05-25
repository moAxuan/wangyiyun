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
				<div  style="width:35vw;">
					<img :src="listHeader.blurPicUrl" alt="" style="width:100%;">
				</div>
				<div style="width:60vw;margin-left:5vw;">
					<h4 style="color:white; width:90%; overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						font-size:14px;
						-webkit-box-orient: vertical;">{{listHeader.name}}</h4>
					<p style="margin-top:1em;font-size:12px;" v-if="listHeader.artist" >
						<span style="color:#EAFFEA;margin-left:.1em;">歌手: {{listHeader.artist.name}} &gt;</span>
					</p>
					<p style="margin-top:40px;color:#EAFFEA; width:90%; overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					font-size:11px;
					-webkit-box-orient: vertical; float:left;" v-if="listHeader.description" v-html='$options.filters.zhuanyi(listHeader.description)'>
					</p>
				</div>
			</div>
			<nav class="tui_nav">
				<li>
					<router-link to='/tuijian' class="a_nav">
						<!-- 分享 -->
						<i class="iconfont icon-fenxiang-1  nav_tuijian " ></i>
						<p v-if="listHeader.info">{{listHeader.info.shareCount}}</p>  
					</router-link>
				</li>
				<li>
					<router-link :to="{path: '/ping', query : {id : $route.query.id,type: 'album'}}" class="a_nav">
					<!-- 评论 -->
						<i class="iconfont icon-pinglun nav_tuijian " ></i>
						<p v-if="listHeader.info">{{listHeader.info.commentCount}}</p> 
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
		
		</div>
		<div class="background" :style="{background: `url(${listHeader.blurPicUrl}) 100% 100%`}"></div>
		<div class="liebiao" >
			<ul>
				 <li class="li1">
						<div>
							<div style="display: flex;align-items: center;">
								<i class="iconfont icon-xinbaniconshangchuan-  nav_tuijian "></i>
								<span @click='pushAll' style="font-size: 14px;">播放全部<span style='color:gray; font-size:.5em;'>(共{{listHeader.size}}首)</span></span>
							</div>
							<p style="background:red;border-radius: 20px;padding:0 20px;color:white;">+ 收藏({{listHeader.subscribedCount =  listHeader.subscribedCount / 10000 >= 1 ? Math.floor(( listHeader.subscribedCount / 10000)) +'万' :  listHeader.subscribedCount}})</p>
						</div>
				 </li>
			</ul>
			<div style="overflow-y:scroll;height:60vh;border-top-left-radius:20px;border-top-right-radius:20px;">
				<ul style="height:100%;">
					<li  v-for='(item, index) in listBody' :key='index'  @click='pusha(item)' >
							<div style="width:90%;display:flex;align-item:center;overflow:hidden;">
								<p style="font-size:1.1em;">{{item.name}}</p> 
								<sub style="color:gray;font-size:.8em;margin-left:.5em;" v-if="item.ar"> - {{item.ar[0].name}}</sub>
								<sub style="color:gray;font-size:.8em;margin-left:.5em;" v-if="item.artists"> - {{item.artists[0].name}}</sub>
							</div>
							<div>
								<i class="iconfont icon-gedan  nav_tuijian " style="margin-right:.3em;color:gray;" @click='pusha(item)'></i>
							</div>
					</li>
				</ul>
		
			</div>
		    
		</div>
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
      title: '专辑',
    }
  },
  mounted() {
    this.fetch();
    window.addEventListener('scroll', this.handleScroll);
		console.log(this.$route)
  },
  methods: {
    async fetch() {
      let res = await this.$http.get(`/album?id=${this.$route.query.id}`);
      this.listHeader = res.data.album
      this.listBody = res.data.songs
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
        this.title = '专辑'
				if(this.$refs.header) {
					this.$refs.header.style.background = 'none';
				}
      }
    },
    pushAll() {
      this.$store.commit('stopAndPlay',2)
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
  color: #eee;
  font-size: 12px;
}
.liebiao {
    position: fixed;
    top:44vh;
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
	.liebiao ul .li1>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		flex-grow: 0;
		flex-wrap: 0;
	}
  .liebiao ul .li1 {
    position: fixed;
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    background: white;
    top:44vh;
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
</style>

