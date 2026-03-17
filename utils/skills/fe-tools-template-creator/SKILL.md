---
name: fe-tools-template-creator
description: Extract a reusable project template from an existing codebase by removing business-specific code, preserving only the reusable engineering skeleton, and creating template usage docs such as README. Use when the user wants to turn a frontend or backend project into a reusable starter template, scaffold, or baseline engineering setup.
---
# Template Creator

## Goal
Turn an existing project into a reusable template that keeps the engineering foundation and removes business-specific implementation.

## Repository Context
- Existing shared templates live in the repository root one level above this package: `../project-templates/`.
- The template index is `../project-templates/README.md` when it exists.
- Verify these paths before referencing them in recommendations or follow-up edits.

## Workflow
1. Inspect the source project before editing:
   - framework and runtime
   - directory layout
   - scripts and toolchain
   - reusable engineering pieces vs business-specific modules
2. Separate files into three groups:
   - Keep: build config, lint config, TS config, test config, app shell, routing shell, shared infra, env examples, basic examples
   - Rewrite: package name, README, env names, demo routes/pages/components, sample API handlers, placeholder assets
   - Remove: business branding, product copy, private endpoints, domain models tied to one product, hard-coded tenant/customer data, private credentials, analytics IDs
3. Replace business code with neutral examples:
   - one minimal page or endpoint
   - one basic reusable component/module
   - one example env file if needed
4. Keep the template runnable after extraction.
5. Add or rewrite a README that covers:
   - what the template is for
   - stack and core dependencies
   - directory structure
   - install / dev / build commands
   - how to start customizing from the template
6. If the repository has a template index such as `../project-templates/README.md`, update it only when asked or when the new template is actually being added there.
7. If the extracted project is meant to live under `../project-templates/`, match the existing folder conventions first:
   - frontend templates under `../project-templates/frontend/`
   - backend templates under `../project-templates/backend/`
8. Before claiming a local template family exists, verify the target directory and README are present.

## Extraction Heuristics
- Preserve engineering value, remove business value.
- Keep code that teaches project structure or tooling.
- Replace feature modules with the smallest realistic example instead of leaving empty folders everywhere.
- Prefer neutral naming such as `app`, `demo`, `example`, `home`, `users`, `health`, `status`.
- Sanitize:
  - package names
  - repository URLs
  - author/company names when they are product-specific
  - `.env` values, secrets, tokens, API keys
  - logos, favicons, screenshots, brand colors when they are not meant to be shared

## README Requirements
The generated README should be template-oriented, not project-history-oriented. It should include:

1. Template summary
2. Tech stack
3. Available scripts
4. Folder structure
5. Quick start
6. Customization guide
7. Notes on what was intentionally left as placeholders

## Output Expectations
When performing this task:
- state what was retained, rewritten, and removed
- mention any business-specific areas that still need manual cleanup
- mention whether the result is intended to replace an existing local template, add a new one, or stay as a standalone extracted starter
- keep changes minimal but sufficient to make the template understandable and reusable

## Constraints
- Do not leave secrets or private business identifiers in the extracted template.
- Do not keep business-specific README content.
- Do not over-generalize the project until it becomes an empty shell.
- Prefer a runnable, opinionated starter over a completely blank scaffold.
- Do not claim the repository already has a matching template slot without verifying `../project-templates/`.
