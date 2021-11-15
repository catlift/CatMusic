// Login路由/登录路由
export default {
    path:'/Login',
    component:()=>import('../../components/home/children/login.vue'),
	meta:{
		login: true
	}
}