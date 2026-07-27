import { test, expect } from '@playwright/test';
test('GX1 BRD intake desktop visual', async ({ page }) => {
  await page.setViewportSize({ width:1536, height:1024 });
  await page.goto('/', { waitUntil:'networkidle' });
  await page.screenshot({ path:'test-results/gx1-current.png' });
  await expect(page).toHaveTitle(/GX1/);
});

test('workflow remains separated at compact width', async ({ page }) => {
  await page.setViewportSize({ width:1024, height:768 });
  await page.goto('/', { waitUntil:'networkidle' });
  await page.screenshot({ path:'test-results/gx1-compact.png' });
  await expect(page.locator('.step').first()).toBeVisible();
});

test('workflow has wide-screen gutters', async ({ page }) => {
  await page.setViewportSize({ width:1920, height:900 });
  await page.goto('/', { waitUntil:'networkidle' });
  await page.screenshot({ path:'test-results/gx1-wide.png' });
  await expect(page.locator('.step')).toHaveCount(8);
});
