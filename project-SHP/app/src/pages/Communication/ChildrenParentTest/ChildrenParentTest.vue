<template>
  <div>
    <h2>BABA有存款: {{ money }}</h2>
    <button @click="borrowFromXM">找小明借钱100</button><br />
    <button @click="borrowFromXH">找小红借钱150</button><br />
    <button @click="borrowFromAll">找所有孩子借钱200</button><br />

    <br />
    <!-- ref:可以获取到真实DOM节点，可以获取相应组件的实例VC -->
    <!-- ref也算在一种通信手段:在父组件中可以获取子组件(属性|方法) -->
    <Son ref="son" />

    <br />
    <Daughter ref="dau" />
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    //小明借用100元
    borrowFromXM() {
      this.money += 100
      // ref可以获取真实DOM节点 , 当然也可以获取子组件标签(操作子组件的数据与方法)
      this.$refs.son.money -= 100
    },
    borrowFromXH() {
      this.money += 150
      this.$refs.dau.money -= 150
    },
    borrowFromAll() {
      this.money += 400
      // 孩子
      this.$children.forEach(item => item.money -= 200)
    }
  },

  components: {
    Son,
    Daughter,
  }
};
</script>

<style>
</style>
