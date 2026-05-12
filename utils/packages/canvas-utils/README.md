# fe-tools-canvas-utils

封装了常用的 Canvas 绘制操作，简化图形绘制流程。

## 安装与导入

```bash
npm install fe-tools-canvas-utils
```

```ts
import { drawLine, getPointsDistance, getColorRgba, animate } from 'fe-tools-canvas-utils';
```

## 功能列表

### Drawing (绘制) (文件: `src/canvas/drawer.ts`)

- **drawLine** - 绘制线段。
- **drawDashLine** - 绘制虚线。
- **drawPoint** - 绘制点。
- **drawRotateText** - 绘制旋转文本。
- **clearArc** - 清理圆形区域。
- **retinaScale** - 按设备像素比缩放 Canvas。

### Calculate (几何与数值计算) (文件: `src/utils/calculate.ts`)

- **min/max** - 数组极值。
- **getListExtremum** - 获取列表最大值、最小值等信息。
- **getAxisLimit** - 计算坐标轴边界。
- **getPointsAngle** - 计算两点角度。
- **getPointsDistance** - 计算两点距离。

### Colors (颜色) (文件: `src/utils/colors.ts`)

- **getColorRgbList** - 解析颜色为 RGB 数组。
- **getColorRgba** - 生成 RGBA 颜色字符串。
- **isTransparentColor** - 判断透明色。
- **getLightfulRgbList** - 基于权重调整颜色亮度。

### Curve & Animation (曲线与动画)

- **getCurvePoints** - 根据路径点生成曲线点。(文件: `src/utils/curve.ts`)
- **animate** - 基于时间和缓动函数执行动画。(文件: `src/utils/animate.ts`)

### Environment & DOM (环境与 DOM)

- **isWeb/isWeapp/isNode** - 判断运行环境。(文件: `src/utils/env.ts`)
- **createCanvasElem** - 创建 Canvas 元素。(文件: `src/utils/doms.ts`)
- **mixins/setAnimationHooks/setEnvContext** - 类混入、动画钩子和环境上下文辅助。(文件: `src/utils/decorators.ts`)

### Types (类型)

- 导出 `PointPosition`、`PointsMap`、`ListExtremum`、`SimpleObj` 等类型定义。
