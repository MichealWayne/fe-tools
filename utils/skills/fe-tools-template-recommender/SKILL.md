---
name: fe-tools-template-recommender
description: Recommend the most suitable project template or initialization path from fe-tools project-templates based on product, framework, runtime, and delivery constraints. Use when the user asks which frontend or backend template to start from, how to bootstrap a React/Vue/Node/TypeScript project, or wants comparisons such as React admin template choices, Vite vs Webpack, or Koa2 vs Fastify vs NestJS.
---
# Template Recommender

## Goal
Recommend a concrete template or initialization path from the repository-level `../project-templates/` directory based on the user's scenario, not just list all available templates.

## Scope
Verify these paths before recommending:
- Frontend templates:
  - `../project-templates/frontend/vite-react+ts`
  - `../project-templates/frontend/nextjs+ts`
  - `../project-templates/frontend/react`
  - `../project-templates/frontend/vite-vue3+ts`
  - `../project-templates/frontend/vue`
  - `../project-templates/frontend/webpack+ts`
  - `../project-templates/frontend/webpack`
- Backend templates:
  - `../project-templates/backend/koa2`
  - `../project-templates/backend/fastify`
  - `../project-templates/backend/nestjs`

## Workflow
1. Classify the request:
   - Frontend app
   - Backend API/service
   - Full-stack starting point
   - "Need TypeScript", "need fast bootstrap", "need admin dashboard", "need SSR/SEO", "need high performance", "need low cognitive overhead"
2. Start from `../project-templates/README.md`, then read only the relevant `../project-templates/*/README.md` files before recommending.
3. Verify the recommended template directory exists and prefer templates that also include a local `README.md`.
4. Recommend one primary template and optionally one fallback.
5. Explain the decision using delivery constraints:
   - Runtime and framework fit
   - Build tool complexity
   - Team familiarity
   - Modernity of stack
   - Whether the template looks production-oriented or demo-oriented
6. If a template is listed in the index but marked as TODO, beta, or otherwise incomplete, call that out explicitly before recommending it.
7. If no existing template is a strong fit, say so explicitly and recommend the nearest starting point plus the missing pieces to add.

## Selection Heuristics
- Prefer modern defaults unless the user asks for legacy compatibility.
- Frontend:
  - `vite-react+ts`: default for modern React SPA, admin systems, internal tools, and fast TypeScript startup
  - `nextjs+ts`: use for SSR, SEO, App Router, content-heavy sites, or routes that benefit from server capabilities
  - `react`: use only when the user needs a traditional Webpack-based React baseline or compatibility with older setups
  - `vite-vue3+ts`: default for modern Vue 3 + TS projects
  - `vue`: use mainly for Vue 2 / legacy Webpack projects
  - `webpack+ts`: use for framework-free TS apps or when custom bundling control matters more than startup speed
  - `webpack`: use for plain JS legacy or very simple non-TS bundling needs
- Backend:
  - `fastify`: prefer for modern TypeScript APIs, performance, plugin ecosystem, Swagger/OpenAPI, and production-oriented Node services
  - `koa2`: prefer for lighter custom services when the team wants a simpler middleware mental model
  - `nestjs`: prefer when the team wants stronger structure, DI, modular architecture, or enterprise-style conventions, but verify its local completeness first because the root template index currently lists it as TODO

## Output Format
Use this structure:

1. `Recommendation`: the best-fit template path
2. `Why`: 2-4 short reasons tied to the user's requirements
3. `Fallback`: optional second option and when to choose it instead
4. `Bootstrap path`: what to do next after copying the template
5. `Tradeoff`: one short sentence about what the chosen template does not optimize for

## Constraints
- Do not dump all templates unless the user explicitly asks for a catalog.
- Do not recommend outdated templates as the default when a modern one exists.
- If recommending a legacy template, say why the legacy constraint matters.
- Base recommendations on the actual templates present in `../project-templates/`.
- Do not present a template as available until you verify the directory exists.
- Do not treat the root index as ground truth when it conflicts with the actual directories or per-template READMEs.
