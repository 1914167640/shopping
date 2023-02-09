<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <h2>v-model底层实现原理</h2>
    <!-- @input: 输入框的数据发生变化就会调用一次函数 
        Vue2:可以通过value与input事件实现v-model功能
    -->
    <input type="text" :value="msg" @input="handler($event)">
    <span>{{ msg }}</span>
    <hr />
    <!-- 原来写法 -->
    <!-- <CustomInput :value="msg" @input="handler2"/> -->
    <!-- 简写 -->
    <CustomInput v-model="msg"/>
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  components: {
    CustomInput
  } ,
  data() {
    return {
      msg:"我是豪哥"
    }
  },
  methods: {
     //自定义事件input回调
     inputHandler(params){
        this.msg2  = params;
     } ,
     handler(e) {
      this.msg1 = e.target.value
     } , 
     handler2(val) {
      this.msg = val
     }
  },
}
</script>
