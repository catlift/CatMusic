import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../views/index.vue'	//主页
import HomeRouter from './Home'			//我的
import RecRouter from './Rec'			//推荐
import Dynamic from './Dynamic'			//动态
import Search from './Search'			//搜索
import Record from './Record'	//播放记录、云盘

import Login from './Home/login.js'		//登录
import UserDetail from './Home/userDetail.js'	//用户详情(需要登录后查看)
import SearchDetail from './Search/searchDetail.js'		//搜索详情
import PlayList from './Home/playList.js'	//歌单

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',//去掉路径的 "#" 	mode-->hash/history,打包时需要将history改为hash
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: '/Index',
			component: Index,
			children:[
				HomeRouter,
				RecRouter,
				Dynamic,
				Search,
				Record,
				
				Login,
				UserDetail,
				SearchDetail,
				PlayList,
				{
					path: '/*',
					redirect: '/Home'
				}
			]
		}
	]
})