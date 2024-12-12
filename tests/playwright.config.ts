import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    navigationTimeout: 15000,
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  reporter: [
    ['html'],
    ['list'] 
  ],
  retries: 1,
};

export default config;