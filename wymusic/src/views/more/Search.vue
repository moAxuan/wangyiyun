<template>
	<div>
		<header>
	   <i class="iconfont icon-rili" @click='back' ></i>
	   <input type="input" placeholder="请输入搜索内容" v-model="song">
		 <i class="iconfont icon-rili"  ></i>
		</header>
		<div class="hot">
			<h3>热门</h3>
			<ul>
				<li v-for="(item, index) in hot" :key='index' @click='$router.push(`/sx?sw=${item.searchWord}`)'>
					<span style="font-size: 1em;" :style="{color:index < 3 ? 'red' : ''}">{{++index}}</span>
					<div>
						<p>
							{{item.searchWord}}
							<img :src="item.iconUrl" alt="" v-if="item.iconUrl"> 
						</p>
						<span>{{item.content}}</span>
					</div>
					<span>{{item.score}}</span>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				song: '',
				hot: []
			}
		},
		mounted() {
			this.fetch();
		},
		methods: {
			async fetch() {
				let res = await this.$http.get('/search/hot/detail')
				this.hot = res.data.data
			},
			back() {
				this.$router.go(-1)
			},
		},
		watch: {
			song(newVal) {
				this.$router.push(`/sx?sw=${newVal}`)
			}
		}
	}
</script>

<style scoped type="text/css" lang="scss">
	header {
		position:fixed;
		top:0;
		background:white;
		z-index:999;
		width:100%;
		display:flex;
		justify-content: space-between;
		align-items:center;
		padding:10px;
		flex-grow: 0;
		flex-wrap: 0;
		
		i {
			font-size: 25px;
		}
		input {
			width:70%;
			padding:10px 0;
			outline: none;
			border:none;
			border-bottom: 1px solid black;
		}
	}
	.hot {
		margin:0 auto;
		width: 90%;
		height:100vh;
		padding-top: 60px;
		h3 {
			color: firebrick;
		}
		ul {
			width:100%;
			height: 100%;
			li {
				width:100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 16px;
				margin:15px 0;
				img {
					width:8%;
				}
				p {
					color: deeppink;
				}
				div {
					width: 70%;
					span {
						font-size: .8em;
					
					}
				}
				span {
					font-size: .6em;
					color: gray;
				}
			}
		}
	}
</style>
