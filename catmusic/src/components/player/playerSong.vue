<!-- 播放界面,歌名,歌词进度条... -->
<template>
	<div id="playerSong" v-show="player" :class="{none: isSongH,block: isSongV}" v-lazy:backgroundImage = "picUrl" @touchmove.prevent @mousewheel.prevent>
		<!-- 头部，隐藏卡片、歌曲信息 -->
		<div class="header">
			<i class="iconfont iconxiajiantou" @click="noneSongChart()"></i>
			<ul class="song">
				<li class="songName"><h3>{{this.songList.name}}</h3></li>
				<li>
					<ul class="author">
						<li v-for="(a,index) in this.songList.ar" :key="index">{{a.name}}</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 内容 歌曲的背景、歌词 -->
		<div class="content" @click="lyric()">
			<div class="bg" v-show="!isLyric" :class="{rotate:isRotate,pause:isPaused}">
				<img v-lazy="picUrl" alt="">
			</div>
			<div class="lyric" v-show="isLyric" @touchmove.stop="" @mousewheel.stop="">
				<ul ref="lyricUL">
					<li v-for="(item,index) in this.songlyric" :key="item.uid" :accesskey="index" :style="{color: lyricIndex === index ? 'skyblue' : '#fff'}" :data-index='index' ref="lyric">{{item.lyric}}</li>
				</ul>
			</div>
		</div>
		<!-- 底部 控制器 -->
		<div class="footer">
			<div class="progress">
				<div class="proBox">
					<div class="proBoxC" ref="proBoxC"></div><!-- 进度 -->
					<div class="proChild" ref="proChild"></div>
				</div>
			</div>
			<div class="controls">
				<ul>
					<li class="mode" @click="chartMethod()">
						<i :class="listIcon[num == mode?mode:mode].iconName"></i>
					</li>
					<li class="last" @click="lastSong()"><i class="iconfont iconshangyishou"></i></li>
					<li class="pause" @click="condition()">
						<i :class="num == stateMode?list[stateMode] : list[stateMode]"></i>
					</li>
					<li class="next" @click="nextSong()"><i class="iconfont iconxiayishou"></i></li>
					<li class="playChart" @click="openChart()"><i class="iconfont iconliebiao"></i></li>
				</ul>
			</div>
		</div>
		
		<Audio></Audio>
	</div>
</template>

