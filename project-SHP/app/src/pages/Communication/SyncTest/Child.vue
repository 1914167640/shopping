<template>
  <div style="background: #ccc; height: 50px;">
    <span>小明每次花100元</span>
    <button @click="minus">花钱</button>
    爸爸还剩{{money}}元
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Child' , 
    props : ['money'] ,
    methods: {
      minus() {
        this.$emit('input:money' , this.money - 100)
      }
    }
  }
</script>
