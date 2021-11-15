<!-- 记录 -->
<template>
	<div id="record">
		<div class="header">
			<div @click="backHistory()"><i class="iconfont iconjiantou-copy-copy"></i></div>
		</div>
		
		<div class="content">
			<router-link tag="div" to="/PlayRecord">最近播放</router-link>
			<router-link tag="div" to="/Cloud">关于作者</router-link>
		</div>
		
		<div class="footer">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'record',
		methods: {
			backHistory(){//返回上一页
				//跳转页面
				this.$router.push({
					path: '/Home',
				})
			},
		}
	}
</script>

<style scoped="scoped">
	#record{
		padding: 0 0 4rem;
		background-color: #f0efef;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#record > div{
		flex: 1;
	}
	#record .router-link-active{
		color: #000;
		font-weight: 500;
		border-bottom: 2px solid #fa383b;
	}
	
	/* 头部 */
	#record .header{
		width: 100%;
		height: 2.75rem;
		background-color: #d44439;
		position: fixed;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		text-align: center;
		z-index: 77;
	}
	#record .header i{
		font-size: 1.5rem;
		padding: 3px 10px;
	}
	
	#record .content{
		padding: 3rem 2.8rem 1rem;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
	}
	#record .content > div{
		padding: 0 20px;
	}
	
	#record .footer{
		height: 100vh;
		padding: 0 10px 10px;
	}
</style>
