/**
 * Tests for shared utility functions
 */

import { formatDate, getProjectStatus, isValidUrl } from '@/lib/utils';
import { ThemeColors } from '@/lib/themeColors';

// Mock theme colors for testing
const mockColors: ThemeColors = {
  bgPrimary: '#0a1a2e',
  bgSecondary: '#1a2a3e',
  textPrimary: '#00d4ff',
  textSecondary: '#88d4ff',
  accent: '#00d4ff',
  success: '#00d4ff',
  warning: '#0099cc',
  error: '#ff3b30',
  neon: '#00d4ff',
  neonSoft: 'rgba(0, 212, 255, 0.2)',
};

describe('formatDate', () => {
  it('should format valid date strings correctly', () => {
    const result = formatDate('2024-01-15T10:30:00Z');
    expect(result).toBe('Jan 15, 2024');
  });

  it('should handle empty string', () => {
    const result = formatDate('');
    expect(result).toBe('Unknown date');
  });

  it('should handle invalid date strings', () => {
    const result = formatDate('not-a-date');
    expect(result).toBe('Invalid date');
  });
});

describe('getProjectStatus', () => {
  it('should return Active status for recently updated projects', () => {
    const recentDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const result = getProjectStatus(recentDate, mockColors);
    
    expect(result.icon).toBe('🟢');
    expect(result.label).toBe('Active');
    expect(result.color).toBe(mockColors.accent);
  });

  it('should return Recent status for projects updated within 30 days', () => {
    const recentDate = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString();
    const result = getProjectStatus(recentDate, mockColors);
    
    expect(result.icon).toBe('🟡');
    expect(result.label).toBe('Recent');
    expect(result.color).toBe(mockColors.textSecondary);
  });

  it('should return Stable status for older projects', () => {
    const oldDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();
    const result = getProjectStatus(oldDate, mockColors);
    
    expect(result.icon).toBe('🔵');
    expect(result.label).toBe('Stable');
    expect(result.color).toBe(mockColors.textSecondary);
  });

  it('should handle empty string', () => {
    const result = getProjectStatus('', mockColors);
    
    expect(result.icon).toBe('⚪');
    expect(result.label).toBe('Unknown');
    expect(result.color).toBe(mockColors.textSecondary);
  });

  it('should handle invalid date strings', () => {
    const result = getProjectStatus('invalid-date', mockColors);
    
    expect(result.icon).toBe('⚪');
    expect(result.label).toBe('Unknown');
    expect(result.color).toBe(mockColors.textSecondary);
  });
});

describe('isValidUrl', () => {
  it('should return true for valid HTTP URLs', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://github.com/user/repo')).toBe(true);
  });

  it('should return true for valid mailto URLs', () => {
    expect(isValidUrl('mailto:test@example.com')).toBe(true);
  });

  it('should return true for valid tel URLs', () => {
    expect(isValidUrl('tel:+1234567890')).toBe(true);
  });

  it('should return false for empty strings', () => {
    expect(isValidUrl('')).toBe(false);
  });

  it('should return false for whitespace-only strings', () => {
    expect(isValidUrl('   ')).toBe(false);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not a url')).toBe(false);
    expect(isValidUrl('just-text')).toBe(false);
  });

  it('should return false for null or undefined', () => {
    expect(isValidUrl(null as any)).toBe(false);
    expect(isValidUrl(undefined as any)).toBe(false);
  });

  it('should return false for non-string values', () => {
    expect(isValidUrl(123 as any)).toBe(false);
    expect(isValidUrl({} as any)).toBe(false);
  });

  it('should return false for invalid protocols', () => {
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
    expect(isValidUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  it('should handle URLs with whitespace', () => {
    expect(isValidUrl('  https://example.com  ')).toBe(true);
  });
});
