import type { ApidogClient } from '../client.js';
import type { Environment, EndpointStatistics, TestCaseCategory, TestCaseTag } from '../types.js';

export function listEnvironments(client: ApidogClient): Promise<Environment[]> {
  return client.get<Environment[]>(`/projects/${client.project}/environments`);
}

export function listApiEndpoints(
  client: ApidogClient,
): Promise<unknown[]> {
  return client.get<unknown[]>(`/projects/${client.project}/api-tree-list`);
}

export function getEndpointStatistics(client: ApidogClient): Promise<EndpointStatistics[]> {
  return client.get<EndpointStatistics[]>(`/projects/${client.project}/endpoint-statistics`);
}

export function listTestCaseCategories(client: ApidogClient): Promise<TestCaseCategory[]> {
  return client.get<TestCaseCategory[]>(`/projects/${client.project}/test-case-categories`);
}

export function listTestCaseTags(client: ApidogClient): Promise<TestCaseTag[]> {
  return client.get<TestCaseTag[]>(`/projects/${client.project}/test-case-tags`);
}
