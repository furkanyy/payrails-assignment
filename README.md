# API Test Automation Project

This project is created for an assignment of QA position. It contains manuel API test cases and automated API test cases using Playwright for the Alpha Vantage API.

Click the link below to find details about the selected endpoint within the Alpha Vantage API

https://www.alphavantage.co/documentation/#company-overview



## Manual Test Cases

| Test ID | Scenario | Inputs | Expected Result |
|---------|----------|--------|-----------------|
| 01 | Valid company overview request | `symbol=IBM`, valid API key | 200 OK. All mandatory fields like Symbol, Name, PERatio, EPS, MarketCapitalization, etc. are returned correctly. |
| 02 | Request with invalid API key | `symbol=IBM`, no API key | 200 OK. However response contains clear error message  indicating invalid or missing API key. |
| 03 | Request with missing symbol parameter | No symbol param, valid API key | 200 OK. Response contains error  indicating invalid API call. 
| 04 | Request with invalid symbol | `symbol=INVALIDXYZ`, valid API key | 200 OK. But response is empty.|
| 05 | Verify all fields exist and are not null | Valid inputs (`symbol=IBM`) | 200 OK. Response includes all 52 expected fields, and each value is neither null nor undefined. |
| 06 | Check each data has correct data type | Valid inputs (`symbol=IBM`) | 200 OK. String fields are strings, numeric fields are valid numbers, and date fields follow YYYY-MM-DD format. |
| 07 | Validate logical correctness of ratios | Valid inputs (`symbol=IBM`) | 200 OK. Financial ratios (PERatio, EPS, DividendYield) are logically valid and non-negative unless justified otherwise. |
| 08 | Exceed daily API request rate limit | More than 25 requests in a single day | 200 OK. API returns message about rate limit exceeded and premium plan options. |
| 09 | Multiple simultaneous requests | Concurrent valid requests | 200 OK. All requests succeed without errors or performance degradation. |

### API Endpoint
```
https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=your_api_key


## Automated Test Cases

The following test cases have been automated to ensure coverage of both core functionality and common error handling scenarios. These were selected based on their relevance, reliability, and importance in validating the API’s behavior.

01 – Valid company overview request

	This test verifies the main functionality of the API with valid inputs. It ensures that the endpoint is working as expected.

02 – Request with invalid API key

	This test ensures the API handles authentication errors correctly. It validates that the system returns the correct error structure and messaging when API key is missing. This is important for verifying proper access control and predictable failure handling.

05 – Verify all expected fields in response

	This test verifies that the API response includes all 52 expected fields and that none of them are null or undefined. It ensures the completeness and structural integrity of the response, helping detect missing or altered fields. By validating that every key contains meaningful data, the test safeguards the reliability of downstream processing and client-facing functionality.

06 – Check each data has correct data type

	This test ensures that each field in the response has the correct data type (e.g., numbers are actually numbers, strings are strings, and dates follow YYYY-MM-DD format). It protects against unexpected format issues that can break consumers relying on this data.



```
/
├── tests/
│   └── api/            # API test files
├── playwright.config.ts
└── README.md
```

## Notes

- Free API tier is limited to 25 requests per day
- Some tests may fail if rate limit is exceeded
- Consider using test retries for rate-limited scenarios

## Setup for API Test Automation

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

1. Run all API tests:
```bash
npm run test:api
```

2. View test report:
```bash
npm run report
```

3. Debug tests:
```bash
npm run test:debug
```

## Project Structure

- `/tests/api/` - Automated API tests
- `playwright.config.ts` - Playwright configuration

```
