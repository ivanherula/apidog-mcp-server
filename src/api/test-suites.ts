import type { ApidogClient } from '../client.js';
import type { TestSuite, CreateTestSuiteBody, UpdateTestSuiteBody, SuiteFolder, CreateSuiteFolderBody } from '../types.js';

export function listTestSuites(
  client: ApidogClient,
  params?: { folderId?: number; keyword?: string; page?: number; pageSize?: number }
): Promise<TestSuite[]> {
  return client.get<TestSuite[]>('/projects/{projectId}/test-suites', params);
}

export function getTestSuite(client: ApidogClient, suiteId: number): Promise<TestSuite> {
  return client.get<TestSuite>(`/projects/{projectId}/test-suites/${suiteId}`);
}

export function createTestSuite(client: ApidogClient, body: CreateTestSuiteBody): Promise<TestSuite> {
  return client.post<TestSuite>('/projects/{projectId}/test-suites', body);
}

export function updateTestSuite(client: ApidogClient, suiteId: number, body: UpdateTestSuiteBody): Promise<TestSuite> {
  return client.put<TestSuite>(`/projects/{projectId}/test-suites/${suiteId}`, body);
}

export function deleteTestSuite(client: ApidogClient, suiteId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-suites/${suiteId}`);
}

export function createSuiteFolder(client: ApidogClient, body: CreateSuiteFolderBody): Promise<SuiteFolder> {
  return client.post<SuiteFolder>('/projects/{projectId}/test-suite-folders', body);
}

export function deleteSuiteFolder(client: ApidogClient, folderId: number): Promise<void> {
  return client.delete<void>(`/projects/{projectId}/test-suite-folders/${folderId}`);
}
