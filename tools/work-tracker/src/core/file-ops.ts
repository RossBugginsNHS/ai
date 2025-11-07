/**
 * File operations for reading and writing work items YAML file
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { WorkItemsFile } from '../types';

/**
 * Read work items from YAML file
 * @param filePath Path to work-items.yaml file
 * @returns WorkItemsFile object with work_items array
 */
export function readWorkItems(filePath: string): WorkItemsFile {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { work_items: [] };
    }

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Handle empty file
    if (!fileContent.trim()) {
      return { work_items: [] };
    }

    // Parse YAML
    const data = yaml.load(fileContent) as any;

    // Handle case where YAML is valid but doesn't have work_items
    if (!data || !data.work_items) {
      return { work_items: [] };
    }

    return data as WorkItemsFile;
  } catch (error) {
    if (error instanceof yaml.YAMLException) {
      throw new Error(`Invalid YAML in ${filePath}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Write work items to YAML file
 * @param filePath Path to work-items.yaml file
 * @param data WorkItemsFile object to write
 */
export function writeWorkItems(filePath: string, data: WorkItemsFile): void {
  try {
    // Ensure parent directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Convert to YAML
    const yamlContent = yaml.dump(data, {
      indent: 2,
      lineWidth: -1, // Don't wrap lines
      noRefs: true,  // Don't use anchors/references
    });

    // Write to file
    fs.writeFileSync(filePath, yamlContent, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write work items to ${filePath}: ${error}`);
  }
}

/**
 * Ensure work items file exists, create if it doesn't
 * @param filePath Path to work-items.yaml file
 */
export function ensureWorkItemsFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    writeWorkItems(filePath, { work_items: [] });
  }
}
