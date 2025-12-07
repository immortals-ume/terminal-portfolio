import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import CommandSuggestions from '@/app/components/terminal/CommandSuggestions';

describe('CommandSuggestions Component', () => {
    const mockOnSuggestionSelect = jest.fn();
    const mockSuggestions = ['help', 'home', 'history'];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders when visible', () => {
        render(
            <CommandSuggestions
                suggestions={mockSuggestions}
                onSuggestionSelect={mockOnSuggestionSelect}
                isVisible={true}
            />
        );

        expect(screen.getByText('Suggestions:')).toBeInTheDocument();
    });

    it('does not render when not visible', () => {
        render(
            <CommandSuggestions
                suggestions={mockSuggestions}
                onSuggestionSelect={mockOnSuggestionSelect}
                isVisible={false}
            />
        );

        expect(screen.queryByText('Suggestions')).not.toBeInTheDocument();
    });

    it('renders all suggestions', () => {
        render(
            <CommandSuggestions
                suggestions={mockSuggestions}
                onSuggestionSelect={mockOnSuggestionSelect}
                isVisible={true}
            />
        );

        expect(screen.getByText('help')).toBeInTheDocument();
        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('history')).toBeInTheDocument();
    });

    it('calls onSuggestionSelect when suggestion is clicked', () => {
        render(
            <CommandSuggestions
                suggestions={mockSuggestions}
                onSuggestionSelect={mockOnSuggestionSelect}
                isVisible={true}
            />
        );

        fireEvent.click(screen.getByText('help'));

        expect(mockOnSuggestionSelect).toHaveBeenCalledWith('help');
    });

    it('handles empty suggestions', () => {
        render(
            <CommandSuggestions
                suggestions={[]}
                onSuggestionSelect={mockOnSuggestionSelect}
                isVisible={true}
            />
        );

        // Should not render anything when no suggestions
        expect(screen.queryByText('Suggestions:')).not.toBeInTheDocument();
    });
});