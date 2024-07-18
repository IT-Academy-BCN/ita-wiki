import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://dev.itawiki.eurecatacademy.org/');
  await expect(page).toHaveTitle(/ITA Wiki/);
});
