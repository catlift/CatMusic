<!-- 动态 -->
<template>
	<div id="dynamic">
		<Dynamic></Dynamic>
	</div>
</template>

<script>
	import Dynamic from '../../components/dynamic/dynamic.vue';
	
	export default{
		name: 'dynamic',
		components: {
			Dynamic
		}
	}
</script>

<style scoped>
	#dynamic{
		padding: 2.75rem 0 6.875rem;
		background-color: #f0efef;
	}
</style>
