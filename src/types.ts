// Apidog API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Configuration
export interface Config {
  accessToken: string;
  projectId: string;
  branchId?: string;
  baseUrl: string;
}

// Environments
export interface Environment {
  id: number;
  name: string;
  baseUrl: string;
  headers: Record<string, string>;
  variables: EnvironmentVariable[];
}

export interface EnvironmentVariable {
  name: string;
  value: string;
  description?: string;
}

// Endpoints
export interface Endpoint {
  id: number;
  name: string;
  method: string;
  path: string;
  folderId?: number;
  status?: string;
  tags?: string[];
  description?: string;
  responsibleId?: number;
}

export interface EndpointStatistics {
  endpointId: number;
  endpointName: string;
  method: string;
  path: string;
  testCaseCount: number;
  passedCount: number;
  failedCount: number;
  untestCount: number;
}

// Test Case Categories
export interface TestCaseCategory {
  id: number;
  name: string;
  parentId?: number;
  children?: TestCaseCategory[];
}

// Test Case Tags
export interface TestCaseTag {
  id: number;
  name: string;
  color?: string;
}

// Test Cases
export interface TestCase {
  id: number;
  name: string;
  categoryId?: number;
  priority?: string;
  status?: string;
  type?: string;
  endpointId?: number;
  tags?: TestCaseTag[];
  precondition?: string;
  steps?: TestCaseStep[];
  expectedResult?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestCaseStep {
  content: string;
  expectedResult?: string;
}

export interface CreateTestCaseBody {
  name: string;
  categoryId?: number;
  priority?: string;
  status?: string;
  type?: string;
  endpointId?: number;
  tagIds?: number[];
  precondition?: string;
  steps?: TestCaseStep[];
  expectedResult?: string;
  description?: string;
}

export interface UpdateTestCaseBody {
  name?: string;
  categoryId?: number;
  priority?: string;
  status?: string;
  type?: string;
  endpointId?: number;
  tagIds?: number[];
  precondition?: string;
  steps?: TestCaseStep[];
  expectedResult?: string;
  description?: string;
}

// Test Scenarios
export interface TestScenario {
  id: number;
  name: string;
  folderId?: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TestScenarioStep {
  id?: number;
  type: string;
  testCaseId?: number;
  name?: string;
  sort?: number;
  data?: Record<string, unknown>;
}

export interface CreateTestScenarioBody {
  name: string;
  folderId?: number;
  description?: string;
}

export interface UpdateTestScenarioStepsBody {
  steps: TestScenarioStep[];
}

// Test Scenario Folders
export interface ScenarioFolder {
  id: number;
  name: string;
  parentId?: number;
  children?: ScenarioFolder[];
}

export interface CreateScenarioFolderBody {
  name: string;
  parentId?: number;
}

// Test Suites
export interface TestSuite {
  id: number;
  name: string;
  folderId?: number;
  description?: string;
  items?: TestSuiteItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TestSuiteItem {
  type: string;
  id: number;
  name?: string;
}

export interface CreateTestSuiteBody {
  name: string;
  folderId?: number;
  description?: string;
  items?: TestSuiteItem[];
}

export interface UpdateTestSuiteBody {
  name?: string;
  description?: string;
  items?: TestSuiteItem[];
}

// Suite Folders
export interface SuiteFolder {
  id: number;
  name: string;
  parentId?: number;
  children?: SuiteFolder[];
}

export interface CreateSuiteFolderBody {
  name: string;
  parentId?: number;
}

// Test Data
export interface TestData {
  id: number;
  name: string;
  description?: string;
  columns?: TestDataColumn[];
  rows?: TestDataRow[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TestDataColumn {
  name: string;
  type?: string;
}

export interface TestDataRow {
  [key: string]: string;
}

export interface CreateTestDataBody {
  name: string;
  description?: string;
  csv: string;
}

export interface UpdateTestDataBody {
  name?: string;
  description?: string;
  csv?: string;
}

// Runners
export interface Runner {
  id: number;
  name: string;
  status: string;
  version?: string;
  os?: string;
  lastActiveAt?: string;
}
