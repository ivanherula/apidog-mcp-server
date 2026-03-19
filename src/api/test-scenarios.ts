import type { ApidogClient } from '../client.js';
import type { TestScenario, TestScenarioStep, CreateTestScenarioBody, UpdateTestScenarioStepsBody, ScenarioFolder, CreateScenarioFolderBody } from '../types.js';

export function listTestScenarios(
  client: ApidogClient,
  params?: { folderId?: number; keyword?: string; page?: number; pageSize?: number }
): Promise<TestScenario[]> {
  return client.get<TestScenario[]>('/projects/{projectId}/test-scenarios', params);
}

export function getTestScenarioSteps(client: ApidogClient, scenarioId: number): Promise<TestScenarioStep[]> {
  return client.get<TestScenarioStep[]>(`/projects/{projectId}/test-scenarios/${scenarioId}/steps`);
}

export function createTestScenario(client: ApidogClient, body: CreateTestScenarioBody): Promise<TestScenario> {
  return client.post<TestScenario>('/projects/{projectId}/test-scenarios', body);
}

export function updateTestScenarioSteps(
  client: ApidogClient,
  scenarioId: number,
  body: UpdateTestScenarioStepsBody
): Promise<TestScenarioStep[]> {
  return client.put<TestScenarioStep[]>(`/projects/{projectId}/test-scenarios/${scenarioId}/steps`, body);
}

export function deleteTestScenario(client: ApidogClient, scenarioId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-scenarios/${scenarioId}`);
}

export function createScenarioFolder(client: ApidogClient, body: CreateScenarioFolderBody): Promise<ScenarioFolder> {
  return client.post<ScenarioFolder>('/projects/{projectId}/test-scenario-folders', body);
}

export function deleteScenarioFolder(client: ApidogClient, folderId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-scenario-folders/${folderId}`);
}
