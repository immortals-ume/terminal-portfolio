/**
 * Date Utilities
 * 
 * Common date parsing, formatting, and calculation functions used across
 * the application, particularly in Timeline and work experience components.
 */

/**
 * Parses a date string into a Date object
 * Handles various date formats including "YYYY-MM-DD" and "Present"
 * 
 * @param dateStr - Date string to parse
 * @returns Parsed Date object, or current date if "Present"
 */
export function parseDate(dateStr: string): Date {
  if (dateStr.toLowerCase() === 'present') {
    return new Date();
  }
  return new Date(dateStr);
}

/**
 * Calculates duration between two dates or a period string
 * 
 * @param period - Period string (e.g., "2020-01 - 2021-06") or start/end dates
 * @param showDays - Whether to include days in the output
 * @returns Formatted duration string (e.g., "1 year 5 months")
 */
export function calculateDuration(period: string, showDays: boolean = false): string {
  const parts = period.split(' - ');
  if (parts.length !== 2) return '';

  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);

  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = diffDays % 30;

  const parts_result: string[] = [];
  
  if (years > 0) {
    parts_result.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  }
  if (months > 0) {
    parts_result.push(`${months} ${months === 1 ? 'month' : 'months'}`);
  }
  if (showDays && days > 0) {
    parts_result.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }

  return parts_result.join(' ') || '0 months';
}

/**
 * Formats a date string into a readable format
 * 
 * @param dateString - Date string to format
 * @returns Formatted date string (e.g., "Jan 2020")
 */
export function formatDate(dateString: string): string {
  if (dateString.toLowerCase() === 'present') {
    return 'Present';
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short' 
  };
  
  return date.toLocaleDateString('en-US', options);
}

/**
 * Gets the number of days since a given date
 * 
 * @param date - Date string or Date object
 * @returns Number of days since the date
 */
export function getDaysSince(date: string | Date): number {
  const startDate = typeof date === 'string' ? parseDate(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - startDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Calculates total experience in years from work experience array
 * 
 * @param experiences - Array of work experience objects with period strings
 * @returns Total years of experience
 */
export function calculateTotalExperience(experiences: Array<{ period: string }>): number {
  let totalDays = 0;

  experiences.forEach((exp) => {
    const parts = exp.period.split(' - ');
    if (parts.length === 2) {
      const start = parseDate(parts[0]);
      const end = parseDate(parts[1]);
      const diffMs = end.getTime() - start.getTime();
      totalDays += Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }
  });

  return Math.floor(totalDays / 365 * 10) / 10;
}

/**
 * Checks if a date period is currently active (ends with "Present")
 * 
 * @param period - Period string (e.g., "2020-01 - Present")
 * @returns True if the period is currently active
 */
export function isCurrentPeriod(period: string): boolean {
  return period.toLowerCase().includes('present');
}
