/**
 * Tests for work item validation
 * TDD: RED phase
 */

import { validateWorkItems, validateWorkItem } from '../../src/core/validator';
import { WorkItem, WorkItemsFile } from '../../src/types';

describe('Validator', () => {
  describe('validateWorkItem', () => {
    it('should validate a valid feature', () => {
      const feature: WorkItem = {
        id: '00001',
        type: 'feature',
        title: 'Test Feature',
        created_by: 'Business Analyst (Role 1)',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(feature, []);
      expect(errors).toHaveLength(0);
    });

    it('should validate a valid story', () => {
      const feature: WorkItem = {
        id: '00001',
        type: 'feature',
        title: 'Parent Feature',
        created_by: 'Business Analyst (Role 1)',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const story: WorkItem = {
        id: '00002',
        type: 'story',
        title: 'Test Story',
        parent_feature: '00001',
        created_by: 'Requirements Engineer (Role 2)',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(story, [feature]);
      expect(errors).toHaveLength(0);
    });

    it('should reject missing required fields', () => {
      const invalid: any = {
        id: '00001',
        type: 'feature',
        // missing title
        created_by: 'Test Role',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(invalid, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('title'))).toBe(true);
    });

    it('should reject invalid status', () => {
      const invalid: any = {
        id: '00001',
        type: 'feature',
        title: 'Test',
        created_by: 'Test Role',
        created_date: '2025-11-07',
        status: 'invalid-status',
      };

      const errors = validateWorkItem(invalid, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('status'))).toBe(true);
    });

    it('should reject invalid date format', () => {
      const invalid: WorkItem = {
        id: '00001',
        type: 'feature',
        title: 'Test',
        created_by: 'Test Role',
        created_date: '07-11-2025', // Wrong format
        status: 'todo',
      };

      const errors = validateWorkItem(invalid, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('date'))).toBe(true);
    });

    it('should reject story without parent_feature', () => {
      const story: WorkItem = {
        id: '00002',
        type: 'story',
        title: 'Orphan Story',
        // missing parent_feature
        created_by: 'Requirements Engineer (Role 2)',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(story, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('parent_feature'))).toBe(true);
    });

    it('should reject story with non-existent parent', () => {
      const story: WorkItem = {
        id: '00002',
        type: 'story',
        title: 'Test Story',
        parent_feature: '99999', // Doesn't exist
        created_by: 'Requirements Engineer (Role 2)',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(story, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('parent feature') || e.message.includes('99999'))).toBe(true);
    });

    it('should reject invalid ID format', () => {
      const invalid: WorkItem = {
        id: '1', // Should be 00001
        type: 'feature',
        title: 'Test',
        created_by: 'Test Role',
        created_date: '2025-11-07',
        status: 'todo',
      };

      const errors = validateWorkItem(invalid, []);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.message.includes('ID'))).toBe(true);
    });
  });

  describe('validateWorkItems', () => {
    it('should validate empty work items', () => {
      const data: WorkItemsFile = { work_items: [] };
      const result = validateWorkItems(data);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect duplicate IDs', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'First',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
          {
            id: '00001', // Duplicate
            type: 'feature',
            title: 'Second',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = validateWorkItems(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors.some(e => e.message.includes('duplicate'))).toBe(true);
    });

    it('should validate all work items and collect errors', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Valid Feature',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
          {
            id: '2', // Invalid ID format
            type: 'feature',
            title: 'Invalid Feature',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
          {
            id: '00003',
            type: 'story',
            title: 'Orphan Story',
            parent_feature: '99999', // Non-existent parent
            created_by: 'Role 2',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = validateWorkItems(data);
      
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should return valid=true for all valid items', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Feature 1',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
          {
            id: '00002',
            type: 'story',
            title: 'Story 1',
            parent_feature: '00001',
            created_by: 'Role 2',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = validateWorkItems(data);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