<script>
	import Public from '../player/playerPublic.js'
	import Audio from '../decorate/songAudio.vue';
	
	export default{
		name: 'playerSong',
		data() {
			return {
				num: 0,	//用于播放按钮的变化比较
				player: false,//该页面是否显示
				isSongH: false,//是否添加样式名称，H隐藏
				isSongV: false,//是否提交样式名称，V显示
				isLyric: false,//控制是否显示歌词
				isRotate: true,	//唱片是否旋转
				isPaused: false,	//唱片旋转是否添加暂停
				songlyric: [],//存储歌词
				audio: '',//存储音乐地址
				picUrl: '',//存储音乐背景图片
				lyricIndex: '',//存储当前轮到的歌词
				list: [		//存储播放按钮图标
					'iconfont iconbofang',
					'iconfont iconzantingtingzhi'
				],
				listIcon: [
					{iconName: 'iconfont iconshunxubofang1',text: '列表循环'},
					{iconName: 'iconfont iconbofangye-caozuolan-suijibofang1',text: '随机播放'},
					{iconName: 'iconfont icondanquxunhuan',text: '单曲循环'}
				]
			}
		},
		components:{
			Audio
		},
		methods: {
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
			chartMethod(){	//list的切换方法
				//更改vuex的state值
				this.$store.commit('mode',1);
				switch(this.mode){
					case 2:
						Public.$emit('loopSong');
						break;
					default:
						if(this.songsList.length != 1){
							Public.$emit('noLoop');
						}
						break;
				}
			},
			noneSongChart(){//隐藏卡片，添加隐藏样式
				// this.player = false;
				this.isSongH = true;
				this.isSongV = false;
			},
			openSongChart(){//显示卡片，添加显示样式
				this.player = true;
				this.isSongV = true;
				this.isSongH = false;
			},
			formatLyricTime (time) { // 格式化歌词的时间 转换成 sss:ms
				const regMin = /.*:/
				const regSec = /:.*\./
				const regMs = /\./
				const min = parseInt(time.match(regMin)[0].slice(0, 2))
				let sec = parseInt(time.match(regSec)[0].slice(1, 3))
				const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
				if (min !== 0) {
					sec += min * 60
				}
				return Number(sec + '.' + ms)
			},
			playerSong(){//链接api，获取信息
				this.songlyric = [];
				this.$axios.get('/lyric?id=' + this.songList.id)
				.then(res => {
					var list,lineArr = [];
					list = res.data.lrc.lyric;
					lineArr = list.split("\n");	//分行
					const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;//利用正则表达式分离
					lineArr.forEach(item => {
						if (item === '') return
						const obj = {}
						const time = item.match(regTime)
						obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim();
						obj.time = time ? this.formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0;
						obj.uid = Math.random().toString().slice(-6);
						if (obj.lyric === '') {
							console.log('这一行没有歌词')
						} else {
							this.songlyric.push(obj)
						}
					})
				}).catch(err => {
					console.log(err);
				})
			},
			lyric(){
				if(!this.isLyric && this.songlyric != ''){
					//显示歌词
					this.isLyric = true;
				}else{
					//显示歌曲封面
					this.isLyric = false;
				}
			},
			nextSong(){
				//下一首
				switch(this.mode){
					case 0:
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
						break;
					case 1:
						this.$store.commit('songList',this.songsList[Math.floor(Math.random() * this.songsList.length)]);
						break;
				}
				this.$store.commit('stateActive',1);
			},
			lastSong(){
				//上一首
				for(var i = 0;i < this.songsList.length;i++){
					if(this.songList == this.songsList[i]){
						i -= 1;
						if(i < 0){
							i = this.songsList.length - 1;
						}
						//更改vuex的state值
						this.$store.commit('songList',this.songsList[i]);
					}
				}
				this.$store.commit('stateActive',1);
			}
		},
		mounted() {
			//让searchDetail调用
			var that = this;
			Public.$off('player');
			Public.$on('player',function(){
				that.openSongChart();
			})
		},
		computed: {	//获取Vuex 的 store 属性值
			//存储单首音乐的所有属性
			songList(){
				return this.$store.state.songList;
			},
			songsList(){
				return this.$store.state.songsList;
			},
			mode(){
				return this.$store.state.mode;
			},
			stateMode(){
				return this.$store.state.stateMode;
			},
			currentTime(){
				return this.$store.state.currentTime;
			}
		},
		watch: {
			songList() {
				this.picUrl = this.songList.al.picUrl;
				//console.log(this.songList);
				this.playerSong();
			},
			stateMode(){
				if(this.stateMode == 1){
					this.isRotate = true;
					this.isPaused = false;
				}else{
					this.isPaused = true;
				}
			},
			currentTime(){
				// 匹配歌词
				for (let i = 0; i < this.songlyric.length; i++) {
					if (this.currentTime > (parseInt(this.songlyric[i].time))) {
						const index = this.$refs.lyric[i].dataset.index
						if (i === parseInt(index)) {
							this.lyricIndex = i;
							//padding共20px,本身高度20，即40px
							this.$refs.lyricUL.style.transform = 'translateY(' + (170-(40*(i+1))) +'px)'
						}
					}
				}
				//console.log(Math.round(Math.floor(this.currentTime*1000)/this.songList.dt * 100));
				this.$refs.proChild.style.left = Math.round(Math.floor(this.currentTime*1000)/this.songList.dt * 100) + '%';
				//console.log(this.$refs.proBox);
				this.$refs.proBoxC.style.width = Math.round(Math.floor(this.currentTime*1000)/this.songList.dt * 100) + '%';
			}
		}
	}
</script>

