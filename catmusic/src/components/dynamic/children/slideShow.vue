<!-- 轮播图组件 -->
<template>
	<div id="slideShow">
		<template v-for="(item,index) in topList">
			<ul v-if="index < 4" :key="index" @click="toPLayList(topList[index].id)">
				<li class="bg">
					<ul>
						<li><img v-lazy="item.coverImgUrl" alt=""></li>
						<li class="update">{{item.updateFrequency}}</li>
						<li @click.stop="" @click="toPlaySongs(topList[index].id)" v-if="play && item.id != topId"><i class="iconfont iconbofang"></i></li>
						<li v-else><i class="iconfont iconzhengzaibofang"></i></li>
					</ul>
				</li>
				<li class="name">{{item.name}}</li>
			</ul>
		</template>
	</div>
</template>

<script>
	import Public from '../../player/playerPublic.js'
	
	export default{
		name: 'slideShow',
		data(){
			return {
				play: true
			}
		},
		methods: {
			toPLayList(id){		//歌单详情
				//跳转页面并传递数据
				this.$router.push({
					path: '/Playlist',
					query: {
						id: id
					}
				});
			},
			toPlaySongs(id){
				//更改topId值
				this.$store.commit('topId',id);
				this.$axios.get('playlist/detail?id=' + id)
				.then(res => {
					//console.log(res.data)
					//更改vuex的state值
					this.$store.commit('songsList',res.data.playlist.tracks);
					this.$store.commit('songList',this.songsList[Math.floor(Math.random() * this.songsList.length)]);
					//打开歌单-->调用player的方法
					Public.$emit('play');
				})
				.catch(err => {
					console.log(err);
				})
				
				this.play = true;
			},
		},
		computed: {
			topList(){
				return this.$store.state.topList;
			},
			topId(){
				return this.$store.state.topId;
			},
			songsList(){
				return this.$store.state.songsList;
			}
		},
		watch: {
			
		}
	}
</script>

<style scoped="scoped">
	#slideShow{
		min-height: 123px;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	
	#slideShow > ul{
		width: 25%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	
	#slideShow > ul .bg{
		padding: 10px;
	}
	#slideShow > ul .bg > ul{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: flex-end;
		position: relative;
	}
	#slideShow > ul .bg ul>li:first-child{
		width: 100%;
		height: 100%;
	}
	#slideShow > ul .bg ul>li:first-child img{
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	#slideShow > ul .bg ul>li.update{
		font-size: 10px;
		border-radius: 8px;
		color: #f7f7f7;
		position: absolute;
		top: 0;
		right: 0;
		padding: 5px;
		background-color: rgba(0,0,0,0.4);
	}
	#slideShow > ul .bg ul>li:last-child{
		position: absolute;
		padding: 8%;
	}
	
	@media (min-width: 720px) {
		#slideShow i{
			font-size: 3rem;
		}
	}
</style>
