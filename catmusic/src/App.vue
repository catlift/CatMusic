<template>
	<div id="app">
		<!-- keep-alive 防止重复渲染dom 简单来说就是不刷新-->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<!-- <router-view></router-view> -->
	</div>
	<!-- 外部添加div即可不报错 -->
</template>

<style>
	*{
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
