<template>
	<div v-if='$store.state.dai_musicList[$store.state.bofang_index]'  class="container">
		<div>
			<header style='margin:0 auto;width:90%;display:flex;justify-content: flex-start;align-items:center;padding:10px;color: white;'>
			   <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
			   <p style="margin-left:20px;">
					{{$store.state.dai_musicList[$store.state.bofang_index].name}} <br>
					<span style="color:gray;font-size:.8em;">{{$store.state.dai_musicList[$store.state.bofang_index].ar[0].name}}</span>
				</p>
			</header>
			<article>
				<ul :style="{marginTop: -index * 40  + 'px'}" >
					<li v-for="(item,i) in zhu_geci" :key='i' :style="{color:i == index ? 'white' : ''}">
						<p>{{item.ci}}</p>
					</li>
				</ul>
			</article>
			<footer>
				<i class="iconfont icon-zanting" @click='prev'></i>
				<i class="iconfont "  @click.stop='stop' :class='$store.state.stop_play % 2 == 0 ? "icon-zanting" : "icon-xinbaniconshangchuan-"'></i>
				<i class="iconfont icon-xinbaniconshangchuan-" @click='next'></i>
			</footer>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				geci:{},
				zhu_geci:[],
				song:[],
				index:0,
			}
		},
		mounted() {
			this.fetch()
		},
		methods: { 
			async fetch() {
				let id = this.$store.state.dai_musicList[this.$store.state.bofang_index].id
				let geci = await this.$http.get(`lyric?id=${id}`)
				this.geci = geci.data.lrc
				let geci1 = this.geci.lyric.split('\n')
				this.zhu_geci = []
				geci1.forEach(item => {
					if(item == ''){
						return
					}
					let time = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
					let ci = item.split(']')[1]
					let geciObj = {
						time,
						ci
					}
					this.zhu_geci.push(geciObj)
				})
				
			},
			back() {
				this.$router.go(-1)
			},
			stop() {
			  //this.$emit('stopAudio')   
			  this.$store.commit('stopAndPlay');
			},
			next() {
				this.$store.commit('stopAndPlay',2);
				if(this.$store.state.bofang_index == this.$store.state.dai_musicList.length - 1) {
					this.$store.commit('bofang_index',0)
				}else {
					this.$store.commit('bofang_index', ++this.$store.state.bofang_index)
				}
		
			},
			prev() {
				this.$store.commit('stopAndPlay',2);
				if(this.$store.state.bofang_index == 0) {
					this.$store.commit('bofang_index', (this.$store.state.dai_musicList.length - 1))
				}else {
					this.$store.commit('bofang_index', --this.$store.state.bofang_index)
				}
				
			}
		},
		watch: {
			'$store.state.geciTime'(newVal, oldVal) {
				let minutes = Math.floor(newVal / 60) % 60
				let seconds = newVal % 60
				seconds = seconds.toFixed(3)
				let geci = this.zhu_geci
				for(let i = 0; i < geci.length; i++){
					var m,s;
					if(geci[i].time) {
						m = geci[i].time.split(':')[0]
						s = geci[i].time.split(':')[1]
					}
					if(Number(minutes) == Number(m)) {
						if(parseInt(seconds) >parseInt(s)){
							this.index = i			
						}
					}	
				}
			},
			'$store.state.bofang_index'(newVal, oldVal) {
				this.fetch()
			}
		}
	}
</script>

<style scoped type="text/css" lang='scss'>
	.container {
		width:100vw;
		height:100vh;
		position: relative;
		z-index:99999;
		>div {
			width:100%;
			height:100%;
			background-image: linear-gradient(to bottom, #BD2C00 ,#708090, black);
			>article {
				width:100%;
				height:80vh;
				/* background:red; */
				text-align: center;
				color: gray;
				overflow:hidden;
				font-size: .8em;
				ul {
					
				}
				li {
					height: 40px;
				}
			}
			>footer {
				display: flex;
				width:100%;
				color: white;
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding:12px 0;
				>i {
					font-size: 35px;
				}
			}
		}
		
	}
</style>
