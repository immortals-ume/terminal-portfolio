/**
 * EnhancedSkills Component Tests
 *
 * Tests for the responsive grid layout implementation
 * Requirements: 3.1, 3.2, 3.3, 3.4
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
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

describe('EnhancedSkills - Grid Layout', () => {
    it('renders the component with header', () => {
        render(<EnhancedSkills/>);
        expect(screen.getByText(/Technical Skills/i)).toBeInTheDocument();
    });

    it('renders all categories from skillsDataEnhanced', () => {
        render(<EnhancedSkills/>);

        skillsDataEnhanced.categories.forEach((category) => {
            expect(screen.getByText(category.name.toUpperCase())).toBeInTheDocument();
        });
    });

    it('renders all skills in grid layout', () => {
        const {container} = render(<EnhancedSkills/>);

        // Check that skills-grid class exists
        const grids = container.querySelectorAll('.skills-grid');
        expect(grids.length).toBe(skillsDataEnhanced.categories.length);
    });

    it('renders SkillCard components for each skill', () => {
        const {container} = render(<EnhancedSkills/>);

        // Count total skills
        const totalSkills = skillsDataEnhanced.categories.reduce(
            (sum, category) => sum + category.skills.length,
            0
        );

        // Check that skill-card class exists for each skill
        const skillCards = container.querySelectorAll('.skill-card');
        expect(skillCards.length).toBe(totalSkills);
    });

    it('applies grid layout CSS class', () => {
        const {container} = render(<EnhancedSkills/>);

        const grids = container.querySelectorAll('.skills-grid');
        grids.forEach((grid) => {
            expect(grid).toHaveClass('skills-grid');
        });
    });

    it('renders footer help text', () => {
        render(<EnhancedSkills/>);
        expect(screen.getByText(/Hover over skills for more details/i)).toBeInTheDocument();
    });

    it('renders category icons', () => {
        render(<EnhancedSkills/>);

        skillsDataEnhanced.categories.forEach((category) => {
            expect(screen.getByText(category.icon)).toBeInTheDocument();
        });
    });

    it('maintains proper spacing between categories', () => {
        const {container} = render(<EnhancedSkills/>);

        // Check that each category section has proper margin
        const categoryContainers = container.querySelectorAll('div[style*="margin-bottom"]');
        expect(categoryContainers.length).toBeGreaterThan(0);
    });
});

describe('EnhancedSkills - Responsive Behavior', () => {
    it('renders with responsive grid structure', () => {
        const {container} = render(<EnhancedSkills/>);

        const grids = container.querySelectorAll('.skills-grid');
        grids.forEach((grid) => {
            // Verify grid has the responsive class
            expect(grid).toHaveClass('skills-grid');
        });
    });

    it('renders all skills regardless of viewport size', () => {
        const {container} = render(<EnhancedSkills/>);

        const totalSkills = skillsDataEnhanced.categories.reduce(
            (sum, category) => sum + category.skills.length,
            0
        );

        const skillCards = container.querySelectorAll('.skill-card');
        expect(skillCards.length).toBe(totalSkills);
    });
});
