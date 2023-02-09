<template>
  <div>
		<!-- 卡片 -->
		<el-card>
			<!-- <h3>注册新用户<span class="go">我有账号，去 <router-link to="/Login">登陆</router-link></span></h3> -->
			<!-- 注册表单 -->
			<el-form :model="form" :rules="rules" ref="form" label-width="80px" :inline="false" size="normal" style="position: relative;top: 50px;">
				<!-- 手机号 -->
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="form.phone" ></el-input>
				</el-form-item>
				<!-- 验证码 -->
				<el-form-item label="验证码" >
					<el-form label-width="80px" :model="form" :rules="rules" :inline="true" size="normal" ref="codeForm">
						<el-form-item prop="code">
							<el-input v-model="form.code"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="getPhone">获取验证码</el-button>
						</el-form-item>				
					</el-form>
				</el-form-item>
				<!-- 登录密码 -->
				<el-form-item label="登录密码" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				<!-- 确认密码 -->
				<el-form-item label="确认密码" prop="password1">
					<el-input v-model="form.password1" type="password"></el-input>
				</el-form-item>
				<!-- 是否勾选 -->
				<el-form-item >
					<el-form :model="form" :rules="rules" :inline="true" size="normal" ref="agreeFrom">
						<el-form-item size="normal" prop="agree">
							<el-checkbox label="同意协议并注册《尚品汇用户协议》" name="type" v-model="form.agree"></el-checkbox>
						</el-form-item>
						<el-form-item size="normal">
							<el-button style="background-color: #e1251b;color: white;" size="default" @click="register()">完成注册</el-button>	
						</el-form-item>
					</el-form>
				</el-form-item>				
			</el-form>
		</el-card>	
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqRegister } from '@/api'
export default {
  name : 'Register' ,
	data() {
		// 手机号判断
		let isPhone = (rule, value, callback) => {
			let reg = /^1[3-9][0-9]{9}$/
			if(value === '') {
				return callback(new Error('手机号不能为空'))
			}
			if ( !reg.test(value) ) {
				return callback(new Error('请输入正确的手机号码'))
			}
			callback() 
		}
		//验证码判断
		let isCode = (rule, value, callback) => {
			let reg = /^\d{6}$/
			if(value === '') {
				return callback(new Error('验证码不能为空'))
			}
			if ( !reg.test(value) ) {
				return callback(new Error('验证码必须是6位数字'))
			} 
			callback()
		}
		// 密码
		let isPassword = (rule, value, callback) => {
			let reg = /^[0-9A-z]{8,20}$/
			if(value === '') {
				return callback(new Error('密码不能为空'))
			}
			if ( !reg.test(value) ) {
				return callback(new Error('请输入正确的密码'))
			} 
			callback()
		}
		// 再次输入密码
		let isPassword1 = (rule, value, callback) => {
			if(value === '') {
				return callback(new Error('请再次输入密码'))
			}
			if(value !== this.form.password) {
				return callback(new Error('两次输入密码不一致'))
			}
			callback()
		}
		// 勾选
		let isAgree = (rule, value, callback) => {
			if(!value) {
				return callback(new Error('勾选才能完成注册'))
			} else{
				callback()
			}
			
		}
		return {
			form : { //表单
				phone : '' ,// 获取手机号码
				code : '' , //验证码
				password : '' , //登录密码
				password1 : '' , //再次确认密码		
				agree : false ,  //是否同意	
			} ,	
			rules: { //表单验证
				phone : [ { validator: isPhone, trigger: 'blur' } ] , //手机号
				code: [ { validator: isCode, trigger: 'blur' } ] , //验证码
				password: [ { validator: isPassword , trigger: 'blur' } ] , //密码
				password1: [ { validator: isPassword1 , trigger: 'blur' } ] ,//再次密码
				agree : [ { validator: isAgree , trigger: 'change' } ] //是否勾选
			}
		}
	} , 
	computed : {
		...mapState({ stateCode : state => state.user.stateCode }) 
	} , 
	methods: {
		// 获取验证码
		async getPhone() {
			let {form} = this
			form.phone !== '' ? await this.$store.dispatch('getSendCode' , form.phone) : this.$message('请输入手机号')//手机号不为空时 , 向服务器发送请求
			this.form.code = this.stateCode
		}	,
		// 完成注册
		register() {
			let { form , $refs} = this
			$refs.form.validate( valid => { //判断手机号 登录密码 确认密码
				if( valid ) {
					$refs.codeForm.validate( isCode => { //判断验证码
						if( isCode ) {
							$refs.agreeFrom.validate( async isAgree => { //判断勾选框
								if( isAgree ) {
									// 整理form参数
									let data = { phone : form.phone , code : form.code , password : form.password}
									let result = await reqRegister(data)
									console.log(result)
									if (result.code === 200) {
										this.$message.success('注册成功')
										this.$router.push( { path : '/Login'} )
									} else {
										this.$message(result.message)
									}
								}
							})
						}
					})
				} 		
			})
		}
	} 
}
</script>

<style scoped lang="less">

.el-card {
	width:800px;
	height:470px;
	margin: 0px auto;
	.el-form:nth-of-type(1){
		width: 500px;
		margin: 0px auto;
	}

}
.copyright {
	width: 1200px;
	margin: 0 auto;
	text-align: center;
	line-height: 24px;

	ul {
		li {
			display: inline-block;
			border-right: 1px solid #e4e4e4;
			padding: 0 20px;
			margin: 15px 0;
		}
	}
}
</style>