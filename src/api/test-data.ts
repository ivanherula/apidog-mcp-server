import type { ApidogClient } from '../client.js';
import type { TestData, CreateTestDataBody, UpdateTestDataBody } from '../types.js';

export function listTestData(
  client: ApidogClient,
  params?: { keyword?: string; page?: number; pageSize?: number }
): Promise<TestData[]> {
  return client.get<TestData[]>('/projects/{projectId}/test-data', params);
}

export function getTestData(client: ApidogClient, testDataId: number): Promise<TestData> {
  return client.get<TestData>(`/projects/{projectId}/test-data/${testDataId}`);
}

export function createTestData(client: ApidogClient, body: CreateTestDataBody): Promise<TestData> {
  return client.post<TestData>('/projects/{projectId}/test-data', body);
}

export function updateTestData(client: ApidogClient, testDataId: number, body: UpdateTestDataBody): Promise<TestData> {
  return client.put<TestData>(`/projects/{projectId}/test-data/${testDataId}`, body);
}

export function deleteTestData(client: ApidogClient, testDataId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-data/${testDataId}`);
}
