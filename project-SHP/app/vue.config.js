const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true , 
  productionSourceMap : false , //打包时不需要map文件
  // 关闭效验
  lintOnSave: false,
  devServer : {
    open : true , 
    host : 'localhost' , 
    port : 8080 , 
    proxy : {
      "/api" : {
        target : "http://gmall-h5-api.atguigu.cn/api"
      }
    }
  }
})
