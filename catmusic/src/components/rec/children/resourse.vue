<!-- 推荐的歌单 -->
<template>
	<div id="resourse">
		<h2>推荐歌单</h2>
		<div class="resList">
			<ul v-for="(item,index) in resourseList" :key="index" @click="toPLayList(resourseList[index].id)">
				<li class="bg"><img v-lazy="item.picUrl" alt=""></li>
				<li>
					<ul class="text">
						<li class="count">播放次数：
							{{item.playCount > 100000 ? 
								(Math.floor(item.playCount/10000) > 10000 ? Math.floor(item.playCount/10000000)/10 + ' 亿' : Math.floor(item.playCount/10000) + ' 万')
							: item.playCount
							}}
						</li>
						<li class="name">{{item.name}}</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'resourse',
		data() {
			return{
				resourseList: [], //存储推荐歌单
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
		},
		created() {
			//链接api
			this.$axios.get('/personalized?limit=5')
			.then(res => {
				//console.log(res.data.result);
				this.resourseList = res.data.result;
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
</script>

<style scoped="scoped">
	#resourse{
		min-height: 41rem;
		padding: 10px;
	}
	
	#resourse .resList{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#resourse .resList > ul{
		flex: 1;
		padding: 10px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.4);
	}
	
	#resourse .resList > ul .bg img{
		width: 6rem;
		height: 6rem;
		border-radius: 8px;
	}
	
	#resourse .resList > ul li .text{
		flex: 1;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		padding: 0 20px;
	}
	#resourse .resList > ul li .text > li{
		padding: 5px 0;
	}
	
	#resourse .resList > ul li .count{
		font-size: 12px;
		font-weight: 600;
	}
</style>
