<template>
	<div id="cloud">
		<ul v-for="(item,index) in authorList" :key="index">
			<li>{{item}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		name: 'cloud',
		data (){
			return{
				authorList: [
					'本来这个页面是获取用户云盘数据的',
					'但想了想，还是不写了,太过于麻烦',
					'虽然还有一个很奇怪的BUG。。。'
				],//存储信息
			}
		}
	}
</script>

<style scoped="scoped">
	#cloud {
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#cloud > ul{
		flex: 1;
		padding: 10px;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		border-bottom: 1px solid rgba(0,0,0,0.4);
		position: relative;
	}
</style>
