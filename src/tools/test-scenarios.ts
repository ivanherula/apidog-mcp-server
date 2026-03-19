import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ApidogClient } from '../client.js';
import * as api from '../api/test-scenarios.js';
import { toolResult, toolError } from '../server.js';

const scenarioStepSchema = z.object({
  type: z.string().describe('Step type (e.g. "testCase", "delay", "condition")'),
  testCaseId: z.number().optional().describe('Test case ID (for testCase type steps)'),
  name: z.string().optional().describe('Step name'),
  sort: z.number().optional().describe('Sort order'),
  data: z.record(z.unknown()).optional().describe('Additional step data'),
});

export function registerTestScenarioTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_test_scenarios',
    'List test scenarios with optional filters',
    {
      folderId: z.number().optional().describe('Filter by folder ID'),
      keyword: z.string().optional().describe('Search keyword'),
      page: z.number().optional().describe('Page number (1-based)'),
      pageSize: z.number().optional().describe('Items per page'),
    },
    async (args) => {
      try {
        const data = await api.listTestScenarios(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'get_test_scenario_steps',
    'Get the steps of a test scenario',
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
    'Create a new test scenario',
    {
      name: z.string().describe('Scenario name'),
      folderId: z.number().optional().describe('Folder ID'),
      description: z.string().optional().describe('Description'),
    },
    async (args) => {
      try {
        const data = await api.createTestScenario(client, args);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );

  server.tool(
    'update_test_scenario_steps',
    'Update the steps of a test scenario (replaces all steps)',
    {
      scenarioId: z.number().describe('Test scenario ID'),
      steps: z.array(scenarioStepSchema).describe('New steps for the scenario'),
    },
    async (args) => {
      try {
        const data = await api.updateTestScenarioSteps(client, args.scenarioId, { steps: args.steps });
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
      parentId: z.number().optional().describe('Parent folder ID'),
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
