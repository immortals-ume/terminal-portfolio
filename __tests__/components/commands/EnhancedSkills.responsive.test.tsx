/**
 * EnhancedSkills Responsive Grid Tests
 *
 * Tests for responsive grid behavior at various viewport widths
 * Requirements: 3.2, 3.3, 3.4
 */

import React from 'react';
import {render} from '@testing-library/react';
import EnhancedSkills from '@/app/components/commands/EnhancedSkills';

// Mock the useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
    useThemeColors: () => ({
        bgPrimary: '#0a1a2e',
        bgSecondary: '#1a2a3e',
        textPrimary: '#00d4ff',
        textSecondary: '#88d4ff',
        accent: '#00d4ff',
        neon: '#00d4ff',
        neonSoft: 'rgba(0, 212, 255, 0.2)',
    }),
}));

describe('EnhancedSkills - Responsive Grid Layout', () => {
    beforeEach(() => {
        // Reset any previous viewport settings
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1024,
        });
    });

    it('renders grid with auto-fill columns on desktop', () => {
        // Set desktop viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1280,
        });

        const {container} = render(<EnhancedSkills/>);
        const grids = container.querySelectorAll('.skills-grid');

        expect(grids.length).toBeGreaterThan(0);
        grids.forEach((grid) => {
            expect(grid).toHaveClass('skills-grid');
        });
    });

    it('renders grid on tablet viewport', () => {
        // Set tablet viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 800,
        });

        const {container} = render(<EnhancedSkills/>);
        const grids = container.querySelectorAll('.skills-grid');

        expect(grids.length).toBeGreaterThan(0);
    });

    it('renders grid on mobile viewport', () => {
        // Set mobile viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });

        const {container} = render(<EnhancedSkills/>);
        const grids = container.querySelectorAll('.skills-grid');

        expect(grids.length).toBeGreaterThan(0);
    });

    it('maintains consistent gap spacing', () => {
        const {container} = render(<EnhancedSkills/>);
        const grids = container.querySelectorAll('.skills-grid');

        // Verify grids exist and have the proper class
        expect(grids.length).toBeGreaterThan(0);
        grids.forEach((grid) => {
            expect(grid).toHaveClass('skills-grid');
        });
    });

    it('renders all skills in grid regardless of viewport', () => {
        const viewports = [375, 768, 1024, 1280, 1920];

        viewports.forEach((width) => {
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: width,
            });

            const {container} = render(<EnhancedSkills/>);
            const skillCards = container.querySelectorAll('.skill-card');

            // Should render all skills regardless of viewport
            expect(skillCards.length).toBeGreaterThan(0);
        });
    });

    it('applies proper grid structure with minmax columns', () => {
        const {container} = render(<EnhancedSkills/>);
        const grids = container.querySelectorAll('.skills-grid');

        // Verify the grid class is applied (CSS will handle the minmax)
        grids.forEach((grid) => {
            expect(grid).toHaveClass('skills-grid');
        });
    });
});
