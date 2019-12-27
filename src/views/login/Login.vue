<template>
  <div style="margin:10px auto 0 auto;width:90%;">
    <header>
      <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
      <p style="margin-left:20px;">手机号登录</p>
    </header>
    <div style="border-bottom: 1px solid #eee;padding:10px;margin:30px auto;">
      <input type="password" v-model='password' id="" placeholder="请输入密码">
      <a href="">忘记密码?</a>
    </div>
    
    <button @click='login'>登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: ''
    }
  },
  mounted() {
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async login() {
     const res = await this.$http.get(`/login/cellphone?phone=${this.$route.query.phone}&password=${this.password}`)
     if(res.data.token) {
       let uid = res.data.account.id
       localStorage.setItem('uid', uid)
       document.cookie = 'MUSIC_U = '+ res.data.token
       this.$store.state.color='black';
       await this.$http.get('/login/refresh')
       this.$router.push('/me')
     }else {
       alert(res.data.msg)
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
  width:80%;
  border:none;
  outline: none;
  caret-color:red;
  
}
a {
  color: blue;
  font-size:.8em;
}
button {
  width: 100%;
  padding:10px 0;
  color: white;
  background:red;
  border:none;
  border-radius: 30px;
  outline: none;
}
</style>
