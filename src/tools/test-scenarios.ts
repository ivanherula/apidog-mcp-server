import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-scenarios.js';
import { toolResult, toolError } from '../server.js';

export function registerTestScenarioTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_scenarios',
    'List all test scenarios (compact summary: id, name, folderId, priority, tags, description, ordering, status)',
    {},
    async () => {
      try {
        const data = await api.listTestScenarios(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_scenario_steps',
    'Get the steps (API calls) of a test scenario',
    {
      scenarioId: z.number().describe('Test scenario ID'),
    },
    async (args) => {
      try {
        const data = await api.getTestScenarioSteps(client, args.scenarioId);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_test_scenario',
    'Create a new test scenario (multi-step test flow)',
    {
      name: z.string().describe('Scenario name'),
      folderId: z.coerce.number().describe('Folder ID to place the scenario in'),
      description: z.string().default('').describe('Description'),
      priority: z.coerce.number().default(2).describe('Priority (1=high, 2=medium, 3=low)'),
      tags: z.array(z.string()).default([]).describe('Tag names'),
      ordering: z.coerce.number().default(0).describe('Sort order within folder'),
    },
    async ({ name, folderId, description, priority, tags, ordering }) => {
      try {
        const body = {
          folderId,
          name,
          priority,
          tags,
          ordering,
          description,
          options: {
            useDataSetId: -1,
            threadCount: 1,
            iterationCount: 1,
            delayItem: 0,
            saveVariables: true,
            saveReportDetail: 'all',
            readGlobalCookie: false,
            saveGlobalCookie: false,
            onError: 'ignore',
            runnerId: 0,
          },
        };
        const data = await api.createTestScenario(client, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_scenario_steps',
    'Set or update the steps in a test scenario (replaces all steps)',
    {
      scenarioId: z.number().describe('Test scenario ID'),
      steps: z.array(z.record(z.unknown())).describe('Complete array of steps to set on the scenario'),
    },
    async (args) => {
      try {
        const body = { id: args.scenarioId, steps: args.steps };
        const data = await api.updateTestScenarioSteps(client, args.scenarioId, body);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_test_scenario',
    'Delete a test scenario by ID',
    {
      scenarioId: z.number().describe('Test scenario ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteTestScenario(client, args.scenarioId);
        return toolResult({ success: true, message: `Test scenario ${args.scenarioId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'create_scenario_folder',
    'Create a folder for organizing test scenarios',
    {
      name: z.string().describe('Folder name'),
      parentId: z.coerce.number().default(0).describe('Parent folder ID (0 for root)'),
      ordering: z.coerce.number().default(0).describe('Sort order'),
    },
    async (args) => {
      try {
        const data = await api.createScenarioFolder(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'delete_scenario_folder',
    'Delete a test scenario folder',
    {
      folderId: z.number().describe('Folder ID to delete'),
    },
    async (args) => {
      try {
        await api.deleteScenarioFolder(client, args.folderId);
        return toolResult({ success: true, message: `Scenario folder ${args.folderId} deleted` });
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
