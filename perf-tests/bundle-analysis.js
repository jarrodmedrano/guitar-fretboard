const { chromium } = require('playwright');

async function analyzeBundleAndPerformance() {
  console.log('📦 Bundle Size & Loading Performance Analysis');
  console.log('=' .repeat(80));

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Track all network requests
  const resources = [];
  page.on('response', async (response) => {
    const url = response.url();
    const request = response.request();

    try {
      const headers = await response.allHeaders();
      resources.push({
        url: url.split('/').pop() || url,
        type: request.resourceType(),
        status: response.status(),
        size: parseInt(headers['content-length'] || '0', 10),
        cached: response.fromCache(),
        timing: response.timing()
      });
    } catch (e) {
      // Ignore errors for resources we can't inspect
    }
  });

  try {
    const navStart = Date.now();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const navEnd = Date.now();

    console.log(`\n⏱️  Total Navigation Time: ${navEnd - navStart}ms`);

    // Wait for app to be ready
    await page.waitForSelector('select[id="scale-select"]', { timeout: 5000 });

    // Get detailed performance metrics
    const perfMetrics = await page.evaluate(() => {
      const perf = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');

      return {
        navigation: perf ? {
          domainLookup: perf.domainLookupEnd - perf.domainLookupStart,
          tcpConnection: perf.connectEnd - perf.connectStart,
          request: perf.responseStart - perf.requestStart,
          response: perf.responseEnd - perf.responseStart,
          domProcessing: perf.domComplete - perf.domContentLoadedEventStart,
          domReady: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
          loadComplete: perf.loadEventEnd - perf.loadEventStart,
          totalTime: perf.loadEventEnd - perf.fetchStart
        } : null,
        paint: paint.map(p => ({ name: p.name, time: p.startTime }))
      };
    });

    console.log('\n📊 Navigation Timing Breakdown:');
    if (perfMetrics.navigation) {
      Object.entries(perfMetrics.navigation).forEach(([key, value]) => {
        console.log(`  ${key}: ${value?.toFixed(2) || 'N/A'} ms`);
      });
    }

    console.log('\n🎨 Paint Timing:');
    perfMetrics.paint.forEach(p => {
      console.log(`  ${p.name}: ${p.time.toFixed(2)} ms`);
    });

    // Analyze resources
    const jsResources = resources.filter(r => r.type === 'script' || r.url.endsWith('.js'));
    const cssResources = resources.filter(r => r.type === 'stylesheet' || r.url.endsWith('.css'));
    const imageResources = resources.filter(r => r.type === 'image');
    const fontResources = resources.filter(r => r.type === 'font');

    const totalSize = resources.reduce((sum, r) => sum + r.size, 0);
    const jsSize = jsResources.reduce((sum, r) => sum + r.size, 0);
    const cssSize = cssResources.reduce((sum, r) => sum + r.size, 0);
    const imageSize = imageResources.reduce((sum, r) => sum + r.size, 0);

    console.log('\n📦 Resource Breakdown:');
    console.log(`  JavaScript: ${jsResources.length} files, ${(jsSize / 1024).toFixed(2)} KB`);
    console.log(`  CSS: ${cssResources.length} files, ${(cssSize / 1024).toFixed(2)} KB`);
    console.log(`  Images: ${imageResources.length} files, ${(imageSize / 1024).toFixed(2)} KB`);
    console.log(`  Fonts: ${fontResources.length} files`);
    console.log(`  Total: ${resources.length} requests, ${(totalSize / 1024).toFixed(2)} KB`);

    console.log('\n📄 JavaScript Files:');
    jsResources
      .sort((a, b) => b.size - a.size)
      .forEach(r => {
        console.log(`  ${r.url}: ${(r.size / 1024).toFixed(2)} KB ${r.cached ? '(cached)' : ''}`);
      });

    if (cssResources.length > 0) {
      console.log('\n🎨 CSS Files:');
      cssResources.forEach(r => {
        console.log(`  ${r.url}: ${(r.size / 1024).toFixed(2)} KB ${r.cached ? '(cached)' : ''}`);
      });
    }

    // React DevTools check
    const hasReactDevTools = await page.evaluate(() => {
      return !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
    });

    console.log('\n🔧 Production Build Checks:');
    console.log(`  React DevTools Hook Present: ${hasReactDevTools ? 'Yes (dev mode)' : 'No (production)'}`);

    // Check for React production build
    const reactVersion = await page.evaluate(() => {
      try {
        // Try to find React on the window object
        if (window.React) {
          return {
            version: window.React.version,
            mode: window.React.version ? 'found' : 'not found'
          };
        }
        return null;
      } catch (e) {
        return null;
      }
    });

    if (reactVersion) {
      console.log(`  React Version: ${reactVersion.version || 'unknown'}`);
    }

    // Get webpack/vite build info from HTML comments or script tags
    const buildInfo = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]'));
      const hasHash = scripts.some(s => /\.[a-f0-9]{8,}\.(js|css)/.test(s.src));
      const hasMinified = scripts.some(s => s.src.includes('.min.js'));

      return {
        hasContentHash: hasHash,
        hasMinified: hasMinified,
        scriptCount: scripts.length
      };
    });

    console.log(`  Content Hash in Filenames: ${buildInfo.hasContentHash ? 'Yes' : 'No'}`);
    console.log(`  Minified JS: ${buildInfo.hasMinified ? 'Yes' : 'No'}`);

    // Lighthouse-style score
    console.log('\n📈 Performance Score Estimates:');
    const loadTime = navEnd - navStart;
    const fcp = perfMetrics.paint.find(p => p.name === 'first-contentful-paint')?.time || 0;

    const scoreLoad = loadTime < 1000 ? 100 : loadTime < 2000 ? 75 : loadTime < 3000 ? 50 : 25;
    const scoreFCP = fcp < 1000 ? 100 : fcp < 2000 ? 75 : fcp < 3000 ? 50 : 25;
    const scoreSize = totalSize < 200000 ? 100 : totalSize < 500000 ? 75 : totalSize < 1000000 ? 50 : 25;

    console.log(`  Load Time Score: ${scoreLoad}/100 (${loadTime}ms)`);
    console.log(`  FCP Score: ${scoreFCP}/100 (${fcp.toFixed(0)}ms)`);
    console.log(`  Bundle Size Score: ${scoreSize}/100 (${(totalSize / 1024).toFixed(0)} KB)`);
    console.log(`  Overall: ${Math.round((scoreLoad + scoreFCP + scoreSize) / 3)}/100`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeBundleAndPerformance().catch(console.error);
