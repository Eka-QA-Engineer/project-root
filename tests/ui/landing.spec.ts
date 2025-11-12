import { test } from '@playwright/test';
import { LandingPage } from '../../pages/LandingPage';

test.describe('Landing Page', () => {
  // Hero smoke + CTA check
  test('Hero renders and CTAs work', async ({ page }) => {
    const landingPage = new LandingPage(page);

    await landingPage.goto();
    await landingPage.verifyHeroSectionVisible();

    // CTA checks
    await landingPage.clickGetStartedAndVerify();
    await page.goBack();
    await landingPage.clickContactAndVerify();
  });

  // Sections checks
  test('All sections are visible', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await landingPage.verifyAllSectionsVisible();
  });

  // Badges checks
  test('verify store badges', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await landingPage.verifyGooglePlayBadge();
  // await landingPage.verifyAppStoreBadge();
});
});
