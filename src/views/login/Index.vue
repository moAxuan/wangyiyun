<template>
  <div style="margin:10px auto 0 auto;width:90%;">
    <header>
      <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
      <p style="margin-left:20px;">手机号登录</p>
    </header>
    <p class="title">未注册手机号登录后将自动创建账号</p>
    <input type="text" v-model='phone' id="" placeholder="请输入手机号">
    <button @click='next'>下一步</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: ''
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async next() {
      if(localStorage.getItem('uid')) {
        alert('请先退出登录')   
      }
      if(this.phone.length != 11) {
        alert('请输入11位手机账号')
        return;
      }
      let res = await this.$http.get(`/cellphone/existence/check?phone=${this.phone}`)
      if(res.data.exist == -1) {
        // 账号未注册,跳转到注册页面
      
      }else if(res.data.exist == 1) {
        // 账号存在,跳转到密码页面
        this.$router.push({path:'/ps', query: {'phone': this.phone}})
      }
    }
  }
}
</script>

<style lang='scss' scoped type='text/css'>
header  { 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  i {
    font-size:25px;
  }
}
.title {
  font-size: .7em;
  color: gray;
  margin:20px 0;
}
input {
  width:100%;
  border:none;
  padding:10px;
  outline: none;
  caret-color:red;
  border-bottom: 1px solid #eee;
}
button {
  margin-top: 20px;
  width: 100%;
  padding:10px 0;
  color: white;
  background:red;
  border:none;
  outline: none;
  border-radius: 30px;
}
</style>
