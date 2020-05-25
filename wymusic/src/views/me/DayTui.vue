<template>
  <div class="container">
    <header>
      <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
      <p style="margin-left:20px;">根据您的爱好推荐</p>
    </header>
		<h3>{{ '' | time}}</h3>
    <div class="liebiao" >
			<ul>
				 <li class="li1">
						<div>
							<div style="display: flex;align-items: center;">
								<i class="iconfont icon-xinbaniconshangchuan-  nav_tuijian "></i>
								<span @click='pushAll' style="font-size: 14px;">播放全部<span style='color:gray; font-size:.5em;'>(共{{tuiSong.length}}首)</span></span>
							</div>
						</div>
				 </li>
			</ul>
			<div style="overflow-y:scroll;height:100vh;border-top-left-radius:20px;border-top-right-radius:20px;">
				<ul style="height:100%;">
					<li  v-for='(item, index) in tuiSong' :key='index'  @click='pusha(item)' >
							<div style="width:90%;display:flex;align-item:center;overflow:hidden;">
                <img :src="item.album.picUrl" alt="" width='30' height='30' style="margin-right:10px;">
								<p style="font-size:1.1em;height:30px;overflow:hidden;max-width:60%;">{{item.name}}</p> 
								<sub style="color:gray;font-size:.8em;margin-left:.5em;height:30px;max-width:20%;overflow:hidden;" v-if="item.ar"> - {{item.ar[0].name}}</sub>
								<sub style="color:gray;font-size:.8em;margin-left:.5em;height:30px;max-width:20%;overflow:hidden;" v-if="item.artists"> - {{item.artists[0].name}}</sub>
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
  filters: {
    time() {
      let date = new Date();
      let month = date.getMonth() + 1
      let day = date.getDate()
      return month+'/'+day
    }
  },
  data() {
    return {
      tuiSong: []
    }
  },
  mounted() {
    this.login_to()
  },
  methods: {
    async login_to() {
      if(document.cookie.indexOf('MUSIC_U') == -1) {
        setTimeout(() => this.$router.push('/login'),2000)
      }else {
        let res = await this.$http.get('/recommend/songs');
        this.tuiSong = res.data.recommend
      }
    },
    back() {
      this.$router.go(-1)
    },
    pushAll() {
      this.$store.commit('stopAndPlay',2)
      this.$store.state.dai_musicList.length = 0;
      this.tuiSong.forEach(item => {
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
<style lang="scss"  type='text/css' scoped>

 .container {
   width:100%;
   height:100vh;
   background:pink;
   >header {
     width:100%;
     display: flex;
     align-items: center;
     color:white;
     padding-left:20px;
     i {
       font-size:30px;
     }
     p {
       font-size:.8em;
     }
   }
   >h3 {
     color: white;
     text-align: center;
     padding:20px
   }
   .liebiao {
    height:100vh;
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
    border-top-left-radius:20px;
    border-top-right-radius:20px;
    background: white;
    width: 100vw;
    border-bottom: 1px solid #eee;
  }

  .liebiao ul li {
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    line-height: 3em;
    align-items: center;
   
  }
 }
    
</style>