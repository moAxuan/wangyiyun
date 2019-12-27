<template>
  <div class="liebiao" >
    
    <div class="title" style="margin-top:10px;">
      <h4>最近播放</h4>
    </div>
    <div class="oldsong">
      <ul>
        <li v-for="(item,index) in oldsong" :key="index">
          <span>{{++index}}</span>
          <p>{{item.song.name}}</p>
        </li>
      </ul>
    </div>
    <div class="title" style="margin-top:10px;">
      <div class="usegedan">
        <h4 :class="usegedan == '创建' ? 'active' : ''" @click='usegedan="创建"'>创建歌单({{scgedan.filter(item => item.creator.userId == uid).length}})</h4>
        <h4 :class="usegedan == '收藏' ? 'active' : ''" @click='usegedan="收藏"'>收藏歌单({{scgedan.filter(item => item.creator.userId != uid).length}})</h4>
      </div>
      <div class="usegedan">
        <i>+</i>
        <i class="iconfont icon-caidan"></i>
      </div>
    </div>
    <div class="body" v-show="usegedan == '创建'">
      <div style="color:gray;padding:10px 0;text-align:Center;font-size:.8em;border:1px solid #eee;">
        + 导入外部歌单
      </div>
      <div class="gedanbody" style="margin-top:10px;">
        <ul class="gedan" ref='create'>
          <li v-for="(item,index) in scgedan" :key="index" v-if="item.creator.userId == uid" @click='tiao(item.id)' >
            <img :src="item.coverImgUrl" alt="">
            <div>
              <p>{{item.name}}</p>
              <span>{{item.trackCount}}首</span>
            </div>
          </li>
         
        </ul>
      </div>
    </div>
    <div class="body" v-show="usegedan == '收藏'">
      <div style="color:gray;padding:40px 0;text-align:Center;font-size:.8em;" v-if="scgedan.length <= 1">
        暂无收藏的歌单
      </div>
      <div class="gedanbody">
        <ul class="gedan" ref='like'>
          <li v-for="(item,index) in scgedan" :key="index" v-if="item.creator.userId != uid" @click="tiao(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <div>
              <p>{{item.name}}</p>
              <span>{{item.trackCount}}首</span>
            </div>
          </li>
         
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usegedan:'收藏',
      scgedan: [],
      uid:-1,
      oldsong:[]
    }
  },
  mounted() {
		this.fetch()
	},
	methods: {
		async fetch() {
      //let res = await this.$http.get(`/user/subcount`)获取数量
      this.uid = localStorage.getItem('uid')
      // 获取创建的歌单和收藏歌单
      let res = await this.$http.get(`user/playlist?uid=${this.uid}`)
      this.scgedan = res.data.playlist
      let oldSong = await this.$http.get(`/user/record?uid=${this.uid}`)
      this.oldsong = oldSong.data.weekData
      console.log(this.oldsong)

      this.$refs.create.style.width = this.scgedan.filter(item => item.creator.userId == this.uid ).length * 45 +'vw';
      this.$refs.like.style.width = this.scgedan.filter(item => item.creator.userId != this.uid ).length * 45 +'vw';
      // console.log(this.scgedan)
    },
    tiao(id) {
      this.$router.push(`/detail?id=${id}`);
    }
  },
}
</script>

<style scoped lang='scss' type="text/css">
.liebiao {
  width:100vw;
  height:70vh;
  background:white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 12px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items:center;
    width:90%;
    margin:0 auto;
    padding:10px 0;
    span {
      font-size: .8em;
      color: gray;
    }
    .usegedan {
      display: flex;
      justify-content: space-between;
      h4 {
        margin-right: 15px;
        font-size: 1em;
        color: gray;
        &.active {
          color: black;
        }
      }
      i {
        color: gray;
      }
    }
  }
  .oldsong {
    width:90%;
    height:35vh;
    margin:0 auto;
    overflow-y: scroll;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    li {
      display:flex;
      align-items: center;
      padding:10px 0 0 0;
    }
    p {
      margin-left: 10px;
      -webkit-box-orient: vertical; 
      color:gray; 
      font-size:.7em; 
      width:60%;
      text-align:left;
      margin-top:3px;
      text-overflow: ellipsis;
      height:20px;
      overflow:hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
    }
  }
  .body {
    margin:0 auto;
    overflow: hidden;
    overflow-x: scroll;
    width:90vw;
    .meMusic {
      width:155vw;
      display: flex;
      justify-content: space-between;
      flex-grow:0;
      flex-shrink:0;
      li {
        height:120px;
        width:30vw;
        background:pink;
        color: red;
        line-height: 120px;
        text-align:center;
        font-size:.8em;
        border-radius: 5px;
      }
    }
  }
  .gedanbody {
    margin:0 auto;
    margin:0 auto;
    overflow: hidden;
    overflow-x: scroll;
    width:90vw;
    .gedan {
      display: flex;
      width: 185vw;
      justify-content: flex-start;
      flex-grow:0;
      flex-shrink:0;
      li {
        height:50px;
        width:45vw;
        font-size:.7em;
        display: flex;
        align-items: center;
        img {
          width:30%;
          border-radius: 10px;
        }
        div {
          margin-left: 5px;
          span {
           font-size: .6em;
           color: gray;
          }
          p {
            font-size: 1.1em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; 
          }
        }  
      }
    }
  }
}
</style>
