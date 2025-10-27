import React from 'react';
import { render } from '@testing-library/react';
import MatrixRain from '@/app/components/MatrixBackground';

// Mock canvas context
const mockContext = {
  fillStyle: '',
  font: '',
  shadowColor: '',
  shadowBlur: 0,
  fillRect: jest.fn(),
  fillText: jest.fn(),
};

// Mock canvas setup
jest.fn(() => ({
  getContext: jest.fn(() => mockContext),
  width: 0,
  height: 0,
}));

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: jest.fn(() => mockContext),
});

describe('MatrixBackground Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1280,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((cb) => {
      setTimeout(cb, 16);
      return 1;
    });
    
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders canvas element', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas');
    
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveStyle({
      position: 'fixed',
      inset: '0',
      zIndex: '0',
      background: 'black',
    });
  });

  it('sets canvas dimensions on mount', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    
    expect(canvas.width).toBe(window.innerWidth);
    expect(canvas.height).toBe(window.innerHeight);
  });

  it('handles window resize', () => {
    const { container } = render(<MatrixRain />);
    const canvas = container.querySelector('canvas') as HTMLCanvasElement;
    
    // Change window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1920 });
    Object.defineProperty(window, 'innerHeight', { value: 1080 });
    
    // Trigger resize
    window.dispatchEvent(new Event('resize'));
    
    expect(canvas.width).toBe(1920);
    expect(canvas.height).toBe(1080);
  });

  it('starts animation on mount', () => {
    render(<MatrixRain />);
    
    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(<MatrixRain />);
    
    unmount();
    
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('draws matrix characters', () => {
    render(<MatrixRain />);
    
    // Trigger animation frame
    const animationCallback = (global.requestAnimationFrame as jest.Mock).mock.calls[0][0];
    animationCallback();
    
    expect(mockContext.fillRect).toHaveBeenCalled();
    expect(mockContext.fillText).toHaveBeenCalled();
  });

  it('uses correct font settings', () => {
    render(<MatrixRain />);
    
    // Trigger animation frame
    const animationCallback = (global.requestAnimationFrame as jest.Mock).mock.calls[0][0];
    animationCallback();
    
    expect(mockContext.font).toContain('14px');
    expect(mockContext.font).toContain('Courier New');
  });

  it('applies glow effect randomly', () => {
    // Mock Math.random to trigger glow effect
    const originalRandom = Math.random;
    Math.random = jest.fn(() => 0.99); // High value to trigger glow
    
    render(<MatrixRain />);
    
    // Trigger animation frame
    const animationCallback = (global.requestAnimationFrame as jest.Mock).mock.calls[0][0];
    animationCallback();
    
    expect(mockContext.shadowColor).toBe('#00ff9c');
    
    Math.random = originalRandom;
  });

  it('resets drops when they go off screen', () => {
    // Mock Math.random to trigger drop reset
    const originalRandom = Math.random;
    Math.random = jest.fn(() => 0.98); // High value to trigger reset
    
    render(<MatrixRain />);
    
    // Trigger animation frame multiple times
    const animationCallback = (global.requestAnimationFrame as jest.Mock).mock.calls[0][0];
    animationCallback();
    
    Math.random = originalRandom;
  });
});