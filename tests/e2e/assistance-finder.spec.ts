import { test, expect } from "@playwright/test";

test.describe("Assistance finder", () => {
  test("selects the right service using native keyboard radio controls", async ({ page }) => {
    await page.goto("/");
    const finder = page.locator("#find-assistance");
    await expect(finder.getByRole("heading", { name: "What can we help you with?" })).toBeVisible();
    await expect(finder.getByRole("radio")).toHaveCount(6);
    await expect(page.getByRole("link", { name: /Not sure where to begin/i })).toHaveAttribute("href", "#find-assistance");

    const topic = finder.getByRole("radio", { name: /Photo & Signature Preparation/i });
    await topic.focus();
    await page.keyboard.press("Space");
    await expect(topic).toBeChecked();
    await expect(finder.getByRole("heading", { name: "Photo & Signature Preparation" })).toBeVisible();
    await expect(finder.getByText("What this includes")).toBeVisible();
    await expect(finder.locator("ul").getByRole("listitem")).toHaveCount(2);

    await expect(finder.getByRole("link", { name: /View service details/i }))
      .toHaveAttribute("href", "/services/photo-signature-preparation/");
    await expect(finder.getByRole("link", { name: /Ask us on WhatsApp/i }))
      .toHaveAttribute("href", /wa\.me\/.+text=/);
  });

  for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
    test("has no horizontal overflow at " + width + "px", async ({ page }) => {
      await page.setViewportSize({ width, height: 850 });
      await page.goto("/");
      await expect(page.locator("#find-assistance")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow).toBe(false);
    });
  }
});
