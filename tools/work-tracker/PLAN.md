# Work Tracker Tool - Plan & Requirements

## Purpose

A TypeScript CLI tool to manage work items (features and stories) for the ConceptShipAI framework. Provides a programmatic interface for AI agents and humans to track work without manual YAML editing and risk of data corruption.

---

## Goals

1. **Single Source of Truth**: One YAML file (`docs/work/work-items.yaml`) manages all work item metadata
2. **Prevent Conflicts**: Atomic ID generation, validation of data integrity
3. **Easy Querying**: Quick lookups for assignments, next ID, validation errors
4. **Agent-Friendly**: Simple CLI commands the AI can execute via terminal
5. **Type-Safe**: Full TypeScript types for all operations

---

## Non-Goals

- ❌ Not a project management UI (just CLI)
- ❌ Not replacing the detailed markdown descriptions (those stay in docs/artifacts/)
- ❌ Not handling git operations (agent does git add/commit separately)

---

## Requirements

### FR-001: Initialize Work Items File
**As a** user  
**I want** to initialize an empty work-items.yaml file  
**So that** I can start tracking work items

**Acceptance Criteria:**
- Command: `init`
- Creates `docs/work/work-items.yaml` if it doesn't exist
- Does not overwrite if file exists
- Creates valid YAML structure with empty work_items array

### FR-002: Get Next Available ID
**As a** role creating a work item  
**I want** to get the next available ID  
**So that** I don't have ID conflicts

**Acceptance Criteria:**
- Command: `next-id`
- Returns next sequential 5-digit ID (e.g., "00001", "00002")
- Reads existing work items and finds max ID
- Returns "00001" if no items exist

### FR-003: Add Feature
**As a** Business Analyst or planning role  
**I want** to add a feature to the registry  
**So that** it's tracked with a unique ID

**Acceptance Criteria:**
- Command: `add-feature --title "Feature Title" --created-by "Role Name"`
- Auto-assigns next available ID
- Sets status to "todo" by default
- Allows optional: `--description-file`, `--priority`, `--tags`
- Returns the assigned ID
- Validates required fields

### FR-004: Add Story
**As a** Requirements Engineer  
**I want** to add a user story to a feature  
**So that** requirements are tracked

**Acceptance Criteria:**
- Command: `add-story --feature 00001 --title "Story Title" --created-by "Role Name"`
- Auto-assigns next available ID
- Links to parent feature
- Sets status to "todo" by default
- Allows optional: `--description-file`, `--estimate`, `--acceptance-criteria`
- Returns the assigned ID
- Validates parent feature exists

### FR-005: List Work Items
**As a** any role  
**I want** to list work items with filters  
**So that** I can see relevant work

**Acceptance Criteria:**
- Command: `list`
- Optional filters: `--type`, `--status`, `--assigned-to`, `--feature`
- Outputs human-readable table format
- Shows: ID, Type, Title, Status, Assigned To
- Returns JSON with `--json` flag

### FR-006: Assign Work Item
**As a** Delivery Manager  
**I want** to assign a story to an implementation role  
**So that** they know what to work on

**Acceptance Criteria:**
- Command: `assign --id 00042 --to "Frontend Developer (Role 20)"`
- Updates assigned_to field
- Validates work item ID exists
- Can unassign with `--to "Unassigned"`
- Returns updated work item

### FR-007: Update Status
**As a** any role  
**I want** to update a work item's status  
**So that** progress is tracked

**Acceptance Criteria:**
- Command: `update-status --id 00042 --status in-progress`
- Valid statuses: todo, in-progress, done, blocked
- Updates status field
- Validates work item ID exists
- Updates status change date

### FR-008: Validate Work Items
**As a** Delivery Manager  
**I want** to validate the work items file  
**So that** I can catch data integrity issues

