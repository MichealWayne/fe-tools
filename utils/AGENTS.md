<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# AGENTS.md

## Project Overview

**fe-tools** is a comprehensive monorepo collection of frontend JavaScript/TypeScript utility libraries, organized into focused packages for different environments and use cases.

### Packages Structure

- **fe-tools-utils** (`packages/utils`) - Universal JavaScript utility functions (environment-agnostic)
- **fe-tools-webapi** (`packages/web-utils`) - Browser-specific utility functions
- **fe-tools-node-utils** (`packages/node-utils`) - Node.js utility functions
- **fe-tools-ai-utils** (`packages/ai-utils`) - AI-related operations utilities
- **fe-tools-canvas-utils** (`packages/canvas-utils`) - Canvas operations helpers
- **fe-tools-env** (`packages/env`) - Runtime environment detection utilities
- **fe-tools-node-img-build** (`packages/node-img-build`) - Node.js image processing utilities

### Technology Stack

- **Language**: TypeScript 4.9.5
- **Build Tool**: TypeScript Compiler (tsc)
- **Package Manager**: pnpm + Lerna (monorepo management)
- **Testing Framework**: Jest 26.6.3 with ts-jest
- **Documentation**: TypeDoc with custom themes
- **Code Quality**: ESLint + TypeScript ESLint

### Repository Information

- **Author**: Wayne
- **GitHub**: https://github.com/MichealWayne/fe-tools
- **License**: MIT
- **Version**: 1.0.0-beta01

---

## Build & Run

### Installation

```bash
# Install all dependencies using pnpm
pnpm install
```

### Build

```bash
# Build all packages
npm run build

# TypeScript compilation output to ./dist directories
```

### Documentation Generation

```bash
# Generate API documentation using TypeDoc
npm run docs

# Output will be generated according to typedoc.json configuration
```

---

## Testing Instructions

### Run All Tests

```bash
# Run all test suites across packages
npm run test

# Jest will execute all *.test.ts files in __tests__ directories
```

### Run Specific Package Tests

```bash
# Set environment variable to test specific package
TEST_API=utils npm run test        # Test packages/utils only
TEST_API=web-utils npm run test    # Test packages/web-utils only
TEST_API=node-utils npm run test   # Test packages/node-utils only
```

### Test File Patterns

- Test files location: `packages/*/(__tests__)/**/*.test.ts`
- Test framework: Jest with ts-jest preset
- Coverage reports: Generated in `<rootDir>/coverage` when running all tests

### Testing Guidelines

- All new utility functions MUST have corresponding unit tests
- Test files should be placed in `__tests__` directory within each package
- Use descriptive test names following the pattern: `describe('functionName', () => { it('should ...') })`
- Aim for high code coverage (excluding type definitions and device-specific code)

---

## Code Style Guidelines

### TypeScript Configuration

- **Target**: ES5 (for broad compatibility)
- **Module**: ESNext with Node resolution
- **Strict Mode**: Enabled (`strict: true`, `noImplicitAny: true`)
- **Source Maps**: Disabled for production builds
- **Lib**: ES6, ES7, DOM

### Linting

```bash
# Project uses ESLint with TypeScript parser
# Configuration in .eslintrc or package.json

# Linting is enforced via @typescript-eslint/eslint-plugin
```

### Code Conventions

1. **Function Documentation**

   - All exported functions MUST have JSDoc comments
   - Include Chinese and English descriptions
   - Provide parameter types and return types
   - Include at least 2-3 usage examples

2. **Naming Conventions**

   - Use camelCase for functions and variables
   - Use PascalCase for classes and types
   - Use UPPER_SNAKE_CASE for constants
   - Descriptive names over abbreviations

3. **File Organization**

   - One module per file (e.g., `array.ts`, `string.ts`)
   - Export all public functions from `index.ts`
   - Keep test files in `__tests__` directory

4. **Type Safety**
   - Avoid using `any` type
   - Provide explicit type annotations for function parameters
   - Use TypeScript generics where appropriate

---

## Project Structure

```
fe-tools/utils/
├── packages/
│   ├── utils/              # Universal utilities
│   │   ├── src/
│   │   │   ├── array.ts
│   │   │   ├── string.ts
│   │   │   ├── object.ts
│   │   │   ├── collection.ts
│   │   │   ├── validators.ts
│   │   │   ├── formatter.ts
│   │   │   ├── json.ts
│   │   │   └── index.ts
│   │   └── __tests__/
│   ├── web-utils/          # Browser utilities
│   │   ├── src/
│   │   │   ├── dom.ts
│   │   │   ├── cookies.ts
│   │   │   ├── storage.ts
│   │   │   ├── performance.ts
│   │   │   ├── network.ts
│   │   │   ├── form.ts
│   │   │   ├── i18n.ts
│   │   │   └── index.ts
│   │   └── __tests__/
│   └── node-utils/         # Node.js utilities
│       ├── src/
│       │   ├── fs/
│       │   ├── process/
│       │   ├── logging/
│       │   ├── http/
│       │   ├── data/
│       │   └── index.ts
│       └── __tests__/
├── types/                  # Shared type definitions
├── tsconfig.json          # TypeScript configuration
├── jest.config.js         # Jest configuration
├── lerna.json             # Lerna monorepo config
├── pnpm-workspace.yaml    # pnpm workspace config
└── typedoc.json           # Documentation config
```

---

## Development Workflow

### Adding New Utility Functions

1. **Choose the Correct Package**

   - Environment-agnostic → `packages/utils` (`fe-tools-utils`)
   - Browser-only → `packages/web-utils` (`fe-tools-webapi`)
   - Node.js-only → `packages/node-utils` (`fe-tools-node-utils`)

