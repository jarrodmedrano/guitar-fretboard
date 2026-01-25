import { chromium } from 'playwright';

async function capturePerformanceMetrics() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Track network requests
  const networkRequests = [];
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: Date.now()
    });
  });

  page.on('response', async response => {
    const request = networkRequests.find(r => r.url === response.url());
    if (request) {
      request.status = response.status();
      request.headers = response.headers();
    }
  });

  // Start navigation
  const navigationStart = Date.now();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait a bit for all metrics to be available
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'initial-page-load.png', fullPage: true });

  // Capture performance metrics
  const performanceMetrics = await page.evaluate(() => {
    const perfData = window.performance;
    const timing = perfData.timing;
    const navigation = perfData.getEntriesByType('navigation')[0];

    // Get paint metrics
    const fcp = perfData.getEntriesByName('first-contentful-paint')[0]?.startTime || null;
    const lcpEntries = perfData.getEntriesByType('largest-contentful-paint');
    const lcp = lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : null;

    // Calculate CLS
    const cls = perfData.getEntriesByType('layout-shift')
      .reduce((sum, entry) => {
        if (!entry.hadRecentInput) {
          return sum + entry.value;
        }
        return sum;
      }, 0);

    // Get long tasks
    const longTasks = perfData.getEntriesByType('longtask') || [];
    const totalBlocking = longTasks.reduce((sum, entry) => sum + Math.max(0, entry.duration - 50), 0);

    // Calculate key timings
    const tti = timing.domInteractive - timing.navigationStart;
    const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
    const loadComplete = timing.loadEventEnd - timing.navigationStart;

    // Get resource timings
    const resources = perfData.getEntriesByType('resource').map(r => ({
      name: r.name,
      type: r.initiatorType,
      duration: r.duration,
      transferSize: r.transferSize,
      startTime: r.startTime
    }));

    return {
      fcp,
      lcp,
      cls,
      tti,
      totalBlocking,
      domContentLoaded,
      loadComplete,
      navigation: navigation ? {
        domComplete: navigation.domComplete,
        domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
        domInteractive: navigation.domInteractive,
        loadEventEnd: navigation.loadEventEnd,
        responseEnd: navigation.responseEnd,
        responseStart: navigation.responseStart,
        transferSize: navigation.transferSize,
        encodedBodySize: navigation.encodedBodySize,
        decodedBodySize: navigation.decodedBodySize
      } : null,
      resources: resources.slice(0, 20) // First 20 resources
    };
  });

  // Get memory metrics
  const memoryMetrics = await page.evaluate(() => {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  });

  // Get Playwright's performance metrics
  const cdpMetrics = await page.evaluate(() => {
    return window.performance.getEntriesByType('navigation')[0]?.toJSON() || {};
  });

  // Compile results
  const results = {
    timestamp: new Date().toISOString(),
    viewport: { width: 1440, height: 900 },
    url: 'http://localhost:3000',

    coreWebVitals: {
      fcp: performanceMetrics.fcp ? `${performanceMetrics.fcp.toFixed(2)}ms` : 'N/A',
      lcp: performanceMetrics.lcp ? `${performanceMetrics.lcp.toFixed(2)}ms` : 'N/A',
      cls: performanceMetrics.cls ? performanceMetrics.cls.toFixed(4) : 'N/A',
      tti: performanceMetrics.tti ? `${performanceMetrics.tti}ms` : 'N/A',
      totalBlockingTime: performanceMetrics.totalBlocking ? `${performanceMetrics.totalBlocking.toFixed(2)}ms` : 'N/A'
    },

    timings: {
      domContentLoaded: `${performanceMetrics.domContentLoaded}ms`,
      loadComplete: `${performanceMetrics.loadComplete}ms`,
      navigation: performanceMetrics.navigation
    },

    memory: memoryMetrics ? {
      usedJSHeapSize: `${(memoryMetrics.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      totalJSHeapSize: `${(memoryMetrics.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      jsHeapSizeLimit: `${(memoryMetrics.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
    } : 'Memory metrics not available',

    networkSummary: {
      totalRequests: networkRequests.length,
      requestsByType: networkRequests.reduce((acc, req) => {
        acc[req.resourceType] = (acc[req.resourceType] || 0) + 1;
        return acc;
      }, {})
    },

    topResources: performanceMetrics.resources
  };

  console.log('\n=== PERFORMANCE METRICS ===\n');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();

  return results;
}

capturePerformanceMetrics().catch(console.error);