<style scoped="scoped">
	#playerSong{
		width: 100%;
		height: 100%;
		z-index: 300;
		background-color: rgba(0,0,0,1);
		position: fixed;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
		/* background-size: 100%; */
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		animation: one 0.3s linear;
		-webkit-animation: one 0.3s linear;
	}
	/* 隐藏卡片的样式 */
	#playerSong.none{
		visibility: hidden;
		transform: translateY(30%);
		transition: all .4s;
		top: 100%;
	}
	/* 显示卡片的样式 */
	#playerSong.block{
		visibility: visible;
		transform: translate(0%);
		transition: all .4s;
		top: 0;
	}
	/* 头部 */
	#playerSong .header{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		padding: 10px;
		color: #f7f7f7;
	}
	#playerSong .header i{
		font-size: 2rem;
		padding-left: 20px;
	}
	/* 头部歌曲信息 */
	#playerSong .header .song{
		flex: 1;
		margin-left: -20px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	#playerSong .header .song .songName{
		width: 300px;
		height: 30%;
		text-align: center;
	}
	#playerSong .header .song .songName h3{
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playerSong .header .song .author{
		display: flex;
		display: -webkit-flex;
		opacity: 0.8;
		font-size: 14px;
	}
	#playerSong .header .song .author > li{
		max-width: 5rem;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playerSong .header .song .author > li:nth-of-type(n+2)::before{
		content: "/";
		padding: 0 5px;
	}
	#playerSong .header .song .author > li:nth-of-type(n+4)::after{
		content: '...';
	}
	#playerSong .header .song .author > li:nth-of-type(n+5){
		display: none;
	}
	
	/* 内容 */
	#playerSong .content{
		flex: 5;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	/* 歌曲封面 */
	#playerSong .content .bg{
		width: 220px;
		height: 220px;
		border-radius: 100%;
		border: 6px solid rgba(255,255,255,0.2);
		animation-delay: .6s;
	}
	#playerSong .content .bg img{
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	/* 唱片旋转 */
	#playerSong .rotate{
		animation: rotate 30s linear infinite;
		-webkit-animation: rotate 30s linear infinite;;
	}
	#playerSong .pause{
		animation-play-state: paused;
		-webkit-animation-play-state: paused;
	}
	@keyframes rotate{
		to{transform: rotate(360deg);}
	}
	@-webkit-keyframes rotate{
		to{transform: rotate(360deg);}
	}
	/* 歌词 */
	#playerSong .content .lyric{
		flex: 1;
		width: 100%;
		height: 100%;
		position: relative;
		top: 20%;
		padding: 600px 0 800px;
		color: #ded9d9;
		overflow-y: scroll;
		text-align: center;
	}
	#playerSong .content .lyric ul{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;
		transition: all 1s;
	}
	#playerSong .content .lyric ul li{
		padding: 10px 0;
	}
	
	/* 底部，控制器 */
	#playerSong .footer{
		flex: 1;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		padding: 10px 0 0;
	}
	#playerSong .footer .progress{
		flex: 1;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
	}
	#playerSong .footer .progress .proBox{
		width: 80%;
		height: 2px;
		background-color: rgba(255,255,255,0.4);
		border-radius: 2px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		position: relative;
	}
	#playerSong .footer .progress .proBoxC{
		height: 2px;
		border-radius: 2px;
		position: absolute;
		background-color: #f7f7f7;
	}
	#playerSong .footer .progress .proBox .proChild{
		width: 8px;
		height: 8px;
		border-radius: 100%;
		background-color: #f7f7f7;
		position: absolute;
		left: 0;
	}
	
	#playerSong .footer .controls{
		flex: 2;
		padding: 0 10px;
	}
	#playerSong .footer ul{
		display: flex;
		display: -webkit-flex;
	}
	#playerSong .footer ul>li{
		flex: 1;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	#playerSong .footer ul .mode i{
		font-size: 2rem;
	}
	#playerSong .footer ul .last i,#playerSong .footer ul .next i{
		font-size: 2.2rem;
	}
	#playerSong .footer ul .pause::before{
		content: "";
		width: 48px;
		height: 48px;
		border-radius: 100%;
		border: 2px solid #fff;
		position: absolute;
	}
	#playerSong .footer ul .playChart{
		
	}
	#playerSong .footer ul .playChart i{
		font-size: 2.8rem;
	}
	
	
	@keyframes one{
		from{transform: translateY(30%);opacity: 0;}
		to{transform: translateY(0);opacity: 1;}
	}
	@-webkit-keyframes one{
		from{transform: translateY(30%);opacity: 0;}
		to{transform: translateY(0);opacity: 1;}
	}
</style>
