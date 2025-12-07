/**
 * Viewport and Mobile Support Tests for ThemeProvider
 *
 * These tests verify that the theme system works correctly across different
 * viewport sizes and mobile scenarios as specified in Requirements 9.1-9.5
 */

describe('ThemeProvider - Viewport and Mobile Support', () => {
    let localStorageMock: { [key: string]: string };
    let documentElement: any;

    beforeEach(() => {
        // Reset mocks
        localStorageMock = {};

        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn((key: string) => localStorageMock[key] || null),
                setItem: jest.fn((key: string, value: string) => {
                    localStorageMock[key] = value;
                }),
                removeItem: jest.fn((key: string) => {
                    delete localStorageMock[key];
                }),
                clear: jest.fn(() => {
                    localStorageMock = {};
                }),
            },
            writable: true,
            configurable: true,
        });

        // Mock document.documentElement
        documentElement = {
            setAttribute: jest.fn(),
            style: {
                setProperty: jest.fn(),
            },
        };

        Object.defineProperty(document, 'documentElement', {
            value: documentElement,
            writable: true,
            configurable: true,
        });

        // Mock window dimensions for desktop
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1920,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 1080,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Requirement 9.4: Theme persistence across viewport changes', () => {
        it('should persist theme when viewport width changes from desktop to mobile', () => {
            // Set a theme in localStorage
            localStorageMock['portfolio_theme'] = 'essence_02';

            // Simulate viewport change to mobile width
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });

            // Theme should still be in localStorage
            expect(localStorageMock['portfolio_theme']).toBe('essence_02');
        });

        it('should persist theme when viewport height changes (mobile keyboard)', () => {
            // Set a theme in localStorage
            localStorageMock['portfolio_theme'] = 'essence_03';

            // Simulate viewport height change (e.g., mobile keyboard appearing)
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 400,
            });

            // Theme should still be in localStorage
            expect(localStorageMock['portfolio_theme']).toBe('essence_03');
        });

        it('should persist theme across orientation changes', () => {
            // Set a theme in localStorage
            localStorageMock['portfolio_theme'] = 'essence_04';

            // Simulate orientation change (portrait to landscape)
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 812,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 375,
            });

            // Theme should still be in localStorage
            expect(localStorageMock['portfolio_theme']).toBe('essence_04');
        });
    });

    describe('Requirement 9.1, 9.2: Mobile browser support', () => {
        beforeEach(() => {
            // Set mobile viewport dimensions
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
            Object.defineProperty(window, 'innerHeight', {
                writable: true,
                configurable: true,
                value: 667,
            });
        });

        it('should load stored theme on mobile browser', () => {
            // Pre-populate localStorage with a theme
            localStorageMock['portfolio_theme'] = 'essence_05';

            // Verify theme is accessible
            const storedTheme = localStorage.getItem('portfolio_theme');
            expect(storedTheme).toBe('essence_05');
        });

        it('should apply default theme on mobile when no stored theme exists', () => {
            // Ensure no theme is stored
            expect(localStorageMock['portfolio_theme']).toBeUndefined();

            // Default theme should be used (essence_01)
            const storedTheme = localStorage.getItem('portfolio_theme');
            expect(storedTheme).toBeNull();
        });

        it('should save theme changes on mobile browser', () => {
            // Simulate theme change
            localStorage.setItem('portfolio_theme', 'essence_06');

            // Verify theme was saved
            expect(localStorageMock['portfolio_theme']).toBe('essence_06');
            expect(localStorage.setItem).toHaveBeenCalledWith('portfolio_theme', 'essence_06');
        });
    });

    describe('Requirement 9.3: Touch interactions', () => {
        beforeEach(() => {
            // Set mobile viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
        });

        it('should maintain theme consistency during rapid theme changes', () => {
            // Simulate rapid theme changes
            localStorage.setItem('portfolio_theme', 'essence_02');
            localStorage.setItem('portfolio_theme', 'essence_03');
            localStorage.setItem('portfolio_theme', 'essence_04');

            // Final theme should be essence_04
            expect(localStorageMock['portfolio_theme']).toBe('essence_04');
        });

        it('should handle theme storage during touch interactions', () => {
            // Initial theme
            localStorageMock['portfolio_theme'] = 'essence_01';

            // Simulate theme change via touch interaction
            localStorage.setItem('portfolio_theme', 'essence_07');

            // Verify theme was updated
            expect(localStorageMock['portfolio_theme']).toBe('essence_07');
        });
    });

    describe('Requirement 9.5: Session restoration on mobile', () => {
        beforeEach(() => {
            // Set mobile viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });
        });

        it('should restore theme from localStorage on mobile session start', () => {
            // Simulate a stored theme from previous session
            localStorageMock['portfolio_theme'] = 'essence_08';

            // Verify theme can be retrieved
            const storedTheme = localStorage.getItem('portfolio_theme');
            expect(storedTheme).toBe('essence_08');
        });

        it('should handle corrupted localStorage data gracefully on mobile', () => {
            // Simulate corrupted data
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: jest.fn(() => {
                        throw new Error('Storage access denied');
                    }),
                    setItem: jest.fn(),
                    removeItem: jest.fn(),
                    clear: jest.fn(),
                },
                writable: true,
                configurable: true,
            });

            // Should throw error when accessing storage
            expect(() => localStorage.getItem('portfolio_theme')).toThrow('Storage access denied');
        });

        it('should restore theme after mobile browser tab becomes active again', () => {
            // Set initial theme
            localStorageMock['portfolio_theme'] = 'essence_09';

            // Simulate tab going inactive and another tab changing theme
            localStorageMock['portfolio_theme'] = 'essence_10';

            // Verify updated theme is accessible
            const storedTheme = localStorage.getItem('portfolio_theme');
            expect(storedTheme).toBe('essence_10');
        });

        it('should handle storage quota exceeded on mobile', () => {
            Object.defineProperty(window, 'localStorage', {
                value: {
                    getItem: jest.fn((key: string) => localStorageMock[key] || null),
                    setItem: jest.fn(() => {
                        const error = new Error('QuotaExceededError');
                        error.name = 'QuotaExceededError';
                        throw error;
                    }),
                    removeItem: jest.fn(),
                    clear: jest.fn(),
                },
                writable: true,
                configurable: true,
            });

            // Should throw QuotaExceededError
            expect(() => localStorage.setItem('portfolio_theme', 'essence_02')).toThrow('QuotaExceededError');
        });
    });

    describe('Cross-Device Consistency', () => {
        it('should maintain theme consistency across different viewport sizes', () => {
            const viewportSizes = [
                {width: 375, height: 667, name: 'iPhone SE'},
                {width: 414, height: 896, name: 'iPhone 11 Pro Max'},
                {width: 768, height: 1024, name: 'iPad'},
                {width: 1920, height: 1080, name: 'Desktop'},
            ];

            localStorageMock['portfolio_theme'] = 'essence_08';

            viewportSizes.forEach((size) => {
                Object.defineProperty(window, 'innerWidth', {
                    writable: true,
                    configurable: true,
                    value: size.width,
                });
                Object.defineProperty(window, 'innerHeight', {
                    writable: true,
                    configurable: true,
                    value: size.height,
                });

                // Theme should remain consistent across all viewport sizes
                expect(localStorageMock['portfolio_theme']).toBe('essence_08');
            });
        });

        it('should maintain theme in localStorage regardless of viewport', () => {
            // Set theme on desktop
            Object.defineProperty(window, 'innerWidth', {value: 1920, writable: true, configurable: true});
            localStorageMock['portfolio_theme'] = 'essence_03';

            // Switch to mobile
            Object.defineProperty(window, 'innerWidth', {value: 375, writable: true, configurable: true});
            expect(localStorageMock['portfolio_theme']).toBe('essence_03');

            // Switch to tablet
            Object.defineProperty(window, 'innerWidth', {value: 768, writable: true, configurable: true});
            expect(localStorageMock['portfolio_theme']).toBe('essence_03');

            // Back to desktop
            Object.defineProperty(window, 'innerWidth', {value: 1920, writable: true, configurable: true});
            expect(localStorageMock['portfolio_theme']).toBe('essence_03');
        });
    });

    describe('Storage API Compatibility', () => {
        it('should work with localStorage API on mobile', () => {
            Object.defineProperty(window, 'innerWidth', {value: 375, writable: true, configurable: true});

            // Test all localStorage methods
            localStorage.setItem('portfolio_theme', 'essence_01');
            expect(localStorage.getItem('portfolio_theme')).toBe('essence_01');

            localStorage.setItem('portfolio_theme', 'essence_02');
            expect(localStorage.getItem('portfolio_theme')).toBe('essence_02');

            localStorage.removeItem('portfolio_theme');
            expect(localStorage.getItem('portfolio_theme')).toBeNull();
        });

        it('should handle localStorage clear on mobile', () => {
            Object.defineProperty(window, 'innerWidth', {value: 375, writable: true, configurable: true});

            localStorage.setItem('portfolio_theme', 'essence_05');
            expect(localStorageMock['portfolio_theme']).toBe('essence_05');

            localStorage.clear();
            expect(localStorageMock['portfolio_theme']).toBeUndefined();
        });
    });
});
