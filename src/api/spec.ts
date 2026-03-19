import type { ApidogClient } from '../client.js';
import type { Environment, Endpoint, EndpointStatistics, TestCaseCategory, TestCaseTag } from '../types.js';

export function listEnvironments(client: ApidogClient): Promise<Environment[]> {
  return client.get<Environment[]>('/projects/{projectId}/environments');
}

export function listEndpoints(
  client: ApidogClient,
  params?: { keyword?: string; folderId?: number; page?: number; pageSize?: number }
): Promise<Endpoint[]> {
  return client.get<Endpoint[]>('/projects/{projectId}/endpoints', params);
}

export function getEndpointStatistics(client: ApidogClient): Promise<EndpointStatistics[]> {
  return client.get<EndpointStatistics[]>('/projects/{projectId}/endpoint-statistics');
}

export function listTestCaseCategories(client: ApidogClient): Promise<TestCaseCategory[]> {
  return client.get<TestCaseCategory[]>('/projects/{projectId}/test-case-categories');
}

export function listTestCaseTags(client: ApidogClient): Promise<TestCaseTag[]> {
  return client.get<TestCaseTag[]>('/projects/{projectId}/test-case-tags');
}
