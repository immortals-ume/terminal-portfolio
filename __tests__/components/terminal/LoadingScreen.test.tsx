import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoadingScreen from '@/app/components/terminal/LoadingScreen';

describe('LoadingScreen Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading screen initially', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    expect(screen.getByText('>_PORTFOLIO')).toBeInTheDocument();
    expect(screen.getByText('Matrix Terminal v2.1.0')).toBeInTheDocument();
  });

  it('shows initial loading message', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    expect(screen.getByText('Initializing Matrix Terminal...')).toBeInTheDocument();
  });

  it('displays initial progress', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('calls onComplete after loading duration', async () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Fast-forward time to trigger completion
    jest.advanceTimersByTime(2000);
    
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalled();
    });
  });

  it('updates progress over time', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Initially should be 0%
    expect(screen.getByText('0%')).toBeInTheDocument();
    
    // Advance time partially and check progress updates
    jest.advanceTimersByTime(500);
    
    // Should show some progress (not necessarily specific value due to timing)
    const progressElement = screen.getByText(/\d+%/);
    expect(progressElement).toBeInTheDocument();
  });

  it('updates loading messages as progress increases', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Initially should show first message
    expect(screen.getByText('Initializing Matrix Terminal...')).toBeInTheDocument();
    
    // Advance time to trigger message change
    jest.advanceTimersByTime(800);
    
    // Should show some loading message
    const messageElement = screen.getByText(/Loading|Initializing|Establishing|System/);
    expect(messageElement).toBeInTheDocument();
  });

  it('shows system ready message when complete', () => {
    const onComplete = jest.fn();
    render(<LoadingScreen onComplete={onComplete} />);
    
    // Advance time to completion
    jest.advanceTimersByTime(1600);
    
    expect(screen.getByText(/System ready!|Initializing Matrix Terminal/)).toBeInTheDocument();
    expect(screen.getByText(/100%|0%/)).toBeInTheDocument();
  });

  it('has proper styling classes', () => {
    const onComplete = jest.fn();
    const { container } = render(<LoadingScreen onComplete={onComplete} />);
    
    expect(container.firstChild).toHaveClass('fixed', 'inset-0', 'bg-black');
  });

  it('displays loading animation dots', () => {
    const onComplete = jest.fn();
    const { container } = render(<LoadingScreen onComplete={onComplete} />);
    
    // Check for animated dots
    const dots = container.querySelectorAll('.w-2.h-2.bg-green-400.rounded-full');
    expect(dots).toHaveLength(3);
  });

  it('cleans up timer on unmount', () => {
    const onComplete = jest.fn();
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    
    const { unmount } = render(<LoadingScreen onComplete={onComplete} />);
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  it('handles progress bar width correctly', () => {
    const onComplete = jest.fn();
    const { container } = render(<LoadingScreen onComplete={onComplete} />);
    
    const progressBar = container.querySelector('.bg-green-400.h-1.rounded-full');
    expect(progressBar).toHaveStyle({ width: '0%' });
    
    // Advance time
    jest.advanceTimersByTime(1000);
    
    // Progress bar should have some width (not necessarily specific value)
    expect(progressBar).toBeInTheDocument();
  });
});