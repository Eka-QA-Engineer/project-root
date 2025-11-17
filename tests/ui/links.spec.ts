import { test, expect } from '@playwright/test';

test.describe('link map crawl and 200 checks', () => {
  test('all unique links on landing page respond with 200', async ({ page, request }) => {
    await page.goto('/');

    // Ambil semua href dari <a> dan filter mailto dan kosong
    const rawLinks = await page.$$eval('a', anchors =>
      anchors
        .map(a => a.getAttribute('href'))
        .filter((href): href is string => !!href && !href.startsWith('mailto:'))
    );

    // Hilangkan duplikat, tapi pertahankan hash untuk link internal
    const links = Array.from(new Set(rawLinks));

    console.log(`Found ${links.length} unique links`);
    expect(links.length).toBeGreaterThan(0);

    for (const link of links) {
      // Buat URL absolut jika relative
      const url = link.startsWith('http') ? link : new URL(link, page.url()).href;

      const response = await request.get(url);
      const status = response.status();

      if (status !== 200) {
        console.log(`❌ FAILED ${status} → ${url}`);
      } else {
        console.log(`✔ OK ${status} → ${url}`);
      }

      expect(status).toBe(200);
    }
  });
});
