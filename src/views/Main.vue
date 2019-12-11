<template>
  <div class="container">
    <header class="header_nav" :style="{background:$store.state.color}">
      <div>
        <i class="iconfont icon-htmal5icon35 " style="font-size:20px;color:gray;"></i>
        <ul class="header_nav_li">
					<li :class="$store.state.choose == 'me' ? 'active1' : ''" @click='chooseA("me")'><router-link to='me' >我的</router-link></li>
          <li :class="$store.state.choose == 'find' ? 'active' : ''" @click='chooseA("find")'><router-link to='find' >发现</router-link></li>
          <li :class="$store.state.choose == 'yun' ? 'active' : ''" @click='chooseA("yun")'><router-link to='yun' >云村</router-link></li>
          <li :class="$store.state.choose == 'void' ? 'active' : ''" @click='chooseA("void")'><router-link to='void'>视频</router-link></li>
        </ul>
        <i class="iconfont icon-sousuo" style="font-size:20px;color:gray;"></i>
      </div>
      
    </header>
    <router-view style='padding-top:40px;' :color='$store.state.color'/>
  </div>
</template>

<script>
export default {

  methods: {
    chooseA(cVal) {
      this.$store.state.choose = cVal;
			if(cVal == 'me') {
				this.$store.state.color = 'black';
			}else {
				this.$store.state.color = 'white'
			}
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

