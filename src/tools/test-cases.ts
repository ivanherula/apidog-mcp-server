import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-cases.js';
import { toolResult, toolError } from '../server.js';

const testCaseStepSchema = z.object({
  content: z.string().describe('Step description'),
  expectedResult: z.string().optional().describe('Expected result for this step'),
});

export function registerTestCaseTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_cases',
    'List test cases with optional filters',
    {
      categoryId: z.number().optional().describe('Filter by category ID'),
      tagId: z.number().optional().describe('Filter by tag ID'),
      keyword: z.string().optional().describe('Search keyword'),
      page: z.number().optional().describe('Page number (1-based)'),
      pageSize: z.number().optional().describe('Items per page'),
    },
    async (args) => {
      try {
        const data = await api.listTestCases(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_case',
    'Get a single test case by ID',
    {
      testCaseId: z.number().describe('Test case ID'),
    },
    async (args) => {
      try {
        const data = await api.getTestCase(client, args.testCaseId);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_test_case',
    'Create a new test case',
    {
      name: z.string().describe('Test case name'),
      categoryId: z.number().optional().describe('Category ID'),
      priority: z.string().optional().describe('Priority (e.g. P0, P1, P2, P3)'),
      status: z.string().optional().describe('Status'),
      type: z.string().optional().describe('Test case type'),
      endpointId: z.number().optional().describe('Associated endpoint ID'),
      tagIds: z.array(z.number()).optional().describe('Tag IDs to assign'),
      precondition: z.string().optional().describe('Precondition text'),
      steps: z.array(testCaseStepSchema).optional().describe('Test steps'),
      expectedResult: z.string().optional().describe('Overall expected result'),
      description: z.string().optional().describe('Description'),
    },
    async (args) => {
      try {
        const data = await api.createTestCase(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'bulk_create_test_cases',
    'Bulk create multiple test cases at once',
    {
      testCases: z.array(z.object({
        name: z.string().describe('Test case name'),
        categoryId: z.number().optional().describe('Category ID'),
        priority: z.string().optional().describe('Priority'),
        status: z.string().optional().describe('Status'),
        type: z.string().optional().describe('Test case type'),
        endpointId: z.number().optional().describe('Associated endpoint ID'),
        tagIds: z.array(z.number()).optional().describe('Tag IDs'),
        precondition: z.string().optional().describe('Precondition text'),
        steps: z.array(testCaseStepSchema).optional().describe('Test steps'),
        expectedResult: z.string().optional().describe('Overall expected result'),
        description: z.string().optional().describe('Description'),
      })).describe('Array of test cases to create'),
    },
    async (args) => {
      try {
        const data = await api.bulkCreateTestCases(client, args.testCases);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_case',
    'Update an existing test case (merge update - only provided fields are changed)',
    {
      testCaseId: z.number().describe('Test case ID to update'),
      name: z.string().optional().describe('New name'),
      categoryId: z.number().optional().describe('New category ID'),
      priority: z.string().optional().describe('New priority'),
      status: z.string().optional().describe('New status'),
      type: z.string().optional().describe('New type'),
      endpointId: z.number().optional().describe('New endpoint ID'),
      tagIds: z.array(z.number()).optional().describe('New tag IDs'),
      precondition: z.string().optional().describe('New precondition'),
      steps: z.array(testCaseStepSchema).optional().describe('New steps'),
      expectedResult: z.string().optional().describe('New expected result'),
      description: z.string().optional().describe('New description'),
    },
    async (args) => {
      try {
        const { testCaseId, ...body } = args;
        const data = await api.updateTestCase(client, testCaseId, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_test_case',
    'Delete a test case by ID',
    {
      testCaseId: z.number().describe('Test case ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteTestCase(client, args.testCaseId);
        return toolResult({ success: true, message: `Test case ${args.testCaseId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
