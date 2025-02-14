## 项目简介

react19-template 是一个基于 React 框架构建的项目，旨在提供一套美观且易于使用的进度展示组件。它整合了 Ant Design UI 组件库的优雅风格，并利用 Tailwind CSS 提供的原子类 CSS 方案进行灵活的样式定制。项目旨在帮助开发者快速在 React 应用中集成各种类型的进度指示器，提升用户体验。

## 技术栈

本项目主要采用了以下技术和库：

- React: 用于构建用户界面的 JavaScript 库。
- TypeScript: JavaScript 的超集，添加了静态类型定义，提高代码质量和可维护性。
- Vite: 快速的前端构建工具，提供极速的开发体验和优化的生产环境构建。
- Ant Design: 流行的企业级 UI 组件库，提供了丰富的组件和设计规范。
- Tailwind CSS: 原子化 CSS 框架，用于快速定制组件样式。
- nprogress: 轻量级的进度条组件，用于在页面加载或操作时显示进度。
- React Icons: 提供丰富的图标集合，方便在 React 应用中使用各种图标。
- Biome: 用于代码格式化、Lint 检查和代码质量保证的工具链。

## 快速开始

### 前置条件

在开始之前，请确保你已经安装了 Node.js (建议使用 v18 或更高版本) 和 npm (或 yarn / pnpm) 包管理器。

## 安装依赖

在项目根目录下运行以下命令安装项目依赖：

使用 pnpm:

```bash
pnpm install
```

启动开发服务器
运行以下命令启动 Vite 开发服务器，项目将在本地服务器上运行：

使用 pnpm:

```bash
pnpm dev
```

访问控制台输出的链接 (通常是 http://localhost:8080) 即可在浏览器中预览项目。

构建生产版本
运行以下命令构建用于生产环境的静态资源：

使用 pnpm:

```bash
pnpm build
```

构建完成后，静态资源文件将输出到项目根目录下的 dist 文件夹中。

预览生产构建
在本地预览生产构建版本，可以使用以下命令启动一个简单的静态服务器：

使用 pnpm:

```bash
pnpm preview
```

### 脚本命令

package.json 文件中定义了一些常用的脚本命令：

- dev: 启动 Vite 开发服务器。
- build: 构建生产版本的静态资源。
- preview: 在本地预览生产构建版本。
- format: 使用 Biome 格式化项目中的代码，并自动写入修改。 `bash npm run format `
- lint: 使用 Biome 检查项目中的代码风格和潜在问题。 `bash npm run lint `
- check: 使用 Biome 检查代码，并自动格式化和修复代码风格问题。 `bash npm run check `
- 建议在开发过程中经常使用 format 和 lint 命令，保持代码风格一致和代码质量。

## 贡献

欢迎任何形式的贡献！如果您有任何建议或发现了 Bug，请提交 Issue 或 Pull Request。
