import { expect, test } from "@playwright/test";

test.describe("Living editorial 3D scene", () => {
  test("document art and meaningful hero content render before WebGL", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#simplyes-hero-scene")).toBeVisible();
    await expect(page.locator(".sy-scene-paper-front")).toBeAttached();
    await expect(page.locator('[data-3d-experience="hero"]')).toHaveAttribute("aria-hidden", "true");
    await expect(page.getByRole("heading", { level: 1, name: /Consular assistance/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Get Help on WhatsApp/i }).first()).toHaveAttribute("href", /wa\.me/);
  });

  test("mobile uses the lightweight fallback, not an extra WebGL context", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator('[data-3d-experience="hero"]')).toHaveAttribute("data-3d-ready", "false");
    await expect(page.locator(".sy-three-canvas")).toHaveCount(0);
    await expect(page.locator(".sy-scene-paper-front")).toBeVisible();
  });

  test("reduced-motion preference disables WebGL and animated section loading", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".sy-three-canvas")).toHaveCount(0);
    await expect(page.locator('[data-3d-experience="hero"]')).toHaveAttribute("data-3d-ready", "false");
    const hiddenCount = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("[data-reveal]")].filter(el => getComputedStyle(el).opacity === "0").length,
    );
    expect(hiddenCount).toBe(0);
  });

  test("lack of WebGL never prevents visitors reaching WhatsApp or services", async ({ page }) => {
    await page.addInitScript(() => {
      const native = HTMLCanvasElement.prototype.getContext;
      Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
        configurable: true,
        value: function (...args: unknown[]) {
          const kind = String(args[0]);
          if (kind === "webgl" || kind === "webgl2" || kind === "experimental-webgl") return null;
          return Reflect.apply(native, this, args);
        },
      });
    });
    await page.goto("/");
    await expect(page.locator(".sy-three-canvas")).toHaveCount(0);
    await expect(page.locator(".sy-scene-paper-front")).toBeVisible();
    await page.locator(".sy-hero-actions").getByRole("link", { name: /Explore Our Services/ }).click();
    await expect(page).toHaveURL(/\/services\/$/);
  });

  test("four-step process includes its 3D narrative fallback", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#how-it-works .sy-process-item")).toHaveCount(4);
    await expect(page.locator('[data-3d-experience="process"]')).toHaveAttribute("aria-hidden", "true");
    await expect(page.locator(".sy-process-static-art")).toBeAttached();
  });
});

test("interactive service finder stays accurate and keyboard accessible", async ({ page }) => {
  await page.goto("/");
  const finder = page.locator("#find-assistance");
  await expect(finder.getByRole("radio")).toHaveCount(6);
  const photo = finder.getByRole("radio", { name: /Photo.*Signature/i });
  await photo.check();
  await expect(photo).toBeChecked();
  await expect(finder.getByRole("heading", { name: "Photo & Signature Preparation" })).toBeVisible();
  await expect(finder.getByRole("link", { name: /View service details/i })).toHaveAttribute("href", "/services/photo-signature-preparation/");
  await expect(finder.getByRole("link", { name: /Ask us on WhatsApp/i })).toHaveAttribute("href", /wa\.me/);
});
