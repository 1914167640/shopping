<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑 , 带有x-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <!-- 面包屑处理 -->
          <ul class="fl sui-tag">
            <!-- 分类导航 -->
            <li class="with-x" @click="removeSearchName" v-show="categoryName">{{ categoryName }}<i>×</i></li>
            <!-- 关键字导航 -->
            <li class="with-x" @click="removekeyWord" v-show="keyword">{{ keyword }}<i>×</i></li> <!--文本框关键字-->       
            <li class="with-x" @click="removetrademark" v-show="tmName">{{ tmName }}<i>×</i></li> <!--品牌关键字-->
            <li class="with-x" @click="removeAttr(index)" v-for="(p , index) in searchParams.props" :key="index">{{ p.split(':')[1] }}<i>×</i></li> <!--属性关键字-->
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo="attrsInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                                                <!-- 判断谁有类名  , 谁就是红色-->
                <li @click="changeOrder('1')" :class="{ active : isOne }">
                  <!-- 谁有类名 , 谁就有箭头 -->
                  <a>综合<span v-show="isOne">{{ isDesc ? '↓' : '↑'}}</span></a>
                </li>
                                                <!-- 判断谁有类名  , 谁就是红色-->
                <li @click="changeOrder('2')" :class="{ active : isTwo }">
                  <!-- 谁有类名 , 谁就有箭头 -->
                  <a>价格<span v-show="isTwo">{{ isDesc ? '↓' : '↑'}}</span> </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转到详情 ， 要带id -->
                    <a @click="goDetail(good.id)" target="_blank"><img v-lazy="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>&nbsp;{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a @click="goDetail(good.id)" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a @click="collect" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 
            分页器测试阶段 pageNo  
            当前页数 pageSize -- 
            页面大小 total -- 
            数据总数 continues --     
          -->
          <Pagination 
            :pageNo="searchParams.pageNo" 
            :pageSize="searchParams.pageSize" 
            :total="total" 
            :continues="5"
            @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
	import {mapGetters , mapState} from 'vuex'
  export default {
    name: 'Search', 
    props : ['category1Id' , 'category2Id' , 'category3Id' ,  'categoryName' , 'keyword'] , 
    data() {
      return {
        // 搜索时传递的数据
        searchParams : {
          // 一级菜单Id
          category1Id: this.category1Id , 
          // // 二级菜单Id
          category2Id: this.category2Id ,
          // 三级菜单Id
          category3Id: this.category3Id ,
          // 分类名字
          categoryName: this.categoryName ,
          // 搜索关键字
          keyword: this.keyword ,
          // 排序
          order: "1:desc",
          // 默认页数
          pageNo: 1 ,
          // 总页数
          pageSize: 10 ,
          // 平台售卖属性操作带的参数 
          props: [] ,
          // 品牌
          trademark: ""
        } , 
        // 品牌的名字
        tmName : '' 
      }
    } , 
    components: {
      SearchSelector
    } , 
		computed : {
      // 商品列表
			...mapGetters(['goodsList']) , 

      // 获取总数
      ...mapState({ total : state => state.search.searchinfo.total }) ,

      // 路由的params参数
      routerParms () {
        return this.$route.params
      }  , 
      // 路由的query参数
      routerQuery () {
        return this.$route.query
      } ,
      // 类名判断 , 价格按钮和综合按钮
      isOne() {
        return this.searchParams.order.split(':')[0] === '1'
      } , 
      isTwo() {
        return this.searchParams.order.split(':')[0] === '2'
      } ,
      //按钮点击时箭头变化 , order属性 
      isDesc(){
        return this.searchParams.order.split(':')[1] === 'desc'
      }
		} , 
		mounted() {
      // 页面挂载时,调用search接口
			this.getSearchData()	
		} , 
    watch: {
      // 监视路由的params , params变化把新的搜索值传给服务器  , 实现跳转页面后多次搜索 
      routerParms(newval){
        this.searchParams.keyword = newval.keyword
        this.getSearchData()
      } , 
      // 监视路由的变化的query参数 , query变化把新的搜索值传给服务器  , 实现跳转页面后多次搜索 
      routerQuery({categoryname , category1id , category2id , category3id}) {
        // 每一次请求完后及时清空参数 , 防止菜单的id混乱
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''

        //更改类名 
        this.searchParams.categoryName = categoryname
        // 更改一级菜单
        if(category1id) this.searchParams.category1Id = category1id
        // 更改二级菜单
        if(category2id) this.searchParams.category2Id = category2id
        // 更改三级菜单
        if(category3id) this.searchParams.category3Id = category3id

        // 修改数据后请求服务器
        this.getSearchData()
      }
    } , 
    methods: {
      // 多次调用函数
      getSearchData() {       
        // 把searchParams传递给接口
        this.$store.dispatch('getSearchinfo' , this.searchParams)
      } ,
      // 点击重新跳转到search页面
      removeSearchName() {

        // 方法一:路由跳转
        // 重新跳转页面 , 保留params参数
        this.$router.push({ name : 'search' , params : this.$route.params})

        // 方法二:清空数据
        // 变成undefined可以优化性能 , 减少请求参数
        // this.searchParams.category1Id = undefined
        // this.searchParams.category2Id = undefined
        // this.searchParams.category3Id = undefined
        // this.searchParams.categoryName = undefined
        
        // this.getSearchData()
      } , 
      // 点击搜索框后的面包屑回退 
      removekeyWord() {
        // 方法一:后退 , 这个方法有bug , 不推荐使用 
        // this.$router.go(-1)

        // 重新跳转页面 , 保留query参数
        this.$router.push({ name : 'search' , query : this.$route.query})

        // 点击按钮时传递触发header组件的$on , 这样可以清空文本框的值
        this.$bus.$emit('clearInputVal')
      } , 
      // 点击品牌后的面包屑回退
      removetrademark() {
        this.tmName = ''
        this.searchParams.trademark = ''
        this.getSearchData()
      } , 
      // 点击属性值后的面包屑回退
      removeAttr(index) {
        // 删除指定的面包屑
        this.searchParams.props.splice(index , 1)
        // 发送请求
        this.getSearchData()  
      } , 
      // 根据品牌获取搜索结果
      trademarkInfo({tmId , tmName}) {
        // 根据接口参数要求 , searchParams中的trademark的类型要求是string , 格式要求是 id:品牌名
        this.searchParams.trademark = `${tmId}:${tmName}`
        // 把品牌名交给data ，代码更简便
        this.tmName = tmName
        this.getSearchData()
      } , 
      // 根据属性获取搜索结果
      attrsInfo({attrId , attrValue , attrName}) {
        // 整理参数
        let props = `${attrId}:${attrValue}:${attrName}`
        //如果存在重复的属性值  , 就把数据添加到数组
        if(this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
        // 再次发送请求
        this.getSearchData()
      } ,    
      // 根据综合或价格进行排序
      changeOrder(flag) { // flag参数可以知道用户点击的是综合还是价格
        // 新的order属性
        let newOrder = '' 
        // 获取起始的排序
        let orginSort = this.searchParams.order.split(':')[1]
        // 获取起始的flag
        let orginFlag = this.searchParams.order.split(':')[0]
        // 如果是综合
        if(flag === orginFlag) {
          // 点击的时候取反 , 即如果是降序则升序 , 如果是升序则降序
          newOrder = `${orginFlag}:${orginSort === 'desc' ? 'asc' : 'desc'}`          
          //如果是价格 
        }else {
          newOrder = `${flag}:${'desc'}`
        }
        // 替换新的order
        this.searchParams.order = newOrder
        this.getSearchData()
      } , 
      getPageNo(pageNo) {
        // // 把单击的页码数传给当前页码数
        this.searchParams.pageNo = pageNo
        // // 发送请求
        this.getSearchData()
      } , 
      // 跳转到详情
      goDetail(id) {
        this.$router.push({
          name : 'Detail' , 
          params : {
            skuId : id
          }
        })
      } , 
      collect() {
        alert('待开发中')
      }
    } 
  }

</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
   

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

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
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
              .list-wrap:hover {
                border: 1px solid #e1251b;
              }
            }
          }
        }
      }
    }
  }
</style>