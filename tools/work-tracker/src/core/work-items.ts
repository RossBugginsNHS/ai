/**
 * Work items core business logic
 * Handles work item creation, updates, and queries
 */

import { WorkItem, WorkItemsFile, WorkItemType } from '../types';

/**
 * Gets the next available work item ID
 * Finds the max ID in current items and increments it
 * Returns "00001" if no items exist
 */
export function getNextId(data: WorkItemsFile): string {
  if (data.work_items.length === 0) {
    return '00001';
  }

  // Find max ID
  const maxId = Math.max(
    ...data.work_items.map(item => parseInt(item.id, 10))
  );

  // Increment and zero-pad to 5 digits
  const nextId = maxId + 1;
  return nextId.toString().padStart(5, '0');
}

/**
 * Finds a work item by ID
 * Returns undefined if not found
 */
export function findWorkItem(data: WorkItemsFile, id: string): WorkItem | undefined {
  return data.work_items.find(item => item.id === id);
}

/**
 * Gets today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds a new feature to the work items
 * Mutates the data object (adds to work_items array)
 * Returns the created feature
 */
export function addFeature(
  data: WorkItemsFile,
  options: {
    title: string;
    created_by: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    description_file?: string;
  }
): WorkItem {
  const feature: WorkItem = {
    id: getNextId(data),
    type: 'feature',
    title: options.title,
    status: 'todo',
    created_by: options.created_by,
    created_date: getTodayDate(),
  };

  // Add optional fields if provided
  if (options.priority) {
    feature.priority = options.priority;
  }
  if (options.tags) {
    feature.tags = options.tags;
  }
  if (options.description_file) {
    feature.description_file = options.description_file;
  }

  data.work_items.push(feature);
  return feature;
}

/**
 * Adds a new story to the work items
 * Validates that parent feature exists
 * Mutates the data object (adds to work_items array)
 * Returns the created story
 * Throws error if parent feature does not exist
 */
export function addStory(
  data: WorkItemsFile,
  options: {
    title: string;
    parent_feature: string;
    created_by: string;
    estimate?: 'S' | 'M' | 'L' | 'XL';
    acceptance_criteria?: string[];
    description_file?: string;
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
  }
): WorkItem {
  // Validate parent feature exists
  const parentFeature = findWorkItem(data, options.parent_feature);
  if (!parentFeature) {
    throw new Error(`Parent feature ${options.parent_feature} does not exist`);
  }
  if (parentFeature.type !== 'feature') {
    throw new Error(`Parent ${options.parent_feature} is not a feature`);
  }

  const story: WorkItem = {
    id: getNextId(data),
    type: 'story',
    title: options.title,
    parent_feature: options.parent_feature,
    status: 'todo',
    created_by: options.created_by,
    created_date: getTodayDate(),
  };

  // Add optional fields if provided
  if (options.estimate) {
    story.estimate = options.estimate;
  }
  if (options.acceptance_criteria) {
    story.acceptance_criteria = options.acceptance_criteria;
  }
  if (options.description_file) {
    story.description_file = options.description_file;
  }
  if (options.priority) {
    story.priority = options.priority;
  }
  if (options.tags) {
    story.tags = options.tags;
  }

  data.work_items.push(story);
  return story;
}

/**
 * Updates a work item by ID
 * Mutates the work item in the data object
 * Returns the updated work item
 * Throws error if ID does not exist
 */
export function updateWorkItem(
  data: WorkItemsFile,
  id: string,
  updates: Partial<Omit<WorkItem, 'id' | 'type' | 'created_by' | 'created_date'>>
): WorkItem {
  const item = findWorkItem(data, id);
  if (!item) {
    throw new Error(`Work item ${id} does not exist`);
  }

  // Apply updates
  Object.assign(item, updates);

  // Set updated_date
  item.updated_date = getTodayDate();

  return item;
}
