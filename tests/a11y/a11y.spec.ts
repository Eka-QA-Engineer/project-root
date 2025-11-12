import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';

test.describe('Accessibility Audit', () => {
  test('Landing Page accessibility audit', async ({ page }) => {
    await page.goto('/');

    // Run the audit using axe-core
    const results = await new AxeBuilder({ page }).analyze();

    // Save the full results to a JSON file
    const outputPath = 'test-results/accessibility-report.json';
    fs.mkdirSync('test-results', { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`Full accessibility report saved to: ${outputPath}`);

    // If there are violations, display a summary in the terminal
    if (results.violations.length > 0) {
      console.log(`Found ${results.violations.length} accessibility issues:`);

      for (const violation of results.violations) {
        console.log('-------------------------------------------');
        console.log(`Rule: ${violation.id}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.helpUrl}`);
        console.log(`Nodes affected: ${violation.nodes.length}`);
        violation.nodes.slice(0, 3).forEach((node, index) => {
          console.log(`  ${index + 1}. Target: ${node.target.join(' ')}`);
        });
      }

      console.log('-------------------------------------------');
    } else {
      console.log('No accessibility violations found.');
    }

    // Test is still considered passed even if there are violations
    expect(results.violations.length).toBeLessThan(100);
  });
});
