// Search路由/搜索详情路由
export default {
    path:'/SearchDetail',
    component:()=>import('../../components/search/searchDetail.vue'),
	meta: {
		istrun: false,
		bottom: '0',
		detail: true
	}
}