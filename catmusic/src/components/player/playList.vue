<!-- 歌单 -->
<template>
	<div id="playList">
		<div class="header">
			<div @click="backHistory()" class="text"><i class="iconfont iconjiantou-copy-copy"></i>歌单&reg;</div>
			<ul class="bg">
				<li><img v-lazy="playList.coverImgUrl" alt=""></li>
				<li class="num">
					<i class="iconfont iconbofang"></i>
					{{playList.playCount > 100000 ? 
						(Math.floor(playList.playCount/10000) > 10000 ? Math.floor(playList.playCount/10000000)/10 + ' 亿' : Math.floor(playList.playCount/10000) + ' 万')
					: playList.playCount
					}}
				</li>
				<li class="name">{{playList.name}}</li>
			</ul>
		</div>
		<div class="content">
			<div class="playsong" @click="toPlaySongs()">
				<ul>
					<li><i class="iconfont iconbofang"></i></li>
					<li>播放全部</li>
					<li>({{songsLength}})</li>
				</ul>
			</div>
			<div class="song">
				<ul v-for="(item,index) in songsList" :key="index" @click="toPlaySong(item)">
					<li class="num" v-if="item.id == songList.id">
						<i class="iconfont iconzhengzaibofang"></i>
					</li>
					<li class="num" v-else>{{index+=1}}</li>
					<!-- 歌曲名称 -->
					<li class="songName">{{item.name}}</li>
					<!-- 作者名称 -->
					<li class="songAuthor">
						<ul>
							<li v-for="(a,index) in item.ar" :key="index">{{a.name}}</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import Public from './playerPublic.js'
	
	export default{
		name: 'playList',
		data(){
			return {
				id: '',//歌单的id
				playList: [],//存储歌单详细
				songsList: [],//存储歌单里的歌曲
			}
		},
		methods: {
			getId(){
				this.id = this.$route.query.id;
				//console.log(this.id);
				if(this.id != ''){
					this.$axios.get('playlist/detail?id=' + this.id)
					.then(res => {
						//console.log(res.data)
						this.playList = res.data.playlist;
						this.songsList = res.data.playlist.tracks;
						//更改vuex的值
						this.$store.commit('songsLength',this.songsList.length);
					})
					.catch(err => {
						console.log(err);
					})
				}
			},
			backHistory(){	//返回上一页
				this.$router.go(-1);
			},
			toPlaySongs(){
				//更改vuex的state值
				this.$store.commit('songsList',this.songsList);
				this.$store.commit('songList',this.songsList[Math.floor(Math.random() * this.songsList.length)]);
				//打开歌单-->调用playerSong的方法
				Public.$emit('player');
				Public.$emit('play');
			},
			toPlaySong(list){
				if(this.songList != list){
					//更改vuex的state值
					this.$store.commit('songsList',this.songsList);
					this.$store.commit('songList',list)
					//打开歌单-->调用playerSong的方法
					Public.$emit('player');
					Public.$emit('play');
				}
			}
		},
		computed: {
			songList(){
				return this.$store.state.songList;
			},
			songsLength (){
				return this.$store.state.songsLength;
			}
		},
		created() {		//生命周期钩子，created 在实例（VUE）被创建之后被调用
			this.getId();
		},
		watch: {
			// 监视this.getUserId()的变动
			'$route': 'getId',
		}
	}
</script>

<style scoped="scoped">
	#playList{
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	/* 头部 */
	#playList .header{
		flex: 1;
		background-color: #ff6161;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		color: #f7f7f7;
		/* padding: 10px; */
		border-radius: 0 0 2% 2%;
	}
	#playList .header i{
		font-size: 2rem;
	}
	#playList .header .text{
		flex: 1;
		width: 100%;
		font-size: 18px;
		position: fixed;
		padding: 10px;
		background-color: #ff6161;
		z-index: 10;
	}
	#playList .header .bg{
		flex: 1;
		font-size: 14px;
		position: relative;
		font-weight: 600;
		margin: 40px 10px;
		padding: 20px 10px 10px;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
	}
	#playList .header .bg img{
		width: 120px;
		border-radius: 10px;
	}
	#playList .header .bg i{
		font-size: 10px;
	}
	#playList .header .bg .num{
		background-color: rgba(0,0,0,0.4);
		border-radius: 10px;
		position: absolute;
		top: 0;
		left: 0;
		padding: 0 10px;
		margin: 6% 4%;
	}
	#playList .header .bg .name{
		flex: 1;
		font-size: 18px;
		padding: 10px 20px;
	}
	
	/* 内容 */
	#playList .content{
		flex: 1;
		padding: 20px 20px 66px;
	}
	#playList .content .playsong>ul{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		font-size: 18px;
		font-weight: 600;
	}
	#playList .content .playsong>ul li:nth-of-type(n+2){
		padding: 0 4px;
	}
	#playList .content .playsong>ul li:first-child{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #ff6161;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
	}
	#playList .content .playsong>ul li:last-child{
		font-size: 12px;
	}
	
	#playList .content .song{
		padding: 10px 0;
	}
	#playList .content .song > ul{
		padding: 6px;
		padding-left: 4px;
		border-bottom: 1px solid #797979;
	}
	#playList .content .song ul .num{
		max-width: 30px;
		min-width: 28px;
		float: left;
		font-size: 20px;
		padding: 8px 14px 0 0;
		text-align: center;
	}
	#playList .content .song ul .num i{
		color: #F14E41;
	}
	/* 搜索的歌曲名 */
	#playList .content .song ul .songName{
		width: 80%;
		font-size: 18px;
		font-weight: 500;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/* 对应歌曲的作者们 */
	#playList .content .song ul .songAuthor{
		font-size: 14px;
		color: #797979;
	}
	#playList .content .song ul .songAuthor ul{
		display: flex;
		display: -webkit-flex;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playList .content .song ul .songAuthor ul li{
		padding-right: 4px;
	}
	#playList .content .song ul .songAuthor ul li:nth-of-type(n + 2)::before{
		content: "/";
		padding-right: 4px;
	}
</style>
