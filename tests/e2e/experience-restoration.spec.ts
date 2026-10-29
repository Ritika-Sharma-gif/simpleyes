import { expect, test } from "@playwright/test";

/** The site's visual enhancements must preserve essential behaviors. */
test.describe("Premium experience restoration", () => {
  test("four original process steps and benefits remain present", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#how-it-works .sy-process-item")).toHaveCount(4);
    await expect(page.locator("#why-simplyes .sy-benefit-item")).toHaveCount(6);
    await expect(page.locator("#services .sy-service-card")).toHaveCount(6);
    await expect(page.getByRole("heading", { name: "How we can help" })).toBeVisible();
  });

  test("desktop magnetic hover moves only the CTA face, not its hit target", async ({ page, isMobile }) => {
    test.skip(isMobile, "cursor enhancement applies only to desktop pointers");
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const cta = page.locator(".sy-hero-actions [data-magnetic]").first();
    // Playwright scrolls the target into view on hover. Settle scrolling and
    // finish the hero entrance BEFORE measuring its stable hit rectangle.
    await cta.scrollIntoViewIfNeeded();
    await page.locator(".sy-hero-actions").evaluate((element) => {
      for (const animation of element.getAnimations()) animation.finish();
    });
    const before = await cta.boundingBox();
    expect(before).not.toBeNull();
    await cta.hover({ position: { x: 18, y: 15 } });
    await expect.poll(() => cta.evaluate(el => el.style.getPropertyValue("--magnet-x"))).toMatch(/px$/);
    const after = await cta.boundingBox();
    expect(after).not.toBeNull();
    expect(Math.abs(after!.x - before!.x)).toBeLessThan(1);
    expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  });

  test("reduced motion removes pointer effects without hiding content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const result = await page.evaluate(() => {
      const cursor = document.querySelector<HTMLElement>(".sy-cursor")!;
      const cta = document.querySelector<HTMLElement>("[data-magnetic] .btn-face")!;
      return {
        cursorDisplay: getComputedStyle(cursor).display,
        magneticTransition: getComputedStyle(cta).transitionDuration,
        hiddenReveals: [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
          .filter(el => getComputedStyle(el).opacity === "0").length,
      };
    });
    expect(result.cursorDisplay).toBe("none");
    expect(result.magneticTransition).toMatch(/^0s/);
    expect(result.hiddenReveals).toBe(0);
  });

  test("service details, FAQ and contact routes are still reachable", async ({ page }) => {
    await page.goto("/");
    await page.locator("#services .sy-service-card").first().click();
    await expect(page).toHaveURL(/\/services\/document-guidance\/$/);
    await page.goto("/faqs/");
    await expect(page.locator("details").first()).toBeAttached();
    await page.goto("/contact/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
