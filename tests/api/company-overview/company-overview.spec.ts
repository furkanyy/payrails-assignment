import { test, expect } from '@playwright/test';
import { APIHelper } from '../../helpers/api-helpers';

test.describe('Company Overview', () => {
  let apiHelper: APIHelper;
  const BASE_URL = 'https://www.alphavantage.co';
  const API_KEY = process.env.ALPHA_VANTAGE_API_KEY || 'XXI0RCN02TDC40PX';

  test.beforeEach(async ({ request }) => {
    apiHelper = new APIHelper(request);
  });

  /**
   * Test Case 01: Valid Company Overview Request
   * Purpose: Verify basic successful API response for a valid company symbol
   * Steps:
   * 1. Send request with valid symbol (IBM) and API key
   * 2. Verify response status is 200 OK
   */
  test('01: should get company overview successfully with valid symbol', async () => {
    const response = await apiHelper.get(`${BASE_URL}/query?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  /**
   * Test Case 02: Invalid API Key Handling
   * Purpose: Verify error handling when API key is missing or invalid
   * Steps:
   * 1. Send request with empty API key
   * 2. Verify response contains appropriate error message
   */
  test('02: should return correct error message for invalid API key', async () => {
    const response = await apiHelper.get(`${BASE_URL}/query?function=OVERVIEW&symbol=IBM&apikey=`);
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    const expectedMessage = 'the parameter apikey is invalid or missing. Please claim your free API key on (https://www.alphavantage.co/support/#api-key). It should take less than 20 seconds.';
    expect(data['Error Message']).toBe(expectedMessage);
  });

  /**
   * Test Case 05: Field Completeness Check
   * Purpose: Verify all documented fields are present in the response
   * Steps:
   * 1. Send request with valid parameters
   * 2. Check presence of all 52 expected fields
   */
  test('05: Response includes all expected fields and no null/undefined values', async () => {
    const response = await apiHelper.get(`${BASE_URL}/query?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  
    const data = await response.json();
  
    // Ensure it's not an error response
    if (data['Error Message'] || data['Note'] || data['Information']) {
      console.error('Received error response from API:', data);
      throw new Error('API did not return valid company data. Check API key or rate limits.');
    }
  
    const expectedFields = [
      'Symbol', 'AssetType', 'Name', 'Description', 'CIK', 'Exchange', 'Currency',
      'Country', 'Sector', 'Industry', 'Address', 'OfficialSite', 'FiscalYearEnd',
      'LatestQuarter', 'MarketCapitalization', 'EBITDA', 'PERatio', 'PEGRatio',
      'BookValue', 'DividendPerShare', 'DividendYield', 'EPS', 'RevenuePerShareTTM',
      'ProfitMargin', 'OperatingMarginTTM', 'ReturnOnAssetsTTM', 'ReturnOnEquityTTM',
      'RevenueTTM', 'GrossProfitTTM', 'DilutedEPSTTM', 'QuarterlyEarningsGrowthYOY',
      'QuarterlyRevenueGrowthYOY', 'AnalystTargetPrice', 'TrailingPE', 'ForwardPE',
      'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA',
      'Beta', '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage',
      'SharesOutstanding', 'DividendDate', 'ExDividendDate', 'AnalystRatingStrongBuy',
      'AnalystRatingBuy', 'AnalystRatingHold', 'AnalystRatingSell', 'AnalystRatingStrongSell'
    ];
  
    // Check all fields exist and are not null or undefined
    expectedFields.forEach(field => {
      expect(data, `Field ${field} is missing from response`).toHaveProperty(field);
      expect(data[field], `Field ${field} should not be null`).not.toBeNull();
      expect(data[field], `Field ${field} should not be undefined`).not.toBeUndefined();
    });
  });

  /**
   * Test Case 06: Data Type Validation
   * Purpose: Verify correct data types for all fields
   * Steps:
   * 1. Send request with valid parameters
   * 2. Validate data types:
   *    - String fields (company info)
   *    - Date fields (YYYY-MM-DD format)
   *    - Numeric fields (financial metrics)
   */
  test('06: All fields should have correct data types', async () => {
    const response = await apiHelper.get(`${BASE_URL}/query?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`);
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    const stringFields = [
      "Symbol", "AssetType", "Name", "Description", "CIK", "Exchange", "Currency",
      "Country", "Sector", "Industry", "Address", "OfficialSite", "FiscalYearEnd"
    ];
  
    const dateFields = [
      "LatestQuarter", "DividendDate", "ExDividendDate"
    ];
  
    const numericFields = [
      "MarketCapitalization", "EBITDA", "PERatio", "PEGRatio", "BookValue", "DividendPerShare",
      "DividendYield", "EPS", "RevenuePerShareTTM", "ProfitMargin", "OperatingMarginTTM",
      "ReturnOnAssetsTTM", "ReturnOnEquityTTM", "RevenueTTM", "GrossProfitTTM", "DilutedEPSTTM",
      "QuarterlyEarningsGrowthYOY", "QuarterlyRevenueGrowthYOY", "AnalystTargetPrice",
      "AnalystRatingStrongBuy", "AnalystRatingBuy", "AnalystRatingHold", "AnalystRatingSell",
      "AnalystRatingStrongSell", "TrailingPE", "ForwardPE", "PriceToSalesRatioTTM",
      "PriceToBookRatio", "EVToRevenue", "EVToEBITDA", "Beta", "52WeekHigh", "52WeekLow",
      "50DayMovingAverage", "200DayMovingAverage", "SharesOutstanding"
    ];
  
    stringFields.forEach(field => {
      expect(typeof data[field], `${field} should be a string`).toBe('string');
    });
    
    numericFields.forEach(field => {
      const value = Number(data[field]);
      expect(isNaN(value), `${field} should be a valid number`).toBe(false);
    });
  
    dateFields.forEach(field => {
      expect(data[field], `${field} should be a valid date in YYYY-MM-DD format`)
        .toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
}); 