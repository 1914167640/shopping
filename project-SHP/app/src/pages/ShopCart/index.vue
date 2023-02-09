<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cartInfo in cartInfoList" :key="cartInfo.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked" ref="chkList"
              @click="changeAll(cartInfo.skuId , cartInfo.isChecked)">
          </li>
          <li class="cart-list-con2">
            <!-- 图片 -->
            <img :src="cartInfo.imgUrl">
            <!-- 商品名称 -->
            <div class="item-msg">{{ cartInfo.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <!-- 价格 -->
            <span class="price" :price="cartInfo.skuPrice">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="handler('mins', cartInfo, -1)" class="mins">-</a>
            <!-- <el-button @click="handler('mins', cartInfo, -1)" size="mini">-</el-button> -->
            <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt"
              @change="handler('itxt', cartInfo, $event.target.value)">           
            <!-- <el-button @click="handler('add', cartInfo, 1)" size="mini">-</el-button> -->
            <a @click="handler('add', cartInfo, 1)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 总价 -->
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <el-popconfirm 
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="确定要删除当前的商品?"
              @confirm="deleteCart(cartInfo.skuId)">
              <el-button  slot="reference" type="danger" size="mini">删除</el-button>
            </el-popconfirm>
            <el-button  slot="reference"  size="mini" style="margin-left: 10px;" @click="collect">收藏</el-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="checkAll" @change="onCheckAll(checkAll)" ref="chooseAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="removeAll">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{selectNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn"  to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqAddToCart } from '@/api'
import { reqDeleteCart } from '@/api'
import {reqCheckCart} from '@/api'
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'


export default {
  name: 'ShopCart',
  computed: {
     // 购物车信息
    ...mapGetters(['cartInfoList']) ,
    // 计算购买产品的总价
    total() {
      let sum = 0
      this.cartInfoList.forEach( item => sum += item.cartPrice * item.skuNum )
      return sum
    },
    // 判断底部复选框 , 如果全部勾选 , 则全选
    checkAll() { 
      let flag = null
      if(this.cartInfoList.length === 0) { //如果商品全部清空
        flag = false
      } else {
        flag = this.cartInfoList.every(item => item.isChecked === 1 ) //如果所有元素都符合 , 则true , 否则false
      }
      return flag
    } , 
    // 已选的数量
    selectNum() {
      let sum = 0
      this.cartInfoList.forEach(cartInfo => sum += cartInfo.isChecked)
      return sum
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    // 请求的时候需要一个身份 , 叫uuid ， 可在本地存储中查看   
    getDate() {
      this.$store.dispatch('getCartList')
    },
    // 这个函数的作用 : 对已有物品进行数量改动 , 使用节流限制函数调用次数
    handler: throttle(function (type , cartInfo , skuNum) { 
      switch (type) { // type : 用来区分这三个按钮    cartInfo : 购物车信息    skuNum:判断 +1 还是 -1
        case 'mins':

          cartInfo.skuNum <= 0 ? skuNum = 0 : skuNum = -1 // 如果当前数量为0 , 就把变化数变为 0  , 否则为 -1
          break

        case 'itxt':

          let regexp = /^\d*(\.\d{1,20})?$/ // 只能输入数字或者小数
          if (!regexp.test(skuNum) || skuNum < 0) { // 输入不合法 或者 输入的数为负数
            skuNum = 0 //不要让他为0   
          } else { //合法    
            skuNum = parseInt(skuNum) - cartInfo.skuNum // 这是人家后端的设计的规则 , 问就是不知道
          }
          break
      }
      // 请求参数 : skuId : 商品id  skuNum是商品变化数量 1表示增加  2表示减少 
      reqAddToCart(cartInfo.skuId , skuNum) // 这个接口即可以用来表示购物车的成功添加 , 又可以对已有物品进行数量改动
        .then(data =>  this.getDate())// 请求成功后更新数据
        .catch(err => console.log(err))
    }, 1000),
    // 删除购物车商品 , 要先获取商品id
    deleteCart( skuId ) {
      reqDeleteCart( skuId )
        .then( data => {
          this.getDate()
          this.$message.success('删除成功')
        })// 请求刷新页面   
        .catch(err => console.log( err )) 
    },
    // 全选按钮勾选时 , 其他就会勾选
    onCheckAll( flag ) {
      let isChecked = Number( flag ) //转换为数字
      isChecked ? isChecked = 0 : isChecked = 1 // 取反状态
      let promiseAll = [] 
      this.cartInfoList.forEach( cartInfo => 
        promiseAll.push( reqCheckCart( cartInfo.skuId , isChecked ) ) //将勾选框都改变 , 并添加到数组
      )
      Promise.all(promiseAll) //处理多个promise请求
      .then(data => this.getDate()) //需要注意的是，promise.all()成功时，在then（result）中result是个数组
      .catch(err => console.log(err))
    }, 
    // 鼠标单击勾选框时 , 请求服务器更改数据
    changeAll( skuId , isChecked ) { 
      isChecked ? isChecked = 0 : isChecked = 1 // 取反状态
      reqCheckCart (skuId , isChecked ) // 参数 : skuId : 商品id   isChecked : 切换商品是否被选中
      .then( data => this.getDate() ) //请求成功后更新数据
      .catch( err => console.log(err) )
    } ,
    // 删除全部商品 
    removeAll() {
      let promiseAll = []
      this.cartInfoList.forEach( cartInfo => {
        if( cartInfo.isChecked ) { //如果当前的状态勾选框为 1 
          promiseAll.push( reqDeleteCart(cartInfo.skuId) ) //遍历删除 , 然后把promise实例添加到数组中
        } 
      })
      // 更新数据
      Promise.all(promiseAll) 
      .then(data => this.getDate()) //需要注意的是，promise.all()成功时，在then（result）中result是个数组
      .catch(err => console.log(err))
    } , 
    // 收藏
    collect() {
      this.$message('正在开发中...')
    } 
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;

        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }


        .cart-list-con4 {
          width: 10%;
          // background-color: #c81623;
          margin-top: 35px;
        }

        .cart-list-con5 {
          width: 15.5%;
          margin-top: 25px;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 16px;
            height: 17px;
            text-align: center;
            padding: 8px;
          }
          .mins:hover {
            background-color: #f5f5f5         
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 16px;
            height: 17px;
            text-align: center;
            padding: 8px;
          }
          .plus:hover {
            background-color: #f5f5f5
          }
        }

        .cart-list-con6 {
          width: 11%;
          margin-top: 31px;
          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;
          margin-top: 35px;
          a {
            color: #666;
          }
          a:hover {
           color: #e1251b;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 8px;
      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      margin-top: 10px;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
      a:hover {
        color: #e1251b;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
        margin-top: 16px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        margin-top: 13px;
        .summoney {
          color: #c81623;
          font-size: 20px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
        }
        a:hover{
          background-color: #d55b5b;
        }
      }
    }
  }
}
</style>