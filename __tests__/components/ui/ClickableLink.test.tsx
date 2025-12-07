import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import ClickableLink from '@/app/components/ui/ClickableLink';

describe('ClickableLink Component', () => {
    beforeEach(() => {
        global.open = jest.fn();
    });

    it('renders with URL as text when no text provided', () => {
        render(<ClickableLink url="https://example.com"/>);
        expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });

    it('renders with custom text when provided', () => {
        render(<ClickableLink url="https://example.com" text="Custom Text"/>);
        expect(screen.getByText('Custom Text')).toBeInTheDocument();
    });

    it('handles click events', () => {
        render(<ClickableLink url="https://example.com"/>);
        fireEvent.click(screen.getByText('https://example.com'));
        expect(global.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });

    it('has proper styling and attributes', () => {
        render(<ClickableLink url="https://example.com"/>);
        const span = screen.getByText('https://example.com').closest('span');
        expect(span).toHaveClass('cursor-pointer', 'no-underline', 'border-b', 'border-dotted', 'opacity-90', 'hover:opacity-100', 'hover:brightness-110', 'transition-all', 'duration-200');
        expect(span).toHaveAttribute('title', 'Click to open: https://example.com');
        expect(span).toHaveAttribute('role', 'link');
        expect(span).toHaveAttribute('tabIndex', '0');
    });

    it('applies custom className when provided', () => {
        render(<ClickableLink url="https://example.com" className="custom-class"/>);
        const span = screen.getByText('https://example.com').closest('span');
        expect(span).toHaveClass('custom-class');
    });

    it('has proper inline styles', () => {
        render(<ClickableLink url="https://example.com"/>);
        const span = screen.getByText('https://example.com').closest('span');
        expect(span).toHaveStyle({
            color: 'var(--accent)',
            borderColor: 'var(--accent)',
        });
    });

    it('handles keyboard navigation with Enter key', () => {
        render(<ClickableLink url="https://example.com"/>);
        const span = screen.getByText('https://example.com');
        fireEvent.keyDown(span, { key: 'Enter' });
        expect(global.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });

    it('handles keyboard navigation with Space key', () => {
        render(<ClickableLink url="https://example.com"/>);
        const span = screen.getByText('https://example.com');
        fireEvent.keyDown(span, { key: ' ' });
        expect(global.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
    });

    it('uses custom aria-label when provided', () => {
        render(<ClickableLink url="https://example.com" ariaLabel="Visit our website"/>);
        const span = screen.getByText('https://example.com');
        expect(span).toHaveAttribute('aria-label', 'Visit our website');
    });

    it('generates default aria-label when not provided', () => {
        render(<ClickableLink url="https://example.com" text="Example"/>);
        const span = screen.getByText('Example');
        expect(span).toHaveAttribute('aria-label', 'Open link: Example');
    });

    it('handles empty URL gracefully', () => {
        render(<ClickableLink url="" text="Empty URL"/>);
        expect(screen.getByText('Empty URL')).toBeInTheDocument();
        const span = screen.getByText('Empty URL');
        expect(span).toHaveAttribute('role', 'text');
        expect(span).not.toHaveAttribute('tabIndex');
    });

    it('handles invalid URL gracefully', () => {
        render(<ClickableLink url="not a valid url" text="Invalid"/>);
        expect(screen.getByText('Invalid')).toBeInTheDocument();
        const span = screen.getByText('Invalid');
        expect(span).toHaveAttribute('role', 'text');
        expect(span).not.toHaveAttribute('tabIndex');
    });

    it('displays fallback text for invalid URL without custom text', () => {
        render(<ClickableLink url=""/>);
        expect(screen.getByText('Invalid link')).toBeInTheDocument();
    });

    it('accepts valid mailto URLs', () => {
        render(<ClickableLink url="mailto:test@example.com" text="Email"/>);
        const span = screen.getByText('Email');
        expect(span).toHaveAttribute('role', 'link');
        fireEvent.click(span);
        expect(global.open).toHaveBeenCalledWith('mailto:test@example.com', '_blank', 'noopener,noreferrer');
    });

    it('accepts valid tel URLs', () => {
        render(<ClickableLink url="tel:+1234567890" text="Phone"/>);
        const span = screen.getByText('Phone');
        expect(span).toHaveAttribute('role', 'link');
        fireEvent.click(span);
        expect(global.open).toHaveBeenCalledWith('tel:+1234567890', '_blank', 'noopener,noreferrer');
    });
});