import { expect, test } from "@playwright/test";

/** Regression coverage for scroll content legibility.
 * Reveals must never hide or blur essential text while scrolling. */
for (const width of [320, 390, 1440]) {
  test("scroll-reveal content remains crisp and visible at " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 820 });
    await page.goto("/");

    const assess = () =>
      page.evaluate(() => {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>("[data-reveal], .hero-intro"),
        );
        return {
          count: nodes.length,
          problemElements: nodes
            .filter((element) => {
              const style = getComputedStyle(element);
              return style.opacity !== "1" || style.filter !== "none";
            })
            .map((element) => ({
              tag: element.tagName,
              opacity: getComputedStyle(element).opacity,
              filter: getComputedStyle(element).filter,
            })),
        };
      });

    const initial = await assess();
    expect(initial.count).toBeGreaterThan(10);
    expect(initial.problemElements).toEqual([]);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
    expect((await assess()).problemElements).toEqual([]);
  });
}

test("reduced-motion preference keeps reveal content static", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const styles = await page.evaluate(() => {
    const reveal = document.querySelector<HTMLElement>("[data-reveal]");
    const hero = document.querySelector<HTMLElement>(".hero-intro");
    if (!reveal || !hero) return null;
    return {
      revealTransform: getComputedStyle(reveal).transform,
      revealFilter: getComputedStyle(reveal).filter,
      heroAnimation: getComputedStyle(hero).animationName,
    };
  });
  expect(styles).not.toBeNull();
  expect(styles).toMatchObject({
    revealTransform: "none",
    revealFilter: "none",
    heroAnimation: "none",
  });
});

test("immersive hero stays decorative and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const atmosphere = page.locator(".hero-atmosphere");
  await expect(atmosphere).toHaveAttribute("aria-hidden", "true");
  await expect(atmosphere).toHaveCSS("pointer-events", "none");
  await expect(page.locator(".hero-atmosphere__spark").first()).toHaveCSS("animation-name", "none");

  await expect(page.getByRole("heading", { name: /Consular assistance/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Not sure where to begin/i })).toBeVisible();
});
