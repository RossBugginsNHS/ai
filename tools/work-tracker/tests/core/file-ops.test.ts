/**
 * Tests for file operations (reading/writing YAML)
 * TDD: RED phase - writing tests first
 */

import * as fs from 'fs';
import * as path from 'path';
import { readWorkItems, writeWorkItems, ensureWorkItemsFile } from '../../src/core/file-ops';
import { WorkItemsFile, WorkItem } from '../../src/types';

describe('File Operations', () => {
  const testDir = path.join(__dirname, '../.tmp');
  const testFile = path.join(testDir, 'work-items.yaml');

  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  describe('readWorkItems', () => {
    it('should read work items from valid YAML file', () => {
      const testData: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Test Feature',
            created_by: 'Test Role',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      fs.writeFileSync(testFile, `work_items:\n  - id: "00001"\n    type: feature\n    title: Test Feature\n    created_by: Test Role\n    created_date: "2025-11-07"\n    status: todo\n`);

      const result = readWorkItems(testFile);
      expect(result.work_items).toHaveLength(1);
      expect(result.work_items[0].id).toBe('00001');
      expect(result.work_items[0].title).toBe('Test Feature');
    });

    it('should return empty array when file does not exist', () => {
      const result = readWorkItems(path.join(testDir, 'nonexistent.yaml'));
      expect(result.work_items).toEqual([]);
    });

    it('should throw error for malformed YAML', () => {
      fs.writeFileSync(testFile, 'invalid: yaml: content: [');
      expect(() => readWorkItems(testFile)).toThrow();
    });

    it('should handle empty YAML file', () => {
      fs.writeFileSync(testFile, '');
      const result = readWorkItems(testFile);
      expect(result.work_items).toEqual([]);
    });
  });

  describe('writeWorkItems', () => {
    it('should write work items to YAML file', () => {
      const testData: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Test Feature',
            created_by: 'Test Role',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      writeWorkItems(testFile, testData);
      
      expect(fs.existsSync(testFile)).toBe(true);
      const content = fs.readFileSync(testFile, 'utf-8');
      expect(content).toContain('work_items:');
      expect(content).toContain('id: "00001"');
      expect(content).toContain('title: Test Feature');
    });

    it('should create parent directories if they do not exist', () => {
      const nestedFile = path.join(testDir, 'nested', 'work-items.yaml');
      const testData: WorkItemsFile = { work_items: [] };

      writeWorkItems(nestedFile, testData);
      
      expect(fs.existsSync(nestedFile)).toBe(true);
    });

    it('should overwrite existing file', () => {
      const testData1: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'First',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      const testData2: WorkItemsFile = {
        work_items: [
          {
            id: '00002',
            type: 'feature',
            title: 'Second',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      writeWorkItems(testFile, testData1);
      writeWorkItems(testFile, testData2);

      const result = readWorkItems(testFile);
      expect(result.work_items).toHaveLength(1);
      expect(result.work_items[0].id).toBe('00002');
    });
  });

  describe('ensureWorkItemsFile', () => {
    it('should create file if it does not exist', () => {
      ensureWorkItemsFile(testFile);
      expect(fs.existsSync(testFile)).toBe(true);
      
      const result = readWorkItems(testFile);
      expect(result.work_items).toEqual([]);
    });

    it('should not overwrite existing file', () => {
      const testData: WorkItemsFile = {
        work_items: [
          {
            id: '00001',
            type: 'feature',
            title: 'Existing',
            created_by: 'Role 1',
            created_date: '2025-11-07',
            status: 'todo',
          },
        ],
      };

      writeWorkItems(testFile, testData);
      ensureWorkItemsFile(testFile);

      const result = readWorkItems(testFile);
      expect(result.work_items).toHaveLength(1);
      expect(result.work_items[0].title).toBe('Existing');
    });
  });
});
