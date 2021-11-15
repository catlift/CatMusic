// Record路由/记录路由
export default {
    path:'/Record',
    component:()=>import('../../views/record'),
	meta: {
		istrun: true,
		detail: true,
		bottom: '0'
	},
	children:[
		{
			path:'/Cloud',
			component:()=>import('../../components/record/cloud.vue'),
			meta: {
				istrun: false,
				detail: true,
				bottom: '0'
			},
		},
		{
			path:'/PlayRecord',
			component:()=>import('../../components/record/playRecord.vue'),
			meta: {
				istrun: false,
				detail: true,
				bottom: '0'
			},
		},
		{
			path: '/Record',
			redirect: '/PlayRecord'
		}
	]
}