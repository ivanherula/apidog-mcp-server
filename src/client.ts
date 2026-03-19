import type { ApiResponse, Config } from './types.js';

export class ApidogApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApidogApiError';
  }
}

export class ApidogClient {
  private readonly headers: Record<string, string>;
  private readonly baseUrl: string;
  private readonly projectId: string;
  private readonly branchId?: string;

  constructor(config: Config) {
    this.baseUrl = config.baseUrl;
    this.projectId = config.projectId;
    this.branchId = config.branchId;
    this.headers = {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  private buildUrl(path: string, queryParams?: Record<string, string | number | boolean | undefined>): string {
    // Replace {projectId} placeholder
    const resolvedPath = path.replace('{projectId}', this.projectId);
    const url = new URL(`${this.baseUrl}${resolvedPath}`);

    // Add branch_id if configured
    if (this.branchId) {
      url.searchParams.set('branch_id', this.branchId);
    }

    // Add additional query params
    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    const url = this.buildUrl(path, queryParams);
    const response = await fetch(url, {
      method,
      headers: this.headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `HTTP ${response.status}`;
      try {
        const errorBody = await response.json();
        if (typeof errorBody === 'object' && errorBody !== null && 'message' in errorBody) {
          message = (errorBody as { message: string }).message;
        }
      } catch {
        // use default message
      }
      throw new ApidogApiError(response.status, message);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const json = (await response.json()) as ApiResponse<T>;

    // Unwrap Apidog { success, data } wrapper
    if (typeof json === 'object' && json !== null && 'success' in json && 'data' in json) {
      return json.data;
    }

    return json as unknown as T;
  }

  get<T>(path: string, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('GET', path, undefined, queryParams);
  }

  post<T>(path: string, body?: unknown, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('POST', path, body, queryParams);
  }

  put<T>(path: string, body?: unknown, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('PUT', path, body, queryParams);
  }

  delete<T>(path: string, queryParams?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>('DELETE', path, undefined, queryParams);
  }
}
