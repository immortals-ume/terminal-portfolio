/**
 * Tests for Achievements Component
 * 
 * Verifies visual equivalence and functionality after Tailwind refactoring:
 * - Component renders correctly
 * - Hover effects work properly
 * - Theme colors are applied
 * - Responsive behavior
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Achievements from '@/app/components/commands/Achievements';
import { achievements } from '@/data/portfolio';

// Mock the useThemeColors hook
jest.mock('@/hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    accent: '#00ff00',
    bgSecondary: '#1a1a1a',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    neonSoft: 'rgba(0, 255, 0, 0.3)',
  }),
}));

describe('Achievements Component - Visual Equivalence Tests', () => {
  it('should render the component with correct structure', () => {
    render(<Achievements />);
    
    // Verify header is present
    expect(screen.getByText('Key Achievements')).toBeInTheDocument();
    expect(screen.getByText(`(${achievements.length} milestones)`)).toBeInTheDocument();
  });

  it('should render all achievements from data', () => {
    const { container } = render(<Achievements />);
    
    // Verify all achievement cards are rendered
    const cards = container.querySelectorAll('[role="listitem"]');
    expect(cards).toHaveLength(achievements.length);
  });

  it('should apply Tailwind utility classes correctly', () => {
    const { container } = render(<Achievements />);
    
    // Verify header uses Tailwind classes
    const header = screen.getByText('Key Achievements').parentElement;
    expect(header).toHaveClass('text-xl', 'font-bold', 'mb-6', 'flex', 'items-center', 'gap-2');
    
    // Verify grid container uses Tailwind classes
    const grid = container.querySelector('.skills-grid');
    expect(grid).toBeInTheDocument();
  });

  it('should apply theme colors via inline styles', () => {
    const { container } = render(<Achievements />);
    
    // Verify header has accent color
    const header = screen.getByText('Key Achievements').parentElement;
    expect(header).toHaveStyle({ color: '#00ff00' });
    
    // Verify cards have theme colors
    const firstCard = container.querySelector('[role="listitem"]');
    expect(firstCard).toHaveStyle({
      borderColor: '#00ff00',
      backgroundColor: '#1a1a1a',
    });
  });

  it('should have correct hover effect classes', () => {
    const { container } = render(<Achievements />);
    
    const firstCard = container.querySelector('[role="listitem"]');
    expect(firstCard).toHaveClass(
      'transition-all',
      'duration-300',
      'ease-out',
      'hover:-translate-y-0.5'
    );
  });

  it('should apply box-shadow on hover', () => {
    const { container } = render(<Achievements />);
    
    const firstCard = container.querySelector('[role="listitem"]') as HTMLElement;
    expect(firstCard).toBeTruthy();
    
    // Initially no box-shadow
    expect(firstCard.style.boxShadow).toBe('');
    
    // Hover should add box-shadow
    fireEvent.mouseEnter(firstCard);
    expect(firstCard.style.boxShadow).toBe('0 4px 12px rgba(0, 255, 0, 0.3)');
    
    // Mouse leave should remove box-shadow
    fireEvent.mouseLeave(firstCard);
    expect(firstCard.style.boxShadow).toBe('none');
  });

  it('should render achievement details correctly', () => {
    render(<Achievements />);
    
    const firstAchievement = achievements[0];
    
    // Verify title is rendered
    expect(screen.getByText(firstAchievement.title)).toBeInTheDocument();
    
    // Verify description is rendered
    expect(screen.getByText(firstAchievement.description)).toBeInTheDocument();
    
    // Verify category is rendered
    expect(screen.getByText(firstAchievement.category)).toBeInTheDocument();
    
    // Verify impact is rendered (with emoji)
    expect(screen.getByText(new RegExp(firstAchievement.impact))).toBeInTheDocument();
  });

  it('should render badge numbers correctly', () => {
    const { container } = render(<Achievements />);
    
    // Verify first badge shows #1
    expect(screen.getByText('#1')).toBeInTheDocument();
    
    // Verify last badge shows correct number
    expect(screen.getByText(`#${achievements.length}`)).toBeInTheDocument();
  });

  it('should apply staggered animation delays', () => {
    const { container } = render(<Achievements />);
    
    const cards = container.querySelectorAll('[role="listitem"]');
    
    // Verify first card has 0s delay
    expect(cards[0]).toHaveStyle({ animationDelay: '0s' });
    
    // Verify second card has 0.05s delay
    if (cards.length > 1) {
      expect(cards[1]).toHaveStyle({ animationDelay: '0.05s' });
    }
  });

  it('should render footer with usage tip', () => {
    render(<Achievements />);
    
    expect(screen.getByText(/Hover over achievements for enhanced view/)).toBeInTheDocument();
    expect(screen.getByText(/Type 'help' for more commands/)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const { container } = render(<Achievements />);
    
    // Verify grid has role and aria-label
    const grid = container.querySelector('[role="list"]');
    expect(grid).toHaveAttribute('aria-label', `${achievements.length} professional achievements`);
    
    // Verify cards have role
    const cards = container.querySelectorAll('[role="listitem"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should render optional date when present', () => {
    render(<Achievements />);
    
    // Find achievements with dates
    const achievementsWithDates = achievements.filter(a => a.date);
    
    if (achievementsWithDates.length > 0) {
      // Use getAllByText for dates that may appear multiple times
      achievementsWithDates.forEach(achievement => {
        const dateElements = screen.getAllByText(new RegExp(achievement.date!));
        expect(dateElements.length).toBeGreaterThan(0);
      });
    }
  });

  it('should use correct responsive classes', () => {
    const { container } = render(<Achievements />);
    
    // Verify grid uses skills-grid class (which should have responsive behavior)
    const grid = container.querySelector('.skills-grid');
    expect(grid).toBeInTheDocument();
  });

  it('should maintain component structure without style constants', () => {
    const { container } = render(<Achievements />);
    
    // Verify no inline style objects for static styles
    // All static styles should be in className
    const cards = container.querySelectorAll('[role="listitem"]');
    
    cards.forEach(card => {
      // Card should have Tailwind classes
      expect(card.classList.length).toBeGreaterThan(5);
      
      // Card should have inline styles only for dynamic values
      const inlineStyle = (card as HTMLElement).style;
      expect(inlineStyle.borderColor).toBeTruthy();
      expect(inlineStyle.backgroundColor).toBeTruthy();
      expect(inlineStyle.animationDelay).toBeTruthy();
    });
  });
});
