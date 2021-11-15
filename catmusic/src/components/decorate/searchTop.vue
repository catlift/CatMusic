<!-- 搜索框 -->
<template>
	<!-- !$route.meta.detail 用于控制是否显示，目前使用的有：用户详情路由、搜索详情路由 -->
	<div id="searchTop" v-show="!$route.meta.detail">
		<ul>
			<li>CATAMUSIC</li>
			<!-- 列表、进入搜索界面的图标 -->
			<router-link tag="li" :to="item.page" v-for="(item,index) in list" :key="index">
				<i :class="item.text"></i>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'searchTop',
		data(){
			return {
				list: [		//存储跳转的路由、图标
					{page: '/Record',text: 'iconfont iconliebiao'},
					{page: '/Search',text: 'iconfont iconsousuo'}
				]
			}
		}
	}
</script>

<style scoped>
	#searchTop{
		width: 100%;
		height: 2.75rem;
		color: #e4e4e4;
		background-color: #d44439;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 14px;
		z-index: 10;
	}
	
	#searchTop ul{
		display: flex;
		align-items: center;
	}
	/* 列表 */
	#searchTop ul li:nth-of-type(2){
		position: absolute;
		left: 0;
	}
	/* 搜索 */
	#searchTop ul li:nth-of-type(3){
		position: absolute;
		right: 10px;
	}
	
	/* 图标大小 */
	#searchTop ul li:nth-of-type(2) i{
		font-size: 2rem;
	}
	#searchTop ul li:nth-of-type(3) i{
		font-size: 1.6rem;
	}
</style>
