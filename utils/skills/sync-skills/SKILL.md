---
name: sync-skills
description: Sync repository skills to local AI tool skill directories. Use when new skills are added or updated and tool directories need refresh.
---
# Sync Skills

## Workflow
1. Treat `skills/` as the preferred source of truth. If it does not exist, fall back to `utils/skills/`.
2. Run `npm run skills:sync` to copy skills into tool directories.
3. Avoid editing `.codex/skills`, `.claude/skills`, `.cursor/skills`, `.trae/skills`, or `.codebuddy/skills` directly.
