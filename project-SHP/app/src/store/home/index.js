// 三级菜单
// 轮播图
// floor
import {reqCategoryList , reqContainerList , reqFloorList} from '../../api/index'

// 可以书写自己的业务逻辑 , 也可以执行异步
const actions = {
	async categoryList({commit}){
		// 获取三级菜单数据
		let result = await reqCategoryList()
		if(result.code === 200) commit('CATEGORYLIST_LIST' , result.data)	
	}	, 
	
	// 获取轮播图数据
	getBannerList({commit}) {
		return reqContainerList //axios的二次封装
		// .then((val) => {
		// 	console.log('请求轮播图数据')
		// 	commit('GET_BANNERLIST' , val.data)
		// })
	} , 
	async getFloorList({commit}){
		let result = await reqFloorList()
		if(result.code === 200) commit('GET_FloorLIST' , result.data)
	}
}

// 修改state的唯一手段
const mutations = {
	CATEGORYLIST_LIST(state , containerList){
		state.containerList = containerList
	} , 

	GET_BANNERLIST(state , bannerList){
		console.log('更改轮播图数据')
		state.bannerList = bannerList
	} ,

	GET_FloorLIST(state , floorList) {
		state.floorList = floorList
	}
}

//仓库中存储数据的地方 
const state = {
	// 三级菜单数据
	containerList : [] , 

	// 轮播图数据
	bannerList : [] , 

	// floor数据
	floorList : []

}

export default {
	actions,
	mutations,
	state
}