<template>
	<div class="rec">
		<Resourse></Resourse>
		<Songs></Songs>
	</div>
</template>

<script>
	import Resourse from './children/resourse.vue'
	import Songs from './children/songs.vue'
	
	export default{
		name: 'rec',
		components: {
			Resourse,
			Songs
		}
	}
</script>

<style scoped="scoped">
</style>
