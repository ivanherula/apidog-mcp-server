import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ApidogClient } from './client.js';
import type { Config } from './types.js';
import { registerSpecTools } from './tools/spec.js';
import { registerTestCaseTools } from './tools/test-cases.js';
import { registerTestScenarioTools } from './tools/test-scenarios.js';
import { registerTestSuiteTools } from './tools/test-suites.js';
import { registerTestDataTools } from './tools/test-data.js';
import { registerRunnerTools } from './tools/runners.js';

export function toolError(err: unknown): { content: [{ type: 'text'; text: string }] } {
  const message = err instanceof Error ? err.message : String(err);
  return { content: [{ type: 'text', text: `Error: ${message}` }] };
}

export function toolResult(data: unknown): { content: [{ type: 'text'; text: string }] } {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
}

export function createServer(config: Config): McpServer {
  const client = new ApidogClient(config);
  const server = new McpServer({ name: 'apidog-mcp-server', version: '0.1.0' });

  registerSpecTools(server, client);
  registerTestCaseTools(server, client);
  registerTestScenarioTools(server, client);
  registerTestSuiteTools(server, client);
  registerTestDataTools(server, client);
  registerRunnerTools(server, client);

  return server;
}
