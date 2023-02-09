
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
// Vue Router 支持开箱即用的动态导入，这意味着你可以用动态导入代替静态导入：
export default [
  // 首页
  {
    path: '/Home',
    component: () => { 
      return import('@/pages/Home') 
    } ,
    //为首页时显示底部 
    meta: {
      isFooter: true
    }
  } ,
  // 搜索
  {
    name: 'search',
    path: '/Search/:keyword?',
    component: () => import('@/pages/Search'),
    // props第一种写法(只能用于params参数)
    // props :  true,
    // props的第二种写法,值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件
    // props : true

    // props的第三种写法,值为函数
    props({ query, params }) {
      return {
        // 一级菜单id
        category1Id: query.category1id,
        // 二级菜单id
        category2Id: query.category2id,
        // 三级菜单id
        category3Id: query.category3id,
        // 种类
        categoryName: query.categoryname,
        // 搜索值
        keyword: params.keyword
      }
    },

    //为搜索时显示底部 
    meta: {
      isFooter: true
    }
  } ,
  // 登录
  {
    path: '/Login',
    component: () => import('@/pages/Login') ,
    meta: {
      //为登录时隐藏底部 
      isFooter: false
    }
  } ,
  // 注册
  {
    path: '/register',
    component: () => import('@/pages/Register') , 
    //为注册时隐藏底部 
    meta: {
      isFooter: false
    }
  } ,
  // 详情
  {
    name: 'Detail',
    // params传一个id过去
    path: '/Detail/:skuId',
    component: () => import('@/pages/Detail') , 
    meta: {
      isFooter: false
    }
  } , 
  // 成功加入购物车
  {
    name : 'AddCartSuccess' , 
    path : '/AddCartSuccess' , 
    component: () => import('@/pages/AddCartSuccess') , 
    meta: {
      isFooter: true
    }
  } ,
  // 商品购物车
  {
    name : 'ShopCart' , 
    path : '/ShopCart' ,
    component: () => import('@/pages/ShopCart') , 
    meta: {
      isFooter: true
    }
  } , 
  // 结算(交易)
  {
    name : 'Trade' ,
    path : '/Trade' ,  
    component: () => import('@/pages/Trade') , 
    // 前置局部守卫(独享守卫没有后置 , 只有前置)
    beforeEnter: (to, from, next) => { 
      if(from.path === '/ShopCart') { //如果当前是购物车界面 
        next() //才能跳转到交易界面(创建订单)
      } else { //如果当前不是购物车界面 
        console.log('111' , from.path)
        if(from.path === '/Login') { //如果是登录页
          next() //放行
        } else { //
          next(from.path)
        } 
      }

    }
  } , 
  // 提交订单(支付)
  {
    name : 'Pay' , 
    path : '/Pay' , 
    component: () => import('@/pages/Pay') , 
    beforeEnter: (to, from, next) => {
      if(from.path === '/Trade') {//如果是交易页面(创建订单)页面 
        next() //才能跳转到支付页面
      } else {
        next(from.path)
      }
    }
  } ,
  // 支付成功
  {
    path : '/PaySuccess' , 
    name : 'PaySuccess' , 
    component: () => import('@/pages/PaySuccess') , 
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay') {//如果是交易页面(创建订单)页面 
        next() //才能跳转到支付页面
      } else {
        next(false)
      }
    }
  } ,
  // 查看订单
  {
    name : 'Center' , 
    path : '/Center' , 
    component: () => import('@/pages/Center') , 
    children : [
      // 我的订单
      {
        path : 'myOrder' , 
        component: () => import('@/pages/Center/myOrder')
      } , 
      //团购订单
      {
        path : 'groupOrder' , 
        component: () => import('@/pages/Center/groupOrder')
      } , 
      // 重定向 
      {
        path: '/',
        redirect: '/Center/myOrder'
      } 
    ]
  } , 
  // 路由重定向
  {
    // 重定向 ， 在项目跑起来的时候，访问/，立马让他定向到首页
    path: '/',
    redirect: '/Home'
  } ,
  // 视频115~121的内容
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
         show: false
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
            show: false
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
            show: false
        },
      }
    ],
  },
] 