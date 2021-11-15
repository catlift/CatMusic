<!-- 主页 -->
<template>
	<div id="index">
		<div>
			<SearchTop></SearchTop><!-- 顶部选项卡 -->
			<SwitchBottom></SwitchBottom><!-- 底部选项卡 -->
			<Player></Player><!-- 播放器 -->
		</div>
		<div>
			<PlayerChart></PlayerChart><!-- 播放列表 -->
		</div>
		<div>
			<PlayerSong></PlayerSong><!-- 播放页面 -->
		</div>
		<!-- 用于路由跳转显示 -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import SwitchBottom from '../components/decorate/switchBottom.vue'
	import Player from '../components/player/player.vue'
	import PlayerChart from '../components/player/playerChart.vue'
	import SearchTop from '../components/decorate/searchTop.vue'
	import PlayerSong from '../components/player/playerSong.vue'
	
	export default{
		name: 'index',
		components: {
			SwitchBottom,
			Player,
			PlayerChart,
			SearchTop,
			PlayerSong
		}
	}
</script>

<style scoped>
	#index{
		width: 100%;
		position: relative;
	}
</style>
