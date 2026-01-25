const { chromium } = require('playwright');

async function runPerformanceTests() {
  console.log('🚀 Starting Production Build Performance Analysis\n');
  console.log('=' .repeat(80));

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Track network requests
  let networkRequests = [];
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  // Track console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });

  try {
    // ========================================================================
    // PHASE 1: INITIAL LOAD & CORE WEB VITALS
    // ========================================================================
    console.log('\n📊 PHASE 1: Core Web Vitals');
    console.log('-'.repeat(80));

    const startTime = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`⏱️  Page Load Time: ${loadTime}ms`);

    // Wait for the app to be interactive
    await page.waitForSelector('select', { timeout: 5000, state: 'attached' });

    // Capture Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {
          LCP: null,
          FID: null,
          CLS: null,
          FCP: null,
          TTFB: null
        };

        // Get navigation timing
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          vitals.TTFB = navTiming.responseStart - navTiming.requestStart;
        }

        // Get paint timing
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          vitals.FCP = fcpEntry.startTime;
        }

        // LCP using PerformanceObserver
        try {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            vitals.LCP = lastEntry.renderTime || lastEntry.loadTime;
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP not available
        }

        // CLS using PerformanceObserver
        try {
          let clsValue = 0;
          new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            }
            vitals.CLS = clsValue;
          }).observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // CLS not available
        }

        // Give observers time to collect data
        setTimeout(() => resolve(vitals), 1000);
      });
    });

    console.log('\n📈 Core Web Vitals:');
    console.log(`   TTFB (Time to First Byte): ${webVitals.TTFB?.toFixed(2) || 'N/A'} ms`);
    console.log(`   FCP (First Contentful Paint): ${webVitals.FCP?.toFixed(2) || 'N/A'} ms`);
    console.log(`   LCP (Largest Contentful Paint): ${webVitals.LCP?.toFixed(2) || 'N/A'} ms`);
    console.log(`   CLS (Cumulative Layout Shift): ${webVitals.CLS?.toFixed(4) || 'N/A'}`);

    // ========================================================================
    // PHASE 2: MEMORY LEAK TESTING
    // ========================================================================
    console.log('\n\n🧠 PHASE 2: Memory Leak Analysis');
    console.log('-'.repeat(80));

    // Initial heap size
    const initialHeap = await page.evaluate(() => {
      if (performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        };
      }
      return null;
    });

    if (initialHeap) {
      console.log('📊 Initial Memory State:');
      console.log(`   Used JS Heap: ${(initialHeap.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total JS Heap: ${(initialHeap.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Heap Limit: ${(initialHeap.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    } else {
      console.log('⚠️  Memory API not available in this browser');
    }

    // Perform interactions
    console.log('\n🎸 Performing interactions...');

    // Find controls - root notes are buttons, scales are select
    const scaleSelector = await page.locator('select[id="scale-select"]');

    // Interaction sequence
    console.log('   1. Changing root note to D...');
    await page.click('button[aria-label="Select root note: D"]');
    await page.waitForTimeout(500);

    console.log('   2. Changing scale to Minor...');
    await scaleSelector.selectOption('minor');
    await page.waitForTimeout(500);

    console.log('   3. Changing root note to G...');
    await page.click('button[aria-label="Select root note: G"]');
    await page.waitForTimeout(500);

    console.log('   4. Changing scale to Pentatonic...');
    await scaleSelector.selectOption('minorPentatonic');
    await page.waitForTimeout(500);

    console.log('   5. Returning to initial state (C Major)...');
    await page.click('button[aria-label="Select root note: C"]');
    await scaleSelector.selectOption('major');
    await page.waitForTimeout(1000);

    // Force garbage collection if available
    await page.evaluate(() => {
      if (window.gc) {
        window.gc();
      }
    });
    await page.waitForTimeout(1000);

    // Final heap size
    const finalHeap = await page.evaluate(() => {
      if (performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        };
      }
      return null;
    });

    if (finalHeap && initialHeap) {
      const heapGrowth = finalHeap.usedJSHeapSize - initialHeap.usedJSHeapSize;
      const growthPercentage = (heapGrowth / initialHeap.usedJSHeapSize) * 100;

      console.log('\n📊 Final Memory State:');
      console.log(`   Used JS Heap: ${(finalHeap.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total JS Heap: ${(finalHeap.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);

      console.log('\n📈 Memory Growth Analysis:');
      console.log(`   Heap Growth: ${(heapGrowth / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Growth Percentage: ${growthPercentage.toFixed(2)}%`);

      if (growthPercentage < 5) {
        console.log('   ✅ PASS: Memory growth is minimal (< 5%)');
      } else if (growthPercentage < 10) {
        console.log('   ⚠️  WARNING: Memory growth is moderate (5-10%)');
      } else {
        console.log('   ❌ FAIL: Memory growth is significant (> 10%) - possible memory leak');
      }
    }

    // ========================================================================
    // PHASE 3: RE-RENDER PERFORMANCE
    // ========================================================================
    console.log('\n\n⚡ PHASE 3: Re-render Performance Analysis');
    console.log('-'.repeat(80));

    // Clear network requests
    networkRequests = [];

    // Test root note change
    console.log('\n🎵 Test 1: Root Note Change');
    const beforeRootChange = networkRequests.length;
    const rootNoteChangeStart = Date.now();
    await page.click('button[aria-label="Select root note: E"]');
    await page.waitForTimeout(100);
    const rootNoteChangeTime = Date.now() - rootNoteChangeStart;
    const afterRootChange = networkRequests.length;

    console.log(`   ⏱️  Update Time: ${rootNoteChangeTime}ms`);
    console.log(`   📡 Network Requests: ${afterRootChange - beforeRootChange}`);

    await page.waitForTimeout(500);

    // Test scale change
    console.log('\n🎼 Test 2: Scale Change');
    const beforeScaleChange = networkRequests.length;
    const scaleChangeStart = Date.now();
    const scaleSelect = await page.locator('select[id="scale-select"]');
    await scaleSelect.selectOption('dorian');
    await page.waitForTimeout(100);
    const scaleChangeTime = Date.now() - scaleChangeStart;
    const afterScaleChange = networkRequests.length;

    console.log(`   ⏱️  Update Time: ${scaleChangeTime}ms`);
    console.log(`   📡 Network Requests: ${afterScaleChange - beforeScaleChange}`);

    // Check for React DevTools or performance marks
    const performanceMarks = await page.evaluate(() => {
      const marks = performance.getEntriesByType('mark');
      const measures = performance.getEntriesByType('measure');
      return {
        marks: marks.map(m => ({ name: m.name, startTime: m.startTime })),
        measures: measures.map(m => ({ name: m.name, duration: m.duration }))
      };
    });

    if (performanceMarks.marks.length > 0) {
      console.log('\n📊 Performance Marks Found:');
      performanceMarks.marks.slice(-5).forEach(mark => {
        console.log(`   - ${mark.name}: ${mark.startTime.toFixed(2)}ms`);
      });
    }

    // ========================================================================
    // PHASE 4: SCREENSHOTS
    // ========================================================================
    console.log('\n\n📸 PHASE 4: Capturing Screenshots');
    console.log('-'.repeat(80));

    // Desktop screenshot
    console.log('   📷 Capturing desktop view (1440x900)...');
    await page.screenshot({
      path: '/Users/jarrodmedrano/work/new-proj/guitar-fretboard-app/production-desktop.png',
      fullPage: false
    });

    // Tablet screenshot
    console.log('   📷 Capturing tablet view (768x1024)...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/Users/jarrodmedrano/work/new-proj/guitar-fretboard-app/production-tablet.png',
      fullPage: false
    });

    // Mobile screenshot
    console.log('   📷 Capturing mobile view (375x667)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: '/Users/jarrodmedrano/work/new-proj/guitar-fretboard-app/production-mobile.png',
      fullPage: false
    });

    // ========================================================================
    // PHASE 5: NETWORK & CONSOLE ANALYSIS
    // ========================================================================
    console.log('\n\n🌐 PHASE 5: Network & Console Analysis');
    console.log('-'.repeat(80));

    const requestsByType = networkRequests.reduce((acc, req) => {
      acc[req.resourceType] = (acc[req.resourceType] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📡 Total Network Requests:', networkRequests.length);
    console.log('   Breakdown by type:');
    Object.entries(requestsByType).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count}`);
    });

    const errors = consoleMessages.filter(m => m.type === 'error');
    const warnings = consoleMessages.filter(m => m.type === 'warning');

    console.log('\n🖥️  Console Messages:');
    console.log(`   Errors: ${errors.length}`);
    console.log(`   Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n❌ Console Errors:');
      errors.forEach(err => console.log(`   - ${err.text}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  Console Warnings:');
      warnings.slice(0, 5).forEach(warn => console.log(`   - ${warn.text}`));
    }

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n\n' + '='.repeat(80));
    console.log('✅ PRODUCTION BUILD ANALYSIS COMPLETE');
    console.log('='.repeat(80));

    console.log('\n📋 Key Metrics Summary:');
    console.log(`   • Page Load Time: ${loadTime}ms`);
    console.log(`   • FCP: ${webVitals.FCP?.toFixed(2) || 'N/A'} ms`);
    console.log(`   • LCP: ${webVitals.LCP?.toFixed(2) || 'N/A'} ms`);
    if (initialHeap && finalHeap) {
      const heapGrowth = ((finalHeap.usedJSHeapSize - initialHeap.usedJSHeapSize) / initialHeap.usedJSHeapSize) * 100;
      console.log(`   • Memory Growth: ${heapGrowth.toFixed(2)}%`);
    }
    console.log(`   • Root Note Update: ${rootNoteChangeTime}ms`);
    console.log(`   • Scale Update: ${scaleChangeTime}ms`);
    console.log(`   • Console Errors: ${errors.length}`);
    console.log(`   • Console Warnings: ${warnings.length}`);

    console.log('\n📸 Screenshots saved:');
    console.log('   • production-desktop.png');
    console.log('   • production-tablet.png');
    console.log('   • production-mobile.png');

  } catch (error) {
    console.error('\n❌ Error during testing:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
}

runPerformanceTests().catch(console.error);
