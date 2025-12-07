import React from 'react';
import {render, screen} from '@testing-library/react';
import Education from '@/app/components/commands/Education';

// Mock useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
    useThemeColors: () => ({
        bgPrimary: '#000000',
        bgSecondary: '#111111',
        textPrimary: '#ffffff',
        textSecondary: '#cccccc',
        accent: '#00ff00',
        warning: '#ffff00',
    }),
}));

describe('Education Component', () => {
    it('renders education header', () => {
        render(<Education/>);
        expect(screen.getByText(/Educational Background/)).toBeInTheDocument();
    });

    it('renders degree information', () => {
        render(<Education/>);
        expect(screen.getByText(/Bachelor of Technology/)).toBeInTheDocument();
    });

    it('renders institution', () => {
        render(<Education/>);
        expect(screen.getByText(/SRM Institute/)).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
        render(<Education/>);
        const list = screen.getByRole('list', { name: /Educational qualifications/i });
        expect(list).toBeInTheDocument();
    });
});