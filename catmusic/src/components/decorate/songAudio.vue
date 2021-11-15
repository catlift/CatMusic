<!-- 用于播放音乐 -->
<template>
	<div id="songAudio">
		<audio :src="audio" autoplay="autoplay" ref="audio" @ended="endSong()" @timeupdate="a()"></audio>
	</div>
</template>

<script>
	import Public from '../player/playerPublic.js'
	
	export default{
		name: 'songAudio',
		data(){
			return {
				audio: '',//存储音乐url
			}
		},
		methods: {
			controlPlay(){	//播放音乐
				this.$refs.audio.play();
			},
			controlPause(){	//暂停音乐
				this.$refs.audio.pause();
			},
			loopSong(){	//单曲循环
				this.$refs.audio.loop = true;
			},
			noLoop(){	//列表循环
				this.$refs.audio.loop = false;
			},
			playerSong(){	//链接api，获取数据
				//歌曲url
				this.$axios.get(('/song/url?id=' + this.songList.id) || ('https://music.163.com/song/media/outer/url?id=' + this.songList.id + '.mp3'))
				.then(res => {
					// 将用于地址赋值
					if(res.data.data[0].url != ''){
						this.audio = res.data.data[0].url;
						//console.log(res.data.data[0].url);
					}else{
						for(var j = 0;j < this.songsList.length;j++){
							if(this.songList.id == this.songsList[j].id){
								j++;
								this.$store.commit('songList',this.songsList[j]);
							}
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			listLoopSong(){	//列表循环
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
			},
			randomSong(){	//随机播放
				//更改vuex的state值
				this.$store.commit('songList',this.songsList[Math.floor(Math.random() * this.songsList.length)]);
			},
			endSong(){
				switch(this.mode){
					case 0:
						this.listLoopSong();
						break;
					case 1: 
						this.randomSong();
						break;
				}
			},
			a(){
				this.$store.commit('currentTime',this.$refs.audio.currentTime);
			}
		},
		mounted(){
			// 用于传递方法,经过plauerPublic.js
			var that = this;
			Public.$off('songPlay');
			Public.$on('songPlay',function(){
				that.controlPlay();
			});
			
			Public.$off('songPause');
			Public.$on('songPause',function(){
				that.controlPause();
			});
			
			Public.$off('loopSong');
			Public.$on('loopSong',function(){
				that.loopSong();
			});
			
			Public.$off('noLoop');
			Public.$on('noLoop',function(){
				that.noLoop();
			});
		},
		computed:{
			songList(){
				return this.$store.state.songList;
			},
			songsList(){
				return this.$store.state.songsList;
			},
			mode(){
				return this.$store.state.mode;
			}
		},
		watch: {
			songList() {
				//console.log(this.songList);
				this.playerSong();
			},
			songsList(){
				if(this.songsList.length == 1 || this.mode == 2){
					this.$refs.audio.loop = true;
				}else{
					this.$refs.audio.loop = false;
				}
			}
		}
	}
</script>

<style scoped="scoped">
</style>
