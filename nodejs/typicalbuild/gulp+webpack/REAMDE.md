### 项目结构
├─src               // 开发代码所在文件夹
│  ├─css            // css未编译，未做兼容处理，未压缩，未做版本处理
|  |  ├─components     // 基础样式
│  │  └─*.js           // 页面样式
|  |
│  ├─images         // 图片
|  |
│  ├─mock         	// 模拟数据
|  |
│  ├─js             // js未打包，未压缩，未做版本处理
│  │  ├─components     // 业务逻辑、页面渲染
|  |  ├─lib       	// 插件、库
|  |  ├─function       // 功能方法
│  │  └─*.js           // 入口文件
|  |
│  ├─components        // html模板，格式可自定义，参数可传入
|  |
│  └─*.html            // html文件，引用模板未编译，未压缩
│
├─gulpfile.js       // gulp配置文件
|
├─webpack.config.js // webpack配置文件
│
├─package.json
│
└─README            // 当前项目目录树
