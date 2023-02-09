<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <button @click="plus">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child2' , 
    props : ['money'] , 
    methods: {
      plus() {
        this.$emit('update:money' , this.money - 100)
      }
    }
  }
</script>
