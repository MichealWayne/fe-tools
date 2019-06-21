# 前端开发常用工具、插件、文档
```

├─client    
│  ├─js
│  │  ├─functions
│  │  │  ├─dom
│  │  │  └─native
│  │  └─plugins
│  │      ├─alert
│  │      ├─toast
│  │      ├─keyboard-number
│  │      └─pullRefresh
│  └─less
│      ├─mobile
│      └─pc
└─nodejs
    ├─base
    │  └─lib
    │      ├─fs
    │      ├─process
    │      ├─server
    │      └─util
    ├─imgbuild
    ├─pagebuild
    │  ├─components
    │  │  ├─activity
    │  │  └─funds
    │  ├─lib
    │  │  ├─process
    │  │  └─util
    │  └─templates
    └─typicalbuild
        ├─react
        ├─vue
        ├─gulp+webpack		
        └─webpack
```

## 更新信息
- 2019.04.28：新增storage封装；新增下拉刷新、数字键盘原生组件；


## 说明

### 1.client 客户端
前端开发常用样式、方法；

#### 1.1 js js方法、插件
##### 1.1.1 functions js方法
- dom：DOM操作；
- native：验证、cookie、css、颜色/图片、平台、时间、url解析、storage封装等方法；

##### 1.1.2 plugins js插件
- alert 网页弹窗
- toast 网页toast

#### 1.2 less 基础样式库
- pc：PC端
- mobile：移动端


