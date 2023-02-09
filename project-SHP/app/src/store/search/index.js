import { reqSearchinfo } from "@/api" 

// 可以书写自己的业务逻辑 , 也可以执行异步
const actions = {
  // 获取search模块数据
  getSearchinfo({commit} , params={}){
    // 默认传一个空对象
    reqSearchinfo(params)
    .then((val) => {
      commit('GETSEARCHINFO' , val.data)
    })
  }
}

// 修改state的唯一手段
const mutations = {
  GETSEARCHINFO(state , searchinfo) {
    state.searchinfo = searchinfo
  }
}

//仓库中存储数据的地方 
const state = {
  searchinfo:{}
}

//为了简化数据 
const getters = {
  // 商品
  goodsList(state) {
    // 网络不好的情况下返回一个新数组
    return state.searchinfo.goodsList || []
  } , 
  // 商标
  trademarkList(state){
    return state.searchinfo.trademarkList || []
  } , 
  attrsList(state) {
    return state.searchinfo.attrsList || []
  }
}

export default {
  actions ,
  mutations ,
  state , 
  getters
}