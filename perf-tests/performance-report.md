# Performance Metrics Report - Guitar Fretboard App

**Timestamp:** 2026-01-25T16:02:31.627Z
**URL:** http://localhost:3000
**Viewport:** 1440x900 (Desktop)

---

## Core Web Vitals

| Metric | Value | Assessment | Target |
|--------|-------|------------|--------|
| **First Contentful Paint (FCP)** | 3036.00ms | Poor | < 1.8s (Good) |
| **Largest Contentful Paint (LCP)** | N/A | Not Measured | < 2.5s (Good) |
| **Cumulative Layout Shift (CLS)** | N/A | Not Measured | < 0.1 (Good) |
| **Time to Interactive (TTI)** | 191ms | Excellent | < 3.8s (Good) |
| **Total Blocking Time** | N/A | Not Measured | < 200ms (Good) |

---

## Page Load Timings

| Metric | Value |
|--------|-------|
| **DOM Content Loaded** | 191ms |
| **Load Complete** | 453ms |
| **Response Start** | 102.3ms |
| **Response End** | 190.3ms |
| **DOM Interactive** | 190.6ms |
| **DOM Complete** | 453.1ms |

### Navigation Timing Breakdown
- **Server Response Time:** 102.3ms (responseStart)
- **HTML Download:** 88ms (responseEnd - responseStart)
- **DOM Processing:** 0.3ms (domInteractive - responseEnd)
- **Resource Loading:** 262.5ms (domComplete - domInteractive)

---

## Transfer Size Analysis

| Metric | Size |
|--------|------|
| **Total Transfer Size** | 12,237 bytes (~12 KB) |
| **Encoded Body Size** | 11,937 bytes (~11.7 KB) |
| **Decoded Body Size** | 114,280 bytes (~111.6 KB) |
| **Compression Ratio** | 9.58x (89.6% reduction) |

---

## Memory Baseline

| Metric | Value |
|--------|-------|
| **Used JS Heap Size** | 12.64 MB |
| **Total JS Heap Size** | 18.22 MB |
| **JS Heap Size Limit** | 4096.00 MB |
| **Heap Utilization** | 0.31% of limit |

---

## Network Summary

**Total Requests:** 26

### Requests by Type
| Resource Type | Count |
|--------------|-------|
| Document | 1 |
| Scripts | 21 |
| Stylesheets | 1 |
| Fonts | 2 |
| Other | 1 |

---

## Top 10 Largest Resources by Transfer Size

1. **next-devtools** (223.6 KB) - 153.6ms - Development tool
2. **react-dom** (178.6 KB) - 163.7ms - React DOM library
3. **client** (123.0 KB) - 174.2ms - Next.js client
4. **@swc helpers** (39.1 KB) - 126.6ms - SWC runtime helpers
5. **react-server-dom** (30.7 KB) - 60.4ms - React Server Components
6. **fonts (797e433ab948586e-s.p)** (30.8 KB) - 18.1ms - Web font
7. **compiled** (28.3 KB) - 116.6ms - Compiled Next.js code
8. **fonts (caa3a2e1cccd8315-s.p)** (28.0 KB) - 22.7ms - Web font
9. **239599ae** (22.7 KB) - 166.8ms - Next.js chunk
10. **turbopack** (18.6 KB) - 162.7ms - Turbopack runtime

---

## Performance Issues Identified

### Critical (Blocker)
1. **FCP is 3036ms** - First Contentful Paint is 69% slower than the recommended 1.8s threshold
   - This suggests significant rendering delays
   - Users won't see content for over 3 seconds

### High Priority
1. **LCP not captured** - Largest Contentful Paint metric failed to register
   - May indicate content is being rendered after initial measurement window
   - Could suggest lazy loading or client-side rendering issues

2. **CLS not measured** - Layout shift tracking returned no data
   - Unable to verify if layout is stable during load
   - May need longer observation period

3. **Large JavaScript bundle in development mode**
   - 21 script resources loaded (many are development-only)
   - Total decoded size of 111.6 KB compressed to 11.7 KB
   - Development tools (devtools, HMR) adding overhead

### Medium Priority
1. **Multiple font requests** - 2 font files loading separately
   - Consider font subsetting or using system fonts
   - Total font transfer: ~58.8 KB

2. **No long task tracking** - Total Blocking Time not measured
   - May indicate PerformanceObserver for longtask not enabled
   - Unable to verify main thread responsiveness

---

## Recommendations

### Immediate Actions
1. **Investigate FCP delay** - 3s is too slow
   - Check for render-blocking resources
   - Verify critical CSS is inlined
   - Consider server-side rendering optimizations

2. **Enable LCP tracking** - Use PerformanceObserver
   ```javascript
   new PerformanceObserver((list) => {
     const entries = list.getEntries();
     const lastEntry = entries[entries.length - 1];
     console.log('LCP:', lastEntry.startTime);
   }).observe({type: 'largest-contentful-paint', buffered: true});
   ```

3. **Production build testing** - Current metrics are from development mode
   - Development builds include HMR, devtools, and unoptimized code
   - Test production build for accurate performance baseline

### Follow-up Actions
1. **Optimize font loading** - Use `font-display: swap` and preload
2. **Code splitting review** - 21 script chunks may be excessive
3. **Enable CLS and TBT tracking** - Add proper PerformanceObserver setup
4. **Lighthouse audit** - Run full Lighthouse report for comprehensive analysis

---

## Screenshot

![Initial Page Load](initial-page-load.png)

*Screenshot captured at 2000ms after page load completion*
