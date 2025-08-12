# @fe-tools/ai-utils

封装了与 AI 相关的常用方法，旨在简化 AI 功能集成。

## 安装

```bash
npm install @fe-tools/ai-utils
```

## 功能模块

### applications

- **genCodeReviewPrompt** - 生成用于代码审查的 Prompt。会分析代码片段，识别潜在的 bug 风险和改进建议，并要求以特定 JSON 格式返回结果。(文件: `src/applications/codeReview.ts`)
- **genSqlPrompt** - 生成用于 SQL 查询的 Prompt。可以根据提供的数据库 schema 和自然语言描述生成 SQL 语句。(文件: `src/applications/createSQL.ts`)
- **genUnitTestCasesPrompt** - 生成用于创建单元测试的 Prompt。针对提供的代码片段，生成覆盖主要功能、边界条件和潜在错误的 Jest 单元测试代码。(文件: `src/applications/createUnitTestCases.ts`)
- **genEnhancePrompt** - 生成用于增强 Prompt 的 Prompt。将用户提供的简单描述优化为更具体、可操作、更有效的 AI 指令。(文件: `src/applications/enhancePrompt.ts`)
- **genCreateReactComponentPrompt** - 生成用于创建 React 组件的 Prompt。根据用户描述，生成符合现代 React (18.2) 和 TailwindCSS 规范的高质量组件代码。(文件: `src/applications/createReactComponent.ts`)
- **genSummaryPrompt** - 生成用于文本摘要的 Prompt。根据输入文本和可选的长度、语言参数，生成简洁明了的摘要。(文件: `src/applications/createSummary.ts`)
- **genTranslatePrompt** - 生成用于文本翻译的 Prompt。根据源语言、目标语言和可选的风格，生成准确的翻译结果。(文件: `src/applications/translate.ts`)

### llm

- **estimateTokenLength** - 一个简单的启发式函数，用于估算字符串的 token 数量。这是一个粗略的近似值，适用于基本的长度检查。(文件: `src/llm/prompts/token.ts`)

### utils

- **getBoa** - 提供与 Python 环境交互的工具方法，用于获取 Boa 进程 ID。(文件: `src/utils/python.ts`)
- **createPromptGenerator** - 一个高阶函数，用于创建可复用的 Prompt 生成器，内置 token 长度检查逻辑。(文件: `src/utils/prompt/generator.ts`)
- **applyTemplate** - 一个工具函数，用于将模板字符串中的占位符替换为指定值。(文件: `src/utils/prompt/applyTemplate.ts`)

## 依赖

- **ml-distance**: `^4.0.1` - 用于计算向量相似度（余弦相似度），被 `src/vectors/vectorCompare.ts` 使用。
- **@pipcook/boa**: (Peer Dependency) - 用于与 Python 环境交互。如果使用 `src/utils/python.ts` 中的功能，需要手动安装此包。