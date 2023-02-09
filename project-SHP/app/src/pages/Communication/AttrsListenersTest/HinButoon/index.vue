<template>
  <div>
    <a :title="title">
      <!-- 提示v-bind和v-on也可以使用对象式写法 : 例如 v-on="{click:aa}" -->
      <!-- 下面这种写法 , 不能以@开头 -->
      <!-- <el-button v-bind="$attrs" v-on="$listeners">信息按钮</el-button> -->
    </a>
  </div>
</template>

<script>
export default {
  name : 'HinButton' , 
  props:['title'] , 
  mounted() {
    // $attr属于组件的一个属性 , 可以获取到父组件传递过来的props数据
    // 对于子组件而言 , 父组件给的数据利用props接受 , 但是需要注意 , 如果子组件通过props接受的属性 , 在$attr属性当中是获取不到的
    console.log(this.$attrs)
    // 获取父组件的自定义事件
    console.log(this.$listeners) 
  } , 
  methods: {
    aa() {
      console.log(this)
    }
  }
}
</script>

<style>

</style>