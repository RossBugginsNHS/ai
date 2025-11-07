/**
 * Type definitions for the Work Tracker tool
 */

export type WorkItemType = 'feature' | 'story';

export type WorkItemStatus = 'todo' | 'in-progress' | 'done' | 'blocked';

export type Priority = 'low' | 'medium' | 'high';

export type Estimate = 'S' | 'M' | 'L' | 'XL';

export interface WorkItem {
  /** Unique 5-digit zero-padded ID (e.g., "00001") */
  id: string;
  
  /** Type of work item */
  type: WorkItemType;
  
  /** Brief title of the work item */
  title: string;
  
  /** Optional path to detailed markdown description */
  description_file?: string;
  
  /** Role that created this work item */
  created_by: string;
  
  /** ISO date when item was created (YYYY-MM-DD) */
  created_date: string;
  
  /** Current status */
  status: WorkItemStatus;
  
  /** Priority level (optional) */
  priority?: Priority;
  
  /** Tags for categorization (optional) */
  tags?: string[];
  
  // Story-specific fields
  
  /** ID of parent feature (required for stories) */
  parent_feature?: string;
  
  /** Role assigned to work on this (stories only) */
  assigned_to?: string;
  
  /** Size estimate (stories only) */
  estimate?: Estimate;
  
  /** Acceptance criteria (stories only) */
  acceptance_criteria?: string[];
  
  // Metadata
  
  /** ISO date when item was last updated (YYYY-MM-DD) */
  updated_date?: string;
}

export interface WorkItemsFile {
  work_items: WorkItem[];
}

export interface ValidationError {
  severity: 'error' | 'warning';
  message: string;
  work_item_id?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
