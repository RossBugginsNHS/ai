# Work Tracker

A TypeScript CLI tool for managing work items (features and user stories) with YAML storage.

## Purpose

This tool supports the AgentMD workflow by providing programmatic work item management during software planning and development phases. It prevents manual YAML editing errors and ensures data integrity through validation.

## Status

✅ **COMPLETE** - All 9 functional requirements implemented with 35 passing tests

## Features

- **ID Management**: Automatic sequential 5-digit zero-padded ID generation
- **Feature Creation**: Create high-level features (Role 1: Business Analyst)
- **Story Creation**: Create user stories linked to parent features (Role 2: Requirements Engineer)
- **Status Tracking**: Update work item status (todo, in-progress, done, blocked)
- **Assignment**: Assign work items to roles
- **Querying**: List and get detailed work item information
- **Validation**: Validate YAML file integrity and relationships
- **YAML Storage**: Single source of truth with clean, readable format

## Installation

```bash
cd tools/work-tracker
npm install
npm run build
```

## Usage

### Initialize a new work items file

```bash
node dist/cli.js init -f docs/work/work-items.yaml
```

### Get next available ID

```bash
node dist/cli.js next-id -f docs/work/work-items.yaml
```

### Add a feature

```bash
node dist/cli.js add-feature \
  -f docs/work/work-items.yaml \
  -t "User Authentication" \
  -c "Business Analyst (Role 1)" \
  -p high \
  --tags "security,core"
```

### Add a story

```bash
node dist/cli.js add-story \
  -f docs/work/work-items.yaml \
  -t "Login Page UI" \
  --parent-feature 00001 \
  -c "Requirements Engineer (Role 2)" \
  -e M
```

### List, assign, update, get, and validate work items

```bash
# List all work items
node dist/cli.js list -f docs/work/work-items.yaml

# Assign work item
node dist/cli.js assign 00002 "Frontend Developer (Role 20)"

# Update status
node dist/cli.js update-status 00002 in-progress

# Get details
node dist/cli.js get 00002

# Validate
node dist/cli.js validate
```

See full documentation in [PLAN.md](./PLAN.md) for all command options and examples.

## Development

This project follows Test-Driven Development (TDD):

1. ✅ **RED**: Write failing tests
2. ✅ **GREEN**: Implement code to pass tests
3. ⏳ **REFACTOR**: Clean up code

### Run Tests

```bash
npm test
```

All 35 tests passing with 80% coverage threshold.

### Build

```bash
npm run build
```

See [PLAN.md](./PLAN.md) for complete requirements and test plan.

## License

MIT