### 2.nodejs 服务端、脚本
使用可见[ijijin-cli](https://www.npmjs.com/package/ijijin-cli)
使用可见[ijijin_builder](https://www.npmjs.com/package/ijijin_builder)

#### 2.1 base 方法
- fs：文件操作
- server：简易服务器
- util：其他工具

#### 2.2 pagebuild 页面构建

#### 2.3 typicalbuild 典型项目构建
- gulp+webpack
- webpack
- vue
- react

### 3.常用文档
<section>
<h2> 3.1 html/css/js</h2>
<p>- <a href="http://www.css88.com/book/css/" target="_blank">css 参考手册</a></p>
<p>- <a href="http://www.yyyweb.com/demo/html5-tools/html5-canvas.html" target="_blank">canvas 参考手册</a></p>
<p>- <a href="http://www.t086.com/code/vml/" target="_blank">VMl 参考手册</a></p>
<p>- <a href="https://zhongsp.gitbooks.io/typescript-handbook/content/" target="_blank">Typescript 参考手册</a></p>
<p>- <a href="https://www.tslang.cn/docs/home.html" target="_blank">TypeScript中文文档</a></p>
<p>- <a href="http://es6.ruanyifeng.com/" target="_blank">ES6入门（阮一峰）</a></p>
<p>- <a href="https://ecma262.docschina.org/" target="_blank">ES6 参考手册</a></p>
</section>

<section>
<h2> 3.2 框架/插件库</h2>
<p>- <a href="http://www.css88.com/doc/less/features/" target="_blank">less 文档</a></p>
<p>- <a href="https://sass-guidelin.es/zh/" target="_blank">sass 文档</a></p>
<p>- <a href="http://www.zhangxinxu.com/jq/stylus/" target="_blank">stylus 文档(张旭鑫)</a></p>
<p>- <a href="http://api.postcss.org/" target="_blank">postcss 文档</a></p>
<p>- <a href="https://cn.vuejs.org/v2/guide/syntax.html" target="_blank">Vue 文档</a></p>
<p>- <a href="http://element-cn.eleme.io/#/zh-CN" target="_blank">element-UI 文档</a></p>
<p>- <a href="https://router.vuejs.org/zh-cn/" target="_blank">Vue-router 文档</a></p>
<p>- <a href="https://doc.react-china.org/docs/hello-world.html" target="_blank">React 文档</a></p>
<p>- <a href="https://ant.design/docs/react/getting-started-cn" target="_blank">antd 文档</a></p>
<p>- <a href="https://reactnative.cn/" target="_blank">React-native 文档</a></p>
<p>- <a href="https://koajs.cn/#-application-" target="_blank">Koa 文档</a></p>
<p>- <a href="https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md" target="_blank">dvajs 文档</a></p>
<p>- <a href="http://requirejs.org/" target="_blank">requirejs 文档</a></p>
<p>- <a href="http://yslove.net/seajs/" target="_blank">seajs 文档</a></p>
<p>- <a href="http://www.css88.com/jqapi-1.9/" target="_blank">jQuery api</a></p>
<p>- <a href="http://www.css88.com/doc/zeptojs_api/" target="_blank">Zepto api</a></p>
<p>- <a href="http://bootstrap.css88.com/css/" target="_blank">Bootstrap 文档</a></p>
</section>

<section>
<h2> 3.3 数据可视化</h2>
<p>- <a href="https://api.hcharts.cn/highcharts" target="_blank">highcharts(ie6+)</a></p>
<p>- <a href="http://echarts.baidu.com/api.html#echarts" target="_blank">echarts</a></p>
<p>- <a href="https://github.com/d3/d3/wiki" target="_blank">d3</a></p>
<p>- <a href="http://www.chartjs.org/docs/latest/" target="_blank">Chartjs</a></p>
<p>- <a href="http://antv.alipay.com/zh-cn/g2/3.x/demo/funnel/basic.html" target="_blank">antv</a></p>
<p>- <a href="http://blog.michealwayne.cn/FundCharts/docs/" target="_blank">FundCharts</a></p>
</section>

<section>
<h2> 3.4 node</h2>
<p>- <a href="http://nodejs.cn/api/" target="_blank">nodejs api</a></p>
<p>- <a href="https://v8docs.nodesource.com/node-10.6/index.html" target="_blank">V8引擎介绍</a></p>
<p>- <a href="https://pugjs.org/language/includes.html" target="_blank">pug (html模板引擎)</a></p>
<p>- <a href="http://www.nodeclass.com/api/jade.html" target="_blank">jade (html模板引擎)</a></p>
<p>- <a href="https://ejs.bootcss.com/" target="_blank">ejs (html模板引擎)</a></p>
<p>- <a href="http://www.css88.com/doc/webpack/" target="_blank">webpack 配置文档</a></p>
<p>- <a href="https://parceljs.docschina.org/" target="_blank">parceljs 配置文档</a></p>
<p>- <a href="https://www.gulpjs.com.cn/docs/" target="_blank">gulp 配置文档</a></p>
<p>- <a href="https://grunt.docschina.org/" target="_blank">grunt 配置文档</a></p>
<p>- <a href="http://www.expressjs.com.cn/" target="_blank">express 配置文档</a></p>
<p>- <a href="https://github.com/nuysoft/Mock/wiki" target="_blank">Mockjs 配置文档</a></p>
</section>

<section>
<h2> 3.5 辅助工具</h2>
<p>- <a href="http://www.uiplayground.in/css3-icons/" target="_blank">css3 icon</a></p>
<p>- <a href="https://github.com/daneden/animate.css" target="_blank">css3 动画</a></p>
<p>- <a href="http://deerchao.net/tutorials/regex/regex.htm" target="_blank">正则表达式30分钟</a></p>
<p>- <a href="http://tongji.baidu.com/data/browser" target="_blank">浏览器份额统计（百度）</a></p>
<p>- <a href="https://caniuse.com" target="_blank">兼容查询(caniuse)</a></p>
<p>- <a href="http://iosfonts.com/" target="_blank">ios字体查询</a></p>
<p>- <a href="http://wproxy.org/whistle/install.html" target="_blank">whistle web调试代理工具</a></p>
<p>- <a href="http://babeljs.io/" target="_blank">在线babel</a></p>
<p>- <a href="https://cn.eslint.org/" target="_blank">eslint 文档</a></p>
</section>