const { chromium } = require('playwright');

async function inspectScales() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const scales = await page.evaluate(() => {
    const select = document.getElementById('scale-select');
    if (!select) return null;
    return Array.from(select.options).map(opt => ({
      value: opt.value,
      text: opt.textContent
    }));
  });

  console.log('Available scales:');
  console.log(JSON.stringify(scales, null, 2));

  await browser.close();
}

inspectScales();
