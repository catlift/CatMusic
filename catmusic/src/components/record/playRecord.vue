<!-- 用户播放记录 -->
<template>
	<div id="playRecord">
		<ul v-for="(item,index) in songsList" :key="index" @click="toPlayerSong(item)">
			<li class="num" v-if="item.id == songList.id"><i class="iconfont iconzhengzaibofang"></i></li>
			<li class="num" v-else>{{index+1}}</li>
			<li class="name">{{item.name}}</li>
			<li class="author">
				<ul>
					<li v-for="(a,index) in item.ar" :key="index">{{a.name}}</li>
				</ul>
			</li>
			<li class="playCount">{{playCount[index]}}</li>
		</ul>
	</div>
</template>

<script>
	import Public from '../player/playerPublic.js'
	
	export default{
		name: 'playRecord',
		data (){
			return{
				userId: '',//存储用户id
				songsList: [],//存储多首音乐详情信息
				playCount: [],//存储播放次数
			}
		},
		methods: {
			playRecord(){
				//从本地存储中获取用户id
				if(window.localStorage.getItem("userId") != ''){
					this.userId = window.localStorage.getItem("userId");
					//链接API，获取用户播放记录。
					this.$axios.get('/user/record?uid=' + this.userId + '&type=1')
					.then(res => {
						for(var j = 0;j < res.data.weekData.length;j++){
							this.songsList.push(res.data.weekData[j].song);
							this.playCount.push(res.data.weekData[j].playCount);
						}
						//console.log(res.data.weekData.song)
						//console.log(this.songsList);
						//console.log(this.playCount);
					}).catch(err => {
						console.log(err);
					})
				}
			},
			toPlayerSong(list){
				if(this.songList != list){
					this.$store.commit('songList',list)
					//打开歌单-->调用player的方法
					Public.$emit('play');
				}
			}
		},
		computed: {
			songList(){
				return this.$store.state.songList;
			}
		},
		created() {
			this.playRecord()
		}
	}
</script>

<style scoped="scoped">
	#playRecord {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#playRecord > ul{
		flex: 1;
		padding: 10px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.4);
		position: relative;
	}
	
	#playRecord > ul .num{
		min-width: 30px;
	}
	#playRecord > ul .num i{
		color: #F14E41;
	}
	
	#playRecord > ul .name{
		max-width: 200px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playRecord > ul .name::before{
		content: "";
		padding: 0 10px;
	}
	
	#playRecord > ul .author{
		font-size: 12px;
		color: rgba(0,0,0,0.4);
	}
	#playRecord > ul .author > ul{
		max-width: 120px;
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playRecord > ul .author > ul > li{
		max-width: 80px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playRecord > ul .author > ul li:first-child::before{
		content: "-";
		padding: 0 4px;
	}
	#playRecord > ul .author > ul li:nth-of-type(n+2){
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playRecord > ul .author > ul li:nth-of-type(n+2)::before{
		content: "/";
	}
	
	#playRecord .playCount{
		max-width: 34px;
		position: absolute;
		right: 0;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
