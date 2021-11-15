<!-- 排行榜 -->
<template>
	<div class="dynamic">
		<h2>榜单推荐</h2>
		<SlideShow></SlideShow>
		<br>
		<h2>榜单详情</h2>
		<Toplist></Toplist>
	</div>
</template>

<script>
	import SlideShow from './children/slideShow.vue'
	import Toplist from './children/toplist.vue'
	
	export default{
		name: 'dynamic',
		components: {
			SlideShow,
			Toplist
		},
		created() {
			//链接api
			this.$axios.get('/toplist')
			.then(res => {
				//console.log(res.data.list);
				this.$store.commit('topList',res.data.list);
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
</script>

<style scoped="scoped">
	.dynamic{
		padding: 10px;
	}
</style>
