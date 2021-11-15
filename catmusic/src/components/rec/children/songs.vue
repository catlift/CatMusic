<!-- 推荐的歌曲 -->
<template>
	<div id="songs">
		<h2>推荐新曲</h2>
		<div class="soList">
			<ul v-for="(item,index) in songs" :key="index" @click="toPlayerSong(item.id)">
				<li class="num">{{index+1}}</li>
				<li class="bg"><img v-lazy="item.picUrl" alt=""></li>
				<li class="name">{{item.name}}</li>
				<li class="author">
					<ul>
						<li v-for="(a,index) in item.song.artists" :key="index">{{a.name}}</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Public from '../../player/playerPublic.js'
	
	export default{
		name: 'songs',
		data() {
			return{
				songs: [],//存储歌曲信息
			}
		},
		methods: {
			toPlayerSong(id){
				//链接api
				this.$axios.get('/song/detail?ids=' + id)
				.then(res => {
					//console.log(res.data.songs[0]);
					this.$store.commit('songList',res.data.songs[0])
					//打开歌单-->调用playerSong的方法
					Public.$emit('player');
					Public.$emit('play');
				})
				.catch(err => {
					console.log(err);
				})
			}
		},
		computed: {
			songList(){
				return this.$store.state.songList;
			}
		},
		created() {
			//链接api
			this.$axios.get('/personalized/newsong')
			.then(res => {
				//console.log(res.data.result);
				this.songs = res.data.result;
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
</script>

<style scoped="scoped">
	#songs{
		padding: 10px;
		min-height: 781px;
	}
	
	#songs .soList{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#songs .soList > ul{
		flex: 1;
		padding: 10px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.4);
	}
	
	#songs .soList > ul .num{
		min-width: 30px;
	}
	
	#songs .soList > ul .bg img{
		width: 3rem;
		height: 3rem;
		border-radius: 8px;
	}
	
	#songs .soList > ul .name{
		max-width: 200px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#songs .soList > ul .name::before{
		content: "";
		padding: 0 10px;
	}
	
	#songs .soList > ul .author{
		font-size: 12px;
		color: rgba(0,0,0,0.4);
	}
	#songs .soList > ul .author > ul{
		max-width: 120px;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#songs .soList > ul .author > ul > li{
		max-width: 80px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#songs .soList > ul .author > ul li:first-child::before{
		content: "-";
		padding: 0 4px;
	}
	#songs .soList > ul .author > ul li:nth-of-type(n+2){
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#songs .soList > ul .author > ul li:nth-of-type(n+2)::before{
		content: "/";
	}
</style>
