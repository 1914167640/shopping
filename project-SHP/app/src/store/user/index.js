import { reqSendCode , reqLogin , reqGetUserInfo} from "@/api"

const actions = {
  //向服务器发送请求获取验证码 
  async getSendCode({ commit } , phone) {
    let result = await reqSendCode(phone) 
    if(result.code === 200) {
      commit('GETSENDCODE' , result.data) 
    } else {
      console.log(result.message)
    }
  } ,
  // 登录获取token
  async getLogin({ commit } , data ) {
    let result = await reqLogin(data)
      if(result.code === 200) { 
        commit('GETLOGIN' , result.data.token) //登录成功获得token
        localStorage.setItem('token' , result.data.token) //本地存储token
      }
      return result  
  } , 
  // 校验token , 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqGetUserInfo()
    if(result.code === 200) commit('GETUSERINFO' , result.data)    
    return result
  }
}
const mutations = {
  GETSENDCODE(state , code) {
    state.stateCode = code
  } , 
  GETLOGIN(state , token) {
    state.token = token
  } , 
  GETUSERINFO(state , userInfo) {
    state.userInfo = userInfo
  }

}
const state = {
  stateCode : '' , //验证码
  token : localStorage.getItem('token') , //令牌
  userInfo : {} //用户信息
}

const getters = {

}

export default {
  actions , 
  mutations , 
  state , 
  getters
}