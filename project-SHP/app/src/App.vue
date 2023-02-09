<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- 首页、搜索显示 , 登录、注册隐藏 -->
    <Footer v-show="$route.meta.isFooter"/>
  </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'
export default {
  name: 'App'  , 
  data() {
    return {
      msg : 'aaa'
    }
  },
  components: { Header , Footer} , 
  mounted() {
    // 通知Vuex发送请求 , 获取数据 , 存储于仓库中
    // 你的疑问:三级菜单的数据接口干啥要App这?
    // 答:APP组件,无论你怎么切换都只挂载一次 , 把请求放在APP组件可以减少服务器压力
    
    // 三级菜单接口请求
    this.$store.dispatch('categoryList')



  }
}
</script>

<style scoped>

</style>
