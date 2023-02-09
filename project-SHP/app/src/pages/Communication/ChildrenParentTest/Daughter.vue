<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="giveMoney">给BABA钱: 100</button>
  </div>
</template>

<script>
import mixin from './myMixin/mixin'
export default {
  name: 'Daughter' , 
  mixins : [mixin] , 
  data () {
    return {
      money: 20000
    }
  } 
}
</script>
