import VueRouter from "vue-router"
import Vue from 'vue'
import routes from './routes'
import store from '@/store'

//路由也是一个插件
Vue.use(VueRouter)

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this , location).catch(err => err)
}

const route = new VueRouter({
  // 要配置路由请去routes组件
  routes , 
  // 路由组件管动画到顶部 
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  } , 
}) 
// 路由全局前置守卫————初始化时被调用、每次路由切换之前被调用
route.beforeEach( async (to , from , next) => {
  // to:你要去的地方    from : 你开始的地方    next():放行     next('/path') 指定   next(false) : 跳回开始
  // 用户登录了
  if ( localStorage.getItem('token') ) {
    if ( to.path === '/Login' || to.path === '/register') {//如果想跳转login 或 注册页
      next('/')
    } else { //跳转其他页面   
      if( store.state.user.userInfo.name ) { //如果存在数据 , 就放行
        next()
      } else {  //如果不存在数据 , 就重新请求获取数据
        let result = await store.dispatch('getUserInfo')
        if (result.code === 200) {
          next()
        } else {
          alert('身份过期 , 请重新登录')
          localStorage.removeItem('token') //清空令牌
          next('/')
        }
      }   
    }
  }else { //用户未登录
    if(to.path === '/Trade' || to.path === '/Pay' || to.path.indexOf('Center') !== -1) { //未登录不能去trade(交易)、pay、PaySuccess(支付)、myOrder(我的订单)
      next(`Login?redirect=${to.path}`) // 未登录 , 跳转到登录 , 并传递一个参数 , 登录后可以获取这个参数 , 跳转到开始的页面
    } else {
      next()//放行
    }
  }
})
export default route
