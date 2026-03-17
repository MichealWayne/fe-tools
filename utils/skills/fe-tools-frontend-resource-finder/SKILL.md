---
name: fe-tools-frontend-resource-finder
description: Recommend 3-5 targeted frontend resources from the fe-tools curated directory for a user's question. Use when the user asks where to learn, what to use, how to choose frontend tools/resources/docs/platforms, or wants curated recommendations for CSS, JS/TS, React, Vue, Node/build, compatibility, AI tools, agent skills, testing, cross-platform, WebAssembly, or related modern frontend and AI coding workflows.
---
# Frontend Resource Finder

## Goal
Recommend the most relevant resources from this repository's curated indexes instead of dumping raw search results.

## Source Selection
1. Detect the user's input language.
2. Start from the repository root one level above this package: `../README.md` and `../README-en.md`.
3. If the request is mainly English, read `../README-en.md`.
4. Otherwise, read `../README.md`.
5. If the preferred file is missing the needed category, check the sibling README as a fallback.
6. Do not treat package-level READMEs in `utils/` as the curated resource index unless the root README pair is unavailable.

## Workflow
1. Classify the question first. Prefer one primary category and at most one secondary category:
   - Standards and docs: HTML, CSS, JavaScript, TypeScript, Web APIs, RFC, WASM
   - Compatibility and browser support
   - CSS tooling and styling systems
   - JS/TS libraries and data tooling
   - Request, storage, cache, offline, performance
   - React, Vue, Node.js, build tooling
   - Testing, security, encryption
   - AI tools, coding assistants, agent platforms, agent skills
   - Cross-platform, hybrid, mini-program, desktop
2. Verify the target README exists before relying on it.
3. Search only the matching README sections instead of treating the README as full-text search only.
4. Pick 3-5 resources, not more, unless the user explicitly asks for a long list.
5. For each resource, explain why it matches the question:
   - What problem it solves
   - Why it is a better fit than adjacent options in this directory
   - How it fits modern frontend or AI coding workflows when relevant
6. Prioritize resources that are:
   - Official docs or de facto standards for learning and correctness
   - Practical and current for modern frontend stacks
   - Helpful for AI-assisted development, automation, or agent workflows when the question touches those areas
7. Avoid recommending obviously outdated items unless the user is asking about legacy support or historical context.

## Output Format
Use this structure:

1. `Category`: one short label for how you classified the question.
2. `Recommended resources`: 3-5 items.
3. For each item include:
   - Resource name
   - Short reason tied to the user's scenario
   - A note about modern frontend / AI coding relevance when useful
4. `Why these over others`: one short comparison sentence or paragraph.
5. `Next step`: suggest what to read or try first.

## Heuristics
- For broad "how do I learn X" questions, include at least:
  - one official reference
  - one practical ecosystem tool or library
  - one productivity or AI-oriented resource when it meaningfully helps
- For library selection questions, bias toward:
  - smaller, actively useful tools for modern TS/frontend workflows
  - ecosystem fit over generic popularity
- For AI coding questions:
  - combine model/tool platforms with frontend-specific references when possible
  - if the user is building agents, include agent skills or agent platform entries from the README when relevant
- For compatibility questions:
  - lead with compatibility databases, then the relevant official spec/doc
- For legacy-browser or low-version environments:
  - it is acceptable to recommend older resources if they are specifically relevant to that constraint

## Search Hints
- Use README headings and nearby table rows instead of scanning the whole file every time.
- Common anchors to inspect:
  - `1.2` compatibility
  - `1.3` CSS tools
  - `1.4` JS plugins/libraries
  - `1.5` Vue
  - `1.6` React
  - `1.7` NodeJS and build
  - `1.10` testing/security/encryption
  - `1.11` AI
  - `1.13` IDE plugins
- When the query mentions skills, agents, copilots, or AI coding workflows, inspect the AI and agent-related parts first.
- When the query is about project starters or scaffolds, also inspect `../project-templates/README.md` before answering.

## Constraints
- Do not answer with a plain keyword match list.
- Do not recommend more than 5 resources by default.
- Do not fabricate resources that are not in the selected README file or `../project-templates/README.md` when template-related.
- Keep the answer decision-oriented and scenario-aware.
