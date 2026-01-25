const { chromium } = require('playwright');

async function deepMemoryAnalysis() {
  console.log('🔬 Deep Memory Leak Analysis - Production Build');
  console.log('=' .repeat(80));

  const browser = await chromium.launch({
    headless: false,
    args: ['--js-flags=--expose-gc'] // Enable manual garbage collection
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForSelector('select[id="scale-select"]', { timeout: 5000, state: 'attached' });

    console.log('\n📊 Running 5 interaction cycles to detect memory leaks...\n');

    const memorySnapshots = [];

    for (let cycle = 0; cycle <= 5; cycle++) {
      // Force garbage collection before measuring
      await page.evaluate(() => {
        if (window.gc) {
          window.gc();
        }
      });
      await page.waitForTimeout(500);

      const memory = await page.evaluate(() => {
        if (performance.memory) {
          return {
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
          };
        }
        return null;
      });

      if (memory) {
        memorySnapshots.push({
          cycle,
          ...memory,
          usedMB: (memory.usedJSHeapSize / 1024 / 1024).toFixed(2),
          totalMB: (memory.totalJSHeapSize / 1024 / 1024).toFixed(2)
        });

        console.log(`Cycle ${cycle}: ${memorySnapshots[cycle].usedMB} MB used`);
      }

      if (cycle < 5) {
        // Perform interaction cycle
        await page.click('button[aria-label="Select root note: D"]');
        await page.waitForTimeout(200);

        const scaleSelect = await page.locator('select[id="scale-select"]');
        await scaleSelect.selectOption('minor');
        await page.waitForTimeout(200);

        await page.click('button[aria-label="Select root note: G"]');
        await page.waitForTimeout(200);

        await scaleSelect.selectOption('minorPentatonic');
        await page.waitForTimeout(200);

        await page.click('button[aria-label="Select root note: C"]');
        await page.waitForTimeout(200);

        await scaleSelect.selectOption('major');
        await page.waitForTimeout(200);
      }
    }

    console.log('\n' + '='.repeat(80));
    console.log('📈 Memory Analysis Results');
    console.log('='.repeat(80));

    if (memorySnapshots.length > 0) {
      const initial = memorySnapshots[0];
      const final = memorySnapshots[memorySnapshots.length - 1];

      const totalGrowth = final.usedJSHeapSize - initial.usedJSHeapSize;
      const growthPercentage = (totalGrowth / initial.usedJSHeapSize) * 100;

      console.log('\nMemory Progression:');
      memorySnapshots.forEach((snapshot, index) => {
        const growth = snapshot.usedJSHeapSize - initial.usedJSHeapSize;
        const growthPct = ((growth / initial.usedJSHeapSize) * 100).toFixed(2);
        console.log(`  Cycle ${index}: ${snapshot.usedMB} MB (${growthPct > 0 ? '+' : ''}${growthPct}%)`);
      });

      console.log('\n📊 Summary:');
      console.log(`  Initial Heap: ${initial.usedMB} MB`);
      console.log(`  Final Heap: ${final.usedMB} MB`);
      console.log(`  Total Growth: ${(totalGrowth / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Growth Percentage: ${growthPercentage.toFixed(2)}%`);

      // Analyze trend
      if (memorySnapshots.length >= 4) {
        const midpoint = memorySnapshots[Math.floor(memorySnapshots.length / 2)];
        const recentGrowth = final.usedJSHeapSize - midpoint.usedJSHeapSize;
        const earlyGrowth = midpoint.usedJSHeapSize - initial.usedJSHeapSize;

        console.log('\n🔍 Leak Detection:');
        console.log(`  Early Growth (cycles 0-${Math.floor(memorySnapshots.length / 2)}): ${(earlyGrowth / 1024 / 1024).toFixed(2)} MB`);
        console.log(`  Recent Growth (cycles ${Math.floor(memorySnapshots.length / 2)}-${memorySnapshots.length - 1}): ${(recentGrowth / 1024 / 1024).toFixed(2)} MB`);

        if (Math.abs(recentGrowth) < earlyGrowth * 0.3) {
          console.log('  ✅ Memory appears to stabilize - likely NOT a leak');
          console.log('  📝 Initial growth is normal for JIT compilation and caching');
        } else if (recentGrowth > earlyGrowth * 0.8) {
          console.log('  ⚠️  Memory continues growing linearly - POSSIBLE LEAK');
          console.log('  📝 Check for event listeners, closures, or cached DOM references');
        } else {
          console.log('  ⚠️  Memory growth is slowing but still present');
          console.log('  📝 Monitor in production; may stabilize over time');
        }
      }

      // Performance memory API availability
      console.log('\n📌 Notes:');
      console.log('  • Memory measurements use performance.memory API');
      console.log('  • Garbage collection was forced between measurements');
      console.log('  • Initial growth includes JIT compilation overhead');
    }

    // Get detailed DOM node count
    const domStats = await page.evaluate(() => {
      const getAllNodes = (node) => {
        let count = 1;
        for (let child of node.childNodes) {
          count += getAllNodes(child);
        }
        return count;
      };

      return {
        totalNodes: getAllNodes(document.documentElement),
        scriptTags: document.querySelectorAll('script').length,
        styleTags: document.querySelectorAll('style, link[rel="stylesheet"]').length,
        eventListeners: window.getEventListeners ?
          Object.keys(window.getEventListeners(document)).length : 'N/A'
      };
    });

    console.log('\n🏗️  DOM Statistics:');
    console.log(`  Total DOM Nodes: ${domStats.totalNodes}`);
    console.log(`  Script Tags: ${domStats.scriptTags}`);
    console.log(`  Style Elements: ${domStats.styleTags}`);

  } catch (error) {
    console.error('\n❌ Error during analysis:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

deepMemoryAnalysis().catch(console.error);
