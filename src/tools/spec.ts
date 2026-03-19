import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/spec.js';
import { toolResult, toolError } from '../server.js';

export function registerSpecTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_environments',
    'List all environments in the project',
    {},
    async () => {
      try {
        const data = await api.listEnvironments(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'list_endpoints',
    'List or search API endpoints in the project',
    {
      keyword: z.string().optional().describe('Search keyword to filter endpoints'),
      folderId: z.number().optional().describe('Filter by folder ID'),
      page: z.number().optional().describe('Page number (1-based)'),
      pageSize: z.number().optional().describe('Items per page'),
    },
    async (args) => {
      try {
        const data = await api.listEndpoints(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_endpoint_statistics',
    'Get test coverage statistics for all endpoints',
    {},
    async () => {
      try {
        const data = await api.getEndpointStatistics(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'list_test_case_categories',
    'List all test case categories (folder tree)',
    {},
    async () => {
      try {
        const data = await api.listTestCaseCategories(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'list_test_case_tags',
    'List all test case tags',
    {},
    async () => {
      try {
        const data = await api.listTestCaseTags(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

}
