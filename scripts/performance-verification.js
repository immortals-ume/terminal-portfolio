#!/usr/bin/env node

/**
 * Performance Verification Script
 * 
 * This script performs comprehensive performance verification:
 * 1. Builds the Next.js application
 * 2. Analyzes bundle sizes (JS and CSS)
 * 3. Compares with baseline if available
 * 4. Generates a performance report
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  }
  
  return totalSize;
}

function analyzeBundle() {
  const buildDir = path.join(process.cwd(), '.next');
  
  if (!fs.existsSync(buildDir)) {
    log('❌ Build directory not found. Please run build first.', colors.red);
    return null;
  }

  const staticDir = path.join(buildDir, 'static');
  const chunksDir = path.join(staticDir, 'chunks');
  const cssDir = path.join(staticDir, 'css');
  
  // Get JavaScript bundle size
  const jsSize = getDirectorySize(chunksDir);
  
  // Get CSS bundle size
  const cssSize = getDirectorySize(cssDir);
  
  // Get total static size
  const totalStaticSize = getDirectorySize(staticDir);
  
  // Get individual chunk sizes
  const chunks = [];
  if (fs.existsSync(chunksDir)) {
    const files = fs.readdirSync(chunksDir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const filePath = path.join(chunksDir, file);
        const stats = fs.statSync(filePath);
        chunks.push({
          name: file,
          size: stats.size,
        });
      }
    }
  }
  
  // Sort chunks by size (largest first)
  chunks.sort((a, b) => b.size - a.size);
  
  return {
    jsSize,
    cssSize,
    totalStaticSize,
    chunks: chunks.slice(0, 10), // Top 10 largest chunks
  };
}

function saveBaseline(data) {
  const baselinePath = path.join(process.cwd(), '.kiro/specs/tailwind-refactor/performance-baseline.json');
  fs.writeFileSync(baselinePath, JSON.stringify(data, null, 2));
  log(`✅ Baseline saved to ${baselinePath}`, colors.green);
}

function loadBaseline() {
  const baselinePath = path.join(process.cwd(), '.kiro/specs/tailwind-refactor/performance-baseline.json');
  
  if (!fs.existsSync(baselinePath)) {
    return null;
  }
  
  try {
    const data = fs.readFileSync(baselinePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    log(`⚠️  Failed to load baseline: ${error.message}`, colors.yellow);
    return null;
  }
}

function compareWithBaseline(current, baseline) {
  if (!baseline) {
    log('\n📊 No baseline found. This will be the baseline.', colors.yellow);
    return null;
  }
  
  const jsDiff = current.jsSize - baseline.jsSize;
  const cssDiff = current.cssSize - baseline.cssSize;
  const totalDiff = current.totalStaticSize - baseline.totalStaticSize;
  
  const jsPercent = baseline.jsSize > 0 ? ((jsDiff / baseline.jsSize) * 100).toFixed(2) : 0;
  const cssPercent = baseline.cssSize > 0 ? ((cssDiff / baseline.cssSize) * 100).toFixed(2) : 0;
  const totalPercent = baseline.totalStaticSize > 0 ? ((totalDiff / baseline.totalStaticSize) * 100).toFixed(2) : 0;
  
  return {
    jsDiff,
    cssDiff,
    totalDiff,
    jsPercent,
    cssPercent,
    totalPercent,
  };
}

function generateReport(current, comparison) {
  log('\n' + '='.repeat(60), colors.bright);
  log('📦 BUNDLE SIZE ANALYSIS', colors.bright + colors.cyan);
  log('='.repeat(60), colors.bright);
  
  log('\n📊 Current Bundle Sizes:', colors.blue);
  log(`  JavaScript: ${formatBytes(current.jsSize)}`, colors.cyan);
  log(`  CSS:        ${formatBytes(current.cssSize)}`, colors.cyan);
  log(`  Total:      ${formatBytes(current.totalStaticSize)}`, colors.cyan);
  
  if (comparison) {
    log('\n📈 Comparison with Baseline:', colors.blue);
    
    // JavaScript comparison
    const jsColor = comparison.jsDiff < 0 ? colors.green : comparison.jsDiff > 0 ? colors.red : colors.yellow;
    const jsSign = comparison.jsDiff > 0 ? '+' : '';
    log(`  JavaScript: ${jsSign}${formatBytes(comparison.jsDiff)} (${jsSign}${comparison.jsPercent}%)`, jsColor);
    
    // CSS comparison
    const cssColor = comparison.cssDiff < 0 ? colors.green : comparison.cssDiff > 0 ? colors.red : colors.yellow;
    const cssSign = comparison.cssDiff > 0 ? '+' : '';
    log(`  CSS:        ${cssSign}${formatBytes(comparison.cssDiff)} (${cssSign}${comparison.cssPercent}%)`, cssColor);
    
    // Total comparison
    const totalColor = comparison.totalDiff < 0 ? colors.green : comparison.totalDiff > 0 ? colors.red : colors.yellow;
    const totalSign = comparison.totalDiff > 0 ? '+' : '';
    log(`  Total:      ${totalSign}${formatBytes(comparison.totalDiff)} (${totalSign}${comparison.totalPercent}%)`, totalColor);
    
    // Summary
    log('\n📝 Summary:', colors.blue);
    if (comparison.jsDiff < 0) {
      log(`  ✅ JavaScript bundle reduced by ${formatBytes(Math.abs(comparison.jsDiff))}`, colors.green);
    } else if (comparison.jsDiff > 0) {
      log(`  ⚠️  JavaScript bundle increased by ${formatBytes(comparison.jsDiff)}`, colors.yellow);
    } else {
      log(`  ℹ️  JavaScript bundle size unchanged`, colors.cyan);
    }
    
    if (comparison.cssDiff < 0) {
      log(`  ✅ CSS bundle reduced by ${formatBytes(Math.abs(comparison.cssDiff))}`, colors.green);
    } else if (comparison.cssDiff > 0) {
      log(`  ⚠️  CSS bundle increased by ${formatBytes(comparison.cssDiff)}`, colors.yellow);
    } else {
      log(`  ℹ️  CSS bundle size unchanged`, colors.cyan);
    }
  }
  
  log('\n📦 Top 10 Largest JavaScript Chunks:', colors.blue);
  current.chunks.forEach((chunk, index) => {
    log(`  ${index + 1}. ${chunk.name}: ${formatBytes(chunk.size)}`, colors.cyan);
  });
  
  log('\n' + '='.repeat(60), colors.bright);
}

function saveReport(current, comparison) {
  const reportPath = path.join(process.cwd(), '.kiro/specs/tailwind-refactor/performance-report.md');
  
  let report = '# Performance Verification Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;
  
  report += '## Current Bundle Sizes\n\n';
  report += `- **JavaScript**: ${formatBytes(current.jsSize)}\n`;
  report += `- **CSS**: ${formatBytes(current.cssSize)}\n`;
  report += `- **Total Static**: ${formatBytes(current.totalStaticSize)}\n\n`;
  
  if (comparison) {
    report += '## Comparison with Baseline\n\n';
    report += '| Metric | Change | Percentage |\n';
    report += '|--------|--------|------------|\n';
    
    const jsSign = comparison.jsDiff > 0 ? '+' : '';
    const cssSign = comparison.cssDiff > 0 ? '+' : '';
    const totalSign = comparison.totalDiff > 0 ? '+' : '';
    
    report += `| JavaScript | ${jsSign}${formatBytes(comparison.jsDiff)} | ${jsSign}${comparison.jsPercent}% |\n`;
    report += `| CSS | ${cssSign}${formatBytes(comparison.cssDiff)} | ${cssSign}${comparison.cssPercent}% |\n`;
    report += `| Total | ${totalSign}${formatBytes(comparison.totalDiff)} | ${totalSign}${comparison.totalPercent}% |\n\n`;
    
    report += '## Analysis\n\n';
    
    if (comparison.jsDiff < 0) {
      report += `✅ **JavaScript bundle reduced** by ${formatBytes(Math.abs(comparison.jsDiff))} (${Math.abs(comparison.jsPercent)}%)\n\n`;
      report += 'This reduction indicates successful removal of inline style objects and constants, which were previously included in the JavaScript bundle.\n\n';
    } else if (comparison.jsDiff > 0) {
      report += `⚠️ **JavaScript bundle increased** by ${formatBytes(comparison.jsDiff)} (${comparison.jsPercent}%)\n\n`;
      report += 'This increase may be due to additional dependencies or code changes. Review the changes to ensure they are necessary.\n\n';
    }
    
    if (comparison.cssDiff > 0) {
      report += `ℹ️ **CSS bundle increased** by ${formatBytes(comparison.cssDiff)} (${comparison.cssPercent}%)\n\n`;
      report += 'This is expected when moving from inline styles to Tailwind classes. The net effect should still be positive when considering the JavaScript reduction.\n\n';
    }
    
    const netChange = comparison.totalDiff;
    if (netChange < 0) {
      report += `✅ **Net bundle size reduced** by ${formatBytes(Math.abs(netChange))} (${Math.abs(comparison.totalPercent)}%)\n\n`;
      report += 'The refactoring successfully reduced the overall bundle size.\n\n';
    } else if (netChange > 0) {
      report += `⚠️ **Net bundle size increased** by ${formatBytes(netChange)} (${comparison.totalPercent}%)\n\n`;
      report += 'Review the changes to understand the increase.\n\n';
    }
  }
  
  report += '## Top 10 Largest JavaScript Chunks\n\n';
  current.chunks.forEach((chunk, index) => {
    report += `${index + 1}. \`${chunk.name}\`: ${formatBytes(chunk.size)}\n`;
  });
  
  report += '\n## Recommendations\n\n';
  report += '- Monitor bundle sizes regularly to catch regressions early\n';
  report += '- Consider code splitting for large chunks\n';
  report += '- Use dynamic imports for components that are not immediately needed\n';
  report += '- Ensure Tailwind purge is configured correctly to remove unused classes\n';
  
  fs.writeFileSync(reportPath, report);
  log(`\n✅ Report saved to ${reportPath}`, colors.green);
}

async function main() {
  const args = process.argv.slice(2);
  const shouldBuild = !args.includes('--no-build');
  const shouldSaveBaseline = args.includes('--save-baseline');
  
  log('\n🚀 Starting Performance Verification...', colors.bright + colors.cyan);
  
  // Step 1: Build the project
  if (shouldBuild) {
    log('\n📦 Building project...', colors.blue);
    try {
      execSync('npm run build', { stdio: 'inherit' });
      log('✅ Build completed successfully', colors.green);
    } catch (error) {
      log('❌ Build failed', colors.red);
      process.exit(1);
    }
  } else {
    log('\n⏭️  Skipping build (using existing build)', colors.yellow);
  }
  
  // Step 2: Analyze bundle
  log('\n🔍 Analyzing bundle sizes...', colors.blue);
  const current = analyzeBundle();
  
  if (!current) {
    log('❌ Failed to analyze bundle', colors.red);
    process.exit(1);
  }
  
  // Step 3: Load baseline and compare
  const baseline = loadBaseline();
  const comparison = compareWithBaseline(current, baseline);
  
  // Step 4: Generate report
  generateReport(current, comparison);
  saveReport(current, comparison);
  
  // Step 5: Save baseline if requested
  if (shouldSaveBaseline || !baseline) {
    saveBaseline(current);
  }
  
  log('\n✅ Performance verification completed!', colors.bright + colors.green);
  
  // Exit with appropriate code
  if (comparison && comparison.totalDiff > 0) {
    log('\n⚠️  Warning: Total bundle size increased', colors.yellow);
    process.exit(0);
  }
}

main().catch((error) => {
  log(`\n❌ Error: ${error.message}`, colors.red);
  process.exit(1);
});
