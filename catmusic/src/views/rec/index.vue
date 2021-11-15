<!-- 推荐 -->
<template>
	<div id="rec">
		<Rec></Rec>
	</div>
</template>

<script>
	import Rec from '../../components/rec/rec.vue'
	
	export default{
		name: 'rec',
		components:{
			Rec,
		}
	}
</script>

<style scoped>
	#rec{
		padding: 2.75rem 0 6.875rem;
		background-color: #f0efef;
	}
</style>
