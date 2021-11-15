// 用户详情路由
export default {
    path:'/PlayList',
    component:()=>import('../../components/player/playList.vue'),
	meta:{
		detail: true,
		bottom: '0'
	}
}