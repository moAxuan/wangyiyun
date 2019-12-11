<template>
	<div class="container">
		<header>
			<div>
				<img src="https://p4.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg" alt="" >
				<span>登录立享手机电脑多端同步</span>
			</div>
			<button @click='login'>立即登录</button>
		</header>
		<footer>
			<nav class="tui_nav">
			  <li>
			     <router-link to='/tuijian' class="a_nav">
			      <i class="iconfont icon-gedan  nav_tuijian " ></i>
			      <p style="margin-top:5px;">歌单</p> 
			    </router-link>
			  </li>
			  <li>
			    <router-link to='/tuijian' class="a_nav">
			      <i class="iconfont icon-_huabanfuben  nav_tuijian " ></i>
			      <p style="margin-top:5px;">排行榜</p> 
			    </router-link>
			  </li>
			  <li>
			    <router-link to='/tuijian' class="a_nav">
			      <i class="iconfont icon-diantaizhibo  nav_tuijian " ></i>
			      <p style="margin-top:5px;">电台</p> 
			    </router-link>
			  </li>
			  <li>
			    <router-link to='/tuijian' class="a_nav" >
			      <i class="iconfont icon-zhibo-  nav_tuijian " ></i>
			      <p style="margin-top:5px;">直播</p> 
			    </router-link>
			  </li>
			</nav>
		</footer>
	</div>
</template>

<script>
	export default {
		methods: {
			login() {
				this.$router.push({path: '/login'})
			}
		}
	}
</script>

<style scoped lang="scss" type="text/css">
	.container {
		color:white;
		height:23vh;
		header {
			padding-top: 20px;
			display: flex;
			align-items:center;
			justify-content: space-between;
			width: 90%;
			font-size:.6em;
			margin:0 auto;
			div {
				display: flex;
				justify-content: space-between;
				align-items:center;
				img {
					width:48px;
					height: 48px;
					border-radius: 50%;
					margin-right: .6em;
				}		
			}
			button {
				font-size: .8em;
				padding:.5em .8em;
				color:white;
				background: none;
				border:1px solid gray;
				border-radius: 10px;
			}
		}
		footer {
			.tui_nav {
			  display: flex;
			  justify-content: space-between;
				li {
					text-align: center;
					margin:0 auto;
					.a_nav {
						color: white;
						font-size: .6em;
						.nav_tuijian {
							border-radius: 50%;
							color: white;
							font-size: 20px;
						}
					}
				}
				margin-top: 30px;
			}

		
		}
	
	}
</style>
