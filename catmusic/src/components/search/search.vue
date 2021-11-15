<!-- 搜索页面 -->
<template>
	<div id="search">
		<!-- 返回、搜索内容、清除搜索内容 -->
		<div class="header">
			<div @click="backHistory()"><i class="iconfont iconjiantou-copy-copy"></i></div>
			<div>
				<input type="text" placeholder="搜索歌曲/歌手" v-model="InputValue" icon="search" @keyup.enter="enterSearch()">
			</div>
			<div @click="clearInput()" v-show="isBlock"><i class="iconfont iconquxiao"></i></div>
		</div>
		<!-- 热门搜索 可以考虑自己填充数据 -->
		<div class="content">
			<div class="hot">
				<div class="little">热门搜索</div>
				<div class="hotContent">
					<ul v-for="(item,index) in hotList" @click="hotSearch(item)" :key="index">
						<li>{{index+=1}}</li>
						<li>{{item.searchWord}}</li>
						<li class="icon" v-if="(item.iconUrl)"><img v-lazy="item.iconUrl" alt=""></li>
					</ul>
				</div>
			</div>
			<!-- 历史搜索 -->
			<div class="history">
				<div class="little">
					<ul>
						<li>搜索历史</li>
						<li @click="clearHistory()"><i class="iconfont iconshanchu2"></i></li>
					</ul>
				</div>
				<div class="hisCon">
					<ul>
						<li v-for="index in historyList" @click="hisSearch($event)" :key="index">{{index}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script scoped>
	export default{
		name: 'search',
		data(){
			return {
				InputValue: '',//搜索的关键字
				isBlock: false,//清除搜索内容的图标的显示
				hotList: [],	//热门搜索
				historyList: []	//历史搜索
			}
		},
		methods: {
			backHistory(){//返回上一页
				this.$router.go(-1);
			},
			clearInput(){	//清除内容
				this.InputValue = '';
				this.isBlock = false;
			},
			hotSearch(item){	//点击热门搜索内容实现搜索
				this.InputValue = item.searchWord;
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
				this.goSearchDetail();
			},
			hisSearch(event){	//点击搜索历史内容实现搜索
				var el = event.currentTarget.innerHTML;
				this.InputValue = el;
				this.goSearchDetail();
			},
			clearHistory(){		//清除本地存储数据
				if(this.historyList != ''){
					var storage = null;
					if(window.localStorage){
						storage = window.localStorage;
						storage.removeItem("historyList");//移除本地的存储
					}
					this.historyList = [];//清除数组
				}
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
					this.goSearchDetail();
				}
			},
			goSearchDetail(){		//跳转路由到歌曲详情组件
				//跳转页面并传递数据
				this.$router.push({
					path: '/SearchDetail',
					query: {
						searchCon: this.InputValue
					}
				})
			}
		},
		computed: {	//监听自定义变量
			search(){	//监听搜索框
				return this.InputValue;
			}
		},
		watch: {	//深度监听
			search(newValue){
				if(newValue != ''){
					this.isBlock = true;
				}
			}
		},
		created() {
			// 获取热门歌单
			this.$axios.get('/search/hot/detail')
			.then(res => {
				this.hotList = res.data.data;
				//console.log(this.hotList);
			}).catch(err => {
				console.log(err);
			})
			
			//获取本地存储
			var storage = null;
			if(window.localStorage){
				storage = window.localStorage;
				var list = [];
				list = storage.getItem("historyList");//获取
				if(list != null){
					this.historyList = list.split(',');
					// console.log(this.historyList);
				}
			}
		}
	}
</script>

<style scoped="scoped">
	#search{
		width: 100%;
		height: 100%;
	}
	#search > div{
		position: relative;
		top: 0;
		left: 0;
	}
	/* 头部 */
	#search .header{
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
	#search .header i{
		font-size: 1.5rem;
		padding: 3px 10px;
	}
	
	#search .header div:nth-of-type(2){
		flex: 1;
		border-bottom: 1px solid #F7F7F7;
	}
	/* 搜索框 */
	#search input{
		width: 100%;
		height: 1.5rem;
		color: #e4e4e4;
		border: none;
		outline: none;
		font-size: 14px;
		background-color: rgba(0,0,0,0);
	}
	#search input::-webkit-input-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#search input::-moz-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#search input:-moz-placeholder{
		color: rgba(255,255,255,0.5);
	}
	#search input:-ms-input-placeholder{
		color: rgba(255,255,255,0.5);
	}
	
	/* 内容 */
	#search .content{
		position: relative;
	}
	#search .content > div{
		padding: 50px 20px 0;
	}
	/* "热门搜索"、"历史搜索"的样式 */
	#search .content .little{
		font-size: 12px;
		color: #757575;
	}
	/* 热门搜索的内容排版 */
	#search .content .hot .hotContent{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-flow: row wrap;
	}
	#search .content .hot .hotContent ul{
		width: 50%;
		height: 24px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		padding: 4px 0;
	}
	#search .content .hot .hotContent ul li:nth-of-type(1){
		width: 24px;
		color: #f00;
		font-weight: bold;
		text-align: center;
	}
	#search .content .hot .hotContent ul:nth-of-type(n+4) li:nth-of-type(1){
		color: #000;
	}
	/* 热门搜索的标题 */
	#search .content .hot .hotContent ul li:nth-of-type(2){
		padding: 0 8px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/* 右边的图标 */
	#search .content .hot .hotContent ul li.icon{
		width: 22px;
		height: 22px;
	}
	#search .content .hot .hotContent ul:nth-of-type(n+4) li.icon{
		display: none;
	}
	#search .content .hot .hotContent ul li.icon img{
		width: 100%;
		height: 100%;
	}
	
	/* 历史搜索的内容排版 */
	#search .content .history{
		padding-top: 20px;
		padding-bottom: 66px;
	}
	#search .content .history .little ul{
		display: flex;
		display: -webkit-flex;
		align-items: center;
	}
	#search .content .history .little ul li:nth-of-type(1){
		flex: 1;
	}
	#search .content .history i{
		color: rgba(0,0,0,0.8);
	}
	#search .content .history .hisCon ul{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		flex-flow: row wrap;
		padding-top: 10px;
	}
	#search .content .history .hisCon ul li{
		padding: 4px;
		margin: 0 4px 4px;
		background-color: rgba(0,0,0,0.1);
		border-radius: 2px;
	}
	
	@media (min-width: 720px) {
		#search .content .history i{
			font-size: 2rem;
		}
	}
</style>
