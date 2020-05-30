# my_supermarket

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


项目详情
小商城项目地址：https://github.com/Liyumei-code/my_supermarket
这个项目适合刚接触项目的小伙伴们，可以了解到整个项目开发的一般流程，如果大家觉得有帮助，帮忙在github上给个start

1、项目描述
此项目为一个前后端分离的 电商实战项目
采用了Vue+ES6+Webpack 等前端最新技术
项目包括首页、分类、购物车、我的、商品详情等多个功能子模块
采用模块化、组件化的模式开发
2、你将从此项目中学到什么？
2.1 项目开发流程及开发方法和思想


熟悉一个项目开发的流程
学会组件化、模块化、工程化的开发模式
掌握使用vue-cli脚手架初始化vue.js项目
掌握一些项目的优化技巧
2.2 插件或第三方库


学会使用 vue-router 开发单页面
学会使用 axios 的封装和后端数据交互
学会使用 vuex 管理应用组件的状态
学会是使用 better-scroll 实现页面滑动效果
学会使用 vue-lazyload 实现图片懒加载
 3 项目详情



3.1 文件说明
dist	项目打包后生成的文件
node_modules	npm加载的项目依赖模块
public	静态资源目录，如图片、字体、icon图标 ，其中里面的index.html是模板，当运行npm run build打包的时候，就是以这里的index.html作为模板打包 输出 到dist 文件夹下生成一个新的 index.html文件
src	包含了如下几个目录及文件:
assest: 放置一些图片，如logo等
components: 这里我一般用来放置一些公共的组件
App.vue:应用组件，我们写的所有组件都是在这个组件之上运行的
main.js: 项目的核心文件，入口js文件
router: 路由文件夹，决定页面路由的跳转规则
store: vuex的状态管理文件
network：自己创建的，用来存放项目中发起请求的js文件模块
common: 存放一些公共的js文件 
package.json	项目的配置文件，以及一些插件依赖包的信息
package-lock.json	插件依赖的详细信息
3.2 项目的效果图
项目首页



 分类页面



 详情页面







购物车页面



我的模块

