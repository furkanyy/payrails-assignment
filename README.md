# API Test Automation Project  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=furkanyy_payrails-assignment&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=furkanyy_payrails-assignment)

This project is created for a QA position assignment. It contains manual API test cases and automated API test cases using Playwright for the Alpha Vantage API.

Company Overview endpoint is selected. For details about the endpoint, click -> [Alpha Vantage Documentation](https://www.alphavantage.co/documentation/#company-overview).

**Endpoint:** `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=your_api_key`

## Project Structure
```
/
├── tests/
│   ├── api/            # API test files
│   │   └── company-overview/
│   │       └── company-overview.spec.ts
│   └── helpers/        # Helper utilities
│       └── api-helpers.ts
├── playwright.config.ts
└── README.md
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:

You can create your free API Key from the link below:

https://www.alphavantage.co/support/#api-key

```
ALPHA_VANTAGE_API_KEY=your_api_key_here
```

## Running Tests

```bash
# Run all API tests
npm run test:api

# View test report
npm run report

# Debug tests
npm run test:debug
```

## Test Report

After running the tests, view the HTML report:
```bash
npm run report
```

The report (`playwright-report/index.html`) opens in your browser and shows:
- Test results summary
- Failed test details with API responses
- Test execution time

## Test Cases

### Manual Test Cases

| ID | Scenario | Test Data | Expected Result |
|----|----------|-----------|-----------------|
| 01 | Valid company overview request | `symbol=IBM`, valid API key | 200 OK. All mandatory fields like Symbol, Name, PERatio, EPS, MarketCapitalization, etc. are returned correctly. |
| 02 | Request with invalid API key | `symbol=IBM`, no API key | 200 OK. Response contains clear error message indicating invalid or missing API key. |
| 03 | Request with missing symbol parameter | No symbol param, valid API key | 200 OK. Response contains error indicating invalid API call. |
| 04 | Request with invalid symbol | `symbol=INVALIDXYZ`, valid API key | 200 OK. Response is empty. |
| 05 | Verify all fields exist and are not null | Valid inputs (`symbol=IBM`) | 200 OK. Response includes all 52 expected fields, and each value is neither null nor undefined. |
| 06 | Check each data has correct data type | Valid inputs (`symbol=IBM`) | 200 OK. String fields are strings, numeric fields are valid numbers, and date fields follow YYYY-MM-DD format. |
| 07 | Validate logical correctness of ratios | Valid inputs (`symbol=IBM`) | 200 OK. Financial ratios (PERatio, EPS, DividendYield) are logically valid and non-negative unless justified otherwise. |
| 08 | Exceed daily API request rate limit | More than 25 requests in a single day | 200 OK. API returns message about rate limit exceeded and premium plan options. |
| 09 | Multiple simultaneous requests | Concurrent valid requests | 200 OK. All requests succeed without errors or performance degradation. |

### Automated Test Cases

The following test cases have been chosen to be automated based on their reliability and importance in validating the API's behavior:

**01: Valid Company Overview Request**
- Verifies the main functionality of the API with valid inputs
- Ensures the endpoint is working as expected

**02: Invalid API Key Handling**
- Ensures proper error handling for authentication issues
- Validates error message structure and content

**05: Field Validation**
- Verifies all 52 expected fields are present
- Ensures no null or undefined values
- Validates response completeness and data integrity

**06: Data Type Validation**
- Ensures correct data types for all fields
- Validates string, numeric, and date format fields
- Protects against data format issues

## Notes

- Free API tier is limited to 25 requests per day
- Some tests may fail if rate limit is exceeded
- Consider using test retries for rate-limited scenarios


