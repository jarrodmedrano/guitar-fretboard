const { chromium } = require('playwright');

async function inspectPage() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Get all select elements
  const selects = await page.evaluate(() => {
    const allSelects = Array.from(document.querySelectorAll('select'));
    return allSelects.map(select => ({
      id: select.id,
      ariaLabel: select.getAttribute('aria-label'),
      classes: select.className,
      visible: window.getComputedStyle(select).display !== 'none',
      offsetWidth: select.offsetWidth,
      offsetHeight: select.offsetHeight
    }));
  });

  console.log('Found selects:', JSON.stringify(selects, null, 2));

  await browser.close();
}

inspectPage();
