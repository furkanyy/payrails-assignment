import { APIRequestContext } from '@playwright/test';

export class APIHelper {
  /**
   * Creates an instance of APIHelper.
   * @param request - Playwright's APIRequestContext
   */
  constructor(private readonly request: APIRequestContext) {}

  /**
   * Sends a GET request to the specified URL.
   * 
   * @param url - The URL to send the request to
   * @param headers - Optional request headers
   */
  async get(url: string, headers = {}) {
    return await this.request.get(url, { headers });
  }
} 