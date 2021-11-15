<!-- 主页的用户信息 -->
<template>
	<div id="user">
		<!-- 未登录时显示 -->
		<router-link tag="div" to="/Login" class="noLand" v-if="!login">
			<ul>
				<!-- 用户头像 -->
				<li class="userHeader"><i class="iconfont iconyonghu"></i></li>
				<!-- 用户昵称 -->
				<li class="userName">{{userName}}</li>
				<li><i class="iconfont iconjiantou"></i></li>
			</ul>
		</router-link>
		<!-- 登陆后显示· -->
		<div class="landing" v-else @click="userDetail()">
			<ul>
				<!-- 用户头像 -->
				<li class="userHeader"><img v-lazy="list.profile.avatarUrl" alt=""></li>
				<!-- 用户昵称/等级 -->
				<li class="userName">{{list.profile.nickname}}<br>LV.{{list.level}}</li>
				<li><i class="iconfont iconjiantou"></i></li>
			</ul>
		</div>
		
		<!-- 音乐应用 -->
		<div class="musicApply">
			<ul>
				<li @click="rem()"><i class="iconfont iconbendi"></i><br>本地</li>
				<li @click="cloud()"><i class="iconfont iconzuozhe"></i><br>作者</li>
				<li @click="recently()"><i class="iconfont iconzuijinbofang"></i><br>最近播放</li>
				<li @click="rem()"><i class="iconfont iconjia"></i><br>音乐应用</li>
			</ul>
			<div class="reminder" v-if="isRem">此功能并没有开发</div>
		</div>
		
		<!-- 我喜欢的音乐,登录前 -->
		<router-link tag="div" to="/Login" class="loveMusic" v-if="!login">
			<ul>
				<li class="bg"><img v-lazy="" alt=""></li>
				<li class="content">
					<p>我喜欢的音乐</p>
					<p class="num">&infin;首</p>
				</li>
				<li class="loveMode" @click="loveMode(playList[0].id)" @click.stop=""><i class="iconfont iconxin2"></i>心动模式</li>
			</ul>
		</router-link>
		<!-- 我喜欢的音乐,登录后 -->
		<div class="loveMusic" v-else  @click="toPLayList(playList[0].id)">
			<ul>
				<li class="bg"><img v-lazy="coverImgUrl" alt=""></li>
				<li class="content">
					<p>{{listName}}</p>
					<p class="num">{{trackCount}}首</p>
				</li>
				<li class="loveMode" @click="loveMode(playList[0].id)" @click.stop=""><i class="iconfont iconxin2"></i>心动模式</li>
			</ul>
		</div>
		
		<!-- 收藏/创建的歌单 -->
		<div class="both">
			<ul class="title">
				<li><a href="#create">创建的歌单</a></li>
				<li><a href="#collect">收藏的歌单</a></li>
			</ul>
			
			<div id="create" v-if="login">
				<div class="same">创建的歌单</div>
				<template v-for="(item,index) in playList" :accesskey="index">
					<ul v-if="!playList[index].subscribed && playList[index].subscribedCount == 0" :key="index" @click="toPLayList(playList[index].id)">
						<li class="bg"><img v-lazy="playList[index].coverImgUrl" alt=""></li>
						<li class="content">
							<p>{{playList[index].name}}</p>
							<p class="num">{{playList[index].trackCount}}首</p>
						</li>
					</ul>
				</template>
			</div>
			<div id="collect" v-if="login">
				<div class="same">收藏的歌单</div>
				<template v-for="(item,index) in playList" :accesskey="index">
					<ul v-if="playList[index].subscribed && playList[index].subscribedCount != 0" :key="index" @click="toPLayList(playList[index].id)">
						<li class="bg"><img v-lazy="playList[index].coverImgUrl" alt=""></li>
						<li class="content">
							<p>{{playList[index].name}}</p>
							<p class="num">{{playList[index].trackCount}}首</p>
						</li>
					</ul>
				</template>
			</div>
			
			<h2 v-if="!login"><br><br><br><br>请登录后查看</h2>
		</div>
	</div>
</template>

