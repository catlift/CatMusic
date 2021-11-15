//引入vue、vuex
import Vue from 'vue'
import Vuex from 'vuex'

//全局方法Vue.use()使用Vuex
Vue.use(Vuex)

//创建store实例
const store = new Vuex.Store({
	state: {
		// 存放状态
		audio: '',//存放歌曲的src地址
		mode: 0,//用于歌曲播放状态的切换,默认顺序播放(0:顺序播放，1:随机播放，2:单曲循环)
		stateMode: 1,//存储播放状态的图标
		currentTime: '',//存储歌曲播放已经的时长
		songList: [],//存储单首音乐的所有属性
		songsList: [],//存储多首音乐的所有属性
		songsLength: '',//存储多首音乐的长度
		topList: [],//存储排行榜
		topId: '',//存储歌单id
	},
	getters: {
		// state的计算属性
	},
	mutations: {
		// 更改state中状态的逻辑，同步操作
		songsList(store,data){
			store.songsList = data;
			store.songsLength = store.songsList.length;
		},
		songList(store,data){
			store.songList = data;
		},
		mode(store,data){
			store.mode = store.mode + data;
			store.mode = store.mode%3;
		},
		songsLength(store,data){
			store.songsLength = data;
		},
		topList(store,data){
			store.topList = data;
		},
		topId(store,data){
			store.topId = data;
		},
		stateMode(store,data){
			store.stateMode = store.stateMode + data;
			store.stateMode = store.stateMode%2;
		},
		stateActive(store,data){
			store.stateMode = data;
		},
		currentTime(store,data){
			store.currentTime = data;
		},
		
		//因为涉及太多页面了，因此将错就错了，简写方式为：
		updata(store,data){
			store.data = data;
		}
	},
	actions: {
		// 提交mutation，异步操作
	}
})

//导出store
export default store;