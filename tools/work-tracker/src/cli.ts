#!/usr/bin/env node

/**
 * CLI entry point for work-tracker tool
 * Uses Commander.js for command routing
 */

import { Command } from 'commander';
import { readWorkItems, writeWorkItems, ensureWorkItemsFile } from './core/file-ops';
import { validateWorkItems } from './core/validator';
import { getNextId, addFeature, addStory, updateWorkItem, findWorkItem } from './core/work-items';
import * as path from 'path';
import * as fs from 'fs';

const program = new Command();

// Default work items file path (relative to workspace root)
const DEFAULT_WORK_ITEMS_FILE = 'docs/work/work-items.yaml';

/**
 * Gets the work items file path from CLI args or uses default
 */
function getWorkItemsPath(options: any): string {
  return options.file || DEFAULT_WORK_ITEMS_FILE;
}

program
  .name('work-tracker')
  .description('CLI tool for managing work items (features and stories)')
  .version('1.0.0');

// FR-001: next-id command
program
  .command('next-id')
  .description('Get the next available work item ID')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      ensureWorkItemsFile(filePath);
      const data = readWorkItems(filePath);
      const nextId = getNextId(data);
      console.log(nextId);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-002: init command
program
  .command('init')
  .description('Initialize a new work items file')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      
      // Check if file already exists
      if (fs.existsSync(filePath)) {
        console.error(`Error: File ${filePath} already exists`);
        process.exit(1);
      }

      ensureWorkItemsFile(filePath);
      console.log(`Initialized work items file: ${filePath}`);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-003: add-feature command
program
  .command('add-feature')
  .description('Add a new feature')
  .requiredOption('-t, --title <title>', 'Feature title')
  .requiredOption('-c, --created-by <role>', 'Role creating the feature')
  .option('-p, --priority <priority>', 'Priority: low, medium, high')
  .option('--tags <tags>', 'Comma-separated tags')
  .option('-d, --description-file <path>', 'Path to description markdown file')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      ensureWorkItemsFile(filePath);
      const data = readWorkItems(filePath);

      const feature = addFeature(data, {
        title: options.title,
        created_by: options.createdBy,
        priority: options.priority,
        tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : undefined,
        description_file: options.descriptionFile,
      });

      writeWorkItems(filePath, data);
      console.log(`Created feature ${feature.id}: ${feature.title}`);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-004: add-story command
program
  .command('add-story')
  .description('Add a new story')
  .requiredOption('-t, --title <title>', 'Story title')
  .requiredOption('--parent-feature <id>', 'Parent feature ID')
  .requiredOption('-c, --created-by <role>', 'Role creating the story')
  .option('-e, --estimate <size>', 'Estimate: S, M, L, XL')
  .option('-p, --priority <priority>', 'Priority: low, medium, high')
  .option('--tags <tags>', 'Comma-separated tags')
  .option('-d, --description-file <path>', 'Path to description markdown file')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      ensureWorkItemsFile(filePath);
      const data = readWorkItems(filePath);

      const story = addStory(data, {
        title: options.title,
        parent_feature: options.parentFeature,
        created_by: options.createdBy,
        estimate: options.estimate,
        priority: options.priority,
        tags: options.tags ? options.tags.split(',').map((t: string) => t.trim()) : undefined,
        description_file: options.descriptionFile,
      });

      writeWorkItems(filePath, data);
      console.log(`Created story ${story.id}: ${story.title}`);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-005: list command
