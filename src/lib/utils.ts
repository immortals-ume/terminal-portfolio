/**
 * Shared Utility Functions
 * 
 * Common utility functions used across components for consistent behavior
 * and code reusability.
 */

import { ThemeColors } from './themeColors';

/**
 * Project status information
 */
export interface ProjectStatus {
  icon: string;
  label: string;
  color: string;
}

/**
 * Formats a date string into a human-readable format
 * 
 * @param dateString - ISO date string to format
 * @returns Formatted date string (e.g., "Jan 15, 2024")
 * 
 * @example
 * ```typescript
 * formatDate("2024-01-15T10:30:00Z") // Returns "Jan 15, 2024"
 * ```
 */
export function formatDate(dateString: string): string {
  if (!dateString) {
    return 'Unknown date';
  }

  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return 'Invalid date';
  }
}

/**
 * Calculates project status based on last update time
 * 
 * @param updatedAt - ISO date string of last update
 * @param colors - Theme colors for status color
 * @returns Project status with icon, label, and color
 * 
 * @example
 * ```typescript
 * const status = getProjectStatus("2024-01-15T10:30:00Z", colors);
 * // Returns { icon: "🟢", label: "Active", color: colors.accent }
 * ```
 */
export function getProjectStatus(updatedAt: string, colors: ThemeColors): ProjectStatus {
  if (!updatedAt) {
    return {
      icon: "⚪",
      label: "Unknown",
      color: colors.textSecondary
    };
  }

  try {
    const date = new Date(updatedAt);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return {
        icon: "⚪",
        label: "Unknown",
        color: colors.textSecondary
      };
    }

    const daysSinceUpdate = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceUpdate < 7) {
      return { icon: "🟢", label: "Active", color: colors.accent };
    }
    if (daysSinceUpdate < 30) {
      return { icon: "🟡", label: "Recent", color: colors.textSecondary };
    }
    return { icon: "🔵", label: "Stable", color: colors.textSecondary };
  } catch (error) {
    return {
      icon: "⚪",
      label: "Unknown",
      color: colors.textSecondary
    };
  }
}

/**
 * Validates if a string is a valid URL
 * 
 * @param url - String to validate as URL
 * @returns True if valid URL, false otherwise
 * 
 * @example
 * ```typescript
 * isValidUrl("https://github.com") // Returns true
 * isValidUrl("not a url") // Returns false
 * isValidUrl("") // Returns false
 * ```
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  const trimmedUrl = url.trim();
  
  if (trimmedUrl.length === 0) {
    return false;
  }

  try {
    const urlObject = new URL(trimmedUrl);
    
    const validProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'ftp:'];
    return validProtocols.includes(urlObject.protocol);
  } catch (error) {
    return false;
  }
}