**Acceptance Criteria:**
- Command: `validate`
- Checks for duplicate IDs
- Checks for invalid statuses
- Checks for orphaned stories (parent feature doesn't exist)
- Checks for invalid date formats
- Returns list of errors with severity (error/warning)
- Exit code 0 if valid, 1 if errors found

### FR-009: Get Work Item Details
**As a** any role  
**I want** to get details of a specific work item  
**So that** I can see all its metadata

**Acceptance Criteria:**
- Command: `get --id 00042`
- Returns full work item details
- Human-readable format by default
- JSON format with `--json` flag
- Error if ID doesn't exist

---

## Data Model

```typescript
interface WorkItem {
  id: string;                    // "00001" - 5 digit zero-padded
  type: 'feature' | 'story';
  title: string;
  description_file?: string;     // Path to detailed markdown
  created_by: string;            // "Business Analyst (Role 1)"
  created_date: string;          // ISO date "YYYY-MM-DD"
  status: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority?: 'low' | 'medium' | 'high';
  tags?: string[];
  
  // Story-specific
  parent_feature?: string;       // ID of parent feature
  assigned_to?: string;          // "Frontend Developer (Role 20)" or null
  estimate?: 'S' | 'M' | 'L' | 'XL';
  acceptance_criteria?: string[];
  
  // Metadata
  updated_date?: string;         // ISO date "YYYY-MM-DD"
}

interface WorkItemsFile {
  work_items: WorkItem[];
}
```

---

## Technical Architecture

### File Structure
```
tools/work-tracker/
├── package.json
├── tsconfig.json
├── jest.config.js
├── .gitignore
├── PLAN.md (this file)
├── README.md
├── src/
│   ├── cli.ts              # CLI entry point
│   ├── commands/
│   │   ├── init.ts
│   │   ├── next-id.ts
│   │   ├── add-feature.ts
│   │   ├── add-story.ts
│   │   ├── list.ts
│   │   ├── assign.ts
│   │   ├── update-status.ts
│   │   ├── validate.ts
│   │   └── get.ts
│   ├── core/
│   │   ├── work-items.ts   # Core logic
│   │   ├── file-ops.ts     # YAML read/write
│   │   └── validator.ts    # Validation logic
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
└── tests/
    ├── commands/
    │   ├── init.test.ts
    │   ├── next-id.test.ts
    │   ├── add-feature.test.ts
    │   ├── add-story.test.ts
    │   ├── list.test.ts
    │   ├── assign.test.ts
    │   ├── update-status.test.ts
    │   ├── validate.test.ts
    │   └── get.test.ts
    └── core/
        ├── work-items.test.ts
        ├── file-ops.test.ts
        └── validator.test.ts
```

### Dependencies
- **Commander.js**: CLI argument parsing
- **js-yaml**: YAML parsing/serialization
- **Jest**: Testing framework
- **TypeScript**: Type safety

---

## TDD Test Plan

### Phase 1: Core Functionality (RED → GREEN → REFACTOR)

#### 1. File Operations Tests
- ✅ Read work items from YAML
- ✅ Write work items to YAML
- ✅ Handle missing file (return empty array)
- ✅ Handle malformed YAML (throw error)
- ✅ Create file if doesn't exist

#### 2. ID Generation Tests
- ✅ Get next ID when file is empty (returns "00001")
- ✅ Get next ID with existing items (increments correctly)
- ✅ Get next ID with gaps in sequence (continues from max)
- ✅ Zero-pad IDs correctly

#### 3. Validation Tests
- ✅ Validate no duplicate IDs
- ✅ Validate all required fields present
- ✅ Validate valid status values
- ✅ Validate story has valid parent feature
- ✅ Validate date formats
- ✅ Return list of validation errors

#### 4. Add Feature Tests
- ✅ Add feature with required fields
- ✅ Add feature with optional fields
- ✅ Auto-assign ID
- ✅ Set default status to "todo"
- ✅ Reject if missing required fields
- ✅ Return created feature

#### 5. Add Story Tests
- ✅ Add story with required fields
- ✅ Link to parent feature
- ✅ Auto-assign ID
- ✅ Reject if parent feature doesn't exist
- ✅ Accept optional fields
- ✅ Return created story

#### 6. List Tests
- ✅ List all work items
- ✅ Filter by type
- ✅ Filter by status
- ✅ Filter by assigned_to
- ✅ Filter by feature (parent)
- ✅ Return formatted output

#### 7. Assign Tests
- ✅ Assign story to role
- ✅ Unassign story
- ✅ Reject if ID doesn't exist
- ✅ Return updated item

#### 8. Update Status Tests
- ✅ Update status to valid value
- ✅ Reject invalid status
- ✅ Reject if ID doesn't exist
- ✅ Update updated_date
- ✅ Return updated item

### Phase 2: CLI Integration Tests
- ✅ CLI parses arguments correctly
- ✅ CLI calls correct command
- ✅ CLI outputs to stdout
- ✅ CLI exits with correct codes

---

## Development Order (TDD)

1. **Setup project structure** (package.json, tsconfig, jest)
2. **Write types.ts** (define interfaces)
3. **Write file-ops tests** → Implement file-ops.ts
4. **Write validator tests** → Implement validator.ts
5. **Write next-id tests** → Implement next-id command
6. **Write add-feature tests** → Implement add-feature command
7. **Write add-story tests** → Implement add-story command
8. **Write list tests** → Implement list command
9. **Write assign tests** → Implement assign command
10. **Write update-status tests** → Implement update-status command
11. **Write validate tests** → Implement validate command
12. **Write get tests** → Implement get command
13. **Write init tests** → Implement init command
14. **Wire up CLI** (cli.ts with commander)
15. **Integration tests**

---

## Usage Examples

```bash
# Initialize
cd tools/work-tracker
npm install
npm run build

# From project root
npm run work-tracker init

# Get next ID
npm run work-tracker next-id
# Output: 00001

# Add feature
npm run work-tracker add-feature \
  --title "User Authentication" \
  --created-by "Business Analyst (Role 1)" \
  --priority high
# Output: Created feature 00001

# Add story
npm run work-tracker add-story \
  --feature 00001 \
  --title "Login form UI" \
  --created-by "Requirements Engineer (Role 2)" \
  --estimate M
# Output: Created story 00002

# List all items
npm run work-tracker list

# List assigned to me
npm run work-tracker list --assigned-to "Frontend Developer (Role 20)"

# Assign story
npm run work-tracker assign --id 00002 --to "Frontend Developer (Role 20)"

# Update status
npm run work-tracker update-status --id 00002 --status in-progress

# Validate
npm run work-tracker validate

# Get details
npm run work-tracker get --id 00002 --json
```

---

## Integration with Agent Workflow

Agents will:
1. Use `next-id` to get ID before creating work item
2. Use `add-feature` or `add-story` to register work item
3. Create detailed description in `docs/artifacts/[role]/` if needed
4. Commit both the YAML and any artifact files together
5. Use `list` to see assignments
6. Use `assign` and `update-status` to manage work

Delivery Manager will:
1. Use `validate` to check data integrity
2. Fix any issues found
3. Use `list` with filters to understand work state

---

## Future Enhancements (Not in MVP)

- Export to different formats (CSV, JSON report)
- Statistics (count by status, burn-down data)
- Audit log (track changes to work items)
- Dependency tracking between stories
- Time tracking
- Comments/notes on work items
