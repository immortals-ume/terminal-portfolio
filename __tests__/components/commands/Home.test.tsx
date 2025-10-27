import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/app/components/commands/Home';

describe('Home Component', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to my interactive terminal portfolio/)).toBeInTheDocument();
  });

  it('renders role information', () => {
    render(<Home />);
    expect(screen.getByText(/Software Development Engineer/)).toBeInTheDocument();
  });

  it('renders quick navigation', () => {
    render(<Home />);
    expect(screen.getByText(/Quick navigation/)).toBeInTheDocument();
  });
});