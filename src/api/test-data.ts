import type { ApidogClient } from '../client.js';

export function listTestData(
  client: ApidogClient,
  params?: Record<string, string>
): Promise<unknown[]> {
  return client.get<unknown[]>(`/projects/${client.project}/test-data`, params);
}

export function getTestData(client: ApidogClient, testDataId: number): Promise<unknown> {
  return client.get<unknown>(`/projects/${client.project}/test-data/${testDataId}`);
}

export function createTestData(client: ApidogClient, body: unknown): Promise<unknown> {
  return client.post<unknown>(`/projects/${client.project}/test-data`, body);
}

export function updateTestData(client: ApidogClient, testDataId: number, body: unknown): Promise<unknown> {
  return client.put<unknown>(`/projects/${client.project}/test-data/${testDataId}`, body);
}

export function deleteTestData(client: ApidogClient, testDataId: number): Promise<unknown> {
  return client.delete<unknown>(`/projects/${client.project}/test-data/${testDataId}`, { id: testDataId });
}
