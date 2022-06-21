# Gulp + webpack

@todo 改版

## 说明

可直接使用`webpack`/`ts+webpack`版本

### 项目结构

├─src // 开发代码所在文件夹
│ ├─css // css 未编译，未做兼容处理，未压缩，未做版本处理
| | ├─components // 基础样式
│ │ └─*.js // 页面样式
| |
│ ├─images // 图片
| |
│ ├─mock // 模拟数据
| |
│ ├─js // js 未打包，未压缩，未做版本处理
│ │ ├─components // 业务逻辑、页面渲染
| | ├─lib // 插件、库
| | ├─function // 功能方法
│ │ └─*.js // 入口文件
| |
│ ├─components // html 模板，格式可自定义，参数可传入
| |
│ └─\*.html // html 文件，引用模板未编译，未压缩
│
├─gulpfile.js // gulp 配置文件
|
├─webpack.config.js // webpack 配置文件
│
├─package.json
│
└─README // 当前项目目录树
