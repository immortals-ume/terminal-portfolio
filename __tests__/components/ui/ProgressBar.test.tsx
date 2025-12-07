/**
 * ProgressBar Component Tests
 *
 * Tests for the ProgressBar component that displays proficiency levels
 */

import {render, screen} from '@testing-library/react';
import {ProgressBar} from '@/app/components/ui/ProgressBar';
import React from 'react';

// Mock useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
    useThemeColors: () => ({
        bgPrimary: '#0a1a2e',
        bgSecondary: '#1a2a3e',
        textPrimary: '#00d4ff',
        textSecondary: '#88d4ff',
        accent: '#00d4ff',
        success: '#00d4ff',
        warning: '#0099cc',
        error: '#ff3b30',
        neon: '#00d4ff',
        neonSoft: 'rgba(0, 212, 255, 0.2)',
    }),
}));

describe('ProgressBar', () => {
    it('renders with Expert proficiency at 100%', () => {
        render(<ProgressBar proficiency="Expert" animated={false}/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toBeInTheDocument();
        expect(progressBar).toHaveAttribute('aria-valuenow', '100');
        expect(progressBar).toHaveAttribute('aria-label', 'Expert proficiency: 100%');
    });

    it('renders with Advanced proficiency at 75%', () => {
        render(<ProgressBar proficiency="Advanced" animated={false}/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuenow', '75');
        expect(progressBar).toHaveAttribute('aria-label', 'Advanced proficiency: 75%');
    });

    it('renders with Intermediate proficiency at 50%', () => {
        render(<ProgressBar proficiency="Intermediate" animated={false}/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuenow', '50');
        expect(progressBar).toHaveAttribute('aria-label', 'Intermediate proficiency: 50%');
    });

    it('renders with Beginner proficiency at 25%', () => {
        render(<ProgressBar proficiency="Beginner" animated={false}/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuenow', '25');
        expect(progressBar).toHaveAttribute('aria-label', 'Beginner proficiency: 25%');
    });

    it('has correct ARIA attributes', () => {
        render(<ProgressBar proficiency="Advanced" animated={false}/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveAttribute('aria-valuemin', '0');
        expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('applies custom className', () => {
        render(<ProgressBar proficiency="Expert" animated={false} className="custom-class"/>);

        const progressBar = screen.getByRole('progressbar');
        expect(progressBar).toHaveClass('custom-class');
    });
});
