
<template>
  <div >
    <swiper :options="swiperOption" v-if='banner.length > 1'>
      <swiper-slide v-for='(item,index) in banner' :key='index' style='text-align:Center;'>
        <a :href='item.url != null ? item.url : "#/album?id="+item.targetId' style="position:relative;" >
          <img :src="item.imageUrl" alt=""  style="width:90%; height:150px;border-radius:10px;">
          <span style='position:absolute; right:0; bottom:.2em; padding:3px 5px;border-radius:5px;color:white;font-size:12px;' :style='{background:item.titleColor}'>{{item.typeTitle}}</span>
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <nav class="tui_nav">
      <li>
        <router-link to='/daytui' class="a_nav">
          <i class="iconfont icon-rili nav_tuijian " ></i>
          <p style="margin-top:15px;">每日推荐</p> 
        </router-link>
      </li>
      <li>
         <router-link to='/gc' class="a_nav">
          <i class="iconfont icon-gedan  nav_tuijian " ></i>
          <p style="margin-top:15px;">歌单</p> 
        </router-link>
      </li>
      <li>
        <router-link to='/ph' class="a_nav">
          <i class="iconfont icon-_huabanfuben  nav_tuijian " ></i>
          <p style="margin-top:15px;">排行榜</p> 
        </router-link>
      </li>
      <li>
        <router-link to='/tuijian' class="a_nav">
          <i class="iconfont icon-diantaizhibo  nav_tuijian " ></i>
          <p style="margin-top:15px;">电台</p> 
        </router-link>
      </li>
      <li>
        <router-link to='/tuijian' class="a_nav" >
          <i class="iconfont icon-zhibo-  nav_tuijian " ></i>
          <p style="margin-top:15px;">直播</p> 
        </router-link>
      </li>
    </nav>
    <div class="dayTuijian"> 
      <header style='width:100%;display:flex;justify-content: space-between;margin-top:10px;'>
         <h3 style="font-size:14px;">推荐歌单</h3>
         <router-link to='/gc' style='padding:5px;border-radius:10px;font-size:12px; border:1px solid #eee; color:gray;'>歌单广场</router-link>
      </header>
     
      <div v-for='(item, index) in dayTui' :key='index' style='width:31%;margin-top:15px;'  >
        <router-link  :to="{path: '/detail', query : {id : item.id }}" style='position:relative;'>
          <span style="position:absolute;right:.1em; font-size:.6em;color:white;"><i class="iconfont icon-bofang" style="font-size:.8em;"></i>{{item.playCount = item.playCount / 10000 >= 0 ? Math.floor((item.playCount / 10000)) +'万' : item.playCount}}</span>
           <img :src="item.picUrl" alt=""  style="width:100%;">
           <p style='color:gray; font-size:.7em; text-align:left;margin-top:3px;text-overflow：ellipsis;height:32px;overflow:hidden;'>{{item.name}}</p>
        </router-link>
      </div>
    </div>
    <div class="dayTuijian"> 
      <header style='width:100%;display:flex;justify-content: space-between;margin-top:10px;'>
         <h3 style="font-size:14px; display:flex;align-items:flex-end;">新碟  <h5 style='color:gray;margin-left:1em;'>新歌</h5></h3>
         <router-link to='/xindie' style='padding:5px;border-radius:10px;font-size:12px; border:1px solid #eee; color:gray;'>更多新碟</router-link>
      </header>
     
      <div v-for='(item, index) in newDie' :key='index' style='width:31%;margin-top:10px;'  >
        <router-link :to="{path: '/zj', query : {id : item.id }}"  style='position:relative;'>
           <img :src="item.picUrl" alt=""  style="width:100%;">
           <p style='color:rgba(0,0,0,.7); font-size:12px; text-align:left;margin-top:3px;text-overflow：ellipsis;height:30px;overflow:hidden;'>{{item.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [],
      // Lunbo
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
      },
      // 每日推荐
      dayTui: [],
      newDie: [],
    }
  },
  mounted() {
    this.getBanner()
  },
  methods: {
    async getBanner() {
      let res = await this.$http.get('/banner');
      this.banner = res.data.banners;
      let tui = await this.$http.get('/personalized?limit=6')
      this.dayTui = tui.data.result;
      let die = await this.$http.get('/top/album?limit=3')
      this.newDie = die.data.albums
			// console.log(die.data.albums)
    },

  },

}
</script>

<style scoped>
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
.nav_tuijian {
  padding:10px;
  border-radius: 50%;
  background:red;
  color: white;
  font-size: 17px;
}
.dayTuijian {
  width:90%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  border-top:1px solid #eee;
  margin:20px auto;

}
</style>

