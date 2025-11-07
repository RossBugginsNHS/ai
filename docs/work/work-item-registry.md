# Work Item Registry

> **Purpose**: Central registry of all work item IDs to ensure uniqueness and prevent conflicts.

**🔴 CRITICAL**: All roles creating features or stories MUST add entries to this registry.

**Note**: This registry tracks ID allocation only. Status and assignments are managed in:
- Work item files themselves (source of truth for status/assignment)
- `assignments.md` (active work view for implementation roles)

---

## How to Use This Registry

### When Creating a New Work Item (Feature or Story)

1. **Check this file** for the highest ID in use
2. **Increment by 1** for your new item
3. **Add entry immediately** to this registry
4. **Create the actual feature/story file** with that ID
5. **Commit both files together**

### Format

| ID | Type | Title | Created By | Created Date | Location Pattern |
|----|------|-------|------------|--------------|------------------|
| ID | feature/story | Brief title | Role Name | YYYY-MM-DD | Path pattern (status folder varies) |

**Note**: Location shows pattern - actual location depends on status (todo/in-progress/done folders)

---

## Registry

| ID | Type | Title | Created By | Created Date | Location Pattern |
|----|------|-------|------------|--------------|------------------|
| | | | | | |

*(No work items yet - start with ID 00001)*

---

## ID Assignment Rules

1. **Sequential**: IDs increment sequentially (00001, 00002, 00003, etc.)
2. **No gaps required**: It's okay to skip numbers if an item is deleted
3. **Globally unique**: Each ID is used only once (features and stories share the same ID space)
4. **Role 1 starts**: Business Analyst typically creates first features starting at 00001
5. **Role 2 continues**: Requirements Engineer creates stories continuing the sequence
6. **All roles update**: Any role creating work items adds to this registry

## Delivery Manager Responsibilities

When Role 12 (Delivery Manager) starts:

1. **Audit this registry** against actual files in `docs/work/`
2. **Check for ID conflicts** (duplicate IDs, missing entries, gaps)
3. **Verify completeness** - all work item files have registry entries
4. **Fix numbering issues** if any roles made mistakes
5. **Add missing entries** for work items that exist but aren't registered
6. **Clean up** any inconsistencies

**Note**: Delivery Manager does NOT update status/assignments here - those are managed in:
- Individual work item files (status field in feature.md or story.md)
- `assignments.md` (active work assignments)

## Common Mistakes to Avoid

- ❌ Creating work item without adding to registry
- ❌ Reusing an ID that's already taken
- ❌ Not checking registry before assigning new ID
- ❌ Creating multiple items with same ID
- ❌ Forgetting to commit registry with work item
- ❌ Updating status/assignment in registry instead of work item file

## Examples

### Example 1: Business Analyst creates first feature

```markdown
| ID | Type | Title | Created By | Created Date | Location Pattern |
|----|------|-------|------------|--------------|------------------|
| 00001 | feature | User Authentication | Business Analyst (Role 1) | 2025-11-07 | docs/work/features/*/00001-user-authentication/ |
```

*Note: Status and assignment tracked in the feature.md file itself*

### Example 2: Requirements Engineer adds stories

```markdown
| ID | Type | Title | Created By | Created Date | Location Pattern |
|----|------|-------|------------|--------------|------------------|
| 00001 | feature | User Authentication | Business Analyst (Role 1) | 2025-11-07 | docs/work/features/*/00001-user-authentication/ |
| 00002 | story | Login form UI | Requirements Engineer (Role 2) | 2025-11-07 | docs/work/features/*/00001-user-authentication/stories/00002-story.md |
| 00003 | story | Password reset flow | Requirements Engineer (Role 2) | 2025-11-07 | docs/work/features/*/00001-user-authentication/stories/00003-story.md |
```

*Note: `*` in path represents todo/in-progress/done - actual location depends on current status*

### Example 3: Growing registry over time

```markdown
| ID | Type | Title | Created By | Created Date | Location Pattern |
|----|------|-------|------------|--------------|------------------|
| 00001 | feature | User Authentication | Business Analyst (Role 1) | 2025-11-07 | docs/work/features/*/00001-user-authentication/ |
| 00002 | story | Login form UI | Requirements Engineer (Role 2) | 2025-11-07 | docs/work/features/*/00001-user-authentication/stories/00002-story.md |
| 00003 | story | Password reset flow | Requirements Engineer (Role 2) | 2025-11-07 | docs/work/features/*/00001-user-authentication/stories/00003-story.md |
| 00004 | story | OAuth integration | Requirements Engineer (Role 2) | 2025-11-07 | docs/work/features/*/00001-user-authentication/stories/00004-story.md |
| 00005 | feature | User Profile Management | Business Analyst (Role 1) | 2025-11-08 | docs/work/features/*/00005-user-profile-management/ |
| 00006 | story | Edit profile form | Requirements Engineer (Role 2) | 2025-11-08 | docs/work/features/*/00005-user-profile-management/stories/00006-story.md |
```

*Check assignments.md to see which stories are currently assigned and being worked on*

---

## Notes

- This registry is the **source of truth** for ID allocation
- If conflicts occur, Delivery Manager resolves them
- Registry must be updated atomically with work item creation
- Use `git log` to see history of ID assignments if needed
