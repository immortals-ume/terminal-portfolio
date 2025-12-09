/**
 * useLoadingState Hook
 * 
 * Manages loading and error states for async operations. Provides a
 * consistent pattern for handling data fetching states.
 * 
 * @returns Object with loading state, error state, and setters
 * 
 * @example
 * ```tsx
 * const { loading, error, setLoading, setError } = useLoadingState();
 * 
 * useEffect(() => {
 *   const fetchData = async () => {
 *     setLoading(true);
 *     setError(null);
 *     try {
 *       const data = await api.getData();
 *       // Process data
 *     } catch (err) {
 *       setError(err.message);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *   fetchData();
 * }, []);
 * ```
 */

import { useState } from 'react';

export function useLoadingState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  return { 
    loading, 
    error, 
    setLoading, 
    setError 
  };
}
