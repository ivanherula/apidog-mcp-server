import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-suites.js';
import { toolResult, toolError } from '../server.js';

export function registerTestSuiteTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_suites',
    'List all test suites (compact summary: id, name, folderId, priority, tags, description, ordering, status)',
    {},
    async () => {
      try {
        const data = await api.listTestSuites(client);
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
    'Create a new test suite for CI grouping',
    {
      name: z.string().describe('Suite name'),
      folderId: z.coerce.number().default(0).describe('Folder ID (0 for root)'),
      description: z.string().default('').describe('Description'),
      priority: z.coerce.number().default(2).describe('Priority (1=high, 2=medium, 3=low)'),
      tags: z.array(z.string()).default([]).describe('Tag names'),
      ordering: z.coerce.number().default(0).describe('Sort order'),
      environmentId: z.coerce.number().optional().describe('Default environment ID'),
      runnerId: z.coerce.number().default(0).describe('Default runner ID'),
    },
    async ({ name, folderId, description, priority, tags, ordering, environmentId, runnerId }) => {
      try {
        const body: Record<string, unknown> = {
          folderId,
          name,
          priority,
          tags,
          ordering,
          description,
          options: {
            runnerId,
            ...(environmentId !== undefined ? { environmentId } : {}),
          },
        };
        const data = await api.createTestSuite(client, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_suite',
    'Update a test suite (merge update — fetches current state first)',
    {
      suiteId: z.number().describe('Test suite ID to update'),
      name: z.string().optional().describe('New name'),
      description: z.string().optional().describe('New description'),
      items: z.array(z.record(z.unknown())).optional().describe('New suite items'),
    },
    async (args) => {
      try {
        const { suiteId, ...fields } = args;
        const current = await api.getTestSuite(client, suiteId) as Record<string, unknown>;
        const body: Record<string, unknown> = { ...current };
        for (const [k, v] of Object.entries(fields)) {
          if (v !== undefined) body[k] = v;
        }
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
      parentId: z.coerce.number().default(0).describe('Parent folder ID (0 for root)'),
      ordering: z.coerce.number().default(0).describe('Sort order'),
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
