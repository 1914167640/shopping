<template>
  <div style="background: #ccc; height: 50px;">
    <h3>儿子小明: 有存款: {{money}}</h3>
    <button @click="giveMoney">给BABA钱: 50</button>
  </div>
</template>

<script>
import mixin from './myMixin/mixin'
export default {
  name: 'Son' , 
  mixins : [mixin] , 
  data () {
    return {
      money: 30000
    }
  }
}
</script>
