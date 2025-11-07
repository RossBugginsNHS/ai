/**
 * Tests for work items core logic
 * TDD: RED phase
 */

import { getNextId, addFeature, addStory, updateWorkItem, findWorkItem } from '../../src/core/work-items';
import { WorkItemsFile, WorkItem } from '../../src/types';

describe('Work Items Core Logic', () => {
  describe('getNextId', () => {
    it('should return 00001 for empty work items', () => {
      const data: WorkItemsFile = { work_items: [] };
      expect(getNextId(data)).toBe('00001');
    });

    it('should return next sequential ID', () => {
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
            type: 'feature',
            title: 'Feature 2',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      expect(getNextId(data)).toBe('00003');
    });

    it('should handle gaps in ID sequence', () => {
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
            id: '00005',
            type: 'feature',
            title: 'Feature 5',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      expect(getNextId(data)).toBe('00006'); // Continues from max
    });

    it('should zero-pad correctly', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00099',
            type: 'feature',
            title: 'Feature 99',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      expect(getNextId(data)).toBe('00100');
    });
  });

  describe('addFeature', () => {
    it('should add feature with required fields', () => {
      const data: WorkItemsFile = { work_items: [] };
      
      const result = addFeature(data, {
        title: 'New Feature',
        created_by: 'Business Analyst (Role 1)',
      });

      expect(result.id).toBe('00001');
      expect(result.type).toBe('feature');
      expect(result.title).toBe('New Feature');
      expect(result.status).toBe('todo');
      expect(result.created_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(data.work_items).toHaveLength(1);
      expect(data.work_items[0]).toEqual(result);
    });

    it('should add feature with optional fields', () => {
      const data: WorkItemsFile = { work_items: [] };
      
      const result = addFeature(data, {
        title: 'New Feature',
        created_by: 'Business Analyst (Role 1)',
        priority: 'high',
        tags: ['security', 'core'],
        description_file: 'docs/features/00001.md',
      });

      expect(result.priority).toBe('high');
      expect(result.tags).toEqual(['security', 'core']);
      expect(result.description_file).toBe('docs/features/00001.md');
    });

    it('should auto-assign sequential IDs', () => {
      const data: WorkItemsFile = { work_items: [] };
      
      const feature1 = addFeature(data, {
        title: 'Feature 1',
        created_by: 'Role 1',
      });

      const feature2 = addFeature(data, {
        title: 'Feature 2',
        created_by: 'Role 1',
      });

      expect(feature1.id).toBe('00001');
      expect(feature2.id).toBe('00002');
      expect(data.work_items).toHaveLength(2);
    });
  });

  describe('addStory', () => {
    it('should add story with required fields', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Parent Feature',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = addStory(data, {
        title: 'New Story',
        parent_feature: '00001',
        created_by: 'Requirements Engineer (Role 2)',
      });

      expect(result.id).toBe('00002');
      expect(result.type).toBe('story');
      expect(result.title).toBe('New Story');
      expect(result.parent_feature).toBe('00001');
      expect(result.status).toBe('todo');
      expect(data.work_items).toHaveLength(2);
    });

    it('should add story with optional fields', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Parent Feature',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = addStory(data, {
        title: 'New Story',
        parent_feature: '00001',
        created_by: 'Requirements Engineer (Role 2)',
        estimate: 'M',
        acceptance_criteria: ['Criterion 1', 'Criterion 2'],
      });

      expect(result.estimate).toBe('M');
      expect(result.acceptance_criteria).toEqual(['Criterion 1', 'Criterion 2']);
    });

    it('should throw error if parent feature does not exist', () => {
      const data: WorkItemsFile = { work_items: [] };

      expect(() => {
        addStory(data, {
          title: 'Orphan Story',
          parent_feature: '99999',
          created_by: 'Role 2',
        });
      }).toThrow();
    });
  });

  describe('findWorkItem', () => {
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

    it('should find work item by ID', () => {
      const result = findWorkItem(data, '00002');
      expect(result).toBeDefined();
      expect(result?.title).toBe('Story 1');
    });

    it('should return undefined for non-existent ID', () => {
      const result = findWorkItem(data, '99999');
      expect(result).toBeUndefined();
    });
  });

  describe('updateWorkItem', () => {
    it('should update work item fields', () => {
      const data: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Original Title',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const result = updateWorkItem(data, '00001', {
        status: 'in-progress',
        priority: 'high',
      });

      expect(result.status).toBe('in-progress');
      expect(result.priority).toBe('high');
      expect(result.title).toBe('Original Title'); // Unchanged
      expect(result.updated_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should throw error for non-existent ID', () => {
      const data: WorkItemsFile = { work_items: [] };

      expect(() => {
        updateWorkItem(data, '99999', { status: 'done' });
      }).toThrow();
    });
  });
});
