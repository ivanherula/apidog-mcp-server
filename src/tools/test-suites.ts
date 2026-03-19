import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-suites.js';
import { toolResult, toolError } from '../server.js';

const suiteItemSchema = z.object({
  type: z.string().describe('Item type (e.g. "testCase", "testScenario")'),
  id: z.number().describe('Item ID'),
  name: z.string().optional().describe('Item name'),
});

export function registerTestSuiteTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_suites',
    'List test suites with optional filters',
    {
      folderId: z.number().optional().describe('Filter by folder ID'),
      keyword: z.string().optional().describe('Search keyword'),
      page: z.number().optional().describe('Page number (1-based)'),
      pageSize: z.number().optional().describe('Items per page'),
    },
    async (args) => {
      try {
        const data = await api.listTestSuites(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_suite',
    'Get a test suite by ID with its items',
    {
      suiteId: z.number().describe('Test suite ID'),
    },
    async (args) => {
      try {
        const data = await api.getTestSuite(client, args.suiteId);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_test_suite',
    'Create a new test suite',
    {
      name: z.string().describe('Suite name'),
      folderId: z.number().optional().describe('Folder ID'),
      description: z.string().optional().describe('Description'),
      items: z.array(suiteItemSchema).optional().describe('Initial suite items'),
    },
    async (args) => {
      try {
        const data = await api.createTestSuite(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_suite',
    'Update a test suite (merge update)',
    {
      suiteId: z.number().describe('Test suite ID to update'),
      name: z.string().optional().describe('New name'),
      description: z.string().optional().describe('New description'),
      items: z.array(suiteItemSchema).optional().describe('New suite items'),
    },
    async (args) => {
      try {
        const { suiteId, ...body } = args;
        const data = await api.updateTestSuite(client, suiteId, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_test_suite',
    'Delete a test suite by ID',
    {
      suiteId: z.number().describe('Test suite ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteTestSuite(client, args.suiteId);
        return toolResult({ success: true, message: `Test suite ${args.suiteId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_suite_folder',
    'Create a folder for organizing test suites',
    {
      name: z.string().describe('Folder name'),
      parentId: z.number().optional().describe('Parent folder ID'),
    },
    async (args) => {
      try {
        const data = await api.createSuiteFolder(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_suite_folder',
    'Delete a test suite folder',
    {
      folderId: z.number().describe('Folder ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteSuiteFolder(client, args.folderId);
        return toolResult({ success: true, message: `Suite folder ${args.folderId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
