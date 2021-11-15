// 传递方法
// 播放器	id="player"
// 播放列表	id="playerChart"

import Vue from 'vue'
export default new Vue()


//前提是两者都得引入本文件
//被调用者
// methods:{
// 	某个方法
// },
// mounted(){
// 	var that = this;
// 	Public.$off('为“某个方法”定义的名称');
// 	Public.$on('为“某个方法”定义的名称',function(){
// 		Public.$off('某个方法');
// 	})
// }

// 调用者
// methods:{
// 	open(){	//open()，这个是该组件的某个方法
// 		Public.$emit('为“某个方法”定义的名称');
// 	}
// }