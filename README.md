# TDD Skills

Test-Driven Development skills and workflows for AI coding agents. Works as a **Claude Code plugin** and can be installed as skills in **Cursor**.

## What's Included

This repository provides TDD-related skills that teach AI agents how to:

- Practice the Red-Green-Refactor cycle
- Write tests before implementation code
- Use testing patterns effectively
- Refactor with confidence using test coverage

## Installation

### Claude Code - Plugin Marketplace (Recommended)

```bash
/plugin marketplace add schicks/tdd-skill
/plugin install tdd-skills@tdd-skill
```

This gives namespaced skills like `/tdd-skills:tdd`.

### Claude Code - Direct Clone

For simpler installation without namespacing:

```bash
git clone https://github.com/schicks/tdd-skill ~/.claude/skills/tdd-skill
```

Skills in the `skills/` folder are auto-discovered.

### Cursor

Cursor supports the Agent Skills standard with several installation options:

**Option 1: Clone to global skills**

```bash
git clone https://github.com/YOUR_USERNAME/tdd-skill ~/.cursor/skills/tdd-skill
```

Skills in the `skills/` subfolder are auto-discovered.

**Option 2: Via Settings UI**

1. Open Cursor Settings (Cmd+Shift+J)
2. Navigate to Rules
3. Click Add Rule > Remote Rule (GitHub)
4. Enter the repository URL

**Option 3: Per-project**

```bash
git clone https://github.com/YOUR_USERNAME/tdd-skill .cursor/skills/tdd-skill
```

## Development

### Local Development Setup

The `.claude/skills/`  directory contain symlinks to the actual skill folders. This allows you to:

- Edit skills in `skills/` and immediately test them
- Work on this repo with the skills active in your session
- Keep the canonical skill source in one place

### Workflow

1. Edit the actual skill files in `skills/*/SKILL.md`
2. Restart your AI session to pick up changes (some platforms hot-reload)
3. Test by invoking `/skill-name` or letting the agent auto-discover based on context

The symlinks ensure changes are immediately reflected without copying files.

### Adding a New Skill

1. Create `skills/new-skill-name/SKILL.md`
2. Add frontmatter with matching `name: new-skill-name`
3. Write instructions in the markdown body
4. Optionally add `scripts/`, `references/`, or `assets/` subdirectories
5. Add symlinks for development:
   ```bash
   ln -s ../../skills/new-skill-name .claude/skills/new-skill-name
   ln -s ../../skills/new-skill-name .cursor/skills/new-skill-name
   ```

Skills are automatically discovered—no need to update marketplace.json for new skills within the same plugin.

### SKILL.md Format

Each skill file uses YAML frontmatter:

```markdown
---
name: skill-name
description: What this skill does and when to use it.
---

# Skill Title

Instructions for the agent...
```

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Lowercase, hyphens. Max 64 chars. Must match folder name. |
| `description` | Yes | Max 1024 chars. Explains what and when. |
| `license` | No | License name (e.g., `MIT`) |
| `metadata` | No | Key-value pairs for author, version |
| `disable-model-invocation` | No | If `true`, only manual invocation works |

### Best Practices

- Keep each `SKILL.md` under 500 lines (< 5000 tokens)
- Move detailed reference material to a `references/` subdirectory
- Write clear `description` fields with keywords for agent discovery
- Each skill folder name must match the `name` field in its frontmatter
- Use `disable-model-invocation: true` for skills that should only run on explicit command

## License

MIT