program
  .command('list')
  .description('List all work items')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .option('--type <type>', 'Filter by type: feature or story')
  .option('--status <status>', 'Filter by status: todo, in-progress, done, blocked')
  .option('--assigned-to <role>', 'Filter by assigned role')
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      const data = readWorkItems(filePath);

      let items = data.work_items;

      // Apply filters
      if (options.type) {
        items = items.filter(item => item.type === options.type);
      }
      if (options.status) {
        items = items.filter(item => item.status === options.status);
      }
      if (options.assignedTo) {
        items = items.filter(item => item.assigned_to === options.assignedTo);
      }

      // Display items
      if (items.length === 0) {
        console.log('No work items found.');
        return;
      }

      console.log(`Found ${items.length} work item(s):\n`);
      items.forEach(item => {
        console.log(`[${item.id}] ${item.type.toUpperCase()}: ${item.title}`);
        console.log(`  Status: ${item.status}`);
        if (item.priority) {
          console.log(`  Priority: ${item.priority}`);
        }
        if (item.assigned_to) {
          console.log(`  Assigned to: ${item.assigned_to}`);
        }
        if (item.parent_feature) {
          console.log(`  Parent feature: ${item.parent_feature}`);
        }
        console.log('');
      });
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-006: get command
program
  .command('get <id>')
  .description('Get details of a specific work item')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((id: string, options) => {
    try {
      const filePath = getWorkItemsPath(options);
      const data = readWorkItems(filePath);

      const item = findWorkItem(data, id);
      if (!item) {
        console.error(`Error: Work item ${id} not found`);
        process.exit(1);
      }

      // Display full details
      console.log(`Work Item: ${item.id}`);
      console.log(`Type: ${item.type}`);
      console.log(`Title: ${item.title}`);
      console.log(`Status: ${item.status}`);
      console.log(`Created by: ${item.created_by}`);
      console.log(`Created date: ${item.created_date}`);

      if (item.updated_date) {
        console.log(`Updated date: ${item.updated_date}`);
      }
      if (item.priority) {
        console.log(`Priority: ${item.priority}`);
      }
      if (item.tags && item.tags.length > 0) {
        console.log(`Tags: ${item.tags.join(', ')}`);
      }
      if (item.parent_feature) {
        console.log(`Parent feature: ${item.parent_feature}`);
      }
      if (item.assigned_to) {
        console.log(`Assigned to: ${item.assigned_to}`);
      }
      if (item.estimate) {
        console.log(`Estimate: ${item.estimate}`);
      }
      if (item.acceptance_criteria && item.acceptance_criteria.length > 0) {
        console.log('Acceptance criteria:');
        item.acceptance_criteria.forEach((criteria, idx) => {
          console.log(`  ${idx + 1}. ${criteria}`);
        });
      }
      if (item.description_file) {
        console.log(`Description file: ${item.description_file}`);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-007: assign command
program
  .command('assign <id> <role>')
  .description('Assign a work item to a role')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((id: string, role: string, options) => {
    try {
      const filePath = getWorkItemsPath(options);
      ensureWorkItemsFile(filePath);
      const data = readWorkItems(filePath);

      const item = updateWorkItem(data, id, { assigned_to: role });
      writeWorkItems(filePath, data);

      console.log(`Assigned ${item.id} to ${role}`);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-008: update-status command
program
  .command('update-status <id> <status>')
  .description('Update the status of a work item')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((id: string, status: string, options) => {
    try {
      const filePath = getWorkItemsPath(options);
      ensureWorkItemsFile(filePath);
      const data = readWorkItems(filePath);

      // Validate status value
      const validStatuses = ['todo', 'in-progress', 'done', 'blocked'];
      if (!validStatuses.includes(status)) {
        console.error(`Error: Invalid status "${status}". Must be one of: ${validStatuses.join(', ')}`);
        process.exit(1);
      }

      const item = updateWorkItem(data, id, { status: status as any });
      writeWorkItems(filePath, data);

      console.log(`Updated ${item.id} status to ${status}`);
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// FR-009: validate command
program
  .command('validate')
  .description('Validate the work items file for errors')
  .option('-f, --file <path>', 'Path to work items YAML file', DEFAULT_WORK_ITEMS_FILE)
  .action((options) => {
    try {
      const filePath = getWorkItemsPath(options);
      const data = readWorkItems(filePath);

      const result = validateWorkItems(data);

      if (result.valid) {
        console.log('✓ Work items file is valid');
        console.log(`  ${data.work_items.length} work item(s) found`);
      } else {
        console.error('✗ Work items file has validation errors:\n');
        result.errors.forEach(error => {
          console.error(`  ${error.work_item_id ? `[${error.work_item_id}] ` : ''}${error.message}`);
        });
        process.exit(1);
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Parse CLI arguments
program.parse(process.argv);
