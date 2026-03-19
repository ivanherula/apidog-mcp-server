#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

const accessToken = process.env['APIDOG_ACCESS_TOKEN'];
if (!accessToken) {
  console.error('Error: APIDOG_ACCESS_TOKEN environment variable is required');
  process.exit(1);
}

const projectId = process.env['APIDOG_PROJECT_ID'];
if (!projectId) {
  console.error('Error: APIDOG_PROJECT_ID environment variable is required');
  process.exit(1);
}

const server = createServer({
  accessToken,
  projectId,
  branchId: process.env['APIDOG_BRANCH_ID'],
  baseUrl: process.env['APIDOG_BASE_URL'] || 'https://api.apidog.com/api/v1',
});

const transport = new StdioServerTransport();
await server.connect(transport);
