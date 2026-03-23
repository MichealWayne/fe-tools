---
name: sync-skills
description: "Sync repository skills to local AI tool skill directories. Copies skill files from the source of truth to Claude, Cursor, Codex, Trae, and CodeBuddy directories. Use when new skills are added or updated, tool directories need refresh, or the user asks to copy skills, update agent skills, or install skills locally."
---
# Sync Skills

## Workflow
1. Treat `skills/` as the preferred source of truth. If it does not exist, fall back to `utils/skills/`.
2. Run `npm run skills:sync` to copy skills into tool directories.
3. Avoid editing `.codex/skills`, `.claude/skills`, `.cursor/skills`, `.trae/skills`, or `.codebuddy/skills` directly.
4. Verify sync by checking that target directories contain the expected skill files.
