import type { ApidogClient } from '../client.js';
import type { Runner } from '../types.js';

export function listRunners(client: ApidogClient): Promise<Runner[]> {
  return client.get<Runner[]>('/projects/{projectId}/runners');
}
