<!-- 主页->我的 -->
<template>
	<div id="home">
		<User></User>
	</div>
</template>

<script>
	import User from '../../components/home/user.vue'
	
	export default{
		name: 'home',
		components:{
			User,
		}
	}
</script>

<style scoped>
	#home{
		padding-top: 2.75rem;
		background-color: #f0efef;
	}
	
	@media (min-width: 720px) {
		#home{
			padding-top: 5.5rem;
		}
	}
</style>
