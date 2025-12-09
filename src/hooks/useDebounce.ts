/**
 * useDebounce Hook
 * 
 * Delays updating a value until after a specified delay period has passed
 * since the last change. Useful for optimizing expensive operations like
 * API calls, search queries, or complex calculations.
 * 
 * @template T - The type of value being debounced
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300ms)
 * @returns The debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearch = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // Only runs after user stops typing for 500ms
 *   fetchSearchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
