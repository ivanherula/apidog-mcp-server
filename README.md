# @ivanherula/apidog-mcp-server

MCP server for Apidog — read API specs and manage test cases, scenarios, suites, and test data from Claude Code or any MCP client.

## Quick Start

```json
{
  "mcpServers": {
    "apidog": {
      "command": "npx",
      "args": [
        "-y",
        "@ivanherula/apidog-mcp-server@latest"
      ],
      "env": {
        "APIDOG_ACCESS_TOKEN": "your-token",
        "APIDOG_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `APIDOG_ACCESS_TOKEN` | Yes | — | Apidog API access token |
| `APIDOG_PROJECT_ID` | Yes | — | Apidog project ID |
| `APIDOG_BRANCH_ID` | No | — | Branch ID (for branched projects) |
| `APIDOG_BASE_URL` | No | `https://api.apidog.com/api/v1` | API base URL |

## Tools (31)

### Spec (5)
- `list_environments` — List project environments
- `list_endpoints` — List/search API endpoints
- `get_endpoint_statistics` — Test coverage stats
- `list_test_case_categories` — List test case categories
- `list_test_case_tags` — List test case tags

### Test Cases (6)
- `list_test_cases` — List test cases (filterable)
- `get_test_case` — Get test case details
- `create_test_case` — Create a test case
- `bulk_create_test_cases` — Bulk create test cases
- `update_test_case` — Update a test case
- `delete_test_case` — Delete a test case

### Test Scenarios (7)
- `list_test_scenarios` — List test scenarios
- `get_test_scenario_steps` — Get scenario steps
- `create_test_scenario` — Create a scenario
- `update_test_scenario_steps` — Update scenario steps
- `delete_test_scenario` — Delete a scenario
- `create_scenario_folder` — Create a scenario folder
- `delete_scenario_folder` — Delete a scenario folder

### Test Suites (7)
- `list_test_suites` — List test suites
- `get_test_suite` — Get suite details
- `create_test_suite` — Create a test suite
- `update_test_suite` — Update a test suite
- `delete_test_suite` — Delete a test suite
- `create_suite_folder` — Create a suite folder
- `delete_suite_folder` — Delete a suite folder

### Test Data (5)
- `list_test_data` — List test data sets
- `get_test_data` — Get test data with rows
- `create_test_data` — Create test data (CSV)
- `update_test_data` — Update test data
- `delete_test_data` — Delete test data

### Runners (1)
- `list_runners` — List self-hosted runners

## License

MIT
