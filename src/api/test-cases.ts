import type { ApidogClient } from '../client.js';
import type { TestCase, CreateTestCaseBody, UpdateTestCaseBody } from '../types.js';

export function listTestCases(
  client: ApidogClient,
  params?: { categoryId?: number; tagId?: number; keyword?: string; page?: number; pageSize?: number }
): Promise<TestCase[]> {
  return client.get<TestCase[]>('/projects/{projectId}/test-cases', params);
}

export function getTestCase(client: ApidogClient, testCaseId: number): Promise<TestCase> {
  return client.get<TestCase>(`/projects/{projectId}/test-cases/${testCaseId}`);
}

export function createTestCase(client: ApidogClient, body: CreateTestCaseBody): Promise<TestCase> {
  return client.post<TestCase>('/projects/{projectId}/test-cases', body);
}

export function bulkCreateTestCases(client: ApidogClient, bodies: CreateTestCaseBody[]): Promise<TestCase[]> {
  return client.post<TestCase[]>('/projects/{projectId}/test-cases/bulk', bodies);
}

export function updateTestCase(client: ApidogClient, testCaseId: number, body: UpdateTestCaseBody): Promise<TestCase> {
  return client.put<TestCase>(`/projects/{projectId}/test-cases/${testCaseId}`, body);
}

export function deleteTestCase(client: ApidogClient, testCaseId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-cases/${testCaseId}`);
}
