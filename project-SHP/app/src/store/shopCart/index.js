import { reqCartList } from "@/api" 

const actions = {
  // 请求购物车
  getCartList({commit}) {
    reqCartList()
    .then(val => {
      commit('GETCARTLIST' , val.data[0] || {})
    })
    .catch(err => console.log(err))
  }
}

const mutations = {
  GETCARTLIST(state , cartInfoList) {
    state.cartInfoList = cartInfoList 
  }
}
const state = {
  cartInfoList : {}
}

const getters = {
  // 购物车信息
  cartInfoList() {
    return state.cartInfoList.cartInfoList || []
  }
}

export default {
  actions , 
  mutations , 
  state , 
  getters
}
