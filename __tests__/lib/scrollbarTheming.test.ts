/**
 * Scrollbar Theming Tests
 *
 * Tests to verify that scrollbar CSS uses theme CSS variables
 * and that scrollbar colors change with theme.
 *
 * Requirements: 10.4
 */

import {readFileSync} from 'fs';
import {join} from 'path';

describe('Scrollbar Theming', () => {
    let globalsCss: string;

    beforeAll(() => {
        // Read the globals.css file
        const cssPath = join(process.cwd(), 'src/app/globals.css');
        globalsCss = readFileSync(cssPath, 'utf-8');
    });

    describe('WebKit scrollbar styling', () => {
        it('should define scrollbar width and height', () => {
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar\s*{[^}]*width:\s*8px/);
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar\s*{[^}]*height:\s*8px/);
        });

        it('should use theme CSS variable for scrollbar thumb background', () => {
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar-thumb\s*{[^}]*background:\s*var\(--neon-soft\)/);
        });

        it('should use theme CSS variable for scrollbar thumb hover state', () => {
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar-thumb:hover\s*{[^}]*background:\s*var\(--accent\)/);
        });

        it('should use theme CSS variable for scrollbar track background', () => {
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar-track\s*{[^}]*background:\s*var\(--bg-secondary\)/);
        });

        it('should apply border-radius to scrollbar thumb', () => {
            expect(globalsCss).toMatch(/\*::-webkit-scrollbar-thumb\s*{[^}]*border-radius:\s*8px/);
        });
    });

    describe('Firefox scrollbar styling', () => {
        it('should define scrollbar-width as thin', () => {
            expect(globalsCss).toMatch(/scrollbar-width:\s*thin/);
        });

        it('should use theme CSS variables for scrollbar-color', () => {
            expect(globalsCss).toMatch(/scrollbar-color:\s*var\(--neon-soft\)\s+var\(--bg-secondary\)/);
        });
    });

    describe('Theme CSS variables', () => {
        const requiredVariables = ['--neon-soft', '--accent', '--bg-secondary'];
        const themes = [
            'essence_01',
            'essence_02',
            'essence_03',
            'essence_04',
            'essence_05',
            'essence_06',
            'essence_07',
            'essence_08',
            'essence_09',
            'essence_10',
        ];

        themes.forEach((theme) => {
            describe(`Theme: ${theme}`, () => {
                requiredVariables.forEach((variable) => {
                    it(`should define ${variable} for scrollbar theming`, () => {
                        const themeRegex = new RegExp(
                            `\\[data-theme="${theme}"\\]\\s*{[^}]*${variable}:[^;]+;`,
                            's'
                        );
                        expect(globalsCss).toMatch(themeRegex);
                    });
                });
            });
        });
    });

    describe('Smooth transitions', () => {
        it('should apply transitions to all elements for smooth theme changes', () => {
            expect(globalsCss).toMatch(/\*,\s*\*::before,\s*\*::after\s*{[^}]*transition:/);
        });

        it('should include background-color in transitions', () => {
            expect(globalsCss).toMatch(/transition:[^}]*background-color\s+0\.3s\s+ease/);
        });
    });
});
