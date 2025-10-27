import React from 'react';
import { render, screen } from '@testing-library/react';
import Education from '@/app/components/commands/Education';

describe('Education Component', () => {
  it('renders education header', () => {
    render(<Education />);
    expect(screen.getByText(/Education/)).toBeInTheDocument();
  });

  it('renders degree information', () => {
    render(<Education />);
    expect(screen.getByText(/Bachelor of Technology/)).toBeInTheDocument();
  });

  it('renders institution', () => {
    render(<Education />);
    expect(screen.getByText(/SRM Institute/)).toBeInTheDocument();
  });
});