<!-- 用户详情页面 -->
<template>
	<div id="userDetail">
		<div class="header" >
			<div @click="backHistory()"><i class="iconfont iconjiantou-copy-copy"></i></div>
			<p></p>
		</div>
		
		<div class="bg">
			<!-- 用户背景 -->
			<img v-lazy="list.backgroundUrl" alt="">
		</div>
		
		<div class="user">
			<ul>
				<!-- 用户头像 -->
				<li class="userHeader"><img v-lazy="list.avatarUrl" alt=""></li>
				<!-- 用户昵称 -->
				<li class="userName"><h2>{{list.nickname}}</h2></li>
				<!-- 用户关注/粉丝/动态/等级 -->
				<li class="userFollew">
					<ul>
						<li>{{list.follows}}<span>关注</span></li>
						<li>{{list.followeds}}<span>粉丝</span></li>
						<li>{{list.authority}}<span>动态</span></li>
						<li>LV.{{level}}</li>
					</ul>
				</li>
				<!-- 用户个性签名 -->
				<li class="signature"><p>{{list.signature}}</p></li>
			</ul>
		</div>
		
		<div class="exitUser" @click="exitUser()">退出登录</div>
	</div>
</template>

<script>
	export default{
		name: 'userDetail',
		data(){
			return {
				userId: this.$route.query.userId,//通过登陆后获得用户id
				list: [],	//存储用户信息
				level: ''	//存储用户等级
			}
		},
		methods: {
			backHistory(){//返回上一页
				this.$router.go(-1);
			},
			exitUser(){
				//删除用户id
				var storage = null;
				if(window.localStorage){
					storage = window.localStorage;
					storage.removeItem("userId");//移除
				}
				
				this.$router.push({
					path: '/Home',
					query: {
						userId: ''
					}
				});
			}
		},
		created() {
			if(this.userId){
				this.$axios.get('/user/detail?uid=' + this.userId)
				.then(res => {
					this.list = res.data.profile;
					this.level = res.data.level;
					//console.log("我拿到的数据：", res.data);
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped="scoped">
	#userDetail{
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: #f0efef;
		position: relative;
		padding: 2.75rem 0 6.875rem 0;
	}
	/* 头部 */
	#userDetail .header{
		flex: 1;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		padding: 10px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: rgba(255,255,255,0.2);
	}
	#userDetail .header i{
		color: #f7f7f7;
		font-size: 2rem;
	}
	#userDetail .header p{
		flex: 1;
	}
	/* 用户的背景 */
	#userDetail .bg{
		flex: 1;
		width: 100%;
		height: 100%;
		max-height: 30rem;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		/* overflow: hidden; */
	}
	#userDetail .bg img{
		flex: 1;
		width: 100%;
	}
	/* 用户的信息 */
	#userDetail .user{
		width: 90%;
		position: relative;
		margin-top: 50%;
		border-radius: 10px;
		background-color: #f7f7f7;
		opacity: 0.9;
	}
	#userDetail .user ul{
		width: 100%;
		height: 100%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	#userDetail .user .userHeader{
		width: 100%;
		max-width: 5rem;
		margin: -2rem 0 0 0;
	}
	#userDetail .user .userHeader img{
		width: 100%;
		border-radius: 100%;
		border: 2px solid #fff;
	}
	/* 用户的粉丝、动态之类的样式 */
	#userDetail .user .userFollew ul{
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		padding: 4px;
	}
	#userDetail .user .userFollew ul li{
		border-right: 2px solid rgba(0,0,0,0.3);
		padding: 0 10px;
	}
	#userDetail .user .userFollew ul li:nth-of-type(4){
		border: none;
	}
	#userDetail .user .userFollew ul li span{
		padding-left: 8px;
	}
	/* 用户个性签名 */
	#userDetail .user .signature{
		width: 100%;
		text-align: center;
		font-size: 14px;
		padding: 2px 10px 15px;
		color: #A4A4A4;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
	}
	#userDetail .user .signature p{
		width: 90%;
		/* 字数限制 */
		white-space: nowrap;
		text-overflow:ellipsis;
	}
	
	#userDetail .exitUser{
		color: #f00;
		font-size: 18px;
		position: relative;
		z-index: 10;
	}
</style>
