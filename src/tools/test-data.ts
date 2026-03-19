import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-data.js';
import { toolResult, toolError } from '../server.js';

export function registerTestDataTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_data',
    'List test data records for a test case. Returns metadata but not the actual data rows — use get_test_data for that.',
    {
      entityId: z.coerce.number().describe('The test case ID to list test data for'),
    },
    async ({ entityId }) => {
      try {
        const data = await api.listTestData(client, {
          entityId: String(entityId),
        });
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_data',
    'Get a specific test data record including the CSV data rows and column definitions',
    {
      testDataId: z.number().describe('Test data record ID'),
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
    'Create a test data record for a test case. The data field is CSV-formatted: first line is the column header, subsequent lines are values.',
    {
      relatedId: z.coerce.number().describe('The test case ID to attach this test data to'),
      environmentId: z.coerce.number().default(0).describe('Environment ID (0 = all environments)'),
      data: z.string().describe('CSV-formatted data. First line is header, subsequent lines are values.'),
      columns: z.record(z.unknown()).describe('Column definitions matching the header names in the data field'),
    },
    async ({ relatedId, environmentId, data, columns }) => {
      try {
        const body = {
          relatedId,
          dataSetId: 0,
          environmentId,
          data,
          columns,
          relatedType: 2,
        };
        const result = await api.createTestData(client, body);
        return toolResult(result);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_data',
    'Update an existing test data record (merge update — fetches current state first)',
    {
      testDataId: z.number().describe('Test data record ID to update'),
      data: z.string().optional().describe('Updated CSV data (header + rows)'),
      columns: z.record(z.unknown()).optional().describe('Updated column definitions'),
    },
    async ({ testDataId, ...fields }) => {
      try {
        const current = await api.getTestData(client, testDataId) as Record<string, unknown>;
        const body: Record<string, unknown> = {
          id: current.id,
          relatedId: current.relatedId,
          dataSetId: current.dataSetId,
          environmentId: current.environmentId,
          data: current.data,
          columns: current.columns,
        };
        for (const [k, v] of Object.entries(fields)) {
          if (v !== undefined) body[k] = v;
        }
        const result = await api.updateTestData(client, testDataId, body);
        return toolResult(result);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_test_data',
    'Delete a test data record by ID',
    {
      testDataId: z.number().describe('Test data record ID to delete'),
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
