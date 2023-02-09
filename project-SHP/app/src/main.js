import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'

import elementUi from 'element-ui';
import VueLazyload from 'vue-lazyload'
// import validate from '@/plugin/validate'


Vue.use(elementUi)

// 注册三级联动页面的全局组件
// 参数一:组件名字   参数二：组件
Vue.component(TypeNav.name ,  TypeNav)
// 注册分页器全局组件
Vue.component(Pagination.name , Pagination)


// 引入mockserver.js数据--mock数据
import './mock/mockServer'
// 引入swiper的css样式
import 'swiper/css/swiper.css'
// 引入懒加载的图片
import atm from './assets/Ultraman.webp'
Vue.use(VueLazyload , {
  //懒加载图片 
  loading : atm
})



const vm = new Vue({
  render: h => h(App) , 
  router , // 路由 , vm、vc都有这个属性
  store , //引入vuex就可以在vm实例或vc实例生成store属性
  beforeCreate() {
    Vue.prototype.$bus = this //全局事件总线
  }
}).$mount('#app')




