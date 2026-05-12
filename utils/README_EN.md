# fe-tools

A TypeScript utility monorepo for browser, Node.js, canvas, AI prompt, environment, and image-processing helpers.

## 📦 Packages

The project is organized as a monorepo with the following packages:

| Directory | Package name | Purpose |
| --- | --- | --- |
| `packages/utils` | `fe-tools-utils` | Universal JavaScript/TypeScript utilities |
| `packages/web-utils` | `fe-tools-webapi` | Browser-specific utilities |
| `packages/node-utils` | `fe-tools-node-utils` | Node.js utilities |
| `packages/ai-utils` | `fe-tools-ai-utils` | AI prompt and model-adjacent helpers |
| `packages/canvas-utils` | `fe-tools-canvas-utils` | Canvas drawing and geometry helpers |
| `packages/env` | `fe-tools-env` | Runtime environment detection |
| `packages/node-img-build` | `fe-tools-node-img-build` | Node.js image-processing helpers |

The root build also creates an aggregate `fe-tools` package under `dist/fe-tools`.

## 🔍 Features

- Modular architecture for flexible adoption
- TypeScript support with comprehensive type definitions
- Thoroughly tested with Jest
- Detailed documentation for each utility function
- Environment-specific packages to prevent unnecessary code bundling

## 📄 Documentation

Full API documentation is available by running:

```sh
npm run docs
```

This generates documentation using TypeDoc with the configuration specified in `typedoc.json`.

## 🔧 Development

### Requirements

- Node.js
- pnpm

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

This project uses ESLint and Prettier for code formatting. Configuration files are included in the repository.

### Common Commands

```sh
pnpm install
npm run test
TEST_API=utils npm run test
npm run build
npm run docs
```

## 📝 License

This workspace is licensed under the MIT License as declared in `package.json`.

## 👤 Author

- Wayne
- GitHub: [MichealWayne](https://github.com/MichealWayne)
- Issue Tracker: [GitHub Issues](https://github.com/MichealWayne/fe-tools/issues)
