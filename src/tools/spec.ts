import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/spec.js';
import { toolResult, toolError } from '../server.js';

export function registerSpecTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_environments',
    'List all environments (DEV, TEST, PROD, etc.) with their base URLs',
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
    'List API endpoints tree with IDs, names, and folder structure. Use moduleId to filter by service module. Use search to filter by name.',
    {
      moduleId: z.coerce.number().optional().describe('Filter by module ID to reduce response size'),
      search: z.string().optional().describe('Filter endpoints by name (case-insensitive)'),
    },
    async ({ moduleId, search }) => {
      try {
        let data = await api.listApiEndpoints(client) as Array<Record<string, unknown>>;

        if (moduleId !== undefined) {
          data = filterByModule(data, moduleId);
        }
        if (search) {
          data = filterByName(data, search);
        }

        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_endpoint_statistics',
    'Get endpoint test coverage statistics',
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

interface TreeNode {
  name?: string;
  moduleId?: number;
  children?: TreeNode[];
  [key: string]: unknown;
}

function filterByModule(items: TreeNode[], moduleId: number): TreeNode[] {
  return items
    .map((item) => {
      if (item.children?.length) {
        const filtered = filterByModule(item.children, moduleId);
        if (filtered.length > 0) return { ...item, children: filtered };
      }
      if (item.moduleId === moduleId) return item;
      return null;
    })
    .filter((item): item is TreeNode => item !== null);
}

function filterByName(items: TreeNode[], search: string): TreeNode[] {
  const lower = search.toLowerCase();
  return items
    .map((item) => {
      if (item.children?.length) {
        const filtered = filterByName(item.children, search);
        if (filtered.length > 0) return { ...item, children: filtered };
      }
      if ((item.name ?? '').toLowerCase().includes(lower)) return item;
      return null;
    })
    .filter((item): item is TreeNode => item !== null);
}
