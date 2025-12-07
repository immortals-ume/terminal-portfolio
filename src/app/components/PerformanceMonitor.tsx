'use client'

import {useEffect} from 'react';

export default function PerformanceMonitor() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'performance' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        const navEntry = entry as PerformanceNavigationTiming;
                        console.log('Page Load Time:', navEntry.loadEventEnd - navEntry.fetchStart);
                    }

                    if (entry.entryType === 'paint') {
                        console.log(`${entry.name}:`, entry.startTime);
                    }
                });
            });

            observer.observe({entryTypes: ['navigation', 'paint']});

            return () => observer.disconnect();
        }
    }, []);

    return null;
}