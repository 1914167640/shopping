1:vue-cli脚手架初始化项目

node + webpack + 淘宝镜像

public文件夹： 一般放置一些静态资源(图片 ) ， 需要注意 ， 放在public文件夹中的静态资源 ， webpack进行打包的时候 ， 会原封不动打包到dist文件夹中

src文件夹(程序员源代码文件夹):

assets文件夹 :    一般也是放置静态资源(一般放置多个组件共用的静态资源) ， 需要注意 ， 放置在assets文件夹里面静态资源 ， 在webpack打包的时候 ， webpack会把静态资源当做一个模块 ， 打包JS文件里面

components放置的是非路由组件(全局组件)

App.vue唯一的根组件，vue当中的组件

main.js:程序入口文件，也是整个程序当中最先执行的文件


浏览器自动运行和关闭效验功能  ： 自己查


路由组件 : 

    home首页路由组件 、 Search路由组件 、login登录路由 、Refister注册路由

非路由组件

   header

   footer[在首页、搜索页] ， 但是在登录页没有
