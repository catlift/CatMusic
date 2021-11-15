<!-- 登录界面 -->
<template>
	<div id="login">
		<div class="header">
			<ul>
				<li @click="backHistory()"><i class="iconfont iconjiantou-copy-copy"></i></li>
				<li><h2>手机号登录</h2></li>
			</ul>
		</div>
		
		<form action="">
			账号：<input type="text" placeholder="请输入您的手机号" v-model="formMes.phone" @keyup.enter="onSubmit()">
			<div class="falsePhone" v-show="isPhone">手机号输入错误</div>
			<br>
			密码：<input type="password" placeholder="请输入您的密码" v-model="formMes.password" @keyup.enter="onSubmit()"><br>
			<input type="button" value="点击登录" class="submit" @click="onSubmit()">
		</form>
		
		<div class="falseLogin" v-show="isLogin">手机号或密码输入错误</div>
	</div>
</template>

<script>
	export default{
		name: 'login',
		data(){
			return{
				isPhone: false,		//手机号时输入错误出现
				isLogin: false,		//账号密码输入错误出现
				formMes:{	//	存储用户输入的账号和密码
					phone : '',
					password: ''
				},
				userList: []	//存储用户提交后返回的数据
			}
		},
		methods:{
			backHistory(){//返回上一页
				this.$router.go(-1);
			},
			onSubmit(){		//点击登录,账号密码的验证
				var myreg=/^[1][0-9]{10}$/;//正则表达式限制1开头，后面十位数字0~9之间
				if (!myreg.test(this.formMes.phone)) {
					this.isPhone = true;
					this.formMes.phone = '';
				}else {
					/* json格式提交： {'phone':'','password':''}*/
					//let formData = JSON.stringify(this.formMes);
					//console.log(formData);
					
					//提交数据，把输入的账号密码和api的账号密码进行验证
					this.$axios({
						method:"get",
						url:"/login/cellphone?phone=" + this.formMes.phone + '&password=' + this.formMes.password,
					}).then((res)=>{
						this.userList = res.data;
						//console.log(this.userList);
						//console.log(res);
						if(this.userList.message){//判断是否有‘密码错误’，
							this.isLogin = true;	//显示‘手机号或密码输入错误’文本
							this.formMes.password = '';
						}else{
							//存储用户id
							var storage = null;
							if(window.localStorage){
								storage = window.localStorage;
								storage.setItem("userId",this.userList.account.id);//存储
								//storage.removeItem("historyList");//移除
							}
							//跳转页面并传递数据
							this.$router.push({
								path: '/Home',
								query: {
									userId: this.userList.account.id
								}
							});
						}
					});
				}
			}
		},
		computed: {	//监听自定义变量
			search(){	//监听搜索框
				return this.formMes.phone;
			}
		},
		watch: {	//深度监听 icon="search"
			search(newValue){
				if(newValue != ''){
					this.isPhone = false;
				}
			}
		},
	}
</script>

<style>
	#login{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 200;
	}
	
	/* 头部的样式 */
	#login .header{
		width: 100%;
		height: 2.75rem;
		color: #f7f7f7;
		background-color: #d44439;
		display: flex;
		display: -webkit-flex;
	}
	#login .header ul{
		width: 100%;
		display: flex;
		display: -webkit-flex;
		align-items: center;
		justify-content: center;
	}
	#login .header ul li:nth-of-type(1) i{
		font-size: 1.8rem;
	}
	#login .header ul li:nth-of-type(2){
		flex: 1;
		text-align: center;
		font-size: 0.8rem;
	}
	
	/* 输入的账号密码 */
	#login form{
		padding: 30px;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}
	#login form input{
		flex: 1;
		border: none;
		outline: none;
		font-size: 20px;
		border-bottom: 1px solid rgba(0,0,0,0.4);
		margin: 10px;
		background-color: rgba(0,0,0,0);
	}
	#login form input.submit{
		flex: 1;
		height: 2rem;
		color: #f7f7f7;
		background-color: #d44439;
		border: none;
		border-radius: 2%;
	}
	
	/* 手机、账号和密码错误时显示 */
	.falsePhone{
		color: #d44439;
		padding: 0 0 0 10px;
	}
	.falseLogin{
		color: #d44439;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -24px;
	}
</style>
