<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 原生Dom绑定系统事件 -->
    <pre @click="handler" ref="pre">本是同根生,相煎何太急</pre>
    <!-- Event1组件:Event1非原生Dom组件 , 而click并非原生Dom事件 , 而是自定义事件
        @click.native , 可以把自定义事件变为原生DOM事件
        当前原生DOMclick事件 , 其实是给子组件的根节点绑定了点击事件 --- 利用到了事件的委派
    -->
    <Event1 @click.native="handler1"></Event1>
    <hr />
    <!-- 下面的写法是给原生DOM绑定自定义事件 , 给原生DOM绑定自定义时间没有任何意义因为没有办法触发$emit函数 -->
    <pre @memeda="handler2">
       大江东去浪淘尽,千古风流人物
    </pre>
    <Event2 @click="handler3" @xxx="handler4" @zzz="handler4"></Event2>
    <hr />
    <!-- 自定义事件 -->
    <el-button @click="ceshi" type="success">我是按钮</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    //点击事件的回调
   handler(e){
       this.$refs.pre.style.color="red"
       console.log('我是原生DOM事件',e)
   },
   handler1(){
     console.log('event1事件回调测试')
   },
   handler2(){
    console.log(666)
   }
   ,
   handler3(params){
      console.log(params)
   },
   handler4(params){
      console.log(params)
   },
   ceshi(e){
     console.log(e)
   }
  }
}
</script>
