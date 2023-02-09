import { reqDetailInfo } from "@/api"
import { getUUID } from "@/util/uuid_token"

const actions = {
  async getDetailList({commit} , skuId) {
    let result = await reqDetailInfo(skuId)
    if(result.code === 200) commit('GET_DETAIL_LIST' , result.data)   
  }
}
const mutations = {
  GET_DETAIL_LIST(state , goodInfo) {
    state.goodInfo = goodInfo
  }
}
const state = {
  goodInfo : {} ,
  uuid : getUUID() //游客身份
}
const getters = {
  // 注:数据还没返回来的时候是undefind , 应该准备一个对象或数组
  // 导航内容
  categoryView({goodInfo}) {
    return goodInfo.categoryView || {}
  } , 
  // 商品信息
  skuInfo({goodInfo}) {
    return goodInfo.skuInfo || {}
  } , 
  // 产品售卖属性的简化
  spuSaleAttrList({goodInfo}) {
    return goodInfo.spuSaleAttrList || []
  }
}

export default {
  actions , 
  mutations , 
  state ,
  getters 
}
