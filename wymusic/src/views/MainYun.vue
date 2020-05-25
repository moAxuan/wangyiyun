<template>
  <div class="container">
    <div v-for='(item, index) in yun' :key='index' style='width:40%;margin-top:15px;' ref='pubu'>
	    <router-link  :to="{path: '/yun', query : {id : item.id }}" style='position:relative;'>
	       <img :src="item.simpleResourceInfo.songCoverUrl" alt=""  style="width:100%;">
	       <p style='-webkit-box-orient: vertical; color:gray; font-size:.7em; text-align:left;margin-top:3px;text-overflow：ellipsis;height:32px;overflow:hidden;display: -webkit-box;-webkit-line-clamp: 2;'>{{item.content}}</p>
         <footer>
          <img :src="item.simpleUserInfo.avatar" alt="" width='20' height='20' style="border-radius:50%;">
          <p>{{item.simpleUserInfo.nickname}}</p> 
          <span>{{item.likedCount}}</span>
         </footer>
      </router-link>
	  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yun: [],
      changeVal:null,
    }
  },
  mounted() {
    this.fetch()
    setTimeout(() => {
      //修改数据
      this.changValue = 1;
      //DOM还没更新
      this.$nextTick(() => {
      //DOM现在更新了
        this.fetch();
      });
    },0);
  },
 methods: {
   async fetch() {
     let res = await this.$http.get('/comment/hotwall/list')
     this.yun = res.data.data
   }
 },
 watch: {
  yun(newVal, oldVal) {
    
    let height = [0, 0]
    //let weizhi = this.index % 2
    if(this.$refs.pubu) {
      this.$refs.pubu.forEach((item,index) => {
        let weizhi = index % 2
        let left = weizhi * 55
        let top = (height[weizhi] += 20)
        if(weizhi == 0) {
          item.style.left = '5%'
        }else {
          item.style.left = left + '%'
        }
        if(index == 0 || index == 1) {
          item.style.top = '20px'
        }else {
          item.style.top = top + 'px'
        }
        height[weizhi] += item.clientHeight
      })
    }
    
  }
 }
}
</script>

<style lang="scss"  type='text/css' scoped>
  .container {
    width:100%;
    height:100vh;
    >div {
      position: absolute;
    }
    footer {
      display: flex;
      align-items: center;
      color: gray;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        margin-left: 5px;
        font-size: .8em;
        width:65%;
        height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span {
        font-size:.7em;
        width:40px;
        text-align: right;
      }
    }
  }
</style>
