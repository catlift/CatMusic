// 用户详情路由
export default {
    path:'/UserDetail',
    component:()=>import('../../components/home/children/userDetail.vue'),
	meta:{
		detail: true,
		bottom: '0',
	}
}