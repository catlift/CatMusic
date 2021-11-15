<!-- 播放器 -->
<template>
	<!-- $route.meta.bottom  搜索页的特殊样式,播放组件样式-->
	<div id="player" :style="{bottom: $route.meta.bottom}" v-show="!$route.meta.login && isPlayer" @click="openPlayer()" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend()">
		<!-- 唱片 -->
		<div class="playerDisc" :class="{rotate:isRotate,pause:isPaused}">
			<img v-lazy="this.picUrl" alt="">
		</div>
		<!-- 歌曲信息 -->
		<div class="playerSong">
			<p>{{this.songList.name}}</p>
			<ul class="author">
				<li v-for="(a,index) in this.songList.ar" :key="index">{{a.name}}</li>
			</ul>
		</div>
		<!-- 播放按钮 -->
		<div class="playerBotton" @click="condition()" @click.stop="">
			<div class="course">
				<i :class="num == stateMode?list[stateMode] : list[stateMode]"></i>
			</div>
		</div>
		<!-- 播放列表 -->
		<div class="playerChart" @click="openChart()" @click.stop="">
			<i class="iconfont iconliebiao"></i>
		</div>
	</div>
</template>

<script scoped>
	import Public from './playerPublic.js'
	
	export default{
		name: "player",
		data(){
			return {
				num: 0,	//用于播放按钮的变化比较
				state: 0,	//用于播放按钮的变化
				list: [		//存储播放按钮图标
					'iconfont iconbofang',
					'iconfont iconzantingtingzhi'
				],
				picUrl: '',	//存储音乐的封面图片
				isRotate: false,	//唱片是否旋转
				isPaused: false,	//唱片旋转是否添加暂停
				isPlayer: false,	//播放器是否显示
				startX: '',	//开始触摸
				moveX: '',	//滑动最后的位置
				apartX: '',	//滑动距离
			}
		},
		methods:{
			condition(){	//更改播放状态及播放图标
				this.$store.commit('stateMode',1);
				//console.log(this.stateMode);
				if(this.stateMode == 1){
					//调用song.vue的方法
					Public.$emit('songPlay');
				}else{
					//调用song.vue的方法
					Public.$emit('songPause');
				}
			},
			openChart(){
				//调用playerChart.vue的方法
				Public.$emit('demo');
			},
			openPlayer(){
				//调用playerSong.vue的方法
				Public.$emit('player');
			},
			playSong(){		//显示播放器
				this.isPlayer = true;
			},
			touchstart(event){
				this.startX = Math.floor(event.touches[0].pageX);
			},
			touchmove(event){
				this.moveX = Math.floor(event.touches[0].pageX);
			},
			touchend(){
				if(this.moveX != 0 && this.startX != 0){
					this.apartX = this.moveX - this.startX;
					if(this.apartX < -80){
						//console.log(this.apartX);
						//下一首
						for(var i = 0;i < this.songsList.length;i++){
							if(this.songList == this.songsList[i]){
								i += 1;
								if(i >= this.songsList.length){
									i = 0;
								}
								//更改vuex的state值
								this.$store.commit('songList',this.songsList[i]);
							}
						}
					}else if(this.apartX > 80){
						//console.log(this.apartX);
						//上一首
						for(var j = 0;j < this.songsList.length;j++){
							if(this.songList == this.songsList[j]){
								j -= 1;
								if(j < 0){
									j = this.songsList.length - 1;
								}
								//更改vuex的state值
								this.$store.commit('songList',this.songsList[j]);
							}
						}
					}
					this.startX = 0;
					this.moveX = 0;
					this.apartX = 0;
					this.$store.commit('stateActive',1);
				}
			}
		},
		mounted(){
			// 被调用的方法
			var that = this;
			Public.$off('play');
			Public.$on('play',function(){
				that.playSong();
			})
		},
		computed: {	//获取Vuex 的 store 属性值
			//存储单首音乐的所有属性
			songList (){
				return this.$store.state.songList;
			},
			songsList (){
				return this.$store.state.songsList;
			},
			stateMode(){
				return this.$store.state.stateMode;
			}
		},
		watch: {
			songList() {
				this.picUrl = this.songList.al.picUrl;
				this.isRotate = true;
				this.state = 1;
			},
			stateMode(){
				if(this.stateMode == 1){
					this.isRotate = true;
					this.isPaused = false;
				}else{
					this.isPaused = true;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#player{
		width: 100%;
		height: 3.75rem;
		background-color: #d44439;
		border-radius: 0.5rem 0.5rem 0 0;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		position: fixed;
		bottom: 2.6rem;
		z-index: 100;
		animation: one 0.6s linear;
		-webkit-animation: one 0.6s linear;
	}
	
	/* 唱片 */
	#player .playerDisc{
		width: 3rem;
		height: 3rem;
		border-radius: 100%;
		margin-left: 20px;
		background-image: linear-gradient(to bottom, #000, #d3d3d3, #000);
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	#player .playerDisc img{
		width: 80%;
		height: 80%;
		border-radius: 100%;
		background-color: #000000;
	}
	
	/* 歌曲信息 */
	#player .playerSong{
		flex: 1;
		padding-left: 10px;
		font-size: 14px;
		color: rgba(0,0,0,0.8);
		display: flex;
		display: -webkit-flex;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#player .playerSong p{
		max-width: 80%;
		font-size: 16px;
		font-weight: 600;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#player .playerSong .author{
		max-width: 60%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		color: #191919;
		opacity: 0.8;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#player .playerSong .author::before{
		content: "-";
		padding: 0 2px;
	}
	#player .playerSong .author li:nth-of-type(n+2)::before{
		content: "/";
	}
	
	/* 播放按钮 */
	#player .playerBotton{
		flex: 0 0 30px;
		padding: 0 4px;
	}
	#player .playerBotton .course{
		width: 1.9rem;
		height: 1.9rem;
		border: 2px solid #f7f7f7;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	/* 播放列表 */
	#player .playerChart{
		flex: 0 0 30px;
		padding: 0 4px;
	}
	#player .playerChart i{
		font-size: 3rem;
	}
	
	/* 唱片旋转 */
	#player .rotate{
		animation: rotate 30s linear infinite;
		-webkit-animation: rotate 30s linear infinite;;
	}
	#player .pause{
		animation-play-state: paused;
		-webkit-animation-play-state: paused;
	}
	@keyframes rotate{
		to{transform: rotate(360deg);}
	}
	@-webkit-keyframes rotate{
		to{transform: rotate(360deg);}
	}
	
	@keyframes one{
		from{transform: translateY(100%);}
		to{transform: translateY(0%);}
	}
	@-webkit-keyframes one{
		from{transform: translateY(100%);}
		to{transform: translateY(0%);}
	}
	
	/* 媒体查询 */
	@media (min-width: 720px) {
		#player{
			bottom: 0;
		}
	}
</style>
