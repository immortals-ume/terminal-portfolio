import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from '@/app/components/commands/Timeline';

describe('Timeline Component', () => {
  it('renders timeline content', () => {
    render(<Timeline />);
    expect(screen.getByText(/Professional Timeline/)).toBeInTheDocument();
  });

  it('renders work experience', () => {
    render(<Timeline />);
    expect(screen.getByText(/LENSKART/)).toBeInTheDocument();
  });

  it('renders career growth', () => {
    render(<Timeline />);
    expect(screen.getByText(/Career Growth/)).toBeInTheDocument();
  });
});