/**
 * usePreload Hook
 *
 * Provides functions to preload data and images for better perceived performance.
 * Useful for prefetching resources on hover or before navigation.
 *
 * @returns Object with preload functions
 *
 * @example
 * ```tsx
 * const { preloadData, preloadImage, preloadComponent } = usePreload();
 *
 * <a
 *   href="/projects"
 *   onMouseEnter={() => preloadData('/api/projects')}
 * >
 *   Projects
 * </a>
 * ```
 */

import { useCallback } from 'react';

interface PreloadOptions {
  cache?: RequestCache;
  priority?: 'high' | 'low' | 'auto';
}

export function usePreload() {
  /**
   * Preloads data from a URL
   * Fetches data in the background and caches it
   */
  const preloadData = useCallback((url: string, options?: PreloadOptions) => {
    const fetchOptions: RequestInit = {
      cache: options?.cache || 'force-cache',
      priority: options?.priority || 'low',
    };

    fetch(url, fetchOptions)
      .then(response => response.json())
      .catch(error => {
        // Silent fail - preloading is optional
        console.debug('Preload failed for:', url, error);
      });
  }, []);

  /**
   * Preloads an image
   * Creates an Image object to trigger browser caching
   */
  const preloadImage = useCallback((src: string) => {
    if (typeof window === 'undefined') return;

    const img = new Image();
    img.src = src;

    // Optional: handle load/error events
    img.onload = () => {
      console.debug('Image preloaded:', src);
    };
    img.onerror = () => {
      console.debug('Image preload failed:', src);
    };
  }, []);

  /**
   * Preloads multiple images
   */
  const preloadImages = useCallback(
    (sources: string[]) => {
      sources.forEach(src => preloadImage(src));
    },
    [preloadImage]
  );

  /**
   * Preloads a component by triggering its lazy import
   */
  const preloadComponent = useCallback((importFn: () => Promise<any>) => {
    importFn().catch(error => {
      console.debug('Component preload failed:', error);
    });
  }, []);

  /**
   * Preloads a link's content using the browser's prefetch
   */
  const prefetchLink = useCallback((href: string) => {
    if (typeof document === 'undefined') return;

    // Check if link is already prefetched
    const existing = document.querySelector(
      `link[rel="prefetch"][href="${href}"]`
    );
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  }, []);

  /**
   * Preloads DNS for external domains
   */
  const preconnect = useCallback((domain: string) => {
    if (typeof document === 'undefined') return;

    const existing = document.querySelector(
      `link[rel="preconnect"][href="${domain}"]`
    );
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  }, []);

  return {
    preloadData,
    preloadImage,
    preloadImages,
    preloadComponent,
    prefetchLink,
    preconnect,
  };
}
