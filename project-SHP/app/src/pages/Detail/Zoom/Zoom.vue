<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl"/>
    <div class="event" ref="event" @mousemove="move"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'] , 
    data() {
      return {
        imgIndex : 0
      }
    },
    computed : {
      imgObj(){
        return this.skuImageList[this.imgIndex] || {}
      }
    } , 
    mounted() {
     this.$bus.$on('getImgIndex' , (index) => {
      this.imgIndex = index
     }) 
    } ,
    methods: {
     move(e) {
      // offsetX、offsetY: 鼠标相对于事件源元素的X,Y坐标。比如说，我给黄色的盒子定义一个点击事件，则这个offset的坐标原点就在这个黄色盒子的左上角
      let mask = this.$refs.mask
      let bigImg = this.$refs.bigImg

      let boxLeft = e.offsetX - ( mask.offsetWidth / 2 )
      let boxTop = e.offsetY - ( mask.offsetHeight / 2 )
      
      // 让绿色的盒子只能在mack盒子内移动
      if(boxLeft <= 0) {
        boxLeft = 0
      }

      if(boxLeft >= mask.offsetWidth) {
        boxLeft = mask.offsetWidth
      }

      if(boxTop <= 0) {
        boxTop = 0
      }

      if(boxTop >= mask.offsetHeight) {
        boxTop = mask.offsetHeight
      }

      // 绿色盒子的偏移
      mask.style.left = boxLeft  + 'px'
      mask.style.top = boxTop + 'px'
      // 放大后的偏移
      bigImg.style.left = -(boxLeft * 2) + 'px'
      bigImg.style.top = -(boxTop * 2) + 'px'

     } 
    }

  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      border: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>