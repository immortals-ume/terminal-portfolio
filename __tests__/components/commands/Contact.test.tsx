import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Contact from '@/app/components/commands/Contact';

// Mock ClickableLink to avoid external dependencies
jest.mock('@/app/components/ui/ClickableLink', () => {
  return function MockClickableLink({ url, text }: { url: string; text?: string }) {
    return <span data-testid="clickable-link" data-url={url}>{text || url}</span>;
  };
});

describe('Contact Component', () => {
  it('renders professional contact information header', () => {
    render(<Contact />);
    expect(screen.getByText('Professional Contact Information:')).toBeInTheDocument();
  });

  it('renders name information', () => {
    render(<Contact />);
    expect(screen.getByText(/- Name:/)).toBeInTheDocument();
  });

  it('renders email information', () => {
    render(<Contact />);
    expect(screen.getByText(/- Email:/)).toBeInTheDocument();
  });

  it('renders phone information', () => {
    render(<Contact />);
    expect(screen.getByText(/- Phone:/)).toBeInTheDocument();
  });

  it('renders location information', () => {
    render(<Contact />);
    expect(screen.getByText(/- Location:/)).toBeInTheDocument();
  });

  it('renders portfolio link', () => {
    render(<Contact />);
    expect(screen.getByText(/- Portfolio:/)).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<Contact />);
    expect(screen.getByText(/- GitHub:/)).toBeInTheDocument();
  });

  it('renders LinkedIn link', () => {
    render(<Contact />);
    expect(screen.getByText(/- LinkedIn:/)).toBeInTheDocument();
  });

  it('renders LeetCode link', () => {
    render(<Contact />);
    expect(screen.getByText(/- LeetCode:/)).toBeInTheDocument();
  });

  it('renders help hint', () => {
    render(<Contact />);
    expect(screen.getByText(/Hint: Use `contact` to view again/)).toBeInTheDocument();
  });

  it('renders all clickable links', () => {
    render(<Contact />);
    const links = screen.getAllByTestId('clickable-link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has proper structure', () => {
    const { container } = render(<Contact />);
    expect(container.firstChild).toHaveClass('space-y-1');
  });
});