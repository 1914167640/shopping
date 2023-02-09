
import { reqUserAddress , reqTradeInfo} from "@/api"

const actions = {
  getUserAddress({commit}) { //获取用户地址
    reqUserAddress()
    .then(result => commit('GETUSERADDRESS' , result.data))
    .catch(err => console.log(err))
  } , 
  getTradeInfo({commit}) { //获取交易信息
    reqTradeInfo()
    .then((result) => {
      console.log(result)
      commit( 'GETTRADEINFO', result.data)
    })
    .catch(err => console.log(err))
  }
}
const mutations = {
  GETUSERADDRESS(state , userAddress) {
    state.userAddress = userAddress
  } , 
  GETTRADEINFO(state , tradeInfo) {
    state.tradeInfo = tradeInfo
  }
}
const state = {
  userAddress : [] , //用户地址
  tradeInfo : {} //交易信息
}

const getters = {

}

export default {
  actions , 
  mutations , 
  state , 
  getters
}