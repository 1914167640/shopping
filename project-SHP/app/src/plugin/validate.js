// 这玩意就是用来给登录或注册做验证的
// vee-validate : 表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages, //转中文
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 把每个字段添加中文 , 红色字体提示哪里
    phone: '手机号',
    code: '验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
})

//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
  validate: value => {
   return value
  },
  getMessage: field => field + '必须同意'
})  