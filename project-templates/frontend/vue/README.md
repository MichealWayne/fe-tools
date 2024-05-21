
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

### 目录结构(src)
├─assets    静态资源
│  └─images 图片
├─router    路由配置
├─views     视图
├─mock      接口模拟
└─main.js   入口js