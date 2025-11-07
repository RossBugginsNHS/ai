/**
 * Validation logic for work items
 */

import { WorkItem, WorkItemsFile, ValidationError, ValidationResult, WorkItemStatus } from '../types';

const VALID_STATUSES: WorkItemStatus[] = ['todo', 'in-progress', 'done', 'blocked'];
const ID_REGEX = /^\d{5}$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validate a single work item
 * @param item Work item to validate
 * @param allItems All work items (for checking parent references)
 * @returns Array of validation errors
 */
export function validateWorkItem(item: WorkItem, allItems: WorkItem[]): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check required fields
  if (!item.id) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: id',
      work_item_id: item.id,
    });
  }

  if (!item.type) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: type',
      work_item_id: item.id,
    });
  }

  if (!item.title) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: title',
      work_item_id: item.id,
    });
  }

  if (!item.created_by) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: created_by',
      work_item_id: item.id,
    });
  }

  if (!item.created_date) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: created_date',
      work_item_id: item.id,
    });
  }

  if (!item.status) {
    errors.push({
      severity: 'error',
      message: 'Work item missing required field: status',
      work_item_id: item.id,
    });
  }

  // Validate ID format (5 digits, zero-padded)
  if (item.id && !ID_REGEX.test(item.id)) {
    errors.push({
      severity: 'error',
      message: `Invalid ID format: ${item.id}. Must be 5 digits (e.g., "00001")`,
      work_item_id: item.id,
    });
  }

  // Validate status
  if (item.status && !VALID_STATUSES.includes(item.status)) {
    errors.push({
      severity: 'error',
      message: `Invalid status: ${item.status}. Must be one of: ${VALID_STATUSES.join(', ')}`,
      work_item_id: item.id,
    });
  }

  // Validate date formats
  if (item.created_date && !DATE_REGEX.test(item.created_date)) {
    errors.push({
      severity: 'error',
      message: `Invalid date format: ${item.created_date}. Must be YYYY-MM-DD`,
      work_item_id: item.id,
    });
  }

  if (item.updated_date && !DATE_REGEX.test(item.updated_date)) {
    errors.push({
      severity: 'error',
      message: `Invalid date format: ${item.updated_date}. Must be YYYY-MM-DD`,
      work_item_id: item.id,
    });
  }

  // Story-specific validation
  if (item.type === 'story') {
    // Story must have parent_feature
    if (!item.parent_feature) {
      errors.push({
        severity: 'error',
        message: 'Story must have parent_feature field',
        work_item_id: item.id,
      });
    } else {
      // Parent feature must exist
      const parentExists = allItems.some(i => i.id === item.parent_feature && i.type === 'feature');
      if (!parentExists) {
        errors.push({
          severity: 'error',
          message: `Story references non-existent parent feature: ${item.parent_feature}`,
          work_item_id: item.id,
        });
      }
    }
  }

  return errors;
}

/**
 * Validate all work items in the file
 * @param data Work items file data
 * @returns Validation result with errors
 */
export function validateWorkItems(data: WorkItemsFile): ValidationResult {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();

  // Check for duplicate IDs
  for (const item of data.work_items) {
    if (seenIds.has(item.id)) {
      errors.push({
        severity: 'error',
        message: `duplicate ID found: ${item.id}`,
        work_item_id: item.id,
      });
    }
    seenIds.add(item.id);
  }

  // Validate each work item
  for (const item of data.work_items) {
    const itemErrors = validateWorkItem(item, data.work_items);
    errors.push(...itemErrors);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
