/**
 * useThrottle Hook
 * 
 * Limits the rate at which a function can be called. Ensures the callback
 * is executed at most once per specified delay period.
 * 
 * @template T - Function type
 * @param callback - The function to throttle
 * @param delay - Minimum time between calls in milliseconds
 * @returns Throttled version of the callback
 * 
 * @example
 * ```tsx
 * const handleScroll = useThrottle(() => {
 *   console.log('Scrolled');
 * }, 100);
 * 
 * useEffect(() => {
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, [handleScroll]);
 * ```
 */

import { useRef, useCallback } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      lastRun.current = now;
      return callback(...args);
    }
  }, [callback, delay]) as T;
}
