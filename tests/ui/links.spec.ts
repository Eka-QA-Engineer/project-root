import { test, expect } from '@playwright/test';

test.describe('link map crawl and 200 checks', () => {
  test('all links on landing page respond with 200', async ({ page, request }) => {
    await page.goto('/');

    const links = await page.$$eval('a', anchors =>
      anchors
        .map(a => a.getAttribute('href'))
        .filter((href): href is string => !!href && !href.startsWith('#') && !href.startsWith('mailto:'))
    );

    console.log(`Found ${links.length} links`);
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      const url = link.startsWith('http') ? link : new URL(link, page.url()).href;
      console.log(`Checking: ${url}`);

      const response = await request.get(url);
      const status = response.status();

      expect(status, `Failed on ${url}`).toBe(200);
    }
  });
});
