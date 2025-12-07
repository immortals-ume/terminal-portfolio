'use client'

import {useEffect} from 'react';

export default function WebOptimizations() {
    useEffect(() => {
        const preloadCriticalResources = () => {
            const fontLink = document.createElement('link');
            fontLink.rel = 'preload';
            fontLink.href = '/fonts/sf-mono.woff2';
            fontLink.as = 'font';
            fontLink.type = 'font/woff2';
            fontLink.crossOrigin = 'anonymous';
            document.head.appendChild(fontLink);
        };

        const optimizeImages = () => {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        img.src = img.dataset.src || '';
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        };

        const registerServiceWorker = async () => {
            if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
                try {
                    await navigator.serviceWorker.register('/sw.js');
                    console.log('Service Worker registered successfully');
                } catch (error) {
                    console.log('Service Worker registration failed:', error);
                }
            }
        };

        const performanceOptimizations = () => {
            document.documentElement.style.scrollBehavior = 'smooth';
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.style.setProperty('--animation-duration', '0s');
            }
        };

        preloadCriticalResources();
        optimizeImages();
        registerServiceWorker();
        performanceOptimizations();

        const reportWebVitals = (metric: any) => {
            if (process.env.NODE_ENV === 'production') {
                console.log('Web Vital:', metric);
            }
        };

        import('web-vitals').then((module: any) => {
            if (module.onCLS) module.onCLS(reportWebVitals);
            if (module.onFCP) module.onFCP(reportWebVitals);
            if (module.onLCP) module.onLCP(reportWebVitals);
            if (module.onTTFB) module.onTTFB(reportWebVitals);
        }).catch(() => {
            void 0;
        });

    }, []);

    return null;
}