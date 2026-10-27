# nextjs+ts

A Next.js 16 + React 19 + TypeScript template using the App Router. Requires Node.js 20.19+, 22.13+, or 24+.

## Scripts

- dev: Start dev server
- build: Type check then create a production build
- start: Start production server
- lint / lint:fix: ESLint checks
- typecheck: Run TypeScript without emitting files

## Structure

- app/: App Router entry with layout and a demo page
- public/: Static assets (logo.svg, favicon.svg)
- eslint.config.mjs / .prettierrc.js: Lint & format settings
- tsconfig.json: TS config

## Usage

1. cd project-templates/frontend/nextjs+ts
2. npm install
3. npm run dev

Run `npm run lint`, `npm run typecheck`, and `npm run build` before deploying.