<script>
	import Public from '../player/playerPublic.js'
	
	export default {
		name: 'user',
		data(){
			return {
				login: false,//控制登录与未登录的显示内容
				isRem: false,//控制未开发功能的显示
				userName: '未登录',
				list : [],	//存储用户详情
				userId: '',	//存储用户id
				countLove: '',	//存储我喜欢的音乐的首数
				playList: [],	//存储用户的歌单
				coverImgUrl: '',//存储歌单封面
				trackCount: '',//存储歌单首数
				listName: '',//存储歌单名称
				songId: '',//歌曲id
			}
		},
		methods: {
			getUserId(){	//检测用户是否登录，并获取id
				this.userId = this.$route.query.userId || window.localStorage.getItem("userId");
				//console.log(this.userId);
				if(this.userId){
					this.$axios.get('/user/detail?uid=' + this.userId)
					.then(res => {
						this.list = res.data;
						//console.log("我拿到的数据：", res.data);
						this.login = true;
					})
					.catch(err => {
						console.log(err);
					})
					
					this.$axios.get('/user/playlist?uid=' + this.userId)
					.then(res => {
						this.playList = res.data.playlist;
						//console.log(this.playList);
						this.coverImgUrl = this.playList[0].coverImgUrl;
						this.listName = this.playList[0].name;
						this.trackCount = this.playList[0].trackCount;
					})
					.catch(err => {
						console.log(err);
					})
				}
			},
			userDetail(){	//用户详情
				//跳转页面并传递数据
				this.$router.push({
					path: '/UserDetail',
					query: {
						userId: this.userId
					}
				});
			},
			rem(){
				if(!this.isRem){
					this.isRem = true;
					var _this = this;
					window.setTimeout(function(){
						_this.isRem = false;
					},1000)
				}
			},
			recently(){		//用户播放记录
				if(this.login){
					//跳转页面
					this.$router.push({
						path: '/Record'
					});
				}
			},
			cloud(){
				if(this.login){
					//跳转页面
					this.$router.push({
						path: '/Cloud'
					});
				}
			},
			toPLayList(id){		//歌单详情
				//跳转页面并传递数据
				this.$router.push({
					path: '/Playlist',
					query: {
						id: id
					}
				});
			},
			loveMode(pid){	//心动模式
				if(this.login){
					this.$axios.get('playlist/detail?id=' + pid)
					.then(res => {
						var song;//存储随机的歌曲id
						song = res.data.playlist.tracks[Math.floor(Math.random() * res.data.playlist.tracks.length)];
						this.songId = song.id;
						
						this.$axios.get('/playmode/intelligence/list?id=' + this.songId + '&pid=' + pid + '&sid=' + this.songId)
						.then(res => {
							//console.log(res.data.data)
							var songs = [];//存储随机后的数组
							for(var j = 0;j < res.data.data.length;j++){
								songs.push(res.data.data[j].songInfo);
							}
							//console.log(songs);
							//更改vuex的值
							this.$store.commit('songsList',songs);
							this.$store.commit('songList',song);
							//打开歌单-->调用playerSong的方法
							Public.$emit('player');
							Public.$emit('play');
						}).catch(err => {
							console.log(err);
						})
					})
					.catch(err => {
						console.log(err);
					})
				}
			}
		},
		created() {		//生命周期钩子，created 在实例（VUE）被创建之后被调用
			this.getUserId();
		},
		watch: {
			// 监视this.getUserId()的变动
			'$route': 'getUserId',
		}
	}
</script>

