<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件</h2>
    <input type="text" :value="money" @input="$emit('input' , $event.target.value)">
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput' , 
    props : ['money'] , 
    methods: {
      handler() {
        console.log(66)
      }
    }
  }
</script>
