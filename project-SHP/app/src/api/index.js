// 当前这个模块：API进行统一的管理
import requests from "./request"

// 模拟请求
import makeRequests from './makeRequest'


// 三级联动接口
// /api/product/getBaseCategoryList Get
export const reqCategoryList = () => requests({ url : '/product/getBaseCategoryList' , method : 'get' })

// 模拟轮播图接口
export const reqContainerList = () => makeRequests({ url : 'banners' , method : 'get' })


// 模拟floor接口
export const reqFloorList = () => makeRequests({ url : 'floors' , method : 'get' })

// 搜索接口
export const reqSearchinfo = (params) => requests({ url : '/list' , method : 'post' , data : params })
// export const reqSearchinfo = (params) => requests.post('/list' , params)

// 产品详情接口
export const reqDetailInfo = (skuId) => requests({ url : `/item/${skuId}` , method : 'get' })

// 添加到购物车((对已有物品进行数量改动))
export const reqAddToCart = (skuId , skuNum) => requests({ url : `/cart/addToCart/${skuId}/${skuNum}` , method : 'post' })

//购物车列表接口(请求头)
export const reqCartList = () => requests({ url : '/cart/cartList' , method : 'get' })

// 删除购物车商品
export const reqDeleteCart = (skuId) => requests({ url : `/cart/deleteCart/${skuId}` , method : 'DELETE' })

// 切换商品选中状态
export const reqCheckCart = (skuId , isChecked) => requests({ url : `/cart/checkCart/${skuId}/${isChecked}`, method : 'get' })

// 获取验证码
export const reqSendCode = (phone) => requests({ url : `/user/passport/sendCode/${phone}` , method : 'get' })

// 注册
export const reqRegister = (data) => requests({ url : '/user/passport/register' , data , method : 'post'})

// 登录
export const reqLogin = (data) => requests({url : '/user/passport/login' , data , method : 'post'})

// token校验(请求头)
export const reqGetUserInfo = () => requests({ url : '/user/passport/auth/getUserInfo' , method : 'get' })

// 退出登录
export const reqlogOut = () => requests({ url : '/user/passport/logout' , method : 'get' }) 

// 获取收件人信息(需要登录)
export const reqUserAddress = () => requests({ url : '/user/userAddress/auth/findUserAddressList' , method : 'get' }) 

// 获取交易页信息(需要登录)
export const reqTradeInfo = () => requests({ url : '/order/auth/trade' , method : 'get' }) 

// 提交订单
export const reqSubmitOrder= (tradeNo , data) => requests({ url : `/order/auth/submitOrder?tradeNo=${tradeNo}` , data , method : 'post' }) 

//获取订单支付信息
export const reqCreateNative = (orderId) => requests({ url : `/payment/weixin/createNative/${orderId}` , method : 'get' })

//查询支付订单状态
export const reqQueryPayStatus= (orderId) => requests({ url : `/payment/weixin/queryPayStatus/${orderId}` , method : 'get' })

// 获取我的订单列表
export const reqMyOrder= (page , limit) => requests({ url : `/order/auth/${page}/${limit}` , method : 'get' })