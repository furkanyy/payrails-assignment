# payrails-assignment

## Manual Test Cases

| Test ID | Scenario | Inputs | Expected Result |
|---------|----------|--------|-----------------|
| 01 | Valid company overview request | `symbol=IBM`, valid API key | 200 OK. All mandatory fields like Symbol, Name, 
PERatio, EPS, MarketCapitalization, etc. are returned correctly. |
| 02 | Request with invalid API key | `symbol=IBM`, no API key | 200 OK, but response contains clear error message 
indicating invalid or missing API key. |
| 03 | Request with missing symbol parameter | No symbol param, valid API key | 200 OK, response contains error 
indicating invalid API call. 
| 04 | Request with invalid symbol | `symbol=INVALIDXYZ`, valid API key | 200 OK, but response is empty.|
| 05      | Verify all fields exist and are not null | Valid inputs (`symbol=IBM`)             | Response includes all 52 expected fields, and each value is neither null nor undefined.                         |
| 06      | Check each data has correct data type    | Valid inputs (`symbol=IBM`)             | String fields are strings, numeric fields are valid numbers, and date fields follow YYYY-MM-DD format.           |
| 07      | Validate logical correctness of ratios   | Valid inputs (`symbol=IBM`)             | Financial ratios (PERatio, EPS, DividendYield) are logically valid and non-negative unless justified otherwise.  |
| 08      | Exceed daily API request rate limit      | More than 25 requests in a single day   | API returns message about rate limit exceeded and premium plan options.                                          |
| 09      | Very long symbol value                   | `symbol=<255 char string>`, valid API key | Response clearly indicates error or invalid input handling without crashing.                                     |
| 10      | Symbol with special characters           | `symbol=IBM$`, valid API key            | API gracefully handles input and returns clear validation error or invalid character message.                    |
| 11      | Multiple simultaneous requests           | Concurrent valid requests               | All requests succeed without errors or performance degradation.                                                  |
| 12      | Caching behavior validation              | Same valid request repeated quickly     | Verify if response data remains identical on repeated requests indicating caching.                               |                               |

### API Endpoint
```
https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=your_api_key
