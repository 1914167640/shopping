<template>
  <div>
    小明的爸爸现在有{{money}}元
    <h2>不使用sync修改符</h2>
    <!-- 给子组件绑定一个自定义事件:update:money -->
    <child :money="money" @input:money="handler" />
    <h2>使用sync修改符</h2>
    <!-- :money.sync:第一，父组件给字符串传递props money
        第二 , 给当前子组件绑定了一个自定义事件 , 而且事件名称为update : money
    -->
    <child2 :money.sync="money"/>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  export default {
    name: 'SyncTest',
    components: {
      Child,
      Child2
    },
    data() {
      return {
        money:10000 ,
      }
    },
    methods:{
      handler(money){
        this.money = money
      }
    }
  }
</script>
