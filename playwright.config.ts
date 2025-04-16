import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  reporter: [
    ['list'],
    ['html']
  ],
  use: {
    baseURL: 'https://www.alphavantage.co',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.ts/,
    }
  ]
};

export default config; 