2. **Implementation Steps**

   ```bash
   # 1. Create or edit module file
   # packages/<package-name>/src/<module>.ts

   # 2. Add function with JSDoc
   # Include Chinese/English descriptions and examples

   # 3. Export from index.ts
   # packages/<package-name>/src/index.ts

   # 4. Write tests
   # packages/<package-name>/__tests__/<module>.test.ts

   # 5. Run tests
   npm run test

   # 6. Build to verify TypeScript compilation
   npm run build
   ```

3. **Documentation Requirements**
   - JSDoc comment with bilingual descriptions (Chinese + English)
   - Clear parameter descriptions with types
   - Return value description
   - At least 2 code examples showing common use cases
   - Edge cases and error handling notes

### Example Function Template

```typescript
/**
 * Brief description in Chinese
 *
 * English description
 *
 * @param {Type} paramName - Parameter description (Chinese)
 * @param {Type} paramName - Parameter description (English)
 * @returns {ReturnType} Return value description
 *
 * @example
 * // Example 1: Common use case
 * functionName(arg1, arg2); // => expected output
 *
 * @example
 * // Example 2: Edge case
 * functionName(edgeCase); // => expected behavior
 */
export function functionName(param: Type): ReturnType {
  // Implementation
}
```

---

## Common Commands Reference

```bash
# Install dependencies
pnpm install

# Run all tests
npm run test

# Run tests for specific package
TEST_API=utils npm run test

# Build all packages
npm run build

# Generate documentation
npm run docs

# TypeScript type checking (implicit in build)
tsc --noEmit
```

---

## Package Dependencies

### Production Dependencies

- Each package manages its own dependencies
- Keep dependencies minimal for smaller bundle sizes

### Development Dependencies (Root Level)

- `typescript`: 4.9.5
- `jest`: ^26.6.3
- `ts-jest`: ^26.2.0
- `@types/jest`: ^26.0.24
- `@types/node`: ^15.12.4
- `eslint`: ^6.8.0
- `@typescript-eslint/parser`: ^4.21.0
- `@typescript-eslint/eslint-plugin`: ^4.33.0
- `typedoc`: ^0.23.26
- `lerna`: ^4.0.0

---

## Monorepo Management

### Using Lerna

```bash
# Bootstrap all packages
lerna bootstrap

# Run command in all packages
lerna run <command>

# Publish packages (when ready)
lerna publish
```

### Using pnpm Workspace

- Workspace configuration: `pnpm-workspace.yaml`
- Packages are linked automatically
- Use `pnpm --filter <package-name>` for package-specific commands

---

## CI/CD Considerations

### Pre-commit Checklist

- [ ] All tests pass (`npm run test`)
- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] Code follows project conventions
- [ ] JSDoc comments are complete and bilingual
- [ ] New functions have corresponding tests

### Recommended Git Workflow

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Implement changes following code style guidelines
3. Write tests for new functionality
4. Ensure all tests pass
5. Build successfully
6. Commit using conventional commits format
7. Push and create Pull Request

---

## Special Notes for AI Agents

### When Adding New Functions

1. **Always check existing modules first** - Avoid duplicating functionality
2. **Maintain consistency** - Follow existing naming patterns and code structure
3. **Bilingual documentation is mandatory** - Both Chinese and English descriptions
4. **Test coverage is required** - No new functions without tests
5. **Type safety first** - Avoid `any`, use proper TypeScript types

### When Modifying Existing Code

1. **Read the full file first** - Don't make assumptions about structure
2. **Preserve existing patterns** - Match indentation, spacing, comment style
3. **Update tests accordingly** - Modify or add tests for changed behavior
4. **Check for breaking changes** - This is a public library, maintain compatibility

### Package Selection Guide

| Feature Type          | Package                    | Examples                                          |
| --------------------- | -------------------------- | ------------------------------------------------- |
| Pure JavaScript logic | `packages/utils`          | Array operations, string manipulation, validators |
| Browser APIs          | `packages/web-utils`      | DOM, localStorage, cookies, Web APIs              |
| Node.js APIs          | `packages/node-utils`     | File system, child process, HTTP server           |
| AI/ML operations      | `packages/ai-utils`       | AI-specific utilities                             |
| Canvas rendering      | `packages/canvas-utils`   | Canvas 2D operations                              |
| Runtime detection     | `packages/env`            | Web, Node.js, mini program, React Native runtime checks |
| Image processing      | `packages/node-img-build` | Image manipulation (Node.js)                      |

---

## Recent Feature Additions

- **Utils Package**: Collection operations, validators, formatters, JSON processing
- **Web-Utils Package**: Performance monitoring, network tools, form handling, i18n
- **Node-Utils Package**: HTTP utilities, data format conversion (CSV, XML)
- **Env Package**: Runtime environment detection

Total: 60+ new utility functions with complete documentation and examples.

---

## Documentation

- **README_EN.md**: English project overview
- **PROJECT_GUIDE.md**: Detailed project guide (Chinese)
- **packages/*/README.md**: Package-level usage notes and module indexes
- **Generated API Docs**: Run `npm run docs` to generate TypeDoc documentation

---

## Troubleshooting

### Common Issues

1. **TypeScript compilation errors**

   - Check `tsconfig.json` configuration
   - Ensure all types are properly imported
   - Verify lib array includes necessary ES versions

2. **Test failures**

   - Check if running in correct environment (Node vs Browser)
   - Verify mock setups for browser APIs in Node tests
   - Use `jest-localstorage-mock` for localStorage tests

3. **Module resolution issues**
   - Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
   - Check path aliases in `tsconfig.json`
   - Verify package.json exports

---

**Maintainer**: Wayne  
**For Issues**: https://github.com/MichealWayne/fe-tools/issues
