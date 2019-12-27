<template>
  <div class="container">
    <header class="header_nav" :style="{background:$store.state.color}">
      <div>
        <i class="iconfont icon-htmal5icon35 " style="font-size:20px;color:gray;"></i>
        <ul class="header_nav_li">
					<li :class="$route.name == 'me' ? 'active1' : ''" ><router-link to='me' >我的</router-link></li>
          <li :class="$route.name == 'find' ? 'active' : ''" ><router-link to='find' >发现</router-link></li>
          <li :class="$route.name == 'yun' ? 'active' : ''" ><router-link to='yun' >云村</router-link></li>
          <li :class="$route.name == 'void' ? 'active' : ''" ><router-link to='void'>视频</router-link></li>
        </ul>
        <i class="iconfont icon-sousuo" style="font-size:20px;color:gray;" @click='$router.push("/search")'></i>
      </div>
    </header>
    <router-view style='padding-top:40px;' :color='$store.state.color' :cb='cb'/>
  </div>
</template>

<script>
export default {
  props:['cb'],
  mounted() {
    if(this.$route.name == 'me') {
       this.$store.state.color = 'black'
    }
  },
  watch: {
    '$route.name'(newVal) {
      if(newVal == 'me') {
        this.$store.state.color = 'black'
      }else {
        this.$store.state.color = 'white'
      }
    },
    cb(newVal) {
      this.cb = newVal
    }
  }

}
</script>

<style scoped>
.container {
  height:100vh;

}
.header_nav {
  display: flex;
  padding:10px 0px;
  font-size: 14px;
  position: fixed;
	top: 0;
	width:100%;
	z-index: 999;
}
.header_nav div {
  display: flex;
  width: 90%;
  margin:0 auto;
}
.header_nav  .header_nav_li {
  display: flex;
  width:60%;
  margin:0 auto;
}
.header_nav  .header_nav_li li {
  margin:0 auto;
}
.header_nav  .header_nav_li > li > a{
  color: gray;
}
.header_nav  .header_nav_li > li.active > a {
  color:  rgba(0,0,0,.7);
  font-size: 16px;
}
.header_nav  .header_nav_li > li.active1 > a {
  color:  white;
  font-size: 16px;
}
</style>

