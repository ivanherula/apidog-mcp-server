import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ApidogClient } from '../client.js';
import * as api from '../api/runners.js';
import { toolResult, toolError } from '../server.js';

export function registerRunnerTools(server: McpServer, client: ApidogClient): void {
  server.tool(
    'list_runners',
    'List self-hosted test runners',
    {},
    async () => {
      try {
        const data = await api.listRunners(client);
        return toolResult(data);
      } catch (err) {
        return toolError(err);
      }
    }
  );
}
