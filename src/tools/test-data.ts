import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-data.js';
import { toolResult, toolError } from '../server.js';

export function registerTestDataTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_data',
    'List test data sets',
    {
      keyword: z.string().optional().describe('Search keyword'),
      page: z.number().optional().describe('Page number (1-based)'),
      pageSize: z.number().optional().describe('Items per page'),
    },
    async (args) => {
      try {
        const data = await api.listTestData(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_data',
    'Get a test data set by ID with its columns and rows',
    {
      testDataId: z.number().describe('Test data ID'),
    },
    async (args) => {
      try {
        const data = await api.getTestData(client, args.testDataId);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_test_data',
    'Create a new test data set from CSV content',
    {
      name: z.string().describe('Test data name'),
      description: z.string().optional().describe('Description'),
      csv: z.string().describe('CSV content (first row is headers)'),
    },
    async (args) => {
      try {
        const data = await api.createTestData(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_data',
    'Update an existing test data set (merge update)',
    {
      testDataId: z.number().describe('Test data ID to update'),
      name: z.string().optional().describe('New name'),
      description: z.string().optional().describe('New description'),
      csv: z.string().optional().describe('New CSV content'),
    },
    async (args) => {
      try {
        const { testDataId, ...body } = args;
        const data = await api.updateTestData(client, testDataId, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_test_data',
    'Delete a test data set by ID',
    {
      testDataId: z.number().describe('Test data ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteTestData(client, args.testDataId);
        return toolResult({ success: true, message: `Test data ${args.testDataId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
