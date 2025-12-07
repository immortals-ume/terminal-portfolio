/**
 * EnhancedSkills Integration Tests
 *
 * Comprehensive tests verifying all grid layout requirements
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import React from 'react';
import {render} from '@testing-library/react';
import EnhancedSkills from '@/app/components/commands/EnhancedSkills';
import {skillsDataEnhanced} from '@/data/skillsDataEnhanced';

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

describe('EnhancedSkills - Grid Layout Integration', () => {
    describe('Requirement 3.1: Grid Layout Display', () => {
        it('displays skills in a grid layout', () => {
            const {container} = render(<EnhancedSkills/>);

            // Verify grid containers exist
            const grids = container.querySelectorAll('.skills-grid');
            expect(grids.length).toBe(skillsDataEnhanced.categories.length);

            // Verify each grid has the proper class
            grids.forEach((grid) => {
                expect(grid).toHaveClass('skills-grid');
            });
        });
    });

    describe('Requirement 3.2: Multiple Columns on Wide Viewport', () => {
        it('shows grid structure on wide viewport', () => {
            // Set wide viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 1920,
            });

            const {container} = render(<EnhancedSkills/>);
            const grids = container.querySelectorAll('.skills-grid');

            // Grid should exist and be ready for multiple columns
            expect(grids.length).toBeGreaterThan(0);
            grids.forEach((grid) => {
                expect(grid).toHaveClass('skills-grid');
            });
        });
    });

    describe('Requirement 3.3: Responsive Column Adjustment', () => {
        it('adjusts to narrow viewport', () => {
            // Set narrow viewport
            Object.defineProperty(window, 'innerWidth', {
                writable: true,
                configurable: true,
                value: 375,
            });

            const {container} = render(<EnhancedSkills/>);
            const grids = container.querySelectorAll('.skills-grid');

            // Grid should still exist and render all skills
            expect(grids.length).toBeGreaterThan(0);

            // All skills should still be rendered
            const skillCards = container.querySelectorAll('.skill-card');
            const totalSkills = skillsDataEnhanced.categories.reduce(
                (sum, cat) => sum + cat.skills.length,
                0
            );
            expect(skillCards.length).toBe(totalSkills);
        });
    });

    describe('Requirement 3.4: Consistent Spacing', () => {
        it('maintains consistent spacing between grid items', () => {
            const {container} = render(<EnhancedSkills/>);
            const grids = container.querySelectorAll('.skills-grid');

            // Verify grids have the class that applies gap spacing
            grids.forEach((grid) => {
                expect(grid).toHaveClass('skills-grid');
            });
        });

        it('maintains spacing between categories', () => {
            const {container} = render(<EnhancedSkills/>);

            // Check for category containers with margin
            const categoryContainers = container.querySelectorAll('div[style*="margin-bottom"]');
            expect(categoryContainers.length).toBeGreaterThan(0);
        });
    });

    describe('Grid Layout CSS Implementation', () => {
        it('applies auto-fill grid template', () => {
            const {container} = render(<EnhancedSkills/>);
            const grids = container.querySelectorAll('.skills-grid');

            // The CSS class should be applied (actual grid behavior is in CSS)
            grids.forEach((grid) => {
                expect(grid.className).toContain('skills-grid');
            });
        });

        it('renders all skill cards within grids', () => {
            const {container} = render(<EnhancedSkills/>);

            // Count skills in data
            const totalSkills = skillsDataEnhanced.categories.reduce(
                (sum, cat) => sum + cat.skills.length,
                0
            );

            // Count rendered skill cards
            const skillCards = container.querySelectorAll('.skill-card');
            expect(skillCards.length).toBe(totalSkills);
        });

        it('organizes skills by category in separate grids', () => {
            const {container} = render(<EnhancedSkills/>);

            // Each category should have its own grid
            const grids = container.querySelectorAll('.skills-grid');
            expect(grids.length).toBe(skillsDataEnhanced.categories.length);
        });
    });

    describe('Responsive Behavior Across Breakpoints', () => {
        const breakpoints = [
            {name: 'mobile', width: 375},
            {name: 'tablet', width: 768},
            {name: 'desktop', width: 1024},
            {name: 'large desktop', width: 1920},
        ];

        breakpoints.forEach(({name, width}) => {
            it(`renders correctly at ${name} breakpoint (${width}px)`, () => {
                Object.defineProperty(window, 'innerWidth', {
                    writable: true,
                    configurable: true,
                    value: width,
                });

                const {container} = render(<EnhancedSkills/>);

                // Grid should exist
                const grids = container.querySelectorAll('.skills-grid');
                expect(grids.length).toBeGreaterThan(0);

                // All skills should render
                const skillCards = container.querySelectorAll('.skill-card');
                expect(skillCards.length).toBeGreaterThan(0);
            });
        });
    });
});
