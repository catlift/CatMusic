<template>
	<div id="toplist">
		<template v-for="(item,index) in topList">
			<ul :key="index" @click="toPLayList(topList[index].id)">
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
		name: 'toplist',
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
		}
	}
</script>

<style scoped="scoped">
	#toplist{
		min-height: 2171px;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		font-size: 14px;
	}
	
	#toplist > ul{
		width: 33%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		margin: 10px 0;
	}
	
	#toplist > ul .bg{
		padding: 10px;
	}
	#toplist > ul .bg>ul{
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: flex-end;
		position: relative;
	}
	#toplist > ul .bg ul>li:first-child{
		width: 100%;
		height: 100%;
	}
	#toplist > ul .bg ul>li:first-child img{
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	#toplist > ul .bg ul>li.update{
		font-size: 10px;
		border-radius: 8px;
		color: #f7f7f7;
		position: absolute;
		top: 0;
		right: 0;
		padding: 5px;
		background-color: rgba(0,0,0,0.4);
	}
	#toplist > ul .bg ul>li:last-child{
		position: absolute;
		padding: 8%;
	}
	
	#toplist > ul .name{
		padding: 0 10px;
	}
	
	@media (min-width: 720px) {
		#toplist i{
			font-size: 3rem;
		}
	}
</style>