<style scoped>
	.userHeader i{
		color: #d44439;
		font-size: 3rem;
	}
	.iconjiantou{
		font-size: 1.5rem;
		color: #000;
	}
	a{
		text-decoration: none;
		color: #000000;
	}
	
	#user{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		flex-direction: column;
		font-size: 14px;
	}
	/* 未登录 */
	#user .noLand{
		flex: 1;
	}
	#user .noLand ul{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 20px;
		padding-left: 40px;
	}
	#user .noLand ul li.userName{
		flex: 1;
		font-size: 18px;
		font-weight: 500;
	}
	/* 登陆后 */
	#user .landing{
		flex: 1;
	}
	#user .landing ul{
		padding: 20px 20px 10px;
		padding-left: 40px;
		align-items: center;
		display: flex;
		display: -webkit-flex;
	}
	#user .landing ul .userHeader img{
		width: 3.75rem;
		height: 3.75rem;
		border-radius: 100%;
		border: 2px solid #fff;
	}
	#user .landing ul li.userName{
		flex: 1;
		font-size: 18px;
		font-weight: bold;
		padding-left: 20px;
	}
	/* 音乐应用 */
	#user .musicApply{
		flex: 1;
		border-radius: 1rem;
		/* background-color: #fff; */
		padding: 20px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: flex-end;
	}
	#user .musicApply ul{
		min-width: 100%;
		background-color: #fff;
		border-radius: 1rem;
		padding: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	#user .musicApply ul li{
		flex: 1;
	}
	#user .musicApply i{
		color: #d44439;
		font-size: 2.2rem;
	}
	#user .musicApply li:nth-of-type(2) i{
		font-size: 2.4rem;
	}
	#user .musicApply li:nth-of-type(4) i{
		font-size: 2.2rem;
		color: rgba(0,0,0,0.3);
	}
	/* 我喜欢的音乐歌单 */
	#user .loveMusic{
		flex: 1;
		padding: 20px;
	}
	#user .loveMusic > ul{
		width: 100%;
		padding: 20px 0;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-radius: 1rem;
	}
	#user .loveMusic i{
		color: #F5A9BC;
	}
	#user .loveMusic .bg{
		width: 60px;
		height: 60px;
		border-radius: 8px;
		padding: 0 20px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	#user .loveMusic .bg img{
		width: 100%;
		border-radius: 8px;
		background-color: #F5A9BC;
	}
	#user .loveMusic .bg .icon{
		position: absolute;
	}
	#user .loveMusic .bg .icon i{
		font-size: 2rem;
		color: #F7F7F7;
	}
	
	#user .loveMusic .content{
		flex: 1;
	}
	#user .loveMusic .content p{
		max-width: 140px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#user .loveMusic .content .num{
		font-size: 12px;
		color: rgba(0,0,0,0.5);
		letter-spacing: 1px;
	}
	
	#user .loveMusic .loveMode{
		border: 1px solid rgba(0,0,0,0.4);
		border-radius: 20px;
		padding: 4px 9px 4px 5px;
		margin-right: 4%;
	}
	
	#user .both{
		flex: 1;
		border-radius: 1rem;
		padding: 20px 20px 120px;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#user .both > ul,#user .both > div{
		flex: 1;
		min-width: 100%;
		max-width: 100%;
	}
	#user .both > ul{
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 18px;
		font-weight: 600;
	}
	#user .both > ul li{
		flex: 1;
	}
	#user .both > div{
		background-color: #fff;
		margin: 2% 0;
		border-radius: 1rem;
	}
	#user .both > div .same{
		padding: 20px 20px 0;
		font-size: 12px;
		margin-bottom: -10px;
		color: rgba(0,0,0,0.5);
	}
	#user .both > div > ul{
		display: flex;
		display: -webkit-flex;
		padding: 20px 20px 0;
		justify-content: center;
		align-items: center;
	}
	#user .both > div > ul:last-child{
		padding-bottom: 20px;
	}
	#user .both > div .bg{
		width: 60px;
		height: 60px;
		border-radius: 8px;
		background-color: #f99;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
	}
	#user .both > div .bg img{
		width: 100%;
		border-radius: 8px;
	}
	#user .both > div > ul li.content{
		flex: 1;
		padding: 0 20px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#user .both > div > ul li.content > p{
		flex: 1;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#user .both > div > ul li.content .num{
		font-size: 12px;
		color: rgba(0,0,0,0.5);
		letter-spacing: 1px;
	}
	
	#user .reminder{
		position: fixed;
		top: 50%;
		background-color: rgba(0,0,0,0.4);
		padding: 4px;
		border-radius: 8px;
		color: #fff;
	}
</style>
