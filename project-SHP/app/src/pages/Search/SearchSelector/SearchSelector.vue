<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <!-- 品牌 -->
          <li v-for="trademark in trademarkList" :key="trademark.tmId" @click="tradeMatkHandler(trademark)">{{trademark.tmName}}</li>
        </ul>
      </div>
    </div>
    <div class="type-wrap" v-for="attrs in attrsList" :key="attrs.attrId">
      <div class="fl key">{{attrs.attrName}}</div>
      <div class="fl value">
        <ul class="type-list">
           <!-- 往attrHandler函数传递的参数是 属性ID:属性值:属性名 -->
          <li v-for="(attrValue , index) in attrs.attrValueList" :key="index" @click="attrHandler({attrId : attrs.attrId , attrValue , attrName : attrs.attrName})">
            <a>{{attrValue}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'SearchSelector', 
    computed : {
      ...mapGetters(['trademarkList' , 'attrsList'])
    } , 
    methods:{
      tradeMatkHandler(trademark) {
        // 根据品牌的名字去搜索
        
        // 方法一:直接在子组件请求
        // this.$store.dispatch('getSearchinfo' , {keyword : name})

        // 方法二:发送到父组件search中请求
        this.$emit('trademarkInfo' , trademark)
      } , 
      attrHandler(data) {
        // 发送search父组件 , 根据属性值器搜索
        this.$emit('attrsInfo' , data)
      }
    }
  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
      border-top: 0;
      margin: 0;
      position: relative;
      overflow: hidden;

      .key {
        padding-bottom: 87px !important;
      }
    }

    .type-wrap {
      margin: 0;
      position: relative;
      border-top: 1px solid #ddd;
      overflow: hidden;

      .key {
        width: 100px;
        background: #f1f1f1;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;
        padding-right: 90px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #e4e4e4;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #e1251b;
            font-style: italic;
            font-size: 14px;

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
          li:hover {
            background-color:#f1f1f1;
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #666;
            }
            a:hover {
              color: #e1251b;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

        .sui-btn {
          display: inline-block;
          padding: 2px 14px;
          box-sizing: border-box;
          margin-bottom: 0;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          padding: 0 10px;
          background: #fff;
          border: 1px solid #d5d5d5;
        }
        .sui-btn:hover {
          background-color:#f1f1f1;
        }
        a {
          color: #666;
        }
      }
    }
  }
</style>