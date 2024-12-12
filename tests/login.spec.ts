import { test, expect, Page } from '@playwright/test';

// Types
interface TaskTest {
  application: string;
  task: string;
  column: string;
  tags: string[];
  description: string;
}

// Test Data
const testCases: TaskTest[] = [
  {
    application: "Web Application",
    task: "Implement user authentication",
    column: "To Do",
    tags: ["Feature", "High Priority"],
    description: "verify feature and high priority tags"
  },
  {
    application: "Web Application",
    task: "Fix navigation bug",
    column: "To Do",
    tags: ["Bug"],
    description: "verify bug tag"
  },
  {
    application: "Web Application",
    task: "Design system updates",
    column: "In Progress",
    tags: ["Design"],
    description: "verify design tag"
  },
  {
    application: "Mobile Application",
    task: "Push notification system",
    column: "To Do",
    tags: ["Feature"],
    description: "verify feature tag"
  },
  {
    application: "Mobile Application",
    task: "Offline mode",
    column: "In Progress",
    tags: ["Feature", "High Priority"],
    description: "verify feature and high priority tags"
  },
  {
    application: "Mobile Application",
    task: "App icon design",
    column: "Done",
    tags: ["Design"],
    description: "verify design tag"
  },
  {
    application: "Mobile Application",
    task: "Push notification system",
    column: "To Do",
    tags: ["High Priority"],
    description: "verify incorrect high priority tag"
  }
];

// Page actions
class TaskPage {
  private readonly demoAppUrl = 'https://animated-gingersnap-8cf7f2.netlify.app/';

  constructor(private page: Page) {}

  async login() {
    await this.page.goto(this.demoAppUrl);
    await this.page.fill('#username', 'admin');
    await this.page.fill('#password', 'password123');
    await this.page.click('button[type="submit"]');
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToApplication(application: string) {
    await this.page.click(`text=${application}`);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTaskAndTags(testCase: TaskTest) {
    const column = await this.page.locator('div', { 
      hasText: testCase.column 
    }).filter({ has: this.page.locator('h3', { hasText: testCase.task }) });

    const taskContainer = await column.locator('div.bg-white.p-4', {
      hasText: testCase.task
    }).first();

    return await taskContainer.locator('div.flex.flex-wrap.gap-2 span').allTextContents();
  }
}

// Tests
test.describe('Task Management Tests', () => {
  let taskPage: TaskPage;

  test.beforeEach(async ({ page }) => {
    taskPage = new TaskPage(page);
    await taskPage.login();
  });

  for (const testCase of testCases) {
    test(`${testCase.application} - ${testCase.task} (${testCase.description})`, async () => {
      await taskPage.navigateToApplication(testCase.application);
      const tags = await taskPage.verifyTaskAndTags(testCase);
      
      for (const tag of testCase.tags) {
        expect(tags).toContain(tag);
      }
    });
  }
});