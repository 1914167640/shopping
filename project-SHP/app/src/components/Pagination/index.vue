<template>
  <div class="pagination">
      <!-- 上 -->
      <button :disabled="pageNo === 1" @click="upPage">上一页</button>
      <!-- 开始页数大于1时隐藏 -->
      <button v-show="startNumAndEndNum.start > 1" @click="getPageNo(1)">1</button>
      <!-- startNumAndEndNum.start > 2时显示 -->
      <button v-show="startNumAndEndNum.start > 2">···</button>

      <!-- 中 -->
      <button v-for="(page , index) in startNumAndEndNum.end" 
              :key="index" 
              v-show="page >= startNumAndEndNum.start" 
              @click="getPageNo(page)"
              :class="{blue : pageNo === page}"
              >{{page}}</button>

      <!-- 下 -->
      <!-- 小于总页数 - 1 时显示-->
      <button v-show="startNumAndEndNum.end < totalPage - 1">···</button>
      
      <!-- 尾数小于总页数 -->
      <button @click="getPageNo(totalPage)" v-show="startNumAndEndNum.end < totalPage">{{totalPage}}页</button>
      <button :disabled="pageNo === totalPage" @click="downPage">下一页</button>

      <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination" , 
  // 接受search组件传过来的 当前页数 、 每页数据 、 总数据 、 连续页数 
  props : ['pageNo' , 'pageSize' , 'total' , 'continues'] , 
  computed : {
    // 当前总页数
    //如果你当前的总页数是总数 , 那就直接整除 , 否则就加+1
    totalPage() {
      return this.total % this.pageSize === 0 ? this.total / this.pageSize : parseInt(this.total / this.pageSize) + 1
    } , 
    // 计算出连续页码的起始数和结尾数
    startNumAndEndNum(){
      let {totalPage , continues , pageNo} = this
      // 定义两个变量存储起始数字与结束数字
      let start = 0 , end = 0
      // 如果总页数小于连续页数 (不正常情况)
      if(totalPage < continues) {
        // 那么起始数是1 , 结尾数是tatal
        start = 1
        end = totalPage
      } else {
        // 正常情况 , 起始数是中间数字 - 2 , 结尾数是中间数字 + 2  
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
         // 如果起始是 < 1  ，就会出现问题 , 因为不存在 第0页 和 第1页
        if(start < 1) {
          // 从第一页开始 , 连续的页数是你的总页数
          start = 1
          end = continues
        }
        // 如果尾数大于总页数
        if(end > totalPage) {
          //尾数就是总页数
          end = totalPage
          // 起始数 = 当前页数 - (连续页数  - 1)
          start = totalPage - (continues - 1)
        }
      }
      return {start , end}
      
    }
  } ,
  methods: {
    // 获取当前页数
    getPageNo(pageNo) {
      // 把页码数传给父组件
      this.$emit('getPageNo' , pageNo)
    } ,
    // 上一页
    upPage() {
      this.$emit('getPageNo' , this.pageNo - 1) 
    } ,  
    // 下一页
    downPage() {
      this.$emit('getPageNo' , this.pageNo + 1)
    }
  } 
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
    .blue {
      background-color: #409eff;
      color: white;
    }
  }
</style>