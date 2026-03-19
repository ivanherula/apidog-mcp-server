import type { ApidogClient } from '../client.js';

export function listTestCases(
  client: ApidogClient,
  params?: Record<string, string>
): Promise<unknown[]> {
  return client.get<unknown[]>(`/projects/${client.project}/test-cases`, params);
}

export function getTestCase(client: ApidogClient, testCaseId: number): Promise<unknown> {
  return client.get<unknown>(`/projects/${client.project}/test-cases/${testCaseId}`);
}

export function createTestCase(client: ApidogClient, body: unknown): Promise<unknown> {
  return client.post<unknown>(`/projects/${client.project}/test-cases`, body);
}

export function bulkCreateTestCases(client: ApidogClient, bodies: unknown[]): Promise<unknown> {
  return client.post<unknown>(`/projects/${client.project}/test-cases/bulk`, { data: bodies });
}

export function updateTestCase(client: ApidogClient, testCaseId: number, body: unknown): Promise<unknown> {
  return client.put<unknown>(`/projects/${client.project}/test-cases/${testCaseId}`, body);
}

export function deleteTestCase(client: ApidogClient, testCaseId: number): Promise<unknown> {
  return client.delete<unknown>(`/projects/${client.project}/test-cases/${testCaseId}`, { id: testCaseId });
}
