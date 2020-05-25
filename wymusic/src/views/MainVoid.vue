<template>
  <div class="container">
    <div>
      <div>
      <ul ref='ul1'>
        <li v-for="item in nav" :key='item.id' @click='choose(item.id)'>
          {{item.name}}
        </li>
      </ul>
    </div>
    <section >
      <article v-for="item in movie" :key="item.data.id" @click='router(item.data.urlInfo.id)'  >
        <video v-if="item.data.urlInfo" :src="item.data.urlInfo.url"  controls></video>
        <h4>{{item.data.title || item.data.name}}</h4>
        <div v-if="item.data.creator">
          <img :src="item.data.creator.backgroundUrl" alt="" >
          <p>{{item.data.creator.nickname}}</p>
          <span @click='routerP(item.data.urlInfo.id)'><i class="iconfont icon-pinglun nav_tuijian " ></i>{{item.data.shareCount}}</span>
        </div>
      </article>
    </section>
    </div>
    
  </div>
</template>

<script>
export default {
  props:['cb'],
  data() {
    return {
      movie:[],
      nav: [],
      id:-1,
    }
  },
  mounted() {
    this.fetch()
    this.voidLie()
  },
  methods: {
    async fetch(id = 1100) {
      this.id = id
      let res = await this.$http.get(`/video/group?id=${this.id}`)
      this.movie = this.movie.concat(res.data.datas)
    },
    async voidLie() {
      let res = await this.$http.get('/video/group/list')
      this.nav = res.data.data
    },
    router(id) {
      console.log(id)
    },
    routerP(Pid) {
      this.$router.push({path: '/ping', query : {id : Pid,type: 'video'}})
    },
   async choose(id) {
      this.id = id
      let res = await this.$http.get(`/video/group?id=${this.id}`)
      if(res.data.msg != '发现了更多新内容') {
        return console.log(res.data.msg);
      }
      this.movie = res.data.datas
    }
  },
  watch: {
    cb(newVal) {
      if(newVal) {
        this.fetch(this.id)
      }
    },
  }
  
}
</script>

<style lang="scss" scoped>
.container {
  width:100%;
  height:100vh;
  >div{

    >div {
      color:gray;
      width:90%;
      margin:0 auto;
      overflow-x: scroll;
      >ul {
        display: flex;
        width: 3200%;
        >li {
          margin:10px;
          flex-wrap: wrap;
          padding:3px 10px;
          border:1px solid gray;
          border-radius: 10px;
        }
      }
    }
    >section {
      width:90%;
      margin:10px auto;
      >article {
        background: azure;
        margin:10px 0 20px 0;
        > video {
          width: 100%;
          border-radius: 20px;
        }
        >h4 {
          width:100%;
          height:42px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        >div {
          display: flex;
          align-items: center;
          >img {
            width:30px;
            height:30px;
            border-radius: 50%;
          }
          >p {
            color: gray;
            margin-left: 10px;
            width:70%;
            height:30px;
            line-height: 30px;
          }
          >span {
            width: 20%;
            text-align: right;
            color: gray;
            font-size: .8em;
          }
        }
      }
    }
  }
}
</style>
