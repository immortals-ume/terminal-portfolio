import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '@/app/page';

// Mock the child components
jest.mock('@/app/components/MatrixBackground', () => {
  return function MockMatrixRain() {
    return <div data-testid="matrix-background">Matrix Background</div>;
  };
});

jest.mock('@/app/components/Terminal', () => {
  return function MockTerminal() {
    return <div data-testid="terminal">Terminal</div>;
  };
});

jest.mock('@/app/components/terminal/LoadingScreen', () => {
  return function MockLoadingScreen({ onComplete }: { onComplete: () => void }) {
    return (
      <div data-testid="loading-screen">
        <button onClick={onComplete}>Complete Loading</button>
      </div>
    );
  };
});

describe('Page Component', () => {
  it('renders loading screen initially', () => {
    render(<Page />);
    
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('matrix-background')).not.toBeInTheDocument();
    expect(screen.queryByTestId('terminal')).not.toBeInTheDocument();
  });

  it('shows matrix background and terminal after loading', async () => {
    render(<Page />);
    
    // Complete loading
    fireEvent.click(screen.getByText('Complete Loading'));
    
    await waitFor(() => {
      expect(screen.getByTestId('matrix-background')).toBeInTheDocument();
      expect(screen.getByTestId('terminal')).toBeInTheDocument();
    });
    
    expect(screen.queryByTestId('loading-screen')).not.toBeInTheDocument();
  });

  it('has proper structure after loading', async () => {
    render(<Page />);
    
    fireEvent.click(screen.getByText('Complete Loading'));
    
    await waitFor(() => {
      expect(screen.getByTestId('matrix-background')).toBeInTheDocument();
    });
    
    // Check for proper CSS classes
    const matrixRoot = screen.getByTestId('matrix-background').parentElement;
    const appRoot = screen.getByTestId('terminal').parentElement;
    
    expect(matrixRoot).toHaveClass('matrixRoot');
    expect(appRoot).toHaveClass('appRoot');
  });
});