import type { ApidogClient } from '../client.js';
import type { CreateTestScenarioBody } from '../types.js';

export function listTestScenarios(client: ApidogClient): Promise<unknown> {
  return client.get<unknown>(`/projects/${client.project}/test-scenario/tree-list`);
}

export function getTestScenarioSteps(client: ApidogClient, scenarioId: number): Promise<unknown> {
  return client.get<unknown>(`/api-test/cases/${scenarioId}/steps`);
}

export function createTestScenario(client: ApidogClient, body: CreateTestScenarioBody): Promise<unknown> {
  return client.post<unknown>('/api-test/cases', body);
}

export function updateTestScenarioSteps(
  client: ApidogClient,
  scenarioId: number,
  body: unknown
): Promise<unknown> {
  return client.put<unknown>(`/api-test/cases/${scenarioId}`, body);
}

export function deleteTestScenario(client: ApidogClient, scenarioId: number): Promise<void> {
  return client.delete<void>(`/projects/${client.project}/test-scenario/${scenarioId}`, { id: scenarioId });
}

export function createScenarioFolder(client: ApidogClient, body: { name: string; parentId?: number; ordering?: number }): Promise<unknown> {
  return client.postForm<unknown>('/api-test/case-folders', {
    parentId: String(body.parentId ?? 0),
    name: body.name,
    ordering: String(body.ordering ?? 0),
  });
}

export function deleteScenarioFolder(client: ApidogClient, folderId: number): Promise<void> {
  return client.delete<void>(`/api-test/case-folders/${folderId}`);
}
