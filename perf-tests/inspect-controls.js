const { chromium } = require('playwright');

async function inspectControls() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Get all interactive elements
  const controls = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const selects = Array.from(document.querySelectorAll('select'));

    return {
      buttons: buttons.map(btn => ({
        id: btn.id,
        text: btn.textContent?.trim().substring(0, 50),
        ariaLabel: btn.getAttribute('aria-label'),
        classes: btn.className.substring(0, 100),
        visible: window.getComputedStyle(btn).display !== 'none' && btn.offsetWidth > 0
      })).filter(b => b.visible),
      selects: selects.map(select => ({
        id: select.id,
        ariaLabel: select.getAttribute('aria-label'),
        classes: select.className,
        visible: window.getComputedStyle(select).display !== 'none' && select.offsetWidth > 0
      })).filter(s => s.visible)
    };
  });

  console.log('\n=== VISIBLE SELECTS ===');
  console.log(JSON.stringify(controls.selects, null, 2));

  console.log('\n=== VISIBLE BUTTONS (first 10) ===');
  console.log(JSON.stringify(controls.buttons.slice(0, 10), null, 2));

  await browser.close();
}

inspectControls();
