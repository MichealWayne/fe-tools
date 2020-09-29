
### 操作命令
#### 本地开发
``` sh
	npm run start
```

或

``` sh
	npm run dev
```

#### 打包（测试环境包）
测试包带sourcemap，无版本及备份
``` sh
	npm run build
```

#### 打包（生产包）
生产包不带sourcemap，包含版本及备份。
``` sh
	npm run build:prod
```

* 注意：如需执行处理脚本，可在build/目录下增加脚本文件build.js。打包后版本备份前会执行该脚本。

### 目录结构
├─asset
     └─images 图片
     └─lib    工具库
├─components  组件
├─ijijinView  组件
├─less        样式
├─page        页面入口
├─script      js文件
│  └─config    配置文件
│  └─const     静态变量
│  └─fn.business  业务方法库
│  └─fn.util 基础方法库
│  └─http    请求文件
│  └─tokenInit  用户token（key1~key5）初始化
├─type        接口定义
├─view        view层

