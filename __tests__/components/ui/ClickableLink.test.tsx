import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import ClickableLink from '@/app/components/ui/ClickableLink';

describe('ClickableLink Component', () => {
  beforeEach(() => {
    global.open = jest.fn();
  });

  it('renders with URL as text when no text provided', () => {
    render(<ClickableLink url="https://example.com" />);
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });

  it('renders with custom text when provided', () => {
    render(<ClickableLink url="https://example.com" text="Custom Text" />);
    expect(screen.getByText('Custom Text')).toBeInTheDocument();
  });

  it('handles click events', () => {
    render(<ClickableLink url="https://example.com" />);
    fireEvent.click(screen.getByText('https://example.com'));
    expect(global.open).toHaveBeenCalledWith('https://example.com', '_blank', 'noopener,noreferrer');
  });

  it('has proper styling and attributes', () => {
    render(<ClickableLink url="https://example.com" />);
    const span = screen.getByText('https://example.com').closest('span');
    expect(span).toHaveClass('cursor-pointer', 'text-green-400');
    expect(span).toHaveAttribute('title', 'Click to open: https://example.com');
  });

  it('applies custom className when provided', () => {
    render(<ClickableLink url="https://example.com" className="custom-class" />);
    const span = screen.getByText('https://example.com').closest('span');
    expect(span).toHaveClass('custom-class');
  });

  it('has proper inline styles', () => {
    render(<ClickableLink url="https://example.com" />);
    const span = screen.getByText('https://example.com').closest('span');
    expect(span).toHaveStyle({
      textDecoration: 'none',
      borderBottom: '1px dotted rgba(0, 255, 156, 0.5)'
    });
  });
});