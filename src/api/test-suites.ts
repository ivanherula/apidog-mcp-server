import type { ApidogClient } from '../client.js';

export function listTestSuites(client: ApidogClient): Promise<unknown> {
  return client.get<unknown>(`/projects/${client.project}/api-test/test-suite-tree-list`);
}

export function getTestSuite(client: ApidogClient, suiteId: number): Promise<unknown> {
  return client.get<unknown>(`/projects/${client.project}/api-test/test-suites/${suiteId}`);
}

export function createTestSuite(client: ApidogClient, body: unknown): Promise<unknown> {
  return client.post<unknown>(`/projects/${client.project}/api-test/test-suites`, body);
}

export function updateTestSuite(client: ApidogClient, suiteId: number, body: unknown): Promise<unknown> {
  return client.put<unknown>(`/projects/${client.project}/api-test/test-suites/${suiteId}`, body);
}

export function deleteTestSuite(client: ApidogClient, suiteId: number): Promise<unknown> {
  return client.delete<unknown>(`/projects/${client.project}/api-test/test-suites/${suiteId}`, { id: suiteId });
}

export function createSuiteFolder(client: ApidogClient, body: { name: string; parentId?: number; ordering?: number }): Promise<unknown> {
  return client.post<unknown>(`/projects/${client.project}/api-test/test-suite-folders`, {
    parentId: body.parentId ?? 0,
    name: body.name,
    ordering: body.ordering ?? 0,
  });
}

export function deleteSuiteFolder(client: ApidogClient, folderId: number): Promise<unknown> {
  return client.delete<unknown>(`/projects/${client.project}/api-test/test-suite-folders/${folderId}`);
}
