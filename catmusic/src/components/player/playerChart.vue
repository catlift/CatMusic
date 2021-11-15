<!-- 播放列表 -->
<template>
	<div id="playerChart" @click="closeChart()" :class="{none:isNone,block:isBlock}" @touchmove.prevent @mousewheel.prevent>
		<div class="playerData">
			<!-- 头部 -->
			<div class="header" @click.stop="">
				<h2>当前播放<span>({{songsLength}})</span></h2>
				<p @click="chartMethod()">
					<i :class="list[num == mode?mode:mode].iconName"></i>
					{{list[num == mode?mode:mode].text}}
				</p>
			</div>
			<!-- 歌曲信息列表 -->
			<div class="content" @click.stop="" @touchmove.stop="" @mousewheel.stop="">
				<ul v-for="(item,index) in songsList" :key="index" @click="toPlayerSong(item)">
					<li v-if="item.id == songList.id" class="item" @click.stop=""><i class="iconfont iconzhengzaibofang"></i></li>
					<li class="song">
						<ul class="author">
							<li>{{item.name}}</li>
							<li v-for="(a,index) in item.ar" :key="index">{{a.name}}</li>
						</ul>
					</li>
					<li class="icon" @click="removeSong(index)" @click.stop=""><i class="iconfont iconquxiao"></i></li>
				</ul>
			</div>
			<div class="close">关闭</div>
		</div>
	</div>
</template>

<script scoped>
	import Public from './playerPublic.js'
	
	export default{
		name: 'playerChart',
		data(){
			return {
				num: 0,		//用于list的切换比较
				isNone: false,	//是否添加样式
				isBlock: false,	//是否添加样式
				list: [
					{iconName: 'iconfont iconshunxubofang1',text: '列表循环'},
					{iconName: 'iconfont iconbofangye-caozuolan-suijibofang1',text: '随机播放'},
					{iconName: 'iconfont icondanquxunhuan',text: '单曲循环'}
				]
			}
		},
		methods: {
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
			closeChart(){	//隐藏该页面
				this.isNone = true;
				this.isBlock = false;
			},
			openChart(){	//显示该页面
				this.isNone = false;
				this.isBlock = true;
			},
			getHisSong(){	//存储播放过的音乐的方法
				//如果没有存在的值则追加到数组，并本地存储
				//console.log(this.songList);
				if(this.songsList.indexOf(this.songList) == -1){
					this.songsList.push(this.songList);
					//更改vuex的state值
					this.$store.commit('songsList',this.songsList);
					//console.log(this.songsList);
				}
			},
			toPlayerSong(list){
				//点击播放记录的歌曲时播放歌曲
				this.$store.commit('songList',list);
			},
			removeSong(index){
				for(var i = 0;i < this.songsList.length;i++){
					if(index == i){
						this.songsList.splice(index,1);
						//更改vuex的state值
						this.$store.commit('songsList',this.songsList);
						this.$store.commit('songList',this.songsList[index]);
					}
				}
			}
		},
		computed: {	//获取Vuex 的 store 属性值
			//存储多首音乐的所有属性
			songsList (){
				return this.$store.state.songsList;
			},
			//存储单首音乐的所有属性
			songList (){
				return this.$store.state.songList;
			},
			mode (){
				return this.$store.state.mode;
			},
			songsLength (){
				return this.$store.state.songsLength;
			}
		},
		mounted(){
			// 被调用的方法
			var that = this;
			Public.$off('demo');
			Public.$on('demo',function(){
				that.openChart();
			})
		},
		watch: {
			songList() {
				this.getHisSong();
			}
		}
	}
</script>

<style scoped>
	#playerChart{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		position: fixed;
		top: 100%;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 400;
		font-weight: 400;
		transform: translateY(0%);
	}
	/* 隐藏的样式 */
	#playerChart.none{
		visibility: hidden;
		transition: all .3s;
		transform: translateY(0%);
	}
	/* 显示的样式 */
	#playerChart.block{
		visibility: visible;
		transition: all .3s;
		transform: translateY(-100%);
	}
	
	#playerChart .playerData{
		width: 100%;
		max-height: 60%;
		background-color: #f7f7f7;
		border-radius: 8px 8px 0 0;
		position: absolute;
		left: 0;
		bottom: 0;
		overflow-y: auto;
	} 
	/* 头部 */
	#playerChart .header{
		width: 100%;
		position: fixed;
		padding: 0.8rem 0 0 1rem;
		background-color: #f7f7f7;
		border-radius: 8px 8px 0 0;
		z-index: 10;
	}
	#playerChart .header h2{
		font-size: 1.5rem;
	}
	#playerChart .header h2 span{
		font-size: 14px;
		font-weight: initial;
		color: rgba(0,0,0,0.8);
		padding: 0 8px;
	}
	#playerChart .header p{
		font-size: 1rem;
		font-weight: 500;
	}
	#playerChart .header p i{
		color: #000000;
		font-size: 1.2rem;
		font-weight: 600;
	}
	#playerChart .header p:last-child{
		padding: 4px 0 0;
	}
	/* 内容 */
	#playerChart .content{
		max-height: 60%;
		padding: 80px 0 50px 16px;
		position: relative;
	}
	#playerChart .content>ul{
		min-height: 2.8rem;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		flex-direction: row;
	}
	#playerChart .content ul li i{
		color: #F14E41;
	}
	#playerChart .content>ul>li.item{
		padding: 0 8px 0 0;
	}
	#playerChart .content>ul>li.song{
		flex: 1;
	}
	#playerChart .content ul li.icon{
		min-width: 35px;
	}
	#playerChart .content ul li.icon i{
		font-size: 1.6rem;
		padding-right: 0.4rem;
	}
	#playerChart .content .author{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	#playerChart .content .author>li:nth-of-type(1){
		max-width: 140px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/* 在歌曲名后面添加 - */
	#playerChart .content .author>li:nth-of-type(1)::after{
		content: "-";
		padding: 0 4px;
	}
	#playerChart .content .author>li:nth-of-type(n+2){
		max-width: 80px;
		color: rgba(0,0,0,0.4);
		font-size: 14px;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/* 从第二个作者名的前面开始添加 / */
	#playerChart .content .author>li:nth-of-type(n+3)::before{
		content: "/";
	}
	/* 从第四个作者开始隐藏 */
	#playerChart .content .author>li:nth-of-type(4)::after{
		content: '...';
	}
	#playerChart .content .author>li:nth-of-type(n+5){
		display: none;
	}
	
	#playerChart .close{
		width: 100%;
		text-align: center;
		line-height: 50px;
		position: fixed;
		bottom: 0;
		background-color: #f7f7f7;
	}
</style>
