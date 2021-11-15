<!-- 底部选项卡 -->
<template>
	<!-- $route.meta.istrun 判断组件是否需要显示 布尔值：istrun -->
	<div id="switchBottom" v-show="$route.meta.istrun">
		<ul>
			<router-link tag="li" :to="item.page" v-for="(item,index) in list" :key="index">
				<span>{{item.text}}</span>
			</router-link>
		</ul>
	</div>
</template>

<script scoped>
	export default{
		name: "switchBottom",
		data(){
			return {
				list: [
					{page: '/Rec',text: '推荐'},
					{page: '/Home',text: '我的'},
					{page: '/Dynamic',text: '动态'}
				]
			}
		}
	}
</script>

<style>
	#switchBottom ul{
		width: 100%;
		height: 2.75rem;
		color: #e4e4e4;
		background-color: #d44439;
		position: fixed;
		bottom: -1px;
		left: 0;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-size: 14px;
		z-index: 10;
	}
	#switchBottom ul li{
		flex: 1;
	}
	/* 被选中是的class值 */
	.router-link-active{
		font-weight: 700;
		color: #f1f1f1;
	}
	.router-link-active span{
		border-bottom: 2px solid #f1f1f1;
	}
	
	/* 媒体查询 */
	@media (min-width: 720px) {
		#switchBottom ul{
			top: 2.7rem;
			font-size: 14px;
		}
		#switchBottom ul li{
			font-size: 1.2rem;
		}
		#switchBottom ul li br{
			display: none;
		}
	}
</style>
