/**
 * HoverTooltip Component Tests
 *
 * Tests for the HoverTooltip component that displays additional skill information on hover
 */

import {render, screen, waitFor} from '@testing-library/react';
import {HoverTooltip} from '@/app/components/ui/HoverTooltip';
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

describe('HoverTooltip', () => {
    it('renders years of experience when provided', () => {
        render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
            />
        );

        expect(screen.getByText(/3 years of experience/i)).toBeInTheDocument();
    });

    it('renders singular year when yearsOfExperience is 1', () => {
        render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={1}
            />
        );

        expect(screen.getByText(/1 year of experience/i)).toBeInTheDocument();
    });

    it('renders description when provided', () => {
        render(
            <HoverTooltip
                isVisible={true}
                description="Type-safe development with advanced features"
            />
        );

        expect(screen.getByText(/Type-safe development with advanced features/i)).toBeInTheDocument();
    });

    it('renders both years and description when both provided', () => {
        render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={5}
                description="Expert level programming"
            />
        );

        expect(screen.getByText(/5 years of experience/i)).toBeInTheDocument();
        expect(screen.getByText(/Expert level programming/i)).toBeInTheDocument();
    });

    it('does not render when isVisible is false', async () => {
        const {container} = render(
            <HoverTooltip
                isVisible={false}
                yearsOfExperience={3}
                description="Test description"
            />
        );

        // Wait for animation to complete
        await waitFor(() => {
            expect(container.querySelector('.hover-tooltip')).not.toBeInTheDocument();
        }, {timeout: 300});
    });

    it('does not render when no content is provided', () => {
        const {container} = render(
            <HoverTooltip
                isVisible={true}
            />
        );

        expect(container.querySelector('.hover-tooltip')).not.toBeInTheDocument();
    });

    it('applies top position by default', () => {
        const {container} = render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
                position="top"
            />
        );

        const tooltip = container.querySelector('.hover-tooltip');
        expect(tooltip).toHaveStyle({bottom: 'calc(100% + 8px)'});
    });

    it('applies bottom position when specified', () => {
        const {container} = render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
                position="bottom"
            />
        );

        const tooltip = container.querySelector('.hover-tooltip');
        expect(tooltip).toHaveStyle({top: 'calc(100% + 8px)'});
    });

    it('has correct opacity when visible', () => {
        const {container} = render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
            />
        );

        const tooltip = container.querySelector('.hover-tooltip');
        expect(tooltip).toHaveStyle({opacity: 1});
    });

    it('includes experience icon', () => {
        render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
            />
        );

        expect(screen.getByText('⏱️')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const {container} = render(
            <HoverTooltip
                isVisible={true}
                yearsOfExperience={3}
                className="custom-class"
            />
        );

        const tooltip = container.querySelector('.hover-tooltip');
        expect(tooltip).toHaveClass('custom-class');
    });
});
