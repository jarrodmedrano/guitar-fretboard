import { chromium } from 'playwright';

async function captureEnhancedPerformanceMetrics() {
  const browser = await chromium.launch({
    headless: false,
    args: ['--enable-precise-memory-info']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // Inject performance observers before navigation
  await page.addInitScript(() => {
    window.__perfMetrics = {
      lcp: null,
      fcp: null,
      cls: 0,
      longTasks: [],
      layoutShifts: []
    };

    // LCP Observer
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        window.__perfMetrics.lcp = lastEntry.startTime;
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.log('LCP observer failed:', e);
    }

    // FCP Observer
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            window.__perfMetrics.fcp = entry.startTime;
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.log('FCP observer failed:', e);
    }

    // CLS Observer
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            window.__perfMetrics.cls += entry.value;
            window.__perfMetrics.layoutShifts.push({
              value: entry.value,
              time: entry.startTime,
              hadRecentInput: entry.hadRecentInput
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.log('CLS observer failed:', e);
    }

    // Long Tasks Observer (for TBT calculation)
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perfMetrics.longTasks.push({
            duration: entry.duration,
            startTime: entry.startTime
          });
        }
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.log('Long task observer failed:', e);
    }
  });

  // Track console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      timestamp: Date.now()
    });
  });

  // Track network requests
  const networkRequests = [];
  const startTime = Date.now();

  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
      timestamp: Date.now() - startTime
    });
  });

  page.on('response', async response => {
    const request = networkRequests.find(r => r.url === response.url());
    if (request) {
      request.status = response.status();
      request.responseTime = Date.now() - startTime;
      request.duration = request.responseTime - request.timestamp;
    }
  });

  // Navigate to page
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Wait for metrics to stabilize
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({
    path: 'performance-screenshot.png',
    fullPage: true
  });

  // Get all performance metrics
  const metrics = await page.evaluate(() => {
    const perf = window.performance;
    const timing = perf.timing;
    const navigation = perf.getEntriesByType('navigation')[0];

    // Get custom metrics from observers
    const customMetrics = window.__perfMetrics || {};

    // Calculate Total Blocking Time
    const tbt = customMetrics.longTasks.reduce((total, task) => {
      // Tasks over 50ms contribute to TBT
      const blockingTime = Math.max(0, task.duration - 50);
      return total + blockingTime;
    }, 0);

    // Get all resource timings
    const resources = perf.getEntriesByType('resource').map(r => ({
      name: r.name.replace('http://localhost:3000', ''),
      type: r.initiatorType,
      duration: Math.round(r.duration * 100) / 100,
      transferSize: r.transferSize,
      encodedBodySize: r.encodedBodySize,
      decodedBodySize: r.decodedBodySize,
      startTime: Math.round(r.startTime * 100) / 100
    }));

    // Sort resources by start time to show waterfall
    resources.sort((a, b) => a.startTime - b.startTime);

    return {
      customMetrics: {
        lcp: customMetrics.lcp,
        fcp: customMetrics.fcp,
        cls: customMetrics.cls,
        tbt: tbt,
        layoutShifts: customMetrics.layoutShifts,
        longTaskCount: customMetrics.longTasks.length
      },
      navigation: navigation ? {
        domComplete: navigation.domComplete,
        domContentLoadedEventEnd: navigation.domContentLoadedEventEnd,
        domInteractive: navigation.domInteractive,
        loadEventEnd: navigation.loadEventEnd,
        responseEnd: navigation.responseEnd,
        responseStart: navigation.responseStart,
        transferSize: navigation.transferSize,
        encodedBodySize: navigation.encodedBodySize,
        decodedBodySize: navigation.decodedBodySize,
        duration: navigation.duration
      } : null,
      memory: perf.memory ? {
        usedJSHeapSize: perf.memory.usedJSHeapSize,
        totalJSHeapSize: perf.memory.totalJSHeapSize,
        jsHeapSizeLimit: perf.memory.jsHeapSizeLimit
      } : null,
      resources: resources
    };
  });

  // Get Playwright-specific metrics
  const playwrightMetrics = await page.evaluate(() => ({
    userAgent: navigator.userAgent,
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt
    } : null
  }));

  // Compile final report
  const report = {
    timestamp: new Date().toISOString(),
    url: 'http://localhost:3000',
    viewport: { width: 1440, height: 900 },

    coreWebVitals: {
      fcp: metrics.customMetrics.fcp,
      lcp: metrics.customMetrics.lcp,
      cls: metrics.customMetrics.cls,
      tbt: metrics.customMetrics.tbt,
      tti: metrics.navigation?.domInteractive || null
    },

    loadTimings: {
      domInteractive: metrics.navigation?.domInteractive,
      domContentLoaded: metrics.navigation?.domContentLoadedEventEnd,
      domComplete: metrics.navigation?.domComplete,
      loadComplete: metrics.navigation?.loadEventEnd,
      totalDuration: metrics.navigation?.duration,
      responseStart: metrics.navigation?.responseStart,
      responseEnd: metrics.navigation?.responseEnd
    },

    transferSizes: {
      total: metrics.navigation?.transferSize,
      encoded: metrics.navigation?.encodedBodySize,
      decoded: metrics.navigation?.decodedBodySize,
      compressionRatio: metrics.navigation ?
        (metrics.navigation.decodedBodySize / metrics.navigation.encodedBodySize).toFixed(2) : null
    },

    memory: metrics.memory ? {
      usedJSHeapSize: metrics.memory.usedJSHeapSize,
      totalJSHeapSize: metrics.memory.totalJSHeapSize,
      jsHeapSizeLimit: metrics.memory.jsHeapSizeLimit,
      heapUtilization: ((metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit) * 100).toFixed(2) + '%'
    } : null,

    network: {
      totalRequests: networkRequests.length,
      requestsByType: networkRequests.reduce((acc, req) => {
        acc[req.resourceType] = (acc[req.resourceType] || 0) + 1;
        return acc;
      }, {}),
      waterfallData: networkRequests.map(r => ({
        url: r.url.replace('http://localhost:3000', ''),
        type: r.resourceType,
        start: r.timestamp,
        end: r.responseTime || r.timestamp,
        duration: r.duration || 0,
        status: r.status
      }))
    },

    resourceTimings: metrics.resources,

    layoutStability: {
      cls: metrics.customMetrics.cls,
      layoutShiftCount: metrics.customMetrics.layoutShifts?.length || 0,
      shifts: metrics.customMetrics.layoutShifts
    },

    device: playwrightMetrics,

    console: consoleMessages.filter(m => m.type === 'error' || m.type === 'warning')
  };

  console.log('\n========================================');
  console.log('ENHANCED PERFORMANCE METRICS REPORT');
  console.log('========================================\n');
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
  return report;
}

captureEnhancedPerformanceMetrics().catch(console.error);
