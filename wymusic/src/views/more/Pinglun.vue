<template>
	<div class="dayTuijian">
		<header>
		  <i class="iconfont icon-rili nav_tuijian " @click='back' ></i>
		  <p style="margin-left:20px;" v-if="type.info">评论({{type.info.commentCount}})</p>
			<p style="margin-left:20px;" v-else-if="type">评论({{type.commentCount}})</p>
		</header>
		<article @click='tiao'>
			<img :src="type.blurPicUrl || type.coverImgUrl || type.coverUrl" alt="" style="width:90px;">
			<div>
				<p style="">
					<span style="display: block;width:100%;max-height: 35px;overflow: hidden;" v-if='type.name'>{{type.name}}</span>
					<span style="display: block;width:100%;max-height: 35px;overflow: hidden;" v-else-if='type.title'>{{type.title}}</span>
					<span style="color: gray;font-size: 12px;" v-if="type.artist">{{type.artist.name}}</span>
					<span style="color: gray;font-size: 12px;" v-else-if="type.creator">{{type.creator.nickname}}</span>
					
				</p>
				<p style="font-size: 14px;color: gray;">&gt;</p>
			</div>
		</article>
		<hr style="width:100%;height:10px;background: #E9;border:none;margin:10px 0;">
		<section>
			<h6>最新评论</h6>
			<header v-for="(item, index) in ping" :key='index' v-if="item.user">
				<div style="display: flex; align-items: center; font-size: .7em;color: gray;">
					<img :src="item.user.avatarUrl" alt="" style="width:30px;height: 30px; border-radius: 50%;">
					<p style="margin-left:10px;">
						{{item.user.nickname}} <br>
						<span style="font-size: .7em;">{{item.time | time }}</span>
					</p>
				</div>
				<p style="width:80%;margin:10px auto;font-size: .9em;">
					{{item.content}}
				</p>
			</header>
			<p v-if="wushuju" style="color:gray;font-size:14px;text-align: center;">没有更多评论</p>
		</section>
	</div>
</template>

<script>
	export default{
		props: ['cb'],
		filters:{
			time(val) {
				let data = new Date(val)
				let year = data.getFullYear()
				let month = data.getMonth() + 1
				let day = data.getDate();
				let hours = data.getHours()
				let minutes = data.getMinutes()
				let seconds = data.getSeconds()
				return year+'-'+month+'-'+day+" "+hours+':'+minutes+":"+seconds
			}
		},
		data() {
			return {
				type: {},
				ping: [],
				index: 1,
				wushuju:false
			}
		},
		mounted() {
			this.fetch()
			this.fetch1()
			this.cb = false
		},
		methods: {
			async fetch() {
				let res = await this.$http.get(`comment/${this.$route.query.type}?id=${this.$route.query.id}&offset=${this.index * 20}`)
			
				let ping = res.data.comments
				this.ping = this.ping.concat(ping)
			},
			async fetch1() {
				let type = '';
				if(this.$route.query.type == 'album' ){
					type = await this.$http.get(`/${this.$route.query.type}?id=${this.$route.query.id}`)
					this.type = type.data.album
				}else if(this.$route.query.type == 'playlist' ) {
					type = await this.$http.get(`/${this.$route.query.type}/detail?id=${this.$route.query.id}`)
					this.type = type.data.playlist
				}else if(this.$route.query.type == 'video') {
					type = await this.$http.get(`/${this.$route.query.type}/detail?id=${this.$route.query.id}`)
					this.type = type.data.data
					console.log(type)
				}
			},
			back() {
				this.$router.go(-1)
			},
			tiao() {
				let type = '';
				if(this.$route.query.type == 'playlist'){
					type = 'detail'
				}else if(this.$route.query.type == 'album') {
					type = 'zj'
				}
				this.$router.push(`${type}?id=${this.$route.query.id}`)
			}
		},
		watch: {
			cb(newVal) {
				if(newVal == true) {
					this.index++
					this.fetch()
				}
			},
			ping(newVal, oldVal) {
				if(newVal.length == oldVal.length) {
					this.wushuju = true
				}else {
					this.wushuju = false
				}
			}
		}
	}
</script>

<style scoped type="text/css" lang="scss">
	.dayTuijian {
	  width:100%;
	  display: flex;
	  justify-content: space-between;
	  flex-wrap: wrap;
	  text-align: center;
	  margin:20px auto;
		>header {
			position:fixed;
			margin:0 5%;
			top:0;
			background:white;
			z-index:999;
			width:90%;
			display:flex;
			justify-content: flex-start;
			align-items:center;
			padding:10px;
		}
		article {
			width:90%;
			margin:0 auto;
			display: flex;
			align-items: center;
			justify-content:flex-start;
			margin-top: 22px;
			div {
				margin-left:10px;
				text-align: left;
				font-size: 13px;
				display: flex;
				justify-content: space-between;
				width:80%;
				align-items: center;
			}
		}
		section {
			margin:0 auto;
			width:90%;
			text-align: left;
			>header {
				width:100%;
				margin: 10px 0 20px 0;
				border-bottom: 1px solid #eee;
			}
		}
	}
</style>
