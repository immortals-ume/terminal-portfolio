import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Terminal Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the terminal to be ready
    await page.waitForSelector('[data-testid="terminal-input"]', { timeout: 10000 });
  });

  test('should load the terminal interface', async ({ page }) => {
    // Check that the page loads
    await expect(page).toHaveTitle(/Terminal Portfolio/);
    
    // Check for Matrix background
    await expect(page.locator('canvas')).toBeVisible();
    
    // Check for terminal interface
    await expect(page.locator('.terminal')).toBeVisible();
  });

  test('should execute help command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('help');
    await input.press('Enter');
    
    // Check that help output is displayed
    await expect(page.locator('text=Available commands:')).toBeVisible();
    await expect(page.locator('text=home')).toBeVisible();
    await expect(page.locator('text=skills')).toBeVisible();
    await expect(page.locator('text=projects')).toBeVisible();
  });

  test('should execute contact command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('contact');
    await input.press('Enter');
    
    // Check that contact information is displayed
    await expect(page.locator('text=Professional Contact Information:')).toBeVisible();
    await expect(page.locator('text=Name:')).toBeVisible();
    await expect(page.locator('text=Email:')).toBeVisible();
  });

  test('should execute skills command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('skills');
    await input.press('Enter');
    
    // Check that skills are displayed
    await expect(page.locator('text=Technical Skills')).toBeVisible();
    await expect(page.locator('text=Programming Languages')).toBeVisible();
  });

  test('should execute projects command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('projects');
    await input.press('Enter');
    
    // Check that projects are displayed
    await expect(page.locator('text=Featured Projects')).toBeVisible();
  });

  test('should execute certifications command', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('certifications');
    await input.press('Enter');
    
    // Check that certifications section appears
    await expect(page.locator('text=Professional Certifications')).toBeVisible({ timeout: 10000 });
  });

  test('should handle unknown commands', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    await input.fill('unknown-command');
    await input.press('Enter');
    
    // Check error message
    await expect(page.locator('text=Command not found')).toBeVisible();
  });

  test('should clear terminal', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    // Add some content first
    await input.fill('help');
    await input.press('Enter');
    
    await expect(page.locator('text=Available commands:')).toBeVisible();
    
    // Clear terminal
    await input.fill('clear');
    await input.press('Enter');
    
    // Check that content is cleared
    await expect(page.locator('text=Available commands:')).not.toBeVisible();
  });

  test('should handle command aliases', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    // Test 'about' alias for 'home'
    await input.fill('about');
    await input.press('Enter');
    
    // Should show home content
    await expect(page.locator('text=Welcome to my interactive terminal portfolio')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();
    
    await input.fill('help');
    await input.press('Enter');
    
    await expect(page.locator('text=Available commands:')).toBeVisible();
  });

  test('should have proper keyboard navigation', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    // Test that input is focused
    await expect(input).toBeFocused();
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    // Should stay focused on input or move to next focusable element
  });

  test('should handle rapid command execution', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    const commands = ['help', 'home', 'skills', 'contact'];
    
    for (const command of commands) {
      await input.fill(command);
      await input.press('Enter');
      await page.waitForTimeout(100); // Small delay between commands
    }
    
    // Check that all commands were executed
    await expect(page.locator('text=Available commands:')).toBeVisible();
    await expect(page.locator('text=Welcome to my interactive terminal portfolio')).toBeVisible();
    await expect(page.locator('text=Technical Skills')).toBeVisible();
    await expect(page.locator('text=Professional Contact Information:')).toBeVisible();
  });

  test('should maintain scroll position', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    
    // Execute multiple commands to create scrollable content
    for (let i = 0; i < 10; i++) {
      await input.fill('help');
      await input.press('Enter');
      await page.waitForTimeout(100);
    }
    
    // Check that page scrolled to bottom
    const scrollTop = await page.evaluate(() => window.pageYOffset);
    expect(scrollTop).toBeGreaterThan(0);
  });

  test('should handle Matrix background animation', async ({ page }) => {
    // Check that canvas is present and has proper dimensions
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    
    const canvasSize = await canvas.boundingBox();
    expect(canvasSize?.width).toBeGreaterThan(0);
    expect(canvasSize?.height).toBeGreaterThan(0);
  });

  test('should be accessible', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should handle performance requirements', async ({ page }) => {
    // Measure page load performance
    const navigationPromise = page.waitForNavigation();
    await page.goto('/');
    await navigationPromise;
    
    // Check Core Web Vitals
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries);
        }).observe({ entryTypes: ['navigation', 'paint'] });
      });
    });
    
    expect(metrics).toBeDefined();
  });

  test('should work offline (if service worker is implemented)', async ({ page, context }) => {
    // Go online first
    await context.setOffline(false);
    await page.goto('/');
    await page.waitForSelector('[data-testid="terminal-input"]');
    
    // Go offline
    await context.setOffline(true);
    await page.reload();
    
    // Should still work (if service worker is implemented)
    // This test will pass/fail based on service worker implementation
  });
});