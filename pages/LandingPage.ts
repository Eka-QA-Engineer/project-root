import { Page, Locator, expect} from '@playwright/test';

const HERO_H1 = 'Revolutionize Your Waste Management with wwwaste.io';
const HERO_H3 = 'Welcome to the cutting-edge SaaS Platform for Collectors, Transporters, Recyclers, and Incinerators.';

export class LandingPage {
  readonly page: Page;

  // --- Hero Section Locators ---
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly getStartedBtn: Locator;
  readonly contactBtn: Locator;

  // --- Section Locators ---
  readonly missionQuoteSection: Locator;
  readonly wasteHandleSection: Locator;
  readonly whyWasterSection: Locator;
  readonly roledBased1Section: Locator;
  readonly roledBased2Section: Locator;
  readonly roledBased3Section: Locator;
  readonly roledBased4Section: Locator;
  readonly roledBased5Section: Locator;
  readonly roledBased6Section: Locator;
  readonly features1Section: Locator;
  readonly features2Section: Locator;
  readonly features3Section: Locator;
  readonly clientTestimonySection: Locator;
  readonly manageWasteSection: Locator;
  readonly getaQuotationSection: Locator;
  readonly footerSection: Locator;

  // === BADGES ===
  readonly googlePlayBadge: Locator;
  // readonly appStoreBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    // --- Hero Section ---
    this.heroTitle = page.getByRole('heading', {
      level: 1,
      name: HERO_H1,
    });
    this.heroSubtitle = page.getByRole('heading', {
      level: 3,
      name: HERO_H3,
    }); 
    this.getStartedBtn = page.getByRole('link', { name: /get started now/i });
    this.contactBtn = page.getByRole('link', { name: /contact us/i });

    // --- Main Sections ---
    this.missionQuoteSection = page.locator('text=/Our mission is to help you optimize waste processes/i');
    this.wasteHandleSection = page.locator('text=/We handle all type of waste/i');
    this.whyWasterSection = page.locator('text=/Why choosing our solution for your business/i');
    this.roledBased1Section = page.locator('text=/As a waste collector/i');
    this.roledBased2Section = page.locator('text=/Mobile App for your Producers/i');
    this.roledBased3Section = page.locator('text=/Mobile App for your Drivers/i');
    this.roledBased4Section = page.locator('text=/As a waste warehouse/i');
    this.roledBased5Section = page.locator('text=/As a Waste Recyclers/i');
    this.roledBased6Section = page.locator('text=/As a Waste Incinerator/i');
    this.features1Section = page.locator('text=/Sustainable waste management features/i');
    this.features2Section = page.locator('text=/Waste producers features/i');
    this.features3Section = page.locator('text=/Bio-hazard and infectious waste management features/i');
    this.clientTestimonySection = page.locator('text=/What our collectors’ clients are saying/i');
    this.manageWasteSection = page.locator('text=/Managing waste has never been easier/i');
    this.getaQuotationSection = page.locator('text=/Waste Industry/i');
    this.footerSection = page.locator('text=/Privacy Policy/i');

    // BADGES

    this.googlePlayBadge = page.locator('a[href="https://play.google.com/store/apps/details?id=com.wwwaste.producer"]').first();
    //this.appStoreBadge = page.locator('a[href*="apps.apple.com"]').first(); (no app store link yet)
  }

  // --- Actions & Verifications ---

  async goto() {
    await this.page.goto('/');
  }

  async verifyHeroSectionVisible() {
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroSubtitle).toBeVisible();
    await expect(this.getStartedBtn).toBeVisible();
    await expect(this.contactBtn).toBeVisible();
  }

  async clickGetStartedAndVerify() {
    await this.getStartedBtn.click();
    await expect(this.page).toHaveURL(/#quotation/);
  }

  async clickContactAndVerify() {
    await this.contactBtn.click();
    await expect(this.page).toHaveURL(/#contact/);
  }

    async verifyAllSectionsVisible() {
    await expect(this.missionQuoteSection).toBeVisible();
    await expect(this.wasteHandleSection).toBeVisible();
    await expect(this.whyWasterSection).toBeVisible();
    await expect(this.roledBased1Section).toBeVisible();
    await expect(this.roledBased2Section).toBeVisible();
    await expect(this.roledBased3Section).toBeVisible();
    await expect(this.roledBased4Section).toBeVisible();
    await expect(this.roledBased5Section).toBeVisible();
    await expect(this.roledBased6Section).toBeVisible();
    await expect(this.features1Section).toBeVisible();
    await expect(this.features2Section).toBeVisible();
    await expect(this.features3Section).toBeVisible();
    await expect(this.clientTestimonySection).toBeVisible();
    await expect(this.manageWasteSection).toBeVisible();
    await expect(this.getaQuotationSection).toBeVisible();
    await expect(this.footerSection).toBeVisible();
  }

  async verifyGooglePlayBadge() {
    await expect(this.googlePlayBadge).toBeVisible();
    await expect(this.googlePlayBadge).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.wwwaste.producer'
    );
  }
  /*
   async verifyAppStoreBadge() {
    await expect(this.appStoreBadge).toBeVisible();
    await expect(this.appStoreBadge).toHaveAttribute('href', /apps\.apple\.com/);
  } 
  */  

}

