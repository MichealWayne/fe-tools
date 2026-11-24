# Contributing

[English](CONTRIBUTING-en.md) · [简体中文](CONTRIBUTING.md)

Thank you for improving FE-Tools. This repository contains resource indexes, JSON data, TypeScript utility packages, project templates, and built Chrome extension output. Identify the area your change affects and keep related changes together in one pull request.

## Before submitting

- Read the target area's README, configuration, and neighboring implementations. Follow its existing data structures and conventions.
- Explain the purpose, scope, and verification steps in your PR. Include screenshots or examples when a change affects the interface or output.
- Keep changes focused. Do not include dependency directories, build output, local configuration, or unrelated formatting changes.

## Area-specific guidance

### Resource indexes and data

- When adding or updating a resource, provide a verifiable official or primary-source link and a concise, accurate description of its purpose. Check that the link works, and mark projects that are archived or no longer maintained.
- When editing JSON under `datas/`, follow the fields, structure, and ordering used by nearby records. Make descriptions useful for search and comparison; do not copy large portions of third-party documentation or webpages.
- For quoted code, images, text, or data, identify the original source, author or project, and applicable license. Do not submit material whose source or redistribution rights you cannot confirm.
- When changing an index or directory in a README, check the corresponding sections in both `README.md` and `README-en.md`.

### `utils/` packages

- Edit the relevant source under `utils/packages/*` and check whether related exports, package documentation, and tests also need updates.
- Run the narrowest verification that fits the change. Common commands are documented in [`utils/README_EN.md`](utils/README_EN.md). For example, run `npm run test` from `utils/`, or set `TEST_API=<package-dir>` to target a package; run `npm run build` and `npm run docs` as needed.
- Package metadata and license declarations may differ by package. Check the target package's `package.json`; do not treat one package's declaration as the license for the entire repository.

### `project-templates/`

- Each template is an independent project. Before editing, read its README, `package.json`, and local `.windsurfrules` if present, and preserve its existing stack.
- If a change affects template setup, commands, or directory structure, update that template's README and validate its configuration or build using its own scripts.
- Do not apply one template's dependencies or engineering conventions across the other templates in bulk.

### `chrome-extension/`

- This directory contains loadable extension output. The separate source repository referenced by [`chrome-extension/README.md`](chrome-extension/README.md) is authoritative for source code, build scripts, and version checks.
- Do not manually edit generated or bundled files. Implement and verify extension changes in the source repository first, then update this repository's output through that project's process. Include the corresponding version and source information in your PR.

## Sources, licenses, and third-party material

- Submit only content you created or material clearly permitted for the proposed use and distribution. For copied, adapted, or bundled code, fonts, icons, images, text, data, and generated files, provide source links, version and author information, license details, and any required attribution.
- Do not submit material with unknown provenance, files copied directly from another repository, or bundled output whose build source cannot be identified. Preserve existing copyright and license notices; do not change a third party's license.
- This repository has no root-level `LICENSE`, so no single license for the entire repository can be inferred. Confirmed declarations apply only to the scopes identified by their metadata: `utils/package.json` declares MIT; the seven utility packages in `utils/packages/*/package.json` declare ISC; and some template `package.json` files declare ISC. Redistribution terms for other directories and files remain unconfirmed.
- `utils/.windsurfrules` records ISC as the workspace license, which conflicts with the MIT declarations in `utils/package.json` and `utils/README_EN.md`. Do not infer a license from this conflict. Preserve the existing declaration in the target file, and disclose the source and license of any new material in your PR.

Repository owners still need to confirm ownership and intended redistribution for each area, then decide whether to use one license or separate licenses by directory or package. Each declaration should have a clear scope, and the existing `utils/` conflict should be resolved. If a material's source or ownership is unclear, verify it first; do not make a new licensing commitment or assume a root-level license.

## Verification

- Documentation changes: check Markdown headings, examples, and relative links.
- JSON data changes: run `jq empty <file>` or `python -m json.tool <file>`.
- Utility package or template changes: follow the target area's README, scripts, and local rules, and report the verification commands and results you actually ran.
- Extension changes: follow the extension source repository's build and check process, and confirm that submitted output comes from that source version.
