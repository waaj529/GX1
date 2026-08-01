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

test('application frame remains stable across every workflow step', async ({ page }) => {
  await page.setViewportSize({ width:1536, height:1024 });
  await page.goto('/', { waitUntil:'networkidle' });

  const frame = async () => page.evaluate(() => {
    const box = (selector: string) => {
      const rect = document.querySelector(selector)!.getBoundingClientRect();
      return { left:rect.left, top:rect.top, width:rect.width, height:rect.height };
    };
    return {
      sidebar:box('.sidebar'),
      header:box('header'),
      body:(() => {
        const rect = document.querySelector('.body')!.getBoundingClientRect();
        return { left:rect.left, top:rect.top, width:rect.width };
      })(),
      stepper:box('.stepper'),
      footer:box('footer'),
    };
  });

  const initial = await frame();
  await page.screenshot({ path:'test-results/workflow-step-1.png' });
  for (let index = 1; index < 8; index += 1) {
    await page.locator('.step').nth(index).click();
    await expect.poll(frame).toEqual(initial);
    if (index < 3) {
      await page.screenshot({ path:`test-results/workflow-step-${index + 1}.png` });
    }
  }
});

test('normalisation panels do not overlap at intermediate desktop widths', async ({ page }) => {
  await page.setViewportSize({ width:1280, height:900 });
  await page.goto('/', { waitUntil:'networkidle' });
  await page.locator('.step').nth(1).click();

  const source = page.locator('.norm-grid > .norm-panel').nth(0);
  const requirement = page.locator('.norm-grid > .norm-panel').nth(1);
  const rail = page.locator('.norm-grid > .rail');
  const [sourceBox, requirementBox, railBox] = await Promise.all([
    source.boundingBox(), requirement.boundingBox(), rail.boundingBox(),
  ]);

  expect(sourceBox!.x + sourceBox!.width).toBeLessThanOrEqual(requirementBox!.x);
  expect(requirementBox!.x + requirementBox!.width).toBeLessThanOrEqual(railBox!.x);
  await page.screenshot({ path:'test-results/workflow-step-2-1280.png' });
});

test('screen specification retains the original two-by-two desktop workspace', async ({ page }) => {
  await page.setViewportSize({ width:1280, height:900 });
  await page.goto('/', { waitUntil:'networkidle' });
  await page.locator('.step').nth(3).click();

  const panels = page.locator('.spec-workspace-grid > .spec-panel');
  await expect(panels).toHaveCount(4);
  const boxes = await Promise.all(
    Array.from({ length:4 }, (_, index) => panels.nth(index).boundingBox()),
  );

  expect(boxes[0]!.y).toBe(boxes[1]!.y);
  expect(boxes[2]!.y).toBe(boxes[3]!.y);
  expect(boxes[0]!.x).toBe(boxes[2]!.x);
  expect(boxes[1]!.x).toBe(boxes[3]!.x);
  expect(boxes[1]!.x).toBeGreaterThan(boxes[0]!.x);
  expect(boxes[2]!.y).toBeGreaterThan(boxes[0]!.y);

  const workspace = await page.locator('.spec-workspace-grid').boundingBox();
  const rail = await page.locator('.lcr-content-grid > .rail').boundingBox();
  expect(workspace!.x + workspace!.width).toBeLessThanOrEqual(rail!.x);

  const flowPanel = await panels.nth(1).boundingBox();
  const flowNodes = page.locator('.spec-flow-canvas > *');
  for (let index = 0; index < await flowNodes.count(); index += 1) {
    const node = await flowNodes.nth(index).boundingBox();
    expect(node!.x).toBeGreaterThanOrEqual(flowPanel!.x);
    expect(node!.x + node!.width).toBeLessThanOrEqual(flowPanel!.x + flowPanel!.width);
  }

  const tableRows = page.locator('.spec-workspace-grid .spec-table tbody tr');
  for (let index = 0; index < await tableRows.count(); index += 1) {
    const row = await tableRows.nth(index).boundingBox();
    expect(row!.height).toBeLessThanOrEqual(30);
  }
  await page.screenshot({ path:'test-results/workflow-step-4-1280.png' });
});
