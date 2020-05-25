<template>
  <div style="margin:10px auto 0 auto;width:90%;">
    <header>
      <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
      <p style="margin-left:20px;">手机号验证</p>
    </header>
		<p class="total">验证码已发送至</p>
		<p class="title" >
			<span>{{  $route.query.phone | phone}}</span>
			<span>重新获取</span>
		</p>
    <div class="yanzhengma" ref='yanzhengma' >
			<input type="text" maxlength='1' v-model='arr[0]'  oninput = "value=value.replace(/[^\d]/g,'')" @input='next(1)'>
			<input type="text" maxlength='1' v-model='arr[1]'  oninput = "value=value.replace(/[^\d]/g,'')" @input='next(2)'>
			<input type="text" maxlength='1' v-model='arr[2]'  oninput = "value=value.replace(/[^\d]/g,'')" @input='next(3)'>
			<input type="text" maxlength='1' v-model='arr[3]'  oninput = "value=value.replace(/[^\d]/g,'')" >
    </div>
		<div v-show="!ps" class="zhuceps">
			<div >
			  <input type="password" v-model='password' id="" placeholder="请输入密码">
				<input type="text" v-model='name' id="" placeholder="请输入昵称">
			</div>
			
			<button @click='login_to'>登录</button>
		</div>
	</div>
</template>

<script>
export default {
	filters:{
		phone(val) {
			return val.slice(0,4)+'****'+val.slice(8,11)
		},
	},
  data() {
    return {
      password: '',
			name: '',
			arr:['','','',''],
			ps: false,
			val: '',
    }
  },
  mounted() {
		this.$refs.yanzhengma.children[0].focus()
		this.fetch()
  },
  methods: {
		async fetch() {
			try{
				let res = await this.$http.get(`/captcha/sent?phone=${this.$route.query.phone}`)
			}catch(err) {
				console.log(err.response.data.message)
			}
		},
    back() {
      this.$router.go(-1)
    },
    next(index) {
			this.$refs.yanzhengma.children[index].focus()
		},
		async login() {
			try{
				let res = await this.$http.get(`/captcha/verify?phone=${this.$route.query.phone}&captcha=${this.val}`)
				this.ps = true
			}catch(err) {
				console.log(err.response.data.message)
			}	
		},
		async login_to() {
			try {
				let res = await this.$http.get(`/register/cellphone?phone=${this.$route.query.phone}&password=${this.password}&captcha=${this.val}&nickname=${this.name}`)
			
			}catch(err) {
				console.log(err.response)
			}
		}
  },
	watch: {
		arr(newVal) {
			var index = 0;
			newVal.forEach(item => {	
				if(item != '') {
					index++
					this.val += item
				}
				if(index == 4) {
					this.login()
				}
			})
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
.total {
	margin-top: 20px;
	font-size: .9em;
}
.title {
  font-size: .7em;
  color: gray;
	display:flex;
	justify-content: space-between;
	align-items:center;
	margin-top:.5em;
}
.yanzhengma {
	display: flex;
	justify-content: space-between;
	margin-top:.5em;
	input {
		width:20vw;
		text-align: center;
		outline: none;
		border:none;
		border-bottom: 1px solid #eee;
		padding:.5em;
	}
}
.zhuceps {
	margin-top:30px;
	input {
		width:90%;
		border:0;	
		padding:10px;
		border-bottom: 1px solid #eee;
		outline:none;
		margin-top: 5px;
	}
	button {
		width: 100%;
		padding:10px 0;
		color: white;
		background:red;
		border:none;
		border-radius: 30px;
		outline: none;
		margin-top: 20px;
	}
}
</style>
