<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
			<div class="container">
				<div class="loginList">
					<p>尚品汇欢迎您！</p>
					<!-- 如果未登录 -->
					<p v-show="!userInfo.name">
						<span>请</span>
						<!-- 封装的组件会将按钮绑定变成自定义事件 ，要加上native-->
						<router-link to="/Login">登录</router-link>
						<router-link class="register" to="/register">免费注册</router-link>
					</p>
					<!-- 如果登录成功 -->
					<p v-show="userInfo.name" >
						<a >{{userInfo.name}}</a>
						<a @click="logOut" class="logOut"> 退出登录</a>
					</p>
					</div>
					<div class="typeList">
						<router-link to="/Center/myOrder">我的订单</router-link>
						<router-link to="/ShopCart">我的购物车</router-link>
						<router-link to="/">我的尚品汇</router-link>
						<a href="###">尚品汇会员</a>
						<a href="###">企业采购</a>
						<a href="###">关注尚品汇</a>
						<a href="###">合作招商</a>
						<a href="###">商家后台</a>
					</div>
			</div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
			<h1 class="logoArea">
				<router-link class="logo" to="/Home">
					<img src="./images/logo.png" alt="">
				</router-link>
			</h1>
			<div class="searchArea">
				<form action="###" class="searchForm">
					<input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="inpValue"/>
					<button @click="goSeach" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
				</form>
			</div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import { reqlogOut } from '@/api'
export default {
  name : 'Header' , 
	data() {
		return {
			inpValue : ''
		}
	},
	computed : {
		...mapState({ userInfo : state => state.user.userInfo})
	} , 
  methods: {  
		 //跳转search 
    goSeach(){  
			// 跳转到search页面 
			this.$router.push({
				path : '/Search' ,  
				params : {
					keyword : this.inpValue
				} , 
				// 合并参数
				query : this.$route.query
				// 面试题1:路由传递参数(对象写法)path是否可以结合params参数一起使用
				//答:不行
				// path : '/Search' , 
				// params : {
				// 	val : this.inpValue
				// }


				// 面试题二:如何params传输可传可不传
				// 比如：配置路由的时候，占位了(params) , 但是跳转路由的时候就不传递
				// 如何解决params参数可以传递可以不传递，在配置路由的时候加上一个问号
				// name : 'search' , 
				// // query : {
				// // 	val : this.inpValue
				// // } 
				// params : {
				// 	val : this.inpValue
				// }			
			}) 
			// 清空文本框的输入值
			// this.inpValue = ''
		} ,
		// 退出登录 
		logOut() {
			// 清空本地存储令牌
			localStorage.removeItem('token')
			// 清空vuex用户信息
			this.$store.state.user.userInfo = {}
			// 清空vuex令牌信息
			this.$store.state.user.token = ''
			// 清空服务器存储
			reqlogOut()
			.then(result => this.$router.push( { path : '/Home' }) )// 跳转首页
			.catch(err => console.log(err))	
		}
  } , 
	mounted() {
		//header组件收到search传递过来的值 ,  搜索完成后清空文本框的值
		this.$bus.$on('clearInputVal' , () => {
			this.inpValue = ''
		})
		// this.$store.dispatch('getUserInfo')//App组件挂载时效验token , 全体组件在header获取用户信息
	}
}
</script>

<style scoped lang="less">
.header {
  &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
          width: 1200px;
          margin: 0 auto;
          overflow: hidden;

          .loginList {
              float: left;

              p {
                  float: left;
                  margin-right: 10px;

                  .register {
                      border-left: 1px solid #b3aeae;
                      padding: 0 5px;
                      margin-left: 5px;
                  }
									.logOut:hover {
										color: #e1251b;
									}
              }
          }

          .typeList {
              float: right;

              a {
                  padding: 0 10px;

                  &+a {
                      border-left: 1px solid #b3aeae;
                  }
              }

          }

      }
  }

  &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
          float: left;

          .logo {
              img {
                  width: 175px;
                  margin: 25px 45px;
              }
          }
      }

      .searchArea {
          float: right;
          margin-top: 35px;

          .searchForm {
              overflow: hidden;

              input {
                  box-sizing: border-box;
                  width: 490px;
                  height: 32px;
                  padding: 0px 4px;
                  border: 2px solid #ea4a36;
                  float: left;

                  &:focus {
                      outline: none;
                  }
              }

              button {
								height: 32px;
								width: 68px;
								background-color: #e1251b;
								border: none;
								color: #fff;
								float: left;
								cursor: pointer;

								&:focus {
										outline: none;
								}
		
              }
							button:hover {
								background-color: #f0705f;
							}
          }
      }
  }
}
</style>