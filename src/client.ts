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
  private readonly accessToken: string;
  private readonly baseUrl: string;
  private readonly projectId: string;
  private readonly branchId?: string;

  constructor(config: Config) {
    this.accessToken = config.accessToken;
    this.baseUrl = config.baseUrl;
    this.projectId = config.projectId;
    this.branchId = config.branchId;
  }

  get project(): string {
    return this.projectId;
  }

  private headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      'x-project-id': this.projectId,
      ...(this.branchId ? { 'x-branch-id': this.branchId } : {}),
      'x-client-mode': 'web',
      'x-client-version': '2.8.9',
      'x-device-id': '@ivanherula/apidog-mcp-server',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    url.searchParams.set('locale', 'en-US');
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }
    return url.toString();
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    params?: Record<string, string>
  ): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url, {
      method,
      headers: this.headers(),
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new ApidogApiError(response.status, `HTTP ${response.status}: ${text}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const json = (await response.json()) as ApiResponse<T>;

    if (json.success === false) {
      throw new ApidogApiError(response.status, JSON.stringify(json));
    }

    return (json.data !== undefined ? json.data : json) as unknown as T;
  }

  get<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', path, undefined, params);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', path, body);
  }

  put<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', path, body);
  }

  delete<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>('DELETE', path, body);
  }

  async postForm<T>(path: string, formData: Record<string, string>): Promise<T> {
    const hdrs = this.headers();
    hdrs['Content-Type'] = 'application/x-www-form-urlencoded';
    const body = new URLSearchParams(formData).toString();
    const url = this.buildUrl(path);
    const response = await fetch(url, { method: 'POST', headers: hdrs, body });

    if (!response.ok) {
      const text = await response.text();
      throw new ApidogApiError(response.status, `HTTP ${response.status}: ${text}`);
    }

    const json = (await response.json()) as ApiResponse<T>;
    if (json.success === false) {
      throw new ApidogApiError(response.status, JSON.stringify(json));
    }
    return (json.data !== undefined ? json.data : json) as unknown as T;
  }
}
