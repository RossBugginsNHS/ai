# Work Tracking Data

This directory contains the work items data managed by the `work-tracker` tool.

## Files

- **work-items.yaml**: Single source of truth for all features and stories
  - Managed programmatically via `tools/work-tracker` CLI
  - Do NOT edit manually - use the tool commands instead
  - Automatically validated on write operations

## Structure

```yaml
work_items:
  - id: '00001'
    type: feature
    title: Feature title
    status: todo
    created_by: Role name
    created_date: '2025-11-07'
    # ... additional fields
  
  - id: '00002'
    type: story
    title: Story title
    parent_feature: '00001'
    status: todo
    created_by: Role name
    created_date: '2025-11-07'
    # ... additional fields
```

## Usage

Initialize the work items file:

```bash
cd tools/work-tracker
node dist/cli.js init
```

The tool defaults to `data/work-tracking/work-items.yaml`.

See `tools/work-tracker/README.md` for full usage documentation.

## Related Documentation

- Feature descriptions: Can be stored in `docs/work/features/<ID>.md`
- Story descriptions: Can be stored in `docs/work/features/<feature-id>/stories/<ID>.md`
- These are optional - the work-items.yaml is the source of truth
