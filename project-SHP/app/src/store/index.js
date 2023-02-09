import Vue from "vue"
import vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

// 需要使用插件
Vue.use(vuex)

// 对外暴露Store类的一个实例
export default new vuex.Store({
	modules : {
		home , 
		search , 
		detail , 
		shopCart , 
		user , 
		trade
	}
})