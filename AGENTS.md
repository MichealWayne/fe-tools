# AGENTS.md

## Purpose

This repository is a front-end tooling collection, not a single app. It contains:

- documentation/resource indexes
- Chrome extension assets
- reusable utility packages
- starter project templates

Agents should first identify which area they are changing, then follow the rules for that area instead of assuming one workflow fits the whole repo.

## Scope

These instructions apply to the entire repository rooted at `fe-tools/`.

## Repository Map

- `README.md`, `README-en.md`: primary project documentation.
- `chrome-extension/`: built extension assets and static scripts used for lookup/search features.
- `datas/`: JSON datasets consumed by the extension.
- `project-templates/`: frontend and backend starter templates.
- `utils/`: the main package workspace; TypeScript utility packages, tests, scripts, skills, and publishing/build tooling.
- `.windsurfrules`: existing high-level project rules; use it as supporting context, but prefer this file when instructions conflict.

## Default Workflow

1. Read the nearest relevant README or target file before editing.
2. Determine whether the task belongs to `datas`, `chrome-extension`, `project-templates`, or `utils`.
3. Keep changes scoped to the requested area. Do not refactor unrelated parts of the repo.
4. Validate using the lightest meaningful checks for the files you changed.
5. Report assumptions, especially when inferring schema, package conventions, or template behavior.

## Global Rules

- Preserve the repository's mixed nature. Some directories are source code, some are generated/static assets, and some are reference data.
- Prefer minimal edits over broad formatting churn.
- Keep existing bilingual or Chinese-first documentation style where already present.
- Do not rename top-level directories or data files unless explicitly requested.
- Do not delete large blocks of reference data, templates, or utility exports without clear user approval.
- If a file appears generated or bundled, avoid hand-editing it unless the task explicitly targets that output artifact.

## Directory Rules

### `datas/`

- Treat JSON files as source-of-truth datasets for search and lookup.
- Preserve record shape, field order, and neighboring style unless schema changes are explicitly required.
- Validate every changed JSON file after edits.
- Be extra careful with URLs, regex strings, command examples, and human-readable descriptions.

Preferred validation:

1. `jq empty <file>`
2. `python -m json.tool <file>`

### `chrome-extension/`

- Assume files under `assets/` are built artifacts unless the task explicitly says to edit them.
- Prefer editing original source files if they exist elsewhere in the repo; if no source exists, call out that you are modifying shipped static files directly.
- Keep manifest, scripts, and static resources compatible with the existing extension structure.
- Avoid introducing new build assumptions without confirming where the extension source of truth lives.

### `project-templates/`

- Treat each template as an independent starter project.
- Preserve the template's chosen stack and coding style.
- Do not apply a framework-specific pattern from one template to all others.
- When editing a template, also update its local README if the setup, scripts, or generated structure changes.
- Avoid dependency upgrades across many templates unless the user explicitly asks for a version sweep.

### `utils/`

- This is the main engineering workspace and package area.
- Prefer TypeScript for source changes.
- Respect the existing workspace/package structure under `utils/packages/*`.
- When adding or changing package exports, check whether index exports, docs, tests, or skill sync scripts also need updates.
- Keep package changes modular; avoid cross-package breakage.

Useful workspace files:

- `utils/package.json`
- `utils/pnpm-workspace.yaml`
- `utils/packages/*`
- `utils/scripts/*`
- `utils/skills/*`

## Testing And Validation

Use the narrowest relevant validation for the changed area.

- JSON data: syntax validation per changed file.
- Docs-only changes: proofread links, paths, headings, and examples.
- `utils/` package changes: run targeted tests first, then broader checks only if needed.
- Template changes: validate config syntax and, when practical, run the template's local checks instead of global repo commands.
- Chrome extension static changes: sanity-check referenced files and manifest/script consistency.

If you could not run validation, say so explicitly.

## Documentation Expectations

- Update documentation when behavior, usage, file layout, or public APIs change.
- Keep examples copy-pasteable.
- Prefer concise explanations tied to the directory being edited.

## Change Reporting

Final summaries should include:

- what area of the repo changed
- what was added, removed, or corrected
- what validation was run
- any assumptions or risks that remain

## What To Avoid

- Do not assume the repo has one root build command for every directory.
- Do not bulk-format JSON, markdown, templates, and package code together.
- Do not edit bundled assets when a source file exists and is the real point of maintenance.
- Do not impose `utils/` engineering conventions on plain data files.
- Do not treat archived or reference content as disposable.

## First Files To Read

Before substantial work, read only the files relevant to the task:

- repository-wide context: `README.md`
- data tasks: target file in `datas/` and `datas/README.md` if present
- template tasks: `project-templates/README.md` and the target template README
- utility package tasks: `utils/package.json`, target package files, and nearby tests
- extension tasks: `chrome-extension/README.md`, `manifest.json`, and the target script/resource
