import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";

test("capture rendered 3D desktop and lightweight mobile fallback", async ({ page, isMobile }) => {
  test.skip(isMobile, "Single desktop-controlled screenshot run sets its own mobile viewport");
  mkdirSync("qa", { recursive: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("#hero-title")).toBeVisible();
  await page.locator("#simplyes-hero-scene").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await page.locator(".sy-hero").screenshot({ path: "qa/3d-desktop-hero.png" });

  await page.locator("#how-it-works").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.locator("#how-it-works").screenshot({ path: "qa/3d-process.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".sy-scene-paper-front")).toBeVisible();
  await page.locator(".sy-hero").screenshot({ path: "qa/3d-mobile-fallback.png" });
});
