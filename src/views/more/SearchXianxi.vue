<template>
	<div>
		<header>
		 <i class="iconfont icon-rili" @click='back' ></i>
		 <input type="input" placeholder="请输入搜索内容" v-model="song">
		 <i class="iconfont icon-rili"></i>
		</header>
		<div class="body">
			<ul>
				<li v-for="(item,index) in result" :key='index' @click='pusha(item)'> 
					<!-- <p><span style="display:inline-block;max-width:30px;text-overflow: ellipsis;oveflow:hidden;height:20px;border:1px solid;">{{item.name}}</span> <span style="font-size: .8em;color:gray;"> - {{item.artists[0].name}}</span></p>		  -->
					<p style="display:flex;flex-grap:1;align-items:center;">
						<span style="max-width:80%;height:20px;overflow:hidden;text-overflow: ellipsis;white-space:nowrap; ">{{item.name}}</span>
						<span style="font-size: .8em;color:gray;"> - {{item.artists[0].name}}</span>
					</p>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	export default {
		props:['cb'],
		filters: {
			pipei(val) {
				if(val == 'songs') {
					return '单曲'
				}else if(val == 'albums') {
					return '相册'
				}else if(val == 'mvs') {
					return 'mv'
				}
			}
		},
		data() {
			return {
				song: '',
				result: [],
				count:-1,
				offset: 1, 
			}
		},
		mounted() {
			this.fetch()
			document.body.onscroll=this.top
			this.song = this.$route.query.sw
		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			async fetch(keywords = this.$route.query.sw ) {
				let res = await this.$http.get(`/search?keywords=${keywords}&offset=${this.offset}`)
				this.result = this.result.concat(res.data.result.songs)
				this.count = res.data.result.songCount
			},
			pusha(item) {
				this.$emit('pusha',item)
			},
			
		},
		watch: {
			cb(newVal) {
				this.offset++;
				this.fetch()
			},
			song(newVal) {
				if(newVal != '') {
					this.result = []
					this.fetch(newVal)
				}
			
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
	.body {
		width: 90%;
		height: 100vh;
		margin:0 auto;
		padding-top: 60px;
		li {
			font-size: 14px;
			padding:10px 0;
		}
	}
</style>
