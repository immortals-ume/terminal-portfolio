import React from 'react';
import {render, screen} from '@testing-library/react';
import Timeline from '@/app/components/commands/Timeline';

// Mock the useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
    useThemeColors: () => ({
        accent: '#00ff00',
        bgPrimary: '#000000',
        bgSecondary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#cccccc',
        neonSoft: 'rgba(0, 255, 0, 0.3)',
    }),
}));

describe('Timeline Component', () => {
    it('renders timeline content', () => {
        render(<Timeline/>);
        expect(screen.getByText(/Professional Timeline/)).toBeInTheDocument();
    });

    it('renders work experience', () => {
        render(<Timeline/>);
        expect(screen.getByText(/LENSKART/)).toBeInTheDocument();
    });

    it('renders career progression', () => {
        render(<Timeline/>);
        expect(screen.getByText(/Career Progression/)).toBeInTheDocument();
    });
});