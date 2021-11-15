<!-- 搜索详情页面 -->
<template>
	<div id="searchDetail">
		<!-- 返回、搜索内容、清除搜索内容 -->
		<div class="header">
			<div @click="backHistory()"><i class="iconfont iconjiantou-copy-copy"></i></div>
			<div>
				<input type="text" placeholder="搜索歌曲/歌手" v-model="InputValue" icon="search" @keyup.enter="enterSearch()">
			</div>
			<div @click="clearInput()" v-show="isBlock"><i class="iconfont iconquxiao"></i></div>
		</div>
		<!-- 搜索的内容 -->
		<div class="content">
			<ul v-for="(item,index) in listDetail" @click="toPlayerSong(item)" :key="index">
				<li class="num">{{index+=1}}</li>
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
</template>

<script>
	import Public from '../player/playerPublic.js'
	
	export default{
		name: 'searchDetail',
		data() {
			return {
				InputValue: '',//搜索的关键字
				isBlock: false,//清除搜索内容的图标显示
				listDetail: [],	//搜索结果
				historyList: []	//历史搜索
			}
		},
		methods: {
			getSearchCon(){	//检测接收的歌曲名称
				this.InputValue = this.$route.query.searchCon;
				this.getSearchDetail();//链接API,返回搜索内容
			},
			backHistory(){	//返回上一页
				this.$router.go(-1);
			},
			clearInput(){	//清除内容
				this.InputValue = '';
				this.isBlock = false;
			},
			enterSearch(){		//按回车键搜索
				if(this.InputValue != ''){
					//如果没有存在的值则追加到数组，并本地存储
					if(this.historyList.indexOf(this.InputValue) == -1){
						this.historyList.push(this.InputValue);
						//存储搜索历史
						var storage = null;
						if(window.localStorage){
							storage = window.localStorage;
							storage.setItem("historyList",this.historyList);//存储
							//storage.removeItem("historyList");//移除
						}
					}
				}
				this.getSearchDetail();
			},
			toPlayerSong(list){
				if(this.songList != list){
					this.$store.commit('songList',list)
					//打开歌单-->调用playerSong的方法
					Public.$emit('player');
					Public.$emit('play');
				}
			},
			getSearchDetail(){	//链接API,返回搜索内容
				if(this.InputValue != ''){
					this.$axios.get('/cloudsearch?keywords=' + this.InputValue)
					.then(res => {
						this.listDetail = res.data.result.songs;
						//console.log(this.listDetail);
					}).catch(err => {
						console.log(err);
					})
				}
			},
			updata(){
				this.getSearchCon();//将搜索的关键字赋值与搜索框
				
				//获取本地存储
				var storage = null;
				if(window.localStorage){
					storage = window.localStorage;
					var list = [];
					list= storage.getItem("historyList");//获取
					this.historyList = list.split(',');
					// console.log(this.historyList);
				}
			}
		},
		computed: {	//获取Vuex 的 store 属性值
			//存储多首音乐的所有属性
			songList (){
				return this.$store.state.songList;
			},
			search(){	//监听搜索框
				return this.InputValue;
			},
			songsList (){
				return this.$store.state.songsList;
			}
		},
		created() {
			this.updata();
		},
		watch: {
			'$route': 'getSearchCon',
			search(newValue){
				if(newValue != ''){
					this.isBlock = true;
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#searchDetail{
		width: 100%;
		height: 100%;
	}
	#searchDetail > div{
		position: relative;
		top: 0;
		left: 0;
	}
	/* 头部 */
	#searchDetail .header{
		width: 100%;
		height: 2.75rem;
		background-color: #d44439;
		position: fixed;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 77;
	}
	#searchDetail .header i{
		font-size: 1.5rem;
		padding: 3px 10px;
	}
	
	#searchDetail .header div:nth-of-type(2){
		flex: 1;
		border-bottom: 1px solid #F7F7F7;
	}
	/* 搜索框 */
	#searchDetail input{
		width: 100%;
		height: 1.5rem;
		color: #e4e4e4;
		border: none;
		outline: none;
		font-size: 14px;
		background-color: rgba(0,0,0,0);
	}
	#searchDetail input::-webkit-input-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#searchDetail input::-moz-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#searchDetail input:-moz-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#searchDetail input:-ms-input-placeholder{
		color: rgba(255,255,255,0.5);
	}
	
	/* 搜索的内容 */
	#searchDetail .content{
		padding: 3rem 1rem 5rem;
	}
	#searchDetail .content > ul{
		padding: 6px;
		padding-left: 4px;
		border-bottom: 1px solid #797979;
	}
	#searchDetail .content .num{
		width: 28px;
		float: left;
		font-size: 20px;
		padding: 8px 14px 0 0;
	}
	#searchDetail .content .num i{
		color: #F14E41;
	}
	/* 搜索的歌曲名 */
	#searchDetail .content .songName{
		width: 80%;
		font-size: 18px;
		font-weight: 500;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/* 对应歌曲的作者们 */
	#searchDetail .content .songAuthor{
		font-size: 14px;
		color: #797979;
	}
	#searchDetail .content .songAuthor ul{
		display: flex;
		display: -webkit-flex;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#searchDetail .content .songAuthor ul li{
		padding-right: 4px;
	}
	#searchDetail .content .songAuthor ul li:nth-of-type(n + 2)::before{
		content: "/";
		padding-right: 4px;
	}
</style>
