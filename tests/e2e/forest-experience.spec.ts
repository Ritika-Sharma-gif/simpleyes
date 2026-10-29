import { expect, test } from "@playwright/test";

test.describe("Forest immersive redesign", () => {
  test("hero and all six service links are accessible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: /Consular assistance/i })).toBeVisible();
    await expect(page.locator(".sy-scene")).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".sy-service-card")).toHaveCount(6);
    await expect(page.getByRole("link", { name: /Get Help on WhatsApp/i }).first()).toHaveAttribute("href", /wa\.me/);
    await expect(page.getByRole("link", { name: /Explore Our Services/i })).toHaveAttribute("href", "/services/");
  });

  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    test("no horizontal overflow at " + width + "px", async ({ page }) => {
      await page.setViewportSize({ width, height: 850 });
      await page.goto("/");
      await expect(page.locator("#hero-title")).toBeVisible();
      await expect(page.locator(".sy-service-grid")).toBeAttached();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(dimensions.content, "horizontal document overflow at " + width).toBeLessThanOrEqual(dimensions.viewport + 1);
    });
  }

  test("pointer interactions leave site navigation usable", async ({ page, isMobile }) => {
    test.skip(isMobile, "fine-pointer interaction is intentionally off on mobile");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const heroScene = page.locator("#simplyes-hero-scene");
    await heroScene.hover();
    await expect.poll(() => heroScene.evaluate((node) => node.style.getPropertyValue("--scene-x"))).toMatch(/px$/);
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Services" }).click();
    await expect(page).toHaveURL(/\/services\/$/);
  });

  test("reduced motion has no decorative animation or hidden copy", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const result = await page.evaluate(() => ({
      heroAnimation: getComputedStyle(document.querySelector(".sy-scene-star")!).animationName,
      haloDisplay: getComputedStyle(document.querySelector(".sy-cursor")!).display,
      concealed: [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
        .filter((el) => getComputedStyle(el).opacity === "0").length,
    }));
    expect(result).toMatchObject({ heroAnimation: "none", haloDisplay: "none", concealed: 0 });
  });
});
