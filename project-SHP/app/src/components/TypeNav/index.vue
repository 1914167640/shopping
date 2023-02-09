<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派优化鼠标离开时的范围 -->
      <div @mouseleave="leaveIndex()" @mouseover="showCategory">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show" @click="goSearch">
            <!-- 一级分类 -->
            <div class="all-sort-list2">
              <div class="item" v-for="(c1 , index) in containerList" :key="c1.categoryId" 
                :class="{gary:containerIndex === index}" ref="msc">
                <!-- 鼠标进入将当前的index传入回调函数 , 这样就能判断是否需要更改背景颜色 -->
                <h3 @mouseover="changIndex(index)">
                  <!-- 给所有a标签添加一个categoryName属性 , 用判断是否为A标签 , data-categoryId1确定为一级菜单-->
                  <a :data-categoryName="c1.categoryName" :data-categoryId1="c1.categoryId" v-show="index < containerList.length - 2">{{c1.categoryName}}</a>
                </h3>
                <!-- 二三级分类 -->
                <div class="item-list clearfix">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <!-- 给所有a标签添加一个categoryName属性 , 用判断是否为A标签 , data-categoryId2确定为二级菜单-->
                        <a :data-categoryName="c2.categoryName" :data-categoryId2="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 给所有a标签添加一个categoryName属性 , 用判断是否为A标签 , data-categoryId3确定为三级菜单-->
                          <a :data-categoryName="c3.categoryName" :data-categoryId3="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a>服装城</a>
        <a>美妆馆</a>
        <a>尚品汇超市</a>
        <a>全球购</a>
        <a>闪购</a>
        <a>团购</a>
        <a>有趣</a>
        <a>秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      containerIndex: -1,
      show: true
    }
  },
  computed: {
    // 获取home仓库中的containerList值
    ...mapState({
      // 右侧需要的是一个函数,当使用这个计算属性时,右侧函数会立即执行一次
      // 函数的参数为state,里面有你写好的小仓库的数据
      containerList: state => state.home.containerList
    })
  },
  methods: {
    // 一级菜单:获取当前鼠标悬停时的一级菜单的索引
    // 节流
    changIndex: throttle(function (index) {
      // 正常情况(用户慢慢的操作)：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件
      // 非正常情况(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了      this.containerIndex = index
      this.containerIndex = index
    }, 50),
    // 一级菜单:鼠标离开时取消当前更改的背景色
    leaveIndex() {
      this.containerIndex = -1
      // 隐藏界面
      if (this.$route.path !== '/Home') this.show = false
    },
    //显示三级菜单(组件不为home时)
    showCategory() {
      // 显示页面
      if (this.$route.path !== '/Home') this.show = true
    },
    goSearch(e) {
      // 跳转到search页面
      // 最好的方式 , 编程式路由 + 事件委派
      // 需要注意的问题 : 1、如何确定为a标签、如何传参 2.如何获取产品一二三级的名字

      // 1、如何确定为a标签
      //  获取节点
      let elment = e.target
      // 通过 dataset属性获取节点中自定义的属性 , 然后结构赋值
      let { categoryname, categoryid1, categoryid2, categoryid3 } = elment.dataset

      // 如果是a标签
      if (categoryname) {
        // 整理使用路由
        let query = { categoryname: categoryname }
        let localhost = {
          name: 'search'
        }
        // 如果id是一级菜单
        if (categoryid1) {
          query.category1id = categoryid1
        }
        //如果id是二级菜单
        if (categoryid2) {
          query.category2id = categoryid2
        }
        //如果id是三级菜单
        if (categoryid3) {
          query.category3id = categoryid3
        }

        // 合并参数
        localhost.params = this.$route.params
        localhost.query = query

        console.log(localhost)
        this.$router.push(localhost)        
        
      }
    }
  },
  // 组件挂载完毕
  mounted() {
    // 如果不是Search组件,就隐藏三级菜单
    if (this.$route.path !== '/Home') this.show = false
  }
}
</script>

<style scoped lang="less">
.type-nav {

  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 462px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            a:hover{
              color: #e1251b;
              transition: 0.5s;
            }

          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;

                    a:hover {
                      color: #e1251b;
                    }
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }


        .gary {
          background-color: #ccc;
          color: #e1251b;
        }
      }
    }

   /* 进入时的起点 离开时的终点*/
    .sort-enter , .sort-leave-to{ 
      height: 0px; 
    }
    /* 进入时和离开时的过程 */
    .sort-enter-to , .sort-leave{
      height:  510px;
    }
    /* 进入时的终点 离开时的起点 */
    .sort-enter-active , .sort-leave-active{
      transition: all 0.3s linear;
      // 解决文字出现再执行动画的问题
      overflow: hidden;
    }
  }
}
</style>