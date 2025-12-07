#!/usr/bin/env node

import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { writeFileSync } from 'fs';

async function runLighthouse() {
    const chrome = await launch({chromeFlags: ['--headless']});
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
    };

    const runnerResult = await lighthouse('http://localhost:3000', options);
    const reportHtml = runnerResult.report;
    writeFileSync('lighthouse-report.html', reportHtml);

    const score = runnerResult.lhr.categories.performance.score * 100;
    console.log(`Performance Score: ${score}`);

    await chrome.kill();
}

if (require.main === module) {
    runLighthouse().catch(console.error);
}